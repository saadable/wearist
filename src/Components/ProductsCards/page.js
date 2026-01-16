'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { FaStar } from "react-icons/fa6";
import { FaStarHalfAlt, FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch } from 'react-redux'
import { addToCart } from '@/store/cartSlice'

const ProductCard = ({ props }) => {
    const dispatch = useDispatch()
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [addedToCart, setAddedToCart] = useState(false);

    const slug = props?.slug ?? props?.id ?? props?.title?.toString().toLowerCase().trim().replace(/[^a-z0-9]+/g, '-') ;

    // Handle image - use first image if array, otherwise use single image
    const displayImage = Array.isArray(props.image) ? props.image[0] : props.image

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
        <div className='product-card flex flex-col items-center gap-2 sm:gap-3 p-2  border border-[#2785ca] bg-white rounded-lg sm:rounded-[10px] shadow-md hover:shadow-lg transition-shadow w-[250px] sm:w-[250px] h-auto'>
            <div className="image relative w-full sm:w-[250px] overflow-hidden rounded-md flex items-center flex-col justify-center">
                <button
                    type="button"
                    onClick={toggleWishlist}
                    title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                    aria-pressed={isWishlisted}
                    className={`absolute top-2 sm:top-3 left-2 sm:left-3 z-20 transition-all bg-white rounded-full p-1.5 sm:p-2 shadow-md hover:shadow-lg`}
                >
                    {isWishlisted ? <FaHeart className='text-red-400 w-4 h-4 sm:w-5 sm:h-5' /> : <FaRegHeart className='text-red-400 w-4 h-4 sm:w-5 sm:h-5 font-extralight' />}
                </button>
                <Link href={`/products/${slug}`} className='block overflow-hidden rounded'>
                  <Image src={displayImage} alt={props.altText} width={1000} height={1000} className='w-[230px] h-auto rounded-md group-hover:scale-110 transition-transform duration-300' />
                </Link>
            </div>
            <div className='product-details flex flex-col items-start gap-1.5 sm:gap-2 w-full flex-1'>
                <h1 className='font-bold text-xs sm:text-sm md:text-base text-gray-800 line-clamp-2'><Link href={`/products/${slug}`}>{props.title}</Link></h1>
                <div className='prices w-full'>
                    <div className='flex items-center gap-1.5 sm:gap-2 mb-1'>
                        <span className='new-price font-bold text-[#2785ca] text-sm sm:text-base md:text-lg'>PKR {props.new_price}</span>
                        <span className='old-price line-through text-gray-400 text-xs sm:text-sm'>PKR {props.old_price}</span>
                    </div>

                    <div className="rating flex items-center gap-0.5 text-xs sm:text-sm mt-1">
                        <FaStar className='text-[#eecc0c] w-3 h-3 sm:w-4 sm:h-4' />
                        <FaStar className='text-[#eecc0c] w-3 h-3 sm:w-4 sm:h-4' />
                        <FaStar className='text-[#eecc0c] w-3 h-3 sm:w-4 sm:h-4' />
                        <FaStar className='text-[#eecc0c] w-3 h-3 sm:w-4 sm:h-4' />
                        <FaStarHalfAlt className='text-[#eecc0c] w-3 h-3 sm:w-4 sm:h-4' />
                        <p className='text-gray-600 text-xs sm:text-sm ml-1'>({props.review_count})</p>
                    </div>
                </div>
                <div className="cart-b w-full mt-auto">
                    <button 
                        onClick={() => {
                            dispatch(addToCart({
                                id: props.slug,
                                ...props,
                            }))
                            setAddedToCart(true)
                            setTimeout(() => setAddedToCart(false), 2000)
                        }}
                        className={`w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-bold rounded transition-all duration-200 ${
                            addedToCart 
                                ? 'bg-green-600 text-white' 
                                : 'bg-[#2785ca] text-white hover:bg-[#1f6fa8]'
                        }`}
                    >
                        {addedToCart ? '✓ Added' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
