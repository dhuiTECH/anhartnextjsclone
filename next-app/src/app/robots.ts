import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/member/dashboard/',
          '/_next/',
          '/static/',
          '/private/',
          '/internal/',
          '/node_modules/',
          '/src/',
          '/dist/',
          '/*.log$',
        ],
      },
      // Allow Googlebot full access for better indexing
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/member/dashboard/', '/_next/'],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
        disallow: ['/admin/', '/api/', '/member/dashboard/'],
      },
      {
        userAgent: 'Googlebot-News',
        allow: '/',
        disallow: ['/admin/', '/api/', '/member/dashboard/'],
      },
      // Allow Bingbot full access
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/member/dashboard/', '/_next/'],
      },
      // Allow additional Bing crawlers (msnbot, adidxbot, BingPreview)
      {
        userAgent: 'msnbot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/member/dashboard/', '/_next/'],
      },
      {
        userAgent: 'adidxbot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/member/dashboard/', '/_next/'],
      },
      {
        userAgent: 'BingPreview',
        allow: '/',
        disallow: ['/admin/', '/api/', '/member/dashboard/', '/_next/'],
      },
      // Allow social media bots
      {
        userAgent: 'Twitterbot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/member/dashboard/'],
      },
      {
        userAgent: 'facebookexternalhit',
        allow: '/',
        disallow: ['/admin/', '/api/', '/member/dashboard/'],
      },
      {
        userAgent: 'LinkedInBot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/member/dashboard/'],
      },
      {
        userAgent: 'WhatsApp',
        allow: '/',
        disallow: ['/admin/', '/api/', '/member/dashboard/'],
      },
      // Block problematic/scraper bots
      {
        userAgent: 'AhrefsBot',
        disallow: ['/'],
      },
      {
        userAgent: 'MJ12bot',
        disallow: ['/'],
      },
      {
        userAgent: 'DotBot',
        disallow: ['/'],
      },
      {
        userAgent: 'SemrushBot',
        disallow: ['/'],
      },
      {
        userAgent: 'BLEXBot',
        disallow: ['/'],
      },
    ],
    sitemap: 'https://anhart.ca/sitemap.xml',
    host: 'https://anhart.ca',
  };
}
