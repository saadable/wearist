import React from 'react'
import Airpods from '@/Components/Images/Airpods.webp'
import Watches from '@/Components/Images/Watch.webp'
import Image from 'next/image'

const HomeCategories = () => {
  return (
    <div className='px-4 py-6 sm:py-8 md:py-12 '>
      <h1 className='text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#2785ca] mb-6 md:mb-8 lg:mb-10'>Our Hottest Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto px-0 md:px-4">
        <Image src={Airpods} alt='Airpods Image' width={1000} height={1000} className='w-full h-auto rounded-2xl md:rounded-3xl object-cover'/>
        <Image src={Watches} alt='Watches Image' width={1000} height={1000} className='w-full h-auto rounded-2xl md:rounded-3xl object-cover'/>
      </div>
    </div>
  )
}

export default HomeCategories
