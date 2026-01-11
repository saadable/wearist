import React from 'react'
import Airpods from '@/Components/Images/Airpods.webp'
import Watches from '@/Components/Images/Watch.webp'
import Image from 'next/image'

const HomeCategories = () => {
  return (
    <div>
      <h1 className='text-center text-[35px] font-bold text-[#2785ca]'>Our Hottest Categories</h1>
      <div className="images flex items-center justify-center">
        <Image src={Airpods} alt='Airpods Image' width={1000} height={1000} className='w-[400px]  m-5 rounded-[40px]'/>
        <Image src={Watches} alt='Watches Image' width={1000} height={1000} className='w-[400px]  m-5 rounded-[40px]'/>
      </div>
    </div>
  )
}

export default HomeCategories
