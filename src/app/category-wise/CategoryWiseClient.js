'use client'

import React from 'react'
import Link from 'next/link'
import { useProductsByCategory } from '@/hooks/useProducts'
import ProductCard from '@/Components/ProductsCards/page'

const CategoryWiseProductsClient = () => {
  const { categories, loading, error } = useProductsByCategory()

  if (loading) {
    return (
      <main className='max-w-7xl mx-auto px-4 py-6 sm:py-8 md:py-12'>
        <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-[#2785ca] mb-8'>Shop by Category</h1>
        <div className='flex items-center justify-center py-12'>
          <div className='text-center'>
            <div className='inline-block mb-4'>
              <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2785ca]'></div>
            </div>
            <p className='text-gray-600'>Loading categories...</p>
          </div>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className='max-w-7xl mx-auto px-4 py-6 sm:py-8 md:py-12'>
        <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-[#2785ca] mb-8'>Shop by Category</h1>
        <div className='text-center py-12'>
          <p className='text-red-600'>Error: {error}</p>
        </div>
      </main>
    )
  }

  const categoryList = Object.entries(categories).sort((a, b) =>
    a[0].localeCompare(b[0])
  )

  return (
    <main className='max-w-7xl mx-auto px-4 py-6 sm:py-8 md:py-12'>
      <header className='mb-8 md:mb-12'>
        <div className='flex items-baseline justify-between mb-4'>
          <div>
            <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-[#2785ca] mb-2'>Shop by Category</h1>
            <p className='text-sm sm:text-base text-gray-600'>
              Explore our {categoryList.length} product categories
            </p>
          </div>
          <span className='inline-block bg-[#2785ca] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold'>
            {categoryList.length} Categories
          </span>
        </div>
      </header>

      {categoryList.length === 0 ? (
        <div className='text-center py-12'>
          <div className='text-5xl mb-4'>📂</div>
          <p className='text-gray-600 mb-6'>No categories found</p>
        </div>
      ) : (
        <div className='space-y-12 md:space-y-16'>
          {categoryList.map(([categoryKey, categoryData]) => (
            <section key={categoryKey} className='border-b border-gray-200 pb-8 md:pb-12 last:border-b-0'>
              <div className='flex items-center justify-between mb-6 md:mb-8'>
                <div>
                  <h2 className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 capitalize hover:text-[#2785ca] transition-colors'>
                    <Link href={`/category/${categoryKey}`}>
                      {categoryData.name}
                    </Link>
                  </h2>
                </div>
                <div className='flex items-center gap-3'>
                  <span className='inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs sm:text-sm font-medium'>
                    {categoryData.products.length} product{categoryData.products.length !== 1 ? 's' : ''}
                  </span>
                  <Link href={`/category/${categoryKey}`} className='text-[#2785ca] hover:text-blue-700 font-semibold text-sm transition-colors'>
                    View All →
                  </Link>
                </div>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6'>
                {categoryData.products.map((product) => (
                  <ProductCard
                    key={product._id || product.slug || product.title}
                    props={product}
                    review={product.reviews}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </main>
  )
}

export default CategoryWiseProductsClient