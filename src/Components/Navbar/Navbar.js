'use client'
import React from 'react'
import { usePathname } from 'next/navigation';
import Logo from '@/Components/Images/Logo.png'
import Image from 'next/image'
import { FaCartShopping } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";
import Link from 'next/link';

const Navbar = () => {
    const pathname = usePathname();
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
        <div className="nav  text-white font-bold">
            <div className="navbar-top">
                <div className='flex items-center justify-between px-10 py-5'>
                    <Link href={'/'} >
                        <div className="logo">
                            <Image src={Logo} alt='Logo Image' width={1000} height={1000} className='w-[200px]' />
                        </div>
                    </Link>
                    <div className="search-bar border border-white  rounded-md w-[400px] h-[40px] -ml-20 flex justify-between items-center">
                        <input type="text" className='w-full active:border-0 active:outline-none px-3 py-1 outline-none border-none ' placeholder='Search' />
                        <div className="icons bg-[#2785ca] rounded-r-md w-[50px] h-full flex justify-center items-center">
                            <IoSearchSharp className='text-white' />
                        </div>
                    </div>
                    <div className="cart relative flex items-center gap-2 cursor-pointer text-white">
                        <div className="cart-numbers bg-[#ffffff20] w-[20px] h-[20px] rounded-full flex justify-center items-center absolute -top-3 -right-3">
                            <p className='text-[12px] font-bold'>0</p>
                        </div>
                        <FaCartShopping size={25} />
                    </div>
                </div>
            </div>
            <div className="navbar-bottom bg-[#2785ca]">
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
    )
}

export default Navbar
