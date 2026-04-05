'use client'

import { axiosClient } from '@/utils/axiosClient'
import { useParams } from 'next/navigation'
import React, { useState, useRef } from 'react'
import { FaStar } from 'react-icons/fa6'
import { IoClose } from 'react-icons/io5'
import { MdAdd } from 'react-icons/md'
import { MdDeleteOutline } from 'react-icons/md'

const ReviewForm =  ({ isOpen, onClose, productName, Id }) => {
    const productId = Id
    console.log('Received productId in ReviewForm:', productId)
    

    const [formData, setFormData] = useState({
        rating: 0,
        username: '',
        email: '',
        phonenumber: '',
        comment: '',
        images: []
    })

    const [hoveredRating, setHoveredRating] = useState(0)
    const [submitted, setSubmitted] = useState(false)
    const [imagePreviewUrls, setImagePreviewUrls] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const fileInputRef = useRef(null)
    const [dragActive, setDragActive] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleStarClick = (rating) => {
        setFormData(prev => ({
            ...prev,
            rating: rating
        }))
    }

    const handleImageChange = (files) => {
        if (!files) return

        Array.from(files).forEach((file) => {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('Please select image files only')
                return
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('Image size must be less than 5MB')
                return
            }

            // Create preview URL
            const reader = new FileReader()
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    images: [...prev.images, file]
                }))
                setImagePreviewUrls(prev => [...prev, reader.result])
            }
            reader.readAsDataURL(file)
        })
    }

    const handleRemoveImage = (index) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }))
        setImagePreviewUrls(prev => prev.filter((_, i) => i !== index))
    }

    const handleDrag = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true)
        } else if (e.type === 'dragleave') {
            setDragActive(false)
        }
    }

    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleImageChange(e.dataTransfer.files)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorMessage('')

        if (!formData.rating || !formData.username || !formData.email || !formData.comment) {
            setErrorMessage('Please fill in all required fields (Rating, Username, Email, Comment)')
            return
        }

        setIsLoading(true)

        try {
            // Create FormData for multipart/form-data submission
            const submitData = new FormData()
            
            // Add form fields
            submitData.append('productId', productId)
            submitData.append('rating', formData.rating)
            submitData.append('username', formData.username)
            submitData.append('email', formData.email)
            submitData.append('phoneNumber', formData.phonenumber)
            submitData.append('comment', formData.comment)

            // Add images if present
            if (formData.images && formData.images.length > 0) {
                formData.images.forEach((image) => {
                    submitData.append('images', image)
                })
            }

            // Submit to backend API
            console.log('📤 Submitting review with', formData.images.length, 'images...')
            
            const response = await axiosClient.post('/api/products/add-review', submitData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            console.log('✅ Review submitted successfully:', response.data)

            // Show success message
            setSubmitted(true)
            setIsLoading(false)
            
            // Reset form and close modal after delay
            setTimeout(() => {
                setFormData({
                    rating: 0,
                    username: '',
                    email: '',
                    phonenumber: '',
                    comment: '',
                    images: []
                })
                setImagePreviewUrls([])
                setSubmitted(false)
                setErrorMessage('')
                onClose()
            }, 2000)

        } catch (error) {
            console.error('❌ Error submitting review:', error)
            const errorMsg = error.response?.data?.message || error.message || 'Failed to submit review. Please try again.'
            setErrorMessage(errorMsg)
            setIsLoading(false)
        }
    }

    if (!isOpen) return null

    return (
        <>
            {/* Backdrop with smooth fade transition */}
            <div
                className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${isOpen ? 'opacity-50 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={onClose}
            />

            {/* Modal Container with smooth scale and fade transition */}
            <div
                className={`fixed inset-0 flex items-center justify-center p-4 z-50 transition-all duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={onClose}
            >
                <div
                    className={`overflow-y-scroll  bg-white rounded-xl shadow-2xl h-[500px] max-w-md w-full transform transition-all duration-300 ease-out ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                        }`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className='bg-gradient-to-r from-[#2785ca] to-[#1f6fa8] text-white p-6 rounded-t-xl flex items-center justify-between'>
                        <div>
                            <h2 className='text-2xl font-bold'>Add a Review</h2>
                            <p className='text-blue-100 text-sm mt-1'>{productName}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className='text-white hover:bg-white hover:bg-opacity-20 hover:text-[#2785ca] hover:cursor-pointer rounded-full p-2 transition-all duration-200 ml-2'
                            aria-label='Close'
                        >
                            <IoClose size={24} />
                        </button>
                    </div>

                    {/* Form Content */}
                    <div className='p-6'>
                        {submitted ? (
                            // Success Message
                            <div className='text-center py-8 animate-fade-in'>
                                <div className='bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 animate-pulse'>
                                    <svg
                                        className='w-8 h-8 text-green-600'
                                        fill='currentColor'
                                        viewBox='0 0 20 20'
                                    >
                                        <path
                                            fillRule='evenodd'
                                            d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                                            clipRule='evenodd'
                                        />
                                    </svg>
                                </div>
                                <h3 className='text-xl font-bold text-gray-800 mb-2'>Thank you!</h3>
                                <p className='text-gray-600'>Your review has been submitted successfully.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className='space-y-5'>
                                {/* Error Message */}
                                {errorMessage && (
                                    <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg animate-pulse'>
                                        <p className='text-sm font-medium'>{errorMessage}</p>
                                    </div>
                                )}
                                {/* Image Upload Section */}
                                <div>
                                    <label className='block text-gray-800 font-semibold mb-3'>Photos (Optional)</label>

                                    {/* Upload Area */}
                                    <div
                                        onDragEnter={handleDrag}
                                        onDragLeave={handleDrag}
                                        onDragOver={handleDrag}
                                        onDrop={handleDrop}
                                        className={`relative border-2 border-dashed rounded-lg p-4 transition-all duration-200 cursor-pointer ${dragActive
                                                ? 'border-[#2785ca] bg-blue-50'
                                                : 'border-gray-300 hover:border-[#2785ca] bg-gray-50 hover:bg-blue-50'
                                            }`}
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <div className='flex flex-col items-center justify-center py-6'>
                                            <div className='bg-[#2785ca] rounded-full p-3 mb-2 transform transition-transform duration-200 hover:scale-110'>
                                                <MdAdd size={32} className='text-white' />
                                            </div>
                                            <p className='text-gray-700 font-medium text-sm'>Add Photos</p>
                                            <p className='text-gray-500 text-xs mt-1'>Click or drag to upload (Max 5MB each)</p>
                                        </div>
                                        <input
                                            ref={fileInputRef}
                                            type='file'
                                            multiple
                                            accept='image/*'
                                            onChange={(e) => handleImageChange(e.target.files)}
                                            className='hidden'
                                            aria-label='Upload images'
                                        />
                                    </div>

                                    {/* Image Preview Grid */}
                                    {imagePreviewUrls.length > 0 && (
                                        <div className='mt-4'>
                                            <p className='text-gray-600 text-sm font-medium mb-3'>
                                                {imagePreviewUrls.length} {imagePreviewUrls.length === 1 ? 'image' : 'images'} selected
                                            </p>
                                            <div className='grid grid-cols-3 gap-3'>
                                                {imagePreviewUrls.map((url, index) => (
                                                    <div
                                                        key={index}
                                                        className='relative group overflow-hidden rounded-lg border border-gray-300 aspect-square bg-gray-100 hover:shadow-md transition-all duration-200'
                                                    >
                                                        <img
                                                            src={url}
                                                            alt={`Preview ${index + 1}`}
                                                            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-200'
                                                        />
                                                        <button
                                                            type='button'
                                                            onClick={() => handleRemoveImage(index)}
                                                            className='absolute inset-0 hidden group-hover:flex items-center justify-center bg-black bg-opacity-40 hover:bg-opacity-60 transition-all duration-200'
                                                            aria-label='Remove image'
                                                        >
                                                            <div className='bg-red-500 rounded-full p-2 transform hover:scale-110 transition-transform'>
                                                                <MdDeleteOutline size={20} className='text-white' />
                                                            </div>
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className='block text-gray-800 font-semibold mb-3'>Rating *</label>
                                    <div className='flex gap-2 justify-center'>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type='button'
                                                onClick={() => {
                                                    handleStarClick(star)
                                                }}
                                                onMouseEnter={() => {
                                                    setHoveredRating(star)
                                                }}
                                                onMouseLeave={() => {
                                                    setHoveredRating(0)
                                                }}
                                                className='transition-all duration-200 hover:scale-125 focus:outline-none cursor-pointer'
                                                aria-label={`Rate ${star} stars`}
                                            >
                                                <FaStar
                                                    size={48}
                                                    className={`transition-all duration-150 ${star <= (hoveredRating || formData.rating)
                                                            ? 'text-yellow-400 drop-shadow-md'
                                                            : 'text-gray-300 hover:text-yellow-300'
                                                        }`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                    {formData.rating > 0 && (
                                        <p className='text-center mt-3 text-[#2785ca] font-bold text-lg'>
                                            {formData.rating} {formData.rating === 1 ? 'Star' : 'Stars'}
                                        </p>
                                    )}
                                </div>

                                {/* Username */}
                                <div>
                                    <label htmlFor='username' className='block text-gray-800 font-semibold mb-2'>
                                        Username *
                                    </label>
                                    <input
                                        type='text'
                                        id='username'
                                        name='username'
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        placeholder='Enter your name'
                                        className='text-black w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2785ca] focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white'
                                        required
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor='email' className='block text-gray-800 font-semibold mb-2'>
                                        Email *
                                    </label>
                                    <input
                                        type='email'
                                        id='email'
                                        name='email'
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder='your.email@example.com'
                                        className='text-black w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2785ca] focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white'
                                        required
                                    />
                                </div>

                                {/* Phone Number */}
                                <div>
                                    <label htmlFor='phonenumber' className='block text-gray-800 font-semibold mb-2'>
                                        Phone Number
                                    </label>
                                    <input
                                        type='tel'
                                        id='phonenumber'
                                        name='phonenumber'
                                        value={formData.phonenumber}
                                        onChange={handleInputChange}
                                        placeholder='+92 3XX XXXXXXX'
                                        className='text-black w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2785ca] focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white'
                                    />
                                </div>

                                {/* Comment */}
                                <div>
                                    <label htmlFor='comment' className='block text-gray-800 font-semibold mb-2'>
                                        Comment *
                                    </label>
                                    <textarea
                                        id='comment'
                                        name='comment'
                                        value={formData.comment}
                                        onChange={handleInputChange}
                                        placeholder='Share your experience with this product...'
                                        rows='4'
                                        className='text-black w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2785ca] focus:border-transparent transition-all duration-200 resize-none bg-gray-50 hover:bg-white'
                                        required
                                    />
                                </div>

                                {/* Action Buttons */}
                                <div className='flex gap-3 pt-4'>
                                    <button
                                        type='button'
                                        onClick={onClose}
                                        disabled={isLoading}
                                        className='flex-1 px-4 py-2.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type='submit'
                                        disabled={isLoading}
                                        className='flex-1 px-4 py-2.5 bg-gradient-to-r from-[#2785ca] to-[#1f6fa8] text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2'
                                    >
                                        {isLoading ? (
                                            <>
                                                <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                                                <span>Submitting...</span>
                                            </>
                                        ) : (
                                            'Submit Review'
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            {/* Smooth animation styles */}
            <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
        </>
    )
}

export default ReviewForm
