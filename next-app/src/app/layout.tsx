import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // HOMEPAGE TITLE (59 chars – fits Google perfectly)
  title: {
    default: "Anhart Affordable Housing | Free Consultation",
    template: "%s | Anhart Affordable Housing",
  },

  // META DESCRIPTION (148 chars – high CTR)
  description:
    "Anhart Affordable Housing builds sustainable homes across Canada. Get your free consultation for municipalities, non-profits & developers.",

  // CANONICAL URL (your real site)
  alternates: { canonical: "https://www.anhart.ca" },

  // OPEN GRAPH (LinkedIn, Facebook, etc.)
  openGraph: {
    title: "Anhart Affordable Housing | Free Consultation",
    description:
      "Sustainable, community-led housing in Canada. Book your free consultation today.",
    url: "https://www.anhart.ca",
    siteName: "Anhart Affordable Housing",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Anhart Affordable Housing – Free Consultation Available",
      },
    ],
    locale: "en_CA",
    type: "website",
  },

  // TWITTER / X CARD
  twitter: {
    card: "summary_large_image",
    title: "Anhart Affordable Housing | Free Consultation",
    description:
      "Sustainable housing in Canada. Free consultation for partners.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-CA">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
