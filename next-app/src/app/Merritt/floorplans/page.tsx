import type { Metadata } from "next";
import FloorplansClient from './FloorplansClient';

export const metadata: Metadata = {
  title: '2 or 3 Bedroom Floor Plans - Merritt Townhomes | Anhart',
  description: 'View our affordable 2 or 3 bedroom townhome floor plans in Merritt, BC. Modern designs and practical layouts with pricing TBD.',
  keywords: 'floor plans, townhome layouts, 2 bedroom, 3 bedroom, Merritt BC housing',
  alternates: { canonical: 'https://anhart.ca/Merritt/floorplans' },
  openGraph: {
    title: '2 or 3 Bedroom Floor Plans - Merritt Townhomes',
    description: 'Discover modern 2 or 3 bedroom townhome floor plans in Merritt, BC. Quality construction with practical layouts with pricing TBD.',
    images: [
      {
        url: '/merritt-assets/fullvillage.webp',
        width: 1200,
        height: 630,
        alt: 'Merritt Townhome Floor Plans - 2 and 3 Bedroom Options',
      },
    ],
    url: 'https://anhart.ca/Merritt/floorplans',
    siteName: 'Anhart',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '2 or 3 Bedroom Floor Plans - Merritt Townhomes',
    description: 'Discover modern 2 or 3 bedroom townhome floor plans in Merritt, BC. Quality construction with practical layouts with pricing TBD.',
    images: ['/merritt-assets/fullvillage.webp'],
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

export default function FloorplansPage() {
  // Schema markup for floor plans/product information
  const floorplansSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "2 or 3 Bedroom Floor Plans - Merritt Townhomes",
    "description": "View affordable 2 or 3 bedroom townhome floor plans in Merritt, BC with pricing TBD",
    "url": "https://anhart.ca/Merritt/floorplans",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Anhart - Merritt Townhomes",
      "url": "https://anhart.ca/Merritt"
    },
    "about": {
      "@type": "Product",
      "name": "Merritt Townhomes",
      "description": "Contemplated affordable townhome community potentially with 2-3 bedroom configurations",
      "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/ComingSoon",
        "priceCurrency": "CAD"
      },
      "category": "Real Estate > Residential"
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
          __html: JSON.stringify(floorplansSchema),
        }}
      />
      <FloorplansClient />
    </>
  );
}