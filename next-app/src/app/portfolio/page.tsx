import { Metadata } from 'next';
import Portfolio from '@/components/Portfolio';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Portfolio page - Access and manage your content',
};

export default function PortfolioPage() {
  return <Portfolio />;
}