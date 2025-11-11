import { Metadata } from 'next';
import Media from '@/components/Media';

export const metadata: Metadata = {
  title: 'Media',
  description: 'Media page - Access and manage your content',
};

export default function MediaPage() {
  return <Media />;
}