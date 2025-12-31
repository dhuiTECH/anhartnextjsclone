'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Building } from 'lucide-react';

interface ImageWithFallbackProps {
  imagePath: string | null;
  projectTitle: string;
  alt: string;
  className?: string;
}

/**
 * Gets alternative paths based on project title
 * Handles both full URLs and storage paths (including portfolio/ prefix)
 */
function getImagePaths(projectTitle: string, originalPath: string | null): string[] {
  const titleMappings: Record<string, string[]> = {
    'Jubilee Rooms': ['Jubilee-Sign.jpg', 'Jubilee.png', 'Jubilee.jpg'],
    'Kwas House': ['Kwas.png', 'Kwas.jpg'],
    'Anhart Sustainable Villages': ['Maternity.png', 'Maternity.jpg'],
    'Modular Homes Factory': ['ModularFactory.jpg', 'ModularFactory.png'],
    'Modular Villages': ['ModularHomes.png', 'ModularHomes.jpg'],
    'Merritt Village': ['ModularHomes.png', 'Merritt.png', 'Merritt.jpg'],
    '179 Main & 626 Alexander': ['626Alexander.jpg', '179Main.png', '626Alexander.png'],
    'Metson Rooms': ['Metsons.jpg', '1060howe.jpg', 'Metson.png', 'Metson.jpg'],
    'Skeena House': ['SkeenaHouse.png', 'Skeena.png', 'Skeena.jpg'],
    'Dodson Hotel': ['DodsonsRooms_1.png', 'Dodson.png', 'Dodson.jpg'],
    '162 Main St': ['162Main.png', '162Main.jpg'],
    'The Ryder': ['Ryder_1.png', 'Ryder.png', 'Ryder.jpg'],
  };
  
  // If we have a title mapping, use it
  if (titleMappings[projectTitle]) {
    return titleMappings[projectTitle];
  }
  
  // Otherwise, generate from original path
  if (!originalPath) return [];
  
  let cleanPath = originalPath.trim();
  
  // If it's a full URL, extract the path from it
  if (cleanPath.startsWith('http://') || cleanPath.startsWith('https://')) {
    // Extract path from Supabase storage URL
    // URL format: https://...supabase.co/storage/v1/object/public/portfolio-images/path/to/file.png
    const urlMatch = cleanPath.match(/\/portfolio-images\/(.+)$/);
    if (urlMatch) {
      cleanPath = decodeURIComponent(urlMatch[1]); // Extract and decode the path after portfolio-images/
    } else {
      // If we can't extract, return the full URL as-is (it should work)
      return [cleanPath];
    }
  }
  
  // Now we have the storage path (e.g., "portfolio/portfolio-176720438604.png" or just "SkeenaHouse.png")
  
  // If path already includes portfolio/ prefix, use it as-is and also try without prefix
  if (cleanPath.startsWith('portfolio/')) {
    const withoutPrefix = cleanPath.replace(/^portfolio\//, '');
    if (cleanPath.includes('.')) {
      // Has extension - try with and without prefix
      return [cleanPath, withoutPrefix];
    }
    // No extension - try both with and without prefix, with extensions
    return [
      `${cleanPath}.png`,
      `${cleanPath}.jpg`,
      `${withoutPrefix}.png`,
      `${withoutPrefix}.jpg`
    ];
  }
  
  // Path doesn't have portfolio/ prefix
  if (cleanPath.includes('.')) {
    // Has extension - try as-is and with portfolio/ prefix
    return [cleanPath, `portfolio/${cleanPath}`];
  }
  
  // No extension, try both with and without portfolio/ prefix
  return [
    `${cleanPath}.png`,
    `${cleanPath}.jpg`,
    `portfolio/${cleanPath}.png`,
    `portfolio/${cleanPath}.jpg`
  ];
}

export default function ImageWithFallback({ imagePath, projectTitle, alt, className = '' }: ImageWithFallbackProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);
  
  const paths = getImagePaths(projectTitle, imagePath);
  
  useEffect(() => {
    if (paths.length === 0) {
      setHasError(true);
      return;
    }
    
    // Construct URL for current path
    const currentPath = paths[currentIndex];
    
    // If it's already a full URL, use it directly
    if (currentPath.startsWith('http://') || currentPath.startsWith('https://')) {
      setImageUrl(currentPath);
      setHasError(false);
      return;
    }
    
    // Otherwise, construct the Supabase storage URL
    const { data } = supabase.storage.from('portfolio-images').getPublicUrl(currentPath);
    setImageUrl(data.publicUrl);
    setHasError(false);
  }, [currentIndex, paths]);
  
  const handleError = () => {
    console.log(`Image failed to load: ${imageUrl}, trying next path...`);
    if (currentIndex < paths.length - 1) {
      // Try next path
      setCurrentIndex(currentIndex + 1);
    } else {
      // All paths failed
      setHasError(true);
    }
  };
  
  if (hasError || paths.length === 0) {
    return (
      <div className={`w-full aspect-video bg-muted flex items-center justify-center rounded-lg ${className}`}>
        <div className="text-center">
          <Building className="h-16 w-16 text-muted-foreground mx-auto mb-2" />
          <span className="text-sm text-muted-foreground block">Image not found</span>
          <span className="text-xs text-yellow-600 block mt-1">Tried: {paths.join(', ')}</span>
        </div>
      </div>
    );
  }
  
  return (
    <img
      src={imageUrl || ''}
      alt={alt}
      className={className}
      style={{ aspectRatio: '16/9' }}
      loading="eager"
      onError={handleError}
      onLoad={() => {
        console.log(`Image loaded successfully: ${imageUrl} (path: ${paths[currentIndex]})`);
      }}
    />
  );
}


