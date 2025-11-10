import { Metadata } from 'next';
import Blog from '@/components/Blog';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Blog page - Access and manage your content',
};

export default function BlogPage() {
  return <Blog />;
}