import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/router';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const [title, setTitle] = useState('');
  const [meta, setMeta] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const editor = useEditor({
    extensions: [StarterKit, Link, Image],
    content: '<p>Start writing your SEO-optimized article here...</p>',
  });

  useEffect(() => { checkAuth(); }, []);

  async function checkAuth() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return router.push('/admin-login');

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('role, email')
      .eq('id', user.id)
      .single();

    if (error || profile?.role !== 'admin') {
      console.error('Admin check failed:', error);
      alert('Access denied: Admin role required in profiles table.');
      return supabase.auth.signOut().then(() => router.push('/'));
    }

    setAuthUser(user);
    setUser(profile);
  }

  const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const publish = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }
    
    const body = editor.getHTML();
    const textContent = editor.getText().trim();
    
    if (!textContent || textContent.length < 10) {
      alert('Please add some content to your post (at least 10 characters)');
      return;
    }
    
    setLoading(true);
    const slug = slugify(title);

    const { error } = await supabase.from('posts').insert({
      title: title.trim(),
      slug,
      meta_description: meta.trim() || null,
      featured_image_url: image.trim() || null,
      body,
      published: true,
      author_id: authUser.id,
      seo: {
        title: title.trim(),
        description: meta.trim() || title.trim(),
        og_image: image.trim() || 'https://anhart.ca/default-og.jpg',
        canonical: `https://anhart.ca/blog/${slug}`
      },
      created_at: new Date().toISOString(),
    });

    setLoading(false);
    if (error) alert('Publish error: ' + error.message);
    else {
      alert(`Published! View at: /blog/${slug}`);
      setTitle(''); setMeta(''); setImage(''); editor.commands.clearContent();
    }
  };

  if (!user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h1 className="text-4xl font-bold text-indigo-700 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Logged in as: {user.email} (Admin Role Verified)</p>
        </div>

        <form onSubmit={publish} className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          <input
            type="text"
            placeholder="SEO Title (H1 + Page Title, 50-60 chars)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-2xl font-semibold p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="text"
            placeholder="Meta Description (150-160 chars for SEO)"
            value={meta}
            onChange={(e) => setMeta(e.target.value)}
            maxLength="160"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
          />
          <input
            type="url"
            placeholder="Featured Image URL (1200x630px for OG Images)"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500"
          />

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 min-h-96 bg-gray-50">
            <EditorContent editor={editor} className="prose prose-lg max-w-none p-4" />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => supabase.auth.signOut().then(() => router.push('/'))}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Logout
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition"
            >
              {loading ? 'Publishing...' : 'Publish SEO Article'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
