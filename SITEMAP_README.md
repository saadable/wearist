# Dynamic Sitemap Configuration

This project uses `next-sitemap` to generate dynamic, SEO-optimized sitemaps automatically.

## Features

- **Dynamic Sitemap Generation**: Automatically generates sitemaps for all pages, categories, and products
- **Server-side Sitemap**: Additional server-side sitemap for highly dynamic content
- **Robots.txt Generation**: Automatically generates robots.txt with proper directives
- **SEO Optimization**: Custom priorities, change frequencies, and last modified dates
- **Build Integration**: Sitemaps are generated automatically after each build

## Configuration Files

### `next-sitemap.config.js`
Main configuration file that defines:
- Site URL and sitemap settings
- Robots.txt policies
- URL priorities and change frequencies
- Excluded paths
- Additional dynamic paths

### `src/app/sitemap.js`
Next.js 13+ app router sitemap function that:
- Generates static page URLs
- Fetches dynamic categories from backend API
- Fetches product pages with proper metadata
- Sets appropriate priorities and change frequencies

### `src/app/server-sitemap.xml/route.js`
Server-side sitemap for additional dynamic content that may not be covered by the main sitemap.

## Generated Files

After build, the following files are created in `public/`:
- `sitemap.xml` - Main sitemap index
- `sitemap-0.xml` - Primary sitemap with all URLs
- `server-sitemap.xml` - Server-side dynamic sitemap
- `robots.txt` - Search engine crawling instructions

## Environment Variables

Set the following in your `.env` file:
```
SITE_URL=https://wearist.store
```

## Usage

Sitemaps are automatically generated during the build process. The URLs are:
- Main sitemap: `https://wearist.store/sitemap.xml`
- Robots.txt: `https://wearist.store/robots.txt`

## SEO Benefits

- **Better Crawling**: Search engines can discover all pages efficiently
- **Fresh Content**: Dynamic sitemaps update with new products/categories
- **Proper Prioritization**: Important pages get higher priority scores
- **Change Frequency**: Appropriate update frequencies for different content types