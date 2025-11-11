import { Metadata } from 'next';
import About from '@/components/About';

export const metadata: Metadata = {
  title: 'About Anhart Affordable Housing',
  description: 'Learn about Anhart Affordable Housing\'s mission, values, and team dedicated to creating sustainable affordable housing solutions in British Columbia.',
};

export default function Page() {
  return <About />;
}