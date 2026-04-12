import ProductDetailClient from './ProductDetailClient'
import { axiosClient } from '@/utils/axiosClient'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
  try {
    const response = await axiosClient.get(`/api/products/product/${params.slug}`)
    const product = response.data?.Result?.product || response.data?.product

    if (!product) {
      return {
        title: 'Product Not Found | Wearist',
        description: 'The requested product could not be found.',
      }
    }

    const title = `${product.title} - Premium Audio Gear | Wearist`
    const description = product.description?.substring(0, 155) + '...' || `Shop ${product.title} at Wearist. Premium audio products with free shipping.`

    return {
      title,
      description,
      keywords: [
        product.title,
        product.category,
        product.brand,
        'headphones',
        'earbuds',
        'speakers',
        'audio gear',
        'Wearist',
        'premium audio'
      ].filter(Boolean),
      openGraph: {
        title,
        description,
        url: `https://www.wearist.store/products/${params.slug}`,
        siteName: 'Wearist',
        type: 'product',
        images: product.images?.length > 0 ? [
          {
            url: product.images[0],
            width: 1200,
            height: 630,
            alt: product.title,
          },
        ] : [
          {
            url: 'https://www.wearist.store/og-image.png',
            width: 1200,
            height: 630,
            alt: product.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: product.images?.[0] || 'https://www.wearist.store/og-image.png',
      },
      alternates: {
        canonical: `https://www.wearist.store/products/${params.slug}`,
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Product | Wearist',
      description: 'Premium audio products at Wearist.',
    }
  }
}

export default function ProductPage() {
  return (
    <main className='py-8 px-4'>
      <ProductDetailClient />
    </main>
  )
}
