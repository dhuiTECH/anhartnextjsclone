'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Building } from 'lucide-react';

interface ImageWithFallbackProps {
  imagePath: string | null;
  projectTitle: string;
  alt: string;
  className?: string;
}

/**
 * Builds a public image URL. Relative paths are treated as on-site assets
 * (or storage keys already resolved to full URLs in the DB).
 */
function getImageUrl(imagePath: string | null): string | null {
  if (!imagePath) return null;

  const cleanPath = imagePath.trim();
  if (!cleanPath) return null;

  if (cleanPath.startsWith('http://') || cleanPath.startsWith('https://')) {
    return cleanPath;
  }

  if (cleanPath.startsWith('/')) {
    return cleanPath;
  }

  // Storage object key → public URL (prefer env project URL)
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (base) {
    return `${base}/storage/v1/object/public/portfolio-images/${cleanPath.replace(/^\//, '')}`;
  }

  return null;
}

function isOptimizableRemote(url: string): boolean {
  try {
    const host = new URL(url).hostname;
    return (
      host.endsWith('.supabase.co') ||
      host === 'anhart.ca' ||
      host === 'www.anhart.ca' ||
      host === 'images.unsplash.com'
    );
  } catch {
    return false;
  }
}

/**
 * Displays project images via next/image when possible so bytes are served
 * from the app CDN (not repeatedly from Supabase Storage).
 */
export default function ImageWithFallback({
  imagePath,
  projectTitle,
  alt,
  className = '',
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

  const useNextImage = imageUrl.startsWith('/') || isOptimizableRemote(imageUrl);

  if (useNextImage) {
    return (
      <div className={`relative w-full aspect-video overflow-hidden rounded-lg ${className}`}>
        <Image
          src={imageUrl}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          loading="lazy"
          onError={() => setHasError(true)}
        />
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
