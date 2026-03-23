'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { InternalLinksSection } from '@/components/InternalLinksSection';
import { FloatingBackButton } from '@/components/FloatingBackButton';
import { Breadcrumb } from '@/components/Breadcrumb';
import { MapPin, Calendar, Users, Building } from 'lucide-react';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { ScrollAnimationWrapper } from '@/components/animations/ScrollAnimationWrapper';
import { HtmlRenderer } from '@/components/shared/HtmlRenderer';
import { getPortfolioListingAltText } from '@/lib/altText';
import { LoadingWithLogo } from '@/components/LoadingWithLogo';
import { generateProjectSlug } from '@/lib/slug';
import ImageWithFallback from '@/components/ImageWithFallback';

interface ProjectData {
  id: string;
  title: string;
  slug: string | null;
  location: string;
  year: string | null;
  completion_date: string | null;
  units: number | null;
  status: string | null;
  type: string | null;
  brief_description: string | null;
  comprehensive_details: string | null;
  highlights: string[] | string | null;
  image_url: string | null;
}

/**
 * Normalizes highlights to always be an array of strings
 */
function normalizeHighlights(highlights: string[] | string | null | undefined): string[] {
  if (!highlights) return [];
  
  if (Array.isArray(highlights)) {
    return highlights.filter(h => h && typeof h === 'string' && h.trim() !== '');
  }
  
  if (typeof highlights === 'string') {
    const trimmed = highlights.trim();
    if (!trimmed) return [];
    
    // Try JSON parse first
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed.filter(h => h && typeof h === 'string');
      }
    } catch {
      // Not JSON
    }
    
    // Check for pipe-separated values
    if (trimmed.includes('|')) {
      return trimmed.split('|').map(h => h.trim()).filter(Boolean);
    }
    
    return [trimmed];
  }
  
  return [];
}

/**
 * Fetch project by slug directly from database
 */
async function fetchProjectBySlug(slug: string): Promise<ProjectData | null> {
  // Try direct slug lookup first (preferred - O(1))
  const { data: bySlug, error: slugError } = await supabase
    .from('portfolio')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (!slugError && bySlug) {
    return bySlug;
  }
  
  // Fallback: match by generated slug from title
  const { data: allProjects, error: fetchError } = await supabase
    .from('portfolio')
    .select('*')
    .order('display_order', { ascending: true, nullsFirst: false });
  
  if (fetchError || !allProjects) {
    return null;
  }
  
  return allProjects.find(p => generateProjectSlug(p.title) === slug) || null;
}

