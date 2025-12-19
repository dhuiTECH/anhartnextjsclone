import type { Metadata } from "next";
import NeighbourhoodClient from './NeighbourhoodClient';

export const metadata: Metadata = {
  title: 'Merritt Neighbourhood Guide | Amenities & Lifestyle',
  description: 'Explore Merritt, BC\'s premier location for affordable housing. Walking distance to schools, shopping, dining, and Canada\'s Country Music Capital amenities.',
  keywords: 'Merritt BC neighbourhood, amenities, schools, shopping, dining, Country Music Capital',
  alternates: { canonical: 'https://anhart.ca/Merritt/neighbourhood' },
  openGraph: {
    title: 'Merritt Neighbourhood Guide | Amenities & Lifestyle',
    description: 'Discover Merritt\'s perfect blend of community, nature, and convenience. Walking distance to schools, dining, and Canada\'s Country Music Capital.',
    images: ['/merritt-assets/fullvillage.webp'],
    url: 'https://anhart.ca/Merritt/neighbourhood',
  },
};

export default function NeighbourhoodPage() {
  // Schema markup for neighbourhood/location information
  const neighbourhoodSchema = {
    "@context": "https://schema.org",
    "@type": "Place",
    "name": "Merritt Townhome Community",
    "description": "Affordable townhome community in Merritt, BC with access to schools, shopping, dining, and recreational amenities",
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
    "hasMap": "https://anhart.ca/Merritt/neighbourhood",
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "Schools",
        "value": "Multiple schools within 3-15 minute drive including Merritt Secondary and Nicola Valley Institute of Technology"
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Shopping",
        "value": "Merritt Mall, Walmart, Canadian Tire, and local boutiques within 2-5 minute drive"
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Dining",
        "value": "Variety of restaurants, cafés, and fast food options in downtown Merritt"
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Recreation",
        "value": "Parks, hiking trails, golf course, and Nicola River access nearby"
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Transit",
        "value": "BC Transit services, regional airport, and major highway access"
      }
    ],
    "additionalProperty": {
      "@type": "PropertyValue",
      "name": "Country Music Capital",
      "value": "Canada's Country Music Capital with year-round festivals and events"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(neighbourhoodSchema),
        }}
      />
      <NeighbourhoodClient />
    </>
  );
}