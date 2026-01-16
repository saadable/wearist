'use client'

import React from 'react'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { incrementQuantity, decrementQuantity, removeFromCart } from '@/store/cartSlice'
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa'
import Link from 'next/link'

const Cart = () => {
  const dispatch = useDispatch()
  const { items, totalPrice, totalItems } = useSelector(state => state.cart)

  if (items.length === 0) {
    return (
      <div className='max-w-4xl mx-auto px-4 py-8 sm:py-12 text-center'>
        <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-[#2785ca] mb-4'>Shopping Cart</h1>
        <p className='text-sm sm:text-base text-gray-600 mb-6'>Your cart is empty. Start shopping to add items!</p>
      </div>
    )
  }

  return (
    <div className='max-w-6xl mx-auto px-4 py-6 sm:py-8 md:py-12'>
      <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-[#2785ca] mb-6 md:mb-8'>Shopping Cart</h1>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-8'>
        {/* Cart Items */}
        <div className='lg:col-span-2 space-y-3'>
          {items.map(item => (
            <div
              key={item.id}
              className='flex items-center md:items-start gap-3 p-3 md:p-2 bg-white border border-[#2785ca] rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 h-[90px] md:h-auto'
            >
              {/* Product Image - Left Side */}
              <div className='shrink-0 w-16 h-16 md:w-[150px] md:h-auto rounded-md overflow-hidden border border-gray-200 bg-gray-50'>
                <Image
                  src={Array.isArray(item.image) ? item.image[0] : item.image}
                  alt={item.title}
                  width={1000}
                  height={1000}
                  className='w-full md:w-full md:h-auto  h-full '
                />
              </div>

              {/* Product Details */}
              <div className='flex-1 flex flex-col md:items-start justify-center min-w-0'>
                <h2 className='text-sm md:text-[20px] font-semibold text-[#2785ca] line-clamp-1 md:line-clamp-2'>{item.title}</h2>
                <p className='text-xs md:text-[16px] text-gray-600 mt-1'>PKR {item.new_price}</p>

                {/* Quantity Controls & Remove */}
                <div className='flex items-center justify-between gap-2 mt-2'>
                  <div className='flex items-center gap-1.5 bg-gray-100 rounded-md p-1'>
                    <button
                      onClick={() => dispatch(decrementQuantity(item.id))}
                      className='p-1 text-[#2785ca] md:text-[16px] hover:bg-[#2785ca] hover:text-white rounded transition-colors'
                      aria-label='Decrease quantity'
                    >
                      <FaMinus size={12} />
                    </button>
                    <span className='px-2 py-0.5 font-semibold md:text-[16px] text-center min-w-8 text-xs text-[#2785ca]'>{item.quantity}</span>
                    <button
                      onClick={() => dispatch(incrementQuantity(item.id))}
                      className='p-1 text-[#2785ca] md:text-[16px] hover:bg-[#2785ca] hover:text-white rounded transition-colors'
                      aria-label='Increase quantity'
                    >
                      <FaPlus size={12} />
                    </button>
                  </div>

                  <span className='text-xs font-bold md:text-[16px] text-green-600'>PKR {item.new_price * item.quantity}</span>

                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className='p-1 text-red-500 hover:bg-red-50 rounded-md transition-colors group'
                    aria-label='Remove from cart'
                  >
                    <FaTrash size={16} className='group-hover:scale-110 transition-transform' />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className='lg:col-span-1'>
          <div className='bg-[#2785ca] text-white rounded-lg p-4 sm:p-6 shadow-lg sticky top-6'>
            <h3 className='text-lg sm:text-xl md:text-2xl font-bold mb-4 md:mb-6'>Order Summary</h3>

            <div className='space-y-3 md:space-y-4 mb-4 md:mb-6'>
              <div className='flex justify-between text-sm sm:text-base'>
                <span>Items in Cart:</span>
                <span className='font-semibold'>{totalItems}</span>
              </div>
              <div className='border-t border-[#1f6fa8] pt-3 md:pt-4'>
                <div className='flex justify-between text-lg sm:text-xl'>
                  <span>Total:</span>
                  <span className='font-bold'>PKR {totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Link href='/checkout' className='block text-center bg-white text-[#2785ca] py-2 sm:py-3 rounded-md font-bold hover:bg-gray-100 transition-colors text-sm sm:text-base'>
              Proceed to Checkout
            </Link>

            <Link href='/products' className='block text-center mt-2 sm:mt-3 border-2 border-white text-white py-2 rounded-md font-semibold hover:bg-[#1f6fa8] transition-colors text-sm sm:text-base'>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
