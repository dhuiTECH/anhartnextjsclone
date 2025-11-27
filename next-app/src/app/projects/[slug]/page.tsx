import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { notFound } from 'next/navigation';
import { portfolioProjectsData } from '@/data/portfolio-server';
import { generateProjectSlug, getProjectBySlug } from '@/lib/slug';
import { MapPin, Calendar, Users, Building } from 'lucide-react';
import OptimizedImage from '@/components/OptimizedImage';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { ScrollAnimationWrapper } from '@/components/animations/ScrollAnimationWrapper';
import { FloatingBackButton } from '@/components/FloatingBackButton';

export async function generateStaticParams() {
  return portfolioProjectsData.map((project) => ({
    slug: generateProjectSlug(project.title),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug, portfolioProjectsData);

  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.',
    };
  }

  const title = project.title === "162 Main St" ? "162 Main St | Affordable Micro-Suites & Supportive Housing Vancouver" : project.title === "The Ryder" ? "The Ryder Hope BC | Modular Affordable Housing Development | Anhart" : project.title === "Dodson Hotel" ? "Dodson Hotel | Historic Supportive Housing & SRO Renewal Vancouver" : project.title === "Jubilee Rooms" ? "Jubilee Rooms | Historic SRO Renovation & Affordable Housing Vancouver" : project.title === "Skeena House" ? "Skeena House | Indigenous-Led Supportive Housing Vancouver" : project.title === "Kwas House" ? "Kwas House | Inclusive Supportive Housing Hope BC" : project.title === "Anhart Sustainable Villages" ? "Anhart Sustainable Villages | Earthbag Housing Kenya & International Development" : project.title === "179 Main & 626 Alexander" ? "179 Main & 626 Alexander | Rapid Response Modular Housing Vancouver" : project.title === "The Oppenheimer Park Initiative" ? "The Gastown Hotel (Oppenheimer Initiative) | Heritage Supportive Housing Vancouver" : project.title === "Modular Villages" ? "Modular Villages Hope BC | Tiny Home Showroom & Garden Suites" : project.title === "Merritt Village" ? "Merritt Townhomes | Attainable Family Housing & Real Estate BC" : `${project.title} - Affordable Housing Project | Anhart`;
  const description = project.description || `Learn more about ${project.title}, an affordable housing project by Anhart located in ${project.location}.`;
  const imageUrl = project.image
    ? `https://anhart.ca/images/${project.image}.png`
    : 'https://anhart.ca/images/portfolio-hero.jpg';

  return {
    title,
    description,
    keywords: [
      project.title,
      'affordable housing',
      'housing project',
      project.location,
      project.type,
      'Anhart',
    ].join(', '),
    authors: [{ name: 'Anhart' }],
    openGraph: {
      title,
      description,
      url: `https://anhart.ca/projects/${slug}`,
      siteName: 'Anhart',
      images: [
        {
          url: imageUrl,
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
      images: [imageUrl],
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

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug, portfolioProjectsData);

  if (!project) {
    notFound();
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateProject',
    name: project.title,
    description: project.description,
    location: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: project.location,
        addressCountry: 'CA',
      },
    },
    numberOfUnits: project.units ? parseInt(String(project.units)) : undefined,
    url: `https://anhart.ca/projects/${slug}`,
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

            {/* Project Image */}
            {project.image && (
              <div className="mb-12 rounded-lg overflow-hidden">
                <OptimizedImage
                  imageName={project.image}
                  alt={project.title === "Metson Rooms" ? "Metson Rooms exterior 1060 Howe Street Vancouver affordable housing hotel conversion" : project.title === "162 Main St" ? "Exterior view of 162 Main St Vancouver affordable micro-suite housing development" : project.title === "The Ryder" ? "The Ryder 1270 Ryder Street Hope BC modular affordable housing exterior" : project.title === "Dodson Hotel" ? "Dodson Hotel exterior 25 East Hastings Vancouver heritage supportive housing" : project.title === "Jubilee Rooms" ? "Jubilee Rooms exterior 235 Main Street Vancouver historic hotel renovation" : project.title === "Skeena House" ? "Skeena House exterior 3475 East Hastings Vancouver supportive housing hotel conversion" : project.title === "Kwas House" ? "Kwas House exterior 477 Hudson Bay Street Hope BC inclusive housing" : project.title === "Anhart Sustainable Villages" ? "Earthbag sustainable housing construction site in Homa Bay Kenya Anhart Villages" : project.title === "179 Main & 626 Alexander" ? "Modular housing exterior 179 Main Street and 626 Alexander Street Vancouver" : project.title === "The Oppenheimer Park Initiative" ? "The Gastown Hotel exterior 112 Water Street Vancouver heritage renovation" : project.title === "Modular Villages" ? "Modular tiny home display village 1051 Nelson Avenue Hope BC" : project.title === "Merritt Village" ? "Merritt BC townhouse development exterior attainable home ownership" : project.title}
                  category="portfolio"
                  className="w-full h-full object-cover"
                  aspectRatio="16/9"
                  loading="eager"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 100%"
                />
              </div>
            )}

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
                {project.description && project.description.split('\n\n').map((paragraph, idx) => {
                  if (paragraph.startsWith('###')) {
                    // Handle H3 headings (must check before ##)
                    return <h4 key={idx} className="text-lg font-semibold text-foreground mt-6 mb-3">{paragraph.replace('###', '').trim()}</h4>;
                  }
                  if (paragraph.startsWith('##')) {
                    // Handle H2 headings
                    return <h3 key={idx} className="text-xl font-bold text-foreground mt-8 mb-4">{paragraph.replace('##', '').trim()}</h3>;
                  }
                  // Parse markdown links [text](url) in paragraph
                  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
                  const parts = [];
                  let lastIndex = 0;
                  let match;
                  
                  while ((match = linkRegex.exec(paragraph)) !== null) {
                    // Add text before link
                    if (match.index > lastIndex) {
                      parts.push(paragraph.substring(lastIndex, match.index));
                    }
                    // Add link
                    parts.push(
                      <a 
                        key={`link-${match.index}`}
                        href={match[2]}
                        className="text-primary font-semibold underline hover:opacity-80 transition-opacity"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {match[1]}
                      </a>
                    );
                    lastIndex = linkRegex.lastIndex;
                  }
                  
                  // Add remaining text
                  if (lastIndex < paragraph.length) {
                    parts.push(paragraph.substring(lastIndex));
                  }
                  
                  return parts.length > 1 ? 
                    <p key={idx} className="text-base text-muted-foreground leading-relaxed mb-4">{parts}</p> :
                    <p key={idx} className="text-base text-muted-foreground leading-relaxed mb-4">{paragraph}</p>;
                })}
              </div>

              {/* Highlights */}
              {project.highlights && project.highlights.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-4">Key Highlights</h3>
                  <ul className="space-y-3">
                    {project.highlights.map((highlight, index) => (
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
      <Footer />
    </div>
  );
}
