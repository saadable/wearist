'use client'

import React from 'react'
import ProductCard from '@/Components/ProductsCards/page'
import { useTopProductsByCategory } from '@/hooks/useProducts'

const HotProducts = () => {
  const { products, loading, error } = useTopProductsByCategory(4)

  if (error) {
    return (
      <div className='px-4 py-6 sm:py-8 md:py-12'>
        <h1 className='text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#2785ca] mb-6 md:mb-8 lg:mb-10'>
          Hot Products
        </h1>
        <div className='text-center py-8'>
          <p className='text-red-600'>Error loading products</p>
        </div>
      </div>
    )
  }

  return (
    <div className='px-4 py-6 sm:py-8 md:py-12'>
      <h1 className='text-center text-[25px] md:text-[40px] font-extrabold text-[#2785ca] mb-6 md:mb-8 lg:mb-10'>
        Hot Products
      </h1>

      {loading ? (
        <div className='text-center py-8'>
          <p className='text-gray-600'>Loading hot products...</p>
        </div>
      ) : (
        <div className='products flex flex-wrap flex-col md:flex-row items-center justify-center gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto'>
          {products.map((product, index) => {
            // compute discount percentage for display
            const oldp = Number(product.old_price || 0);
            const newp = Number(product.new_price || 0);
            const discount = oldp && newp && oldp > newp ? Math.round(((oldp - newp) / oldp) * 100) : 0;

            return (
              <ProductCard
                key={product._id || product.slug || index}
                props={{
                  title: product.title,
                  altText: product.title,
                  old_price: product.old_price,
                  new_price: product.new_price,
                  discount,
                  image: product.images?.[0]?.url || product.mainImage,
                  slug: product.slug,
                  rating: product.reviews || 4.5,
                  review_count: product.reviews || 50,
                }}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default HotProducts
