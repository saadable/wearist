import React from 'react'
import Airpods from '@/Components/Images/Airpods.webp'
import Image from 'next/image'
import Link from 'next/link'

const HomeCategories = () => {
  return (
    <div className='px-4 py-6 sm:py-8 md:py-12 '>
      <h1 className='text-center text-[25px] md:text-[40px] font-bold text-[#2785ca] mb-6 md:mb-8 lg:mb-10'>Our Hottest Categories</h1>
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:gap-8 max-w-3xl mx-auto px-0 md:px-4">
        <Link href='/category/airpods' className='group block relative overflow-hidden rounded-2xl md:rounded-3xl'>
          <Image src={Airpods} alt='Airpods Image' width={1000} height={1000} className='w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105'/>
          <span className='absolute bottom-4 left-4 sm:bottom-6 sm:left-6 rounded-full bg-white/90 px-4 py-1.5 text-sm sm:text-base font-semibold text-[#2785ca] shadow'>Shop Airpods</span>
        </Link>
      </div>
    </div>
  )
}

export default HomeCategories
