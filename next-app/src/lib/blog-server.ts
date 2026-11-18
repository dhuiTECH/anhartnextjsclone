import { unstable_cache } from 'next/cache';
import { BlogPost } from '@/data/blog';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface DbBlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  content: string;
  featured_image: string;
  author_name: string;
  publish_date: string;
  updated_at: string;
  category: string;
  tags: string[];
  reading_time: number;
  meta_title: string;
  meta_description: string;
  keywords: string[];
  is_published: boolean;
}

const BLOG_LIST_SELECT =
  'id, slug, title, subtitle, excerpt, featured_image, author_name, publish_date, updated_at, category, tags, reading_time, meta_title, meta_description, keywords, is_published';

const BLOG_DETAIL_SELECT = `${BLOG_LIST_SELECT}, content`;

function transformDbPost(dbPost: DbBlogPost): BlogPost & { updatedAt: string } {
  return {
    id: dbPost.id,
    slug: dbPost.slug,
    title: dbPost.title,
    subtitle: dbPost.subtitle,
    excerpt: dbPost.excerpt,
    content: dbPost.content || '',
    featuredImage: dbPost.featured_image,
    author: dbPost.author_name,
    publishDate: dbPost.publish_date,
    updatedAt: dbPost.updated_at,
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

export async function getPostBySlugServer(slug: string): Promise<(BlogPost & { updatedAt: string }) | null> {
  const fetcher = async (): Promise<(BlogPost & { updatedAt: string }) | null> => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select(BLOG_DETAIL_SELECT)
        .eq('slug', slug)
        .eq('is_published', true)
        .single();

      if (error || !data) {
        console.log('⚠️  No post found in database for slug:', slug);
        return null;
      }
      return transformDbPost(data as DbBlogPost);
    } catch (error) {
      console.error('⚠️  Error fetching blog post from Supabase:', error);
      return null;
    }
  };

  // Cache per slug for 1 hour to reduce Supabase egress
  return unstable_cache(fetcher, ['blog-post', slug], { revalidate: 3600, tags: ['blog'] })();
}

export async function getFeaturedPostsServer(limit = 3): Promise<BlogPost[]> {
  const fetcher = async (): Promise<BlogPost[]> => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(BLOG_LIST_SELECT)
      .eq('is_published', true)
      .eq('is_featured', true)
      .order('publish_date', { ascending: false })
      .limit(limit);

    if (error || !data) return [];
    return data.map((row) => transformDbPost({ ...(row as DbBlogPost), content: '' }));
  };

  return unstable_cache(fetcher, ['blog-featured', String(limit)], {
    revalidate: 3600,
    tags: ['blog'],
  })();
}
