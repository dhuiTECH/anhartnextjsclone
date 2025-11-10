import { Metadata } from 'next';
import BlogPost from '@/components/BlogPost';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Blog page - Access and manage your content',
};

export default function BlogPostPage() {
  return <BlogPost />;
}