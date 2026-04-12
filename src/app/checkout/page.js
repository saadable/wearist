import Checkout from '@/Components/Checkout/Checkout'

export const metadata = {
  title: 'Secure Checkout - Complete Your Audio Purchase | Wearist',
  description: 'Complete your secure checkout for premium audio products. Fast, safe payment processing with multiple options. Free shipping on orders over $50.',
  keywords: [
    'checkout',
    'secure checkout',
    'payment processing',
    'audio purchase',
    'Wearist checkout',
    'online payment',
    'secure shopping'
  ],
  openGraph: {
    title: 'Secure Checkout - Complete Your Audio Purchase | Wearist',
    description: 'Complete your secure checkout for premium audio products with fast, safe payment processing.',
    url: 'https://www.wearist.store/checkout',
    siteName: 'Wearist',
    type: 'website',
    images: [
      {
        url: 'https://www.wearist.store/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Wearist secure checkout',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Secure Checkout - Complete Your Audio Purchase | Wearist',
    description: 'Complete your secure checkout for premium audio products.',
    images: ['https://www.wearist.store/og-image.png'],
  },
  alternates: {
    canonical: 'https://www.wearist.store/checkout',
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

export default function CheckoutPage() {
  return <Checkout />
}
