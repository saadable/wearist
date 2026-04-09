'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { FaStar } from 'react-icons/fa6'
import { useRouter, useParams } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { clearCart, addToCart } from '@/store/cartSlice'
import { axiosClient } from '@/utils/axiosClient'
import ReviewCard from '@/Components/Reviews/ReviewCard'
import ReviewForm from '@/Components/Reviews/ReviewForm'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import dynamic from 'next/dynamic'

const ReactMarkdown = dynamic(() => import('react-markdown'), {
  loading: () => <p className="text-gray-600">Loading...</p>,
  ssr: false,
})

const ProductDetail = () => {
  const params = useParams()
  const router = useRouter()
  const dispatch = useDispatch()
  const [productData, setProductData] = useState(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [displayImages, setDisplayImages] = useState([])
  const [addedToCart, setAddedToCart] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [imageLoading, setImageLoading] = useState(true)
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false)
  const [approvedReviews, setApprovedReviews] = useState([])
  const [reviewsLoading, setReviewsLoading] = useState(true)
  const [reviewsError, setReviewsError] = useState(null)

  // Fetch product by slug from backend
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        setError(null)

        if (!params?.slug) {
          console.warn('⚠️ No slug provided in params:', params);
          setError('Product slug not found in URL')
          setLoading(false)
          return
        }

        console.log('🔍 Fetching product with slug:', params.slug)
        const response = await axiosClient.get(`/api/products/product/${params.slug}`)

        console.log('📦 API Response:', response.data)

        if (response.data?.Result?.product) {
          console.log('✅ Product loaded successfully:', response.data.Result.product.title)
          setProductData(response.data.Result.product)
        } else if (response.data?.product) {
          console.log('✅ Product loaded successfully:', response.data.product.title)
          setProductData(response.data.product)
        } else {
          console.error('❌ No product in response')
          setError('Product not found in server response')
        }
      } catch (err) {
        console.error('🔴 Error fetching product:', {
          message: err.message,
          status: err.response?.status,
          data: err.response?.data,
          slug: params?.slug
        })
        setError(err.response?.data?.message || err.message || 'Failed to load product')
      } finally {
        setLoading(false)
      }
    }

    if (params?.slug) {
      fetchProduct()
    } else {
      console.warn('⚠️ Waiting for slug to load...')
    }
  }, [params?.slug])

  // Fetch approved product reviews
  useEffect(() => {
    const fetchApprovedReviews = async () => {
      if (!params?.slug) return
      try {
        setReviewsLoading(true)
        setReviewsError(null)
        const response = await axiosClient.get(`/api/products/product-reviews/${encodeURIComponent(params.slug)}`)
        setApprovedReviews(response.data.Result.reviews || [])
      } catch (err) {
        console.error('🔴 Error fetching approved product reviews:', err)
        setReviewsError('Unable to load customer reviews at this time.')
      } finally {
        setReviewsLoading(false)
      }
    }

    fetchApprovedReviews()
  }, [params?.slug])

  // Handle image display
  useEffect(() => {
    if (productData) {
      let images = []

      // Get images from backend format (images array)
      if (Array.isArray(productData.images) && productData.images.length > 0) {
        images = productData.images.map(img =>
          typeof img === 'string' ? img : img?.url
        ).filter(Boolean)
      }

      // Fallback to single image field
      if (images.length === 0 && productData.image) {
        images = Array.isArray(productData.image.url) ? productData.image.url : [productData.image.url]
      }

      setDisplayImages(images)
      setSelectedImageIndex(0)
    }
  }, [productData])

  // Get optimized image URL
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return null
    if (typeof imageUrl !== 'string') return imageUrl

    // Return the raw URL - Next.js Image will handle optimization
    return imageUrl
  }

  // Loading skeleton
  if (loading) {
    return (
      <article className='max-w-6xl mx-auto bg-white border border-[#2785ca] rounded-lg shadow-md p-4 sm:p-6 md:p-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8'>
          {/* Image Skeleton */}
          <div className='flex flex-col gap-4'>
            <div className='w-full aspect-square bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg animate-pulse'></div>
            <div className='flex gap-2 sm:gap-3'>
              {[1, 2, 3, 4].map(i => (
                <div key={i} className='w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-md animate-pulse'></div>
              ))}
            </div>
          </div>

          {/* Content Skeleton */}
          <div className='flex flex-col gap-4 md:gap-6'>
            <div className='h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse'></div>
            <div className='space-y-2'>
              <div className='h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse'></div>
              <div className='h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse w-5/6'></div>
            </div>
            <div className='h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse'></div>
            <div className='flex gap-3'>
              <div className='flex-1 h-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse'></div>
              <div className='flex-1 h-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse'></div>
            </div>
          </div>
        </div>
      </article>
    )
  }

  // Error state
  if (error || !productData) {
    return (
      <article className='max-w-6xl mx-auto bg-white border border-red-300 rounded-lg shadow-md p-6 md:p-8'>
        <div className='text-center py-12'>
          <p className='text-2xl font-bold text-red-600 mb-4'>⚠️ Product Not Found</p>
          <p className='text-gray-700 mb-6 text-lg'>{error || 'Unable to load product details'}</p>

          {/* Debugging Info */}
          <div className='bg-gray-100 rounded-lg p-4 mt-6 text-left max-w-2xl mx-auto'>
            <p className='text-sm font-semibold text-gray-700 mb-2'>Debug Information:</p>
            <div className='text-xs text-gray-600 space-y-1 font-mono'>
              <p>📍 Requested Slug: <span className='text-blue-600'>{params?.slug || 'Not provided'}</span></p>
              <p>🔗 API Endpoint: <span className='text-blue-600'>/api/products/product/{params?.slug || 'slug'}</span></p>
              <p>❌ Error Message: <span className='text-red-600'>{error || 'Product not found'}</span></p>
              <p className='text-gray-500 mt-3'>Please check:</p>
              <ul className='list-disc list-inside text-gray-600 space-y-1'>
                <li>Backend API is running on localhost:4000</li>
                <li>Product with this slug exists in database</li>
                <li>Check browser console (F12) for more details</li>
              </ul>
            </div>
          </div>

          <button
            onClick={() => window.location.href = '/products'}
            className='mt-6 inline-block px-6 py-2 bg-[#2785ca] text-white rounded-lg hover:bg-[#1f6fa8] transition-colors'
          >
            ← Back to Products
          </button>
        </div>
      </article>
    )
  }

  const currentImage = displayImages[selectedImageIndex]
  const reviewCount = approvedReviews.length
  const averageRating = reviewCount
    ? (approvedReviews.reduce((sum, r) => sum + (Number(r.rating) || 0), 0) / reviewCount).toFixed(1)
    : null;

  return (
    <article className='max-w-6xl mx-auto bg-white border border-[#2785ca] rounded-lg shadow-md p-4 sm:p-6 md:p-8'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8'>
        {/* Image Gallery Section */}
        <div className='flex flex-col gap-4'>
          {/* Main Image */}
          <div className='relative bg-gray-100 rounded-lg overflow-hidden aspect-square'>
            {imageLoading && (
              <div className='absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse'></div>
            )}
            {currentImage && (
              <Image
                src={getImageUrl(currentImage)}
                alt={productData.title}
                fill
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                quality={85}
                priority={true}
                className='object-cover'
                onLoadingComplete={() => setImageLoading(false)}
              />
            )}
          </div>

          {/* Thumbnail Gallery */}
          {displayImages.length > 1 && (
            <div className='flex gap-2 sm:gap-3 overflow-x-auto pb-2'>
              {displayImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedImageIndex(idx)
                    setImageLoading(true)
                  }}
                  className={`shrink-0 w-16 sm:w-20 h-16 sm:h-20 rounded-md overflow-hidden border-2 transition-all relative ${selectedImageIndex === idx
                    ? 'border-[#2785ca] shadow-md'
                    : 'border-gray-300 hover:border-gray-400'
                    }`}
                  aria-label={`View image ${idx + 1}`}
                  aria-pressed={selectedImageIndex === idx}
                >
                  <Image
                    src={getImageUrl(img)}
                    alt={`${productData.title} - Image ${idx + 1}`}
                    fill
                    sizes='80px'
                    quality={75}
                    className='object-cover'
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info Section */}
        <div className='flex flex-col gap-4 md:gap-6'>
          <div>
            <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-[#2785ca] mb-2'>
              {productData.title}
            </h1>
            {/* metadata row: brand, category, SKU */}
            <div className='mt-1 flex flex-wrap items-center gap-4 text-sm text-gray-600'>
              {productData.brand && (
                <div>
                  <span className='font-semibold text-gray-800'>Brand:</span>{' '}
                  {productData.brand}
                </div>
              )}
              {productData.category && (
                <div>
                  <span className='font-semibold text-gray-800'>Category:</span>{' '}
                  {productData.category}
                </div>
              )}
              {productData.sku && (
                <div>
                  <span className='font-semibold text-gray-800'>SKU:</span>{' '}
                  {productData.sku}
                </div>
              )}
            </div>
          </div>

          {/* Price and Rating Section */}
          <div className='flex flex-col gap-3 py-3 md:py-4 border-y border-gray-200'>
            <div className='flex items-center gap-3 flex-wrap'>
              <div className='text-2xl sm:text-3xl md:text-4xl font-bold text-green-600'>
                PKR {productData.new_price?.toLocaleString('en-PK')}
              </div>
              {productData.old_price && productData.old_price > productData.new_price && (
                <div className='line-through text-[#2785ca] text-sm sm:text-base font-medium'>
                  PKR {productData.old_price?.toLocaleString('en-PK')}
                </div>
              )}
              {productData.discount && (
                <span className='bg-red-500 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-semibold'>
                  {productData.discount}% OFF
                </span>
              )}
            </div>

            {/* Rating Section */}
            {reviewsLoading ? (
              <div className='text-sm sm:text-base text-gray-600'>Loading approved reviews…</div>
            ) : reviewCount > 0 ? (
              <div className='flex items-center gap-3 flex-wrap'>
                <div className='flex items-center gap-1 text-[#eecc0c]'>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <FaStar key={i} className={i <= Math.round(Number(averageRating) || 0) ? 'text-sm sm:text-base text-[#eecc0c]' : 'text-sm sm:text-base text-gray-300'} />
                  ))}
                </div>
                <span className='text-xs sm:text-sm text-gray-600 font-medium'>
                  {averageRating} average • {reviewCount} approved {reviewCount === 1 ? 'review' : 'reviews'}
                </span>
              </div>
            ) : (
              <div className='text-sm sm:text-base text-gray-600'>No Reviews Available Yet.</div>
            )}
          </div>

          {/* Stock Status */}
          {productData.stock !== undefined && (
            <div className='flex items-center gap-2'>
              <span className={`w-3 h-3 rounded-full ${productData.stock ? 'bg-green-500' : 'bg-red-500'}`}></span>
              <span className='text-sm font-semibold text-black'>
                {productData.stock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          )}

          {/* Action Buttons */}
          <div className='mt-4 flex flex-col sm:flex-row gap-3'>
            <button
              onClick={() => {
                dispatch(addToCart({
                  id: productData._id || productData.slug,
                  title: productData.title,
                  new_price: productData.new_price,
                  image: displayImages[0],
                  slug: productData.slug,
                  stock: productData.stock === true || productData.stock === 'true',
                  reviews: productData.reviews || 0,
                }))
                setAddedToCart(true)
                setTimeout(() => setAddedToCart(false), 2000)
              }}
              disabled={!productData.stock}
              className={`flex-1 px-5 py-2 sm:py-3 rounded-md font-semibold transition-colors text-sm sm:text-base ${addedToCart
                ? 'bg-green-600 text-white'
                : productData.stock
                  ? 'bg-[#2785ca] text-white hover:bg-[#1f6fa8]'
                  : 'bg-gray-400 text-white cursor-not-allowed'
                }`}
            >
              {addedToCart ? '✓ Added to Cart' : 'Add to Cart'}
            </button>
            <button
              onClick={() => {
                // Clear existing cart and add current product for buy now
                dispatch(clearCart())
                dispatch(addToCart({
                  id: productData._id || productData.slug,
                  title: productData.title,
                  new_price: productData.new_price,
                  image: displayImages[0],
                  slug: productData.slug,
                  stock: productData.stock === true || productData.stock === 'true',
                  reviews: productData.reviews || 0,
                }))
                // Redirect to checkout
                router.push('/checkout')
              }}
              disabled={!productData.stock}
              className='flex-1 border-2 border-[#2785ca] text-[#2785ca] px-5 py-2 sm:py-3 rounded-md font-semibold hover:bg-[#2785ca] hover:text-white transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#2785ca]'
            >
              Buy Now
            </button>
          </div>

          {/* Product Description */}
          <div className='mt-6 pt-6 border-t border-gray-200'>
            <h3 className='text-lg font-semibold text-gray-800 mb-4'>Product Description</h3>
            <div className='text-sm sm:text-base text-gray-700 leading-relaxed'>
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p className="mb-4">{children}</p>,
                  strong: ({ children }) => <strong className="font-bold text-gray-900">{children}</strong>,
                  em: ({ children }) => <em className="italic">{children}</em>,
                  ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>,
                  li: ({ children }) => <li className="text-gray-700">{children}</li>,
                  h1: ({ children }) => <h1 className="text-xl font-bold text-gray-900 mb-2">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-lg font-bold text-gray-900 mb-2">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-base font-bold text-gray-900 mb-2">{children}</h3>,
                }}
              >
                {productData.description}
              </ReactMarkdown>
            </div>
          </div>

        </div>
      </div>

      {/* Prototype reviews section */}
      <div className="mt-8">
        <div className="customer-reviews flex items-center justify-between">
          <div className="headings">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Customer Reviews
              {reviewCount > 0 && (
                <span className="text-base font-medium text-gray-600 ml-2">({reviewCount})</span>
              )}
            </h2>
            {averageRating && (
              <div className="flex items-center gap-1 text-yellow-400 mb-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <FaStar key={i} className={i <= Math.round(averageRating) ? 'w-5 h-5' : 'w-5 h-5 text-gray-300'} />
                ))}
                <span className="ml-2 text-gray-600 text-sm">{averageRating}</span>
              </div>
            )}
          </div>
          <button 
            onClick={() => setIsReviewFormOpen(true)}
            productId={productData._id}
            className='w-[100px] h-[30px] flex items-center justify-center bg-[#2785ca] border-[#2785ca] rounded-[10px] text-white text-[10px] font-semibold cursor-pointer hover:bg-[#1f6fa8] hover:shadow-md transition-all duration-200'
          >
            Add a Review
          </button>
        </div>
        <div className="bg-white rounded-lg shadow-md divide-y divide-gray-200 ">
          {reviewsError ? (
            <div className='p-8 text-center text-rose-600'>
              {reviewsError}
            </div>
          ) : reviewsLoading ? (
            <div className='p-8 text-center text-gray-600'>Loading reviews…</div>
          ) : reviewCount > 0 ? (
            <div className="relative">
              {/* Custom Navigation Buttons */}
              <button className="custom-prev absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border-2 border-[#2785ca] rounded-full shadow-lg hover:bg-[#2785ca] hover:text-white transition-all duration-200 flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed">
                <svg className="w-5 h-5 text-[#2785ca] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="custom-next absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border-2 border-[#2785ca] rounded-full shadow-lg hover:bg-[#2785ca] hover:text-white transition-all duration-200 flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed">
                <svg className="w-5 h-5 text-[#2785ca] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                navigation={{
                  nextEl: '.custom-next',
                  prevEl: '.custom-prev'
                }}
                pagination={{
                  clickable: true,
                  bulletClass: 'custom-bullet',
                  bulletActiveClass: 'custom-bullet-active'
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                  },
                  900: {
                    slidesPerView: 2,
                  },
                  1280: {
                    slidesPerView: 2,
                  },
                }}
                slidesPerGroup={1}
                className="pb-12"
              >
                {approvedReviews.map((rev) => (
                  <SwiperSlide key={rev._id || rev.createdAt}>
                    <ReviewCard review={rev} />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Custom Pagination Styling */}
              <style dangerouslySetInnerHTML={{
                __html: `
                  .custom-bullet {
                    width: 8px !important;
                    height: 8px !important;
                    background-color: #d1d5db !important;
                    border-radius: 50% !important;
                    margin: 0 4px !important;
                    cursor: pointer !important;
                    transition: all 0.3s ease !important;
                    opacity: 1 !important;
                  }
                  .custom-bullet-active {
                    background-color: #2785ca !important;
                    transform: scale(1.2) !important;
                  }
                  .swiper-pagination {
                    bottom: 20px !important;
                  }
                `
              }} />
            </div>
          ) : (
            <div className='p-6 text-center text-gray-600'>
              <p className='text-base font-semibold text-gray-800'>No Reviews Available Yet.</p>
              <p className='mt-2'>This product has not been reviewed until now.</p>
            </div>
          )}
        </div>
      </div>

      {/* Review Form Modal */}
      <ReviewForm 
        isOpen={isReviewFormOpen} 
        onClose={() => setIsReviewFormOpen(false)}
        productName={productData?.title}
        Id={productData?._id}
      />
    </article>
  )
}

export default ProductDetail
