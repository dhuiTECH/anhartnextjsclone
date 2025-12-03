import { Metadata } from 'next';
import Home from '@/components/Home';

export const metadata: Metadata = {
  title: 'Anhart | Canada Housing Developer | Free Consultation',
  description:
    'Anhart builds affordable, sustainable housing. Expert development + free consultation. Contact us to start your project.',
  keywords: 'affordable housing, SROs, modular homes, non-profit housing, low-income housing, subsidized housing, below-market housing, supportive housing, inclusionary housing, affordability, micro-suites, micro-units, vacancy development, derelict homes, single room occupancy, social housing, community housing, rental housing, housing continuum, transitional housing, Vancouver, Toronto, Calgary, Edmonton, Winnipeg, Ottawa, Hamilton, London, BC, Alberta, Manitoba, Ontario, Canada, housing development, housing solutions, community development, sustainable housing, housing policy, housing finance, community planning, affordable housing Vancouver, affordable housing Toronto, affordable housing Calgary, affordable housing Edmonton, affordable housing Winnipeg, SRO conversion Vancouver, SRO conversion Toronto, modular housing BC, modular housing Alberta, modular housing Ontario, micro-suites Vancouver, micro-suites Toronto, supportive housing Calgary, supportive housing Winnipeg',
  authors: [{ name: 'Anhart' }],
  alternates: {
    canonical: 'https://anhart.ca',
  },
  openGraph: {
    title: 'Anhart | Canada Housing Developer | Free Consultation',
    description:
      'Anhart builds affordable, sustainable housing. Expert development + free consultation. Contact us to start your project.',
    url: 'https://anhart.ca',
    siteName: 'Anhart',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Anhart - Affordable Housing Developer in Canada',
      },
    ],
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anhart | Canada Housing Developer | Free Consultation',
    description:
      'Anhart builds affordable, sustainable housing. Expert development + free consultation. Contact us to start your project.',
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

export default function HomePage() {
  return <Home />;
}