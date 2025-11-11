import { Metadata } from 'next';
import { Contact } from '@/components/Contact';

export const metadata: Metadata = {
  title: 'Contact Us - Anhart Affordable Housing',
  description: 'Get in touch with Anhart Affordable Housing. Contact us for inquiries about affordable housing solutions, partnerships, or investment opportunities.',
};

export default function Page() {
  return <Contact />;
}