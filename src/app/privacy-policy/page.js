export const metadata = {
  title: 'Privacy Policy - Data Protection & Security',
  description: 'Learn how Wearist protects your privacy and handles your personal data. Read our comprehensive privacy policy covering data collection, usage, security, and your rights.',
  keywords: [
    'privacy policy',
    'data protection',
    'privacy practices',
    'data security',
    'Wearist privacy',
    'customer data',
    'GDPR compliance',
    'data rights'
  ],
  openGraph: {
    title: 'Privacy Policy - Data Protection & Security | Wearist',
    description: 'Learn how Wearist protects your privacy and handles your personal data with industry-standard security measures.',
    url: 'https://www.wearist.store/privacy-policy',
    siteName: 'Wearist',
    type: 'website',
    images: [
      {
        url: 'https://www.wearist.store/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Wearist privacy policy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy - Data Protection & Security | Wearist',
    description: 'Learn how Wearist protects your privacy and handles your personal data.',
    images: ['https://www.wearist.store/og-image.png'],
  },
  alternates: {
    canonical: 'https://www.wearist.store/privacy-policy',
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

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12 sm:py-16 text-slate-900">
      <section className="space-y-6">
        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm uppercase tracking-[0.24em] text-[#2785ca]">Privacy Policy</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">Your privacy is protected at Wearist</h1>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Wearist is committed to handling your information respectfully and transparently. This page explains how we collect, use, and safeguard personal data when you browse, shop, or engage with our platform.
          </p>
        </div>

        <div className="grid gap-8">
          <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">What information we collect</h2>
            <p className="mt-3 text-slate-600 leading-7">
              We collect only the information needed to deliver your orders, personalize your experience, and support your account. This may include contact details, shipping information, order history, and device data such as browser type, location, and usage patterns.
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">How we use your data</h2>
            <p className="mt-3 text-slate-600 leading-7">
              Your data helps us process purchases, improve product recommendations, respond to support requests, and deliver relevant updates. We never sell your personal information to third-party marketers.
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Security and control</h2>
            <p className="mt-3 text-slate-600 leading-7">
              Wearist uses industry-standard security measures to protect your data. You retain control over your account, and you can contact us anytime to update information or ask questions about your privacy preferences.
            </p>
          </article>
        </div>
      </section>
    </main>
  )
}
