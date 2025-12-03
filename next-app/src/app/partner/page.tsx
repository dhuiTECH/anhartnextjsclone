import { Metadata } from 'next';
import Partner from '@/components/Partner';

export const metadata: Metadata = {
  title: 'Partner With Us',
  description: 'Partner with Anhart to create affordable housing solutions across Canada. Explore collaboration opportunities for modular homes, SRO conversions, and community development projects.',
  keywords: 'affordable housing partnerships, housing development partnerships, real estate partnerships, community housing partnerships, non-profit housing partnerships, housing investment opportunities, affordable housing collaboration, housing development partners, modular housing partnerships, SRO conversion partnerships, housing finance partnerships, community development partnerships, affordable housing investors, housing development Canada, real estate development partnerships, housing solutions partnerships',
  authors: [{ name: 'Anhart' }],
  alternates: {
    canonical: 'https://anhart.ca/partner',
  },
  openGraph: {
    title: 'Partner With Us | Anhart',
    description: 'Partner with Anhart to create affordable housing solutions across Canada. Explore collaboration opportunities for modular homes, SRO conversions, and community development projects.',
    url: 'https://anhart.ca/partner',
    siteName: 'Anhart',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Partner With Anhart - Affordable Housing Development',
      },
    ],
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Partner With Us | Anhart',
    description: 'Partner with Anhart to create affordable housing solutions across Canada. Explore collaboration opportunities for modular homes, SRO conversions, and community development projects.',
    images: ['/og-image.jpg'],
    site: '@anhart_housing',
    creator: '@anhart_housing',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function PartnerPage() {
  return <Partner />;
}