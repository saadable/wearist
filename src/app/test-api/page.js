'use client'

import { useEffect, useState } from 'react'
import { axiosClient } from '@/utils/axiosClient'

export default function TestAPI() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const testAPI = async () => {
      try {
        setLoading(true)
        console.log('Fetching from:', axiosClient.defaults.baseURL + '/api/products/all-products')
        
        const response = await axiosClient.post('/api/products/all-products')
        
        console.log('Full Response:', response.data)
        console.log('Products:', response.data?.Result?.products)
        
        setData(response.data)
        setError(null)
      } catch (err) {
        console.error('API Error:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    testAPI()
  }, [])

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>API Test Page</h1>
      
      {loading && <p>Loading...</p>}
      
      {error && (
        <div className='bg-red-100 p-4 rounded mb-4'>
          <p className='text-red-800'>Error: {error}</p>
        </div>
      )}
      
      {data && (
        <div className='bg-green-100 p-4 rounded mb-4'>
          <h2 className='font-bold mb-2'>API Response:</h2>
          <pre className='bg-white p-2 rounded overflow-auto max-h-96'>
            {JSON.stringify(data, null, 2)}
          </pre>
          
          <h2 className='font-bold mt-4 mb-2'>Products Count:</h2>
          <p>{data?.Result?.products?.length || 0} products</p>
          
          {data?.Result?.products && data.Result.products.length > 0 && (
            <div className='mt-4'>
              <h3 className='font-bold mb-2'>First Product:</h3>
              <pre className='bg-white p-2 rounded overflow-auto max-h-96'>
                {JSON.stringify(data.Result.products[0], null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
