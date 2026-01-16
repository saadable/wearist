"use client"

import React, { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import ProductCard from '@/Components/ProductsCards/page'
import { products as allProducts } from '@/data/products'

const ProductsList = ({ initialQuery = '' }) => {
  const router = useRouter()
  const [search, setSearch] = useState(initialQuery)
  const [sortOrder, setSortOrder] = useState('asc') // 'asc' or 'desc'

  useEffect(() => {
    setSearch(initialQuery)
  }, [initialQuery])

  const filtered = useMemo(() => {
    const q = (search || '').trim().toLowerCase()
    let res = allProducts.filter((p) => p.title.toLowerCase().includes(q))
    res.sort((a, b) => a.title.localeCompare(b.title))
    if (sortOrder === 'desc') res.reverse()
    return res
  }, [search, sortOrder])

  const onSearchSubmit = (e) => {
    e?.preventDefault?.()
    const q = (search || '').trim()
    if (q) router.push(`/products?query=${encodeURIComponent(q)}`)
    else router.push('/products')
  }

  return (
    <main className='max-w-6xl mx-auto px-4 py-6 sm:py-8 md:py-12'>
      <header className='mb-6 md:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <div>
          <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-[#2785ca]'>Products</h1>
          <p className='text-xs sm:text-sm text-gray-600 mt-1 md:mt-2'>Search and browse our catalog. Results are sorted alphabetically.</p>
        </div>

        <div className='flex items-center gap-2 sm:gap-3 w-full sm:w-auto flex-col sm:flex-row'>
          <form onSubmit={onSearchSubmit} className='flex items-center gap-2 sm:gap-3 w-full sm:w-auto flex-col sm:flex-row'>
            <div className='flex items-center border border-gray-300 rounded-md overflow-hidden w-full sm:w-auto bg-white'>
              <input
                aria-label='Search products'
                className='px-3 sm:px-4 py-1.5 sm:py-2 w-full text-xs sm:text-sm focus:outline-none'
                placeholder='Search products...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className='px-2 sm:px-3 text-[#2785ca] hover:bg-gray-100 transition-colors text-xs sm:text-sm font-semibold' type='button' onClick={() => setSearch('')}>Clear</button>
            </div>

            <div className='flex items-center gap-2'>
              <label className='text-xs sm:text-sm text-gray-700 font-bold'>Sort</label>
              <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className='text-xs sm:text-sm border border-gray-300 rounded-md px-2 sm:px-3 py-1.5 sm:py-2 bg-white'>
                <option value='asc'>A → Z</option>
                <option value='desc'>Z → A</option>
              </select>
            </div>
          </form>
        </div>
      </header>

      <div className='mb-4 text-xs sm:text-sm text-gray-700 font-semibold'>
        {filtered.length} result{filtered.length !== 1 ? 's' : ''}
      </div>

      <section>
        {filtered.length === 0 ? (
          <div className='text-center text-gray-600 py-8 sm:py-12 md:py-16'>
            <p className='text-sm sm:text-base md:text-lg'>No products found.</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6'>
            {filtered.map((product) => (
              <ProductCard key={product.id || product.slug || product.title} props={product} review={product.review_count}/>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default ProductsList