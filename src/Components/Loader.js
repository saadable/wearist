'use client'

import { useContext } from 'react'
import { LoadingContext } from '@/contexts/LoadingContext'

export default function Loader() {
  const { loading } = useContext(LoadingContext)
  if (!loading) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-70">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#2785ca]"></div>
        <p className="text-white text-lg mt-4">Loading…</p>
      </div>
    </div>
  )
}
