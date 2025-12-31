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
} from "lucide-react";
import type { User } from "@supabase/supabase-js";

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
 * Gets all possible image paths for a project (for fallback attempts)
 */
function getImagePathsForProject(projectTitle: string, databasePath: string | null): string[] {
  const normalizedTitle = projectTitle?.trim() || '';
  const titleLower = normalizedTitle.toLowerCase();
  
  // Title-based mappings with fallback options
  const titleMappings: Record<string, string[]> = {
    'Jubilee Rooms': ['Jubilee-Sign.jpg', 'Jubilee.png', 'Jubilee.jpg'],
    'Kwas House': ['Kwas.png', 'Kwas.jpg'],
    'Anhart Sustainable Villages': ['Maternity.png', 'Maternity.jpg'],
    'Modular Homes Factory': ['ModularFactory.jpg', 'ModularFactory.png'],
    'Modular Villages': ['ModularHomes.png', 'ModularHomes.jpg'],
    'Merritt Village': ['Merritt.png', 'Merritt.jpg', 'ModularHomes.png'],
    'Merritt Townhomes': ['Merritt.png', 'Merritt.jpg', 'ModularHomes.png'],
    'Merritt': ['Merritt.png', 'Merritt.jpg', 'ModularHomes.png'],
    '179 Main & 626 Alexander': ['626Alexander.jpg', '179Main.png', '626Alexander.png'],
    '179 Main': ['179Main.png', '626Alexander.jpg', '626Alexander.png'],
    '626 Alexander': ['626Alexander.jpg', '626Alexander.png', '179Main.png'],
    'Metson Rooms': ['Metsons.jpg', '1060howe.jpg', 'Metson.png', 'Metson.jpg'],
    'Skeena House': ['SkeenaHouse.png', 'Skeena.png', 'Skeena.jpg'],
    'Dodson Hotel': ['DodsonsRooms_1.png', 'Dodson.png', 'Dodson.jpg'],
    '162 Main St': ['162Main.png', '162Main.jpg'],
    '162 Main': ['162Main.png', '162Main.jpg'],
    'The Ryder': ['Ryder_1.png', 'Ryder.png', 'Ryder.jpg'],
  };
  
  // Path-based mappings
  const pathMappings: Record<string, string[]> = {
    '1060howe': ['Metsons.jpg', '1060howe.jpg', 'Metson.jpg'],
    'metson': ['Metsons.jpg', 'Metson.png', 'Metson.jpg'],
    'skeena': ['SkeenaHouse.png', 'Skeena.png'],
    'jubilee': ['Jubilee-Sign.jpg', 'Jubilee.png'],
    'kwas': ['Kwas.png'],
    'maternity': ['Maternity.png'],
    'modularfactory': ['ModularFactory.jpg'],
    'modularhomes': ['ModularHomes.png'],
    '626alexander': ['626Alexander.jpg', '626Alexander.png'],
    '179main': ['179Main.png', '626Alexander.jpg'],
    'dodsonsrooms': ['DodsonsRooms_1.png'],
    '162main': ['162Main.png'],
    'ryder': ['Ryder_1.png'],
    'merritt': ['Merritt.png', 'Merritt.jpg', 'ModularHomes.png'],
  };
  
  // Try exact title match first
  let imageFiles: string[] = [];
  if (titleMappings[normalizedTitle]) {
    imageFiles = titleMappings[normalizedTitle];
  } else {
    // Try case-insensitive partial matches
    for (const [key, value] of Object.entries(titleMappings)) {
      const keyLower = key.toLowerCase();
      if (titleLower.includes(keyLower) || keyLower.includes(titleLower)) {
        imageFiles = value;
        break;
      }
    }
  }
  
  // If we found title-based mappings, return URLs for all of them
  if (imageFiles.length > 0) {
    return imageFiles.map(filename => {
      const { data } = supabase.storage.from('portfolio-images').getPublicUrl(filename);
      return data.publicUrl;
    });
  }
  
  // Otherwise, use the database path with fallback logic
  if (databasePath) {
    if (databasePath.startsWith('http://') || databasePath.startsWith('https://')) {
      return [databasePath];
    }
    
    let cleanPath = databasePath.trim();
    const normalizedPath = cleanPath.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    if (pathMappings[normalizedPath]) {
      return pathMappings[normalizedPath].map(filename => {
        const { data } = supabase.storage.from('portfolio-images').getPublicUrl(filename);
        return data.publicUrl;
      });
    }
    
    if (!cleanPath.includes('.')) {
      return ['.png', '.jpg'].map(ext => {
        const { data } = supabase.storage.from('portfolio-images').getPublicUrl(cleanPath + ext);
        return data.publicUrl;
      });
    }
    
    const { data } = supabase.storage.from('portfolio-images').getPublicUrl(cleanPath);
    return [data.publicUrl];
  }
  
  return [];
}

