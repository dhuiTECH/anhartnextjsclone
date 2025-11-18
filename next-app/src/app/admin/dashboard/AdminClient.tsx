/**
 * AdminClient.tsx
 * 
 * Purpose: Admin dashboard component for creating and editing blog posts.
 * This component provides a rich text editor interface for managing blog content,
 * including image uploads, code snippets, and SEO metadata.
 * 
 * Features:
 * - Create new blog posts
 * - Edit existing blog posts
 * - Upload images to Supabase storage
 * - Insert images into blog content
 * - Insert code snippets with syntax highlighting
 * - Manage SEO metadata (title, description, keywords)
 * - Calculate reading time automatically
 * 
 * Security Note:
 * - CAPTCHA/Turnstile is intentionally DISABLED for admin operations
 * - Admin access is already protected by authentication middleware
 * - No CAPTCHA validation is required for publishing/updating blog posts
 */

"use client";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import lowlight from "../../lowlight-config";

/**
 * BlogPost Interface
 * 
 * Purpose: Defines the structure of a blog post object retrieved from Supabase.
 * This interface ensures type safety when working with blog post data.
 */
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

/**
 * AdminClient Component
 * 
 * Purpose: Main admin dashboard component for blog post management.
 * Handles both creating new posts and editing existing ones.
 * 
 * @param user - The authenticated user object containing user information
 */
