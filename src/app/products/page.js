import React, { Suspense } from 'react'
import ProductsList from '@/Components/ProductsList/ProductsList'

const ProductsPage = ({ searchParams }) => {
  const initialQuery = (searchParams && searchParams.query) || ''
  return (
    <Suspense fallback={<div className='py-12 text-center'>Loading products…</div>}>
      <ProductsList initialQuery={initialQuery} />
    </Suspense>
  )
}

export default ProductsPage