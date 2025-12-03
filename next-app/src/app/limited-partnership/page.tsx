import { Metadata } from 'next';
import LimitedPartnershipPage from '@/components/LimitedPartnershipPage';

export const metadata: Metadata = {
  title: 'Limited Partnership',
  description: 'Learn about Anhart\'s Limited Partnership investment opportunities in affordable housing development. Explore how you can invest in sustainable housing solutions that create positive community impact across Canada.',
  keywords: 'affordable housing investment, housing development investment, limited partnership housing, real estate investment partnerships, affordable housing LP, housing investment opportunities, community housing investment, non-profit housing investment, housing finance partnerships, affordable housing investors, housing development partnerships, real estate limited partnerships, housing investment Canada, affordable housing funding, housing development capital, community development investment',
  authors: [{ name: 'Anhart' }],
  alternates: {
    canonical: 'https://anhart.ca/limited-partnership',
  },
  openGraph: {
    title: 'Limited Partnership | Anhart',
    description: 'Learn about Anhart\'s Limited Partnership investment opportunities in affordable housing development. Explore how you can invest in sustainable housing solutions that create positive community impact across Canada.',
    url: 'https://anhart.ca/limited-partnership',
    siteName: 'Anhart',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Anhart Limited Partnership - Housing Investment Opportunities',
      },
    ],
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Limited Partnership | Anhart',
    description: 'Learn about Anhart\'s Limited Partnership investment opportunities in affordable housing development. Explore how you can invest in sustainable housing solutions that create positive community impact across Canada.',
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

export default function LimitedPartnershipPagePage() {
  return <LimitedPartnershipPage />;
}