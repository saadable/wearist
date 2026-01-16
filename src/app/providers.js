'use client'

import { useEffect } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import store from '@/store/store'

function CartPersistence() {
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart)
        // Dispatch an action to restore cart state
        dispatch({ type: 'cart/restoreCart', payload: cartData })
      } catch (e) {
        console.error('Failed to load cart from localStorage:', e)
      }
    }
  }, [dispatch])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  return null
}

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <CartPersistence />
      {children}
    </Provider>
  )
}
