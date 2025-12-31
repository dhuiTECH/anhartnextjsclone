'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { getPortfolioProjects } from '@/lib/portfolio-data';
import { ProjectData } from '@/types/project';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HeroBanner } from '@/components/shared/HeroBanner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/shared/StatusBadge';
import OptimizedImage from '@/components/OptimizedImage';
import { MapPin, Calendar, Users, Building, ExternalLink, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { ScrollAnimationWrapper } from '@/components/animations/ScrollAnimationWrapper';
import { generateProjectSlug } from '@/lib/slug';
import Link from 'next/link';
import { getPortfolioListingAltText } from '@/lib/altText';

/**
 * Gets alternative paths to try if the primary path fails
 */
function getAlternativePaths(imagePath: string, projectTitle: string): string[] {
  const cleanPath = imagePath.trim();
  const paths: string[] = [];
  
  // Title-based mappings
  const titleMappings: Record<string, string[]> = {
    'Jubilee Rooms': ['Jubilee-Sign.jpg', 'Jubilee.png', 'Jubilee.jpg'],
    'Kwas House': ['Kwas.png', 'Kwas.jpg'],
    'Anhart Sustainable Villages': ['Maternity.png', 'Maternity.jpg'],
    'Modular Homes Factory': ['ModularFactory.jpg', 'ModularFactory.png'],
    'Modular Villages': ['ModularHomes.png', 'ModularHomes.jpg'],
    'Merritt Village': ['ModularHomes.png', 'Merritt.png', 'Merritt.jpg'],
    '179 Main & 626 Alexander': ['626Alexander.jpg', '179Main.png', '626Alexander.png'],
    'Metson Rooms': ['Metsons.jpg', 'Metson.png', 'Metson.jpg'],
  };
  
  if (titleMappings[projectTitle]) {
    return titleMappings[projectTitle];
  }
  
  // Generate variations based on path
  if (!cleanPath.includes('.')) {
    paths.push(`${cleanPath}.png`, `${cleanPath}.jpg`);
    paths.push(`${cleanPath}-Sign.jpg`, `${cleanPath}_1.png`);
  } else {
    // Has extension, try changing it
    const base = cleanPath.replace(/\.(png|jpg|jpeg)$/i, '');
    paths.push(`${base}.png`, `${base}.jpg`);
  }
  
  return paths;
}

/**
 * Gets the public URL for an image from portfolio-images bucket
 * Handles both full URLs and file paths, tries multiple filename variations
 */
function getImageUrl(imagePath: string | null | undefined, projectTitle?: string): string | null {
  if (!imagePath) return null;
  
  // If it's already a full URL, return it
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // Clean the path - remove any leading/trailing spaces
  let cleanPath = imagePath.trim();
  
  // Use title-based mapping if available
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
      // Try both .png and .jpg extensions
      pathsToTry.push(`${cleanPath}.png`);
      pathsToTry.push(`${cleanPath}.jpg`);
      
      // Also try common variations
      pathsToTry.push(
        `${cleanPath}-Sign.jpg`,
        `${cleanPath}-Sign.png`,
        `${cleanPath}_1.png`,
        `${cleanPath}_1.jpg`,
        `${cleanPath}s.jpg`, // plural (e.g., Metsons)
        `${cleanPath}s.png`
      );
    }
  }
  
  // Construct URLs for all variations (we'll use the first one, but log all)
  const urls = pathsToTry.map(path => {
    const { data } = supabase.storage.from('portfolio-images').getPublicUrl(path);
    return { path, url: data.publicUrl };
  });
  
  // Use the first variation (we'll let the browser try to load it)
  const firstUrl = urls[0]?.url || null;
  
  // Debug logging
  console.log('Image URL construction:', {
    originalPath: imagePath,
    cleanedPath: cleanPath,
    pathsTried: pathsToTry,
    urls: urls,
    selectedUrl: firstUrl,
    bucket: 'portfolio-images'
  });
  
  return firstUrl;
}

