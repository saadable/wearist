import React, { Suspense } from 'react'
import ProductsList from '@/Components/ProductsList/ProductsList'

export const metadata = {
  title: 'Search Products',
  description: 'Search and filter the full Wearist catalog by category, brand, rating, and price.',
}

const ProductsPage = async ({ searchParams }) => {
  const resolvedSearchParams = await searchParams
  const initialQuery = (resolvedSearchParams && (resolvedSearchParams.q || resolvedSearchParams.query)) || ''
  return (
    <Suspense fallback={<div className='py-12 text-center'>Loading products…</div>}>
      <ProductsList initialQuery={initialQuery} />
    </Suspense>
  )
}

export default ProductsPage