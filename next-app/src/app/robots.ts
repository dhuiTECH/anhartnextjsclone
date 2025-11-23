import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/member/dashboard', '/api'],
    },
    sitemap: 'https://anhart.ca/sitemap.xml',
    host: 'https://anhart.ca',
  };
}
