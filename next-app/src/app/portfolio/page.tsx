import { Metadata } from 'next';
import Portfolio from '@/components/Portfolio';

export const metadata: Metadata = {
  title: 'Real Estate Projects',
  description: 'Explore Anhart\'s portfolio of affordable housing projects across Canada. View our modular homes, SRO conversions, and community development initiatives that are creating sustainable housing solutions.',
  keywords: 'affordable housing portfolio, housing projects Canada, modular housing projects, SRO conversion projects, affordable housing developments, community housing projects, housing portfolio Vancouver, housing portfolio Toronto, housing portfolio Calgary, housing portfolio Edmonton, affordable housing examples, housing development portfolio, non-profit housing projects, supportive housing projects, community development projects, housing solutions portfolio',
  authors: [{ name: 'Anhart' }],
  alternates: {
    canonical: 'https://anhart.ca/portfolio',
  },
  openGraph: {
    title: 'Our Real Estate Projects | Anhart',
    description: 'Explore Anhart\'s portfolio of affordable housing projects across Canada. View our modular homes, SRO conversions, and community development initiatives that are creating sustainable housing solutions.',
    url: 'https://anhart.ca/portfolio',
    siteName: 'Anhart',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Anhart Portfolio - Affordable Housing Projects',
      },
    ],
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Real Estate Projects | Anhart',
    description: 'Explore Anhart\'s portfolio of affordable housing projects across Canada. View our modular homes, SRO conversions, and community development initiatives that are creating sustainable housing solutions.',
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

export default function PortfolioPage() {
  return <Portfolio />;
}