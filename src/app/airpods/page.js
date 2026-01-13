import ProductCard from '@/Components/ProductsCards/page'
import { products } from '@/data/products'
import React from 'react'

const AirpodsPage = () => {
  const airpods = products.filter((product) => product.subCategory === 'airpods');
  console.log('airpods', airpods);

  return (
    <div>
      <h1 className='text-white text-center text-[28px] my-7 md:my-7 md:text-[35px] font-bold'>Airpods</h1>
      <div className="filtered-products flex flex-col md:flex-row items-center justify-center">
        {airpods.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4'>
            {airpods.map((product, index) => (
              <ProductCard key={index} props={product} />
            ))}
          </div>
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  )
}

export default AirpodsPage
