'use client';

import React, { useState, useMemo } from 'react';
import { ImageService } from '@/services/imageService';
import { ImageSize, ImageFormat, ImageCategory } from '@/types/images';
import { Skeleton } from '@/components/ui/skeleton';
import { imageRegistry } from '@/assets/registry';

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

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
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
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [forceVisible, setForceVisible] = useState(false);

  // Get configuration from category with defaults
  const config = ImageService.getImageConfig(category) || {
    sizes: '(max-width: 768px) 100vw, 50vw',
    priority: false,
    loading: 'lazy' as const,
    aspectRatio: '16/9'
  };
  
  // Use provided props or fall back to config
  const finalAspectRatio = aspectRatio || config.aspectRatio;
  const finalSizes = sizes || config.sizes;
  const finalPriority = priority || config.priority;
  const finalLoading = loading || config.loading;

  // Safety timeout: force image to be visible after 2 seconds even if onLoad doesn't fire
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (!isLoaded && !hasError) {
        console.warn(`Image ${imageName} load event didn't fire, making visible anyway`);
        setForceVisible(true);
      }
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [imageName, isLoaded, hasError]);

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

  // Get image dimensions from registry for proper aspect ratio and layout stability
  const imageDimensions = useMemo(() => {
    const image = imageRegistry[imageName];
    if (!image || !image.dimensions) return null;
    
    // Get dimensions for the selected size, fallback to lg if not available
    const dims = image.dimensions[size] || image.dimensions.lg || image.dimensions.md || image.dimensions.sm;
    return dims || null;
  }, [imageName, size]);

  // Calculate width and height for the img element
  const imgWidth = imageDimensions?.width || 1280;
  const imgHeight = imageDimensions?.height || 720;

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
      <picture>
        {/* WebP format (good compression, wide support) */}
        <source
          type="image/webp"
          srcSet={webpSrcSet}
          sizes={finalSizes}
        />
        
        {/* Fallback image with proper dimensions for LCP optimization */}
        <img
          src={fallbackSrc}
          alt={alt}
          width={imgWidth}
          height={imgHeight}
          loading={finalPriority ? 'eager' : finalLoading}
          onLoad={handleLoad}
          onError={handleError}
          className="w-full h-full object-cover"
          style={{ aspectRatio: finalAspectRatio }}
          decoding="async"
          fetchPriority={finalPriority ? 'high' : 'auto'}
        />
      </picture>
    </div>
  );
};

export default OptimizedImage;