export default function AdminClient({ user }: { user: any }) {
  // ============================================================================
  // STATE MANAGEMENT - Form Fields
  // ============================================================================
  // Purpose: Store form input values for blog post metadata
  
  const [title, setTitle] = useState(""); // Blog post title (required)
  const [subtitle, setSubtitle] = useState(""); // Optional subtitle for the post
  const [excerpt, setExcerpt] = useState(""); // Brief summary (max 300 chars, shown in hero)
  const [meta, setMeta] = useState(""); // Meta description for SEO (max 160 chars)
  const [image, setImage] = useState(""); // Featured image URL (displayed at top of post)
  const [category, setCategory] = useState("Insights"); // Post category/classification
  const [publishDate, setPublishDate] = useState(""); // Publication date (YYYY-MM-DD format)
  
  // ============================================================================
  // STATE MANAGEMENT - UI State
  // ============================================================================
  // Purpose: Control component behavior and UI interactions
  
  const [loading, setLoading] = useState(false); // Loading state during publish/update operations
  const [mode, setMode] = useState<"new" | "edit">("new"); // Current mode: creating new post or editing existing
  const [posts, setPosts] = useState<BlogPost[]>([]); // List of all blog posts for dropdown selection
  const [selectedPostId, setSelectedPostId] = useState<string>(""); // ID of currently selected post for editing
  const [slug, setSlug] = useState(""); // URL-friendly slug (auto-generated from title, read-only in edit mode)
  
  // ============================================================================
  // STATE MANAGEMENT - Dialog States
  // ============================================================================
  // Purpose: Control visibility and content of modal dialogs
  
  const [showCodeDialog, setShowCodeDialog] = useState(false); // Controls code insertion dialog visibility
  const [codeInput, setCodeInput] = useState(""); // Code content to be inserted
  const [codeLanguage, setCodeLanguage] = useState("html"); // Programming language for syntax highlighting
  const [showImageDialog, setShowImageDialog] = useState(false); // Controls image URL insertion dialog visibility
  const [imageUrl, setImageUrl] = useState(""); // Image URL for insertion via dialog
  const [imageAlt, setImageAlt] = useState(""); // Alt text for accessibility when inserting image by URL
  
  // ============================================================================
  // STATE MANAGEMENT - Upload States
  // ============================================================================
  // Purpose: Track image upload progress and status
  
  const [uploading, setUploading] = useState(false); // Upload state for featured image
  const [uploadingContentImage, setUploadingContentImage] = useState(false); // Upload state for content images
  const [isMobile, setIsMobile] = useState(false); // Mobile device detection
  
  // ============================================================================
  // REFS
  // ============================================================================
  // Purpose: Direct references to DOM elements for file input triggers
  
  const fileInputRef = useRef<HTMLInputElement>(null); // Reference to featured image file input
  const contentImageInputRef = useRef<HTMLInputElement>(null); // Reference to content image file input
  const router = useRouter();

  // ============================================================================
  // TIPTAP EDITOR CONFIGURATION
  // ============================================================================
  // Purpose: Initialize the rich text editor with extensions for formatting,
  // links, images, and code blocks with syntax highlighting.
  // 
  // Extensions:
  // - StarterKit: Basic formatting (headings, bold, italic, lists, etc.)
  // - Link: Add hyperlinks to content
  // - Image: Insert and display images in content
  // - CodeBlockLowlight: Syntax-highlighted code blocks (replaces default codeBlock)
  
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false, // Disable default code block to use CodeBlockLowlight instead
      }),
      Link,
      Image,
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: "html",
      }),
    ],
    content: "", // Initial editor content (empty for new posts)
    immediatelyRender: false, // Defer rendering until editor is ready
    // Mobile-friendly editor configuration
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none',
        // Ensure mobile browsers don't limit content
        style: 'min-height: 24rem; overflow: visible; max-height: none; height: auto;',
      },
    },
  });

  // ============================================================================
  // EFFECT HOOKS
  // ============================================================================
  // Purpose: Load blog posts when component mounts and detect mobile devices
  
  useEffect(() => {
    loadPosts();
    
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // ============================================================================
  // DATA FETCHING FUNCTIONS
  // ============================================================================
  
  /**
   * loadPosts
   * 
   * Purpose: Fetch all blog posts from Supabase database.
   * Used to populate the post selection dropdown for editing.
   * Posts are ordered by most recently updated first.
   */
  const loadPosts = async () => {
    const { data } = await supabase
      .from("blog_posts")
      .select(
        "id, title, slug, subtitle, meta_title, meta_description, featured_image, content, excerpt, category, publish_date, updated_at",
      )
      .order("updated_at", { ascending: false });
    if (data) setPosts(data);
  };

  /**
   * loadPost
   * 
   * Purpose: Load a specific blog post for editing.
   * Populates all form fields and editor content with the selected post's data.
   * 
   * @param postId - The unique identifier of the post to load
   */
  const loadPost = async (postId: string) => {
    const post = posts.find((p) => p.id === postId);
    if (!post || !editor) return;

    // Log content length for debugging mobile issues
    console.log("Loading post content - Length:", post.content?.length || 0);
    console.log("Is mobile device:", isMobile);

    // Set UI mode to edit
    setSelectedPostId(postId);
    setMode("edit");
    
    // Populate form fields with post data
    setTitle(post.title);
    setSubtitle(post.subtitle || "");
    setExcerpt(post.excerpt || "");
    setMeta(post.meta_description || "");
    setImage(post.featured_image || "");
    setCategory(post.category || "Insights");
    setSlug(post.slug);

    // Format date for HTML date input (YYYY-MM-DD format required)
    // Use publish_date if available, otherwise fallback to updated_at
    if (post.publish_date) {
      const dateObj = new Date(post.publish_date);
      const dateString = dateObj.toISOString().split("T")[0];
      setPublishDate(dateString);
    } else {
      const dateObj = new Date(post.updated_at);
      const dateString = dateObj.toISOString().split("T")[0];
      setPublishDate(dateString);
    }

    // Load post content into the rich text editor with error handling
    // Mobile browsers may have issues with very large content, so we add retry logic
    try {
      // Ensure editor is ready before setting content
      if (!editor.isDestroyed) {
        // Clear editor first to ensure clean state
        editor.commands.clearContent();
        
        // Small delay to ensure editor is ready (especially important on mobile)
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Set content with the full post content
        editor.commands.setContent(post.content || "");
        
        // Verify content was loaded correctly
        const loadedContent = editor.getHTML();
        const loadedLength = loadedContent.length;
        const originalLength = post.content?.length || 0;
        
        console.log("Content loaded - Original length:", originalLength, "Loaded length:", loadedLength);
        
        // If content appears truncated on mobile, log a warning
        if (isMobile && loadedLength < originalLength * 0.9) {
          console.warn("⚠️ Content may be truncated on mobile. Original:", originalLength, "Loaded:", loadedLength);
        }
      }
    } catch (error) {
      console.error("Error loading content into editor:", error);
      // Retry once after a longer delay
      setTimeout(() => {
        try {
          if (!editor.isDestroyed) {
            editor.commands.setContent(post.content || "");
          }
        } catch (retryError) {
          console.error("Retry failed to load content:", retryError);
        }
      }, 500);
    }
  };

  // ============================================================================
  // MODE MANAGEMENT FUNCTIONS
  // ============================================================================
  
  /**
   * switchToNewMode
   * 
   * Purpose: Reset the form to create a new blog post.
   * Clears all form fields, resets editor content, and sets default values.
   * Called when user clicks "New Post" button or after successfully publishing.
   */
  const switchToNewMode = () => {
    setMode("new");
    setSelectedPostId("");
    
    // Clear all form fields
    setTitle("");
    setSubtitle("");
    setExcerpt("");
    setMeta("");
    setImage("");
    setCategory("Insights");
    setSlug("");

    // Set default publish date to today's date
    const today = new Date().toISOString().split("T")[0];
    setPublishDate(today);

    // Clear editor content
    if (editor) editor.commands.clearContent();
  };

  // ============================================================================
  // IMAGE UPLOAD FUNCTIONS - Hero Banner / Featured Image
  // ============================================================================
  // NOTE: This is SEPARATE from content image uploads below
  // This handles the hero banner/featured image at the top of the blog post
  
  /**
   * handleImageUpload
   * 
   * Purpose: Upload a hero banner/featured image file to Supabase Storage bucket.
   * This is the main image displayed at the top of the blog post (separate from content images).
   * Generates a unique filename to prevent conflicts and returns the public URL.
   * 
   * @param file - The hero banner image file to upload
   * @returns The public URL of the uploaded image, or null if upload fails
   */
  const handleImageUpload = async (file: File) => {
    if (!file) return null;

    setUploading(true);
    try {
      // Generate unique filename: timestamp + random string + original extension
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload to Supabase Storage bucket "blog-images"
      const { error: uploadError } = await supabase.storage
        .from("blog-images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL for the uploaded image
      const { data } = supabase.storage
        .from("blog-images")
        .getPublicUrl(filePath);

      alert("Image uploaded successfully!");
      return data.publicUrl;
    } catch (error: any) {
      alert("Error uploading image: " + (error.message || "Failed to upload image"));
      return null;
    } finally {
      setUploading(false);
    }
  };

  /**
   * handleFileSelect
   * 
   * Purpose: Handle file selection from the hero banner/featured image file input.
   * Triggers upload and updates the featured image URL state.
   * This is separate from content image uploads.
   * 
   * @param e - File input change event
   */
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = await handleImageUpload(file);
    if (url) {
      setImage(url); // Update featured image URL
    }
  };

  // ============================================================================
  // IMAGE UPLOAD FUNCTIONS - Content Images (Within Article Body)
  // ============================================================================
  // NOTE: This is SEPARATE from the hero banner upload above
  // This handles images that go inside the blog post content/body
  
  /**
   * handleContentImageUpload
   * 
   * Purpose: Upload an image file and insert it directly into the blog content
   * at the current cursor position in the editor.
   * This is separate from the hero banner - these images go within the article body.
   * 
   * @param file - The content image file to upload and insert
   * @returns The public URL of the uploaded image, or null if upload fails
   */
  const handleContentImageUpload = async (file: File) => {
    if (!file || !editor) return null;

    setUploadingContentImage(true);
    try {
      // Generate unique filename to prevent conflicts
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload to Supabase Storage bucket "blog-images"
      const { error: uploadError } = await supabase.storage
        .from("blog-images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL for the uploaded image
      const { data } = supabase.storage
        .from("blog-images")
        .getPublicUrl(filePath);

      // Insert image into editor at current cursor position
      editor
        .chain()
        .focus()
        .setImage({ src: data.publicUrl, alt: file.name })
        .run();

      return data.publicUrl;
    } catch (error: any) {
      alert("Error uploading image: " + (error.message || "Failed to upload image"));
      return null;
    } finally {
      setUploadingContentImage(false);
    }
  };

  /**
   * handleContentImageSelect
   * 
   * Purpose: Handle file selection from the content image file input.
   * Triggers upload and insertion into the editor, then resets the input for re-selection.
   * This is separate from the hero banner upload - this is for images within the article.
   * 
   * @param e - File input change event
   */
  const handleContentImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    await handleContentImageUpload(file);
    // Reset input value so the same file can be selected again if needed
    if (contentImageInputRef.current) {
      contentImageInputRef.current.value = "";
    }
  };

  // ============================================================================
  // PUBLISH/UPDATE FUNCTIONS
  // ============================================================================
  
  /**
   * publish
   * 
   * Purpose: Save or update a blog post in the Supabase database.
   * Handles both creating new posts and updating existing ones.
   * Automatically calculates reading time and extracts SEO keywords.
   * 
   * Process:
   * 1. Get HTML content from editor
   * 2. Generate excerpt (use form input or auto-generate from content)
   * 3. Calculate reading time based on word count
   * 4. Extract keywords from title, meta description, and category
   * 5. Either update existing post or insert new post
   * 
   * Security: No CAPTCHA/Turnstile validation required - admin access is
   * already protected by authentication middleware at the route level.
   */
  const publish = async () => {
    if (!editor) return;
    setLoading(true);
    
    // NOTE: CAPTCHA/Turnstile validation is intentionally disabled for admin operations
    // Admin access is protected by authentication, so no additional CAPTCHA is needed
    
    // Get HTML content from the rich text editor
    const content = editor.getHTML();

    // Generate excerpt: use form input if provided, otherwise auto-generate from content
    // Remove HTML tags and limit to 200 characters
    const finalExcerpt =
      excerpt.trim() || content.substring(0, 200).replace(/<[^>]*>/g, "");

    // Calculate reading time (assumes average reading speed of 200 words per minute)
    const wordCount = editor.getText().split(/\s+/).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    // Extract SEO keywords from title, meta description, and category
    // Filter words longer than 4 characters and limit to 10 keywords
    const keywords = [
      ...title
        .toLowerCase()
        .split(" ")
        .filter((w) => w.length > 4),
      ...meta
        .toLowerCase()
        .split(" ")
        .filter((w) => w.length > 4),
      category.toLowerCase(),
    ].slice(0, 10); // Limit to 10 keywords

    // ========================================================================
    // UPDATE EXISTING POST
    // ========================================================================
    if (mode === "edit" && selectedPostId) {
      const { error } = await supabase
        .from("blog_posts")
        .update({
          title,
          subtitle,
          meta_title: title,
          meta_description: meta,
          featured_image: image,
          content,
          excerpt: finalExcerpt,
          category,
          publish_date: publishDate,
          updated_at: new Date().toISOString(), // Update timestamp
          reading_time: readingTime,
          keywords: keywords,
        })
        .eq("id", selectedPostId);

      setLoading(false);
      if (error) alert("Error: " + error.message);
      else {
        alert("Updated! Refreshing post list...");
        await loadPosts(); // Refresh the post list
      }
    } 
    // ========================================================================
    // CREATE NEW POST
    // ========================================================================
    else {
      // Generate URL-friendly slug from title
      // Convert to lowercase, replace non-alphanumeric with hyphens, remove leading/trailing hyphens
      const newSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
        
      const { error } = await supabase.from("blog_posts").insert({
        title,
        subtitle,
        slug: newSlug,
        meta_title: title,
        meta_description: meta,
        featured_image: image,
        content,
        excerpt: finalExcerpt,
        category,
        publish_date: publishDate,
        author_name: user.email || "Admin",
        is_published: true, // Automatically publish new posts
        reading_time: readingTime,
        keywords: keywords,
      });
      
      setLoading(false);
      if (error) alert("Error: " + error.message);
      else {
        alert("Published! View: /blog/" + newSlug);
        switchToNewMode(); // Reset form for next post
        await loadPosts(); // Refresh the post list
      }
    }
  };

  // ============================================================================
  // CONTENT INSERTION FUNCTIONS
  // ============================================================================
  
  /**
   * insertCode
   * 
   * Purpose: Insert a code snippet into the editor at the current cursor position.
   * Uses syntax highlighting based on the selected language.
   * Called when user submits the code insertion dialog.
   */
  const insertCode = () => {
    if (!editor || !codeInput.trim()) return;

    // Insert the code as a syntax-highlighted code block
    editor
      .chain()
      .focus()
      .insertContent({
        type: "codeBlock",
        attrs: { language: codeLanguage }, // Language for syntax highlighting
        content: [
          {
            type: "text",
            text: codeInput,
          },
        ],
      })
      .run();

    // Reset dialog state and close
    setCodeInput("");
    setShowCodeDialog(false);
  };

  /**
   * insertImageByUrl
   * 
   * Purpose: Insert an image into the editor using a URL.
   * Allows inserting images from external sources or Supabase storage URLs
   * without uploading a new file.
   * Called when user submits the image URL dialog.
   */
  const insertImageByUrl = () => {
    if (!editor || !imageUrl.trim()) return;

    // Insert the image at the current cursor position
    editor
      .chain()
      .focus()
      .setImage({ 
        src: imageUrl.trim(), 
        alt: imageAlt.trim() || "Image" // Use provided alt text or default
      })
      .run();

    // Reset dialog state and close
    setImageUrl("");
    setImageAlt("");
    setShowImageDialog(false);
  };

  // ============================================================================
  // RENDER
  // ============================================================================
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        {/* ==================================================================== */}
        {/* HEADER SECTION */}
        {/* Purpose: Display admin dashboard title and current user info */}
        {/* ==================================================================== */}
        <div className="bg-white p-8 rounded-xl shadow mb-6">
          <h1 className="text-3xl font-bold text-indigo-700 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Logged in as: {user.email} (admin)</p>
        </div>

        {/* ==================================================================== */}
        {/* SEO GUIDELINES INFO BOX */}
        {/* Purpose: Display helpful SEO best practices for content creators */}
        {/* ==================================================================== */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-blue-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700 font-semibold mb-1">
                SEO Best Practices for Blog Posts
              </p>
              <ul className="text-xs text-blue-600 space-y-1">
                <li>
                  ✓ Use <strong>H2 headings</strong> to organize main sections
                  (not H1 - the title is already H1)
                </li>
                <li>
                  ✓ Use <strong>H3 headings</strong> for subsections within H2
                  sections
                </li>
                <li>
                  ✓ Include relevant <strong>keywords naturally</strong> in your
                  headings and content
                </li>
                <li>
                  ✓ Write descriptive meta descriptions (150-160 characters)
                  with target keywords
                </li>
                <li>✓ Add meaningful subtitle to complement the main title</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* POST SELECTION SECTION */}
        {/* Purpose: Allow switching between creating new posts and editing existing ones */}
        {/* ==================================================================== */}
        <div className="bg-white p-6 rounded-xl shadow mb-6">
          <div className="flex items-center gap-4 mb-4">
            {/* New Post Button - Resets form to create mode */}
            <button
              onClick={switchToNewMode}
              className={`px-4 py-2 rounded font-medium ${mode === "new" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"}`}
            >
              + New Post
            </button>
            {/* Post Selection Dropdown - Loads existing post for editing */}
            <select
              value={selectedPostId}
              onChange={(e) => loadPost(e.target.value)}
              className="flex-1 p-3 border rounded"
            >
              <option value="">-- Select post to edit --</option>
              {posts.map((post) => (
                <option key={post.id} value={post.id}>
                  {post.title} (updated:{" "}
                  {new Date(post.updated_at).toLocaleDateString()})
                </option>
              ))}
            </select>
          </div>
          {/* Edit Mode Indicator - Shows current post slug (read-only) */}
          {mode === "edit" && (
            <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded">
              <strong>Editing:</strong> {slug}{" "}
              <span className="text-gray-500">(slug cannot be changed)</span>
            </div>
          )}
        </div>

        {/* ==================================================================== */}
        {/* BLOG POST FORM */}
        {/* Purpose: Main form for entering blog post metadata and content */}
        {/* ==================================================================== */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            publish();
          }}
          className="bg-white p-8 rounded-xl shadow space-y-6"
        >
          {/* Title Input - Main blog post title (required) */}
          <input
            placeholder="Article Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-2xl p-3 border rounded"
            required
          />
          
          {/* Subtitle Input - Optional secondary title */}
          <input
            placeholder="Subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full text-lg p-3 border rounded text-gray-600"
          />
          
          {/* Excerpt Input - Brief summary with character counter */}
          {/* Purpose: Short description shown in blog listing/hero section */}
          <div>
            <input
              placeholder="Excerpt (Brief summary shown in hero section - 300 characters max)"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              maxLength={300}
              className="w-full p-3 border rounded"
            />
            {/* Character Counter with Visual Progress Bar */}
            {/* Purpose: Help users stay within recommended excerpt length */}
            <div className="mt-2 space-y-1">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    (excerpt?.length || 0) >= 250
                      ? "bg-yellow-500" // Warning: approaching limit
                      : (excerpt?.length || 0) >= 200
                        ? "bg-blue-500" // Good length
                        : "bg-green-500" // Below recommended
                  }`}
                  style={{
                    width: `${Math.min(
                      ((excerpt?.length || 0) / 300) * 100,
                      100,
                    )}%`,
                  }}
                />
              </div>
              <p className="text-xs text-gray-500">
                {excerpt?.length || 0}/300 characters - Displays in hero section
              </p>
            </div>
          </div>
          
          {/* Meta Description Input - SEO meta tag content */}
          {/* Purpose: Description shown in search engine results (160 chars recommended) */}
          <input
            placeholder="Meta Description (160 - 200 chars)"
            value={meta}
            onChange={(e) => setMeta(e.target.value)}
            maxLength={160}
            className="w-full p-3 border rounded"
          />
          {/* ==================================================================== */}
          {/* HERO BANNER / FEATURED IMAGE UPLOAD */}
          {/* Purpose: Upload the main hero banner image displayed at the top of the blog post */}
          {/* This is separate from content images - it's the featured/cover image */}
          {/* ==================================================================== */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hero Banner / Featured Image *
            </label>
            <div className="flex gap-2">
              {/* URL Input - Can paste image URL directly */}
              <input
                placeholder="Hero banner image URL or upload a file"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="flex-1 p-3 border rounded"
              />
              {/* Hidden File Input - For hero banner upload only */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              {/* Upload Button - Uploads hero banner to Supabase */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {uploading ? "Uploading..." : "Upload Hero"}
              </button>
            </div>
            {/* Hero Banner Preview - Shows selected/uploaded featured image */}
            {image && (
              <div className="mt-2 relative w-full h-48 border rounded-md overflow-hidden">
                <img
                  src={image}
                  alt="Hero banner preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error("Failed to load image:", image);
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
              </div>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Upload hero banner image or paste a URL. Recommended size: 1200x630px
            </p>
          </div>

          {/* Category and Publish Date Section */}
          {/* Purpose: Organize posts by category and set publication date */}
          <div className="grid grid-cols-2 gap-4">
            {/* Category Dropdown - Classifies the blog post */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 border rounded"
            >
              <option value="Insights">Insights</option>
              <option value="News">News</option>
              <option value="Updates">Updates</option>
              <option value="Community">Community</option>
              <option value="Housing Resources">Housing Resources</option>
              <option value="Community Impact">Community Impact</option>
              <option value="Housing Innovation">Housing Innovation</option>
            </select>

            {/* Publish Date Input - Sets when the post was/will be published */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Publish Date
              </label>
              <input
                type="date"
                value={publishDate}
                onChange={(e) => setPublishDate(e.target.value)}
                className="w-full p-3 border rounded"
                required
              />
            </div>
          </div>

          {/* ==================================================================== */}
          {/* RICH TEXT EDITOR SECTION */}
          {/* Purpose: Main content editor with formatting toolbar */}
          {/* ==================================================================== */}
          <div className="border rounded-lg overflow-hidden">
            {/* Editor Toolbar - Formatting buttons and content insertion tools */}
            {editor && (
              <div className="bg-gray-100 border-b p-2 flex flex-wrap gap-1">
                {/* Heading Buttons - H1, H2, H3 for document structure */}
                <button
                  type="button"
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                  }
                  className={`px-3 py-1 rounded text-sm font-semibold ${editor.isActive("heading", { level: 1 }) ? "bg-indigo-600 text-white" : "bg-white text-gray-700 hover:bg-gray-200"}`}
                >
                  H1
                </button>
                <button
                  type="button"
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                  }
                  className={`px-3 py-1 rounded text-sm font-semibold ${editor.isActive("heading", { level: 2 }) ? "bg-indigo-600 text-white" : "bg-white text-gray-700 hover:bg-gray-200"}`}
                >
                  H2
                </button>
                <button
                  type="button"
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                  }
                  className={`px-3 py-1 rounded text-sm font-semibold ${editor.isActive("heading", { level: 3 }) ? "bg-indigo-600 text-white" : "bg-white text-gray-700 hover:bg-gray-200"}`}
                >
                  H3
                </button>
                <div className="w-px bg-gray-300 mx-1"></div>
                
                {/* Text Formatting - Bold and Italic */}
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  className={`px-3 py-1 rounded text-sm font-bold ${editor.isActive("bold") ? "bg-indigo-600 text-white" : "bg-white text-gray-700 hover:bg-gray-200"}`}
                >
                  B
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className={`px-3 py-1 rounded text-sm italic ${editor.isActive("italic") ? "bg-indigo-600 text-white" : "bg-white text-gray-700 hover:bg-gray-200"}`}
                >
                  I
                </button>
                <div className="w-px bg-gray-300 mx-1"></div>
                
                {/* List Buttons - Bullet and numbered lists */}
                <button
                  type="button"
                  onClick={() =>
                    editor.chain().focus().toggleBulletList().run()
                  }
                  className={`px-3 py-1 rounded text-sm ${editor.isActive("bulletList") ? "bg-indigo-600 text-white" : "bg-white text-gray-700 hover:bg-gray-200"}`}
                >
                  • List
                </button>
                <button
                  type="button"
                  onClick={() =>
                    editor.chain().focus().toggleOrderedList().run()
                  }
                  className={`px-3 py-1 rounded text-sm ${editor.isActive("orderedList") ? "bg-indigo-600 text-white" : "bg-white text-gray-700 hover:bg-gray-200"}`}
                >
                  1. List
                </button>
                <div className="w-px bg-gray-300 mx-1"></div>
                
                {/* Paragraph Button - Reset to normal paragraph */}
                <button
                  type="button"
                  onClick={() => editor.chain().focus().setParagraph().run()}
                  className={`px-3 py-1 rounded text-sm ${editor.isActive("paragraph") ? "bg-indigo-600 text-white" : "bg-white text-gray-700 hover:bg-gray-200"}`}
                >
                  P
                </button>
                <div className="w-px bg-gray-300 mx-1"></div>
                
                {/* Blockquote Button - Quote/blockquote formatting */}
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleBlockquote().run()}
                  className={`px-3 py-1 rounded text-sm ${editor.isActive("blockquote") ? "bg-indigo-600 text-white" : "bg-white text-gray-700 hover:bg-gray-200"}`}
                  title="Blockquote"
                >
                  "
                </button>
                {/* Horizontal Rule Button - Insert divider line (---) */}
                <button
                  type="button"
                  onClick={() => editor.chain().focus().setHorizontalRule().run()}
                  className="px-3 py-1 rounded text-sm bg-white text-gray-700 hover:bg-gray-200"
                  title="Insert horizontal rule (---)"
                >
                  ─
                </button>
                <div className="w-px bg-gray-300 mx-1"></div>
                
                {/* Code Block Buttons - Toggle code block or insert code snippet */}
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                  className={`px-3 py-1 rounded text-sm font-mono ${editor.isActive("codeBlock") ? "bg-indigo-600 text-white" : "bg-white text-gray-700 hover:bg-gray-200"}`}
                  title="Toggle code block"
                >
                  &lt;/&gt; Code
                </button>
                <button
                  type="button"
                  onClick={() => setShowCodeDialog(true)}
                  className="px-3 py-1 rounded text-sm font-mono bg-green-600 text-white hover:bg-green-700"
                  title="Insert code snippet"
                >
                  + Insert Code
                </button>
                <div className="w-px bg-gray-300 mx-1"></div>
                
                {/* ================================================================ */}
                {/* CONTENT IMAGE UPLOAD - Separate from hero banner upload */}
                {/* Purpose: Upload images to insert within the blog post content */}
                {/* This is different from the hero banner - these go in the article body */}
                {/* ================================================================ */}
                {/* Hidden file input for content image uploads (separate from hero banner) */}
                <input
                  ref={contentImageInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleContentImageSelect}
                  className="hidden"
                />
                {/* Upload Content Image Button - Uploads to Supabase and inserts into editor */}
                <button
                  type="button"
                  onClick={() => contentImageInputRef.current?.click()}
                  disabled={uploadingContentImage}
                  className="px-3 py-1 rounded text-sm bg-purple-600 text-white hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-1"
                  title="Upload image for content (separate from hero banner)"
                >
                  {uploadingContentImage ? (
                    <>⏳ Uploading...</>
                  ) : (
                    <>🖼️ Upload Content Image</>
                  )}
                </button>
                {/* Insert URL Button - Opens dialog to insert image by URL into content */}
                <button
                  type="button"
                  onClick={() => setShowImageDialog(true)}
                  className="px-3 py-1 rounded text-sm bg-blue-600 text-white hover:bg-blue-700"
                  title="Insert image by URL into content"
                >
                  📎 Insert URL
                </button>
              </div>
            )}
            {/* Editor Content Area - Where the blog post content is written */}
            {/* Purpose: Rich text editing area with custom styling for formatted content */}
            <div className="p-4 min-h-96 bg-white prose max-w-none" style={{ 
              overflow: 'visible',
              maxHeight: 'none',
              height: 'auto'
            }}>
              {/* Editor Styles - Custom CSS for TipTap editor content */}
              {/* Purpose: Style headings, paragraphs, lists, code blocks, and images */}
              <style jsx global>{`
                .ProseMirror {
                  outline: none;
                  min-height: 24rem;
                  /* Ensure content is fully visible on mobile */
                  word-wrap: break-word;
                  overflow-wrap: break-word;
                  /* Prevent mobile browsers from limiting content */
                  -webkit-overflow-scrolling: touch;
                  /* Ensure all content is rendered */
                  max-height: none !important;
                  height: auto !important;
                }
                /* Mobile-specific fixes for content rendering */
                @media (max-width: 768px) {
                  .ProseMirror {
                    min-height: 20rem;
                    /* Ensure mobile browsers don't limit content */
                    -webkit-text-size-adjust: 100%;
                    /* Prevent content truncation */
                    overflow: visible !important;
                    max-height: none !important;
                  }
                  /* Ensure editor container doesn't limit content */
                  .ProseMirror > * {
                    max-width: 100%;
                    word-wrap: break-word;
                    overflow-wrap: break-word;
                  }
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
                .ProseMirror ul,
                .ProseMirror ol {
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
                  font-family:
                    "JetBrainsMono", "Fira Code", "Courier New", monospace;
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
                  font-family:
                    "JetBrainsMono", "Fira Code", "Courier New", monospace;
                  font-size: 0.9em;
                }
                .ProseMirror img {
                  max-width: 100%;
                  height: auto;
                  margin: 1em 0;
                  border-radius: 0.5em;
                  display: block;
                }
                .ProseMirror blockquote {
                  border-left: 4px solid #4f46e5;
                  padding-left: 1em;
                  margin: 1.5em 0;
                  font-style: italic;
                  color: #4b5563;
                  background-color: #f9fafb;
                  padding: 1em 1em 1em 1.5em;
                  border-radius: 0.25em;
                }
                .ProseMirror hr {
                  border: none;
                  border-top: 2px solid #e5e7eb;
                  margin: 2em 0;
                  width: 100%;
                }
                .ProseMirror hr:hover {
                  border-top-color: #9ca3af;
                }
              `}</style>
              <EditorContent editor={editor} />
            </div>
          </div>

          {/* Submit Button - Publishes new post or updates existing one */}
          {/* Purpose: Save the blog post to Supabase database */}
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white px-8 py-3 rounded font-bold"
          >
            {loading
              ? mode === "edit"
                ? "Updating..."
                : "Publishing..."
              : mode === "edit"
                ? "Update Article"
                : "Publish Article"}
          </button>
        </form>

        {/* ==================================================================== */}
        {/* MODAL DIALOGS */}
        {/* ==================================================================== */}
        
        {/* Insert Image by URL Dialog */}
        {/* Purpose: Modal dialog for inserting images into content using a URL */}
        {/* Allows users to paste Supabase storage URLs or external image URLs */}
        {showImageDialog && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowImageDialog(false)}
          >
            <div
              className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  Insert Image by URL
                </h3>
                <button
                  onClick={() => setShowImageDialog(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL *
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg or Supabase storage URL"
                  className="w-full p-3 border rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alt Text (optional)
                </label>
                <input
                  type="text"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  placeholder="Description of the image"
                  className="w-full p-3 border rounded"
                />
              </div>

              {imageUrl && (
                <div className="mb-4 p-3 bg-gray-50 rounded border">
                  <p className="text-sm text-gray-600 mb-2">Preview:</p>
                  <img
                    src={imageUrl}
                    alt={imageAlt || "Preview"}
                    className="max-w-full h-auto max-h-48 rounded"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      const parent = target.parentElement;
                      if (parent) {
                        const errorMsg = document.createElement("p");
                        errorMsg.className = "text-red-500 text-sm";
                        errorMsg.textContent = "Failed to load image preview";
                        parent.appendChild(errorMsg);
                      }
                    }}
                  />
                </div>
              )}

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => {
                    setImageUrl("");
                    setImageAlt("");
                    setShowImageDialog(false);
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={insertImageByUrl}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                  disabled={!imageUrl.trim()}
                >
                  Insert Image
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Insert Code Snippet Dialog */}
        {/* Purpose: Modal dialog for inserting syntax-highlighted code blocks */}
        {/* Allows users to paste code and select the programming language */}
        {showCodeDialog && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowCodeDialog(false)}
          >
            <div
              className="bg-white rounded-lg shadow-xl p-6 max-w-3xl w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  Insert Code Snippet
                </h3>
                <button
                  onClick={() => setShowCodeDialog(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Language
                </label>
                <select
                  value={codeLanguage}
                  onChange={(e) => setCodeLanguage(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="html">HTML</option>
                  <option value="css">CSS</option>
                  <option value="javascript">JavaScript</option>
                  <option value="typescript">TypeScript</option>
                  <option value="jsx">JSX</option>
                  <option value="tsx">TSX</option>
                  <option value="python">Python</option>
                  <option value="bash">Bash</option>
                  <option value="json">JSON</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Paste your code here:
                </label>
                <textarea
                  value={codeInput}
                  onChange={(e) => setCodeInput(e.target.value)}
                  placeholder="Paste your HTML or code here..."
                  className="w-full h-64 p-3 border rounded font-mono text-sm bg-gray-50"
                  style={{ fontFamily: "monospace" }}
                />
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => {
                    setCodeInput("");
                    setShowCodeDialog(false);
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={insertCode}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                  disabled={!codeInput.trim()}
                >
                  Insert Code
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
