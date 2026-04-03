'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { useAllProducts } from '@/hooks/useProducts'
import ProductCard from '@/Components/ProductsCards/page'

const capitalize = (value) => {
  if (typeof value !== 'string' || value.length === 0) return value
  return value.charAt(0).toUpperCase() + value.slice(1)
}

const AllProductsClient = () => {
  const { products, loading, error } = useAllProducts()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedBrands, setSelectedBrands] = useState([])
  const [selectedRating, setSelectedRating] = useState(0)
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 })
  const [priceInputs, setPriceInputs] = useState({ min: 0, max: 0 })
  const [initializedPrice, setInitializedPrice] = useState(false)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const categories = useMemo(
    () =>
      [...new Set(products.map(product => product.category?.trim()).filter(Boolean))].sort(),
    [products]
  )

  const brands = useMemo(
    () =>
      [...new Set(products.map(product => product.brand?.trim()).filter(Boolean))].sort(),
    [products]
  )

  const [minPrice, maxPrice] = useMemo(() => {
    const prices = products
      .map(product => Number(product.new_price ?? product.price ?? 0))
      .filter(price => !Number.isNaN(price) && price >= 0)

    if (prices.length === 0) return [0, 0]

    return [Math.min(...prices), Math.max(...prices)]
  }, [products])

  useEffect(() => {
    if (!initializedPrice && products.length > 0) {
      setPriceRange({ min: minPrice, max: maxPrice })
      setPriceInputs({ min: minPrice, max: maxPrice })
      setInitializedPrice(true)
    }
  }, [initializedPrice, minPrice, maxPrice, products.length])

  const normalizedPriceRange = useMemo(() => {
    const min = Math.min(priceRange.min, priceRange.max)
    const max = Math.max(priceRange.min, priceRange.max)
    return {
      min: Math.max(0, Math.min(min, max)),
      max: Math.max(0, max),
    }
  }, [priceRange])

  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    return products.filter(product => {
      const title = product.title?.toString().toLowerCase() || ''
      const description = product.description?.toString().toLowerCase() || ''
      const category = product.category?.toString().toLowerCase() || ''
      const brand = product.brand?.toString().toLowerCase() || ''
      const subCategory = product.subCategory?.toString().toLowerCase() || ''
      const reviews = Number(product.reviews || 0)
      const price = Number(product.new_price ?? product.price ?? 0)

      if (query) {
        const searchable = `${title} ${description} ${category} ${brand} ${subCategory}`
        if (!searchable.includes(query)) {
          return false
        }
      }

      if (selectedCategories.length > 0) {
        const categoryValue = product.category?.trim() || ''
        if (!selectedCategories.includes(categoryValue)) {
          return false
        }
      }

      if (selectedBrands.length > 0) {
        const brandValue = product.brand?.trim() || ''
        if (!selectedBrands.includes(brandValue)) {
          return false
        }
      }

      if (selectedRating > 0 && reviews < selectedRating) {
        return false
      }

      if (price < normalizedPriceRange.min || price > normalizedPriceRange.max) {
        return false
      }

      return true
    })
  }, [products, searchTerm, selectedCategories, selectedBrands, selectedRating, normalizedPriceRange])

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
    setSearchTerm('')
    setSelectedCategories([])
    setSelectedBrands([])
    setSelectedRating(0)
    setPriceRange({ min: minPrice, max: maxPrice })
    setPriceInputs({ min: minPrice, max: maxPrice })
  }

  if (loading) {
    return (
      <main className='max-w-7xl mx-auto px-4 py-6 sm:py-8 md:py-12'>
        <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-[#2785ca] mb-8'>All Products</h1>
        <div className='flex items-center justify-center py-12'>
          <div className='text-center'>
            <div className='inline-block mb-4'>
              <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2785ca]'></div>
            </div>
            <p className='text-gray-600'>Loading products...</p>
          </div>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className='max-w-7xl mx-auto px-4 py-6 sm:py-8 md:py-12'>
        <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-[#2785ca] mb-8'>All Products</h1>
        <div className='text-center py-12'>
          <p className='text-red-600'>Error: {error}</p>
        </div>
      </main>
    )
  }

  return (
    <main className='max-w-7xl mx-auto px-4 py-6 sm:py-8 md:py-12'>
      <header className='mb-8 md:mb-12'>
        <div className='flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between'>
          <div>
            <h1 className='text-3xl sm:text-4xl font-semibold text-[#2785ca] mb-2'>All Products</h1>
            <p className='text-sm sm:text-base text-white '>Explore the premium collection, refine results instantly, and discover the best offer for every budget.</p>
          </div>
          <div className='flex flex-wrap items-center gap-3'>
            <span className='inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm'>
              {filteredProducts.length} / {products.length} results
            </span>
            <span className='inline-flex rounded-full bg-[#2785ca]/10 px-4 py-2 text-sm font-medium text-white'>
              {selectedCategories.length ? `${selectedCategories.length} categories` : 'All categories'}
            </span>
          </div>
        </div>
      </header>

      <div className='md:mb-6 flex items-center justify-between gap-3 xl:hidden'>
        {/* <p className='text-sm text-slate-500'>Tap to open filters and refine products instantly.</p> */}
        <button
          type='button'
          onClick={() => setMobileFiltersOpen(prev => !prev)}
          className='rounded-[10px] w-full bg-[#2785ca] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#1f5c93]'
        >
          {mobileFiltersOpen ? 'Hide filters' : 'Show filters'}
        </button>
      </div>

      <div className='grid grid-cols-1 md:gap-8 xl:grid-cols-[320px_minmax(0,1fr)]'>
        <aside className={`rounded-[10px] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] overflow-hidden transition-all duration-300 ease-out ${mobileFiltersOpen ? 'max-h-[2000px] my-5 opacity-100 scale-100' : 'max-h-0 opacity-0 scale-[0.98]'} xl:max-h-none xl:opacity-100 xl:scale-100 xl:sticky xl:top-6 xl:self-start`}>
          <div className='flex items-center justify-between gap-4 md:mb-6 relative'>
            <div>
              <h2 className='text-lg font-semibold text-slate-900'>Filters</h2>
              <p className='text-sm text-slate-500'>Refine your search to find the perfect product.</p>
            </div>
            <button
              type='button'
              onClick={clearFilters}
              className='rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 transition hover:bg-slate-200'
            >
              Clear all
            </button>
          </div>

          <div className='space-y-6'>
            <div>
              <label htmlFor='search' className='block text-sm font-medium text-slate-700 mb-2'>
                Search products
              </label>
              <input
                id='search'
                type='text'
                placeholder='Type to search...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full rounded-[8px] border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm transition focus:border-[#2785ca] focus:outline-none focus:ring-1 focus:ring-[#2785ca]'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-slate-700 mb-2'>Categories</label>
              <div className='space-y-2 max-h-40 overflow-y-auto'>
                {categories.map(category => (
                  <label key={category} className='flex items-center gap-2'>
                    <input
                      type='checkbox'
                      checked={selectedCategories.includes(category)}
                      onChange={() => toggleSelection(category, selectedCategories, setSelectedCategories)}
                      className='rounded border-slate-300 text-[#2785ca] focus:ring-[#2785ca]'
                    />
                    <span className='text-sm text-slate-600'>{capitalize(category)}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium text-slate-700 mb-2'>Brands</label>
              <div className='space-y-2 max-h-40 overflow-y-auto'>
                {brands.map(brand => (
                  <label key={brand} className='flex items-center gap-2'>
                    <input
                      type='checkbox'
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleSelection(brand, selectedBrands, setSelectedBrands)}
                      className='rounded border-slate-300 text-[#2785ca] focus:ring-[#2785ca]'
                    />
                    <span className='text-sm text-slate-600'>{capitalize(brand)}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium text-slate-700 mb-2'>Minimum Rating</label>
              <select
                value={selectedRating}
                onChange={(e) => setSelectedRating(Number(e.target.value))}
                className='w-full rounded-[8px] border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm transition focus:border-[#2785ca] focus:outline-none focus:ring-1 focus:ring-[#2785ca]'
              >
                <option value={0}>Any rating</option>
                <option value={1}>1+ stars</option>
                <option value={2}>2+ stars</option>
                <option value={3}>3+ stars</option>
                <option value={4}>4+ stars</option>
                <option value={5}>5 stars</option>
              </select>
            </div>

            <div>
              <label className='block text-sm font-medium text-slate-700 mb-2'>Price Range</label>
              <div className='space-y-3'>
                <div className='flex gap-2'>
                  <input
                    type='number'
                    placeholder='Min'
                    value={priceInputs.min}
                    onChange={(e) => handlePriceInput('min', e.target.value)}
                    className='w-full rounded-[8px] border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm transition focus:border-[#2785ca] focus:outline-none focus:ring-1 focus:ring-[#2785ca]'
                  />
                  <input
                    type='number'
                    placeholder='Max'
                    value={priceInputs.max}
                    onChange={(e) => handlePriceInput('max', e.target.value)}
                    className='w-full rounded-[8px] border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm transition focus:border-[#2785ca] focus:outline-none focus:ring-1 focus:ring-[#2785ca]'
                  />
                </div>
                <input
                  type='range'
                  min={minPrice}
                  max={maxPrice}
                  value={priceRange.min}
                  onChange={(e) => handleRangeChange('min', e.target.value)}
                  className='w-full'
                />
                <input
                  type='range'
                  min={minPrice}
                  max={maxPrice}
                  value={priceRange.max}
                  onChange={(e) => handleRangeChange('max', e.target.value)}
                  className='w-full'
                />
                <div className='flex justify-between text-xs text-slate-500'>
                  <span>${priceRange.min}</span>
                  <span>${priceRange.max}</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <section className='space-y-6'>
          {/* <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-slate-500'>Only the products that match your selection appear here instantly.</p>
            </div>
            <div className='inline-flex flex-wrap items-center gap-3'>
              {selectedCategories.length > 0 && <span className='rounded-full bg-[#2785ca] px-3 py-1 text-xs font-semibold text-white'>{selectedCategories.length} category</span>}
              {selectedBrands.length > 0 && <span className='rounded-full bg-[#2785ca] px-3 py-1 text-xs font-semibold text-white'>{selectedBrands.length} brand</span>}
              {selectedRating > 0 && <span className='rounded-full bg-[#2785ca] px-3 py-1 text-xs font-semibold text-white'>{selectedRating}+ stars</span>}
            </div>
          </div> */}

          {filteredProducts.length === 0 ? (
            <div className='rounded-[28px] border border-dashed border-slate-300 bg-slate-50 p-12 text-center text-slate-600'>
              <p className='text-xl font-semibold text-slate-900 mb-2'>No matching products found</p>
              <p className='text-sm'>Try relaxing the filters or clear them to browse the full range.</p>
            </div>
          ) : (
            <div className='grid grid-cols-1 gap-6 justify-items-center md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
              {filteredProducts.map(product => (
                <ProductCard
                  key={product._id || product.slug || product.title}
                  props={product}
                  review={product.reviews}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default AllProductsClient