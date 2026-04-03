import Cart from '@/Components/Cart/Cart'

export const metadata = {
  title: 'Shopping Cart - Review Your Audio Gear | Wearist',
  description: 'Review your selected premium audio products in your shopping cart. Update quantities, apply discounts, and proceed to secure checkout with free shipping options.',
  keywords: [
    'shopping cart',
    'cart review',
    'audio products cart',
    'Wearist cart',
    'checkout cart',
    'shopping basket',
    'cart management'
  ],
  openGraph: {
    title: 'Shopping Cart - Review Your Audio Gear | Wearist',
    description: 'Review your selected premium audio products. Update quantities and proceed to secure checkout.',
    url: 'https://www.wearist.store/cart',
    siteName: 'Wearist',
    type: 'website',
    images: [
      {
        url: 'https://wearist.store/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Wearist shopping cart',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shopping Cart - Review Your Audio Gear | Wearist',
    description: 'Review your selected premium audio products in your shopping cart.',
    images: ['https://wearist.store/og-image.png'],
  },
  alternates: {
    canonical: 'https://wearist.store/cart',
  },
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function CartPage() {
  return <Cart />
}
