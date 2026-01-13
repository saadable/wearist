'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import { products } from '../../../data/products'
import ProductDetail from '../../../Components/ProductDetail/ProductDetail'

const ProductPage = ({ params }) => {
//   const { slug } = params
const product = products.find((p) => p.slug === useParams().slug)
  if (!product) {
    console.log('Product dont found');
    
  } 


  if (!product) {
    return (
      <div className='max-w-4xl mx-auto p-6'>
        <p className='text-red-600'>Product not found.</p>
      </div>
    )
  }

  return (
    <main className='py-8 px-4'>
      <ProductDetail product={product} />
    </main>
  )
}

export default ProductPage
