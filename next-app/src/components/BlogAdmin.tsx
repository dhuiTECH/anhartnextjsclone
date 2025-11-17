"use client";

import { useState, useEffect, useRef } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Upload,
  Image as ImageIcon,
  AlertCircle,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featured_image: string;
  author_name: string;
  publish_date: string;
  category: string;
  tags: string[];
  reading_time: number;
  meta_title: string;
  meta_description: string;
  keywords: string[];
  is_published: boolean;
}

const BlogAdmin = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Rich text editor modules
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const emptyPost: Partial<BlogPost> = {
    slug: "",
    title: "",
    excerpt: "",
    content: "",
    featured_image: "",
    author_name: "Anhart Team",
    category: "",
    tags: [],
    reading_time: 5,
    meta_title: "",
    meta_description: "",
    keywords: [],
    is_published: false,
    publish_date: new Date().toISOString().split("T")[0],
  };

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  // Upload image to Supabase Storage
  const handleImageUpload = async (file: File) => {
    if (!file) return null;

    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("blog-images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("blog-images")
        .getPublicUrl(filePath);

      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });

      return data.publicUrl;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to upload image",
        variant: "destructive",
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingPost) return;

    const url = await handleImageUpload(file);
    if (url) {
      setEditingPost({ ...editingPost, featured_image: url });
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("publish_date", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch blog posts",
        variant: "destructive",
      });
      return;
    }

    setPosts(data || []);
  };

  const handleSave = async () => {
    if (!editingPost) return;

    // Validation
    if (!editingPost.title?.trim()) {
      toast({
        title: "Validation Error",
        description: "Title is required",
        variant: "destructive",
      });
      return;
    }

    if (!editingPost.slug?.trim()) {
      toast({
        title: "Validation Error",
        description: "Slug is required",
        variant: "destructive",
      });
      return;
    }

    if (!editingPost.content?.trim()) {
      toast({
        title: "Validation Error",
        description: "Content is required",
        variant: "destructive",
      });
      return;
    }

    const postData = {
      ...editingPost,
      tags: Array.isArray(editingPost.tags) ? editingPost.tags : [],
      keywords: Array.isArray(editingPost.keywords) ? editingPost.keywords : [],
    };

    if (isCreating) {
      const { error } = await supabase.from("blog_posts").insert([postData]);
      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
    } else {
      const { error } = await supabase
        .from("blog_posts")
        .update(postData)
        .eq("id", editingPost.id);
      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
    }

    toast({
      title: "Success",
      description: `Blog post ${isCreating ? "created" : "updated"} successfully`,
    });
    setEditingPost(null);
    setIsCreating(false);
    fetchPosts();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Blog post deleted successfully",
    });
    fetchPosts();
  };

  const handleCreate = () => {
    setIsCreating(true);
    setEditingPost(emptyPost as BlogPost);
  };

  const handleCancel = () => {
    setEditingPost(null);
    setIsCreating(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-foreground">
              Blog Management
            </h1>
            {!editingPost && (
              <Button onClick={handleCreate} className="gap-2">
                <Plus className="h-4 w-4" />
                New Post
              </Button>
            )}
          </div>

          {editingPost ? (
            <Card>
              <CardHeader>
                <CardTitle>
                  {isCreating ? "Create New Blog Post" : "Edit Blog Post"}
                </CardTitle>
                <CardDescription>
                  Fill in the details below. Fields marked with * are required.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Quick Tips:</strong>
                    <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                      <li>
                        Slug auto-generates from title but can be customized
                      </li>
                      <li>Use the rich text editor for formatted content</li>
                      <li>Upload images to get permanent URLs automatically</li>
                      <li>
                        Reading time is in minutes (estimated based on word
                        count)
                      </li>
                      <li>Tags and keywords should be comma-separated</li>
                    </ul>
                  </AlertDescription>
                </Alert>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      placeholder="Enter post title"
                      value={editingPost.title}
                      onChange={(e) => {
                        const title = e.target.value;
                        setEditingPost({
                          ...editingPost,
                          title,
                          slug: generateSlug(title),
                          meta_title: title,
                        });
                      }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="slug">Slug * (URL-friendly)</Label>
                    <Input
                      id="slug"
                      placeholder="auto-generated-from-title"
                      value={editingPost.slug}
                      onChange={(e) =>
                        setEditingPost({
                          ...editingPost,
                          slug: generateSlug(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="excerpt">
                    Excerpt * (Brief summary shown in hero)
                  </Label>
                  <Textarea
                    id="excerpt"
                    placeholder="Brief summary that appears below the subtitle in the hero section (300 characters max)"
                    value={editingPost.excerpt}
                    onChange={(e) =>
                      setEditingPost({
                        ...editingPost,
                        excerpt: e.target.value,
                      })
                    }
                    rows={3}
                    maxLength={300}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {editingPost.excerpt?.length || 0}/300 characters - Displays
                    in hero section
                  </p>
                </div>

                <div>
                  <Label>Content * (Rich Text Editor)</Label>
                  <div className="border rounded-md">
                    <ReactQuill
                      theme="snow"
                      value={editingPost.content}
                      onChange={(content) =>
                        setEditingPost({ ...editingPost, content })
                      }
                      modules={modules}
                      className="min-h-[300px]"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Use the editor toolbar to format your content. You can also
                    paste HTML directly.
                  </p>
                </div>

                <div>
                  <Label>Featured Image *</Label>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Image URL or upload a file"
                        value={editingPost.featured_image}
                        onChange={(e) =>
                          setEditingPost({
                            ...editingPost,
                            featured_image: e.target.value,
                          })
                        }
                      />
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="gap-2"
                      >
                        <Upload className="h-4 w-4" />
                        {uploading ? "Uploading..." : "Upload"}
                      </Button>
                    </div>
                    {editingPost.featured_image && (
                      <div className="relative w-full h-48 border rounded-md overflow-hidden">
                        <img
                          src={editingPost.featured_image}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="author">Author Name</Label>
                    <Input
                      id="author"
                      value={editingPost.author_name}
                      onChange={(e) =>
                        setEditingPost({
                          ...editingPost,
                          author_name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="publish_date">Publish Date</Label>
                    <Input
                      id="publish_date"
                      type="date"
                      value={
                        editingPost.publish_date ||
                        new Date().toISOString().split("T")[0]
                      }
                      onChange={(e) =>
                        setEditingPost({
                          ...editingPost,
                          publish_date: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Input
                      id="category"
                      placeholder="e.g., Housing Resources"
                      value={editingPost.category}
                      onChange={(e) =>
                        setEditingPost({
                          ...editingPost,
                          category: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="reading_time">Reading Time (minutes)</Label>
                    <Input
                      id="reading_time"
                      type="number"
                      min="1"
                      placeholder="5"
                      value={editingPost.reading_time}
                      onChange={(e) =>
                        setEditingPost({
                          ...editingPost,
                          reading_time: parseInt(e.target.value) || 5,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-end">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="published"
                        checked={editingPost.is_published}
                        onCheckedChange={(checked) =>
                          setEditingPost({
                            ...editingPost,
                            is_published: checked,
                          })
                        }
                      />
                      <Label htmlFor="published">
                        {editingPost.is_published ? "Published" : "Draft"}
                      </Label>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    placeholder="affordable housing, BC, community"
                    value={
                      Array.isArray(editingPost.tags)
                        ? editingPost.tags.join(", ")
                        : ""
                    }
                    onChange={(e) =>
                      setEditingPost({
                        ...editingPost,
                        tags: e.target.value
                          .split(",")
                          .map((t) => t.trim())
                          .filter(Boolean),
                      })
                    }
                  />
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-lg font-semibold mb-4">SEO Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="meta_title">
                        Meta Title * (60 characters max)
                      </Label>
                      <Input
                        id="meta_title"
                        placeholder="SEO-optimized title for search engines"
                        maxLength={60}
                        value={editingPost.meta_title}
                        onChange={(e) =>
                          setEditingPost({
                            ...editingPost,
                            meta_title: e.target.value,
                          })
                        }
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        {editingPost.meta_title?.length || 0}/60 characters
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="meta_description">
                        Meta Description * (160 characters max)
                      </Label>
                      <Textarea
                        id="meta_description"
                        placeholder="Compelling description for search engine results"
                        maxLength={160}
                        value={editingPost.meta_description}
                        onChange={(e) =>
                          setEditingPost({
                            ...editingPost,
                            meta_description: e.target.value,
                          })
                        }
                        rows={3}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        {editingPost.meta_description?.length || 0}/160
                        characters
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="keywords">
                        SEO Keywords (comma-separated)
                      </Label>
                      <Input
                        id="keywords"
                        placeholder="keyword one, keyword two, keyword three"
                        value={
                          Array.isArray(editingPost.keywords)
                            ? editingPost.keywords.join(", ")
                            : ""
                        }
                        onChange={(e) =>
                          setEditingPost({
                            ...editingPost,
                            keywords: e.target.value
                              .split(",")
                              .map((k) => k.trim())
                              .filter(Boolean),
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={handleSave} className="gap-2">
                    <Save className="h-4 w-4" />
                    Save
                  </Button>
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    className="gap-2"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {posts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold text-foreground">
                            {post.title}
                          </h3>
                          <Badge
                            variant={
                              post.is_published ? "default" : "secondary"
                            }
                          >
                            {post.is_published ? "Published" : "Draft"}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-2">
                          {post.excerpt}
                        </p>
                        <div className="flex gap-2 text-sm text-muted-foreground">
                          <span>Category: {post.category}</span>
                          <span>•</span>
                          <span>
                            {new Date(post.publish_date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingPost(post)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(post.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogAdmin;
