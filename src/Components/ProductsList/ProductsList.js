"use client"

import React, { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import ProductCard from '@/Components/ProductsCards/page'

const capitalize = (value) => {
  if (typeof value !== 'string' || value.length === 0) return value
  return value.charAt(0).toUpperCase() + value.slice(1)
}
import { axiosClient } from '@/utils/axiosClient'
import { BiLoaderAlt } from 'react-icons/bi'

const ProductsList = ({ initialQuery = '' }) => {
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(initialQuery || searchParams.get('q') || '')
  const [sortOrder, setSortOrder] = useState('asc') // 'asc' or 'desc'
  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedBrands, setSelectedBrands] = useState([])
  const [selectedRating, setSelectedRating] = useState(0)
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 })
  const [priceInputs, setPriceInputs] = useState({ min: 0, max: 0 })
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [initializedPrice, setInitializedPrice] = useState(false)

  // Fetch products from backend on mount and when search changes
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      setError(null)
      try {
        const resp = await axiosClient.get('/api/products/search', {
          params: { q: search || '' }
        })
        setAllProducts(resp.data?.Result?.products || [])
      } catch (err) {
        setError(err.message || 'Failed to load products')
        console.error('Error fetching products:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [search])

  useEffect(() => {
    setSearch(initialQuery || searchParams.get('q') || '')
  }, [initialQuery, searchParams])

  const categories = useMemo(
    () => [...new Set(allProducts.map(product => product.category?.trim()).filter(Boolean))].sort(),
    [allProducts]
  )

  const brands = useMemo(
    () => [...new Set(allProducts.map(product => product.brand?.trim()).filter(Boolean))].sort(),
    [allProducts]
  )

  const [minPrice, maxPrice] = useMemo(() => {
    const prices = allProducts
      .map(product => Number(product.new_price ?? product.price ?? 0))
      .filter(price => !Number.isNaN(price) && price >= 0)

    if (prices.length === 0) return [0, 0]
    return [Math.min(...prices), Math.max(...prices)]
  }, [allProducts])

  useEffect(() => {
    if (allProducts.length === 0) {
      setPriceRange({ min: 0, max: 0 })
      setPriceInputs({ min: 0, max: 0 })
      setInitializedPrice(false)
      return
    }

    if (!initializedPrice) {
      setPriceRange({ min: minPrice, max: maxPrice })
      setPriceInputs({ min: minPrice, max: maxPrice })
      setInitializedPrice(true)
      return
    }

    setPriceRange(prev => ({
      min: Math.max(minPrice, Math.min(prev.min, maxPrice)),
      max: Math.max(minPrice, Math.min(prev.max, maxPrice))
    }))
    setPriceInputs(prev => ({
      min: Math.max(minPrice, Math.min(prev.min, maxPrice)),
      max: Math.max(minPrice, Math.min(prev.max, maxPrice))
    }))
  }, [allProducts, initializedPrice, minPrice, maxPrice])

  const toggleSelection = (value, list, setList) => {
    if (list.includes(value)) {
      setList(list.filter(item => item !== value))
    } else {
      setList([...list, value])
    }
  }

  const handlePriceInput = (field, value) => {
    const normalized = Number(value)
    if (Number.isNaN(normalized)) return
    const next = { ...priceInputs, [field]: normalized }
    setPriceInputs(next)
    setPriceRange(next)
  }

  const handleRangeChange = (field, value) => {
    const numeric = Number(value)
    if (Number.isNaN(numeric)) return
    const next = { ...priceRange, [field]: numeric }
    setPriceInputs(next)
    setPriceRange(next)
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedBrands([])
    setSelectedRating(0)
    setPriceRange({ min: minPrice, max: maxPrice })
    setPriceInputs({ min: minPrice, max: maxPrice })
  }

  const filteredProducts = useMemo(() => {
    let list = [...allProducts]

    if (selectedCategories.length > 0) {
      list = list.filter(product => selectedCategories.includes(product.category?.trim() || ''))
    }

    if (selectedBrands.length > 0) {
      list = list.filter(product => selectedBrands.includes(product.brand?.trim() || ''))
    }

    if (selectedRating > 0) {
      list = list.filter(product => Number(product.reviews || 0) >= selectedRating)
    }

    list = list.filter(product => {
      const price = Number(product.new_price ?? product.price ?? 0)
      return price >= priceRange.min && price <= priceRange.max
    })

    list.sort((a, b) => a.title.localeCompare(b.title))
    if (sortOrder === 'desc') list.reverse()

    return list
  }, [allProducts, selectedCategories, selectedBrands, selectedRating, priceRange, sortOrder])

  return (
    <main className='max-w-6xl mx-auto px-4 py-6 sm:py-8 md:py-12'>
      <header className='mb-6 md:mb-8'>
        <div className='flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between'>
          <div>
            <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-[#2785ca]'>Search Results</h1>
            <p className='text-sm sm:text-base text-white mt-1 md:mt-2'>Refine the current result set instantly with advanced filters for the most relevant products.</p>
          </div>
          <div className='flex flex-wrap items-center gap-3'>
            <span className='rounded-[10px] bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm'>{filteredProducts.length} / {allProducts.length || 0} shown</span>
            <span className='rounded-[10px] bg-[#2785ca]/10 px-4 py-2 text-sm font-medium text-white'>{search ? `Search: "${search}"` : 'Search Results'}</span>
          </div>
        </div>
      </header>

      <div className='mb-6 flex flex-col gap-3 xl:hidden'>
        <button
          type='button'
          onClick={() => setMobileFiltersOpen(prev => !prev)}
          className='rounded-2xl bg-[#2785ca] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#1f5c93]'
        >
          {mobileFiltersOpen ? 'Hide filters' : 'Show filters'}
        </button>
      </div>

      <div className='grid grid-cols-1 gap-8 xl:grid-cols-[320px_minmax(0,1fr)]'>
        <aside className={`rounded-[10px] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] ${mobileFiltersOpen ? 'block' : 'hidden'} xl:block`}>
          <div className='flex items-center justify-between gap-4 mb-6 relative'>
            <div>
              <p className='text-sm uppercase tracking-[0.2em] text-slate-400'>Filter Your Results</p>
              <h2 className='text-xl font-semibold text-slate-900'>Refined results</h2>
            </div>
            <button
              type='button'
              onClick={clearFilters}
              className='rounded-[10px] absolute right-0 top-6 w-[100px] border border-slate-200 px-1 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900'
            >
              Clear Filter
            </button>
          </div>

          <div className='space-y-6'>
            <div>
              <label className='mb-3 block text-sm font-semibold text-slate-700'>Search products</label>
              <input
                type='search'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder='Search by name, brand, category…'
                className='w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#2785ca] focus:ring-2 focus:ring-[#2785ca]/20'
              />
            </div>

            <div className='rounded-[22px] border border-slate-200 bg-slate-50 p-4'>
              <div className='mb-4 flex items-center justify-between'>
                <p className='text-sm font-semibold text-slate-900'>Category</p>
                <span className='text-xs text-slate-500'>{selectedCategories.length || 'All'}</span>
              </div>
              <div className='max-h-56 space-y-3 overflow-y-auto pr-2'>
                {categories.length > 0 ? (
                  categories.map(category => (
                    <label key={category} className='inline-flex w-full cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 transition hover:border-[#2785ca]'>
                      <input
                        type='checkbox'
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleSelection(category, selectedCategories, setSelectedCategories)}
                        className='h-4 w-4 accent-[#2785ca]'
                      />
                      <span>{capitalize(category)}</span>
                    </label>
                  ))
                ) : (
                  <p className='text-sm text-slate-500'>No categories available</p>
                )}
              </div>
            </div>

            <div className='rounded-[22px] border border-slate-200 bg-slate-50 p-4'>
              <div className='mb-4 flex items-center justify-between'>
                <p className='text-sm font-semibold text-slate-900'>Brands</p>
                <span className='text-xs text-slate-500'>{selectedBrands.length || 'All'}</span>
              </div>
              <div className='max-h-56 space-y-3 overflow-y-auto pr-2'>
                {brands.length > 0 ? (
                  brands.map(brand => (
                    <label key={brand} className='inline-flex w-full cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 transition hover:border-[#2785ca]'>
                      <input
                        type='checkbox'
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleSelection(brand, selectedBrands, setSelectedBrands)}
                        className='h-4 w-4 accent-[#2785ca]'
                      />
                      <span>{brand}</span>
                    </label>
                  ))
                ) : (
                  <p className='text-sm text-slate-500'>No brands found</p>
                )}
              </div>
            </div>

            <div className='rounded-[22px] border border-slate-200 bg-slate-50 p-4'>
              <p className='mb-4 text-sm font-semibold text-slate-900'>Ratings</p>
              <div className='grid grid-cols-2 gap-3'>
                {[4, 3, 2, 1].map(value => (
                  <button
                    key={value}
                    type='button'
                    onClick={() => setSelectedRating(selectedRating === value ? 0 : value)}
                    className={`rounded-2xl border px-3 py-2 text-sm font-medium transition ${selectedRating === value ? 'border-[#2785ca] bg-[#2785ca] text-white shadow-sm' : 'border-slate-200 bg-white text-slate-700 hover:border-[#2785ca]'}`}
                  >
                    {value}+ stars
                  </button>
                ))}
              </div>
            </div>

            <div className='rounded-[22px] border border-slate-200 bg-slate-50 p-4'>
              <div className='mb-4 flex items-center justify-between'>
                <div>
                  <p className='text-sm font-semibold text-slate-900'>Price range</p>
                  <p className='text-xs text-slate-500'>Instant results while you adjust</p>
                </div>
                <span className='text-sm font-semibold text-slate-900'>PKR {priceRange.min?.toLocaleString() || 0} - PKR {priceRange.max?.toLocaleString() || 0}</span>
              </div>
              <div className='grid gap-3'>
                <div className='grid grid-cols-2 gap-3'>
                  <label className='space-y-1'>
                    <span className='text-xs text-slate-500'>Min</span>
                    <input
                      type='number'
                      value={priceInputs.min}
                      min={minPrice}
                      max={maxPrice}
                      onChange={e => handlePriceInput('min', e.target.value)}
                      className='w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none'
                    />
                  </label>
                  <label className='space-y-1'>
                    <span className='text-xs text-slate-500'>Max</span>
                    <input
                      type='number'
                      value={priceInputs.max}
                      min={minPrice}
                      max={maxPrice}
                      onChange={e => handlePriceInput('max', e.target.value)}
                      className='w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none'
                    />
                  </label>
                </div>
                <div className='space-y-3'>
                  <input
                    type='range'
                    min={minPrice}
                    max={maxPrice}
                    value={priceRange.min}
                    onChange={e => handleRangeChange('min', e.target.value)}
                    className='w-full accent-[#2785ca]'
                  />
                  <input
                    type='range'
                    min={minPrice}
                    max={maxPrice}
                    value={priceRange.max}
                    onChange={e => handleRangeChange('max', e.target.value)}
                    className='w-full accent-[#2785ca]'
                  />
                </div>
              </div>
            </div>
          </div>
        </aside>

        <section>
          <div className='mb-6 flex flex-col gap-3 rounded-[10px] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]'>
            <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
              <div>
                <h2 className='text-lg font-semibold text-slate-900'>Search Results</h2>
                <p className='text-sm text-slate-500'>Filters apply only to the products returned by your search.</p>
              </div>
              <div className='inline-flex flex-wrap items-center gap-3'>
                {selectedCategories.length > 0 && <span className='rounded-full bg-[#2785ca] px-3 py-1 text-xs font-semibold text-white'>{selectedCategories.length} category</span>}
                {selectedBrands.length > 0 && <span className='rounded-full bg-[#2785ca] px-3 py-1 text-xs font-semibold text-white'>{selectedBrands.length} brand</span>}
                {selectedRating > 0 && <span className='rounded-full bg-[#2785ca] px-3 py-1 text-xs font-semibold text-white'>{selectedRating}+ stars</span>}
              </div>
            </div>
          </div>

          <div className='mb-4 text-xs sm:text-sm font-semibold'>
            {loading ? (
              <span className='text-[#2785ca] flex items-center gap-2'><BiLoaderAlt className='animate-spin' /> Searching...</span>
            ) : error ? (
              <span className='text-red-600'>Error: {error}</span>
            ) : (
              <span className='text-gray-700'>{filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} found</span>
            )}
          </div>

          {loading ? (
            <div className='flex items-center justify-center py-12'>
              <BiLoaderAlt className='animate-spin text-[#2785ca] text-4xl' />
            </div>
          ) : error ? (
            <div className='text-center text-red-600 py-12'>
              <p className='text-lg font-semibold'>{error}</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className='rounded-[28px] border border-dashed border-slate-300 bg-slate-50 p-12 text-center text-slate-600'>
              <p className='text-xl font-semibold text-slate-900 mb-2'>No matching products found</p>
              <p className='text-sm'>Try changing your search or filter selection.</p>
            </div>
          ) : (
            <div className='grid grid-cols-1 justify-items-center gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
              {filteredProducts.map((product) => (
                <ProductCard key={product._id || product.slug || product.title} props={product} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default ProductsList