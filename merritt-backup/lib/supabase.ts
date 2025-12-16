/**
 * Supabase Client Configuration
 * 
 * Creates and exports a Supabase client instance for use throughout the application.
 * Handles authentication, database operations, and storage (for image uploads).
 */

import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://riuihzcnzhoglvziwhlq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpdWloemNuemhvZ2x2eml3aGxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0OTQ4NzQsImV4cCI6MjA4MTA3MDg3NH0.WpCHGgFdU3aWPAcnqQWfo5PeJ2D5dDXEs7TY7P9B5OA';

// Create and export Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Upload image to Supabase Storage
 * 
 * @param file - The file to upload
 * @param path - The path in the storage bucket (e.g., 'listings/image-name.jpg')
 * @param bucket - The storage bucket name (default: 'listings')
 * @returns Promise with the public URL of the uploaded image
 */
export async function uploadImage(
  file: File,
  path: string,
  bucket: string = 'listings'
): Promise<{ url: string; error: null } | { url: null; error: string }> {
  try {
    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Upload error:', error);
      // If bucket doesn't exist, provide helpful error message
      if (error.message.includes('Bucket not found') || error.message.includes('not found')) {
        return { 
          url: null, 
          error: 'Storage bucket not found. Please create a "listings" bucket in Supabase Storage.' 
        };
      }
      return { url: null, error: error.message };
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return { url: publicUrl, error: null };
  } catch (error: any) {
    console.error('Upload exception:', error);
    return { url: null, error: error?.message || 'Failed to upload image' };
  }
}

/**
 * Delete image from Supabase Storage
 * 
 * @param path - The path of the image to delete
 * @param bucket - The storage bucket name (default: 'listings')
 */
export async function deleteImage(
  path: string,
  bucket: string = 'listings'
): Promise<{ success: boolean; error: string | null }> {
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: 'Failed to delete image' };
  }
}

