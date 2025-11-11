import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabase';
import Head from 'next/head';
import dynamic from 'next/dynamic';

const Header = dynamic(() => import('../../src/components/Header').then(mod => ({ default: mod.Header })), { ssr: false });
const Footer = dynamic(() => import('../../src/components/Footer').then(mod => ({ default: mod.Footer })), { ssr: false });

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) loadPost();
  }, [slug]);

  async function loadPost() {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (!error && data) setPost(data);
    setLoading(false);
  }

  if (loading) return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex items-center justify-center py-24">Loading...</div>
      <Footer />
    </div>
  );

  if (!post) return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
        <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
        <a href="/blog" className="text-primary hover:underline">← Back to Blog</a>
      </div>
      <Footer />
    </div>
  );

  const seo = post.seo || {};

  return (
    <>
      <Head>
        <title>{seo.title || post.title}</title>
        <meta name="description" content={seo.description || post.meta_description || ''} />
        <meta property="og:title" content={seo.title || post.title} />
        <meta property="og:description" content={seo.description || post.meta_description || ''} />
        <meta property="og:image" content={seo.og_image || post.featured_image_url || ''} />
        <meta property="og:type" content="article" />
        {seo.canonical && <link rel="canonical" href={seo.canonical} />}
      </Head>

      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-4xl mx-auto px-6 py-16">
          <article>
            <header className="mb-12">
              <a href="/blog" className="text-primary hover:underline mb-6 inline-block">
                ← Back to Blog
              </a>
              <h1 className="text-5xl font-bold mb-6 text-foreground">{post.title}</h1>
              <time className="text-muted-foreground">
                {new Date(post.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </header>

            {post.featured_image_url && (
              <div className="mb-12 rounded-lg overflow-hidden">
                <img
                  src={post.featured_image_url}
                  alt={post.title}
                  className="w-full h-auto"
                />
              </div>
            )}

            <div
              className="prose prose-lg prose-gray max-w-none
                prose-headings:text-foreground
                prose-p:text-foreground/90
                prose-a:text-primary
                prose-strong:text-foreground
                prose-code:text-foreground
                prose-pre:bg-muted"
              dangerouslySetInnerHTML={{ __html: post.body }}
            />
          </article>
        </main>
        <Footer />
      </div>
    </>
  );
}
