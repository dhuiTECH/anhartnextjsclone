/**
 * Common Type Definitions
 * 
 * This file contains shared TypeScript interfaces and types used across
 * multiple components in the application. This helps maintain consistency
 * and reduces code duplication.
 */

import { LucideIcon } from 'lucide-react';

/**
 * Base interface for all modal components
 */
export interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Staff member data structure
 */
export interface StaffMember {
  name: string;
  role: string;
  bio: string;
  isLeadership: boolean;
  email?: string;
  emailDomain?: string; // Custom email domain (defaults to 'anhart.ca')
  phone?: string;
  location?: string;
  department?: string;
  startDate?: string;
  linkedin?: string;
}

/**
 * Value/feature item with icon and description
 */
export interface ValueItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

/**
 * Media item for galleries and media sections
 */
export interface MediaItem {
  id: number;
  type: 'video' | 'image' | 'document';
  title: string;
  description: string;
  date: string;
  thumbnail?: string;
  url?: string;
  youtubeUrl?: string;
}

/**
 * PDF document structure
 */
export interface PdfDocument {
  id: number;
  title: string;
  description: string;
  date: string;
  pages: number;
  size: string;
  url: string;
}

/**
 * Press release/article structure
 */
export interface PressRelease {
  id: number;
  title: string;
  source: string;
  date: string;
  excerpt: string;
  type: 'external' | 'modal';
  url?: string;
  fullText?: string;
}

/**
 * Status types used across the application
 */
export type StatusType = 'completed' | 'in-progress' | 'planned' | 'cancelled';

/**
 * Content position options for hero banners
 */
export type ContentPosition = 'left' | 'center' | 'right';
