import React from 'react'
import Airpods1 from '../../../../Components/Images/Airpods 2nd Gen 1.jpg'
import Caps1 from '../../../../Components/Images/Cap Black.jpg'
import HeadPhones from '../../../../Components/Images/HeadPhones 1.jpg'
import SmartWatch from '../../../../Components/Images/Smart Watach 1.png'
import ProductCard from '@/Components/ProductsCards/page'
const HotProducts = () => {
  const Products = [
    {
      title: 'Apple AirPods Pro 2nd Generation – Active Noise Cancellation',
      altText: 'Side view of Apple AirPods Pro 2nd Generation wireless earbuds',
      old_price: '3500',
      new_price: '2000',
      img: Airpods1,
      slug: 'apple-airpods-pro-2nd-generation-active-noise-cancellation'
    },
    {
      title: 'Casual Cotton Cap – Everyday Streetwear Style',
      altText: 'Front view of premium cotton baseball cap with curved brim',
      old_price: '500',
      new_price: '300',
      img: Caps1

    },
    {
      title: 'Premium Over-Ear Headphones with Deep Bass & Mic',
      altText: 'Black over-ear headphones with cushioned ear cups and adjustable headband',
      old_price: '4000',
      new_price: '2500',
      img: HeadPhones
    },
    {
      title: 'Smart Watch with Fitness Tracker & Heart Rate Monitor',
      altText: 'Sleek smart watch with customizable display and silicone band',
      old_price: '6000',
      new_price: '3500',
      img: SmartWatch
    }
  ]
  return (
    <div className='px-4 py-6 sm:py-8 md:py-12  '>
      <h1 className='text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#2785ca] mb-6 md:mb-8 lg:mb-10'>Hot Products</h1>
      <div className="products flex flex-wrap flex-col md:flex-row items-center justify-center gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
        {Products.map((item, i)=>(
          <ProductCard key={i} props={{title: item.title, altText: item.altText, old_price: item.old_price, new_price: item.new_price, image: item.img, rating: 4.5, review_count: 50}}/>
        ))}
      </div>
    </div>
  )
}

export default HotProducts
