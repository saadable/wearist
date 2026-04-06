/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization for external images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // Trailing slash configuration
  trailingSlash: false,

  // SSL/Security headers
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // Simplified redirect from non-www to www (only one rule needed)
  redirects: async () => {
    return [
      // Single redirect rule to handle non-www to www
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'wearist.store',
          },
        ],
        destination: 'https://www.wearist.store/:path*',
        permanent: true,
      },
    ];
  },

  // Performance optimizations
  swcMinify: true,
  compress: true,

  // React strict mode for development
  reactStrictMode: true,

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['react-icons', 'swiper'],
  },
};

export default nextConfig;
