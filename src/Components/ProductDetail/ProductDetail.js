'use client'

import React from 'react'
import Image from 'next/image'
import { FaStar } from 'react-icons/fa6'
import { products } from '@/data/products'
import { useParams } from 'next/navigation'

const ProductDetail = ({ product }) => {
  if (!product) return null
  const productss = products.find((p) => p.slug === useParams().slug)
  console.log('products details', productss);
  
  

  return (
    <article className='max-w-4xl mx-auto bg-white border border-[#2785ca] rounded-lg shadow-md p-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='relative'>
          <Image src={productss.image} alt={product.altText || product.title} width={800} height={800} className='w-full h-auto rounded-lg object-cover' />
        </div>
        
        <div className='flex flex-col gap-4'>
          <h1 className='text-2xl font-bold text-[#2785ca]'>{product.title}</h1>
          <p className='text-gray-700'>{product.desc}</p>

          <div className='flex items-center gap-3'>
            <div className='text-lg font-semibold text-green-600'>PKR {product.new_price}</div>
            {product.old_price && <div className='line-through text-[#2785ca] text-sm'>PKR {product.old_price}</div>}
            <div className='flex items-center gap-1 text-[#eecc0c]'>
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
          </div>

          <p className='text-gray-700 leading-relaxed'>{product.description}</p>

          <div className='mt-4'>
            <button className='bg-[#2785ca] text-white px-5 py-2 rounded-md font-semibold hover:bg-[#1f6fa8]'>Add to Cart</button>
            <button className='ml-3 border border-[#2785ca] text-[#2785ca] px-4 py-2 rounded-md font-medium'>Buy Now</button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default ProductDetail
