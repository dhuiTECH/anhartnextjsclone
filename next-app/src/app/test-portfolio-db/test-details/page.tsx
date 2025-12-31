'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FloatingBackButton } from '@/components/FloatingBackButton';
import { Breadcrumb } from '@/components/Breadcrumb';
import { MapPin, Calendar, Users, Building } from 'lucide-react';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { ScrollAnimationWrapper } from '@/components/animations/ScrollAnimationWrapper';
import { getPortfolioListingAltText } from '@/lib/altText';
import ImageWithFallback from './ImageWithFallback';

interface ProjectData {
  id: string;
  title: string;
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
  image: string | null;
}

/**
 * Gets alternative paths to try if the primary path fails
 */
function getAlternativePaths(imagePath: string, projectTitle: string): string[] {
  const cleanPath = imagePath.trim();
  const paths: string[] = [];
  
  // Title-based mappings based on actual bucket files
  // These override the database image_url/image field values
  const titleMappings: Record<string, string[]> = {
    'Jubilee Rooms': ['Jubilee-Sign.jpg', 'Jubilee.png', 'Jubilee.jpg'],
    'Kwas House': ['Kwas.png', 'Kwas.jpg'],
    'Anhart Sustainable Villages': ['Maternity.png', 'Maternity.jpg'],
    'Modular Homes Factory': ['ModularFactory.jpg', 'ModularFactory.png'],
    'Modular Villages': ['ModularHomes.png', 'ModularHomes.jpg'],
    'Merritt Village': ['ModularHomes.png', 'Merritt.png', 'Merritt.jpg'],
    '179 Main & 626 Alexander': ['626Alexander.jpg', '179Main.png', '626Alexander.png'],
    'Metson Rooms': ['Metsons.jpg', '1060howe.jpg', 'Metson.png', 'Metson.jpg'], // Database might have 1060howe, but file is Metsons.jpg
    'Skeena House': ['SkeenaHouse.png', 'Skeena.png', 'Skeena.jpg'],
    'Dodson Hotel': ['DodsonsRooms_1.png', 'Dodson.png', 'Dodson.jpg'],
    '162 Main St': ['162Main.png', '162Main.jpg'],
    'The Ryder': ['Ryder_1.png', 'Ryder.png', 'Ryder.jpg'],
  };
  
  // Also check if database path matches any known variations
  const pathMappings: Record<string, string[]> = {
    '1060howe': ['Metsons.jpg', '1060howe.jpg', 'Metson.jpg'],
    'metson': ['Metsons.jpg', 'Metson.png', 'Metson.jpg'],
    'skeena': ['SkeenaHouse.png', 'Skeena.png'],
    'jubilee': ['Jubilee-Sign.jpg', 'Jubilee.png'],
    'kwas': ['Kwas.png'],
    'maternity': ['Maternity.png'],
    'modularfactory': ['ModularFactory.jpg'],
    'modularhomes': ['ModularHomes.png'],
    '626alexander': ['626Alexander.jpg'],
    'dodsonsrooms': ['DodsonsRooms_1.png'],
    '162main': ['162Main.png'],
    'ryder': ['Ryder_1.png'],
  };
  
  // First, try title-based mapping
  if (titleMappings[projectTitle]) {
    return titleMappings[projectTitle];
  }
  
  // Then, try path-based mapping (normalize path for lookup)
  const normalizedPath = cleanPath.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (pathMappings[normalizedPath]) {
    return pathMappings[normalizedPath];
  }
  
  // Generate variations based on path
  if (!cleanPath.includes('.')) {
    paths.push(`${cleanPath}.png`, `${cleanPath}.jpg`);
    paths.push(`${cleanPath}-Sign.jpg`, `${cleanPath}_1.png`);
  } else {
    const base = cleanPath.replace(/\.(png|jpg|jpeg)$/i, '');
    paths.push(`${base}.png`, `${base}.jpg`);
  }
  
  return paths;
}

/**
 * Gets the public URL for an image from portfolio-images bucket
 */
