import CategoryWiseClient from './CategoryWiseClient'

export const metadata = {
  title: 'Shop by Category - Audio Products | Wearist',
  description: 'Browse premium audio products by category. Find headphones, earbuds, speakers, and accessories organized by type. Shop with confidence and enjoy free shipping.',
  keywords: [
    'audio categories',
    'headphones categories',
    'earbuds categories',
    'speakers categories',
    'audio accessories',
    'Wearist categories',
    'shop by category',
    'audio product types',
    'premium audio shopping'
  ],
  openGraph: {
    title: 'Shop by Category - Audio Products | Wearist',
    description: 'Explore our organized collection of premium audio gear by category. Find exactly what you need with easy navigation.',
    url: 'https://www.wearist.store/category-wise',
    siteName: 'Wearist',
    type: 'website',
    images: [
      {
        url: 'https://www.wearist.store/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Wearist product categories',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shop by Category - Audio Products | Wearist',
    description: 'Browse premium audio products by category. Find headphones, earbuds, speakers, and accessories organized by type.',
    images: ['https://www.wearist.store/og-image.png'],
  },
  alternates: {
    canonical: 'https://www.wearist.store/category-wise',
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

export default function CategoryWisePage() {
  return <CategoryWiseClient />
}
