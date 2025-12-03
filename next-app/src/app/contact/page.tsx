import { Metadata } from 'next';
import { Contact } from '@/components/Contact';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Anhart. Contact us for inquiries about affordable housing solutions, partnerships, or investment opportunities. We serve Vancouver, Toronto, Calgary, Edmonton, and cities across Canada.',
  keywords: 'contact Anhart, affordable housing contact, housing development contact, housing inquiries, affordable housing consultation, housing partnership inquiries, housing investment contact, housing development questions, affordable housing support, housing solutions contact, Anhart contact information, housing developer contact, community housing contact, non-profit housing contact, housing finance inquiries, housing development consultation',
  authors: [{ name: 'Anhart' }],
  alternates: {
    canonical: 'https://anhart.ca/contact',
  },
  openGraph: {
    title: 'Contact Us | Anhart',
    description: 'Get in touch with Anhart. Contact us for inquiries about affordable housing solutions, partnerships, or investment opportunities. We serve Vancouver, Toronto, Calgary, Edmonton, and cities across Canada.',
    url: 'https://anhart.ca/contact',
    siteName: 'Anhart',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Anhart - Affordable Housing Developer',
      },
    ],
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | Anhart',
    description: 'Get in touch with Anhart. Contact us for inquiries about affordable housing solutions, partnerships, or investment opportunities. We serve Vancouver, Toronto, Calgary, Edmonton, and cities across Canada.',
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
  return <Contact />;
}