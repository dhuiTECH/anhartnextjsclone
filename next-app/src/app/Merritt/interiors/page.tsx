import type { Metadata } from "next";
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'Modern Townhome Interiors in Merritt, BC | Anhart',
  description: 'Quality interior finishes and practical designs by Vancouver developer Anhart. Discover our affordable Merritt townhomes with modern amenities and great value.',
  keywords: 'Merritt townhome interiors, modern home design, affordable housing interiors, Merritt BC homes, quality finishes, Anhart townhomes',
  alternates: { canonical: 'https://anhart.ca/Merritt/interiors' },
  openGraph: {
    title: 'Modern Townhome Interiors in Merritt, BC | Anhart',
    description: 'Quality interior finishes and practical designs by Vancouver developer Anhart. Discover our affordable Merritt townhomes with modern amenities and great value.',
    images: [
      {
        url: '/merritt-assets/livingroom.jpg',
        width: 1200,
        height: 630,
        alt: 'Modern living room in Anhart Merritt townhome',
      },
    ],
    url: 'https://anhart.ca/Merritt/interiors',
    siteName: 'Anhart',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Modern Townhome Interiors in Merritt, BC | Anhart',
    description: 'Quality interior finishes and practical designs by Vancouver developer Anhart. Discover our affordable Merritt townhomes with modern amenities and great value.',
    images: ['/merritt-assets/livingroom.jpg'],
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

export default function AboutPage() {
  // Schema markup for interior/product information
  const interiorsSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Modern Townhome Interiors in Merritt, BC",
    "description": "Quality interior finishes and practical designs by Vancouver developer Anhart",
    "url": "https://anhart.ca/Merritt/interiors",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Anhart - Merritt Townhomes",
      "url": "https://anhart.ca/Merritt"
    },
    "about": {
      "@type": "Product",
      "name": "Merritt Townhome Interiors",
      "description": "Modern, quality interior finishes and practical designs for affordable townhomes",
      "category": "Real Estate > Residential > Interiors",
      "brand": {
        "@type": "Brand",
        "name": "Anhart"
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "Anhart",
      "url": "https://anhart.ca"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(interiorsSchema),
        }}
      />
      <AboutClient />
    </>
  );
}

