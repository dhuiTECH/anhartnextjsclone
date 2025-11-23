import { MetadataRoute } from 'next';
import { portfolioProjectsData } from '@/data/portfolio-server';
import { generateProjectSlug } from '@/lib/slug';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://anhart.ca';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/member/login`,
      lastModified: new Date(),
      changeFrequency: 'never',
      priority: 0.5,
    },
  ];

  // Dynamic project pages
  const projectPages: MetadataRoute.Sitemap = portfolioProjectsData.map((project) => ({
    url: `${baseUrl}/projects/${generateProjectSlug(project.title)}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...projectPages];
}
