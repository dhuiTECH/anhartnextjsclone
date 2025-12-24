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

import { useState, useRef } from "react";
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

interface PortfolioManagerClientProps {
  user: User;
}

interface ProjectFormData {
  title: string;
  location: string;
  year: string;
  completion_date: string;
  units: string;
  status: "completed" | "in-progress" | "in-planning";
  type: string;
  briefDescription: string;
  comprehensiveDetails: string;
  highlights: string[];
  imageUrl: string;
}

const initialFormData: ProjectFormData = {
  title: "",
  location: "",
  year: "",
  completion_date: "",
  units: "",
  status: "in-planning",
  type: "",
  briefDescription: "",
  comprehensiveDetails: "",
  highlights: [],
  imageUrl: "",
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle form field changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      // Insert into Supabase database
      const { data, error } = await supabase.from("portfolio_projects").insert([
        {
          title: formData.title,
          location: formData.location,
          year: formData.year || null,
          completion_date: formData.completion_date || null,
          units: formData.units ? parseInt(formData.units) : null,
          status: formData.status,
          type: formData.type || null,
          brief_description: formData.briefDescription,
          comprehensive_details: formData.comprehensiveDetails || null,
          highlights: formData.highlights.length > 0 ? formData.highlights : null,
          image_url: formData.imageUrl || null,
          created_by: user.id,
        },
      ]);

      if (error) {
        console.error("Save error:", error);
        // Show the generated code for manual addition if database doesn't exist
        const projectCode = generateProjectCode();
        alert(
          `Database table may not exist. Here's the project data to add manually:\n\n${projectCode}`
        );
        return;
      }

      alert("Project saved successfully!");
      // Reset form
      setFormData(initialFormData);
    } catch (error) {
      console.error("Save error:", error);
      // Show the generated code for manual addition
      const projectCode = generateProjectCode();
      alert(`Error saving to database. Here's the project data:\n\n${projectCode}`);
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
  ${formData.completion_date ? `completion_date: "${formData.completion_date}",` : ""}
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
    }
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
          <h1 className="text-3xl font-bold text-indigo-700 mb-2">Portfolio Manager</h1>
          <p className="text-gray-600">Create and manage portfolio projects</p>
        </div>

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
                  Or enter image URL directly
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Completion Date
                    </label>
                    <input
                      type="text"
                      name="completion_date"
                      value={formData.completion_date}
                      onChange={handleChange}
                      placeholder="e.g., Q4 2024"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <div className="flex gap-3">
                    {statusOptions.map((option) => (
                      <label
                        key={option.value}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all border-2 ${
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
    </div>
  );
}




