"use client"

import React, { useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import ProductCard from '@/Components/ProductsCards/page'
import { axiosClient } from '@/utils/axiosClient'
import { BiLoaderAlt } from 'react-icons/bi'

const ProductsList = ({ initialQuery = '' }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(initialQuery || searchParams.get('q') || '')
  const [sortOrder, setSortOrder] = useState('asc') // 'asc' or 'desc'
  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

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

  const filtered = useMemo(() => {
    let res = [...allProducts]
    res.sort((a, b) => a.title.localeCompare(b.title))
    if (sortOrder === 'desc') res.reverse()
    return res
  }, [allProducts, sortOrder])

  const onSearchSubmit = (e) => {
    e?.preventDefault?.()
    const q = (search || '').trim()
    if (q) router.push(`/products?query=${encodeURIComponent(q)}`)
    else router.push('/products')
  }

  return (
    <main className='max-w-6xl mx-auto px-4 py-6 sm:py-8 md:py-12'>
      <header className='mb-6 md:mb-8'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
          <div>
            <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-[#2785ca]'>Our Products</h1>
            <p className='text-xs sm:text-sm text-gray-600 mt-1 md:mt-2'>Discover our curated collection of premium accessories and lifestyle products.</p>
          </div>
        </div>
      </header>

      <div className='flex items-center gap-2 sm:gap-3 w-full flex-col sm:flex-row mb-6'>
        <form onSubmit={(e) => { e.preventDefault(); }} className='flex items-center border-2 border-gray-300 rounded-lg overflow-hidden w-full sm:w-auto flex-col sm:flex-row bg-white focus-within:border-[#2785ca] transition'>
          <input
            aria-label='Search products'
            className='px-4 py-2.5 w-full text-sm focus:outline-none flex-1'
            placeholder='Search products by name, category...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className='px-4 py-2.5 text-[#2785ca] hover:bg-gray-50 transition-colors text-sm font-semibold whitespace-nowrap' type='button' onClick={() => setSearch('')} disabled={!search}>Clear</button>
        </form>

        <div className='flex items-center gap-2'>
          <label className='text-xs sm:text-sm text-gray-700 font-bold whitespace-nowrap'>Sort By</label>
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className='text-xs sm:text-sm border-2 border-gray-300 rounded-lg px-3 py-2.5 bg-white focus:outline-none focus:border-[#2785ca] transition'>
            <option value='asc'>A → Z</option>
            <option value='desc'>Z → A</option>
          </select>
        </div>
      </div>

      <div className='mb-4 text-xs sm:text-sm font-semibold'>
        {loading ? (
          <span className='text-[#2785ca] flex items-center gap-2'><BiLoaderAlt className='animate-spin' /> Searching...</span>
        ) : error ? (
          <span className='text-red-600'>Error: {error}</span>
        ) : (
          <span className='text-gray-700'>{filtered.length} result{filtered.length !== 1 ? 's' : ''} found</span>
        )}
      </div>

      <section>
        {loading ? (
          <div className='flex items-center justify-center py-12'>
            <BiLoaderAlt className='animate-spin text-[#2785ca] text-4xl' />
          </div>
        ) : error ? (
          <div className='text-center text-red-600 py-12'>
            <p className='text-lg font-semibold'>{error}</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className='text-center text-gray-600 py-12 bg-gray-50 rounded-lg'>
            <p className='text-lg font-semibold mb-2'>No products found</p>
            <p className='text-sm'>Try adjusting your search terms or explore other categories.</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6'>
            {filtered.map((product) => (
              <ProductCard key={product._id || product.slug || product.title} props={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default ProductsList