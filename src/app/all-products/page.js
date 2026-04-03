import AllProductsClient from './AllProductsClient'

export const metadata = {
  title: 'All Products - Premium Audio Gear | Wearist',
  description: 'Discover our complete range of high-quality headphones, earbuds, speakers, and audio accessories. Filter by category, brand, price, and customer ratings. Enjoy free shipping on orders over $50.',
  keywords: [
    'headphones',
    'earbuds',
    'speakers',
    'audio gear',
    'wireless headphones',
    'Bluetooth speakers',
    'premium audio',
    'Wearist',
    'buy headphones online',
    'audio accessories',
    'sound equipment',
    'music headphones',
    'gaming headsets',
    'noise cancelling headphones'
  ],
  openGraph: {
    title: 'All Products - Premium Audio Gear | Wearist',
    description: 'Browse our full collection of premium audio products. Advanced filters for categories, brands, prices, and ratings. Free shipping available.',
    url: 'https://wearist.store/all-products',
    siteName: 'Wearist',
    type: 'website',
    images: [
      {
        url: 'https://wearist.store/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Wearist all products collection',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Products - Premium Audio Gear | Wearist',
    description: 'Discover our complete range of high-quality headphones, earbuds, speakers, and audio accessories.',
    images: ['https://wearist.store/og-image.png'],
  },
  alternates: {
    canonical: 'https://wearist.store/all-products',
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

export default function AllProductsPage() {
  return <AllProductsClient />
}