function getImageUrl(imagePath: string | null | undefined, projectTitle?: string): string | null {
  if (!imagePath) return null;
  
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  let cleanPath = imagePath.trim();
  
  // Use title-based mapping if available (this takes priority)
  let pathsToTry: string[] = [];
  if (projectTitle) {
    const titlePaths = getAlternativePaths(cleanPath, projectTitle);
    if (titlePaths.length > 0) {
      pathsToTry = titlePaths;
    }
  }
  
  // If no title mapping, generate variations
  if (pathsToTry.length === 0) {
    if (cleanPath.includes('.')) {
      pathsToTry.push(cleanPath);
    } else {
      pathsToTry.push(`${cleanPath}.png`, `${cleanPath}.jpg`);
    }
  }
  
  // Use the first path (we'll let browser try to load it)
  const firstPath = pathsToTry[0];
  const { data } = supabase.storage.from('portfolio-images').getPublicUrl(firstPath);
  
  console.log('Image URL construction:', {
    originalPath: imagePath,
    projectTitle,
    pathsTried: pathsToTry,
    selectedPath: firstPath,
    constructedUrl: data.publicUrl
  });
  
  return data.publicUrl;
}

/**
 * Normalizes highlights to always be an array of strings
 * Handles: arrays, pipe-separated strings, comma-separated strings, JSON strings
 */
function normalizeHighlights(highlights: string[] | string | null | undefined): string[] {
  if (!highlights) return [];
  
  // If it's already an array, filter and return
  if (Array.isArray(highlights)) {
    return highlights
      .filter(h => h && typeof h === 'string' && h.trim() !== '')
      .map(h => h.trim());
  }
  
  // If it's a string, try to parse it
  if (typeof highlights === 'string') {
    const trimmed = highlights.trim();
    if (trimmed === '') return [];
    
    // Try parsing as JSON first
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed
          .filter(h => h && typeof h === 'string' && h.trim() !== '')
          .map(h => h.trim());
      }
    } catch {
      // Not JSON, continue
    }
    
    // Try pipe-separated (from CSV)
    if (trimmed.includes('|')) {
      return trimmed
        .split('|')
        .map(h => h.trim())
        .filter(h => h !== '');
    }
    
    // Try comma-separated (if it looks like a list)
    if (trimmed.includes(',')) {
      // Check if it's a simple comma-separated list (not a sentence with commas)
      const parts = trimmed.split(',').map(h => h.trim());
      // If all parts are relatively short (likely list items), treat as list
      if (parts.every(p => p.length < 100)) {
        return parts.filter(h => h !== '');
      }
    }
    
    // If it's a single long string that might be concatenated highlights
    // Try to split on common patterns
    if (trimmed.length > 50) {
      // Pattern 1: ". " followed by capital letter or number (likely new highlight)
      const splitPattern1 = /\.\s+(?=[A-Z0-9])/;
      if (splitPattern1.test(trimmed)) {
        const parts = trimmed.split(splitPattern1).map(h => h.trim()).filter(h => h !== '');
        if (parts.length > 1) {
          return parts;
        }
      }
      
      // Pattern 2: Look for patterns like "Title: Description," (common highlight format)
      // Match pattern: Capital letter/number, then text, then colon, then description, then comma
      // Example: "100 Supportive Homes: Fully self-contained units designed for long-term residency.,"
      const highlightPattern = /([A-Z0-9][^:]+:\s*[^,]+?)(?:,\s*(?=[A-Z0-9])|$)/g;
      const matches: string[] = [];
      let match;
      while ((match = highlightPattern.exec(trimmed)) !== null) {
        if (match[1]) {
          matches.push(match[1].trim());
        }
      }
      if (matches.length > 1) {
        return matches.filter(h => h !== '');
      }
      
      // Pattern 3: Split on ", " when followed by capital letter or number (likely new highlight start)
      // But only if the parts look like separate highlights (have reasonable length)
      const splitPattern2 = /,\s+(?=[A-Z0-9])/;
      if (splitPattern2.test(trimmed)) {
        const parts = trimmed.split(splitPattern2).map(h => h.trim()).filter(h => h !== '');
        // Only split if we get multiple reasonable-length parts that look like highlights
        if (parts.length > 1 && parts.every(p => p.length > 15 && p.length < 300)) {
          return parts;
        }
      }
      
      // Pattern 4: If it contains multiple sentences ending with periods followed by spaces and capitals
      // Split on ". " followed by capital letter (new sentence = likely new highlight)
      const sentencePattern = /\.\s+(?=[A-Z])/;
      if (sentencePattern.test(trimmed)) {
        const sentences = trimmed.split(sentencePattern).map(s => s.trim()).filter(s => s !== '');
        // If we have multiple sentences and they're not too long, treat as separate highlights
        if (sentences.length > 1 && sentences.every(s => s.length < 250)) {
          return sentences;
        }
      }
    }
    
    // Otherwise, return as single-item array
    return [trimmed];
  }
  
  return [];
}

