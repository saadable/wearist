'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '@/Components/Images/Logo.png'
import { axiosClient } from '@/utils/axiosClient'
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')
  const [adminInfo, setAdminInfo] = useState({ email: '', phone: '', social: {} })

  // support modal state
  const [isModalOpen, setIsModalOpen] = useState(false)

  // load global admin info for contacts
  useEffect(() => {
    const loadInfo = async () => {
      try {
        const res = await axiosClient.get('/api/admin/info');
        if (res.data && res.data.status === 'success') {
          setAdminInfo(res.data.Result.info || {});
        }
      } catch (err) {
        console.error('error loading admin info', err);
      }
    };
    loadInfo();
  }, []);
  const [supportName, setSupportName] = useState('')
  const [supportEmail, setSupportEmail] = useState('')
  const [supportSubject, setSupportSubject] = useState('')
  const [supportMessage, setSupportMessage] = useState('')
  const [supportLoading, setSupportLoading] = useState(false)
  const [supportError, setSupportError] = useState('')
  const [supportSuccess, setSupportSuccess] = useState('')

  const handleSubscribe = async (e) => {
    e.preventDefault()
    const simpleEmail = /\S+@\S+\.\S+/
    if (!simpleEmail.test(email)) {
      setMsg('Please enter a valid email.')
      return
    }
    try {
      const res = await axiosClient.post('/api/customers/subscriptions', { email })
      if (res.data && res.data.status === 'success') {
        setMsg('Thanks for subscribing!')
        setEmail('')
      } else {
        setMsg('Subscription failed. Please try again.')
      }
    } catch (err) {
      console.error('Subscription error:', err)
      setMsg('Subscription failed. Please try again.')
    }
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
            {adminInfo.social?.facebook && (
              <a href={adminInfo.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="facebook" className="w-8 h-8 sm:w-9 sm:h-9 bg-white/10 flex items-center justify-center rounded hover:bg-white/20 transition text-xs sm:text-sm">
                <FaFacebookF />
              </a>
            )}
            {adminInfo.social?.instagram && (
              <a href={adminInfo.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="instagram" className="w-8 h-8 sm:w-9 sm:h-9 bg-white/10 flex items-center justify-center rounded hover:bg-white/20 transition text-xs sm:text-sm">
                <FaInstagram />
              </a>
            )}
            {adminInfo.social?.twitter && (
              <a href={adminInfo.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="twitter" className="w-8 h-8 sm:w-9 sm:h-9 bg-white/10 flex items-center justify-center rounded hover:bg-white/20 transition text-xs sm:text-sm">
                <FaTwitter />
              </a>
            )}
            {adminInfo.social?.whatsapp && (
              <a href={adminInfo.social.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="whatsapp" className="w-8 h-8 sm:w-9 sm:h-9 bg-white/10 flex items-center justify-center rounded hover:bg-white/20 transition text-xs sm:text-sm">
                <FaWhatsapp />
              </a>
            )}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-sm sm:text-base mb-2 sm:mb-3">Quick Links</h4>
          <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-white/80">
            <li><Link href="/category/airpods" className="hover:text-white transition">Airpods</Link></li>
            <li><Link href="/category/headphones" className="hover:text-white transition">Headphones</Link></li>
            <li><Link href="/sitemap.xml" className="hover:text-white transition underline-offset-2 hover:underline">Sitemap</Link></li>
            <li><Link href="/category-wise" className="hover:text-white transition underline-offset-2 hover:underline">Category Sitemap</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-sm sm:text-base mb-2 sm:mb-3">Support</h4>
          <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-white/80">
            <li className="hover:text-white transition">
              Contact: <button onClick={(e)=>{e.preventDefault(); setIsModalOpen(true)}} className="ml-1 underline">
                {adminInfo.email || 'support@wearist.com'}
              </button>
            </li>
            <li className="hover:text-white transition">
              Phone: <a href={`tel:${adminInfo.phone || '+1234567890'}`} className="ml-1">
                {adminInfo.phone || '+1 234 567 890'}
              </a>
            </li>
            <li>
              <Link href="/shipping-and-returns" className="hover:text-white transition underline-offset-4 hover:underline">
                Shipping & Returns
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:text-white transition underline-offset-4 hover:underline">
                Privacy Policy
              </Link>
            </li>
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

      {/* support contact modal */}

      {/* whatsapp floating button */}
      {adminInfo.social?.whatsapp && (
        <a
          href={adminInfo.social.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed right-4 bottom-4 z-50 bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:bg-[#1ebe5d] transition-colors flex items-center justify-center"
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp size={24} />
        </a>
      )}
      {isModalOpen && (
        // semi-transparent overlay with blur so underlying page shows through
        <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-[#06121a] rounded-lg w-full max-w-md mx-4 p-6 relative transform transition-all duration-300 scale-95 opacity-0 animate-modalIn">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white transition"
              aria-label="Close modal"
            >
              ×
            </button>
            <h2 className="text-xl font-semibold mb-4">Contact Support</h2>
            {supportError && <p className="text-red-500 mb-2 text-sm">{supportError}</p>}
            {supportSuccess && <p className="text-green-400 mb-2 text-sm">{supportSuccess}</p>}
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setSupportError('');
                setSupportSuccess('');
                const simpleEmail = /\S+@\S+\.\S+/;
                if (!supportName || !supportEmail || !supportMessage) {
                  setSupportError('Name, email and message are required');
                  return;
                }
                if (!simpleEmail.test(supportEmail)) {
                  setSupportError('Please enter a valid email');
                  return;
                }
                setSupportLoading(true);
                try {
                  const res = await axiosClient.post('/api/customers/support', {
                    name: supportName,
                    email: supportEmail,
                    subject: supportSubject,
                    message: supportMessage,
                  });
                  if (res.data && res.data.status === 'success') {
                    setSupportSuccess('Message sent successfully');
                    // clear form
                    setSupportName('');
                    setSupportEmail('');
                    setSupportSubject('');
                    setSupportMessage('');
                  } else {
                    setSupportError('Failed to send message');
                  }
                } catch (err) {
                  console.error('Error sending support message:', err);
                  setSupportError(err.response?.data?.message || err.message || 'Failed to send message');
                } finally {
                  setSupportLoading(false);
                }
              }}
              className="space-y-3"
            >
              <div>
                <label className="block text-sm mb-1">Your Name</label>
                <input
                  type="text"
                  value={supportName}
                  onChange={(e) => setSupportName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0f1112] rounded focus:outline-none focus:ring-2 focus:ring-[#2785ca]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Your Email</label>
                <input
                  type="email"
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0f1112] rounded focus:outline-none focus:ring-2 focus:ring-[#2785ca]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Send To</label>
                <input
                  type="email"
                  value="support@wearist.com"
                  disabled
                  className="w-full px-3 py-2 bg-[#0f1112] rounded text-gray-400 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Subject</label>
                <input
                  type="text"
                  value={supportSubject}
                  onChange={(e) => setSupportSubject(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0f1112] rounded focus:outline-none focus:ring-2 focus:ring-[#2785ca]"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Message</label>
                <textarea
                  value={supportMessage}
                  onChange={(e) => setSupportMessage(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 bg-[#0f1112] rounded focus:outline-none focus:ring-2 focus:ring-[#2785ca]"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={supportLoading}
                className="w-full flex justify-center items-center px-4 py-2 bg-[#2785ca] hover:bg-[#1f6ea5] rounded text-white font-semibold transition"
              >
                {supportLoading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      )}
    </footer>
  )
}

export default Footer
