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
import { validateEnvVars, suggestPageReload } from '@/utils/staleCodeDetection';

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
const SCROLL_POSITION_KEY = 'portfolio_scroll_position';

export default function PortfolioPage() {
  const [allProjects, setAllProjects] = useState<PortfolioProject[]>([]);
  const [displayedProjects, setDisplayedProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);

  // Restore scroll position when returning from project detail page
  // Wait until loading is complete and projects are displayed
  useEffect(() => {
    if (!loading && displayedProjects.length > 0) {
      const savedScrollPosition = sessionStorage.getItem(SCROLL_POSITION_KEY);
      if (savedScrollPosition) {
        const scrollY = parseInt(savedScrollPosition, 10);
        // Use setTimeout to ensure DOM is fully rendered
        setTimeout(() => {
          window.scrollTo(0, scrollY);
          sessionStorage.removeItem(SCROLL_POSITION_KEY);
        }, 100);
      }
    }
  }, [loading, displayedProjects.length]);

  useEffect(() => {
    async function fetchProjects(retryCount = 0) {
      const MAX_RETRIES = 3;
      const RETRY_DELAYS = [1000, 2000, 4000]; // Exponential backoff: 1s, 2s, 4s

      try {
        // Validate environment variables to detect stale code
        const envValidation = validateEnvVars();
        if (!envValidation.isValid && retryCount === 0) {
          console.warn('Environment variable validation issues detected:', envValidation.issues);
          suggestPageReload(envValidation.issues.join('; '));
        }

        // Check if Supabase is properly configured
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
          setError('Database configuration error. Please contact support.');
          setLoading(false);
          return;
        }

        // Validate Supabase client is properly initialized
        if (!supabase) {
          throw new Error('Supabase client is not initialized. This may be due to stale cached code.');
        }

        // Supabase queries don't cache by default, but we ensure fresh data
        // by not using any cache options and relying on Supabase's built-in behavior
        const { data, error: fetchError } = await supabase
          .from('portfolio')
          .select('id, title, slug, location, year, units, status, type, brief_description, image_url')
          .order('display_order', { ascending: true, nullsFirst: false })
          .order('created_at', { ascending: false });

        if (fetchError) {
          console.error('Supabase error:', fetchError);
          console.error('Supabase error details:', {
            message: fetchError.message,
            code: fetchError.code,
            status: fetchError.status,
            details: fetchError.details,
            hint: fetchError.hint,
            fullError: JSON.stringify(fetchError, null, 2),
          });
          
          // Check if this is an authentication error that might be due to stale cache
          const isAuthError = (fetchError.message && fetchError.message.includes('API key')) || 
                             (fetchError.message && fetchError.message.includes('apikey')) ||
                             (fetchError.message && fetchError.message.includes('JWT')) ||
                             (fetchError.message && fetchError.message.includes('authentication')) ||
                             (fetchError.message && fetchError.message.includes('Invalid API key')) ||
                             fetchError.code === 'PGRST301' ||
                             fetchError.code === '42501' ||
                             fetchError.status === 401 ||
                             fetchError.status === 403;

          // Retry on auth errors (might be stale bundle issue)
          if (isAuthError && retryCount < MAX_RETRIES) {
            const delay = RETRY_DELAYS[retryCount] || 4000;
            console.log(`Auth error detected, retrying in ${delay}ms... (attempt ${retryCount + 1}/${MAX_RETRIES})`);
            
            // Force a page reload on the last retry to get fresh bundles
            if (retryCount === MAX_RETRIES - 1) {
              console.log('Last retry failed, forcing page reload to get fresh code...');
              setTimeout(() => {
                window.location.reload();
              }, delay);
              return;
            }
            
            // Wait and retry
            await new Promise(resolve => setTimeout(resolve, delay));
            return fetchProjects(retryCount + 1);
          }

          // Provide more helpful error messages
          const errorMessage = fetchError.message || 'Unknown error';
          if (isAuthError) {
            setError('Database authentication error. Please refresh the page (Ctrl+Shift+R or Cmd+Shift+R) to get the latest version.');
          } else if (errorMessage.includes('relation') || errorMessage.includes('does not exist')) {
            setError('Database table not found. Please check your database setup.');
          } else if (errorMessage.includes('Failed to fetch') || errorMessage.includes('NetworkError') || errorMessage.includes('CORS')) {
            setError('Network error connecting to database. Please check your internet connection and try again.');
          } else if (!errorMessage || errorMessage === '{}') {
            setError('Database connection error. Please refresh the page (Ctrl+Shift+R or Cmd+Shift+R).');
          } else {
            setError(`Failed to load projects: ${errorMessage}`);
          }
          setLoading(false);
          return;
        }

        // Check if data is null/undefined (might indicate silent failure)
        if (data === null || data === undefined) {
          console.warn('Supabase returned null data, this might indicate a configuration issue');
          
          // Retry if we haven't exhausted retries
          if (retryCount < MAX_RETRIES) {
            const delay = RETRY_DELAYS[retryCount] || 4000;
            console.log(`Null data received, retrying in ${delay}ms... (attempt ${retryCount + 1}/${MAX_RETRIES})`);
            
            if (retryCount === MAX_RETRIES - 1) {
              console.log('Last retry failed, forcing page reload to get fresh code...');
              setTimeout(() => {
                window.location.reload();
              }, delay);
              return;
            }
            
            await new Promise(resolve => setTimeout(resolve, delay));
            return fetchProjects(retryCount + 1);
          }
          
          setError('No data received from database. This may be due to stale cached code. Please refresh the page (Ctrl+Shift+R or Cmd+Shift+R).');
          setLoading(false);
          return;
        }

        const projects = Array.isArray(data) ? data : [];

        // If we get an empty array, it might be legitimate (no projects) or a silent failure
        // Check if env vars are properly set as a sanity check
        if (projects.length === 0 && (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)) {
          setError('Database configuration error. Please refresh the page (Ctrl+Shift+R or Cmd+Shift+R) to get the latest version.');
          setLoading(false);
          return;
        }

        // Sort projects by status priority: completed -> in-progress -> planned
        const statusPriority = {
          'completed': 1,
          'in progress': 2,
          'in-progress': 2,
          'planned': 3,
          'in-planning': 3
        };

        const sortedProjects = projects.sort((a, b) => {
          const statusA = (a.status || '').toLowerCase();
          const statusB = (b.status || '').toLowerCase();

          const priorityA = statusPriority[statusA as keyof typeof statusPriority] || 999;
          const priorityB = statusPriority[statusB as keyof typeof statusPriority] || 999;

          // Sort by status priority first
          if (priorityA !== priorityB) {
            return priorityA - priorityB;
          }

          // If same status, maintain database ordering
          return 0;
        });

        setAllProjects(sortedProjects);

        // Initially show first page
        const initialProjects = sortedProjects.slice(0, PROJECTS_PER_PAGE);
        setDisplayedProjects(initialProjects);
        setHasMore(sortedProjects.length > PROJECTS_PER_PAGE);
      } catch (err) {
        console.error('Error fetching projects:', err);
        
        // Retry on network errors or other transient issues
        if (retryCount < MAX_RETRIES && (err instanceof TypeError || err instanceof Error)) {
          const delay = RETRY_DELAYS[retryCount] || 4000;
          console.log(`Network error, retrying in ${delay}ms... (attempt ${retryCount + 1}/${MAX_RETRIES})`);
          
          await new Promise(resolve => setTimeout(resolve, delay));
          return fetchProjects(retryCount + 1);
        }
        
        setError(err instanceof Error ? err.message : 'Failed to load projects');
      } finally {
        if (retryCount === 0) {
          setLoading(false);
        }
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

  // Save scroll position before navigating to project detail page
  const handleViewDetails = (e: React.MouseEvent<HTMLAnchorElement>, projectSlug: string) => {
    // Save current scroll position
    sessionStorage.setItem(SCROLL_POSITION_KEY, window.scrollY.toString());
    // Navigation will proceed normally via the Link component
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
    const isAuthError = error.includes('authentication') || error.includes('API key');
    
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-24">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-destructive mb-4">Error Loading Portfolio</h2>
              <p className="text-destructive mb-6">{error}</p>
              {isAuthError && (
                <div className="bg-background/50 rounded-md p-4 mb-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    This error might be caused by cached code. Please try refreshing the page:
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                    <button
                      onClick={() => window.location.reload()}
                      className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
                    >
                      Refresh Page
                    </button>
                    <span className="text-xs text-muted-foreground">
                      Or press <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+Shift+R</kbd> (Windows/Linux) or <kbd className="px-2 py-1 bg-muted rounded text-xs">Cmd+Shift+R</kbd> (Mac)
                    </span>
                  </div>
                </div>
              )}
              <button
                onClick={() => {
                  setError(null);
                  setLoading(true);
                  window.location.reload();
                }}
                className="px-6 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors font-medium"
              >
                Try Again
              </button>
            </div>
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
                              onClick={(e) => handleViewDetails(e, projectSlug)}
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
