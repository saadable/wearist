'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { FaStar } from "react-icons/fa6";

const capitalize = (value) => {
  if (typeof value !== 'string' || value.length === 0) return value
  return value.charAt(0).toUpperCase() + value.slice(1)
}
import { FaStarHalfAlt, FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch } from 'react-redux'
import { addToCart } from '@/store/cartSlice'

const ProductCard = ({ props }) => {
    const dispatch = useDispatch()
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [addedToCart, setAddedToCart] = useState(false);
    const [imageLoading, setImageLoading] = useState(true)
    const [imageError, setImageError] = useState(false)

    const slug = props?.slug ?? props?.id ?? props?.title?.toString().toLowerCase().trim().replace(/[^a-z0-9]+/g, '-') ;

    // Handle image - prioritize images array from backend, fallback to old format
    const getDisplayImage = () => {
        // If images array from backend (new format)
        if (Array.isArray(props.images) && props.images.length > 0) {
            const firstImg = props.images[0];
            if (typeof firstImg === 'string') return firstImg;
            if (firstImg?.url) return firstImg.url;
        }
        // Fallback to old image format
        if (Array.isArray(props.image) && props.image.length > 0) {
            const firstImg = props.image[0];
            if (typeof firstImg === 'string') return firstImg;
            if (firstImg?.src) return firstImg.src; // Next.js Image object
            return firstImg;
        }
        // Single string image
        if (typeof props.image === 'string') {
            return props.image
        }
        // Check if it's a Next.js Image object
        if (props.image?.src) {
            return props.image.src
        }
        // Fallback to mainImage
        if (props.mainImage) {
            if (typeof props.mainImage === 'string') return props.mainImage;
            if (props.mainImage?.src) return props.mainImage.src;
            return props.mainImage;
        }
        return null
    }

    const displayImage = getDisplayImage()

    // calculate discount percentage if not provided explicitly
    const computedDiscount = (() => {
        if (props.discount != null) return props.discount;
        const oldp = Number(props.old_price || 0);
        const newp = Number(props.new_price || 0);
        if (oldp && newp && oldp > newp) {
            return Math.round(((oldp - newp) / oldp) * 100);
        }
        return 0;
    })();

    const inStock = (() => {
        const stockValue = props.stock ?? props.inStock ?? props.available ?? props.quantity ?? props.qty
        if (stockValue == null) return true
        if (stockValue === false || stockValue === 'false' || stockValue === 0 || stockValue === '0') return false
        if (typeof stockValue === 'string') {
            const normalized = stockValue.toLowerCase().trim()
            if (normalized === 'outofstock' || normalized === 'out of stock' || normalized === 'out' || normalized === 'unavailable') return false
            if (normalized === 'in stock' || normalized === 'instock' || normalized === 'available' || normalized === 'true') return true
        }
        if (typeof stockValue === 'number') return stockValue > 0
        return Boolean(stockValue)
    })()

    // Optimize Cloudinary URL for better performance
    const getOptimizedCloudinaryUrl = (url) => {
        if (!url) return null
        
        // If it's already a Cloudinary URL, add optimization parameters
        if (url.includes('cloudinary.com') || url.includes('res.cloudinary.com')) {
            // Add quality, width, and format optimization
            if (url.includes('?')) {
                return `${url}&q_auto=true&f_auto=true&w_400&h_400&c_fill`
            } else {
                return `${url}?q_auto=true&f_auto=true&w_400&h_400&c_fill`
            }
        }
        
        return url
    }

    const optimizedImage = getOptimizedCloudinaryUrl(displayImage)

    useEffect(() => {
        const key = props?.id ?? props?.title;
        if (!key) return;
        try {
            const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
            setIsWishlisted(wishlist.includes(key));
        } catch (e) {
            setIsWishlisted(false);
        }
    }, [props?.id, props?.title]);

    useEffect(() => {
        const handleStorage = () => {
            const key = props?.id ?? props?.title;
            if (!key) return;
            const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
            setIsWishlisted(wishlist.includes(key));
        };
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, [props?.id, props?.title]);

    const toggleWishlist = () => {
        const key = props?.id ?? props?.title;
        if (!key) return;
        try {
            const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
            let newList;
            if (wishlist.includes(key)) {
                newList = wishlist.filter(item => item !== key);
                setIsWishlisted(false);
            } else {
                newList = [...wishlist, key];
                setIsWishlisted(true);
            }
            localStorage.setItem('wishlist', JSON.stringify(newList));
        } catch (e) {
            console.error('wishlist toggle error', e);
        }
    };

    return (
        <div className='product-card flex flex-col items-center gap-2 sm:gap-3 p-2 border border-[#2785ca] bg-white rounded-lg sm:rounded-[10px] shadow-md hover:shadow-xl transition-all duration-300 w-[250px] h-[400px]'>
            {/* Image Section */}
            <div className="image relative w-full sm:w-[250px] h-[250px] sm:h-[250px] overflow-hidden rounded-md flex items-center justify-center bg-gray-50 group">
                {/* Skeleton Loading */}
                {imageLoading && !imageError && (
                    <div className='absolute inset-0 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse'></div>
                )}

                {/* Wishlist Button */}
                <button
                    type="button"
                    onClick={toggleWishlist}
                    title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                    aria-pressed={isWishlisted}
                    className={`absolute top-2 sm:top-3 left-2 sm:left-3 z-20 transition-all bg-white rounded-full p-1.5 sm:p-2 shadow-md hover:shadow-lg hover:scale-110`}
                >
                    {isWishlisted ? <FaHeart className='text-red-500 w-4 h-4 sm:w-5 sm:h-5' /> : <FaRegHeart className='text-red-400 w-4 h-4 sm:w-5 sm:h-5' />}
                </button>

                {/* Product Link with Image */}
                <Link href={`/products/${slug}`} className='block w-full h-[300px] overflow-hidden'>
                    {optimizedImage && !imageError ? (
                        <img
                            src={optimizedImage}
                            alt={props.altText || props.title}
                            className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300'
                            onLoad={() => setImageLoading(false)}
                            onError={() => {
                                setImageLoading(false)
                                setImageError(true)
                            }}
                            loading="lazy"
                        />
                    ) : (
                        <div className='w-full h-full flex items-center justify-center bg-gray-200'>
                            <span className='text-gray-500 text-sm'>Image Not Available</span>
                        </div>
                    )}
                </Link>

                {/* Discount Badge */}
                {computedDiscount > 0 && (
                    <div className='absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-md text-xs sm:text-sm font-bold shadow-md'>
                        {computedDiscount}% OFF
                    </div>
                )}
            </div>

            {/* Product Details Section */}
            <div className='product-details flex flex-col items-start gap-1 sm:gap-2 w-full flex-1'>
                <div className='flex flex-wrap items-center gap-2 '>
                    {props.brand && (
                        <span className='rounded-full bg-[#2785ca]/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0f4e87]'>
                            {props.brand}
                        </span>
                    )}
                    {props.category && (
                        <span className='rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-600'>
                            {capitalize(props.category)}
                        </span>
                    )}
                </div>
                <div className='pb-1'>
                    <span className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${inStock ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                        {inStock ? 'In stock' : 'Out of stock'}
                    </span>
                </div>
                {/* Title */}
                <h1 className='font-bold text-xs sm:text-sm md:text-base text-gray-800 line-clamp-2 hover:text-[#2785ca] transition-colors'>
                    <Link href={`/products/${slug}`}>{props.title}</Link>
                </h1>

                {/* Prices */}
                <div className='prices w-full'>
                    <div className='flex items-center gap-1.5 sm:gap-2 mb-1'>
                        <span className='new-price font-bold text-[#2785ca] text-sm sm:text-base md:text-lg'>
                            PKR {props.new_price?.toLocaleString('en-US') || '0'}
                        </span>
                        {props.old_price && props.old_price > props.new_price && (
                            <span className='old-price line-through text-gray-400 text-xs sm:text-sm'>
                                PKR {props.old_price?.toLocaleString('en-US') || '0'}
                            </span>
                        )}
                    </div>

                    {/* Rating */}
                    <div className="rating flex items-center gap-0.5 text-xs sm:text-sm mt-1">
                        <FaStar className='text-[#eecc0c] w-3 h-3 sm:w-4 sm:h-4' />
                        <FaStar className='text-[#eecc0c] w-3 h-3 sm:w-4 sm:h-4' />
                        <FaStar className='text-[#eecc0c] w-3 h-3 sm:w-4 sm:h-4' />
                        <FaStar className='text-[#eecc0c] w-3 h-3 sm:w-4 sm:h-4' />
                        <FaStarHalfAlt className='text-[#eecc0c] w-3 h-3 sm:w-4 sm:h-4' />
                        <p className='text-gray-600 text-xs sm:text-sm ml-1'>
                            ({props.reviews || props.review_count || 0})
                        </p>
                    </div>
                </div>

                {/* Add to Cart Button */}
                <div className="cart-b w-full mt-auto">
                    <button 
                        onClick={() => {
                            if (!inStock) return
                            dispatch(addToCart({
                                id: props.slug,
                                ...props,
                                image: displayImage, // Use the properly extracted image URL for cart display
                            }))
                            setAddedToCart(true)
                            setTimeout(() => setAddedToCart(false), 2000)
                        }}
                        disabled={!inStock}
                        className={`w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-bold rounded transition-all duration-200 ${
                            addedToCart 
                                ? 'bg-green-600 text-white' 
                                : inStock
                                    ? 'bg-[#2785ca] text-white hover:bg-[#1f6fa8] active:scale-95'
                                    : 'bg-slate-300 text-slate-600 cursor-not-allowed'
                        }`}
                    >
                        {addedToCart ? '✓ Added' : inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
