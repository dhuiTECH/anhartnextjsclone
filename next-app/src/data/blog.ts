'use client';

import communityImage from "@/assets/blog/affordable-housing-community-vancouver.jpg";
import applicationImage from "@/assets/blog/bc-housing-application-guide.jpg";
import communityImpactImage from "@/assets/blog/bc-community-impact.jpg";
import subsidiesHeroImage from "@/assets/blog/housing-subsidies-hero.jpg";
import modularHousingImage from "@/assets/blog/modular-housing-canada.jpg";

import { supabase } from "@/integrations/supabase/client";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: string;
  publishDate: string;
  readTime: string;
  readingTime: number;
  category: string;
  tags: string[];
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

interface DbBlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle?: string | null;
  excerpt: string;
  content: string;
  featured_image: string;
  author_name: string;
  author_avatar: string | null;
  publish_date: string;
  category: string;
  tags: string[];
  reading_time: number;
  meta_title: string;
  meta_description: string;
  keywords: string[];
  is_published: boolean;
  is_featured?: boolean;
}

function transformDbPost(dbPost: DbBlogPost): BlogPost {
  return {
    id: dbPost.id,
    slug: dbPost.slug,
    title: dbPost.title,
    subtitle: dbPost.subtitle || undefined,
    excerpt: dbPost.excerpt,
    content: dbPost.content,
    featuredImage: dbPost.featured_image,
    author: dbPost.author_name,
    publishDate: dbPost.publish_date,
    readTime: `${dbPost.reading_time} min read`,
    readingTime: dbPost.reading_time,
    category: dbPost.category,
    tags: dbPost.tags,
    seo: {
      metaTitle: dbPost.meta_title,
      metaDescription: dbPost.meta_description,
      keywords: dbPost.keywords,
    },
  };
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "why-affordable-housing-matters-vancouver",
    title: "Why Affordable Housing Matters: Building Inclusive Communities in Vancouver",
    excerpt: "Explore how affordable housing creates thriving, diverse communities in Vancouver...",
    author: "Anhart Team",
    publishDate: "2025-10-01",
    readTime: "8 min read",
    readingTime: 8,
    category: "Community Impact",
    tags: ["affordable housing", "Vancouver", "inclusive communities"],
    featuredImage: communityImage,
    content: "",
    seo: {
      metaTitle: "Why Affordable Housing Matters: Building Inclusive Communities in Vancouver | Anhart",
      metaDescription: "Discover the social, economic, and health benefits of affordable housing in Vancouver.",
      keywords: ["affordable housing Vancouver", "inclusive communities", "Vancouver housing crisis"],
    },
  },
  {
    id: "2",
    slug: "how-to-apply-affordable-housing-bc",
    title: "How to Apply for Affordable Housing in BC: A Step-by-Step Guide",
    excerpt: "Learn how to successfully apply for affordable housing in British Columbia...",
    author: "Anhart Team",
    publishDate: "2025-09-22",
    readTime: "7 min read",
    readingTime: 7,
    category: "Housing Resources",
    tags: ["affordable housing BC", "apply for housing", "BC housing application"],
    featuredImage: applicationImage,
    content: "",
    seo: {
      metaTitle: "How to Apply for Affordable Housing in BC: Step-by-Step Guide | Anhart",
      metaDescription: "Learn how to successfully apply for affordable housing in British Columbia...",
      keywords: ["affordable housing BC", "BC housing application", "housing eligibility BC"],
    },
  },
  {
    id: "3",
    slug: "why-affordable-housing-matters-bc-community-impact",
    title: "Why Affordable Housing Matters in BC: Impact on Communities",
    excerpt: "Explore the vital role affordable housing plays in British Columbia communities...",
    author: "Anhart Team",
    publishDate: "2025-08-20",
    readTime: "7 min read",
    readingTime: 7,
    category: "Community Impact",
    tags: ["affordable housing BC", "community impact", "social housing"],
    featuredImage: communityImpactImage,
    content: "",
    seo: {
      metaTitle: "Why Affordable Housing Matters in BC: Impact on Communities | Anhart",
      metaDescription: "Explore the vital role affordable housing plays in British Columbia communities...",
      keywords: ["affordable housing BC", "community impact", "BC communities"],
    },
  },
  {
    id: "5",
    slug: "understanding-housing-subsidies-qualifying-bc",
    title: "Understanding Housing Subsidies and Qualifying for Support in British Columbia",
    excerpt: "Discover how housing subsidies work in BC, who qualifies, and how to get support...",
    author: "Anhart Team",
    publishDate: "2025-07-12",
    readTime: "6 min read",
    readingTime: 6,
    category: "Housing Resources",
    tags: ["housing subsidies BC", "rental assistance", "BC housing programs"],
    featuredImage: subsidiesHeroImage,
    content: "",
    seo: {
      metaTitle: "Understanding Housing Subsidies and Qualifying for Support in BC | Anhart",
      metaDescription: "Discover how housing subsidies work in BC, who qualifies, and how to get support...",
      keywords: ["housing subsidies BC", "affordable housing eligibility", "rental assistance British Columbia"],
    },
  },
  {
    id: "6",
    slug: "modular-housing-canada-innovative-solution",
    title: "Modular Housing in Canada: An Innovative Solution for Affordable Living",
    excerpt: "Discover how modular housing is transforming affordable homes in Canada...",
    author: "Anhart Team",
    publishDate: "2025-10-05",
    readTime: "8 min read",
    readingTime: 8,
    category: "Housing Innovation",
    tags: ["modular housing", "affordable housing Canada", "sustainable construction"],
    featuredImage: modularHousingImage,
    content: "",
    seo: {
      metaTitle: "Modular Housing in Canada: An Innovative Solution for Affordable Living | Anhart",
      metaDescription: "Discover how modular housing is transforming the landscape of affordable homes in Canada...",
      keywords: ["modular housing Canada", "affordable housing", "prefab homes"],
    },
  },
];

export const getSortedPosts = async (): Promise<BlogPost[]> => {
  const { data, error } = await supabase.from("blog_posts").select("*").eq("is_published", true).order("publish_date", { ascending: false });
  if (error || !data) return blogPosts;
  return data.map(transformDbPost);
};

export const getFeaturedPosts = async (): Promise<BlogPost[]> => {
  const { data, error } = await supabase.from("blog_posts").select("*").eq("is_published", true).eq("is_featured", true).order("publish_date", { ascending: false }).limit(3);
  if (error || !data) return [];
  return data.map(transformDbPost);
};

export const getPostBySlug = async (slug: string): Promise<BlogPost | undefined> => {
  const { data, error } = await supabase.from("blog_posts").select("*").eq("slug", slug).eq("is_published", true).maybeSingle();
  if (error || !data) {
    const fallback = blogPosts.find(p => p.slug === slug);
    return fallback || undefined;
  }
  return transformDbPost(data);
};

export const getRelatedPosts = async (currentPost: BlogPost, limit = 2): Promise<BlogPost[]> => {
  const { data, error } = await supabase.from("blog_posts").select("*").eq("category", currentPost.category).eq("is_published", true).neq("id", currentPost.id).limit(limit);
  if (error || !data) return [];
  return data.map(transformDbPost);
};