'use client'

import React from 'react'
import { useAllProducts } from '@/hooks/useProducts'
import ProductCard from '@/Components/ProductsCards/page'

const AllProducts = () => {
  const { products, loading, error } = useAllProducts()

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
        <div className='flex items-baseline justify-between mb-3'>
          <div>
            <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-[#2785ca] mb-2'>All Products</h1>
            <p className='text-sm sm:text-base text-gray-600'>Browse our complete collection</p>
          </div>
          <div className='text-right'>
            <span className='inline-block bg-[#2785ca] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold'>
              {products.length} Products
            </span>
          </div>
        </div>
      </header>

      {products.length === 0 ? (
        <div className='text-center py-12'>
          <div className='text-5xl mb-4'>📦</div>
          <p className='text-gray-600 mb-6'>No products found in our store</p>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6'>
          {products.map((product) => (
            <ProductCard
              key={product._id || product.slug || product.title}
              props={product}
              review={product.reviews}
            />
          ))}
        </div>
      )}
    </main>
  )
}

export default AllProducts
