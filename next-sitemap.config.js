/** @type {import('next-sitemap').IConfig} */
const axios = require('axios');

module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.wearist.store',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 0.7,
  sitemapPath: 'sitemap.xml',
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api', '/checkout', '/cart'],
      },
    ],
    additionalSitemaps: [
      `${process.env.SITE_URL || 'https://www.wearist.store'}/server-sitemap.xml`,
    ],
  },
  exclude: ['/admin/*', '/api/*', '/checkout', '/cart', '/test-api'],
  transform: async (config, path) => {
    const pathPriority = {
      '/': 1.0,
      '/all-products': 0.9,
      '/products': 0.8,
      '/product': 0.8,
      '/airpods': 0.8,
      '/headphones': 0.8,
      '/category-wise': 0.7,
    };

    const pathChangefreq = {
      '/': 'daily',
      '/all-products': 'daily',
      '/products': 'weekly',
      '/product': 'weekly',
      '/airpods': 'weekly',
      '/headphones': 'weekly',
      '/category-wise': 'weekly',
    };

    return {
      loc: path,
      changefreq: pathChangefreq[path] || config.changefreq,
      priority: pathPriority[path] || config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
  additionalPaths: async (config) => {
    const result = [];

    // static category pages
    const categories = ['electronics', 'headphones', 'airpods', 'speakers', 'watches', 'mobile', 'phone'];
    categories.forEach(category => {
      result.push({
        loc: `/category/${category}`,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      });
    });

    // dynamic product pages via backend API
    try {
      const apiBase = process.env.API_BASE_URL || 'https://www.wearist.store';
      const response = await axios.post(`${apiBase}/api/products/all-products`);
      const products = response.data?.Result?.products || response.data?.products || [];

      products.forEach((product) => {
        if (product?.slug) {
          result.push({
            loc: `/product/${product.slug}`,
            changefreq: 'weekly',
            priority: 0.65,
            lastmod: product.updatedAt || product.createdAt || new Date().toISOString(),
          });
        }
      });
    } catch (error) {
      console.warn('Error adding dynamic products to sitemap:', error?.message || error);
    }

    return result;
  },
};