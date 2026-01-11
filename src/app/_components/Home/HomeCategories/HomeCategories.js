import React from 'react'
import Airpods from '@/Components/Images/Airpods.webp'
import Watches from '@/Components/Images/Watch.webp'
import Image from 'next/image'

const HomeCategories = () => {
  return (
    <div>
      <h1 className='text-center text-[28px] my-5 md:mt-5 md:text-[35px] font-bold text-[#2785ca]'>Our Hottest Categories</h1>
      <div className="images flex flex-col md:flex md:flex-row items-center justify-center px-5 md:px-0">
        <Image src={Airpods} alt='Airpods Image' width={1000} height={1000} className='w-full md:w-[600px] md:h-[400px] m-5 rounded-[40px]'/>
        <Image src={Watches} alt='Watches Image' width={1000} height={1000} className='w-full md:w-[600px] md:h-[400px] m-5 rounded-[40px]'/>
      </div>
    </div>
  )
}

export default HomeCategories
