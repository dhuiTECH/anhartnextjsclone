import { Metadata } from 'next';
import Portfolio from '@/components/Portfolio';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Portfolio page - Access and manage your content',
  alternates: {
    canonical: 'https://anhart.ca/portfolio',
  },
};

export default function PortfolioPage() {
  return <Portfolio />;
}