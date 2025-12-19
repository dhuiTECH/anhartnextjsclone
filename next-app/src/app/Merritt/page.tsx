import type { Metadata } from "next";
import dynamic from 'next/dynamic';

// Use dynamic import to force fresh module loading and bypass HMR cache
const HomeClient = dynamic(() => import('./HomeClient'), {
  ssr: true,
});

export const metadata: Metadata = {
  title: 'Affordable Townhomes in Merritt, BC',
  description: 'Vancouver-based developer Anhart offers 48 affordable townhomes in Merritt, BC starting at $249k. Modern entry-level homeownership in the scenic Nicola Valley with exceptional value.',
  keywords: 'affordable housing, townhomes, Merritt BC, Nicola Valley, first-time homebuyer, Anhart',
  alternates: { canonical: 'https://anhart.ca/Merritt' },
  openGraph: {
    title: 'Affordable Townhomes in Merritt, BC',
    description: 'Modern townhomes starting at $249k in scenic Merritt, BC. Vancouver developer Anhart brings affordable housing to the Nicola Valley.',
    images: ['/merritt-assets/fullvillage.webp'],
    url: 'https://anhart.ca/Merritt',
  },
};

export default function Home() {
  // Comprehensive schema markup for real estate SEO
  const realEstateAgentSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Anhart",
    "description": "Vancouver-based affordable housing developer specializing in townhome communities",
    "url": "https://anhart.ca",
    "logo": "https://anhart.ca/images/anhart-logo.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "885 W Georgia St Suite 1480",
      "addressLocality": "Vancouver",
      "addressRegion": "BC",
      "postalCode": "V6C 3E8",
      "addressCountry": "CA"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-604-529-6259",
      "contactType": "customer service",
      "availableLanguage": "English"
    },
    "offers": {
      "@type": "Offer",
      "description": "Affordable townhomes starting at $249,000",
      "priceRange": "249000-",
      "availability": "https://schema.org/InStock",
      "validFrom": "2025-01-01"
    },
    "areaServed": {
      "@type": "Place",
      "name": "Merritt, British Columbia",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Merritt",
        "addressRegion": "BC",
        "addressCountry": "CA"
      }
    },
    "sameAs": [
      "https://www.instagram.com/anhart.ca",
      "https://www.linkedin.com/company/anhart"
    ]
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Anhart Merritt Townhomes",
    "description": "Affordable townhome community in Merritt, BC",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "3757 De Wolf Way",
      "addressLocality": "Merritt",
      "addressRegion": "BC",
      "postalCode": "V1K 1B5",
      "addressCountry": "CA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 50.1205,
      "longitude": -120.762
    },
    "areaServed": {
      "@type": "City",
      "name": "Merritt",
      "addressRegion": "BC",
      "addressCountry": "CA"
    },
    "priceRange": "$$",
    "telephone": "+1-604-529-6259"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(realEstateAgentSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <HomeClient />
    </>
  );
}