interface RawDbRow {
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
  display_order: number | null;
  created_at: string;
  updated_at: string;
}

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export default function TestPortfolioDBPage() {
  const [rawData, setRawData] = useState<RawDbRow[] | null>(null);
  const [convertedData, setConvertedData] = useState<ProjectData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [validationResults, setValidationResults] = useState<ValidationResult[]>([]);
  const [showValidation, setShowValidation] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        // First, let's check what files are actually in the bucket
        const { data: bucketFiles, error: bucketError } = await supabase.storage
          .from('portfolio-images')
          .list('', {
            limit: 100,
            sortBy: { column: 'name', order: 'asc' }
          });

        if (bucketError) {
          console.error('Error listing bucket files:', bucketError);
        } else {
          console.log('Files in portfolio-images bucket:', bucketFiles?.map(f => f.name));
        }

        const { data: raw, error: rawError } = await supabase
          .from('portfolio')
          .select('*')
          .order('display_order', { ascending: true, nullsFirst: false })
          .order('created_at', { ascending: false });

        if (rawError) {
          setError(`Database Error: ${rawError.message}`);
          setLoading(false);
          return;
        }

        setRawData(raw || []);

        const converted = await getPortfolioProjects();
        setConvertedData(converted);

        if (raw) {
          const validations = raw.map((row, index) => validateRow(row, index));
          setValidationResults(validations);
        }

        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  function validateRow(row: RawDbRow, index: number): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!row.title || row.title.trim() === '') {
      errors.push('Missing title');
    }
    if (!row.location || row.location.trim() === '') {
      errors.push('Missing location');
    }
    if (!row.brief_description || row.brief_description.trim() === '') {
      errors.push('Missing brief_description');
    }

    if (row.status && !['completed', 'in-progress', 'in-planning'].includes(row.status)) {
      warnings.push(`Invalid status: ${row.status}`);
    }

    if (row.highlights) {
      if (!Array.isArray(row.highlights) && typeof row.highlights !== 'string') {
        errors.push('highlights must be an array or string');
      } else if (typeof row.highlights === 'string') {
        warnings.push('highlights stored as string (will be auto-converted)');
      }
    }

    if (row.units !== null && (typeof row.units !== 'number' || row.units < 0)) {
      warnings.push(`Invalid units: ${row.units}`);
    }

    if (!row.image_url && !row.image) {
      warnings.push('No image provided');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-muted-foreground text-center">Loading data from Supabase...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const validCount = validationResults.filter(v => v.isValid).length;
  const invalidCount = validationResults.filter(v => !v.isValid).length;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroBanner 
          backgroundImage="portfolio-hero" 
          title="Portfolio Database Test" 
          contentPosition="right" 
        />

        {/* Summary Banner */}
        {error ? (
          <div className="bg-destructive/10 border-y border-destructive py-4">
            <div className="max-w-6xl mx-auto px-6">
              <div className="flex items-center gap-2 text-destructive">
                <AlertCircle className="h-5 w-5" />
                <p className="font-semibold">Error: {error}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-muted/50 border-y py-4">
            <div className="max-w-6xl mx-auto px-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-6">
                  <div>
                    <span className="text-2xl font-bold">{rawData?.length || 0}</span>
                    <span className="text-muted-foreground ml-2">Total Projects (Database)</span>
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-green-600">{validCount}</span>
                    <span className="text-muted-foreground ml-2">Valid</span>
                  </div>
                  {invalidCount > 0 && (
                    <div>
                      <span className="text-2xl font-bold text-red-600">{invalidCount}</span>
                      <span className="text-muted-foreground ml-2">Invalid</span>
                    </div>
                  )}
                  {rawData && rawData.length > 0 && (
                      <div>
                        <span className="text-2xl font-bold text-blue-600">
                          {rawData.filter(r => r.image_url || r.image).length}
                        </span>
                        <span className="text-muted-foreground ml-2">With Images (portfolio-images bucket)</span>
                      </div>
                    )}
                </div>
                <button
                  onClick={() => setShowValidation(!showValidation)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  <Info className="h-4 w-4" />
                  {showValidation ? 'Hide' : 'Show'} Validation Details
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Projects Grid - Matching Portfolio Page */}
        <section className="py-24">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <ScrollAnimationWrapper direction="top" delay={0}>
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold tracking-tight text-foreground mb-6">
                  Featured Development Projects
                </h2>
                <p className="text-lg leading-8 text-muted-foreground">
                  This is a test page displaying projects from your Supabase database.
                  Projects are shown in the same format as the portfolio page.
                </p>
                <p className="text-sm text-muted-foreground mt-4">
                  Showing {rawData?.length || 0} projects directly from Supabase database
                </p>
                  {rawData && rawData.length > 0 && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Images loaded from: <strong>portfolio-images</strong> Supabase storage bucket
                      ({rawData.filter(r => r.image_url || r.image).length} projects have images)
                    </p>
                  )}
              </div>
            </ScrollAnimationWrapper>

            {rawData && rawData.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rawData.map((row, index) => {
                  const validation = validationResults[index];
                  // Use raw database data, not converted
                  // Get image URL from portfolio-images bucket
                  const originalPath = row.image_url || row.image;
                  const imageUrl = getImageUrl(originalPath, row.title);
                  
                  // Debug: Log what we're getting from database
                  if (originalPath) {
                    console.log(`Project ${row.title}:`, {
                      image_url: row.image_url,
                      image: row.image,
                      originalPath,
                      constructedUrl: imageUrl
                    });
                  }
                  
                  const project = {
                    id: row.id,
                    title: row.title,
                    location: row.location,
                    year: row.year || undefined,
                    status: row.status || undefined,
                    units: row.units || undefined,
                    briefDescription: row.brief_description || undefined,
                    description: row.brief_description || undefined,
                    image: imageUrl || undefined, // Use constructed URL from portfolio-images bucket
                    imagePath: originalPath || undefined, // Keep original path for reference
                  };
                  return (
                    <ScrollAnimationWrapper 
                      key={project.id} 
                      direction="top" 
                      delay={Math.min(index * 50, 400)}
                    >
                      <Card className={`overflow-hidden hover:shadow-lg transition-all duration-300 max-w-sm mx-auto md:max-w-none h-full flex flex-col ${
                        validation && !validation.isValid ? 'border-red-500 border-2' : ''
                      }`}>
                        {/* Validation Badge */}
                        {validation && (
                          <div className={`absolute top-2 right-2 z-10 ${
                            validation.isValid ? 'bg-green-500' : 'bg-red-500'
                          } text-white text-xs px-2 py-1 rounded-full flex items-center gap-1`}>
                            {validation.isValid ? (
                              <CheckCircle className="h-3 w-3" />
                            ) : (
                              <AlertCircle className="h-3 w-3" />
                            )}
                            {validation.isValid ? 'Valid' : 'Invalid'}
                          </div>
                        )}

                        {/* Project Image - From portfolio-images Supabase Storage Bucket */}
                        <div className="aspect-video overflow-hidden p-1 relative">
                          {project.image ? (
                            // Image URL from portfolio-images bucket - use regular img tag
                            <>
                              <img
                                src={project.image}
                                alt={getPortfolioListingAltText(project.title, project.location, row.type || undefined)}
                                className="w-full h-full rounded-sm object-cover"
                                loading="lazy"
                                onError={async (e) => {
                                  console.error('Image failed to load:', {
                                    src: project.image,
                                    imagePath: project.imagePath,
                                    project: project.title
                                  });
                                  
                                  // Try alternative filename variations
                                  if (project.imagePath) {
                                    const altPaths = getAlternativePaths(project.imagePath, project.title);
                                    console.log('Trying alternative paths:', altPaths);
                                    
                                    // Try next alternative if available
                                    const currentSrc = (e.currentTarget as HTMLImageElement).src;
                                    const currentIndex = altPaths.findIndex(p => {
                                      const { data } = supabase.storage.from('portfolio-images').getPublicUrl(p);
                                      return data.publicUrl === currentSrc;
                                    });
                                    
                                    if (currentIndex < altPaths.length - 1) {
                                      const nextPath = altPaths[currentIndex + 1];
                                      const { data } = supabase.storage.from('portfolio-images').getPublicUrl(nextPath);
                                      (e.currentTarget as HTMLImageElement).src = data.publicUrl;
                                      return; // Don't show fallback yet, try next image
                                    }
                                  }
                                  
                                  // All alternatives failed, show fallback
                                  (e.currentTarget as HTMLElement).style.display = 'none';
                                  const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                                  if (fallback) fallback.style.display = 'flex';
                                }}
                                onLoad={() => {
                                  console.log('Image loaded successfully:', {
                                    src: project.image,
                                    project: project.title
                                  });
                                }}
                              />
                              {/* Debug info - shows on hover in development */}
                              {process.env.NODE_ENV === 'development' && (
                                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-2 opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
                                  <div className="font-mono break-all">URL: {project.image}</div>
                                  {project.imagePath && project.imagePath !== project.image && (
                                    <div className="font-mono break-all mt-1">DB Path: {project.imagePath}</div>
                                  )}
                                </div>
                              )}
                            </>
                          ) : (
                            <div className="w-full h-full bg-muted flex items-center justify-center rounded-sm">
                              <div className="text-center">
                                <Building className="h-16 w-16 text-muted-foreground mx-auto mb-2" />
                                <span className="text-xs text-muted-foreground block">No image</span>
                                {project.imagePath && (
                                  <span className="text-xs text-yellow-600 block mt-1">Path in DB: {project.imagePath}</span>
                                )}
                              </div>
                            </div>
                          )}
                          {/* Fallback for failed images */}
                          <div className="w-full h-full bg-muted flex items-center justify-center rounded-sm absolute inset-0" style={{ display: 'none' }}>
                            <div className="text-center">
                              <Building className="h-16 w-16 text-muted-foreground mx-auto mb-2" />
                              <span className="text-xs text-muted-foreground block">Image not found</span>
                              {project.imagePath && (
                                <span className="text-xs text-red-500 block mt-1 font-mono break-all px-2">
                                  Path: {project.imagePath}
                                </span>
                              )}
                              {project.image && (
                                <span className="text-xs text-red-500 block mt-1 font-mono break-all px-2">
                                  URL: {project.image}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <CardHeader>
                          <div className="flex items-center justify-between mb-2">
                            <CardTitle className="text-xl">{project.title}</CardTitle>
                            <StatusBadge status={project.status || ""} />
                          </div>

                          <div className="flex items-center gap-4 text-base text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-5 w-5" />
                              <span className="font-small">{project.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-5 w-5" />
                              <span className="font-medium">{project.year}</span>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent className="flex-1 flex flex-col">
                          <p className="text-muted-foreground mb-4 line-clamp-5">
                            {project.briefDescription || project.description}
                          </p>

                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-1 text-base font-semibold text-primary">
                              <Users className="h-5 w-5" />
                              {project.units} Units
                            </div>
                          </div>

                          <Link
                            href={`/test-portfolio-db/test-details?id=${project.id}`}
                            className="w-full inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground transition-colors px-4 py-2 rounded-md font-medium"
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
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No projects found in database. The application will fall back to hardcoded data.
                </p>
                {convertedData && convertedData.length > 0 && (
                  <p className="text-sm text-yellow-600 mt-2">
                    Note: Showing {convertedData.length} projects from fallback data (not from database)
                  </p>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Validation Details Section */}
        {showValidation && rawData && rawData.length > 0 && (
          <section className="py-12 bg-muted/30">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-2xl font-bold mb-6">Validation Details</h2>
              <div className="space-y-4">
                {rawData.map((row, index) => {
                  const validation = validationResults[index];
                  return (
                    <div
                      key={row.id}
                      className={`border rounded-lg p-4 ${
                        validation?.isValid ? 'border-green-500 bg-green-50/50' : 'border-red-500 bg-red-50/50'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-semibold">{row.title || 'Untitled'}</h3>
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            validation?.isValid
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {validation?.isValid ? 'Valid' : 'Invalid'}
                        </span>
                      </div>

                      {validation && validation.errors.length > 0 && (
                        <div className="mb-2">
                          <div className="text-sm font-semibold text-red-600 mb-1">Errors:</div>
                          <ul className="list-disc list-inside text-sm text-red-600">
                            {validation.errors.map((err, i) => (
                              <li key={i}>{err}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {validation && validation.warnings.length > 0 && (
                        <div className="mb-2">
                          <div className="text-sm font-semibold text-yellow-600 mb-1">Warnings:</div>
                          <ul className="list-disc list-inside text-sm text-yellow-600">
                            {validation.warnings.map((warn, i) => (
                              <li key={i}>{warn}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <details className="mt-4">
                        <summary className="cursor-pointer text-sm font-semibold text-muted-foreground hover:text-foreground">
                          View Raw Database Data
                        </summary>
                        <pre className="mt-2 p-4 bg-background rounded text-xs overflow-auto border">
                          {JSON.stringify(row, null, 2)}
                        </pre>
                      </details>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
