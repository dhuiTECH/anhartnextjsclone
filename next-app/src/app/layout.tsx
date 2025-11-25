import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap', // Prevent FOIT (Flash of Invisible Text) and improve LCP
  preload: true, // Preload the font for faster rendering
  adjustFontFallback: true, // Optimize font fallback for better CLS
  fallback: ['system-ui', 'arial'], // Fast fallback fonts
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.anhart.ca"),
  title: {
    default: "Anhart - Affordable Housing Developer in Canada",
    template: "%s | Anhart",
  },
  description:
    "Anhart is a vertically integrated affordable housing developer in Vancouver, BC. Modular homes, SRO conversions, open-source Community Commons. Building 20,000 homes by 2045.",
  alternates: { canonical: "https://www.anhart.ca" },
  openGraph: {
    title: "Anhart - Affordable Housing Developer in Canada",
    description:
      "Anhart is a vertically integrated affordable housing developer in Vancouver, BC. Modular homes, SRO conversions, open-source Community Commons. Building 20,000 homes by 2045.",
    url: "https://www.anhart.ca",
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Anhart",
    "url": "https://anhart.ca",
    "logo": "https://anhart.ca/images/anhart-logo.png",
    "description": "Anhart is a vertically integrated affordable housing developer in Vancouver, BC. Modular homes, SRO conversions, open-source Community Commons. Building 20,000 homes by 2045.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Vancouver",
      "addressRegion": "BC",
      "addressCountry": "CA"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Canada"
    },
    "sameAs": [
      "https://www.linkedin.com/company/anhart",
      "https://twitter.com/anhart_housing"
    ]
  };

  return (
    <html lang="en-CA">
      <head>
        {/* Critical preconnects (keep to max ~4 origins) */}
        {/* Google Fonts - font CSS and font files are LCP-critical */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Supabase - used for auth and edge functions; early connect helps LCP */}
        <link
          rel="preconnect"
          href="https://hxqbbyglhubcgfkbqltu.supabase.co"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://hxqbbyglhubcgfkbqltu.supabase.co" />

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
        
        {/* Defer non-critical scripts to improve LCP */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
          strategy="lazyOnload"
          async
        />
        <Script
          id="google-analytics"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
        {/* Defer Turnstile script - only needed when forms are visible */}
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="lazyOnload"
          async
        />
      </body>
    </html>
  );
}
