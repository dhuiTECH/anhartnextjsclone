import { Metadata } from 'next';
import BlogPost from '@/components/BlogPost';
import { getPostBySlugServer } from '@/lib/blog-server';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlugServer(slug);
  
  if (!post) {
    return {
      title: 'Blog Post Not Found | Anhart Affordable Housing',
      description: 'The requested blog post could not be found.',
    };
  }

  const metaTitle = post.seo?.metaTitle || post.title;
  const metaDescription = post.seo?.metaDescription || post.excerpt;
  const keywords = post.seo?.keywords?.join(', ') || '';
  const imageUrl = post.featuredImage?.startsWith('http') 
    ? post.featuredImage 
    : `https://anhart.ca${post.featuredImage || '/blog/default.jpg'}`;

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: keywords || undefined,
    authors: [{ name: 'Anhart Affordable Housing' }],
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: `https://anhart.ca/blog/${post.slug}`,
      siteName: 'Anhart Affordable Housing',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: 'en_CA',
      type: 'article',
      publishedTime: post.publishDate,
      modifiedTime: post.updatedAt,
      authors: ['Anhart Affordable Housing'],
      tags: [post.category, ...(post.seo?.keywords || [])],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [imageUrl],
      site: '@anhart_housing',
      creator: '@anhart_housing',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlugServer(slug);

  // If no post is found on the server, show the 404 page
  if (!post) {
    notFound();
  }

  // Pass the full post object as a prop instead of just the slug
  return <BlogPost initialPost={post} />;
}