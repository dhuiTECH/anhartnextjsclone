'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { createLowlight } from 'lowlight';
import html from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';

const lowlight = createLowlight();
lowlight.register('html', html);
lowlight.register('css', css);
lowlight.register('javascript', javascript);
lowlight.register('typescript', typescript);

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
  meta_title: string;
  meta_description: string;
  featured_image: string;
  content: string;
  excerpt: string;
  category: string;
  publish_date: string;
  updated_at: string;
}

export default function AdminClient({ user }: { user: any }) {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
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
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Link,
      Image,
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: 'html',
      }),
    ], 
    content: '',
    immediatelyRender: false
  });

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const { data } = await supabase
      .from('blog_posts')
      .select('id, title, slug, subtitle, meta_title, meta_description, featured_image, content, excerpt, category, publish_date, updated_at')
      .order('updated_at', { ascending: false });
    if (data) setPosts(data);
  };

  const loadPost = async (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (!post || !editor) return;
    
    setSelectedPostId(postId);
    setMode('edit');
    setTitle(post.title);
    setSubtitle(post.subtitle || '');
    setMeta(post.meta_description || '');
    setImage(post.featured_image || '');
    setCategory(post.category || 'Insights');
    setSlug(post.slug);
    
    // Use publish_date if available, otherwise use updated_at
    // Always format to YYYY-MM-DD for date input compatibility
    if (post.publish_date) {
      const dateObj = new Date(post.publish_date);
      const dateString = dateObj.toISOString().split('T')[0];
      setPublishDate(dateString);
    } else {
      const dateObj = new Date(post.updated_at);
      const dateString = dateObj.toISOString().split('T')[0];
      setPublishDate(dateString);
    }
    
    editor.commands.setContent(post.content || '');
  };

  const switchToNewMode = () => {
    setMode('new');
    setSelectedPostId('');
    setTitle('');
    setSubtitle('');
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
          subtitle,
          meta_title: title,
          meta_description: meta,
          featured_image: image,
          content,
          excerpt,
          category,
          publish_date: publishDate,
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
        subtitle,
        slug: newSlug,
        meta_title: title,
        meta_description: meta,
        featured_image: image,
        content,
        excerpt,
        category,
        publish_date: publishDate,
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
          <input placeholder="Subtitle / Subhead (optional)" value={subtitle} onChange={e=>setSubtitle(e.target.value)} className="w-full text-lg p-3 border rounded text-gray-600" />
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
                <div className="w-px bg-gray-300 mx-1"></div>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                  className={`px-3 py-1 rounded text-sm font-mono ${editor.isActive('codeBlock') ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
                >
                  &lt;/&gt; Code
                </button>
              </div>
            )}
            <div className="p-4 min-h-96 bg-white prose max-w-none">
              <style jsx global>{`
                .ProseMirror {
                  outline: none;
                  min-height: 24rem;
                }
                .ProseMirror h1 {
                  font-size: 2em;
                  font-weight: 700;
                  margin-top: 1em;
                  margin-bottom: 0.5em;
                  line-height: 1.2;
                }
                .ProseMirror h2 {
                  font-size: 1.5em;
                  font-weight: 600;
                  margin-top: 1em;
                  margin-bottom: 0.5em;
                  line-height: 1.3;
                }
                .ProseMirror h3 {
                  font-size: 1.25em;
                  font-weight: 600;
                  margin-top: 0.8em;
                  margin-bottom: 0.4em;
                  line-height: 1.4;
                }
                .ProseMirror p {
                  margin-bottom: 1em;
                  line-height: 1.6;
                }
                .ProseMirror ul, .ProseMirror ol {
                  padding-left: 1.5em;
                  margin-bottom: 1em;
                }
                .ProseMirror ul li {
                  list-style-type: disc;
                  margin-bottom: 0.5em;
                }
                .ProseMirror ol li {
                  list-style-type: decimal;
                  margin-bottom: 0.5em;
                }
                .ProseMirror strong {
                  font-weight: 700;
                }
                .ProseMirror em {
                  font-style: italic;
                }
                .ProseMirror a {
                  color: #4f46e5;
                  text-decoration: underline;
                }
                .ProseMirror pre {
                  background: #282c34;
                  color: #abb2bf;
                  font-family: 'JetBrainsMono', 'Fira Code', 'Courier New', monospace;
                  padding: 1em;
                  border-radius: 0.5em;
                  overflow-x: auto;
                  margin: 1em 0;
                }
                .ProseMirror pre code {
                  background: none;
                  color: inherit;
                  font-size: 0.9em;
                  padding: 0;
                }
                .ProseMirror code {
                  background: #f3f4f6;
                  color: #d63384;
                  padding: 0.2em 0.4em;
                  border-radius: 0.25em;
                  font-family: 'JetBrainsMono', 'Fira Code', 'Courier New', monospace;
                  font-size: 0.9em;
                }
              `}</style>
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
