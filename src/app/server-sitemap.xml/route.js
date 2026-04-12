import { getServerSideSitemap } from 'next-sitemap';
import { axiosClient } from '@/utils/axiosClient';

export async function GET(request) {
  // Get additional dynamic content that might not be in the main sitemap
  const additionalUrls = [];

  try {
    // Fetch any additional dynamic content here
    // For example, blog posts, reviews, or other dynamic content

    // You can add more dynamic URLs here as needed
    // Example:
    // const reviews = await axiosClient.get('/api/reviews');
    // reviews.data.forEach(review => {
    //   additionalUrls.push({
    //     loc: `${process.env.SITE_URL || 'https://www.wearist.store'}/reviews/${review.id}`,
    //     lastmod: review.updatedAt,
    //     changefreq: 'weekly',
    //     priority: 0.5,
    //   });
    // });

  } catch (error) {
    console.warn('Error generating server sitemap:', error);
  }

  return getServerSideSitemap(additionalUrls);
}