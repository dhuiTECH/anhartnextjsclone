import { Metadata } from 'next';
import Media from '@/components/Media';

export const metadata: Metadata = {
  title: 'News & Media',
  description: 'Stay updated with the latest news, media coverage, and press releases about Anhart\'s affordable housing projects and community impact across Canada.',
  keywords: 'Anhart news, affordable housing news, housing development news, housing media coverage, affordable housing press releases, housing development updates, community housing news, non-profit housing news, housing policy news, housing finance news, affordable housing Canada news, housing development Canada media, modular housing news, SRO conversion news, supportive housing news, community development news, housing solutions news',
  authors: [{ name: 'Anhart' }],
  alternates: {
    canonical: 'https://anhart.ca/media',
  },
  openGraph: {
    title: 'News & Media | Anhart',
    description: 'Stay updated with the latest news, media coverage, and press releases about Anhart\'s affordable housing projects and community impact across Canada.',
    url: 'https://anhart.ca/media',
    siteName: 'Anhart',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Anhart News & Media - Affordable Housing Updates',
      },
    ],
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'News & Media | Anhart',
    description: 'Stay updated with the latest news, media coverage, and press releases about Anhart\'s affordable housing projects and community impact across Canada.',
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

export default function MediaPage() {
  return <Media />;
}