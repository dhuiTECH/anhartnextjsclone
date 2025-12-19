import type { Metadata } from "next";
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Register for Affordable Townhomes in Merritt | Anhart',
  description: 'Join the waitlist for Anhart\'s affordable housing community in Merritt, BC. Vancouver developer - entry-level homes with pricing TBD.',
  alternates: { canonical: 'https://anhart.ca/Merritt/contact' },
};

export default function ContactPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Anhart - Merritt Townhomes",
    "description": "Vancouver-based affordable housing developer contemplating townhome development in Merritt, BC",
    "url": "https://anhart.ca/Merritt/contact",
    "logo": "https://anhart.ca/merritt-assets/anhartmerritt1.png",
    "parentOrganization": {
      "@type": "Organization",
      "name": "Anhart",
      "url": "https://anhart.ca"
    },
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
      "availableLanguage": "English",
      "contactOption": "TollFree"
    },
    "makesOffer": {
      "@type": "Offer",
      "description": "Waitlist registration for contemplated affordable townhome development",
      "availability": "https://schema.org/PreOrder",
      "priceCurrency": "CAD"
    },
    "areaServed": [
      {
        "@type": "Place",
        "name": "Merritt, British Columbia"
      },
      {
        "@type": "Place",
        "name": "Nicola Valley"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Contemplated Merritt Townhome Configurations",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Potential Garden Flat (2-Bedroom)",
            "description": "Contemplated ground-level configuration with potential direct patio access"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Potential Sky Townhome (3-Bedroom)",
            "description": "Contemplated two-story configuration with potential private balcony"
          }
        }
      ]
    },
    "sameAs": [
      "https://www.instagram.com/anhart.ca",
      "https://www.linkedin.com/company/anhart"
    ],
    "knowsAbout": [
      "Affordable Housing",
      "Townhome Development",
      "Real Estate Development",
      "Sustainable Construction",
      "Community Development"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <ContactClient />
    </>
  );
}