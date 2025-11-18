import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap', // Prevent FOIT (Flash of Invisible Text) and improve LCP
  preload: true, // Preload the font for faster rendering
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.anhart.ca"),
  title: {
    default: "Anhart – Affordable Housing Developer in Canada",
    template: "%s | Anhart",
  },
  description:
    "Anhart is a vertically integrated affordable housing developer in Vancouver, BC. Modular homes, SRO conversions, open-source Community Commons. Building 20,000 homes by 2045.",
  alternates: { canonical: "https://www.anhart.ca" },
  openGraph: {
    title: "Anhart – Affordable Housing Developer in Canada",
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
    title: "Anhart – Affordable Housing Developer in Canada",
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
        {/* Preconnect to critical third-party origins for faster page load */}
        <link rel="preconnect" href="https://hxqbbyglhubcgfkbqltu.supabase.co" />
        <link rel="dns-prefetch" href="https://hxqbbyglhubcgfkbqltu.supabase.co" />
        <link rel="preconnect" href="https://challenges.cloudflare.com" />
        <link rel="dns-prefetch" href="https://challenges.cloudflare.com" />
        
        {/* Preload LCP video - Hero background video is likely the LCP element */}
        <link
          rel="preload"
          href="/mediaAssets/hero-background-video.mp4"
          as="video"
          type="video/mp4"
          fetchPriority="high"
        />
        
        {/* Preload critical images for LCP optimization */}
        {/* These will be discovered earlier by the HTML parser */}
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
        
        {/* DNS prefetch for image domains to speed up image loading */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
        {/* Cloudflare Turnstile Script */}
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
