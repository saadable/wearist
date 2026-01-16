'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { FaStar } from 'react-icons/fa6'
import { products } from '@/data/products'
import { useParams } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { addToCart } from '@/store/cartSlice'

const ProductDetail = ({ product }) => {
  const params = useParams()
  const dispatch = useDispatch()
  const productData = products.find((p) => p.slug === params.slug) || product
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [displayImages, setDisplayImages] = useState([])
  const [addedToCart, setAddedToCart] = useState(false)

  useEffect(() => {
    if (productData?.image) {
      const images = Array.isArray(productData.image) ? productData.image : [productData.image]
      setDisplayImages(images)
      setSelectedImageIndex(0)
    }
  }, [productData])

  if (!productData) return null

  const currentImage = displayImages[selectedImageIndex] || productData.mainImage || displayImages[0]

  return (
    <article className='max-w-6xl mx-auto bg-white border border-[#2785ca] rounded-lg shadow-md p-4 sm:p-6 md:p-8'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8'>
        {/* Image Gallery Section */}
        <div className='flex flex-col gap-4'>
          {/* Main Image */}
          <div className='relative bg-gray-100 rounded-lg overflow-hidden'>
            <Image 
              src={currentImage} 
              alt={productData.altText || productData.title} 
              width={600} 
              height={600} 
              className='w-full h-auto object-cover aspect-square' 
              priority
            />
          </div>

          {/* Thumbnail Gallery */}
          {displayImages.length > 1 && (
            <div className='flex gap-2 sm:gap-3 overflow-x-auto pb-2'>
              {displayImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`shrink-0 w-16 sm:w-20 h-16 sm:h-20 rounded-md overflow-hidden border-2 transition-all ${
                    selectedImageIndex === idx
                      ? 'border-[#2785ca] shadow-md'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  aria-label={`View image ${idx + 1}`}
                  aria-pressed={selectedImageIndex === idx}
                >
                  <Image
                    src={img}
                    alt={`${productData.title} - Image ${idx + 1}`}
                    width={80}
                    height={80}
                    className='w-full h-full object-cover'
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info Section */}
        <div className='flex flex-col gap-4 md:gap-6'>
          <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-[#2785ca]'>{productData.title}</h1>
          
          <p className='text-sm sm:text-base text-gray-700 leading-relaxed'>{productData.desc}</p>

          <div className='flex flex-col gap-3 py-3 md:py-4 border-y border-gray-200'>
            <div className='flex items-center gap-3 flex-wrap'>
              <div className='text-xl sm:text-2xl md:text-3xl font-bold text-green-600'>PKR {productData.new_price}</div>
              {productData.old_price && (
                <div className='line-through text-[#2785ca] text-sm sm:text-base font-medium'>PKR {productData.old_price}</div>
              )}
            </div>

            <div className='flex items-center gap-2 flex-wrap'>
              <div className='flex items-center gap-1 text-[#eecc0c] text-sm sm:text-base'>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <span className='text-xs sm:text-sm text-gray-600'>({productData.review_count} reviews)</span>
            </div>
          </div>

          <div className='mt-4 flex flex-col sm:flex-row gap-3'>
            <button
              onClick={() => {
                dispatch(addToCart({
                  id: productData.slug,
                  ...productData,
                }))
                setAddedToCart(true)
                setTimeout(() => setAddedToCart(false), 2000)
              }}
              className={`flex-1 px-5 py-2 sm:py-3 rounded-md font-semibold transition-colors text-sm sm:text-base ${
                addedToCart
                  ? 'bg-green-600 text-white'
                  : 'bg-[#2785ca] text-white hover:bg-[#1f6fa8]'
              }`}
            >
              {addedToCart ? '✓ Added to Cart' : 'Add to Cart'}
            </button>
            <button className='flex-1 border-2 border-[#2785ca] text-[#2785ca] px-5 py-2 sm:py-3 rounded-md font-semibold hover:bg-[#2785ca] hover:text-white transition-colors text-sm sm:text-base'>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default ProductDetail
