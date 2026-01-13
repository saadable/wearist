import ProductCard from '@/Components/ProductsCards/page';
import { products } from '@/data/products';
import React from 'react'

const HeadphonesPage = () => {
  const headphones = products.filter((product) => product.subCategory === 'headphones');
  console.log('headphones', headphones);
  return (
    <div>
      <h1 className='text-white text-center text-[28px] my-7 md:my-7 md:text-[35px] font-bold'>Headphones</h1>
      <div className="filtered-products flex flex-col md:flex-row items-center justify-center">
        {headphones.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4'>
            {headphones.map((product, index) => (
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

export default HeadphonesPage
