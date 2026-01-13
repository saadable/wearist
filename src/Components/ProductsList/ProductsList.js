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
    <main className='max-w-6xl mx-auto px-4 py-8'>
      <header className='mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <div>
          <h1 className='text-2xl md:text-3xl font-bold text-[#2785ca]'>Products</h1>
          <p className='text-gray-600 mt-1'>Search and browse our catalog. Results are sorted alphabetically.</p>
        </div>

        <div className='flex items-center gap-3 w-full sm:w-auto'>
          <form onSubmit={onSearchSubmit} className='flex items-center gap-3 w-full sm:w-auto'>
            <div className='flex items-center border rounded-md overflow-hidden w-full sm:w-auto'>
              <input
                aria-label='Search products'
                className='px-4 py-2 w-full text-sm focus:outline-none'
                placeholder='Search products by name...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className='px-3 text-gray-500' type='button' onClick={() => setSearch('')}>Clear</button>
            </div>

            <div className='flex items-center gap-2'>
              <label className='text-sm text-gray-600'>Sort</label>
              <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className='text-sm border rounded-md px-2 py-1'>
                <option value='asc'>A → Z</option>
                <option value='desc'>Z → A</option>
              </select>
            </div>
          </form>
        </div>
      </header>

      <div className='mb-4 text-sm text-gray-600'>
        {filtered.length} result{filtered.length !== 1 ? 's' : ''}
      </div>

      <section>
        {filtered.length === 0 ? (
          <div className='text-center text-gray-500 py-12'>No products found.</div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {filtered.map((product) => (
              <ProductCard key={product.id || product.slug || product.title} props={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default ProductsList