import { Metadata } from 'next';
import ContactPage from '@/components/ContactPage';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact page - Access and manage your content',
};

export default function ContactPagePage() {
  return <ContactPage />;
}