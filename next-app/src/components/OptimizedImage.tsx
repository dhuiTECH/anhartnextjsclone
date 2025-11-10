'use client';

import React, { useState, useMemo } from 'react';
import { ImageService } from '@/services/imageService';
import { ImageSize, ImageFormat, ImageCategory } from '@/types/images';
import { Skeleton } from '@/components/ui/skeleton';

interface OptimizedImageProps {
  imageName: string;
  alt: string;
  category?: ImageCategory;
  format?: ImageFormat;
  size?: ImageSize;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  aspectRatio?: string;
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const OptimizedImage: React.FC<{
  children?: React.ReactNode;
}> = ({
  imageName,
  alt,
  category = 'project',
  format = 'webp',
  size = 'lg',
  className = '',
  loading = 'lazy',
  priority = false,
  aspectRatio,
  sizes,
  onLoad,
  onError,
  children
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Get configuration from category
  const config = ImageService.getImageConfig(category);
  
  // Use provided props or fall back to config
  const finalAspectRatio = aspectRatio || config.aspectRatio;
  const finalSizes = sizes || config.sizes;
  const finalPriority = priority || config.priority;
  const finalLoading = loading || config.loading;

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Generate srcSet for responsive images
  const webpSrcSet = useMemo(() => ImageService.getImageSrcSet(imageName, 'webp'), [imageName]);
  const avifSrcSet = useMemo(() => ImageService.getImageSrcSet(imageName, 'avif'), [imageName]);
  const fallbackSrc = useMemo(() => ImageService.getImageSrc(imageName, 'fallback', size), [imageName, size]);

  // Check if image exists
  if (!ImageService.hasImage(imageName)) {
    console.warn(`Image ${imageName} not found in registry`);
    return (
      <div className={`relative overflow-hidden bg-gray-100 flex items-center justify-center ${className}`}>
        <span className="text-sm text-gray-500">Image not found</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && !hasError && (
        <Skeleton 
          className="absolute inset-0" 
        />
      )}
      
      <picture>
        {/* AVIF format (best compression) */}
        <source
          type="image/avif"
          srcSet={avifSrcSet}
          sizes={finalSizes}
        />
        
        {/* WebP format (good compression, wide support) */}
        <source
          type="image/webp"
          srcSet={webpSrcSet}
          sizes={finalSizes}
        />
        
        {/* Fallback image */}
        <img
          src={hasError ? '/placeholder.svg' : fallbackSrc}
          alt={alt}
          loading={finalPriority ? 'eager' : finalLoading}
          onLoad={handleLoad}
          onError={handleError}
          className={`transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } w-full h-full object-cover`}
          style={{ aspectRatio: finalAspectRatio }}
          decoding="async"
          fetchPriority={finalPriority ? 'high' : 'auto'}
        />
      </picture>
    </div>
  );
};

export default OptimizedImage;