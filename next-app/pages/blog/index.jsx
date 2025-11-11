import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const Header = dynamic(() => import('../../src/components/Header').then(mod => ({ default: mod.Header })), { ssr: false });
const Footer = dynamic(() => import('../../src/components/Footer').then(mod => ({ default: mod.Footer })), { ssr: false });

export default function BlogIndex() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (!error) setPosts(data || []);
    setLoading(false);
  }

  if (loading) return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex items-center justify-center py-24">Loading blog posts...</div>
      <Footer />
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 text-foreground">Anhart Blog</h1>
          <p className="text-xl text-muted-foreground">
            Insights on affordable housing, community development, and sustainable building
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No blog posts published yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <article className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
                  {post.featured_image_url && (
                    <div className="aspect-video bg-gray-200 relative">
                      <img
                        src={post.featured_image_url}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-3 text-gray-900 hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.meta_description || 'Read more...'}
                    </p>
                    <time className="text-sm text-gray-500">
                      {new Date(post.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
