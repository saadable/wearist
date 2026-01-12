"use client"

import React, { useState } from 'react'
import { FaPaperPlane, FaCheckCircle } from 'react-icons/fa'

const NewsLetter = ({ title = 'Join our Newsletter', subtitle = 'Get the latest deals and product updates.' }) => {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState('idle') // 'idle' | 'loading' | 'success' | 'error'
    const [error, setError] = useState('')

    const validateEmail = (value) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (!validateEmail(email)) {
            setError('Please enter a valid email address')
            setStatus('error')
            return
        }

        setStatus('loading')

        try {
            // Save to localStorage as a simple fallback — replace with API call if available
            const key = 'newsletter_subscribers'
            const existing = JSON.parse(localStorage.getItem(key) || '[]')
            if (!existing.includes(email)) {
                localStorage.setItem(key, JSON.stringify([email, ...existing]))
            }

            setStatus('success')
            setEmail('')
        } catch (err) {
            setStatus('error')
            setError('Subscription failed. Please try again.')
            console.error('newsletter subscribe error', err)
        }
    }

    return (
        <div className='flex items-center justify-center px-10 md:px-0'>
            <section className='newsletter my-10  w-full md:w-[900px]  rounded-lg p-6 bg-white border border-[#2785ca] shadow-sm'>
                <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                    <div>
                        <h2 className='text-[#2785ca] text-2xl font-bold'>{title}</h2>
                        <p className='text-gray-600 mt-1'>{subtitle}</p>
                    </div>

                    <form className='w-full' onSubmit={handleSubmit} aria-live='polite'>
                        <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-3 sm:mt-0 w-full'>
                            <label htmlFor='newsletter-email' className='sr-only'>Email address</label>

                            <input
                                id='newsletter-email'
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Your email address'
                                className='w-full sm:flex-1 text-sm text-black px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2785ca]'
                                aria-invalid={status === 'error' ? 'true' : 'false'}
                                required
                            />

                            <button
                                type='submit'
                                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md font-semibold text-white bg-[#2785ca] hover:bg-[#1f6fa8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2785ca] transition-colors ${status === 'loading' ? 'opacity-80 pointer-events-none' : ''}`}
                                aria-busy={status === 'loading'}
                            >
                                {status === 'success' ? <FaCheckCircle className='text-white' /> : <FaPaperPlane className='text-white' />}
                                <span>{status === 'success' ? 'Subscribed' : status === 'loading' ? 'Sending...' : 'Subscribe'}</span>
                            </button>
                        </div>

                        <div className="status mt-2 w-full">
                            {status === 'success' && <p className='text-sm text-green-600 flex items-center gap-2 justify-center sm:justify-start'><FaCheckCircle /> Thank you! You have been subscribed.</p>}
                            {status === 'error' && <p className='text-sm text-red-600 text-center sm:text-left'>{error}</p>}
                        </div>
                    </form>
                </div>

                <div className='mt-3'>

                    <p className='mt-2 text-xs text-gray-500'>We respect your privacy — unsubscribe at any time.</p>
                </div>
            </section>
        </div>
    )
}

export default NewsLetter
