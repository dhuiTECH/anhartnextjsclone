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

function transformDbPost(dbPost: DbBlogPost): BlogPost & { updatedAt: string } {
  return {
    id: dbPost.id,
    slug: dbPost.slug,
    title: dbPost.title,
    subtitle: dbPost.subtitle,
    excerpt: dbPost.excerpt,
    content: dbPost.content,
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
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single();

    if (error || !data) {
      console.log('No post found in database for slug:', slug);
      return null;
    }

    return transformDbPost(data as DbBlogPost);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}
