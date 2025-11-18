'use client';

/**
 * Image Service
 * 
 * Centralized service for handling optimized image loading,
 * format selection, and responsive image generation.
 */

import { imageRegistry, imageConfigs } from '@/assets/registry';
import { ImageSize, ImageFormat, ImageCategory } from '@/types/images';

export class ImageService {
  /**
   * Helper to extract string URL from Next.js static import or string
   */
  private static getUrlString(value: any): string {
    if (typeof value === 'string') {
      return value;
    }
    if (value && typeof value === 'object' && 'src' in value) {
      return value.src;
    }
    return String(value || '');
  }

  /**
   * Get image source for specific format and size
   */
  static getImageSrc(
    imageName: string, 
    format: ImageFormat = 'fallback', 
    size: ImageSize = 'lg'
  ): string {
    const image = imageRegistry[imageName];
    if (!image) {
      console.warn(`Image ${imageName} not found in registry`);
      return '';
    }
    
    if (format === 'fallback') {
      return this.getUrlString(image.fallback);
    }
    
    return this.getUrlString(image[format][size]);
  }

  /**
   * Generate responsive srcSet for all sizes
   */
  static getImageSrcSet(imageName: string, format: ImageFormat = 'webp'): string {
    const image = imageRegistry[imageName];
    if (!image) {
      console.warn(`Image ${imageName} not found in registry`);
      return '';
    }
    
    if (format === 'avif') {
      console.warn(`AVIF format not supported in registry, falling back to webp for ${imageName}`);
      format = 'webp';
    }
    
    const variants = image[format];
    if (!variants) {
      console.warn(`Format ${format} not found for image ${imageName}, using fallback`);
      return this.getUrlString(image.fallback);
    }
    
    if (typeof variants === 'string') {
      return this.getUrlString(variants);
    }
    
    const srcSetParts = [];
    // Use actual image dimensions from registry for accurate width descriptors
    if (variants.sm && image.dimensions.sm) {
      srcSetParts.push(`${this.getUrlString(variants.sm)} ${image.dimensions.sm.width}w`);
    }
    if (variants.md && image.dimensions.md) {
      srcSetParts.push(`${this.getUrlString(variants.md)} ${image.dimensions.md.width}w`);
    }
    if (variants.lg && image.dimensions.lg) {
      srcSetParts.push(`${this.getUrlString(variants.lg)} ${image.dimensions.lg.width}w`);
    }
    if (variants.xl && image.dimensions.xl) {
      srcSetParts.push(`${this.getUrlString(variants.xl)} ${image.dimensions.xl.width}w`);
    }
    
    return srcSetParts.join(', ');
  }

  /**
   * Get image configuration by category
   */
  static getImageConfig(category: ImageCategory) {
    return imageConfigs[category];
  }

  /**
   * Check if image exists in registry
   */
  static hasImage(imageName: string): boolean {
    return imageName in imageRegistry;
  }

  /**
   * Get all available images by category
   */
  static getImagesByCategory(category: ImageCategory): string[] {
    // This is a simplified implementation
    // In a real app, you might want to tag images with categories
    const categoryImages: Record<ImageCategory, string[]> = {
      hero: [
        'about-hero', 'contact-hero', 'impact-hero', 'media-hero',
        'partner-hero', 'partner-hero-friendly', 'portfolio-hero',
        'programs-hero', 'research-hero'
      ],
      project: [
        '162Main', '162Main_2', 'DodsonsRooms_1', 'Meritt_TH_1',
        'Ryder_1', 'Ryder_2', 'ModularH_1', 'AFS_1'
      ],
      portfolio: [
        'Jubilee-Sign', 'affordapartment', 'KLanding', 'TheOppenhiemer',
        'skeena', '179Main', '1060howe'
      ],
      initiative: [
        'sustainable-homes-initiative', 'affordable-living-complex', 'urban-renewal-project'
      ],
      logo: []
    };
    
    return categoryImages[category] || [];
  }

  /**
   * Preload critical images
   */
  static preloadImage(
    imageName: string, 
    format: ImageFormat = 'webp', 
    size: ImageSize = 'lg'
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const src = this.getImageSrc(imageName, format, size);
      if (!src) {
        reject(new Error(`Image ${imageName} not found`));
        return;
      }

      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Failed to load image ${src}`));
      img.src = src;
    });
  }

  /**
   * Preload multiple images
   */
  static async preloadImages(
    images: Array<{ name: string; format?: ImageFormat; size?: ImageSize }>
  ): Promise<void> {
    const promises = images.map(({ name, format = 'webp', size = 'lg' }) =>
      this.preloadImage(name, format, size)
    );
    
    try {
      await Promise.all(promises);
    } catch (error) {
      console.warn('Some images failed to preload:', error);
    }
  }

  /**
   * Get optimal image format based on browser support
   */
  static getOptimalFormat(): ImageFormat {
    // Check for AVIF support
    if (typeof window !== 'undefined') {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        try {
          const dataURL = canvas.toDataURL('image/avif');
          if (dataURL && dataURL.indexOf('data:image/avif') === 0) {
            return 'avif';
          }
        } catch (e) {
          // AVIF not supported
        }
      }
      
      // Check for WebP support
      try {
        const dataURL = canvas.toDataURL('image/webp');
        if (dataURL && dataURL.indexOf('data:image/webp') === 0) {
          return 'webp';
        }
      } catch (e) {
        // WebP not supported
      }
    }
    
    return 'fallback';
  }

  /**
   * Generate responsive image data for a specific image
   */
  static getResponsiveImageData(imageName: string) {
    const image = imageRegistry[imageName];
    if (!image) {
      return null;
    }

    return {
      webp: {
        srcSet: this.getImageSrcSet(imageName, 'webp'),
        fallback: image.webp.lg, // Use large as fallback
      },
      avif: {
        srcSet: this.getImageSrcSet(imageName, 'avif'),
        fallback: image.avif.lg, // Use large as fallback
      },
      fallback: image.fallback,
    };
  }
}
