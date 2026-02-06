import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts, setSelectedCategory, clearSelectedCategory } from '@/store/productSlice'

/**
 * Custom hook to fetch and use all products
 * Automatically fetches on mount if not already loaded
 * @returns {Object} { products, loading, error, dispatch }
 */
export const useAllProducts = () => {
  const dispatch = useDispatch()
  const { items, loading, error } = useSelector(state => state.products)

  useEffect(() => {
    // Only fetch if items are empty and not loading
    if (items.length === 0 && !loading && !error) {
      dispatch(fetchAllProducts())
    }
  }, [dispatch, items.length, loading, error])

  return {
    products: items,
    loading,
    error,
    refetch: () => dispatch(fetchAllProducts()),
  }
}

/**
 * Custom hook to get products organized by category
 * @returns {Object} { categories, loading, error }
 */
export const useProductsByCategory = () => {
  const dispatch = useDispatch()
  const { items, loading, error } = useSelector(state => state.products)

  useEffect(() => {
    if (items.length === 0 && !loading && !error) {
      dispatch(fetchAllProducts())
    }
  }, [dispatch, items.length, loading, error])

  // Group products by category
  const categories = items.reduce((acc, product) => {
    const category = product.category || 'uncategorized'
    const categoryKey = category.toLowerCase()

    if (!acc[categoryKey]) {
      acc[categoryKey] = {
        name: category,
        products: [],
      }
    }

    acc[categoryKey].products.push(product)
    return acc
  }, {})

  return {
    categories,
    loading,
    error,
    refetch: () => dispatch(fetchAllProducts()),
  }
}

/**
 * Custom hook to get products for a specific category
 * @param {string} categoryName - Category name to filter
 * @returns {Object} { products, loading, error }
 */
export const useProductsBySpecificCategory = (categoryName) => {
  const dispatch = useDispatch()
  const { items, loading, error } = useSelector(state => state.products)

  useEffect(() => {
    if (items.length === 0 && !loading && !error) {
      dispatch(fetchAllProducts())
    }
  }, [dispatch, items.length, loading, error])

  const filteredProducts = items.filter(
    product =>
      product.category?.toLowerCase() === categoryName?.toLowerCase()
  )

  return {
    products: filteredProducts,
    loading,
    error,
    refetch: () => dispatch(fetchAllProducts()),
  }
}

/**
 * Custom hook to get top products by rating from each category
 * @param {number} limit - Number of categories to return (default 4)
 * @returns {Object} { products, loading, error }
 */
export const useTopProductsByCategory = (limit = 4) => {
  const dispatch = useDispatch()
  const { items, loading, error } = useSelector(state => state.products)

  useEffect(() => {
    if (items.length === 0 && !loading && !error) {
      dispatch(fetchAllProducts())
    }
  }, [dispatch, items.length, loading, error])

  // Group by category and get top product from each
  const categoryMap = {}

  items.forEach(product => {
    const category = product.category || 'uncategorized'
    const categoryKey = category.toLowerCase()

    if (!categoryMap[categoryKey]) {
      categoryMap[categoryKey] = {
        category: category,
        topProduct: product,
        avgRating: 0,
        productCount: 0,
      }
    }

    // Update top product if this one has higher reviews
    if ((product.reviews || 0) > (categoryMap[categoryKey].topProduct.reviews || 0)) {
      categoryMap[categoryKey].topProduct = product
    }

    categoryMap[categoryKey].avgRating += product.reviews || 0
    categoryMap[categoryKey].productCount += 1
  })

  // Calculate average rating and sort
  const topProducts = Object.values(categoryMap)
    .map(cat => ({
      ...cat,
      avgRating: cat.avgRating / cat.productCount,
    }))
    .sort((a, b) => b.avgRating - a.avgRating)
    .slice(0, limit)
    .map(cat => cat.topProduct)

  return {
    products: topProducts,
    loading,
    error,
    refetch: () => dispatch(fetchAllProducts()),
  }
}

/**
 * Custom hook to search products
 * @param {string} query - Search query
 * @returns {Object} { products, loading, error }
 */
export const useSearchProducts = (query) => {
  const dispatch = useDispatch()
  const { items, loading, error } = useSelector(state => state.products)

  useEffect(() => {
    if (items.length === 0 && !loading && !error) {
      dispatch(fetchAllProducts())
    }
  }, [dispatch, items.length, loading, error])

  const searchResults = items.filter(product => {
    const q = (query || '').toLowerCase().trim()
    if (!q) return true

    return (
      product.title?.toLowerCase().includes(q) ||
      product.description?.toLowerCase().includes(q) ||
      product.category?.toLowerCase().includes(q)
    )
  })

  return {
    products: searchResults,
    loading,
    error,
    refetch: () => dispatch(fetchAllProducts()),
  }
}
