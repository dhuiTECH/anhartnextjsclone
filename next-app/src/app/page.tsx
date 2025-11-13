import { Metadata } from 'next';
import Home from '@/components/Home';

export const metadata: Metadata = {
  title: 'Anhart | Canada Housing Developer | Free Consultation',
  description:
    'Anhart builds affordable, sustainable housing. Expert development + free consultation. Contact us to start your project.',
};

export default function HomePage() {
  return <Home />;
}