import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/_next/static/css/',
          '/_next/static/chunks/',
          '/_next/static/media/',
        ],
        disallow: [
          '/admin/',
          '/api/',
          '/member/dashboard/',
          '/_next/static/_buildManifest.js',
          '/_next/static/_ssgManifest.js',
          '/_next/static/webpack/',
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
        allow: [
          '/',
          '/_next/static/css/',
          '/_next/static/chunks/',
          '/_next/static/media/',
        ],
        disallow: ['/admin/', '/api/', '/member/dashboard/'],
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
      // Allow Bingbot full access (including CSS/JS for proper rendering)
      {
        userAgent: 'Bingbot',
        allow: [
          '/',
          '/_next/static/css/',
          '/_next/static/chunks/',
          '/_next/static/media/',
        ],
        disallow: ['/admin/', '/api/', '/member/dashboard/'],
      },
      // Allow additional Bing crawlers (msnbot, adidxbot, BingPreview)
      {
        userAgent: 'msnbot',
        allow: [
          '/',
          '/_next/static/css/',
          '/_next/static/chunks/',
          '/_next/static/media/',
        ],
        disallow: ['/admin/', '/api/', '/member/dashboard/'],
      },
      {
        userAgent: 'adidxbot',
        allow: [
          '/',
          '/_next/static/css/',
          '/_next/static/chunks/',
          '/_next/static/media/',
        ],
        disallow: ['/admin/', '/api/', '/member/dashboard/'],
      },
      {
        userAgent: 'BingPreview',
        allow: [
          '/',
          '/_next/static/css/',
          '/_next/static/chunks/',
          '/_next/static/media/',
        ],
        disallow: ['/admin/', '/api/', '/member/dashboard/'],
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
    host: 'anhart.ca',
  };
}
