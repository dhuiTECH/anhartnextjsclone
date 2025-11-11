import { Metadata } from 'next';
import Home from '@/components/Home';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Home page - Access and manage your content',
};

export default function HomePage() {
  return <Home />;
}