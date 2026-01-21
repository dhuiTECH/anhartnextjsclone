"use client";

/**
 * PortfolioManagerClient.tsx
 * 
 * Admin tool for managing portfolio projects.
 * Features:
 * - Image upload to Supabase storage
 * - Form fields for all project data
 * - Live preview of portfolio card
 * - Live preview of expanded modal
 */

import { useState, useRef, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExtension from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import {
  ArrowLeft,
  Upload,
  MapPin,
  Calendar,
  Users,
  Building,
  ExternalLink,
  Save,
  Trash2,
  Eye,
  X,
  Plus,
  Image as ImageIcon,
  Link as LinkIcon,
} from "lucide-react";
import type { User } from "@supabase/supabase-js";

/**
 * Component to safely render HTML content
 */
function HtmlRenderer({ html }: { html: string }) {
  // Decode HTML entities that might be double-encoded
  const decodedHtml = html
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

  return (
    <div
      className="prose prose-lg max-w-none [&_*]:text-gray-700 [&_img]:rounded-lg [&_img]:max-w-full [&_img]:h-auto [&_a]:text-indigo-600 [&_a]:hover:text-indigo-800 [&_a]:underline [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6 [&_li]:mb-1"
      dangerouslySetInnerHTML={{ __html: decodedHtml }}
    />
  );
}

/**
 * Image component that tries multiple fallback paths
 */
function ImageWithFallback({ 
  imagePaths, 
  alt, 
  className 
}: { 
  imagePaths: string[]; 
  alt: string; 
  className?: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasError, setHasError] = useState(false);
  
  const handleError = () => {
    if (currentIndex < imagePaths.length - 1) {
      console.log(`Image failed: ${imagePaths[currentIndex]}, trying next...`);
      setCurrentIndex(currentIndex + 1);
    } else {
      console.error(`All image paths failed for: ${alt}`, imagePaths);
      setHasError(true);
    }
  };
  
  if (hasError || imagePaths.length === 0) {
    return (
      <div className={`w-full h-full flex items-center justify-center ${className}`}>
        <Building className="w-12 h-12 text-gray-300" />
        <span className="text-xs text-gray-400 ml-2">Image not found</span>
      </div>
    );
  }
  
  return (
    <img
      src={imagePaths[currentIndex]}
      alt={alt}
      className={className}
      onError={handleError}
      onLoad={() => {
        console.log(`Image loaded: ${imagePaths[currentIndex]} for ${alt}`);
      }}
    />
  );
}

interface PortfolioManagerClientProps {
  user: User;
}

/**
 * Gets image URL from database path - uses image_url directly without hardcoded mappings
 */
function getImagePathsForProject(_projectTitle: string, databasePath: string | null): string[] {
  if (!databasePath) return [];
  
  // If it's already a full URL, return as-is
  if (databasePath.startsWith('http://') || databasePath.startsWith('https://')) {
    return [databasePath];
  }
  
  // Construct Supabase storage URL
  const cleanPath = databasePath.trim();
  const { data } = supabase.storage.from('portfolio-images').getPublicUrl(cleanPath);
  return [data.publicUrl];
}

/**
 * Gets the image URL from database path - uses image_url directly without hardcoded mappings
 */
function getImageUrlForProject(_projectTitle: string, databasePath: string | null): string | null {
  if (!databasePath) return null;
  
  // If it's already a full URL, return as-is
  if (databasePath.startsWith('http://') || databasePath.startsWith('https://')) {
    return databasePath;
  }
  
  // Construct Supabase storage URL
  const cleanPath = databasePath.trim();
  const { data } = supabase.storage.from('portfolio-images').getPublicUrl(cleanPath);
  return data.publicUrl;
}

/**
 * Normalizes highlights to always be an array of strings
 * Handles: string arrays, pipe-separated strings, JSON strings, null/undefined
 */
function normalizeHighlights(highlights: string[] | string | null | undefined): string[] {
  if (!highlights) {
    return [];
  }

  // If it's already an array, return it
  if (Array.isArray(highlights)) {
    return highlights.filter(h => h && typeof h === 'string' && h.trim() !== '');
  }

  // If it's a string, try to parse it
  if (typeof highlights === 'string') {
    const trimmed = highlights.trim();
    if (trimmed === '') {
      return [];
    }

    // Try parsing as JSON first (in case it's a JSON string)
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed.filter(h => h && typeof h === 'string' && h.trim() !== '');
      }
    } catch {
      // Not JSON, continue to other parsing methods
    }

    // Check if it's pipe-separated (from CSV)
    if (trimmed.includes('|')) {
      return trimmed
        .split('|')
        .map(h => h.trim())
        .filter(h => h !== '');
    }
    
    // Check if it's comma-separated (and looks like a list)
    if (trimmed.includes(',')) {
      const parts = trimmed.split(',').map(h => h.trim());
      // If all parts are relatively short, treat as list
      if (parts.length > 1 && parts.every(p => p.length < 200)) {
        return parts.filter(h => h !== '');
      }
    }

    // If it's a single string, return as single-item array
    return [trimmed];
  }

  return [];
}

