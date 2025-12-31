import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio DB Test - Anhart',
  description: 'Temporary test page for portfolio database validation',
  robots: 'noindex, nofollow',
};

export default function TestPortfolioDBLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


