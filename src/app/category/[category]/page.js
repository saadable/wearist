'use client'

import React, { useMemo } from 'react'
import { useParams } from 'next/navigation'
import ProductCard from '@/Components/ProductsCards/page'
import { useProductsBySpecificCategory } from '@/hooks/useProducts'

const CategoryProductsPage = () => {
  const params = useParams()
  const categorySlug = params.category

  const { products, loading, error } = useProductsBySpecificCategory(categorySlug)

  // Format category name for display
  const displayCategoryName = useMemo(() => {
    if (!categorySlug) return 'Products'
    return categorySlug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }, [categorySlug])

  // Product count
  const productCount = products.length

  if (error) {
    return (
      <main className='max-w-7xl mx-auto px-4 py-6 sm:py-8 md:py-12'>
        <header className='mb-8'>
          <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-[#2785ca] mb-2'>
            {displayCategoryName}
          </h1>
          <p className='text-sm sm:text-base text-gray-600'>
            Browse products in this category
          </p>
        </header>
        <div className='text-center py-12'>
          <p className='text-red-600'>Error: {error}</p>
        </div>
      </main>
    )
  }

  return (
    <main className='max-w-7xl mx-auto px-4 py-6 sm:py-8 md:py-12'>
      {/* Header Section */}
      <header className='mb-8 md:mb-12'>
        <div className='flex items-baseline justify-between mb-3'>
          <div>
            <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-[#2785ca] mb-2'>
              {displayCategoryName}
            </h1>
            <p className='text-sm sm:text-base text-gray-600'>
              Explore our {displayCategoryName.toLowerCase()} collection
            </p>
          </div>
          <div className='text-right'>
            <span className='inline-block bg-[#2785ca] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold'>
              {productCount} {productCount === 1 ? 'Product' : 'Products'}
            </span>
          </div>
        </div>
      </header>

      {/* Loading State */}
      {loading && (
        <div className='flex items-center justify-center py-12'>
          <div className='text-center'>
            <div className='inline-block mb-4'>
              <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2785ca]'></div>
            </div>
            <p className='text-gray-600'>Loading products...</p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && productCount === 0 && (
        <div className='text-center py-12'>
          <div className='mb-4'>
            <div className='text-5xl mb-4'>📦</div>
            <h3 className='text-xl font-semibold text-gray-800 mb-2'>No Products Found</h3>
            <p className='text-gray-600 mb-6'>
              We don't have any products in the {displayCategoryName.toLowerCase()} category yet.
            </p>
          </div>
          <a 
            href='/all-products' 
            className='inline-block px-6 py-2 bg-[#2785ca] text-white rounded-lg hover:bg-blue-700 transition-colors'
          >
            Browse All Products
          </a>
        </div>
      )}

      {/* Products Grid */}
      {!loading && productCount > 0 && (
        <section>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6'>
            {products.map((product) => (
              <ProductCard
                key={product._id || product.slug || product.title}
                props={product}
                review={product.reviews}
              />
            ))}
          </div>

          {/* Footer Info */}
          <div className='mt-8 sm:mt-12 p-4 sm:p-6 bg-gray-50 rounded-lg border border-gray-200'>
            <p className='text-center text-sm sm:text-base text-gray-700'>
              Showing <span className='font-bold'>{productCount}</span> {productCount === 1 ? 'product' : 'products'} in <span className='font-bold'>{displayCategoryName}</span> category
            </p>
          </div>
        </section>
      )}
    </main>
  )
}

export default CategoryProductsPage
