export const metadata = {
  title: 'Shipping & Returns Policy - Fast Delivery & Easy Returns | Wearist',
  description: 'Learn about Wearist shipping options, delivery times, and hassle-free returns policy. Free shipping on orders over $50 with 60-day return window.',
  keywords: [
    'shipping policy',
    'returns policy',
    'delivery times',
    'free shipping',
    'Wearist shipping',
    'return process',
    'shipping costs',
    'delivery tracking'
  ],
  openGraph: {
    title: 'Shipping & Returns Policy - Fast Delivery & Easy Returns | Wearist',
    description: 'Learn about Wearist shipping options, delivery times, and hassle-free returns policy.',
    url: 'https://www.wearist.store/shipping-and-returns',
    siteName: 'Wearist',
    type: 'website',
    images: [
      {
        url: 'https://www.wearist.store/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Wearist shipping and returns',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shipping & Returns Policy - Fast Delivery & Easy Returns | Wearist',
    description: 'Learn about Wearist shipping options, delivery times, and hassle-free returns policy.',
    images: ['https://www.wearist.store/og-image.png'],
  },
  alternates: {
    canonical: 'https://www.wearist.store/shipping-and-returns',
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

export default function ShippingAndReturnsPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12 sm:py-16 text-slate-900">
      <section className="space-y-6">
        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm uppercase tracking-[0.24em] text-[#2785ca]">Shipping & Returns</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">Fast delivery and fair returns.</h1>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Wearist is designed to make shopping effortless. Learn how we ship orders, what to expect in transit, and how our return process works if you need to exchange or return an item.
          </p>
        </div>

        <div className="grid gap-8">
          <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Shipping information</h2>
            <p className="mt-3 text-slate-600 leading-7">
              Orders are processed quickly and shipped with trusted carriers. Standard delivery times vary by region, and you’ll receive tracking details as soon as your order leaves our warehouse.
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Returns made simple</h2>
            <p className="mt-3 text-slate-600 leading-7">
              If your product isn’t perfect, we offer a clear returns process. Contact our support team within the return window, and we’ll help you arrange a return or exchange with minimal effort.
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Customer support</h2>
            <p className="mt-3 text-slate-600 leading-7">
              Need help with shipping, delivery updates, or refund status? Our support team is ready to assist. You can reach us through the contact options available in the footer.
            </p>
          </article>
        </div>
      </section>
    </main>
  )
}
