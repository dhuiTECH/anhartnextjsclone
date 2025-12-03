import { Metadata } from 'next';
import Blog from '@/components/Blog';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights, news, and updates about affordable housing in Canada from Anhart. Read articles on modular homes, SRO conversions, housing policy, community development, and sustainable housing solutions.',
  keywords: 'affordable housing blog, housing development blog, housing news Canada, affordable housing articles, housing policy blog, community housing blog, non-profit housing blog, housing finance blog, modular housing blog, SRO conversion blog, supportive housing blog, housing solutions blog, community development blog, housing insights, housing trends Canada, affordable housing updates, housing development insights',
  authors: [{ name: 'Anhart' }],
  alternates: {
    canonical: 'https://anhart.ca/blog',
  },
  openGraph: {
    title: 'Blog | Anhart',
    description: 'Insights, news, and updates about affordable housing in Canada from Anhart. Read articles on modular homes, SRO conversions, housing policy, community development, and sustainable housing solutions.',
    url: 'https://anhart.ca/blog',
    siteName: 'Anhart',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Anhart Blog - Affordable Housing Insights',
      },
    ],
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Anhart',
    description: 'Insights, news, and updates about affordable housing in Canada from Anhart. Read articles on modular homes, SRO conversions, housing policy, community development, and sustainable housing solutions.',
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

export default function BlogPage() {
  return <Blog />;
}