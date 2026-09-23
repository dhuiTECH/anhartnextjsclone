import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
        ],
        disallow: [
          '/admin/',
          '/api/',
          '/member/dashboard/',
          '/Merritt/',
          '/Merritt',
          '/realtor-portal/',
          '/realtor-portal',
          '/_next/static/',
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
        disallow: ['/admin/', '/api/', '/member/dashboard/', '/Merritt/', '/Merritt', '/realtor-portal/', '/realtor-portal'],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
        disallow: ['/admin/', '/api/', '/member/dashboard/', '/Merritt/', '/Merritt', '/realtor-portal/', '/realtor-portal'],
      },
      {
        userAgent: 'Googlebot-News',
        allow: '/',
        disallow: ['/admin/', '/api/', '/member/dashboard/', '/Merritt/', '/Merritt', '/realtor-portal/', '/realtor-portal'],
      },
      // Allow Bingbot full access (including CSS/JS for proper rendering)
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/member/dashboard/', '/Merritt/', '/Merritt', '/realtor-portal/', '/realtor-portal'],
      },
      // Allow additional Bing crawlers (msnbot, adidxbot, BingPreview)
      {
        userAgent: 'msnbot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/member/dashboard/', '/Merritt/', '/Merritt', '/realtor-portal/', '/realtor-portal', '/_next/static/'],
      },
      {
        userAgent: 'adidxbot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/member/dashboard/', '/Merritt/', '/Merritt', '/realtor-portal/', '/realtor-portal', '/_next/static/'],
      },
      {
        userAgent: 'BingPreview',
        allow: '/',
        disallow: ['/admin/', '/api/', '/member/dashboard/', '/Merritt/', '/Merritt', '/realtor-portal/', '/realtor-portal', '/_next/static/'],
      },
      // Allow social media bots
      {
        userAgent: 'Twitterbot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/member/dashboard/', '/Merritt/', '/Merritt', '/realtor-portal/', '/realtor-portal'],
      },
      {
        userAgent: 'facebookexternalhit',
        allow: '/',
        disallow: ['/admin/', '/api/', '/member/dashboard/', '/Merritt/', '/Merritt', '/realtor-portal/', '/realtor-portal'],
      },
      {
        userAgent: 'LinkedInBot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/member/dashboard/', '/Merritt/', '/Merritt', '/realtor-portal/', '/realtor-portal'],
      },
      {
        userAgent: 'WhatsApp',
        allow: '/',
        disallow: ['/admin/', '/api/', '/member/dashboard/', '/Merritt/', '/Merritt', '/realtor-portal/', '/realtor-portal'],
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
    host: 'anhart.ca',
  };
}
