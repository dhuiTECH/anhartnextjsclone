import { Metadata } from 'next';
import Partner from '@/components/Partner';

export const metadata: Metadata = {
  title: 'Partner',
  description: 'Partner page - Access and manage your content',
};

export default function PartnerPage() {
  return <Partner />;
}