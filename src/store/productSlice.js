import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { axiosClient } from '@/utils/axiosClient'

/**
 * Async thunk to fetch all products from backend
 */
export const fetchAllProducts = createAsyncThunk(
  'products/fetchAllProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('/api/products/all-products')
      
      // Extract products from response - backend uses 'Result' not 'data'
      const products = response.data?.Result?.products || []
      
      return products
    } catch (error) {
      console.error('Error fetching products:', error)
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch products'
      )
    }
  }
)

const initialState = {
  items: [], // All products
  loading: false,
  error: null,
  selectedCategory: null,
}

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Set selected category for filtering
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload
    },
    // Clear selected category
    clearSelectedCategory: (state) => {
      state.selectedCategory = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all products
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
        state.error = null
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.items = []
      })
  },
})

export const { setSelectedCategory, clearSelectedCategory } = productSlice.actions
export default productSlice.reducer
