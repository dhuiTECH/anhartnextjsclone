'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Building } from 'lucide-react';

interface ImageWithFallbackProps {
  imagePath: string | null;
  projectTitle: string;
  alt: string;
  className?: string;
}

/**
 * Constructs the full image URL from a storage path or returns URL as-is
 * Relies on database having correct image_url values
 */
function getImageUrl(imagePath: string | null): string | null {
  if (!imagePath) return null;
  
  const cleanPath = imagePath.trim();
  
  // Already a full URL - return as-is
  if (cleanPath.startsWith('http://') || cleanPath.startsWith('https://')) {
    return cleanPath;
  }
  
  // Construct Supabase storage URL
  const { data } = supabase.storage.from('portfolio-images').getPublicUrl(cleanPath);
  return data.publicUrl;
}

/**
 * ImageWithFallback - Displays project images with graceful error handling
 * 
 * Uses database image_url directly - no hardcoded fallback mappings.
 * If image fails to load, shows placeholder with building icon.
 */
export default function ImageWithFallback({ 
  imagePath, 
  projectTitle, 
  alt, 
  className = '' 
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);
  
  const imageUrl = getImageUrl(imagePath);
  
  if (hasError || !imageUrl) {
    return (
      <div className={`w-full aspect-video bg-muted flex items-center justify-center rounded-lg ${className}`}>
        <div className="text-center">
          <Building className="h-16 w-16 text-muted-foreground mx-auto mb-2" />
          <span className="text-sm text-muted-foreground block">{projectTitle}</span>
        </div>
      </div>
    );
  }
  
  return (
    <img
      src={imageUrl}
      alt={alt}
      className={className}
      style={{ aspectRatio: '16/9' }}
      loading="lazy"
      onError={() => setHasError(true)}
    />
  );
}
