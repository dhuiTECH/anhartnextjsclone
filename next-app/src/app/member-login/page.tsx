import { Metadata } from 'next';
import MemberLogin from '@/components/MemberLogin';

export const metadata: Metadata = {
  title: 'Member Login',
  description: 'Member Login page - Access and manage your content',
};

export default function MemberLoginPage() {
  return <MemberLogin />;
}