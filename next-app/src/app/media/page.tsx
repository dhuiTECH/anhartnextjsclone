import { Metadata } from 'next';
import Media from '@/components/Media';

export const metadata: Metadata = {
  title: 'News & Media',
  description: 'Stay updated with the latest news, media coverage, and press releases about Anhart\'s affordable housing projects and community impact across Canada.',
};

export default function MediaPage() {
  return <Media />;
}