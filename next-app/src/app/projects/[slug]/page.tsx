import { Metadata } from 'next';
import { generateProjectSlug } from '@/lib/slug';
import { getPortfolioProjects, getPortfolioProjectBySlug } from '@/lib/portfolio-data';
import ProjectPageClient from './ProjectPageClient';

export async function generateStaticParams() {
  try {
    const projects = await getPortfolioProjects();
    return projects.map((project) => ({
      slug: project.slug || generateProjectSlug(project.title),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPortfolioProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.',
    };
  }

  const title = `${project.title} - Affordable Housing Project`;
  const description =
    project.comprehensiveDetails ||
    project.briefDescription ||
    project.description ||
    `Learn more about ${project.title}, an affordable housing project by Anhart located in ${project.location}.`;
  const rawImage = project.image || '';
  const imageUrl = rawImage
    ? rawImage.startsWith('http')
      ? rawImage
      : `https://anhart.ca${rawImage}`
    : 'https://anhart.ca/images/portfolio-hero.jpg';

  return {
    title: {
      absolute: `${project.title} - Affordable Housing Project | Anhart`,
    },
    description,
    keywords: [
      project.title,
      'affordable housing',
      'housing project',
      project.location,
      project.type,
      'Anhart',
    ]
      .filter(Boolean)
      .join(', '),
    authors: [{ name: 'Anhart' }],
    alternates: {
      canonical: `https://anhart.ca/projects/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://anhart.ca/projects/${slug}`,
      siteName: 'Anhart',
      images: [
        {
          url: imageUrl || 'https://anhart.ca/images/portfolio-hero.jpg',
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
      locale: 'en_CA',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl || 'https://anhart.ca/images/portfolio-hero.jpg'],
      site: '@anhart_housing',
      creator: '@anhart_housing',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default function ProjectPage() {
  return <ProjectPageClient />;
}
