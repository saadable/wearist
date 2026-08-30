import CategoryProductsClient from './CategoryProductsClient'

const toDisplayName = (slug) => {
  if (!slug) return 'Products'
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export async function generateMetadata({ params }) {
  const { category } = await params
  const displayName = toDisplayName(category)

  return {
    title: `${displayName} - Shop Premium Audio Gear`,
    description: `Browse ${displayName} at Wearist. Filter by brand, rating, and price to find the right pick.`,
    alternates: {
      canonical: `https://www.wearist.store/category/${category}`,
    },
  }
}

const CategoryPage = () => {
  return <CategoryProductsClient />
}

export default CategoryPage
