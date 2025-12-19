import type { Metadata } from "next";
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'Modern Townhome Interiors in Merritt, BC | Anhart',
  description: 'Quality interior finishes and practical designs by Vancouver developer Anhart. Discover our affordable Merritt townhomes with modern amenities and great value.',
  alternates: { canonical: 'https://anhart.ca/Merritt/interiors' },
};

export default function AboutPage() {
  return <AboutClient />;
}

