import { MetadataRoute } from 'next';
import { getPortfolioProjects } from '@/lib/portfolio-data';
import { generateProjectSlug } from '@/lib/slug';

// Revalidate sitemap every hour to reduce egress while keeping URLs fresh
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
      url: `${baseUrl}/projects`,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/partner`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/limited-partnership`,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about-us`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact-us`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tdce`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/member/login`,
      changeFrequency: 'never',
      priority: 0.5,
    },
    // Merritt Townhome Project Pages
    {
      url: `${baseUrl}/Merritt`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/Merritt/contact`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/Merritt/neighbourhood`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/Merritt/floorplans`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/Merritt/interiors`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/Merritt/relocation/kamloops`,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/Merritt/relocation/kelowna`,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/Merritt/relocation/vancouver`,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // Dynamic project pages from database
  // Note: lastModified omitted as we don't track actual modification dates for projects
  const projects = await getPortfolioProjects();
  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    // Use database slug if available, otherwise generate from title
    url: `${baseUrl}/projects/${project.slug || generateProjectSlug(project.title)}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...projectPages];
}
