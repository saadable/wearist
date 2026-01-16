'use client'
import React, { useState, useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation';
import Logo from '@/Components/Images/Logo.png'
import Image from 'next/image'
import { FaCartShopping, FaStar } from "react-icons/fa6";
import { IoSearchSharp, IoClose } from "react-icons/io5";
import Link from 'next/link';
import { TiThMenu } from "react-icons/ti";
import { products } from '@/data/products'
import { useSelector } from 'react-redux'

const Navbar = () => {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState(null);
    const { totalItems } = useSelector(state => state.cart)

    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef(null);
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
    const mobileSearchInputRef = useRef(null);

    useEffect(() => {
        // prevent body scroll and close on Escape
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        const onKey = (e) => { if (e.key === 'Escape') setMobileOpen(false); };
        if (mobileOpen) window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKey);
        };
    }, [mobileOpen]);

    // Debounced suggestions based on search term (desktop only)
    useEffect(() => {
        const handler = setTimeout(() => {
            const q = (searchTerm || '').trim().toLowerCase();
            if (!q) {
                setSuggestions([]);
                return;
            }
            const matches = products.filter(p => p.title.toLowerCase().includes(q));
            matches.sort((a, b) => (b.rating || 0) - (a.rating || 0));
            setSuggestions(matches.slice(0, 5));
            setShowSuggestions(true);
        }, 250);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    // Close suggestions on outside click
    useEffect(() => {
        const onDocClick = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('click', onDocClick);
        return () => document.removeEventListener('click', onDocClick);
    }, []);

    // Focus mobile search input when overlay opens and show suggestions
    useEffect(() => {
        if (mobileSearchOpen && mobileSearchInputRef.current) {
            setTimeout(() => mobileSearchInputRef.current.focus(), 50);
            setShowSuggestions(!!searchTerm);
        }
    }, [mobileSearchOpen, searchTerm]);

    const Links = [
        { label: 'Airpods', href: '/airpods', pageName: 'airpods' },
        { label: 'Headphones', href: '/headphones' },
        { label: 'Watches', href: '' },
        { label: 'Glasses', href: '' },
        { label: 'Hats', href: '' },
        {
            label: 'Accessories',
            href: '',
            sublinks: [
                { label: 'Rings', href: '' },
                { label: 'Bracelets', href: '' },
                { label: 'Necklaces', href: '' },
            ]
        },
    ]
    return (
        <div>
            <div className="nav  text-white font-bold">
                <div className="navbar-top">
                    <div className='flex items-center justify-between px-4 sm:px-6 md:px-10 py-3 sm:py-4 md:py-5'>
                        <Link href={'/'} >
                            <div className="logo">
                                <Image src={Logo} alt='Logo Image' width={1000} height={1000} className='w-24 sm:w-32 md:w-40' />
                            </div>
                        </Link>
                        <div ref={searchRef} className="search-container hidden md:block relative md:-ml-16 lg:-ml-20">
                            <form onSubmit={(e) => { e.preventDefault(); const q = searchTerm.trim(); if (q) router.push(`/products?query=${encodeURIComponent(q)}`); else router.push('/products'); }} className="search-bar flex border border-white rounded-md md:w-80 lg:w-96 h-9 md:h-10 justify-between items-center">
                                <input
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onFocus={() => setShowSuggestions(true)}
                                    type="text"
                                    className='w-full active:border-0 active:outline-none px-3 sm:px-4 py-1 text-xs sm:text-sm outline-none border-none'
                                    placeholder='Search products...'
                                    aria-label='Search products'
                                />
                                <div className="icons bg-[#2785ca] rounded-r-md h-full flex justify-center items-center px-3 sm:px-4">
                                    <button type='submit' className='text-white text-base sm:text-lg'><IoSearchSharp /></button>
                                </div>
                            </form>

                            {showSuggestions && searchTerm && (
                                <div className="absolute left-0 right-0 mt-1 bg-white rounded-md shadow-lg border border-gray-200 z-50 max-h-72 overflow-auto">
                                    <ul>
                                        {suggestions.map(p => (
                                            <li key={p.slug} className='px-2 sm:px-3 py-2 hover:bg-gray-50 border-b last:border-b-0'>
                                                <Link href={`/products/${p.slug}`} onClick={() => setShowSuggestions(false)} className='flex items-center gap-2 sm:gap-3'>
                                                    <Image src={p.image} alt={p.altText || p.title} width={48} height={48} className='w-10 sm:w-12 h-10 sm:h-12 object-cover rounded' />
                                                    <div className='flex-1 min-w-0'>
                                                        <div className='text-xs sm:text-sm text-[#2785ca] font-medium line-clamp-1'>{p.title.length > 60 ? `${p.title.slice(0, 60)}...` : p.title}</div>
                                                        <div className='text-xs text-gray-500 flex items-center gap-1 mt-0.5 sm:mt-1'>
                                                            <span className='text-yellow-500 flex items-center gap-0.5'><FaStar className='text-xs' /> {p.rating ?? '—'}</span>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className='border-t p-1.5 sm:p-2 text-right'>
                                        <Link href={`/products?query=${encodeURIComponent(searchTerm)}`} onClick={() => setShowSuggestions(false)} className='text-xs sm:text-sm text-[#2785ca] font-medium'>See all results</Link>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="cart-menu flex items-center gap-2">
                            <Link href={'/cart'} className='relative'>
                            <div className="cart relative flex items-center gap-2 cursor-pointer text-white hover:opacity-80 transition-opacity">
                                <div className="cart-numbers bg-[#2785ca] w-5 h-5 sm:w-6 sm:h-6 rounded-full flex justify-center items-center absolute -top-2 -right-2 sm:-top-3 sm:-right-3">
                                    <p className='text-xs sm:text-sm font-bold'>{totalItems}</p>
                                </div>
                                <FaCartShopping size={20} className='sm:w-6 sm:h-6' />
                            </div>
                            </Link>
                            <button className="md:hidden p-1.5 sm:p-2" onClick={() => setMobileOpen(true)} aria-label="Open menu">
                                <TiThMenu className='text-xl sm:text-2xl' />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="navbar-bottom bg-[#2785ca] hidden md:block">
                    <div className="nav-links flex gap-4 lg:gap-6 justify-center py-2 md:py-3 px-4 flex-wrap">
                        {Links.map((link) => {
                            const isActive = link.href && (pathname === link.href || pathname.startsWith(link.href + '/'));
                            const linkClass = `px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm rounded hover:bg-[#1f6ea5] transition-colors ${isActive ? 'bg-[#1f6ea5]' : ''}`;
                            return (
                                <div key={link.label} className="group relative">
                                    {link.href ? (
                                        <Link href={link.href} className={linkClass}>
                                            {link.label}
                                        </Link>
                                    ) : (
                                        <a href="#" className={linkClass}>
                                            {link.label}
                                        </a>
                                    )}

                                    {link.sublinks && (
                                        <div className="absolute left-0 mt-1 hidden group-hover:block bg-white text-[#2785ca] rounded shadow-lg z-10 min-w-36 md:min-w-40">
                                            {link.sublinks.map(s => (
                                                <a key={s.label} href={s.href || '#'} className="block px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm hover:bg-gray-100 transition">
                                                    {s.label}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Mobile overlay */}
            <div>
                <div
                    className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                    onClick={() => setMobileOpen(false)}
                />

                {/* Sliding panel (from left) */}
                <aside className={`fixed top-0 left-0 h-full w-full  bg-[#2785ca] text-white z-50 transform transition-transform duration-300 ease-in-out ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="p-3 sm:p-4 flex items-center justify-between">
                        <Link href={'/'} onClick={() => setMobileOpen(false)}>
                            <div className="logo">
                                <Image src={Logo} alt='Logo Image' width={600} height={600} className='w-28 sm:w-32' />
                            </div>
                        </Link>
                        <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="text-white p-1.5 sm:p-2">
                            <IoClose className='text-xl sm:text-2xl' />
                        </button>
                    </div>

                    <nav className="px-3 sm:px-4 mt-3 sm:mt-4">
                        <div className="mb-2 sm:mb-3 border border-white">
                            <button  onClick={() => { setMobileOpen(false); setMobileSearchOpen(true); setSearchTerm(''); setShowSuggestions(false); }} className="w-full text-left px-2 sm:px-3 py-1.5 sm:py-2 text-sm rounded hover:bg-[#1f6ea5] transition-colors flex items-center gap-2">
                                <IoSearchSharp className='text-base' />
                                <span>Search products</span>
                            </button>
                        </div>
                        {Links.map(link => {
                            const isActive = link.href && (pathname === link.href || pathname.startsWith(link.href + '/'));
                            return (
                                <div key={link.label} className="mb-1 sm:mb-2 font-semibold">
                                    {link.sublinks ? (
                                        <>
                                            <button onClick={() => setOpenSubmenu(openSubmenu === link.label ? null : link.label)} className={`w-full text-left px-2 sm:px-3 py-1.5 sm:py-2 text-sm rounded hover:bg-[#1f6ea5] transition-colors ${isActive ? 'bg-[#1f6ea5]' : ''}`}>
                                                {link.label}
                                            </button>
                                            <div className={`mt-1 pl-4 ${openSubmenu === link.label ? 'block' : 'hidden'}`}>
                                                {link.sublinks.map(s => (
                                                    <a key={s.label} href={s.href || '#'} className="block px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm hover:bg-[#1f6ea5] rounded transition">
                                                        {s.label}
                                                    </a>
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <Link href={link.href || '#'} onClick={() => setMobileOpen(false)} className={`block px-2 sm:px-3 py-1.5 sm:py-2 text-sm rounded hover:bg-[#1f6ea5] transition-colors ${isActive ? 'bg-[#1f6ea5]' : ''}`}>
                                            {link.label}
                                        </Link>
                                    )}
                                </div>
                            )
                        })}
                    </nav>
                </aside>

                {mobileSearchOpen && (
                    <div className="fixed inset-0 z-60 flex items-start justify-center">
                        <div className="fixed inset-0 bg-black/40" onClick={() => setMobileSearchOpen(false)} />
                        <div className="relative mt-16 sm:mt-20 w-full px-4">
                            <div className="mx-auto max-w-lg bg-white rounded-lg shadow-lg p-3 sm:p-4 border border-gray-200">
                                <div className='flex items-center w-full gap-1 sm:gap-2'>
                                    <input
                                        ref={mobileSearchInputRef}
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder='Search...'
                                        className='w-full px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-black border border-blue-600 rounded-l focus:outline-none focus:ring-2 focus:ring-[#2785ca]'
                                        aria-label='Search products'
                                    />
                                    <button onClick={() => { const q = searchTerm.trim(); if (q) router.push(`/products?query=${encodeURIComponent(q)}`); else router.push('/products'); setMobileSearchOpen(false); }} className='bg-[#2785ca] px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-white rounded-r hover:bg-[#1f6fa8] transition-colors font-semibold'>Search</button>
                                    {/* <button className='p-2 text-black' onClick={() => setMobileSearchOpen(false)} aria-label='Close search'><IoClose /></button> */}
                                </div>

                                <div className='mt-2 sm:mt-3 max-h-72 overflow-auto'>
                                    {searchTerm ? (
                                        <ul>
                                            {suggestions.map(p => (
                                                <li key={p.slug} className='px-2 py-1.5 sm:py-2 border-b last:border-b-0'>
                                                    <Link href={`/products/${p.slug}`} onClick={() => setMobileSearchOpen(false)} className='flex items-center gap-2 sm:gap-3'>
                                                        <Image src={p.image} alt={p.altText || p.title} width={48} height={48} className='w-10 sm:w-12 h-10 sm:h-12 object-cover rounded' />
                                                        <div className='flex-1 min-w-0'>
                                                            <div className='text-xs sm:text-sm text-[#2785ca] font-medium line-clamp-1'>{p.title.length > 60 ? `${p.title.slice(0, 60)}...` : p.title}</div>
                                                            <div className='text-xs text-gray-500 flex items-center gap-1 mt-0.5'>
                                                                <span className='text-yellow-500 flex items-center gap-0.5'><FaStar className='text-xs' /> {p.rating ?? '—'}</span>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className='text-xs sm:text-sm text-gray-500 px-2'>Try searching for "AirPods"</p>
                                    )}
                                </div>

                                <div className='mt-2 sm:mt-3 text-right'>
                                    <Link href={`/products?query=${encodeURIComponent(searchTerm)}`} onClick={() => setMobileSearchOpen(false)} className='text-xs sm:text-sm text-[#2785ca] font-medium'>See all results</Link>
                                </div>

                            </div>
                        </div>
                    </div>
                )}

            </div >
        </div>
    )
}


export default Navbar
