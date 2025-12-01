import { MetadataRoute } from 'next';
import { portfolioProjectsData } from '@/data/portfolio-server';
import { generateProjectSlug } from '@/lib/slug';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://anhart.ca';

  // Static pages
  // Note: lastModified omitted for static pages as we don't track actual modification dates
  // Bing recommends only including lastmod when you know the actual modification date
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/portfolio`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/member/login`,
      changeFrequency: 'never',
      priority: 0.5,
    },
  ];

  // Dynamic project pages
  // Note: lastModified omitted as we don't track actual modification dates for projects
  const projectPages: MetadataRoute.Sitemap = portfolioProjectsData.map((project) => ({
    url: `${baseUrl}/projects/${generateProjectSlug(project.title)}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...projectPages];
}
