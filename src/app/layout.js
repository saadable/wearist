import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/page";
import { Providers } from "./providers";
import Loader from '@/Components/Loader';
import InitialContent from '@/Components/InitialContent';

export const metadata = {
  metadataBase: new URL('https://wearist.store'),
  title: {
    default: 'Wearist | Premium Tech Accessories & Smart Electronics',
    template: '%s | Wearist',
  },
  description:
    'Wearist is the leading destination for trending tech accessories, wireless earbuds, smartwatches, gaming headphones, and premium lifestyle electronics.',
  keywords: [
    'wearist',
    'tech accessories',
    'wireless earbuds',
    'smartwatch',
    'gaming headphones',
    'mobile accessories',
    'electronics store',
    'premium gadgets',
    'trendiest electronics',
    'online tech shop',
  ],
  authors: [{ name: 'Wearist', url: 'https://wearist.store' }],
  openGraph: {
    title: 'Wearist | Premium Tech Accessories & Smart Electronics',
    description:
      'Discover the latest trending tech accessories, from wireless earbuds and smartwatches to gaming headphones and everyday electronics.',
    url: 'https://wearist.store',
    siteName: 'Wearist',
    type: 'website',
    locale: 'en_US',
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
    description:
      'Shop trending tech accessories, wireless earbuds, smartwatches, gaming headphones, and premium gadgets at Wearist.',
    creator: '@wearist',
    images: ['https://wearist.store/og-image.png'],
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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#1a1a1a] text-white">
        <Providers>
          <Navbar />
          <Loader />
          {/* prevent rendering of page content until first backend activity finishes */}
          <InitialContent>{children}</InitialContent>
          <Footer />
        </Providers>
      </body>
      
    </html>
  );
}
