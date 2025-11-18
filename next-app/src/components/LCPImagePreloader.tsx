/**
 * LCP Image Preloader Component
 * 
 * Optimizes Largest Contentful Paint (LCP) by adding preload links
 * in the HTML head for critical images. This makes images more discoverable
 * by the browser's HTML parser, allowing earlier resource hints.
 * 
 * Best practices implemented:
 * - Preload LCP images with fetchpriority="high"
 * - Support for responsive images with srcset
 * - WebP format preference with fallback
 * - Proper image dimensions for layout stability
 */

import { ImageService } from '@/services/imageService';

interface LCPImagePreloaderProps {
  /**
   * Image name from the registry
   */
  imageName: string;
  
  /**
   * Image format to preload (default: 'webp')
   */
  format?: 'webp' | 'fallback';
  
  /**
   * Image size to preload (default: 'lg' for above-the-fold)
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  
  /**
   * Whether to preload responsive srcset (default: true)
   */
  preloadSrcSet?: boolean;
  
  /**
   * Sizes attribute for responsive images
   */
  sizes?: string;
}

/**
 * LCPImagePreloader Component
 * 
 * Renders preload link tags for LCP images to improve discoverability.
 * Should be used in the <head> section or via Next.js metadata API.
 */
export function LCPImagePreloader({
  imageName,
  format = 'webp',
  size = 'lg',
  preloadSrcSet = true,
  sizes = '100vw'
}: LCPImagePreloaderProps) {
  if (!ImageService.hasImage(imageName)) {
    console.warn(`LCPImagePreloader: Image ${imageName} not found in registry`);
    return null;
  }

  const imageSrc = ImageService.getImageSrc(imageName, format, size);
  const webpSrcSet = preloadSrcSet ? ImageService.getImageSrcSet(imageName, 'webp') : null;
  const fallbackSrc = ImageService.getImageSrc(imageName, 'fallback', size);

  return (
    <>
      {/* Preload WebP format (preferred) */}
      {format === 'webp' && webpSrcSet && (
        <link
          rel="preload"
          as="image"
          href={imageSrc}
          imageSrcSet={webpSrcSet}
          imageSizes={sizes}
          fetchPriority="high"
        />
      )}
      
      {/* Preload fallback format if WebP is not the primary format */}
      {format === 'fallback' && (
        <link
          rel="preload"
          as="image"
          href={fallbackSrc}
          fetchPriority="high"
        />
      )}
      
      {/* DNS prefetch for image domain (if external) */}
      {imageSrc.startsWith('http') && (
        <link
          rel="dns-prefetch"
          href={new URL(imageSrc).origin}
        />
      )}
    </>
  );
}

/**
 * Helper function to generate preload links as metadata for Next.js App Router
 * Use this in page metadata or layout metadata
 */
export function generateLCPPreloadLinks(
  imageName: string,
  options?: {
    format?: 'webp' | 'fallback';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    sizes?: string;
  }
) {
  if (!ImageService.hasImage(imageName)) {
    return [];
  }

  const format = options?.format || 'webp';
  const size = options?.size || 'lg';
  const sizes = options?.sizes || '100vw';
  
  const imageSrc = ImageService.getImageSrc(imageName, format, size);
  const webpSrcSet = ImageService.getImageSrcSet(imageName, 'webp');
  const fallbackSrc = ImageService.getImageSrc(imageName, 'fallback', size);

  const links: Array<{
    rel: string;
    href: string;
    as?: string;
    fetchPriority?: string;
    imageSrcSet?: string;
    imageSizes?: string;
  }> = [];

  // Preload WebP with srcset for responsive images
  if (format === 'webp' && webpSrcSet) {
    links.push({
      rel: 'preload',
      href: imageSrc,
      as: 'image',
      fetchPriority: 'high',
      imageSrcSet: webpSrcSet,
      imageSizes: sizes,
    });
  }

  // Add DNS prefetch if external
  if (imageSrc.startsWith('http')) {
    const origin = new URL(imageSrc).origin;
    links.push({
      rel: 'dns-prefetch',
      href: origin,
    });
  }

  return links;
}

