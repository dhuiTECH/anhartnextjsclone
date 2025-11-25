import { Metadata } from 'next';
import MemberLogin from '@/components/MemberLogin';

export const metadata: Metadata = {
  title: 'Member Login - Anhart',
  description: 'Secure member access to Anhart\'s contact form management dashboard. View and export form submissions.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function MemberLoginPage() {
  return <MemberLogin />;
}