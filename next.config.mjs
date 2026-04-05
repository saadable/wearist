/** @type {import('next').NextConfig} */
const nextConfig = {
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
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'wearist.store',
          },
        ],
        permanent: true,
        destination: 'https://www.wearist.store/:path*',
      },
      {
        source: '/',
        has: [
          {
            type: 'host',
            value: 'wearist.store',
          },
        ],
        permanent: true,
        destination: 'https://www.wearist.store/',
      },
    ];
  },
};

export default nextConfig;
