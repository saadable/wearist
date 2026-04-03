/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://wearist.store',
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
      `${process.env.SITE_URL || 'https://wearist.store'}/server-sitemap.xml`,
    ],
  },
  // Exclude certain paths
  exclude: ['/admin/*', '/api/*', '/checkout', '/cart', '/test-api'],
  // Transform function for dynamic priority and changefreq
  transform: async (config, path) => {
    // Custom priority for different page types
    const pathPriority = {
      '/': 1.0,
      '/all-products': 0.9,
      '/products': 0.8,
      '/airpods': 0.8,
      '/headphones': 0.8,
      '/category-wise': 0.7,
    };

    const pathChangefreq = {
      '/': 'daily',
      '/all-products': 'daily',
      '/products': 'weekly',
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
  // Additional paths to include
  additionalPaths: async (config) => {
    const result = [];

    // Add category pages dynamically
    try {
      // Since we can't make API calls in build time, we'll add known categories
      const categories = ['electronics', 'headphones', 'airpods', 'speakers', 'watches', 'mobile', 'phone'];

      categories.forEach(category => {
        result.push({
          loc: `/category/${category}`,
          changefreq: 'weekly',
          priority: 0.8,
          lastmod: new Date().toISOString(),
        });
      });
    } catch (error) {
      console.warn('Error generating category sitemaps:', error);
    }

    return result;
  },
};