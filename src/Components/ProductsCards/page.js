'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { FaStar } from "react-icons/fa6";
import { FaStarHalfAlt, FaHeart, FaRegHeart } from "react-icons/fa";

const ProductCard = ({ props }) => {
    const [isWishlisted, setIsWishlisted] = useState(false);

    const slug = props?.slug ?? props?.id ?? props?.title?.toString().toLowerCase().trim().replace(/[^a-z0-9]+/g, '-') ;

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
        <div className='product-card flex flex-col items-center  gap-3 p-2 border border-[#2785ca] bg-[#ffff] rounded-[10px] shadow-md  w-[250px] h-[420px]'>
            <div className="image relative">
                <button
                    type="button"
                    onClick={toggleWishlist}
                    title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                    aria-pressed={isWishlisted}
                    className={`absolute top-2 left-2 z-20  transition-shadow `}
                >
                    {isWishlisted ? <FaHeart className='text-red-400 w-4 h-4' /> : <FaRegHeart className='text-red-400 w-4 h-4 font-extralight' />}
                </button>
                <Link href={`/products/${slug}`} className='block'>
                  <Image src={props.image} alt={props.altText} width={1000} height={1000} className='w-[250px] rounded-[10px]' />
                </Link>
            </div>
            <div className='product-details flex flex-col items-start gap- justify-between h-[150px]'>
                <h1 className='font-bold text-xl text-[16px] text-[#2785ca]'><Link href={`/products/${slug}`}>{props.title}</Link></h1>
                <div className='prices'>
                    <span className='new-price font-semibold text-green-600'>PKR {props.new_price} </span>

                    <span className='old-price line-through text-[#2785ca] mr-2'>PKR {props.old_price}</span>

                    <div className="rating flex items-center gap-1 ">
                        <FaStar className='text-[#eecc0c]' />
                        <FaStar className='text-[#eecc0c]' />
                        <FaStar className='text-[#eecc0c]' />
                        <FaStar className='text-[#eecc0c]' />
                        <FaStarHalfAlt className='text-[#eecc0c]' />
                    </div>
                </div>
                <div className="cart-b">
                    <button className='bg-[#2785ca] flex items-center justify-center w-[110px] h-[30px] text-[14px] font-bold rounded-[3px]'>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
