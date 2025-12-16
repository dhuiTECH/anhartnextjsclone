'use client';

/**
 * Image Upload Component
 * 
 * Provides a file upload interface with preview functionality.
 * Handles image selection, preview display, and upload to Supabase Storage.
 * 
 * @param value - Current image URL
 * @param onChange - Callback when image URL changes
 * @param onUpload - Callback when upload starts/completes
 */

import React, { useState, useRef } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { uploadImage } from '../../../../lib/supabase';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  onUpload?: (uploading: boolean) => void;
}

export default function ImageUpload({ value, onChange, onUpload }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(value || null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * Handle file selection
   */
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      return;
    }

    setError(null);
    setUploading(true);
    onUpload?.(true);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to Supabase
    try {
      const timestamp = Date.now();
      const fileName = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const path = `listings/${fileName}`;

      const result = await uploadImage(file, path);

      if (result.error) {
        setError(result.error);
        setPreview(null);
      } else {
        onChange(result.url!); // Type assertion since we know url is string when error is null
        setError(null);
      }
    } catch (err) {
      setError('Failed to upload image');
      setPreview(null);
    } finally {
      setUploading(false);
      onUpload?.(false);
    }
  };

  /**
   * Handle remove image
   */
  const handleRemove = () => {
    setPreview(null);
    onChange('');
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  /**
   * Handle click on upload area
   */
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      {!preview ? (
        <div
          onClick={handleClick}
          className="relative border-2 border-dashed border-[#1a2621]/30 rounded-sm p-8 text-center cursor-pointer hover:border-[#a6906c] transition-colors group"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            disabled={uploading}
          />
          
          {uploading ? (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-8 h-8 text-[#a6906c] animate-spin" />
              <p className="text-sm text-[#1a2621]/60">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="bg-[#1a2621]/5 p-4 rounded-sm group-hover:bg-[#1a2621]/10 transition-colors">
                <Upload className="w-6 h-6 text-[#1a2621]" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#1a2621] mb-1">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-[#1a2621]/50">
                  PNG, JPG, GIF up to 5MB
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="relative">
          {/* Preview Image */}
          <div className="relative aspect-[4/3] overflow-hidden bg-gray-200 rounded-sm">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            {/* Remove Button */}
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 bg-white/90 hover:bg-white p-2 rounded-sm transition-colors shadow-lg"
              disabled={uploading}
            >
              <X className="w-4 h-4 text-[#1a2621]" />
            </button>
            {/* Uploading Overlay */}
            {uploading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              </div>
            )}
          </div>
          {/* Change Image Button */}
          <button
            type="button"
            onClick={handleClick}
            className="mt-2 text-xs uppercase tracking-widest text-[#1a2621]/60 hover:text-[#a6906c] transition-colors"
            disabled={uploading}
          >
            Change Image
          </button>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="text-xs text-red-600 bg-red-50 p-2 rounded-sm">
          {error}
        </div>
      )}

      {/* Manual URL Input (Fallback) */}
      <div className="pt-4 border-t border-[#1a2621]/10">
        <label className="block text-xs uppercase tracking-widest text-[#1a2621]/70 mb-2 font-bold">
          Or enter image URL directly
        </label>
        <input
          type="url"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setPreview(e.target.value || null);
          }}
          placeholder="https://images.unsplash.com/..."
          className="input-underlined placeholder-[#1a2621]/40 w-full"
        />
      </div>
    </div>
  );
}

