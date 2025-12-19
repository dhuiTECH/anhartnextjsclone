import type { Metadata } from "next";
import FloorplansClient from './FloorplansClient';

export const metadata: Metadata = {
  title: 'Merritt Townhome Floor Plans | Anhart',
  description: 'View our affordable townhome floor plans in Merritt, BC. 2-3 bedroom options with modern designs and practical layouts with pricing TBD.',
  keywords: 'floor plans, townhome layouts, 2 bedroom, 3 bedroom, Merritt BC housing',
  alternates: { canonical: 'https://anhart.ca/Merritt/floorplans' },
  openGraph: {
    title: 'Merritt Townhome Floor Plans',
    description: 'Discover modern townhome floor plans in Merritt, BC. Quality construction with practical layouts with pricing TBD.',
    images: ['/merritt-assets/fullvillage.webp'],
    url: 'https://anhart.ca/Merritt/floorplans',
  },
};

export default function FloorplansPage() {
  // Schema markup for floor plans/product information
  const floorplansSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Merritt Townhome Floor Plans",
    "description": "View affordable townhome floor plans in Merritt, BC with pricing TBD",
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