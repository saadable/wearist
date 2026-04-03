import { axiosClient } from '@/utils/axiosClient';

export default async function sitemap() {
  const baseUrl = process.env.SITE_URL || 'https://www.wearist.store';

  // Static pages
  const staticPages = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/all-products`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cart`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/category-wise`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/checkout`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/headphones`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/airpods`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/shipping-and-returns`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
  ];

  // Dynamic category pages
  const categoryPages = [];
  try {
    // Fetch categories from backend
    const categoriesResponse = await axiosClient.get('/api/products/categories');
    if (categoriesResponse.data?.categories) {
      categoriesResponse.data.categories.forEach(category => {
        categoryPages.push({
          url: `${baseUrl}/category/${category.toLowerCase()}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.8,
        });
      });
    }
  } catch (error) {
    console.warn('Error fetching categories for sitemap:', error);
    // Fallback to known categories
    const fallbackCategories = ['electronics', 'headphones', 'airpods', 'speakers', 'watches', 'mobile', 'phone'];
    fallbackCategories.forEach(category => {
      categoryPages.push({
        url: `${baseUrl}/category/${category}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });
  }

  // Dynamic product pages
  const productPages = [];
  try {
    // Fetch products from backend
    const productsResponse = await axiosClient.get('/api/products', {
      params: { limit: 1000 } // Get all products for sitemap
    });

    if (productsResponse.data?.products) {
      productsResponse.data.products.forEach(product => {
        if (product.slug) {
          productPages.push({
            url: `${baseUrl}/products/${product.slug}`,
            lastModified: new Date(product.updatedAt || product.createdAt || Date.now()),
            changeFrequency: 'weekly',
            priority: 0.6,
          });
        }
      });
    }
  } catch (error) {
    console.warn('Error fetching products for sitemap:', error);
  }

  return [...staticPages, ...categoryPages, ...productPages];
}
