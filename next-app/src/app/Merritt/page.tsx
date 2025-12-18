import type { Metadata } from "next";
import dynamic from 'next/dynamic';

// Use dynamic import to force fresh module loading and bypass HMR cache
const HomeClient = dynamic(() => import('./HomeClient'), {
  ssr: true,
});

export const metadata: Metadata = {
  title: 'Affordable Townhomes in Merritt, BC',
  description: 'Vancouver-based developer Anhart offers 48 affordable townhomes in Merritt, BC starting at $249k. Entry-level homeownership in the scenic Nicola Valley.',
};

export default function Home() {
  return <HomeClient />;
}