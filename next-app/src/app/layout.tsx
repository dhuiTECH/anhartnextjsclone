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
    alternateName: ["Anhart Community Housing Society", "Anhart Housing"],
    legalName: "Anhart Community Housing Society",
    url: "https://anhart.ca/",
    logo: "https://anhart.ca/images/anhart-logo.png",
    description: "Anhart is a Canadian non-profit developer specializing in 100% affordable housing and urban renewal projects.",
    email: CONTACT_INFO.email,
    telephone: "+1-604-529-6259",
    sameAs: [
      "https://www.linkedin.com/company/anhart",
      "https://twitter.com/anhart_housing",
      "https://www.facebook.com/anhartsolutions?rdid=RVW0ZiZ1JKyW8dI3&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2FnG5gD4iinFYGjyeT%2F",
      "https://www.instagram.com/anharthousing/",
      "https://x.com/anharthousing",
      // TODO: Add CBC article URL here when available
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
        {/* Preload WebP first (modern browsers), PNG will be used as fallback by the picture element */}
        <link
          rel="preload"
          href="/images/anhart-logo-text.webp"
          as="image"
          type="image/webp"
          fetchPriority="high"
          crossOrigin="anonymous"
        />
        
        {/* Font CSS preload for faster font rendering */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          as="style"
          fetchPriority="high"
        />
        {/* Anhart brand fonts: Roboto (body), Merriweather (headings) */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Merriweather:wght@400;600;700&family=Roboto:wght@300;400;500;600;700&display=swap"
        />
        
        {/* Google Tag Manager - Load early in head for optimal tracking */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-W9VNWXDH');
            `,
          }}
        />
        {/* Google tag (gtag.js) — GA4 + Google Ads conversion ID */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-STLCYEZYSB"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-STLCYEZYSB');
              gtag('config', 'AW-17630924755');
            `,
          }}
        />
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
        {/* Suppress harmless Firefox deprecation warnings from third-party scripts/extensions */}
        <Script
          id="suppress-deprecation-warnings"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Suppress known Firefox deprecation warnings that come from browser extensions
              // These are harmless and not from our code
              if (typeof console !== 'undefined') {
                const originalWarn = console.warn;
                console.warn = function(...args) {
                  const message = args.join(' ');
                  // Suppress known Firefox deprecation warnings
                  if (
                    message.includes('InstallTrigger is deprecated') ||
                    message.includes('onmozfullscreenchange is deprecated') ||
                    message.includes('onmozfullscreenerror is deprecated') ||
                    message.includes('WEBGL_debug_renderer_info is deprecated')
                  ) {
                    return; // Suppress these warnings
                  }
                  originalWarn.apply(console, args);
                };
              }
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W9VNWXDH"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Providers>
          <Suspense fallback={null}>
            <GoogleAnalytics />
          </Suspense>
          {children}
        </Providers>
        {/* Load Turnstile script - needed for forms */}
        {/* Note: We load with cache-busting in the Turnstile component itself */}
        {/* This script tag is a fallback, but the component handles loading with cache-busting */}
      </body>
    </html>
  );
}
