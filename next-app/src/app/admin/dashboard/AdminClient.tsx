'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';

export default function AdminClient({ user }: { user: any }) {
  const [title, setTitle] = useState('');
  const [meta, setMeta] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const editor = useEditor({ extensions: [StarterKit, Link, Image], content: '' });

  const publish = async () => {
    setLoading(true);
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const { error } = await supabase.from('posts').insert({
      title, slug, meta_description: meta, featured_image_url: image,
      body: editor?.getHTML(), published: true, author_id: user.id,
      created_at: new Date().toISOString()
    });
    setLoading(false);
    if (error) alert('Error: ' + error.message);
    else {
      alert('Published! View: /blog/' + slug);
      setTitle(''); setMeta(''); setImage(''); editor?.commands.clearContent();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white p-8 rounded-xl shadow mb-6">
          <h1 className="text-3xl font-bold text-indigo-700 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Logged in as: {user.email} (admin)</p>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); publish(); }} className="bg-white p-8 rounded-xl shadow space-y-6">
          <input placeholder="SEO Title" value={title} onChange={e=>setTitle(e.target.value)} className="w-full text-2xl p-3 border rounded" required />
          <input placeholder="Meta Description (160 chars)" value={meta} onChange={e=>setMeta(e.target.value)} maxLength={160} className="w-full p-3 border rounded" />
          <input placeholder="Featured Image URL" value={image} onChange={e=>setImage(e.target.value)} className="w-full p-3 border rounded" />
          <div className="border-2 border-dashed p-4 min-h-96 bg-gray-50"><EditorContent editor={editor} /></div>
          <button type="submit" disabled={loading} className="bg-green-600 text-white px-8 py-3 rounded font-bold">
            {loading ? 'Publishing...' : 'Publish Article'}
          </button>
        </form>
      </div>
    </div>
  );
}
