import Link from 'next/link'

export const metadata = {
  title: 'Page Not Found',
  description: "The page you're looking for doesn't exist.",
}

export default function NotFound() {
  return (
    <main className='max-w-2xl mx-auto px-4 py-16 sm:py-24 text-center'>
      <p className='text-sm uppercase tracking-[0.2em] text-[#2785ca] mb-3'>404</p>
      <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4'>Page not found</h1>
      <p className='text-sm sm:text-base text-white/70 mb-8'>
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Link
        href='/all-products'
        className='inline-block bg-[#2785ca] text-white px-6 py-2.5 sm:py-3 rounded-md font-bold hover:bg-[#1f6fa8] transition-colors text-sm sm:text-base'
      >
        Browse Products
      </Link>
    </main>
  )
}
