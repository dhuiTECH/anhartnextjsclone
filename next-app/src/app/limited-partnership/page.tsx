import { Metadata } from 'next';
import LimitedPartnershipPage from '@/components/LimitedPartnershipPage';

export const metadata: Metadata = {
  title: 'Limited Partnership',
  description: 'Limited Partnership page - Access and manage your content',
};

export default function LimitedPartnershipPagePage() {
  return <LimitedPartnershipPage />;
}