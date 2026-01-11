'use client'
import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation';
import Logo from '@/Components/Images/Logo.png'
import Image from 'next/image'
import { FaCartShopping } from "react-icons/fa6";
import { IoSearchSharp, IoClose } from "react-icons/io5";
import Link from 'next/link';
import { TiThMenu } from "react-icons/ti";

const Navbar = () => {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState(null);

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
                    <div className='flex items-center justify-between px-5 py-5 md:px-10 md:py-5'>
                        <Link href={'/'} >
                            <div className="logo">
                                <Image src={Logo} alt='Logo Image' width={1000} height={1000} className='w-[130px] md:w-[200px]' />
                            </div>
                        </Link>
                        <div className="search-bar hidden md:flex border border-white  rounded-md w-[400px] h-[40px] -ml-20  justify-between items-center">
                            <input type="text" className='w-full active:border-0 active:outline-none px-3 py-1 outline-none border-none ' placeholder='Search' />
                            <div className="icons bg-[#2785ca] rounded-r-md w-[50px] h-full flex justify-center items-center">
                                <IoSearchSharp className='text-white' />
                            </div>
                        </div>
                        <div className="cart-menu flex items-center gap-2">
                            <div className="cart relative flex items-center gap-2 cursor-pointer text-white">
                                <div className="cart-numbers bg-[#ffffff20] w-[20px] h-[20px] rounded-full flex justify-center items-center absolute -top-3 -right-3">
                                    <p className='text-[12px] font-bold'>0</p>
                                </div>
                                <FaCartShopping size={25} />
                            </div>
                            <button className="md:hidden p-2" onClick={() => setMobileOpen(true)} aria-label="Open menu">
                                <TiThMenu fontSize={20} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="navbar-bottom bg-[#2785ca] hidden md:block">
                    <div className="nav-links flex gap-6 justify-center py-3">
                        {Links.map((link) => {
                            const isActive = link.href && (pathname === link.href || pathname.startsWith(link.href + '/'));
                            const linkClass = `px-3 py-2 rounded hover:bg-[#1f6ea5] transition-colors ${isActive ? 'bg-[#1f6ea5]' : ''}`;
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
                                        <div className="absolute left-0 mt-2 hidden group-hover:block bg-white text-[#2785ca] rounded shadow-lg z-10 min-w-[160px]">
                                            {link.sublinks.map(s => (
                                                <a key={s.label} href={s.href || '#'} className="block px-4 py-2 hover:bg-gray-100 transition">
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
                    <div className="p-4 flex items-center justify-between">
                        <Link href={'/'} onClick={() => setMobileOpen(false)}>
                            <div className="logo">
                                <Image src={Logo} alt='Logo Image' width={600} height={600} className='w-[140px]' />
                            </div>
                        </Link>
                        <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="text-white p-2">
                            <IoClose size={24} />
                        </button>
                    </div>

                    <nav className="px-4 mt-4">
                        {Links.map(link => {
                            const isActive = link.href && (pathname === link.href || pathname.startsWith(link.href + '/'));
                            return (
                                <div key={link.label} className="mb-2 font-bold">
                                    {link.sublinks ? (
                                        <>
                                            <button onClick={() => setOpenSubmenu(openSubmenu === link.label ? null : link.label)} className={`w-full text-bold text-left px-3 py-2 rounded hover:bg-[#1f6ea5] transition-colors ${isActive ? 'bg-[#1f6ea5]' : ''}`}>
                                                {link.label}
                                            </button>
                                            <div className={`mt-1 pl-4 ${openSubmenu === link.label ? 'block' : 'hidden'}`}>
                                                {link.sublinks.map(s => (
                                                    <a key={s.label} href={s.href || '#'} className="block  px-3 py-2 hover:bg-[#1f6ea5] rounded transition">
                                                        {s.label}
                                                    </a>
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <Link href={link.href || '#'} onClick={() => setMobileOpen(false)} className={`block   px-3 py-2 text-bold rounded hover:bg-[#1f6ea5] transition-colors ${isActive ? 'bg-[#1f6ea5]' : ''}`}>
                                            {link.label}
                                        </Link>
                                    )}
                                </div>
                            )
                        })}
                    </nav>
                </aside>

            </div >
        </div>
    )
}


export default Navbar
