import React from 'react'
import Banner from '../../../../Components/Images/Picsart_25-10-28_21-17-03-785.jpg'
import Image from 'next/image'
const SaleBanner = () => {
  return (
    <div className='flex items-center justify-center'>
      <Image src={Banner} alt="Sale Banner" className='w-full h-[200px] md:h-[400px]'/>
    </div>
  )
}

export default SaleBanner
