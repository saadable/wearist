/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'], // Add your Cloudinary domain here
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
