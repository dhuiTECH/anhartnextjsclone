import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Merritt Neighbourhood Guide | Community Amenities & Lifestyle | Anhart",
  description: "Discover Merritt's vibrant community with parks, dining, shopping, schools, and transit. Explore the Nicola Valley lifestyle around Anhart's townhome community.",
  keywords: "Merritt BC neighbourhood, Nicola Valley community, Merritt amenities, Merritt schools, Merritt dining, Merritt shopping, Anhart community",
  openGraph: {
    title: "Merritt Neighbourhood Guide | Community Amenities",
    description: "Explore Merritt's community with parks, dining, schools, shopping, and transit options. Perfect for families and professionals in the Nicola Valley.",
    type: "website",
    locale: "en_CA",
  },
};

export default function NeighbourhoodLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