/**
 * Gets the correct image URL based on project title and database path
 * Maps project titles to actual bucket filenames, handles both URLs and paths
 * Includes fallback logic for title variations and multiple filename attempts
 */
function getImageUrlForProject(projectTitle: string, databasePath: string | null): string | null {
  if (!databasePath && !projectTitle) return null;
  
  // Normalize title for matching (case-insensitive, trim whitespace)
  const normalizedTitle = projectTitle?.trim() || '';
  const titleLower = normalizedTitle.toLowerCase();
  
  // Title-based mappings to actual bucket files with fallback options
  // Each entry is an array of filenames to try in order
  const titleMappings: Record<string, string[]> = {
    'Jubilee Rooms': ['Jubilee-Sign.jpg', 'Jubilee.png', 'Jubilee.jpg'],
    'Kwas House': ['Kwas.png', 'Kwas.jpg'],
    'Anhart Sustainable Villages': ['Maternity.png', 'Maternity.jpg'],
    'Modular Homes Factory': ['ModularFactory.jpg', 'ModularFactory.png'],
    'Modular Villages': ['ModularHomes.png', 'ModularHomes.jpg'],
    'Merritt Village': ['Merritt.png', 'Merritt.jpg', 'ModularHomes.png'], // Try Merritt files first
    'Merritt Townhomes': ['Merritt.png', 'Merritt.jpg', 'ModularHomes.png'], // Alternative title
    'Merritt': ['Merritt.png', 'Merritt.jpg', 'ModularHomes.png'],
    '179 Main & 626 Alexander': ['626Alexander.jpg', '179Main.png', '626Alexander.png'], // Multiple fallbacks
    '179 Main': ['179Main.png', '626Alexander.jpg', '626Alexander.png'], // Partial title match
    '626 Alexander': ['626Alexander.jpg', '626Alexander.png', '179Main.png'], // Partial title match
    'Metson Rooms': ['Metsons.jpg', '1060howe.jpg', 'Metson.png', 'Metson.jpg'],
    'Skeena House': ['SkeenaHouse.png', 'Skeena.png', 'Skeena.jpg'],
    'Dodson Hotel': ['DodsonsRooms_1.png', 'Dodson.png', 'Dodson.jpg'],
    '162 Main St': ['162Main.png', '162Main.jpg'],
    '162 Main': ['162Main.png', '162Main.jpg'], // Alternative without "St"
    'The Ryder': ['Ryder_1.png', 'Ryder.png', 'Ryder.jpg'],
  };
  
  // Path-based mappings for database paths (normalized)
  const pathMappings: Record<string, string[]> = {
    '1060howe': ['Metsons.jpg', '1060howe.jpg', 'Metson.jpg'],
    'metson': ['Metsons.jpg', 'Metson.png', 'Metson.jpg'],
    'skeena': ['SkeenaHouse.png', 'Skeena.png'],
    'jubilee': ['Jubilee-Sign.jpg', 'Jubilee.png'],
    'kwas': ['Kwas.png'],
    'maternity': ['Maternity.png'],
    'modularfactory': ['ModularFactory.jpg'],
    'modularhomes': ['ModularHomes.png'],
    '626alexander': ['626Alexander.jpg', '626Alexander.png'],
    '179main': ['179Main.png', '626Alexander.jpg'],
    'dodsonsrooms': ['DodsonsRooms_1.png'],
    '162main': ['162Main.png'],
    'ryder': ['Ryder_1.png'],
    'merritt': ['Merritt.png', 'Merritt.jpg', 'ModularHomes.png'],
  };
  
  // Try exact title match first
  let imageFiles: string[] = [];
  if (titleMappings[normalizedTitle]) {
    imageFiles = titleMappings[normalizedTitle];
  } else {
    // Try case-insensitive partial matches
    for (const [key, value] of Object.entries(titleMappings)) {
      const keyLower = key.toLowerCase();
      if (titleLower.includes(keyLower) || keyLower.includes(titleLower)) {
        imageFiles = value;
        break;
      }
    }
  }
  
  // If we found title-based mappings, use the first one (browser will handle fallback via onError)
  if (imageFiles.length > 0) {
    const { data } = supabase.storage.from('portfolio-images').getPublicUrl(imageFiles[0]);
    return data.publicUrl;
  }
  
  // Otherwise, use the database path with fallback logic
  if (databasePath) {
    // If it's already a full URL, return as-is
    if (databasePath.startsWith('http://') || databasePath.startsWith('https://')) {
      return databasePath;
    }
    
    // Clean the path
    let cleanPath = databasePath.trim();
    
    // Try path-based mapping first
    const normalizedPath = cleanPath.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (pathMappings[normalizedPath]) {
      const { data } = supabase.storage.from('portfolio-images').getPublicUrl(pathMappings[normalizedPath][0]);
      return data.publicUrl;
    }
    
    // If path doesn't have extension, try common extensions
    if (!cleanPath.includes('.')) {
      const extensions = ['.png', '.jpg', '.jpeg'];
      for (const ext of extensions) {
        try {
          const { data } = supabase.storage.from('portfolio-images').getPublicUrl(cleanPath + ext);
          return data.publicUrl;
        } catch (error) {
          continue;
        }
      }
    }
    
    // Try the path as-is
    try {
      const { data } = supabase.storage.from('portfolio-images').getPublicUrl(cleanPath);
      return data.publicUrl;
    } catch (error) {
      console.warn(`Failed to construct URL for database path ${cleanPath}:`, error);
    }
  }
  
  return null;
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
  const [showFullPreview, setShowFullPreview] = useState(false);
  const [viewMode, setViewMode] = useState<'create' | 'list'>('list'); // New: view mode
  const [projects, setProjects] = useState<any[]>([]); // New: list of projects
  const [isLoadingProjects, setIsLoadingProjects] = useState(true); // New: loading state
  const [isLoadingEdit, setIsLoadingEdit] = useState(false); // Loading state for editing
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null); // New: editing state
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load projects list
  useEffect(() => {
    loadProjects();
  }, []);

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
      setFormData({
        title: data.title || '',
        location: data.location || '',
        year: data.year || '',
        units: data.units?.toString() || '',
        status: data.status || 'in-planning',
        type: data.type || '',
        briefDescription: data.brief_description || '',
        comprehensiveDetails: data.comprehensive_details || '',
        highlights: normalizeHighlights(data.highlights) || [],
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

      const projectData = {
        title: formData.title,
        location: formData.location,
        year: formData.year || null,
        units: parseInteger(formData.units),
        status: formData.status,
        type: formData.type || null,
        brief_description: formData.briefDescription,
        comprehensive_details: formData.comprehensiveDetails || null,
        highlights: formData.highlights.length > 0 ? formData.highlights : null, // Stored as JSON array in database
        image_url: formData.imageUrl || null,
        display_order: parseIntegerWithDefault(formData.displayOrder, 0),
        is_featured: formData.isFeatured || false,
        created_by: user.id,
      };
      
      // Note: highlights is stored as a JSON array (text[] or jsonb) in Supabase
      // The database will automatically handle the array format

      let error;
      if (editingProjectId) {
        // Update existing project - don't include created_by on updates
        const { created_by, ...updateData } = projectData;
        const { error: updateError } = await supabase
          .from("portfolio")
          .update(updateData)
          .eq('id', editingProjectId);
        error = updateError;
      } else {
        // Insert new project - include created_by
        const { error: insertError } = await supabase
          .from("portfolio")
          .insert([projectData]);
        error = insertError;
      }

      if (error) {
        console.error("Save error:", error);
        // Show the generated code for manual addition if database doesn't exist
        const projectCode = generateProjectCode();
        alert(
          `Database error: ${error.message}\n\nHere's the project data to add manually:\n\n${projectCode}`
        );
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
                {formData.imageUrl ? (
                  <div className="relative w-full h-full">
                    <img
                      src={formData.imageUrl}
                      alt="Project preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => setFormData((prev) => ({ ...prev, imageUrl: "" }))}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
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

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., Jubilee Rooms"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
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
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      placeholder="e.g., 2024"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
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
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Project Type
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="">Select type...</option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <div className="flex gap-2">
                      {statusOptions.map((option) => (
                        <label
                          key={option.value}
                          className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all border-2 text-sm ${
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Display Order
                    </label>
                    <input
                      type="number"
                      name="displayOrder"
                      value={formData.displayOrder}
                      onChange={handleChange}
                      placeholder="0"
                      min="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Lower numbers appear first. Default: 0
                    </p>
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="isFeatured"
                      checked={formData.isFeatured}
                      onChange={handleChange}
                      className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Featured Project
                    </span>
                  </label>
                  <p className="text-xs text-gray-500 mt-1 ml-7">
                    Featured projects may be highlighted on the homepage or portfolio page
                  </p>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Comprehensive Details <span className="text-gray-400">(for modal view)</span>
                  </label>
                  <textarea
                    name="comprehensiveDetails"
                    value={formData.comprehensiveDetails}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Detailed information about the project, including development goals, community impact, and unique features..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  />
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
                    {formData.imageUrl ? (
                      <img
                        src={formData.imageUrl}
                        alt={formData.title || "Project preview"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
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

              {/* Toggle Full Preview Button */}
              <button
                onClick={() => setShowFullPreview(!showFullPreview)}
                className="w-full mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" />
                {showFullPreview ? "Hide" : "Show"} Modal Preview
              </button>
            </div>

            {/* Modal Preview */}
            {showFullPreview && (
              <div className="bg-white p-6 rounded-xl shadow">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Modal Preview</h2>

                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  {/* Modal Header */}
                  <div className="bg-gray-50 p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-gray-900">Project Details</h3>
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <X className="w-4 h-4 text-gray-500" />
                      </div>
                    </div>
                  </div>

                  {/* Modal Content */}
                  <div className="p-4 space-y-4">
                    {/* Image */}
                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      {formData.imageUrl ? (
                        <img
                          src={formData.imageUrl}
                          alt={formData.title || "Project"}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Building className="w-12 h-12 text-gray-300" />
                        </div>
                      )}
                    </div>

                    {/* Project Info */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-xl font-bold text-gray-900 mb-2">
                            {formData.title || "Project Title"}
                          </h4>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
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
                          {formData.units && (
                            <div className="flex items-center gap-1 text-base font-bold text-indigo-600 mt-2">
                              <Users className="w-5 h-5" />
                              <span>{formData.units} Units</span>
                            </div>
                          )}
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded-md font-medium ${getStatusBadge(formData.status)}`}
                        >
                          {formData.status}
                        </span>
                      </div>

                      {/* Project Overview */}
                      <div className="mb-4">
                        <h5 className="font-semibold text-gray-900 mb-2">Project Overview:</h5>
                        <p className="text-gray-600 text-sm">
                          {formData.briefDescription ||
                            "Project overview description will appear here..."}
                        </p>
                      </div>

                      {/* Detailed Information */}
                      {formData.comprehensiveDetails && (
                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2">Detailed Information:</h5>
                          <p className="text-gray-600 text-sm">{formData.comprehensiveDetails}</p>
                        </div>
                      )}

                      {/* Highlights */}
                      {formData.highlights.length > 0 && (
                        <div className="border-2 border-red-500 rounded-lg p-4 mt-4">
                          <h5 className="font-semibold text-gray-900 mb-2">Key Highlights:</h5>
                          <ul className="space-y-1">
                            {formData.highlights.map((highlight, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-2 text-sm text-gray-600"
                              >
                                <span className="text-red-500 font-bold">•</span>
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}





