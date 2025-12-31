import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Suspense } from "react";
import { CONTACT_INFO, OFFICE_ADDRESS } from "@/config/address";
import "./globals.css";
import { Providers } from "./providers";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap', // Prevent FOIT (Flash of Invisible Text) and improve LCP
  preload: true, // Preload the font for faster rendering
  adjustFontFallback: true, // Optimize font fallback for better CLS
  fallback: ['system-ui', 'arial'], // Fast fallback fonts
});

export const metadata: Metadata = {
  metadataBase: new URL("https://anhart.ca"),
  title: {
    default: "Anhart - Affordable Housing Developer in Canada",
    template: "%s | Anhart",
  },
  description:
    "Anhart is a vertically integrated affordable housing developer in Vancouver, BC. Modular homes, SRO conversions, open-source Community Commons. Building 20,000 homes by 2045.",
  keywords: [
    "affordable housing",
    "affordable housing Vancouver",
    "affordable housing Canada",
    "housing developer Vancouver",
    "housing developer Canada",
    "modular housing BC",
    "supportive housing",
    "non-profit housing",
    "Anhart",
  ],
  alternates: { canonical: "https://anhart.ca" },
  openGraph: {
    title: "Anhart - Affordable Housing Developer in Canada",
    description:
      "Anhart is a vertically integrated affordable housing developer in Vancouver, BC. Modular homes, SRO conversions, open-source Community Commons. Building 20,000 homes by 2045.",
    url: "https://anhart.ca",
    siteName: "Anhart",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anhart - Affordable Housing Developer in Canada",
    description:
      "Anhart is a vertically integrated affordable housing developer in Vancouver, BC. Modular homes, SRO conversions, open-source Community Commons. Building 20,000 homes by 2045.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://anhart.ca/#organization",
    name: "Anhart",
    url: "https://anhart.ca",
    logo: "https://anhart.ca/images/anhart-logo.png",
    email: CONTACT_INFO.email,
    telephone: "+1-604-529-6259",
    sameAs: [
      "https://www.linkedin.com/company/anhart",
      "https://twitter.com/anhart_housing",
      "https://www.facebook.com/anhartsolutions?rdid=RVW0ZiZ1JKyW8dI3&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2FnG5gD4iinFYGjyeT%2F",
      "https://www.instagram.com/anharthousing/",
      "https://x.com/anharthousing",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+1-604-529-6259",
        email: CONTACT_INFO.email,
        contactType: "customer service",
        areaServed: "CA",
        availableLanguage: ["English"],
      },
    ],
  };

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://anhart.ca/#localbusiness",
    name: "Anhart",
    url: "https://anhart.ca",
    image: "https://anhart.ca/images/anhart-logo.png",
    description:
      "Anhart is a vertically integrated affordable housing developer in Vancouver, BC. Modular homes, SRO conversions, open-source Community Commons. Building 20,000 homes by 2045.",
    telephone: "+1-604-529-6259",
    email: CONTACT_INFO.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${OFFICE_ADDRESS.suite}, ${OFFICE_ADDRESS.building}, ${OFFICE_ADDRESS.street}`,
      addressLocality: OFFICE_ADDRESS.city,
      addressRegion: OFFICE_ADDRESS.province,
      postalCode: OFFICE_ADDRESS.postalCode,
      addressCountry: "CA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: OFFICE_ADDRESS.coordinates.lat,
      longitude: OFFICE_ADDRESS.coordinates.lng,
    },
    areaServed: {
      "@type": "Country",
      name: "Canada",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "09:00",
        closes: "17:00",
      },
    ],
    sameAs: organizationJsonLd.sameAs,
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://anhart.ca/#website",
    url: "https://anhart.ca",
    name: "Anhart",
    publisher: {
      "@id": "https://anhart.ca/#organization",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://anhart.ca/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en-CA">
      <head>
        {/* Critical preconnects (keep to max ~4 origins) */}
        {/* Google Fonts - font CSS and font files are LCP-critical */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Supabase - used for auth and edge functions; early connect helps LCP */}
        {process.env.NEXT_PUBLIC_SUPABASE_URL && (
          <>
            <link
              rel="preconnect"
              href={process.env.NEXT_PUBLIC_SUPABASE_URL}
              crossOrigin="anonymous"
            />
            <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_SUPABASE_URL} />
          </>
        )}

        {/* Turnstile is not LCP-critical, so we only dns-prefetch (no preconnect) */}
        <link rel="dns-prefetch" href="https://challenges.cloudflare.com" />
        
        {/* Critical LCP images - only preload the most important ones */}
        <link
          rel="preload"
          href="/images/anhart-logo-text.webp"
          as="image"
          type="image/webp"
          fetchPriority="high"
        />
        <link
          rel="preload"
          href="/images/anhart-logo-text.png"
          as="image"
          type="image/png"
          fetchPriority="high"
        />
        
        {/* Font CSS preload for faster font rendering */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          as="style"
          fetchPriority="high"
        />
        
        {/* Google Analytics - Load only when tracking ID is available */}
        {process.env.NEXT_PUBLIC_GA_TRACKING_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
              strategy="afterInteractive"
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}', {
                    page_title: document.title,
                    page_location: window.location.href,
                  });
                `,
              }}
            />
          </>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              organizationJsonLd,
              localBusinessJsonLd,
              websiteJsonLd,
            ]),
          }}
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <Suspense fallback={null}>
            <GoogleAnalytics />
          </Suspense>
          {children}
        </Providers>
        {/* Load Turnstile script - needed for forms */}
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
          async
        />
      </body>
    </html>
  );
}
