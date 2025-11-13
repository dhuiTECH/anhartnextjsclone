import { Metadata } from 'next';
import Partner from '@/components/Partner';

export const metadata: Metadata = {
  title: 'Partner With Us',
  description: 'Partner with Anhart to create affordable housing solutions across Canada. Explore collaboration opportunities.',
};

export default function PartnerPage() {
  return <Partner />;
}