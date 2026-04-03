'use client'
import React, { useState, useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation';
import Logo from '@/Components/Images/Logo.png'
import Image from 'next/image'
import { FaCartShopping, FaStar } from "react-icons/fa6";
import { IoSearchSharp, IoClose } from "react-icons/io5";
import { BiLoaderAlt } from 'react-icons/bi';
import Link from 'next/link';
import { TiThMenu } from "react-icons/ti";
import { FiGrid, FiHeadphones, FiSpeaker, FiSmartphone, FiWatch, FiPackage, FiShield, FiTruck } from "react-icons/fi";
import { GiBilledCap } from "react-icons/gi";
import { MdOutlineCategory } from "react-icons/md";
import { useSelector } from 'react-redux'
import { useAllProducts } from '@/hooks/useProducts'
import { axiosClient } from '@/utils/axiosClient'

const Navbar = () => {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState(null);
    const { totalItems } = useSelector(state => state.cart)
    const { products } = useAllProducts()
    const [categories, setCategories] = useState([])

    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef(null);
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
    const mobileSearchInputRef = useRef(null);

    // Extract unique categories from products
    useEffect(() => {
        if (products && products.length > 0) {
            const uniqueCategories = [...new Set(products.map(p => p.category).filter(Boolean))]
                .map(cat => ({
                    label: cat.charAt(0).toUpperCase() + cat.slice(1),
                    href: `/category/${cat.toLowerCase()}`,
                    category: cat.toLowerCase()
                }))
                .sort((a, b) => a.label.localeCompare(b.label))
            
            setCategories(uniqueCategories)
        }
    }, [products])

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

    const [searchLoading, setSearchLoading] = useState(false);

    // Debounced suggestions based on search term (desktop only) - call backend
    useEffect(() => {
        const handler = setTimeout(async () => {
            const q = (searchTerm || '').trim();
            if (!q) {
                setSuggestions([]);
                setShowSuggestions(false);
                return;
            }
            setSearchLoading(true);
            try {
                const resp = await axiosClient.get('/api/products/search', {
                    params: { q },
                    skipGlobalLoading: true // navbar handles its own spinner
                });
                let matches = resp.data?.Result?.products || [];
                matches.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
                setSuggestions(matches.slice(0, 6));
                setShowSuggestions(true);
            } catch (err) {
                console.error('search suggestion error', err);
                setSuggestions([]);
            } finally {
                setSearchLoading(false);
            }
        }, 300);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    // Close suggestions on outside click or Escape
    useEffect(() => {
        const onDocClick = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setShowSuggestions(false);
            }
        };
        const onKey = (e) => {
            if (e.key === 'Escape') setShowSuggestions(false);
        };
        document.addEventListener('click', onDocClick);
        window.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('click', onDocClick);
            window.removeEventListener('keydown', onKey);
        };
    }, []);

    // Focus mobile search input when overlay opens and show suggestions
    useEffect(() => {
        if (mobileSearchOpen && mobileSearchInputRef.current) {
            setTimeout(() => mobileSearchInputRef.current.focus(), 50);
            setShowSuggestions(!!searchTerm);
        }
    }, [mobileSearchOpen, searchTerm]);

    const Links = categories

    // Function to get appropriate icon for category/navbar item
    const getCategoryIcon = (category) => {
        const cat = (category || '').toLowerCase();

        const iconMap = {
            airpods: <FiHeadphones className="w-5 h-5" />,
            headphone: <FiHeadphones className="w-5 h-5" />,
            headphones: <FiHeadphones className="w-5 h-5" />,
            speaker: <FiSpeaker className="w-5 h-5" />,
            speakers: <FiSpeaker className="w-5 h-5" />,
            audio: <FiSpeaker className="w-5 h-5" />,
            phone: <FiSmartphone className="w-5 h-5" />,
            mobile: <FiSmartphone className="w-5 h-5" />,
            watch: <FiWatch className="w-5 h-5" />,
            wearable: <FiWatch className="w-5 h-5" />,
            electronics: <FiGrid className="w-5 h-5" />,
            hats: <GiBilledCap className="w-5 h-5" />,
            hat: <GiBilledCap className="w-5 h-5" />,
            default: <FiPackage className="w-5 h-5" />
        };

        if (cat in iconMap) return iconMap[cat];

        // Fallback keyword matching for partial words
        if (cat.includes('headphone') || cat.includes('airpod') || cat.includes('earbud')) return iconMap.headphones;
        if (cat.includes('speaker') || cat.includes('audio')) return iconMap.speaker;
        if (cat.includes('phone') || cat.includes('mobile')) return iconMap.phone;
        if (cat.includes('watch') || cat.includes('wearable')) return iconMap.watch;
        if (cat.includes('electronic')) return iconMap.electronics;
        if (cat.includes('hat') || cat.includes('hats')) return iconMap.hats;

        return iconMap.default;
    };

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
                            <form role="search" onSubmit={(e) => { e.preventDefault(); const q = searchTerm.trim(); if (q) { setShowSuggestions(false); router.push(`/products?q=${encodeURIComponent(q)}`); } }} className="search-bar flex border-2 border-white rounded-lg md:w-80 lg:w-96 h-10 md:h-11 justify-between items-center bg-white/5 hover:bg-white/10 transition-colors">
                                <input
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onFocus={() => setShowSuggestions(true)}
                                    type="text"
                                    role="searchbox"
                                    className='w-full px-4 py-2 text-xs sm:text-sm outline-none border-none bg-transparent text-white placeholder-white/60'
                                    placeholder='Search products...'
                                    aria-label='Search products'
                                    autoComplete='off'
                                />
                                <div className="icons flex items-center px-4 gap-2">
                                    {searchLoading && <BiLoaderAlt className='animate-spin text-white text-lg' />}
                                    <button type='submit' className='text-white text-lg hover:text-white/80 transition' aria-label='Submit search'><IoSearchSharp /></button>
                                </div>
                            </form>

                            {showSuggestions && (searchTerm || searchLoading) && (
                                <div className="absolute left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-100 z-50 max-h-96 overflow-auto">
                                    {searchLoading ? (
                                        <div className='flex items-center justify-center py-6'>
                                            <BiLoaderAlt className='animate-spin text-[#2785ca] text-2xl' />
                                        </div>
                                    ) : suggestions.length > 0 ? (
                                        <>
                                            <ul>
                                                {suggestions.map(p => (
                                                    <li key={p._id || p.slug} className='border-b last:border-b-0 hover:bg-gray-50 transition'>
                                                        <Link href={`/products/${p.slug}`} onClick={() => { setShowSuggestions(false); setSearchTerm(''); }} className='flex items-center gap-3 p-3'>
                                                            {p.images?.[0]?.url || p.image ? (
                                                                <Image src={p.images?.[0]?.url || p.image} alt={p.title} width={48} height={48} className='w-12 h-12 object-cover rounded' />
                                                            ) : (
                                                                <div className='w-12 h-12 bg-gray-200 rounded'></div>
                                                            )}
                                                            <div className='flex-1 min-w-0'>
                                                                <div className='text-sm text-[#2785ca] font-semibold line-clamp-1'>{p.title}</div>
                                                                <div className='text-xs text-gray-600 flex items-center gap-1 mt-0.5'>
                                                                    <FaStar className='text-yellow-500 text-xs' />
                                                                    <span>{(p.reviews || 0).toLocaleString()}</span>
                                                                </div>
                                                            </div>
                                                            <div className='text-sm font-bold text-green-600'>PKR {p.new_price?.toLocaleString()}</div>
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className='border-t p-2 text-center'>
                                                <Link href={`/products?q=${encodeURIComponent(searchTerm)}`} onClick={() => { setShowSuggestions(false); setSearchTerm(''); }} className='text-xs sm:text-sm text-[#2785ca] font-semibold hover:text-[#1f6fa8]'>View all {suggestions.length}+ results →</Link>
                                            </div>
                                        </>
                                    ) : (
                                        <div className='p-6 text-center text-gray-500'>
                                            <p className='text-sm'>No products found for "{searchTerm}"</p>
                                        </div>
                                    )}
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
                    <div className="nav-links flex gap-2 lg:gap-4 items-center justify-center py-2 md:py-3 px-4 flex-wrap">
                        <ul>
                            <Link href={'/all-products'} className={`px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium rounded transition-all duration-200 ${pathname === '/all-products' ? 'bg-white text-[#2785ca] shadow-md' : 'hover:bg-[#1f6ea5] text-white'}`}>
                                All Products
                            </Link>
                        </ul>
                        {categories.length > 0 ? (
                            categories.map((link) => {
                                const isActive = link.href && (pathname === link.href || pathname.startsWith(link.href + '/'));
                                return (
                                    <Link 
                                        key={link.category} 
                                        href={link.href}
                                        className={`px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium rounded transition-all duration-200 ${
                                            isActive 
                                                ? 'bg-white text-[#2785ca] shadow-md' 
                                                : 'hover:bg-[#1f6ea5] text-white'
                                        }`}
                                    >
                                        {link.label}
                                    </Link>
                                )
                            })
                        ) : (
                            <p className='text-white text-sm py-2'>Loading categories...</p>
                        )}
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
                <aside className={`fixed top-0 left-0 h-full w-full bg-[#1a1a1a] from-[#2785ca] via-[#1f6ea5] to-[#1a5a8a] text-white z-50 transform transition-transform duration-300 ease-in-out ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="p-4 sm:p-5 flex items-center justify-between border-b border-white/20">
                        <Link href={'/'} onClick={() => setMobileOpen(false)}>
                            <div className="logo">
                                <Image src={Logo} alt='Logo Image' width={600} height={600} className='w-28 sm:w-32' />
                            </div>
                        </Link>
                        <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="text-white p-2 rounded-full hover:bg-white/10 transition-colors">
                            <IoClose className='text-xl sm:text-2xl' />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        <nav className="px-4 sm:px-5 py-6">
                            {/* Search Button */}
                            <div className="mb-4">
                                <button
                                    onClick={() => { setMobileOpen(false); setMobileSearchOpen(true); setSearchTerm(''); setShowSuggestions(false); }}
                                    className="w-full group bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/20 hover:border-white/30 transition-all duration-200 flex items-center gap-3"
                                >
                                    <div className="p-2 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
                                        <IoSearchSharp className='text-lg text-white' />
                                    </div>
                                    <div className="text-left">
                                        <div className="font-semibold text-white">Search Products</div>
                                        <div className="text-xs text-white/70">Find your perfect audio gear</div>
                                    </div>
                                </button>
                            </div>

                            {/* All Products */}
                            <div className="mb-6">
                                <Link
                                    href={'/all-products'}
                                    onClick={() => setMobileOpen(false)}
                                    className={`group w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/20 hover:border-white/30 transition-all duration-200 flex items-center gap-3 block ${
                                        pathname === '/all-products' ? 'bg-white/20 border-white/40 shadow-lg' : ''
                                    }`}
                                >
                                    <div className={`p-2 rounded-lg transition-colors ${
                                        pathname === '/all-products'
                                            ? 'bg-white/30'
                                            : 'bg-white/20 group-hover:bg-white/30'
                                    }`}>
                                        <FiGrid className='text-lg text-white' />
                                    </div>
                                    <div className="text-left">
                                        <div className={`font-semibold transition-colors ${
                                            pathname === '/all-products' ? 'text-white' : 'text-white'
                                        }`}>All Products</div>
                                        <div className="text-xs text-white/70">Browse our complete collection</div>
                                    </div>
                                    {pathname === '/all-products' && (
                                        <div className="ml-auto">
                                            <div className="w-2 h-2 bg-[#2785ca] rounded-full"></div>
                                        </div>
                                    )}
                                </Link>
                            </div>

                            {/* Categories Section */}
                            <div>
                                <div className="flex items-center gap-2 mb-4 px-2">
                                    <MdOutlineCategory className="w-4 h-4 text-white/70" />
                                    <h3 className='text-sm font-bold text-white/90 uppercase tracking-wide'>Categories</h3>
                                </div>
                                <div className="space-y-2">
                                    {categories.length > 0 ? (
                                        categories.map(link => {
                                            const isActive = link.href && (pathname === link.href || pathname.startsWith(link.href + '/'));
                                            return (
                                                <Link
                                                    key={link.category}
                                                    href={link.href}
                                                    onClick={() => setMobileOpen(false)}
                                                    className={`group w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/15 hover:border-white/20 transition-all duration-200 flex items-center gap-3 block ${
                                                        isActive ? 'bg-white/20 border-white/30 shadow-lg' : ''
                                                    }`}
                                                >
                                                    <div className={`p-2 rounded-lg transition-colors ${
                                                        isActive
                                                            ? 'bg-white/30'
                                                            : 'bg-white/15 group-hover:bg-white/25'
                                                    }`}>
                                                        {getCategoryIcon(link.category)}
                                                    </div>
                                                    <div className="text-left flex-1">
                                                        <div className={`font-medium transition-colors ${
                                                            isActive ? 'text-white font-semibold' : 'text-white/95'
                                                        }`}>{link.label}</div>
                                                        <div className="text-xs text-white/60">Explore {link.label.toLowerCase()}</div>
                                                    </div>
                                                    {isActive && (
                                                        <div className="ml-auto">
                                                            <div className="w-2 h-2 bg-[#2785ca] rounded-full"></div>
                                                        </div>
                                                    )}
                                                </Link>
                                            )
                                        })
                                    ) : (
                                        <div className="px-4 py-8 text-center">
                                            <div className="animate-pulse">
                                                <div className="h-4 bg-white/20 rounded w-3/4 mx-auto mb-2"></div>
                                                <div className="h-3 bg-white/10 rounded w-1/2 mx-auto"></div>
                                            </div>
                                            <p className='text-xs text-white/50 mt-3'>Loading categories...</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Footer Links */}
                            <div className="mt-8 pt-6 border-t border-white/20">
                                <div className="flex items-center gap-2 mb-4 px-2">
                                    <FiPackage className="w-4 h-4 text-white/70" />
                                    <h3 className='text-sm font-bold text-white/90 uppercase tracking-wide'>Support</h3>
                                </div>
                                <div className="space-y-2">
                                    <Link
                                        href="/privacy-policy"
                                        onClick={() => setMobileOpen(false)}
                                        className="group w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/15 hover:border-white/20 transition-all duration-200 flex items-center gap-3 block"
                                    >
                                        <div className="p-2 bg-white/15 rounded-lg group-hover:bg-white/25 transition-colors">
                                            <FiShield className='text-lg text-white' />
                                        </div>
                                        <div className="text-left">
                                            <div className="font-medium text-white/95">Privacy Policy</div>
                                            <div className="text-xs text-white/60">Your data protection rights</div>
                                        </div>
                                    </Link>
                                    <Link
                                        href="/shipping-and-returns"
                                        onClick={() => setMobileOpen(false)}
                                        className="group w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/15 hover:border-white/20 transition-all duration-200 flex items-center gap-3 block"
                                    >
                                        <div className="p-2 bg-white/15 rounded-lg group-hover:bg-white/25 transition-colors">
                                            <FiTruck className='text-lg text-white' />
                                        </div>
                                        <div className="text-left">
                                            <div className="font-medium text-white/95">Shipping & Returns</div>
                                            <div className="text-xs text-white/60">Delivery and return information</div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </nav>
                    </div>
                </aside>

                {mobileSearchOpen && (
                    <div className="fixed inset-0 z-60 flex items-start justify-center">
                        <div className="fixed inset-0 bg-black/40" onClick={() => setMobileSearchOpen(false)} />
                        <div className="relative mt-16 sm:mt-20 w-full px-4">
                            <div className="mx-auto max-w-lg bg-white rounded-xl shadow-2xl p-4 sm:p-5 border-2 border-[#2785ca]">
                                <div className='flex items-center w-full gap-2'>
                                    <input
                                        ref={mobileSearchInputRef}
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder='Search products...'
                                        className='w-full px-4 py-2.5 text-sm text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2785ca] focus:border-transparent'
                                        aria-label='Search products'
                                        autoComplete='off'
                                    />
                                    <button onClick={() => { const q = searchTerm.trim(); if (q) { setShowSuggestions(false); router.push(`/products?q=${encodeURIComponent(q)}`); } else router.push('/products'); setMobileSearchOpen(false); }} className='bg-[#2785ca] px-4 py-2.5 text-sm text-white rounded-lg hover:bg-[#1f6fa8] transition-colors font-semibold flex items-center gap-2'>{searchLoading ? <BiLoaderAlt className='animate-spin' /> : <IoSearchSharp />}</button>
                                </div>

                                <div className='mt-3 max-h-80 overflow-auto'>
                                    {searchLoading && searchTerm ? (
                                        <div className='flex items-center justify-center py-6'>
                                            <BiLoaderAlt className='animate-spin text-[#2785ca] text-2xl' />
                                        </div>
                                    ) : searchTerm && suggestions.length > 0 ? (
                                        <ul>
                                            {suggestions.map(p => (
                                                <li key={p._id || p.slug} className='px-3 py-2 border-b last:border-b-0 hover:bg-gray-50 transition'>
                                                    <Link href={`/products/${p.slug}`} onClick={() => { setMobileSearchOpen(false); setSearchTerm(''); }} className='flex items-center gap-3'>
                                                        {p.images?.[0]?.url || p.image ? (
                                                            <Image src={p.images?.[0]?.url || p.image} alt={p.title} width={48} height={48} className='w-12 h-12 object-cover rounded' />
                                                        ) : (
                                                            <div className='w-12 h-12 bg-gray-200 rounded'></div>
                                                        )}
                                                        <div className='flex-1 min-w-0'>
                                                            <div className='text-sm font-semibold text-[#2785ca] line-clamp-1'>{p.title}</div>
                                                            <div className='text-xs text-gray-600 flex items-center gap-1 mt-0.5'>
                                                                <FaStar className='text-yellow-500' />
                                                                <span>{(p.reviews || 0).toLocaleString()}</span>
                                                            </div>
                                                        </div>
                                                        <div className='text-sm font-bold text-green-600'>PKR {p.new_price?.toLocaleString()}</div>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : searchTerm && !searchLoading ? (
                                        <div className='p-4 text-center text-gray-500'>
                                            <p className='text-sm'>No products found for "{searchTerm}"</p>
                                        </div>
                                    ) : (
                                        <p className='text-xs sm:text-sm text-gray-500 px-3 py-4'>Try searching for "AirPods" or "Headphones"</p>
                                    )}
                                </div>

                                {searchTerm && suggestions.length > 0 && (
                                    <div className='mt-3 pt-2 border-t text-center'>
                                        <Link href={`/products?q=${encodeURIComponent(searchTerm)}`} onClick={() => { setMobileSearchOpen(false); setSearchTerm(''); }} className='text-sm text-[#2785ca] font-semibold hover:text-[#1f6fa8]'>View all results →</Link>
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                )}

            </div >
        </div>
    )
}


export default Navbar
