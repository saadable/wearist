import Image from "next/image";
import HomePage from "./_components/Home/HomePage";

export const metadata = {
  title: 'Wearist | Premium Tech Accessories & Smart Electronics',
  description: 'Discover premium tech accessories at Wearist. Shop wireless earbuds, smartwatches, gaming headphones, and lifestyle electronics. Free shipping over $50.',
  keywords: [
    'Wearist',
    'tech accessories',
    'wireless earbuds',
    'smartwatch',
    'gaming headphones',
    'mobile accessories',
    'electronics store',
    'premium gadgets',
    'trendiest electronics',
    'online tech shop',
    'audio gear',
    'headphones',
    'speakers',
    'Bluetooth devices'
  ],
  openGraph: {
    title: 'Wearist | Premium Tech Accessories & Smart Electronics',
    description: 'Discover premium tech accessories at Wearist. Shop wireless earbuds, smartwatches, gaming headphones, and lifestyle electronics.',
    url: 'https://www.wearist.store',
    siteName: 'Wearist',
    type: 'website',
    images: [
      {
        url: 'https://wearist.store/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Wearist premium tech accessories and electronics',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wearist | Premium Tech Accessories & Smart Electronics',
    description: 'Discover premium tech accessories at Wearist. Shop wireless earbuds, smartwatches, gaming headphones, and lifestyle electronics.',
    images: ['https://wearist.store/og-image.png'],
  },
  alternates: {
    canonical: 'https://www.wearist.store',
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

export default function Home() {
  return (
    <div >
     <HomePage/>
    </div>
  );
}
