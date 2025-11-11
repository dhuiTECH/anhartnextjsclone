'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  meta_title: string;
  meta_description: string;
  featured_image: string;
  content: string;
  excerpt: string;
  category: string;
  updated_at: string;
}

export default function AdminClient({ user }: { user: any }) {
  const [title, setTitle] = useState('');
  const [meta, setMeta] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('Insights');
  const [publishDate, setPublishDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'new' | 'edit'>('new');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<string>('');
  const [slug, setSlug] = useState('');
  const router = useRouter();

  const editor = useEditor({ 
    extensions: [StarterKit, Link, Image], 
    content: '',
    immediatelyRender: false
  });

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const { data } = await supabase
      .from('blog_posts')
      .select('id, title, slug, meta_title, meta_description, featured_image, content, excerpt, category, updated_at')
      .order('updated_at', { ascending: false });
    if (data) setPosts(data);
  };

  const loadPost = async (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (!post || !editor) return;
    
    setSelectedPostId(postId);
    setMode('edit');
    setTitle(post.title);
    setMeta(post.meta_description || '');
    setImage(post.featured_image || '');
    setCategory(post.category || 'Insights');
    setSlug(post.slug);
    
    // Convert ISO timestamp to YYYY-MM-DD format for date input
    const dateObj = new Date(post.updated_at);
    const dateString = dateObj.toISOString().split('T')[0];
    setPublishDate(dateString);
    
    editor.commands.setContent(post.content || '');
  };

  const switchToNewMode = () => {
    setMode('new');
    setSelectedPostId('');
    setTitle('');
    setMeta('');
    setImage('');
    setCategory('Insights');
    setSlug('');
    
    // Set default publish date to today
    const today = new Date().toISOString().split('T')[0];
    setPublishDate(today);
    
    if (editor) editor.commands.clearContent();
  };

  const publish = async () => {
    if (!editor) return;
    setLoading(true);
    const content = editor.getHTML();
    const excerpt = content.substring(0, 200).replace(/<[^>]*>/g, '');
    
    if (mode === 'edit' && selectedPostId) {
      const { error } = await supabase.from('blog_posts')
        .update({
          title,
          meta_title: title,
          meta_description: meta,
          featured_image: image,
          content,
          excerpt,
          category,
          updated_at: new Date().toISOString(),
        })
        .eq('id', selectedPostId);
      
      setLoading(false);
      if (error) alert('Error: ' + error.message);
      else {
        alert('Updated! Refreshing post list...');
        await loadPosts();
      }
    } else {
      const newSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const { error } = await supabase.from('blog_posts').insert({
        title,
        slug: newSlug,
        meta_title: title,
        meta_description: meta,
        featured_image: image,
        content,
        excerpt,
        category,
        author_name: user.email || 'Admin',
        is_published: true,
      });
      setLoading(false);
      if (error) alert('Error: ' + error.message);
      else {
        alert('Published! View: /blog/' + newSlug);
        switchToNewMode();
        await loadPosts();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white p-8 rounded-xl shadow mb-6">
          <h1 className="text-3xl font-bold text-indigo-700 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Logged in as: {user.email} (admin)</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow mb-6">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={switchToNewMode}
              className={`px-4 py-2 rounded font-medium ${mode === 'new' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              + New Post
            </button>
            <select
              value={selectedPostId}
              onChange={(e) => loadPost(e.target.value)}
              className="flex-1 p-3 border rounded"
            >
              <option value="">-- Select post to edit --</option>
              {posts.map(post => (
                <option key={post.id} value={post.id}>
                  {post.title} (updated: {new Date(post.updated_at).toLocaleDateString()})
                </option>
              ))}
            </select>
          </div>
          {mode === 'edit' && (
            <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded">
              <strong>Editing:</strong> {slug} <span className="text-gray-500">(slug cannot be changed)</span>
            </div>
          )}
        </div>

        <form onSubmit={(e) => { e.preventDefault(); publish(); }} className="bg-white p-8 rounded-xl shadow space-y-6">
          <input placeholder="Article Title" value={title} onChange={e=>setTitle(e.target.value)} className="w-full text-2xl p-3 border rounded" required />
          <input placeholder="Meta Description (160 chars)" value={meta} onChange={e=>setMeta(e.target.value)} maxLength={160} className="w-full p-3 border rounded" />
          <input placeholder="Featured Image URL" value={image} onChange={e=>setImage(e.target.value)} className="w-full p-3 border rounded" />
          
          <div className="grid grid-cols-2 gap-4">
            <select value={category} onChange={e=>setCategory(e.target.value)} className="w-full p-3 border rounded">
            <option value="Insights">Insights</option>
            <option value="News">News</option>
            <option value="Updates">Updates</option>
            <option value="Community">Community</option>
            <option value="Housing Resources">Housing Resources</option>
            <option value="Community Impact">Community Impact</option>
            <option value="Housing Innovation">Housing Innovation</option>
            </select>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Publish Date</label>
              <input 
                type="date" 
                value={publishDate} 
                onChange={e=>setPublishDate(e.target.value)} 
                className="w-full p-3 border rounded" 
                required 
              />
            </div>
          </div>
          
          <div className="border rounded-lg overflow-hidden">
            {editor && (
              <div className="bg-gray-100 border-b p-2 flex flex-wrap gap-1">
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                  className={`px-3 py-1 rounded text-sm font-semibold ${editor.isActive('heading', { level: 1 }) ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
                >
                  H1
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                  className={`px-3 py-1 rounded text-sm font-semibold ${editor.isActive('heading', { level: 2 }) ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
                >
                  H2
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                  className={`px-3 py-1 rounded text-sm font-semibold ${editor.isActive('heading', { level: 3 }) ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
                >
                  H3
                </button>
                <div className="w-px bg-gray-300 mx-1"></div>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  className={`px-3 py-1 rounded text-sm font-bold ${editor.isActive('bold') ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
                >
                  B
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className={`px-3 py-1 rounded text-sm italic ${editor.isActive('italic') ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
                >
                  I
                </button>
                <div className="w-px bg-gray-300 mx-1"></div>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleBulletList().run()}
                  className={`px-3 py-1 rounded text-sm ${editor.isActive('bulletList') ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
                >
                  • List
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleOrderedList().run()}
                  className={`px-3 py-1 rounded text-sm ${editor.isActive('orderedList') ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
                >
                  1. List
                </button>
                <div className="w-px bg-gray-300 mx-1"></div>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().setParagraph().run()}
                  className={`px-3 py-1 rounded text-sm ${editor.isActive('paragraph') ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
                >
                  P
                </button>
              </div>
            )}
            <div className="p-4 min-h-96 bg-white prose max-w-none">
              <EditorContent editor={editor} />
            </div>
          </div>
          
          <button type="submit" disabled={loading} className="bg-green-600 text-white px-8 py-3 rounded font-bold">
            {loading ? (mode === 'edit' ? 'Updating...' : 'Publishing...') : (mode === 'edit' ? 'Update Article' : 'Publish Article')}
          </button>
        </form>
      </div>
    </div>
  );
}
