import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Use the same Supabase client configuration as the rest of the app
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Create a server-side Supabase client for this route
const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Dynamic Blog Sitemap Route
 * 
 * Purpose: Generates sitemap-blog.xml dynamically from published blog posts in Supabase.
 * This ensures the sitemap is always up-to-date when posts are created or deleted.
 * 
 * Benefits:
 * - Automatically includes new blog posts
 * - Automatically removes deleted blog posts
 * - No manual sitemap updates needed
 * - Always reflects current database state
 */
export async function GET() {
  try {
    // Fetch all published blog posts from Supabase
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('slug, updated_at, publish_date')
      .eq('is_published', true)
      .order('publish_date', { ascending: false });

    if (error) {
      console.error('Error fetching blog posts for sitemap:', error);
      // Return a minimal sitemap with just the blog listing page on error
      return generateSitemapXML([
        {
          slug: '',
          updated_at: new Date().toISOString(),
          publish_date: new Date().toISOString(),
        },
      ]);
    }

    // Generate sitemap XML
    const sitemapXML = generateSitemapXML(posts || []);

    // Return XML response with proper headers
    return new NextResponse(sitemapXML, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error generating blog sitemap:', error);
    // Return minimal sitemap on error
    return new NextResponse(
      generateSitemapXML([
        {
          slug: '',
          updated_at: new Date().toISOString(),
          publish_date: new Date().toISOString(),
        },
      ]),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/xml; charset=utf-8',
        },
      }
    );
  }
}

/**
 * Generate Sitemap XML
 * 
 * Purpose: Converts blog post data into valid XML sitemap format.
 * 
 * @param posts - Array of blog post data from Supabase
 * @returns XML string in sitemap format
 */
function generateSitemapXML(
  posts: Array<{
    slug: string;
    updated_at: string;
    publish_date: string;
  }>
): string {
  const baseUrl = 'https://anhart.ca';
  const currentDate = new Date().toISOString().split('T')[0];

  // Start XML document
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  
  <!-- Blog Listing Page -->
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
`;

  // Add each blog post to the sitemap
  posts.forEach((post) => {
    // Skip if slug is empty (error case)
    if (!post.slug) return;

    // Format dates for sitemap (YYYY-MM-DD format)
    const lastmod = post.updated_at
      ? new Date(post.updated_at).toISOString().split('T')[0]
      : post.publish_date
        ? new Date(post.publish_date).toISOString().split('T')[0]
        : currentDate;

    xml += `  
  <!-- Blog Post: ${post.slug} -->
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`;
  });

  // Close XML document
  xml += `
</urlset>`;

  return xml;
}

