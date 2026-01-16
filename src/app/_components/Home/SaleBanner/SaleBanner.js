import React from 'react'
import Banner from '../../../../Components/Images/Picsart_25-10-28_21-17-03-785.jpg'
import Image from 'next/image'
const SaleBanner = () => {
  return (
    <div className='flex items-center justify-center px-4 py-6 sm:py-8 md:py-10 lg:py-12'>
      <Image src={Banner} alt="Sale Banner" className='w-full h-auto rounded-lg md:rounded-xl object-cover'/>
    </div>
  )
}

export default SaleBanner
