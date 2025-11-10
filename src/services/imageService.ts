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
      return image.fallback;
    }
    
    return image[format][size];
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
    
    const variants = image[format];
    if (typeof variants === 'string') {
      return variants;
    }
    
    return [
      `${variants.sm} 640w`,
      `${variants.md} 768w`,
      `${variants.lg} 1024w`,
      `${variants.xl} 1280w`,
    ].join(', ');
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
