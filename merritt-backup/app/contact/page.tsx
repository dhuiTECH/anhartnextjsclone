import type { Metadata } from "next";
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Register for Affordable Townhomes in Merritt | Anhart',
  description: 'Join the waitlist for Anhart\'s 48-unit affordable housing development in Merritt, BC. Vancouver developer - entry-level homes starting at $249k.',
};

export default function ContactPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Anhart",
    "url": "https://anhart.ca",
    "logo": "https://anhart.ca/anhartmerritt1.png",
    "description": "Vancouver-based developer of affordable townhomes in Merritt, BC",
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
    "sameAs": [
      "https://www.instagram.com/anhart.ca",
      "https://www.linkedin.com/company/anhart"
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