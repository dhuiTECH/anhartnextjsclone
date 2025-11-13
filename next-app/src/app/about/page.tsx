import { Metadata } from 'next';
import About from '@/components/About';

export const metadata: Metadata = {
  title: 'About Anhart',
  description: 'Learn about Anhart\'s mission, values, and team dedicated to creating sustainable affordable housing solutions in British Columbia.',
};

export default function Page() {
  return <About />;
}