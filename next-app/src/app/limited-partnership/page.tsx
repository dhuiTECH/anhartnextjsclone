import { Metadata } from 'next';
import LimitedPartnershipPage from '@/components/LimitedPartnershipPage';

export const metadata: Metadata = {
  title: 'Limited Partnership',
  description: 'Limited Partnership page - Access and manage your content',
  alternates: {
    canonical: 'https://anhart.ca/limited-partnership',
  },
};

export default function LimitedPartnershipPagePage() {
  return <LimitedPartnershipPage />;
}