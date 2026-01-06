'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import SEO from '@/components/SEO';
import { InternalLinksSection } from '@/components/InternalLinksSection';
import { HeroBanner } from '@/components/shared/HeroBanner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { MapPin, Calendar, Users, ExternalLink, Loader2 } from 'lucide-react';
import { ScrollAnimationWrapper } from '@/components/animations/ScrollAnimationWrapper';
import Link from 'next/link';
import { getPortfolioListingAltText } from '@/lib/altText';
import { LoadingWithLogo } from '@/components/LoadingWithLogo';
import { generateProjectSlug } from '@/lib/slug';
import { projectStructuredData } from '@/lib/structuredData';
import ImageWithFallback from '@/components/ImageWithFallback';

interface PortfolioProject {
  id: string;
  title: string;
  slug: string | null;
  location: string;
  year: string | null;
  units: number | null;
  status: string | null;
  type: string | null;
  brief_description: string | null;
  image_url: string | null;
}

const PROJECTS_PER_PAGE = 9;

export default function PortfolioPage() {
  const [allProjects, setAllProjects] = useState<PortfolioProject[]>([]);
  const [displayedProjects, setDisplayedProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    async function fetchProjects() {
      try {
        // Check if Supabase is properly configured
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
          setError('Database configuration error. Please contact support.');
          setLoading(false);
          return;
        }

        const { data, error: fetchError } = await supabase
          .from('portfolio')
          .select('id, title, slug, location, year, units, status, type, brief_description, image_url')
          .order('display_order', { ascending: true, nullsFirst: false })
          .order('created_at', { ascending: false });

        if (fetchError) {
          console.error('Supabase error:', fetchError);
          // Provide more helpful error messages
          if (fetchError.message.includes('API key') || fetchError.message.includes('apikey')) {
            setError('Database authentication error. Please check your configuration.');
          } else if (fetchError.message.includes('relation') || fetchError.message.includes('does not exist')) {
            setError('Database table not found. Please check your database setup.');
          } else {
            setError(`Failed to load projects: ${fetchError.message}`);
          }
          return;
        }

        const projects = data || [];
        setAllProjects(projects);
        
        // Initially show first page
        const initialProjects = projects.slice(0, PROJECTS_PER_PAGE);
        setDisplayedProjects(initialProjects);
        setHasMore(projects.length > PROJECTS_PER_PAGE);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(err instanceof Error ? err.message : 'Failed to load projects');
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  const handleLoadMore = () => {
    setLoadingMore(true);
    
    // Simulate slight delay for smooth UX
    setTimeout(() => {
      const currentCount = displayedProjects.length;
      const nextProjects = allProjects.slice(0, currentCount + PROJECTS_PER_PAGE);
      setDisplayedProjects(nextProjects);
      setHasMore(nextProjects.length < allProjects.length);
      setLoadingMore(false);
    }, 300);
  };

  if (loading) {
    return (
      <>
        <Header />
        <LoadingWithLogo message="Loading portfolio..." />
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-24">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <p className="text-destructive">Error: {error}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Prepare SEO data (use all projects for better SEO)
  const projectsForSEO = allProjects.slice(0, 3).map(project => ({
    title: project.title,
    description: project.brief_description || '',
    location: project.location,
    year: project.year || '',
    image: project.image_url || '',
  }));

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Our Portfolio - Affordable Housing Projects"
        description="Explore Anhart's portfolio of successful affordable housing projects across Canada. From Vancouver's Downtown Eastside to new developments in Hope and Merritt, see how we're building inclusive communities."
        keywords="affordable housing projects, housing portfolio, Vancouver housing, BC housing, community development, housing developments, social housing"
        url="/portfolio"
        structuredData={projectsForSEO.map((project) =>
          projectStructuredData({
            name: project.title,
            description: project.description,
            location: project.location,
            dateCompleted: project.year,
            image: project.image,
          }),
        )}
      />
      <Header />
      <main>
        <HeroBanner 
          backgroundImage="portfolio-hero" 
          title="Our Development Projects" 
          contentPosition="right" 
        />

        <section className="py-24">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <ScrollAnimationWrapper direction="top" delay={0}>
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold tracking-tight text-foreground mb-6">
                  Featured Development Projects
                </h2>
                <p className="text-lg leading-8 text-muted-foreground">
                  Anhart is a Canadian real estate development company founded in 2000, beginning with revitalizing the Jubilee Rooms and Dodson Hotel, two aging
                  single-room-occupancy buildings (SRO) in Vancouver's Downtown Eastside—we've been driven by a vision to
                  transform lives through affordable housing. Today, we're on a bold journey to develop 20,000
                  sustainable housing units by 2045, creating vibrant, inclusive communities across Canada.
                </p>
              </div>
            </ScrollAnimationWrapper>

            {displayedProjects.length > 0 ? (
              <>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {displayedProjects.map((project, index) => {
                    const projectSlug = project.slug || generateProjectSlug(project.title);
                    
                    return (
                      <ScrollAnimationWrapper 
                        key={project.id} 
                        direction="top" 
                        delay={Math.min(index * 50, 400)}
                      >
                        <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 max-w-sm mx-auto md:max-w-none h-full flex flex-col">
                          <div className="aspect-video overflow-hidden p-1">
                            <ImageWithFallback
                              imagePath={project.image_url}
                              projectTitle={project.title}
                              alt={getPortfolioListingAltText(project.title, project.location, project.type || undefined)}
                              className="w-full h-full rounded-sm object-cover"
                            />
                          </div>

                          <CardHeader>
                            <div className="flex items-center justify-between mb-2">
                              <CardTitle className="text-xl">{project.title}</CardTitle>
                              <StatusBadge status={project.status || ""} />
                            </div>

                            <div className="flex items-center gap-4 text-base text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-5 w-5" />
                                <span>{project.location}</span>
                              </div>
                              {project.year && (
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-5 w-5" />
                                  <span>{project.year}</span>
                                </div>
                              )}
                            </div>
                          </CardHeader>

                          <CardContent className="flex-1 flex flex-col">
                            <p className="text-muted-foreground mb-4 line-clamp-5">
                              {project.brief_description}
                            </p>

                            {project.units && (
                              <div className="flex items-center gap-1 text-base font-semibold text-primary mb-4">
                                <Users className="h-5 w-5" />
                                {project.units} Units
                              </div>
                            )}

                            <Link
                              href={`/projects/${projectSlug}`}
                              className="w-full inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground transition-colors px-4 py-2 rounded-md font-medium mt-auto"
                              aria-label={`View details for ${project.title}`}
                            >
                              View Details
                              <ExternalLink className="w-4 h-4 ml-2" />
                            </Link>
                          </CardContent>
                        </Card>
                      </ScrollAnimationWrapper>
                    );
                  })}
                </div>

                {/* Load More Button */}
                {hasMore && (
                  <div className="mt-12 text-center">
                    <button
                      onClick={handleLoadMore}
                      disabled={loadingMore}
                      className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loadingMore ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Loading...
                        </>
                      ) : (
                        <>
                          Load More Projects
                          <span className="text-sm opacity-75">
                            ({allProjects.length - displayedProjects.length} remaining)
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* Show count when all loaded */}
                {!hasMore && displayedProjects.length > 0 && (
                  <div className="mt-12 text-center">
                    <p className="text-muted-foreground">
                      Showing all {displayedProjects.length} project{displayedProjects.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No projects found.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <InternalLinksSection />
      <Footer />
    </div>
  );
}
