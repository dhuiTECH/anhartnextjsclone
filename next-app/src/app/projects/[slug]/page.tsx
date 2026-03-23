import { Metadata } from 'next';
import { generateProjectSlug } from '@/lib/slug';
import { createClient } from '@supabase/supabase-js';
import ProjectPageClient from './ProjectPageClient';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Create a server-side Supabase client for metadata generation
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface PortfolioProject {
  id: string;
  title: string;
  slug: string | null;
  location: string;
  brief_description: string | null;
  comprehensive_details: string | null;
  image_url: string | null;
  image: string | null;
  type: string | null;
}

/**
 * Fetch project by slug for metadata generation
 */
async function getProjectForMetadata(slug: string): Promise<PortfolioProject | null> {
  // Try direct slug lookup
  const { data: bySlug, error: slugError } = await supabase
    .from('portfolio')
    .select('id, title, slug, location, brief_description, comprehensive_details, image_url, image, type')
    .eq('slug', slug)
    .single();
  
  if (!slugError && bySlug) {
    return bySlug;
  }
  
  // Fallback: match by generated slug from title
  const { data: allProjects } = await supabase
    .from('portfolio')
    .select('id, title, slug, location, brief_description, comprehensive_details, image_url, image, type')
    .order('display_order', { ascending: true, nullsFirst: false });
  
  if (allProjects && allProjects.length > 0) {
    const project = allProjects.find(p => generateProjectSlug(p.title) === slug);
    if (project) {
      return project;
    }
  }
  
  return null;
}

/**
 * Get all projects for static params generation
 */
async function getAllProjects(): Promise<PortfolioProject[]> {
  const { data, error } = await supabase
    .from('portfolio')
    .select('id, title, slug, location, brief_description, comprehensive_details, image_url, image, type')
    .order('display_order', { ascending: true, nullsFirst: false })
    .order('created_at', { ascending: false });
  
  if (error || !data) {
    console.error('Error fetching projects for static params:', error?.message);
    return [];
  }
  
  return data;
}

export async function generateStaticParams() {
  try {
    const projects = await getAllProjects();
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
  const project = await getProjectForMetadata(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.',
    };
  }

  const title = `${project.title} - Affordable Housing Project`;
  const description = project.comprehensive_details || project.brief_description || `Learn more about ${project.title}, an affordable housing project by Anhart located in ${project.location}.`;
  const imageUrl = project.image_url || project.image
    ? ((project.image_url || project.image || '').startsWith('http') 
        ? (project.image_url || project.image) 
        : `https://anhart.ca${project.image_url || project.image}`)
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
    ].filter(Boolean).join(', '),
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

// Export the client component as the default page component
export default function ProjectPage() {
  return <ProjectPageClient />;
}
