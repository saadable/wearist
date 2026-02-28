'use client'

import { useContext } from 'react'
import { LoadingContext } from '@/contexts/LoadingContext'

export default function InitialContent({ children }) {
  const { initial } = useContext(LoadingContext)
  if (initial) return null
  return <>{children}</>
}
