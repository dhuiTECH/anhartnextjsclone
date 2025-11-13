import { Metadata } from 'next';
import Blog from '@/components/Blog';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights, news, and updates about affordable housing in Canada from Anhart.',
};

export default function BlogPage() {
  return <Blog />;
}