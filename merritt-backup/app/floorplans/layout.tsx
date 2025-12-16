import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "2 or 3 Bedroom Floor Plans | Merritt Development | Anhart",
  description: "Explore Anhart's modern townhome floor plans in Merritt, BC. View 2 and 3-bedroom layouts with modern finishes, starting from $249k. Quality construction with Vancouver standards.",
  keywords: "townhome floor plans, Merritt BC homes, 2 bedroom townhome, 3 bedroom townhome, affordable housing BC, Anhart development",
  openGraph: {
    title: "Townhome Floor Plans | Anhart Merritt Development",
    description: "Discover modern 2-3 bedroom townhome floor plans in Merritt, BC. Starting from $249k with modern finishes and quality construction.",
    type: "website",
    locale: "en_CA",
  },
};

export default function FloorplansLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
