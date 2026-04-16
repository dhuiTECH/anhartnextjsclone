import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'Anhart | Housing Calculator',
  },
  description:
    'Plan your housing project with Anhart’s Total Development Cost Estimator. Get feasibility insights and pre-development cost assumptions for municipalities, non-profits, and developers.',
  keywords: [
    'housing development',
    'housing project',
    'total development cost estimator',
    'TDCE calculator',
    'pre-development management',
    'pre-development estimation',
    'free pre-development calculator',
    'affordable housing feasibility',
    'development cost planning',
    'project feasibility tool',
  ],
  alternates: {
    canonical: 'https://anhart.ca/tdce',
  },
  openGraph: {
    type: 'website',
    url: 'https://anhart.ca/tdce',
    title: 'Anhart | Housing Calculator',
    description:
      'Plan your housing project with Anhart’s Total Development Cost Estimator. Get feasibility insights and pre-development cost assumptions for municipalities, non-profits, and developers.',
    siteName: 'Anhart',
    images: ['https://anhart.ca/images/anhart-logo-tdce.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anhart | Housing Calculator',
    description:
      'Plan your housing project with Anhart’s Total Development Cost Estimator. Get feasibility insights and pre-development cost assumptions for municipalities, non-profits, and developers.',
    images: ['https://anhart.ca/images/anhart-logo-tdce.webp'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TdceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
