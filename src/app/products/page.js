import React from 'react'
import ProductsList from '@/Components/ProductsList/ProductsList'

const ProductsPage = ({ searchParams }) => {
  const initialQuery = (searchParams && searchParams.query) || ''
  return <ProductsList initialQuery={initialQuery} />
}

export default ProductsPage