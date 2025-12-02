import { Metadata } from 'next';
import { Contact } from '@/components/Contact';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Anhart. Contact us for inquiries about affordable housing solutions, partnerships, or investment opportunities.',
  alternates: {
    canonical: 'https://anhart.ca/contact',
  },
};

export default function Page() {
  return <Contact />;
}