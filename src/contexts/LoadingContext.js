'use client'

import { createContext, useState, useEffect } from 'react'
import { registerLoadingCallback } from '@/utils/axiosClient'

export const LoadingContext = createContext({
  loading: false,
  setLoading: () => {}
})

export function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(false)
  const [initial, setInitial] = useState(true)

  // register interceptor callback once on mount
  useEffect(() => {
    registerLoadingCallback(setLoading)
  }, [])

  // when any request finishes for the first time, mark initial phase done
  useEffect(() => {
    if (!loading && initial) {
      setInitial(false)
    }
  }, [loading, initial])

  // safety: if no request ever happens, clear initial after a short timeout
  useEffect(() => {
    const timer = setTimeout(() => setInitial(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <LoadingContext.Provider value={{ loading, initial, setLoading }}>
      {children}
    </LoadingContext.Provider>
  )
}
