import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  totalPrice: 0,
  totalItems: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload
      const existingItem = state.items.find(item => item.id === product.id)

      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({
          ...product,
          quantity: 1,
        })
      }

      state.totalItems = state.items.length
      state.totalPrice = state.items.reduce((sum, item) => sum + (item.new_price * item.quantity), 0)
    },

    incrementQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload)
      if (item) {
        item.quantity += 1
        state.totalPrice = state.items.reduce((sum, i) => sum + (i.new_price * i.quantity), 0)
      }
    },

    decrementQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload)
      if (item && item.quantity > 1) {
        item.quantity -= 1
        state.totalPrice = state.items.reduce((sum, i) => sum + (i.new_price * i.quantity), 0)
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload)
      state.totalItems = state.items.length
      state.totalPrice = state.items.reduce((sum, item) => sum + (item.new_price * item.quantity), 0)
    },

    clearCart: (state) => {
      state.items = []
      state.totalItems = 0
      state.totalPrice = 0
    },

    restoreCart: (state, action) => {
      return action.payload
    },
  },
})

export const { addToCart, incrementQuantity, decrementQuantity, removeFromCart, clearCart, restoreCart } = cartSlice.actions
export default cartSlice.reducer
