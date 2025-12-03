import { Metadata } from 'next';
import About from '@/components/About';

export const metadata: Metadata = {
  title: 'About Anhart',
  description: 'Learn about Anhart\'s mission, values, and team dedicated to creating sustainable affordable housing solutions across Canada. Discover our commitment to modular homes, SRO conversions, and community development.',
  keywords: 'about Anhart, affordable housing developer, housing development company, non-profit housing organization, community housing provider, affordable housing mission, housing development values, housing development team, affordable housing history, housing development expertise, community development organization, housing solutions provider, affordable housing Canada, housing developer Vancouver, housing developer Toronto, housing developer Calgary, housing developer Edmonton, modular housing developer, SRO conversion specialist, supportive housing provider',
  authors: [{ name: 'Anhart' }],
  alternates: {
    canonical: 'https://anhart.ca/about',
  },
  openGraph: {
    title: 'About Anhart',
    description: 'Learn about Anhart\'s mission, values, and team dedicated to creating sustainable affordable housing solutions across Canada. Discover our commitment to modular homes, SRO conversions, and community development.',
    url: 'https://anhart.ca/about',
    siteName: 'Anhart',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'About Anhart - Affordable Housing Developer',
      },
    ],
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Anhart',
    description: 'Learn about Anhart\'s mission, values, and team dedicated to creating sustainable affordable housing solutions across Canada. Discover our commitment to modular homes, SRO conversions, and community development.',
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

export default function Page() {
  return <About />;
}