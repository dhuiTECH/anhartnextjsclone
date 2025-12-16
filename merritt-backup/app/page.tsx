import type { Metadata } from "next";
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'Affordable Townhomes in Merritt, BC | Anhart',
  description: 'Vancouver-based developer Anhart offers 48 affordable townhomes in Merritt, BC starting at $249k. Entry-level homeownership in the scenic Nicola Valley.',
};

export default function Home() {
  return <HomeClient />;
}