export default function TestProjectDetailsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProject() {
      try {
        setLoading(true);
        setError(null);

        const projectId = searchParams.get('id');
        if (!projectId) {
          setError('No project ID provided');
          setLoading(false);
          return;
        }

        const { data, error: fetchError } = await supabase
          .from('portfolio')
          .select('*')
          .eq('id', projectId)
          .single();

        if (fetchError) {
          setError(`Error loading project: ${fetchError.message}`);
          setLoading(false);
          return;
        }

        if (!data) {
          setError('Project not found');
          setLoading(false);
          return;
        }

        setProject(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setLoading(false);
      }
    }

    fetchProject();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-16">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <p className="text-muted-foreground text-center">Loading project details...</p>
          </div>
        </main>
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
              <h2 className="text-xl font-semibold text-destructive mb-2">Error</h2>
              <p className="text-destructive">{error || 'Project not found'}</p>
              <button
                onClick={() => router.push('/test-portfolio-db')}
                className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                Back to Test Page
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const imageUrl = getImageUrl(project.image_url || project.image, project.title);
  const highlights = normalizeHighlights(project.highlights);
  const description = project.comprehensive_details || project.brief_description || '';
  
  // Debug logging
  console.log('Project details loaded:', {
    title: project.title,
    image_url: project.image_url,
    image: project.image,
    imageUrl,
    highlights: project.highlights,
    normalizedHighlights: highlights,
    highlightsType: typeof project.highlights,
    isArray: Array.isArray(project.highlights)
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <FloatingBackButton />
      <main className="py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <ScrollAnimationWrapper direction="top" delay={0}>
            {/* Breadcrumb Navigation */}
            <div className="mb-6">
              <Breadcrumb
                items={[
                  { name: "Test Portfolio DB", url: "/test-portfolio-db" },
                  { name: project.title, url: `/test-portfolio-db/test-details?id=${project.id}` },
                ]}
              />
            </div>

            {/* Project Image */}
            <div className="mb-12 rounded-lg overflow-hidden">
              <ImageWithFallback
                imagePath={project.image_url || project.image}
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

              {/* Project Meta Info */}
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
                <h2 className="text-2xl font-bold text-foreground mb-4">Project Overview</h2>
                {description && description.split('\n\n').map((paragraph, idx) => {
                  if (paragraph.startsWith('###')) {
                    return <h4 key={idx} className="text-lg font-semibold text-foreground mt-6 mb-3">{paragraph.replace('###', '').trim()}</h4>;
                  }
                  if (paragraph.startsWith('##')) {
                    return <h3 key={idx} className="text-xl font-bold text-foreground mt-8 mb-4">{paragraph.replace('##', '').trim()}</h3>;
                  }
                  // Parse markdown links [text](url)
                  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
                  const parts = [];
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
                  
                  return parts.length > 1 ? 
                    <p key={idx} className="text-base text-muted-foreground leading-relaxed mb-4">{parts}</p> :
                    <p key={idx} className="text-base text-muted-foreground leading-relaxed mb-4">{paragraph}</p>;
                })}
              </div>

              {/* Highlights */}
              {highlights.length > 0 ? (
                <div className="border-2 border-red-500 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-foreground mb-4">Key Highlights</h3>
                  <ul className="space-y-3">
                    {highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-red-500 font-bold flex-shrink-0">•</span>
                        <span className="text-muted-foreground">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : project.highlights ? (
                // Show debug info if highlights exist but couldn't be parsed
                <div className="border-2 border-yellow-500 rounded-lg p-6 bg-yellow-50/50">
                  <h3 className="text-xl font-bold text-foreground mb-4">Key Highlights</h3>
                  <p className="text-yellow-700 mb-2 text-sm">
                    Highlights data exists but couldn't be parsed. Raw data:
                  </p>
                  <details className="mt-2">
                    <summary className="cursor-pointer text-sm font-semibold text-yellow-700 hover:text-yellow-900">
                      View Raw Highlights Data
                    </summary>
                    <pre className="mt-2 p-4 bg-background rounded text-xs overflow-auto border">
                      {JSON.stringify(project.highlights, null, 2)}
                    </pre>
                    <p className="text-xs text-yellow-600 mt-2">
                      Type: {typeof project.highlights} | Is Array: {Array.isArray(project.highlights) ? 'Yes' : 'No'}
                    </p>
                  </details>
                </div>
              ) : null}
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
      <Footer />
    </div>
  );
}

