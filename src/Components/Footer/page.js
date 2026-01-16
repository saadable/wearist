'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '@/Components/Images/Logo.png'
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')

  const handleSubscribe = (e) => {
    e.preventDefault()
    const simpleEmail = /\S+@\S+\.\S+/
    if (!simpleEmail.test(email)) {
      setMsg('Please enter a valid email.')
      return
    }
    setMsg('Thanks for subscribing!')
    setEmail('')
    setTimeout(() => setMsg(''), 3000)
  }

  return (
    <footer className="bg-[#06121a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        <div className="space-y-3 sm:space-y-4">
          <Link href="/">
            <div className="flex items-center gap-3">
              <Image src={Logo} alt="Wearist Logo" width={160} height={40} className="w-28 sm:w-32 md:w-36" />
            </div>
          </Link>
          <p className="text-xs sm:text-sm text-white/70 leading-relaxed">Wearist — quality accessories and lifestyle products made to last. Explore curated collections and find what fits your style.</p>
          <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4">
            <a href="#" aria-label="facebook" className="w-8 h-8 sm:w-9 sm:h-9 bg-white/10 flex items-center justify-center rounded hover:bg-white/20 transition text-xs sm:text-sm">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="instagram" className="w-8 h-8 sm:w-9 sm:h-9 bg-white/10 flex items-center justify-center rounded hover:bg-white/20 transition text-xs sm:text-sm">
              <FaInstagram />
            </a>
            <a href="#" aria-label="twitter" className="w-8 h-8 sm:w-9 sm:h-9 bg-white/10 flex items-center justify-center rounded hover:bg-white/20 transition text-xs sm:text-sm">
              <FaTwitter />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-sm sm:text-base mb-2 sm:mb-3">Quick Links</h4>
          <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-white/80">
            <li><Link href="/airpods" className="hover:text-white transition">Airpods</Link></li>
            <li><Link href="#" className="hover:text-white transition">Headphones</Link></li>
            <li><Link href="#" className="hover:text-white transition">Watches</Link></li>
            <li><Link href="#" className="hover:text-white transition">Accessories</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-sm sm:text-base mb-2 sm:mb-3">Support</h4>
          <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-white/80">
            <li className="hover:text-white transition">Contact: <a href="mailto:support@wearist.com" className="ml-1 underline">support@wearist.com</a></li>
            <li className="hover:text-white transition">Phone: <a href="tel:+1234567890" className="ml-1">+1 234 567 890</a></li>
            <li className="hover:text-white transition">Shipping & Returns</li>
            <li className="hover:text-white transition">Privacy Policy</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-sm sm:text-base mb-2 sm:mb-3">Newsletter</h4>
          <p className="text-xs sm:text-sm text-white/80 mb-2 sm:mb-3 leading-relaxed">Subscribe to receive our latest updates and exclusive offers.</p>
          <form onSubmit={handleSubscribe} className="flex gap-1.5 sm:gap-2 flex-col sm:flex-row">
            <label htmlFor="footer-email" className="sr-only">Email</label>
            <input id="footer-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm rounded bg-white/5 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#2785ca] flex-1" />
            <button type="submit" className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-[#2785ca] rounded hover:bg-[#1f6ea5] transition whitespace-nowrap font-semibold">Subscribe</button>
          </form>
          {msg && <p className="mt-2 text-xs sm:text-sm text-white/70">{msg}</p>}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex flex-col md:flex-row items-center justify-center gap-2 text-xs sm:text-sm text-white/70">
          <p>© {new Date().getFullYear()} Wearist. All rights reserved.</p>
          {/* <p className="mt-2 md:mt-0">Made with care • <Link href="#" className="underline">Terms</Link></p> */}
        </div>
      </div>
    </footer>
  )
}

export default Footer
