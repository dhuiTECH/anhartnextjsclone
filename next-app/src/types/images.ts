'use client';

/**
 * Image Types and Interfaces
 * 
 * Type definitions for the optimized image system including
 * image formats, sizes, categories, and configuration.
 */

export type ImageSize = 'sm' | 'md' | 'lg' | 'xl';
export type ImageFormat = 'webp' | 'avif' | 'fallback';
export type ImageCategory = 'hero' | 'project' | 'portfolio' | 'initiative' | 'logo';

export interface ImageVariants {
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface ImageFormats {
  webp: ImageVariants;
  avif: ImageVariants;
  fallback: string;
}

export interface ImageConfig {
  category: ImageCategory;
  aspectRatio: string;
  sizes: string;
  priority: boolean;
  loading: 'lazy' | 'eager';
}

export interface OptimizedImageProps {
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
