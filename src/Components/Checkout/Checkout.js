'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useSelector, useDispatch } from 'react-redux'
import { FaUniversity, FaMoneyBillWave, FaShoppingBag, FaCheck } from 'react-icons/fa'
import Link from 'next/link'
import { clearCart } from '@/store/cartSlice'

const Checkout = () => {
  const dispatch = useDispatch()
  const { items, totalPrice } = useSelector(state => state.cart)
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  })
  const [orderPlaced, setOrderPlaced] = useState(false)

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className='max-w-4xl mx-auto px-4 py-8 sm:py-12 text-center'>
        <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-[#2785ca] mb-4'>Checkout</h1>
        <p className='text-sm sm:text-base text-gray-600 mb-6'>Your cart is empty. Add items before checkout.</p>
        <Link href='/products' className='inline-block bg-[#2785ca] text-white px-6 py-2 rounded-md font-semibold text-sm sm:text-base'>
          Continue Shopping
        </Link>
      </div>
    )
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handlePlaceOrder = (e) => {
    e.preventDefault()
    
    if (!formData.firstName || !formData.email || !formData.phone || !formData.address || !formData.city) {
      alert('Please fill in all required fields')
      return
    }

    // Order placement logic here (would connect to backend)
    console.log('Order placed:', { ...formData, paymentMethod, items, totalPrice })
    
    setOrderPlaced(true)
    dispatch(clearCart())
  }

  if (orderPlaced) {
    return (
      <div className='max-w-2xl mx-auto px-4 py-8 sm:py-12 text-center'>
        <div className='bg-green-50 border-2 border-green-500 rounded-lg p-6 sm:p-8'>
          <div className='flex justify-center mb-6'>
            <div className='bg-green-500 text-white rounded-full p-3 sm:p-4'>
              <FaCheck size={36} className='sm:w-12 sm:h-12' />
            </div>
          </div>
          <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-green-600 mb-2'>Order Placed Successfully!</h1>
          <p className='text-sm sm:text-base text-gray-700 mb-6'>Thank you for your purchase. Your order has been confirmed.</p>
          <div className='bg-white border border-gray-200 rounded-lg p-4 mb-6 text-left space-y-2'>
            <p className='text-xs sm:text-sm text-gray-600'><strong>Order ID:</strong> #WRT{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            <p className='text-xs sm:text-sm text-gray-600'><strong>Total Amount:</strong> PKR {totalPrice.toFixed(2)}</p>
            <p className='text-xs sm:text-sm text-gray-600'><strong>Payment Method:</strong> {paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod === 'bank' ? 'Bank Transfer' : paymentMethod === 'easypaisa' ? 'EasyPaisa' : 'JazzCash'}</p>
          </div>
          <Link href='/products' className='inline-block bg-[#2785ca] text-white px-6 py-2 rounded-md font-semibold text-sm sm:text-base'>
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='max-w-6xl mx-auto px-4 py-6 sm:py-8 md:py-12'>
      <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-[#2785ca] mb-6 md:mb-8'>Checkout</h1>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8'>
        {/* Checkout Form */}
        <form onSubmit={handlePlaceOrder} className='lg:col-span-2 space-y-6'>
          {/* Shipping Address */}
          <div className='bg-white border border-[#2785ca] rounded-lg p-4 sm:p-6 shadow-sm'>
            <h2 className='text-lg sm:text-xl font-bold text-[#2785ca] mb-4 flex items-center gap-2'>
              <FaShoppingBag /> Shipping Address
            </h2>
            
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-4'>
              <div>
                <label className='block text-xs sm:text-sm font-medium text-gray-700 mb-1'>First Name *</label>
                <input
                  type='text'
                  name='firstName'
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className='w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2785ca]'
                  required
                />
              </div>
              <div>
                <label className='block text-xs sm:text-sm font-medium text-gray-700 mb-1'>Last Name</label>
                <input
                  type='text'
                  name='lastName'
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className='w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2785ca]'
                />
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-4'>
              <div>
                <label className='block text-xs sm:text-sm font-medium text-gray-700 mb-1'>Email Address *</label>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  className='w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2785ca]'
                  required
                />
              </div>
              <div>
                <label className='block text-xs sm:text-sm font-medium text-gray-700 mb-1'>Phone Number *</label>
                <input
                  type='tel'
                  name='phone'
                  value={formData.phone}
                  onChange={handleInputChange}
                  className='w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2785ca]'
                  placeholder='03001234567'
                  required
                />
              </div>
            </div>

            <div className='mb-4'>
              <label className='block text-xs sm:text-sm font-medium text-gray-700 mb-1'>Street Address *</label>
              <input
                type='text'
                name='address'
                value={formData.address}
                onChange={handleInputChange}
                className='w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2785ca]'
                placeholder='123 Main Street'
                required
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4'>
              <div>
                <label className='block text-xs sm:text-sm font-medium text-gray-700 mb-1'>City *</label>
                <input
                  type='text'
                  name='city'
                  value={formData.city}
                  onChange={handleInputChange}
                  className='w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2785ca]'
                  placeholder='Karachi'
                  required
                />
              </div>
              <div>
                <label className='block text-xs sm:text-sm font-medium text-gray-700 mb-1'>Postal Code</label>
                <input
                  type='text'
                  name='postalCode'
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className='w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2785ca]'
                  placeholder='75600'
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className='bg-white border border-[#2785ca] rounded-lg p-4 sm:p-6 shadow-sm'>
            <h2 className='text-lg sm:text-xl font-bold text-[#2785ca] mb-4 flex items-center gap-2'>
              <FaMoneyBillWave /> Payment Method
            </h2>

            <div className='space-y-2 sm:space-y-3'>
              {/* Cash on Delivery */}
              <label className='flex items-center p-3 sm:p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#2785ca] hover:bg-blue-50 transition-all'>
                <input
                  type='radio'
                  name='payment'
                  value='cod'
                  checked={paymentMethod === 'cod'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className='w-4 h-4 sm:w-5 sm:h-5 text-[#2785ca]'
                />
                <div className='ml-3 sm:ml-4 flex-1'>
                  <p className='font-semibold text-sm sm:text-base text-gray-800'>Cash on Delivery</p>
                  <p className='text-xs sm:text-sm text-gray-600'>Pay when your order arrives</p>
                </div>
              </label>

              {/* Bank Transfer */}
              <label className='flex items-center p-3 sm:p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#2785ca] hover:bg-blue-50 transition-all'>
                <input
                  type='radio'
                  name='payment'
                  value='bank'
                  checked={paymentMethod === 'bank'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className='w-4 h-4 sm:w-5 sm:h-5 text-[#2785ca]'
                />
                <FaUniversity className='ml-3 sm:ml-4 text-[#2785ca] text-lg sm:text-2xl' />
                <div className='ml-3 sm:ml-4 flex-1'>
                  <p className='font-semibold text-sm sm:text-base text-gray-800'>Bank Transfer</p>
                  <p className='text-xs sm:text-sm text-gray-600'>Direct bank account transfer</p>
                </div>
              </label>

              {/* EasyPaisa */}
              <label className='flex items-center p-3 sm:p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#2785ca] hover:bg-blue-50 transition-all'>
                <input
                  type='radio'
                  name='payment'
                  value='easypaisa'
                  checked={paymentMethod === 'easypaisa'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className='w-4 h-4 sm:w-5 sm:h-5 text-[#2785ca]'
                />
                <div className='ml-3 sm:ml-4 w-10 h-7 bg-green-500 rounded flex items-center justify-center font-bold text-white text-xs'>EP</div>
                <div className='ml-3 sm:ml-4 flex-1'>
                  <p className='font-semibold text-sm sm:text-base text-gray-800'>EasyPaisa</p>
                  <p className='text-xs sm:text-sm text-gray-600'>Mobile wallet payment</p>
                </div>
              </label>

              {/* JazzCash */}
              <label className='flex items-center p-3 sm:p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#2785ca] hover:bg-blue-50 transition-all'>
                <input
                  type='radio'
                  name='payment'
                  value='jazzcash'
                  checked={paymentMethod === 'jazzcash'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className='w-4 h-4 sm:w-5 sm:h-5 text-[#2785ca]'
                />
                <div className='ml-3 sm:ml-4 w-10 h-7 bg-red-600 rounded flex items-center justify-center font-bold text-white text-xs'>JC</div>
                <div className='ml-3 sm:ml-4 flex-1'>
                  <p className='font-semibold text-sm sm:text-base text-gray-800'>JazzCash</p>
                  <p className='text-xs sm:text-sm text-gray-600'>Mobile wallet payment</p>
                </div>
              </label>
            </div>

            {/* Payment Details (show based on selection) */}
            {paymentMethod === 'bank' && (
              <div className='mt-4 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg'>
                <p className='text-xs sm:text-sm text-gray-700 mb-2'><strong>Bank Account Details:</strong></p>
                <p className='text-xs sm:text-sm text-gray-700'>Account Holder: Wearist Store</p>
                <p className='text-xs sm:text-sm text-gray-700'>Bank Name: HBL / UBL / ABL</p>
                <p className='text-xs sm:text-sm text-gray-700'>Account Number: 12345-6789-0123-4567</p>
                <p className='text-xs sm:text-sm text-yellow-600 mt-2'><strong>Note:</strong> Please add your order ID in the transfer reference</p>
              </div>
            )}

            {paymentMethod === 'easypaisa' && (
              <div className='mt-4 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg'>
                <p className='text-xs sm:text-sm text-gray-700 mb-2'><strong>EasyPaisa Account:</strong></p>
                <p className='text-xs sm:text-sm text-gray-700'>Send payment to: 0321-XXXXXX</p>
                <p className='text-xs sm:text-sm text-yellow-600 mt-2'><strong>Note:</strong> Include your order ID in the transfer reference</p>
              </div>
            )}

            {paymentMethod === 'jazzcash' && (
              <div className='mt-4 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg'>
                <p className='text-xs sm:text-sm text-gray-700 mb-2'><strong>JazzCash Account:</strong></p>
                <p className='text-xs sm:text-sm text-gray-700'>Send payment to: 0300-XXXXXX</p>
                <p className='text-xs sm:text-sm text-yellow-600 mt-2'><strong>Note:</strong> Include your order ID in the transfer reference</p>
              </div>
            )}
          </div>
        </form>

        {/* Order Summary Sidebar */}
        <div className='lg:col-span-1'>
          <div className='bg-[#2785ca] text-white rounded-lg p-4 sm:p-6 shadow-lg sticky top-6'>
            <h2 className='text-xl sm:text-2xl font-bold mb-4 md:mb-6'>Order Summary</h2>

            {/* Items */}
            <div className='space-y-2 mb-4 md:mb-6 max-h-64 overflow-y-auto'>
              {items.map(item => (
                <div key={item.id} className='flex justify-between items-start text-xs sm:text-sm pb-2 border-b border-[#1f6fa8]'>
                  <div className='flex-1'>
                    <p className='font-semibold line-clamp-2'>{item.title}</p>
                    <p className='text-[#e0e0e0] text-xs'>Qty: {item.quantity}</p>
                  </div>
                  <p className='font-semibold'>PKR {(item.new_price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className='border-t border-[#1f6fa8] pt-3 md:pt-4 space-y-2 mb-4 md:mb-6'>
              <div className='flex justify-between text-xs sm:text-sm'>
                <span>Subtotal:</span>
                <span>PKR {totalPrice.toFixed(2)}</span>
              </div>
              <div className='flex justify-between text-xs sm:text-sm'>
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className='flex justify-between text-base sm:text-lg font-bold pt-2 border-t border-[#1f6fa8]'>
                <span>Total:</span>
                <span>PKR {totalPrice.toFixed(2)}</span>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              className='w-full bg-white text-[#2785ca] py-2 sm:py-3 rounded-md font-bold text-sm sm:text-base hover:bg-gray-100 transition-colors'
            >
              Place Order
            </button>

            <Link
              href='/products'
              className='block text-center mt-2 sm:mt-3 border-2 border-white text-white py-2 rounded-md font-semibold text-sm sm:text-base hover:bg-[#1f6fa8] transition-colors'
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
        {/* Checkout Form */}
        <form onSubmit={handlePlaceOrder} className='lg:col-span-2 space-y-6'>
          {/* Shipping Address */}
          <div className='bg-white border border-[#2785ca] rounded-lg p-6 shadow-sm'>
            <h2 className='text-xl font-bold text-[#2785ca] mb-4 flex items-center gap-2'>
              <FaShoppingBag /> Shipping Address
            </h2>
            
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>First Name *</label>
                <input
                  type='text'
                  name='firstName'
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2785ca]'
                  required
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Last Name</label>
                <input
                  type='text'
                  name='lastName'
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2785ca]'
                />
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Email Address *</label>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2785ca]'
                  required
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Phone Number *</label>
                <input
                  type='tel'
                  name='phone'
                  value={formData.phone}
                  onChange={handleInputChange}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2785ca]'
                  placeholder='03001234567'
                  required
                />
              </div>
            </div>

            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Street Address *</label>
              <input
                type='text'
                name='address'
                value={formData.address}
                onChange={handleInputChange}
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2785ca]'
                placeholder='123 Main Street'
                required
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>City *</label>
                <input
                  type='text'
                  name='city'
                  value={formData.city}
                  onChange={handleInputChange}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2785ca]'
                  placeholder='Karachi'
                  required
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Postal Code</label>
                <input
                  type='text'
                  name='postalCode'
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2785ca]'
                  placeholder='75600'
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className='bg-white border border-[#2785ca] rounded-lg p-6 shadow-sm'>
            <h2 className='text-xl font-bold text-[#2785ca] mb-4 flex items-center gap-2'>
              <FaMoneyBillWave /> Payment Method
            </h2>

            <div className='space-y-3'>
              {/* Cash on Delivery */}
              <label className='flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#2785ca] hover:bg-blue-50 transition-all'>
                <input
                  type='radio'
                  name='payment'
                  value='cod'
                  checked={paymentMethod === 'cod'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className='w-5 h-5 text-[#2785ca]'
                />
                <div className='ml-4 flex-1'>
                  <p className='font-semibold text-gray-800'>Cash on Delivery</p>
                  <p className='text-sm text-gray-600'>Pay when your order arrives</p>
                </div>
              </label>

              {/* Bank Transfer */}
              <label className='flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#2785ca] hover:bg-blue-50 transition-all'>
                <input
                  type='radio'
                  name='payment'
                  value='bank'
                  checked={paymentMethod === 'bank'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className='w-5 h-5 text-[#2785ca]'
                />
                <FaUniversity className='ml-4 text-[#2785ca] text-2xl' />
                <div className='ml-4 flex-1'>
                  <p className='font-semibold text-gray-800'>Bank Transfer</p>
                  <p className='text-sm text-gray-600'>Direct bank account transfer</p>
                </div>
              </label>

              {/* EasyPaisa */}
              <label className='flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#2785ca] hover:bg-blue-50 transition-all'>
                <input
                  type='radio'
                  name='payment'
                  value='easypaisa'
                  checked={paymentMethod === 'easypaisa'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className='w-5 h-5 text-[#2785ca]'
                />
                <div className='ml-4 w-12 h-8 bg-green-500 rounded flex items-center justify-center font-bold text-white text-xs'>EP</div>
                <div className='ml-4 flex-1'>
                  <p className='font-semibold text-gray-800'>EasyPaisa</p>
                  <p className='text-sm text-gray-600'>Mobile wallet payment</p>
                </div>
              </label>

              {/* JazzCash */}
              <label className='flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#2785ca] hover:bg-blue-50 transition-all'>
                <input
                  type='radio'
                  name='payment'
                  value='jazzcash'
                  checked={paymentMethod === 'jazzcash'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className='w-5 h-5 text-[#2785ca]'
                />
                <div className='ml-4 w-12 h-8 bg-red-600 rounded flex items-center justify-center font-bold text-white text-xs'>JC</div>
                <div className='ml-4 flex-1'>
                  <p className='font-semibold text-gray-800'>JazzCash</p>
                  <p className='text-sm text-gray-600'>Mobile wallet payment</p>
                </div>
              </label>
            </div>

            {/* Payment Details (show based on selection) */}
            {paymentMethod === 'bank' && (
              <div className='mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg'>
                <p className='text-sm text-gray-700 mb-2'><strong>Bank Account Details:</strong></p>
                <p className='text-sm text-gray-700'>Account Holder: Wearist Store</p>
                <p className='text-sm text-gray-700'>Bank Name: HBL / UBL / ABL</p>
                <p className='text-sm text-gray-700'>Account Number: 12345-6789-0123-4567</p>
                <p className='text-sm text-yellow-600 mt-2'><strong>Note:</strong> Please add your order ID in the transfer reference</p>
              </div>
            )}

            {paymentMethod === 'easypaisa' && (
              <div className='mt-4 p-4 bg-green-50 border border-green-200 rounded-lg'>
                <p className='text-sm text-gray-700 mb-2'><strong>EasyPaisa Account:</strong></p>
                <p className='text-sm text-gray-700'>Send payment to: 0321-XXXXXX</p>
                <p className='text-sm text-yellow-600 mt-2'><strong>Note:</strong> Include your order ID in the transfer reference</p>
              </div>
            )}

            {paymentMethod === 'jazzcash' && (
              <div className='mt-4 p-4 bg-red-50 border border-red-200 rounded-lg'>
                <p className='text-sm text-gray-700 mb-2'><strong>JazzCash Account:</strong></p>
                <p className='text-sm text-gray-700'>Send payment to: 0300-XXXXXX</p>
                <p className='text-sm text-yellow-600 mt-2'><strong>Note:</strong> Include your order ID in the transfer reference</p>
              </div>
            )}
          </div>
        </form>

        {/* Order Summary Sidebar */}
        <div className='lg:col-span-1'>
          <div className='bg-[#2785ca] text-white rounded-lg p-6 shadow-lg sticky top-6'>
            <h2 className='text-2xl font-bold mb-6'>Order Summary</h2>

            {/* Items */}
            <div className='space-y-4 mb-6 max-h-64 overflow-y-auto'>
              {items.map(item => (
                <div key={item.id} className='flex justify-between items-start text-sm pb-3 border-b border-[#1f6fa8]'>
                  <div className='flex-1'>
                    <p className='font-semibold line-clamp-2'>{item.title}</p>
                    <p className='text-[#e0e0e0] text-xs'>Qty: {item.quantity}</p>
                  </div>
                  <p className='font-semibold'>PKR {(item.new_price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className='border-t border-[#1f6fa8] pt-4 space-y-2 mb-6'>
              <div className='flex justify-between'>
                <span>Subtotal:</span>
                <span>PKR {totalPrice.toFixed(2)}</span>
              </div>
              <div className='flex justify-between'>
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className='flex justify-between text-lg font-bold pt-2 border-t border-[#1f6fa8]'>
                <span>Total:</span>
                <span>PKR {totalPrice.toFixed(2)}</span>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              className='w-full bg-white text-[#2785ca] py-2 sm:py-3 rounded-md font-bold text-sm sm:text-base hover:bg-gray-100 transition-colors'
            >
              Place Order
            </button>

            <Link
              href='/products'
              className='block text-center mt-3 border-2 border-white text-white py-2 rounded-md font-semibold hover:bg-[#1f6fa8] transition-colors'
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      
    </div>
  
  )
}

export default Checkout