interface ProjectFormData {
  title: string;
  location: string;
  year: string;
  units: string;
  status: "completed" | "in-progress" | "in-planning";
  type: string;
  briefDescription: string;
  comprehensiveDetails: string;
  highlights: string[];
  imageUrl: string;
  displayOrder: string;
  isFeatured: boolean;
}

const initialFormData: ProjectFormData = {
  title: "",
  location: "",
  year: "",
  units: "",
  status: "in-planning",
  type: "",
  briefDescription: "",
  comprehensiveDetails: "",
  highlights: [],
  imageUrl: "",
  displayOrder: "0",
  isFeatured: false,
};

const projectTypes = [
  "Historic Renovation",
  "Hotel Conversion",
  "Modular Housing",
  "Micro-Suites",
  "Affordable Housing",
  "Multi-Phase Development",
  "Manufacturing Facility",
  "Mixed-Use Development",
  "Townhouse Development",
  "High-Rise Residential",
];

const statusOptions = [
  { value: "completed", label: "Completed", color: "bg-green-100 text-green-800" },
  { value: "in-progress", label: "In Progress", color: "bg-blue-100 text-blue-800" },
  { value: "in-planning", label: "In Planning", color: "bg-amber-100 text-amber-800" },
];

export default function PortfolioManagerClient({ user }: PortfolioManagerClientProps) {
  const [formData, setFormData] = useState<ProjectFormData>(initialFormData);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [newHighlight, setNewHighlight] = useState("");
  const [previewMode, setPreviewMode] = useState<'form' | 'detail'>('form'); // 'form' or 'detail' preview
  const [viewMode, setViewMode] = useState<'create' | 'list'>('list'); // New: view mode
  const [projects, setProjects] = useState<any[]>([]); // New: list of projects
  const [isLoadingProjects, setIsLoadingProjects] = useState(true); // New: loading state
  const [isLoadingEdit, setIsLoadingEdit] = useState(false); // Loading state for editing
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null); // New: editing state
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Rich text editor for comprehensive details
  const comprehensiveEditor = useEditor({
    extensions: [
      StarterKit,
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-indigo-600 hover:text-indigo-800 underline',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto',
        },
      }),
    ],
    content: formData.comprehensiveDetails,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[200px]',
      },
    },
    onUpdate: ({ editor }) => {
      setFormData((prev) => ({
        ...prev,
        comprehensiveDetails: editor.getHTML(),
      }));
    },
  });

  // Load projects list
  useEffect(() => {
    loadProjects();
  }, []);

  // Update editor content when form data changes
  useEffect(() => {
    if (comprehensiveEditor && formData.comprehensiveDetails) {
      const currentContent = comprehensiveEditor.getHTML();
      if (currentContent !== formData.comprehensiveDetails) {
        comprehensiveEditor.commands.setContent(formData.comprehensiveDetails);
      }
    }
  }, [formData.comprehensiveDetails, comprehensiveEditor]);

  // Load projects list - Always fetches fresh data from Supabase
  const loadProjects = async () => {
    setIsLoadingProjects(true);
    try {
      // Always fetch fresh data directly from Supabase database
      const { data, error } = await supabase
        .from('portfolio')
        .select('*')
        .order('display_order', { ascending: true, nullsFirst: false })
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading projects from Supabase:', error);
        alert(`Error loading projects: ${error.message}`);
        return;
      }

      // Update state with fresh data from database
      setProjects(data || []);
    } catch (error) {
      console.error('Error loading projects from Supabase:', error);
      alert(`Error loading projects: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoadingProjects(false);
    }
  };

  // Load project for editing - Always fetches fresh data from Supabase
  const handleEdit = async (projectId: string) => {
    setIsLoadingEdit(true);
    try {
      // Always fetch fresh data directly from Supabase database
      // Using a timestamp query parameter to bypass any potential caching
      const { data, error } = await supabase
        .from('portfolio')
        .select('*')
        .eq('id', projectId)
        .single();

      if (error) {
        console.error('Error loading project from Supabase:', error);
        alert(`Error loading project for editing: ${error.message}`);
        setIsLoadingEdit(false);
        return;
      }

      if (!data) {
        alert('Project not found in database');
        setIsLoadingEdit(false);
        return;
      }

      // Populate form with fresh data from database
      // Schema: year=integer, units=text, highlights=text (JSON string)
      setFormData({
        title: data.title || '',
        location: data.location || '',
        year: data.year?.toString() || '', // Convert integer to string for form
        units: data.units || '', // Already text in database (not integer)
        status: data.status || 'in-planning',
        type: data.type || '',
        briefDescription: data.brief_description || '',
        comprehensiveDetails: data.comprehensive_details || '',
        highlights: normalizeHighlights(data.highlights) || [], // Parse JSON string to array
        imageUrl: data.image_url || data.image || '',
        displayOrder: data.display_order?.toString() || '0',
        isFeatured: data.is_featured || false,
      });

      setEditingProjectId(projectId);
      setViewMode('create');
      // Scroll to form
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error loading project from Supabase:', error);
      alert(`Error loading project for editing: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoadingEdit(false);
    }
  };

  // Delete project
  const handleDelete = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('portfolio')
        .delete()
        .eq('id', projectId);

      if (error) {
        console.error('Error deleting project:', error);
        alert('Error deleting project');
        return;
      }

      alert('Project deleted successfully');
      loadProjects(); // Reload list
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Error deleting project');
    }
  };

  // Handle form field changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle image upload for rich text editor
  const handleEditorImageUpload = async () => {
    if (!comprehensiveEditor) return;

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      // Validate file type
      const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
      if (!validTypes.includes(file.type)) {
        alert("Please upload a valid image file (JPEG, PNG, WebP, or GIF)");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }

      try {
        // Create unique filename
        const fileExt = file.name.split(".").pop();
        const fileName = `portfolio-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `portfolio/${fileName}`;

        // Upload to Supabase storage
        const { data, error } = await supabase.storage
          .from("portfolio-images")
          .upload(filePath, file);

        if (error) {
          console.error("Upload error:", error);
          if (error.message.includes("not found") || error.message.includes("Bucket")) {
            alert("Storage bucket not found. Please create a 'portfolio-images' bucket in Supabase storage.");
          } else {
            alert(`Upload failed: ${error.message}`);
          }
          return;
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage.from("portfolio-images").getPublicUrl(filePath);

        // Insert image into editor
        comprehensiveEditor.chain().focus().setImage({ src: publicUrl }).run();
      } catch (error) {
        console.error("Upload error:", error);
        alert("Failed to upload image. Please try again.");
      }
    };
    input.click();
  };

  // Handle link insertion for rich text editor
  const handleEditorLinkInsert = () => {
    if (!comprehensiveEditor) return;

    const url = prompt('Enter the URL:');
    if (url) {
      comprehensiveEditor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
  };

  // Rich text editor toolbar actions
  const toggleBold = () => comprehensiveEditor?.chain().focus().toggleBold().run();
  const toggleItalic = () => comprehensiveEditor?.chain().focus().toggleItalic().run();
  const toggleHeading = (level: number) => comprehensiveEditor?.chain().focus().toggleHeading({ level }).run();
  const toggleBulletList = () => comprehensiveEditor?.chain().focus().toggleBulletList().run();
  const toggleOrderedList = () => comprehensiveEditor?.chain().focus().toggleOrderedList().run();

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!validTypes.includes(file.type)) {
      alert("Please upload a valid image file (JPEG, PNG, WebP, or GIF)");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Create unique filename
      const fileExt = file.name.split(".").pop();
      const fileName = `portfolio-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `portfolio/${fileName}`;

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90));
      }, 100);

      // Upload to Supabase storage
      const { data, error } = await supabase.storage
        .from("portfolio-images")
        .upload(filePath, file);

      clearInterval(progressInterval);

      if (error) {
        console.error("Upload error:", error);
        // If bucket doesn't exist, show helpful message
        if (error.message.includes("not found") || error.message.includes("Bucket")) {
          alert(
            "Storage bucket not found. Please create a 'portfolio-images' bucket in Supabase storage."
          );
        } else {
          alert(`Upload failed: ${error.message}`);
        }
        return;
      }

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("portfolio-images").getPublicUrl(filePath);

      setUploadProgress(100);
      setFormData((prev) => ({ ...prev, imageUrl: publicUrl }));

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  // Handle adding highlights
  const handleAddHighlight = () => {
    if (newHighlight.trim()) {
      setFormData((prev) => ({
        ...prev,
        highlights: [...prev.highlights, newHighlight.trim()],
      }));
      setNewHighlight("");
    }
  };

  // Handle removing highlights
  const handleRemoveHighlight = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index),
    }));
  };

  // Handle form submission
  const handleSave = async () => {
    // Validation
    if (!formData.title.trim()) {
      alert("Please enter a project title");
      return;
    }
    if (!formData.location.trim()) {
      alert("Please enter a location");
      return;
    }
    if (!formData.briefDescription.trim()) {
      alert("Please enter a brief description");
      return;
    }

    // Verify user is authenticated
    const { data: { user: currentUser } } = await supabase.auth.getUser();
    if (!currentUser) {
      alert("You must be logged in to save projects. Please refresh the page and log in again.");
      return;
    }
    console.log('User authenticated:', currentUser.id);

    setIsSaving(true);

    try {
      // Safely parse integer fields, handling empty strings and invalid values
      const parseInteger = (value: string | null | undefined): number | null => {
        if (!value || value.trim() === '') return null;
        const parsed = parseInt(value.trim(), 10);
        return isNaN(parsed) ? null : parsed;
      };

      const parseIntegerWithDefault = (value: string | null | undefined, defaultValue: number): number => {
        if (!value || value.trim() === '') return defaultValue;
        const parsed = parseInt(value.trim(), 10);
        return isNaN(parsed) ? defaultValue : parsed;
      };

      // Build project data - match the actual database schema
      // Schema: id=integer, created_by=integer, year=integer, units=text, highlights=text
      const projectData: any = {
        title: formData.title,
        location: formData.location || null,
        year: parseInteger(formData.year), // Database expects integer
        units: formData.units || null, // Database expects text (not integer)
        status: formData.status || null,
        type: formData.type || null,
        brief_description: formData.briefDescription || null,
        comprehensive_details: formData.comprehensiveDetails || null,
        highlights: formData.highlights.length > 0 
          ? JSON.stringify(formData.highlights) // Database expects text - store as JSON string
          : null,
        image_url: formData.imageUrl || null,
        image: formData.imageUrl || null, // Also set image field for backward compatibility
        display_order: parseIntegerWithDefault(formData.displayOrder, 0),
        is_featured: formData.isFeatured || false,
        // Note: created_by is INTEGER in schema but user.id is UUID
        // Setting to null - database will handle default or you can create a user_id mapping
        created_by: null,
      };
      
      // Note: highlights is stored as a JSON array (text[] or jsonb) in Supabase
      // The database will automatically handle the array format

      let error;
      if (editingProjectId) {
        // Update existing project - explicitly exclude created_by and other non-updatable fields
        const updateData = {
          title: projectData.title,
          location: projectData.location,
          year: projectData.year,
          units: projectData.units,
          status: projectData.status,
          type: projectData.type,
          brief_description: projectData.brief_description,
          comprehensive_details: projectData.comprehensive_details,
          highlights: projectData.highlights,
          image_url: projectData.image_url,
          image: projectData.image, // Also update image field for backward compatibility
          display_order: projectData.display_order,
          is_featured: projectData.is_featured,
          // Explicitly exclude: created_by, created_at, id
        };
        
        // Convert editingProjectId to integer for database query
        const projectIdInt = parseInt(editingProjectId, 10);
        if (isNaN(projectIdInt)) {
          alert(`Invalid project ID: ${editingProjectId}`);
          setIsSaving(false);
          return;
        }
        
        console.log('Updating project with ID:', projectIdInt, 'data:', updateData);
        const { data: updateResult, error: updateError } = await supabase
          .from("portfolio")
          .update(updateData)
          .eq('id', projectIdInt)
          .select(); // Select to verify update
        
        if (updateError) {
          console.error('Update error:', updateError);
          error = updateError;
        } else {
          console.log('Update successful, affected rows:', updateResult?.length || 0);
          // Verify the update actually happened
          if (!updateResult || updateResult.length === 0) {
            console.warn('Update query returned no rows - project may not exist or RLS policy blocked update');
            error = { 
              message: 'Update did not affect any rows. This may be due to RLS policies or the project not existing.',
              code: 'PGRST116',
              details: `No rows updated for ID: ${projectIdInt}`
            } as any;
          }
        }
      } else {
        // Insert new project - need to generate a unique integer ID
        // Query for max ID first, then increment
        const { data: maxIdData, error: maxIdError } = await supabase
          .from("portfolio")
          .select("id")
          .order("id", { ascending: false })
          .limit(1)
          .single();
        
        let newId: number;
        if (maxIdError || !maxIdData) {
          // If no existing records or error, start with 1
          newId = 1;
        } else {
          // Increment the max ID
          newId = (maxIdData.id as number) + 1;
        }
        
        // Add the generated ID to project data
        const insertData = {
          ...projectData,
          id: newId,
        };
        
        console.log('Inserting new project with ID:', newId, 'data:', insertData);
        const { error: insertError } = await supabase
          .from("portfolio")
          .insert([insertData]);
        error = insertError;
      }

      if (error) {
        console.error("Save error details:", {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        
        // Check for common RLS/auth errors
        let errorMessage = `Database error: ${error.message}`;
        if (error.code === '42501' || error.message.includes('permission denied') || error.message.includes('policy')) {
          errorMessage += '\n\n⚠️ This appears to be a Row Level Security (RLS) policy issue. Please ensure:\n';
          errorMessage += '1. You are logged in as an authenticated user\n';
          errorMessage += '2. RLS policies allow authenticated users to update the portfolio table\n';
          errorMessage += '3. Check Supabase Dashboard → Authentication → Policies';
        } else if (error.code === 'PGRST116' || error.message.includes('No rows')) {
          errorMessage += '\n\n⚠️ No rows were updated. This could mean:\n';
          errorMessage += '1. The project ID does not exist\n';
          errorMessage += '2. RLS policies are blocking the update\n';
          errorMessage += '3. The ID format is incorrect (expected integer)';
        }
        
        if (error.details) {
          errorMessage += `\n\nDetails: ${error.details}`;
        }
        if (error.hint) {
          errorMessage += `\n\nHint: ${error.hint}`;
        }
        
        alert(errorMessage);
        setIsSaving(false);
        return;
      }

      alert(editingProjectId ? "Project updated successfully!" : "Project saved successfully!");
      // Reset form and return to list view
      setFormData(initialFormData);
      setEditingProjectId(null);
      setViewMode('list');
      // Always reload projects list from Supabase to get fresh data
      await loadProjects();
    } catch (error: any) {
      console.error("Save error:", error);
      // Show the generated code for manual addition
      const projectCode = generateProjectCode();
      alert(`Error saving to database: ${error.message}\n\nHere's the project data:\n\n${projectCode}`);
    } finally {
      setIsSaving(false);
    }
  };

  // Generate TypeScript code for manual addition to portfolio.ts
  const generateProjectCode = () => {
    return `{
  id: ${Date.now()},
  title: "${formData.title}",
  location: "${formData.location}",
  ${formData.year ? `year: "${formData.year}",` : ""}
  ${formData.units ? `units: ${formData.units},` : 'units: "TBD",'}
  description: "${formData.briefDescription}",
  ${formData.comprehensiveDetails ? `briefDescription: "${formData.briefDescription}",\n  comprehensiveDetails: "${formData.comprehensiveDetails}",` : ""}
  image: "${formData.imageUrl || "placeholder"}",
  status: "${formData.status}",
  ${formData.type ? `type: "${formData.type}",` : ""}
  ${formData.highlights.length > 0 ? `highlights: [\n    ${formData.highlights.map((h) => `"${h}"`).join(",\n    ")}\n  ],` : ""}
}`;
  };

  // Copy code to clipboard
  const handleCopyCode = () => {
    const code = generateProjectCode();
    navigator.clipboard.writeText(code);
    alert("Project code copied to clipboard!");
  };

  // Clear form
  const handleClear = () => {
    if (confirm("Are you sure you want to clear all form data?")) {
      setFormData(initialFormData);
      setEditingProjectId(null);
    }
  };

  // Start creating new project
  const handleNewProject = () => {
    setFormData(initialFormData);
    setEditingProjectId(null);
    setViewMode('create');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle switching back to list view - refresh data from Supabase
  const handleBackToList = () => {
    setViewMode('list');
    setFormData(initialFormData);
    setEditingProjectId(null);
    // Refresh projects list from Supabase to ensure fresh data
    loadProjects();
  };

  // Get status badge styling
  const getStatusBadge = (status: string) => {
    const option = statusOptions.find((opt) => opt.value === status);
    return option?.color || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white p-6 rounded-xl shadow mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Link
              href="/admin/dashboard"
              className="text-indigo-600 hover:text-indigo-700 flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-indigo-700 mb-2">Portfolio Manager</h1>
              <p className="text-gray-600">Create and manage portfolio projects</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleBackToList}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                View All Projects
              </button>
              <button
                onClick={handleNewProject}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                New Project
              </button>
            </div>
          </div>
        </div>

        {/* Projects List View */}
        {viewMode === 'list' && (
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">All Portfolio Projects</h2>
            {isLoadingProjects ? (
              <div className="text-center py-8">
                <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                <p className="text-gray-500">Loading projects...</p>
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-8">
                <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">No projects found. Create your first project!</p>
                <button
                  onClick={handleNewProject}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2 mx-auto"
                >
                  <Plus className="w-5 h-5" />
                  Create First Project
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-3">
                      {(() => {
                        const imagePaths = getImagePathsForProject(project.title, project.image_url || project.image);
                        if (imagePaths.length === 0) {
                          return (
                            <div className="w-full h-full flex items-center justify-center">
                              <Building className="w-12 h-12 text-gray-300" />
                              <span className="text-xs text-gray-400 ml-2">No image</span>
                            </div>
                          );
                        }
                        
                        // Create an image that tries multiple fallback paths
                        return (
                          <ImageWithFallback
                            imagePaths={imagePaths}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                        );
                      })()}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                      {project.title}
                      {project.is_featured && (
                        <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full font-medium">
                          ⭐ Featured
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{project.location}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs px-2 py-1 rounded-md font-medium ${getStatusBadge(project.status)}`}
                        >
                          {statusOptions.find((s) => s.value === project.status)?.label}
                        </span>
                        {project.display_order !== null && project.display_order !== undefined && (
                          <span className="text-xs text-gray-500">
                            Order: {project.display_order}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(project.id)}
                          disabled={isLoadingEdit}
                          className="px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isLoadingEdit ? 'Loading...' : 'Edit'}
                        </button>
                        <button
                          onClick={() => handleDelete(project.id)}
                          className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Create/Edit Form View */}
        {viewMode === 'create' ? (
          <div className="space-y-6">
            {/* Toggle Button */}
            <div className="flex justify-end">
              <button
                onClick={() => setPreviewMode(previewMode === 'form' ? 'detail' : 'form')}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                {previewMode === 'form' ? 'Show Detail Page' : 'Show Form'}
              </button>
            </div>

            {previewMode === 'form' ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Form */}
                <div className="space-y-6">
            {/* Image Upload Section */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-indigo-600" />
                Project Image
              </h2>

              {/* Image Preview */}
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4 flex items-center justify-center border-2 border-dashed border-gray-300">
                {formData.imageUrl ? (() => {
                  // Generate image paths using the helper function to convert filenames to Supabase URLs
                  const imagePaths = getImagePathsForProject(formData.title, formData.imageUrl);
                  return (
                    <div className="relative w-full h-full">
                      <ImageWithFallback
                        imagePaths={imagePaths}
                        alt="Project preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => setFormData((prev) => ({ ...prev, imageUrl: "" }))}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 z-10"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })() : (
                  <div className="text-center p-8">
                    <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No image uploaded</p>
                  </div>
                )}
              </div>

              {/* Upload Button */}
              <div className="relative">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className={`flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg cursor-pointer transition-colors ${
                    isUploading
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-indigo-600 text-white hover:bg-indigo-700"
                  }`}
                >
                  {isUploading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Uploading... {uploadProgress}%
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5" />
                      Upload Image
                    </>
                  )}
                </label>

                {/* Progress Bar */}
                {uploadProgress > 0 && (
                  <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                )}
              </div>

              {/* Manual URL Input */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Or enter image URL/filename directly
                </label>
                <input
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="e.g., Jubilee-Sign.jpg or full URL"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  💡 Tip: You can enter a filename (e.g., "Jubilee-Sign.jpg") or a full URL. The system will automatically map project titles to correct bucket filenames when displaying.
                </p>
              </div>
            </div>

            {/* Basic Information */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Building className="w-5 h-5 text-indigo-600" />
                Basic Information
              </h2>

              <div className="space-y-6">
                {/* Project Title - Full Width */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., Jubilee Rooms"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                  />
                </div>

                {/* Location - Full Width */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location / Address *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g., Vancouver, BC"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                    />
                  </div>
                </div>

                {/* Year and Units - Two Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        placeholder="e.g., 2024"
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Units
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="units"
                        value={formData.units}
                        onChange={handleChange}
                        placeholder="e.g., 80 or TBD"
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Project Type and Status - Two Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Type
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors bg-white"
                    >
                      <option value="">Select type...</option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <div className="flex gap-2">
                      {statusOptions.map((option) => (
                        <label
                          key={option.value}
                          className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer transition-all border-2 text-sm ${
                            formData.status === option.value
                              ? `${option.color} border-current`
                              : "bg-gray-50 border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name="status"
                            value={option.value}
                            checked={formData.status === option.value}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <span className="text-sm font-medium">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Display Order and Featured - Two Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Display Order
                    </label>
                    <input
                      type="number"
                      name="displayOrder"
                      value={formData.displayOrder}
                      onChange={handleChange}
                      placeholder="0"
                      min="0"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                    />
                    <p className="text-xs text-gray-500 mt-1.5">
                      Lower numbers appear first. Default: 0
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Featured Project
                    </label>
                    <div className="flex items-center h-[42px]">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="isFeatured"
                          checked={formData.isFeatured}
                          onChange={handleChange}
                          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <span className="text-sm text-gray-700">Show as featured project</span>
                      </label>
                    </div>
                    <p className="text-xs text-gray-500 mt-1.5">
                      Featured projects are highlighted in the portfolio
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Descriptions */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Project Overview</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Brief Description * <span className="text-gray-400">(for card preview)</span>
                  </label>
                  <textarea
                    name="briefDescription"
                    value={formData.briefDescription}
                    onChange={handleChange}
                    rows={3}
                    placeholder="A concise overview of the project for the portfolio card..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Comprehensive Details <span className="text-gray-400">(for modal view)</span>
                    </label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={handleEditorImageUpload}
                        className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm flex items-center gap-1"
                        title="Insert Image"
                      >
                        <ImageIcon className="w-4 h-4" />
                        Image
                      </button>
                      <button
                        type="button"
                        onClick={handleEditorLinkInsert}
                        className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm flex items-center gap-1"
                        title="Insert Link"
                      >
                        <LinkIcon className="w-4 h-4" />
                        Link
                      </button>
                    </div>
                  </div>
                  <div className="border border-gray-300 rounded-lg">
                    {/* Rich Text Editor Toolbar */}
                    <div className="flex items-center gap-1 p-2 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                      <button
                        type="button"
                        onClick={toggleBold}
                        className={`px-2 py-1 rounded text-sm font-bold ${comprehensiveEditor?.isActive('bold') ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                        title="Bold"
                      >
                        B
                      </button>
                      <button
                        type="button"
                        onClick={toggleItalic}
                        className={`px-2 py-1 rounded text-sm italic ${comprehensiveEditor?.isActive('italic') ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                        title="Italic"
                      >
                        I
                      </button>
                      <div className="w-px h-6 bg-gray-300 mx-1" />
                      <button
                        type="button"
                        onClick={() => toggleHeading(2)}
                        className={`px-2 py-1 rounded text-sm ${comprehensiveEditor?.isActive('heading', { level: 2 }) ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                        title="Heading 2"
                      >
                        H2
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleHeading(3)}
                        className={`px-2 py-1 rounded text-sm ${comprehensiveEditor?.isActive('heading', { level: 3 }) ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                        title="Heading 3"
                      >
                        H3
                      </button>
                      <div className="w-px h-6 bg-gray-300 mx-1" />
                      <button
                        type="button"
                        onClick={toggleBulletList}
                        className={`px-2 py-1 rounded text-sm ${comprehensiveEditor?.isActive('bulletList') ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                        title="Bullet List"
                      >
                        •
                      </button>
                      <button
                        type="button"
                        onClick={toggleOrderedList}
                        className={`px-2 py-1 rounded text-sm ${comprehensiveEditor?.isActive('orderedList') ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                        title="Numbered List"
                      >
                        1.
                      </button>
                      <div className="w-px h-6 bg-gray-300 mx-1" />
                      <button
                        type="button"
                        onClick={handleEditorImageUpload}
                        className="px-2 py-1 rounded text-sm bg-white text-gray-700 hover:bg-gray-100 flex items-center gap-1"
                        title="Insert Image"
                      >
                        <ImageIcon className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={handleEditorLinkInsert}
                        className="px-2 py-1 rounded text-sm bg-white text-gray-700 hover:bg-gray-100 flex items-center gap-1"
                        title="Insert Link"
                      >
                        <LinkIcon className="w-4 h-4" />
                      </button>
                    </div>
                    <EditorContent editor={comprehensiveEditor} />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    💡 Use the buttons above to insert images and links. Images are automatically uploaded to your portfolio storage.
                  </p>
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Key Highlights</h2>

              {/* Highlights List */}
              <div className="space-y-2 mb-4">
                {formData.highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg"
                  >
                    <span className="text-indigo-600 font-bold">•</span>
                    <span className="flex-1 text-sm text-gray-700">{highlight}</span>
                    <button
                      onClick={() => handleRemoveHighlight(index)}
                      className="text-red-500 hover:text-red-600 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {formData.highlights.length === 0 && (
                  <p className="text-gray-400 text-sm italic">No highlights added yet</p>
                )}
              </div>

              {/* Add Highlight */}
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newHighlight}
                    onChange={(e) => setNewHighlight(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddHighlight()}
                    placeholder="Add a highlight..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleAddHighlight}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  💡 Tip: Highlights are stored as an array in the database. Each highlight will appear as a separate bullet point on the portfolio page.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white p-6 rounded-xl shadow">
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Save Project
                    </>
                  )}
                </button>

                <button
                  onClick={handleCopyCode}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2"
                >
                  Copy Code
                </button>

                <button
                  onClick={handleClear}
                  className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-2"
                >
                  <Trash2 className="w-5 h-5" />
                  Clear
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Preview */}
          <div className="space-y-6">
            {/* Card Preview */}
            <div className="bg-white p-6 rounded-xl shadow sticky top-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-indigo-600" />
                  Card Preview
                </h2>
              </div>

              {/* Portfolio Card Preview */}
              <div className="max-w-sm mx-auto">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                  {/* Image */}
                  <div className="aspect-video overflow-hidden bg-gray-100">
                    {formData.imageUrl ? (() => {
                      // Generate image paths using the helper function
                      const imagePaths = getImagePathsForProject(formData.title, formData.imageUrl);
                      return (
                        <ImageWithFallback
                          imagePaths={imagePaths}
                          alt={formData.title || "Project preview"}
                          className="w-full h-full object-cover"
                        />
                      );
                    })() : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Building className="w-16 h-16 text-gray-300" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-900">
                        {formData.title || "Project Title"}
                      </h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-md font-medium ${getStatusBadge(formData.status)}`}
                      >
                        {statusOptions.find((s) => s.value === formData.status)?.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{formData.location || "Location"}</span>
                      </div>
                      {formData.year && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formData.year}</span>
                        </div>
                      )}
                    </div>

                    <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                      {formData.briefDescription || "Brief project description will appear here..."}
                    </p>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1 text-sm font-semibold text-indigo-600">
                        <Users className="w-4 h-4" />
                        {formData.units || "TBD"} Units
                      </div>
                    </div>

                    <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center gap-2">
                      View Details
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
            ) : (
            /* Detail Page Preview */
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Detail Page Preview</h2>
                  <p className="text-sm text-gray-500">This is how the project will appear on the detail page</p>
                </div>

                {/* Project Image */}
                <div className="mb-12 rounded-lg overflow-hidden aspect-video bg-gray-100">
                  {formData.imageUrl ? (() => {
                    const imagePaths = getImagePathsForProject(formData.title, formData.imageUrl);
                    return (
                      <ImageWithFallback
                        imagePaths={imagePaths}
                        alt={formData.title || "Project preview"}
                        className="w-full h-full object-cover"
                      />
                    );
                  })() : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Building className="w-16 h-16 text-gray-300" />
                    </div>
                  )}
                </div>

                {/* Project Header */}
                <div className="mb-12">
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <h1 className="text-4xl font-bold text-gray-900">
                      {formData.title || "Project Title"}
                    </h1>
                    <span className={`text-xs px-3 py-1 rounded-md font-medium ${getStatusBadge(formData.status)}`}>
                      {statusOptions.find(s => s.value === formData.status)?.label || formData.status}
                    </span>
                  </div>

                  {/* Project Meta Info */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-y border-gray-200">
                    {formData.location && (
                      <div className="flex items-start gap-2">
                        <MapPin className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Location</p>
                          <p className="font-semibold text-gray-900">{formData.location}</p>
                        </div>
                      </div>
                    )}

                    {formData.year && (
                      <div className="flex items-start gap-2">
                        <Calendar className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Year</p>
                          <p className="font-semibold text-gray-900">{formData.year}</p>
                        </div>
                      </div>
                    )}

                    {formData.units && (
                      <div className="flex items-start gap-2">
                        <Users className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Units</p>
                          <p className="font-semibold text-gray-900">{formData.units}</p>
                        </div>
                      </div>
                    )}

                    {formData.type && (
                      <div className="flex items-start gap-2">
                        <Building className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Type</p>
                          <p className="font-semibold text-gray-900">{formData.type}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="mb-12 space-y-6">
                  <div className="prose prose-lg max-w-none">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Overview</h2>
                    {formData.comprehensiveDetails ? (
                      <HtmlRenderer html={formData.comprehensiveDetails} />
                    ) : (
                      <p className="text-gray-700">
                        {formData.briefDescription || "Project overview description will appear here..."}
                      </p>
                    )}
                  </div>

                  {/* Key Highlights */}
                  {formData.highlights.length > 0 && (
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Key Highlights</h3>
                      <ul className="space-y-2">
                        {formData.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start gap-3 text-gray-700">
                            <span className="text-indigo-600 font-bold mt-1">•</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}