export default function ProjectPageClient() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProject() {
      const slug = params.slug as string;
      if (!slug) {
        setError('No project slug provided');
        setLoading(false);
        return;
      }

      try {
        const data = await fetchProjectBySlug(slug);
        if (!data) {
          setError('Project not found');
        } else {
          setProject(data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load project');
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <LoadingWithLogo message="Loading project details..." />
        <Footer />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-16">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <div className="bg-destructive/10 border border-destructive rounded-lg p-4">
              <h2 className="text-xl font-semibold text-destructive mb-2">Project Not Found</h2>
              <p className="text-destructive">{error || 'The requested project could not be found.'}</p>
              <button
                onClick={() => router.push('/portfolio')}
                className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                Back to Portfolio
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const highlights = normalizeHighlights(project.highlights);
  const description = project.comprehensive_details || project.brief_description || '';
  const projectSlug = project.slug || generateProjectSlug(project.title);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateDeveloper',
    name: project.title,
    description,
    location: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: project.location,
        addressCountry: 'CA',
      },
    },
    numberOfUnits: project.units,
    url: `https://anhart.ca/projects/${projectSlug}`,
    status: project.status || 'completed',
    dateCompleted: project.year || project.completion_date,
    projectType: project.type || 'Affordable Housing',
    organization: {
      '@type': 'Organization',
      name: 'Anhart',
      url: 'https://anhart.ca',
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <FloatingBackButton />
      <main className="py-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <ScrollAnimationWrapper direction="top" delay={0}>
            {/* Breadcrumb */}
            <div className="mb-6">
              <Breadcrumb
                items={[
                  { name: "Portfolio", url: "/portfolio" },
                  { name: project.title, url: `/projects/${projectSlug}` },
                ]}
              />
            </div>

            {/* Project Image */}
            <div className="mb-12 rounded-lg overflow-hidden">
              <ImageWithFallback
                imagePath={project.image_url}
                projectTitle={project.title}
                alt={getPortfolioListingAltText(project.title, project.location, project.type || undefined)}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Project Header */}
            <div className="mb-12">
              <div className="flex items-center justify-between gap-4 mb-4">
                <h1 className="text-4xl font-bold text-foreground">{project.title}</h1>
                <StatusBadge status={project.status || ''} />
              </div>

              {/* Meta Info Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-y border-muted">
                {project.location && (
                  <div className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-semibold text-foreground">{project.location}</p>
                    </div>
                  </div>
                )}

                {(project.year || project.completion_date) && (
                  <div className="flex items-start gap-2">
                    <Calendar className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Completed</p>
                      <p className="font-semibold text-foreground">{project.year || project.completion_date}</p>
                    </div>
                  </div>
                )}

                {project.units && (
                  <div className="flex items-start gap-2">
                    <Users className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Units</p>
                      <p className="font-semibold text-foreground">{project.units}</p>
                    </div>
                  </div>
                )}

                {project.type && (
                  <div className="flex items-start gap-2">
                    <Building className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Type</p>
                      <p className="font-semibold text-foreground">{project.type}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mb-12 space-y-6">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  {project.title} | Affordable Housing Development in {project.location}
                </h2>
                {/* Check if description contains HTML tags - if so, render as HTML */}
                {/<[a-z][\s\S]*>/i.test(description) ? (
                  <HtmlRenderer html={description} />
                ) : (
                  // Fallback to markdown-like parsing for plain text
                  description.split('\n\n').map((paragraph, idx) => {
                    if (paragraph.startsWith('###')) {
                      return <h4 key={idx} className="text-lg font-semibold text-foreground mt-6 mb-3">{paragraph.replace('###', '').trim()}</h4>;
                    }
                    if (paragraph.startsWith('##')) {
                      return <h3 key={idx} className="text-xl font-bold text-foreground mt-8 mb-4">{paragraph.replace('##', '').trim()}</h3>;
                    }
                    
                    // Handle markdown links
                    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
                    const parts: (string | JSX.Element)[] = [];
                    let lastIndex = 0;
                    let match;
                    
                    while ((match = linkRegex.exec(paragraph)) !== null) {
                      if (match.index > lastIndex) {
                        parts.push(paragraph.substring(lastIndex, match.index));
                      }
                      parts.push(
                        <a 
                          key={`link-${match.index}`}
                          href={match[2]}
                          className="text-primary font-semibold underline hover:opacity-80 transition-opacity"
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                        >
                          {match[1]}
                        </a>
                      );
                      lastIndex = linkRegex.lastIndex;
                    }
                    
                    if (lastIndex < paragraph.length) {
                      parts.push(paragraph.substring(lastIndex));
                    }
                    
                    return (
                      <p key={idx} className="text-base text-muted-foreground leading-relaxed mb-4">
                        {parts.length > 1 ? parts : paragraph}
                      </p>
                    );
                  })
                )}
              </div>

              {/* Highlights */}
              {highlights.length > 0 && (
                <div className="border-2 border-primary rounded-lg p-6">
                  <h3 className="text-xl font-bold text-foreground mb-4">Key Highlights</h3>
                  <ul className="space-y-3">
                    {highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-primary font-bold flex-shrink-0">•</span>
                        <span className="text-muted-foreground">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* CTA Section */}
            <div className="bg-muted/30 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">Ready for Partnerships?</h3>
              <p className="text-muted-foreground mb-6">
                We're building 20,000 affordable homes by 2045. If you're ready to explore partnerships or collaborate with us to build thriving affordable communities, let's connect.
              </p>
              <a
                href="/contact"
                className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-semibold"
              >
                Contact Us
              </a>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </main>
      <InternalLinksSection />
      <Footer />
    </div>
  );
}
