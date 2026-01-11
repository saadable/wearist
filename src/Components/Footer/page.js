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
      <div className="max-w-7xl mx-auto px-8 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="space-y-4">
          <Link href="/">
            <div className="flex items-center gap-3">
              <Image src={Logo} alt="Wearist Logo" width={160} height={40} className="w-[120px] md:w-[150px]" />
            </div>
          </Link>
          <p className="text-sm text-white/70 max-w-xs">Wearist — quality accessories and lifestyle products made to last. Explore curated collections and find what fits your style.</p>
          <div className="flex gap-3 mt-2">
            <a href="#" aria-label="facebook" className="w-9 h-9 bg-white/10 flex items-center justify-center rounded hover:bg-white/20 transition">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="instagram" className="w-9 h-9 bg-white/10 flex items-center justify-center rounded hover:bg-white/20 transition">
              <FaInstagram />
            </a>
            <a href="#" aria-label="twitter" className="w-9 h-9 bg-white/10 flex items-center justify-center rounded hover:bg-white/20 transition">
              <FaTwitter />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link href="/airpods" className="hover:text-white transition">Airpods</Link></li>
            <li><Link href="#" className="hover:text-white transition">Headphones</Link></li>
            <li><Link href="#" className="hover:text-white transition">Watches</Link></li>
            <li><Link href="#" className="hover:text-white transition">Accessories</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Support</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li className="hover:text-white transition">Contact: <a href="mailto:support@wearist.com" className="ml-1 underline">support@wearist.com</a></li>
            <li className="hover:text-white transition">Phone: <a href="tel:+1234567890" className="ml-1">+1 234 567 890</a></li>
            <li className="hover:text-white transition">Shipping & Returns</li>
            <li className="hover:text-white transition">Privacy Policy</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Newsletter</h4>
          <p className="text-sm text-white/80 mb-3">Subscribe to receive our latest updates and exclusive offers.</p>
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <label htmlFor="footer-email" className="sr-only">Email</label>
            <input id="footer-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="px-3 py-2 rounded bg-white/5 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#2785ca] flex-1" />
            <button type="submit" className="px-4 py-2 bg-[#2785ca] rounded hover:bg-[#1f6ea5] transition">Subscribe</button>
          </form>
          {msg && <p className="mt-2 text-sm text-white/70">{msg}</p>}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-center text-sm text-white/70">
          <p>© {new Date().getFullYear()} Wearist. All rights reserved.</p>
          {/* <p className="mt-2 md:mt-0">Made with care • <Link href="#" className="underline">Terms</Link></p> */}
        </div>
      </div>
    </footer>
  )
}

export default Footer
