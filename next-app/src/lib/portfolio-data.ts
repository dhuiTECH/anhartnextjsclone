/**
 * Portfolio Data Utility
 * 
 * Fetches portfolio projects from Supabase with fallback to hardcoded data.
 * This allows for a smooth migration from hardcoded to database-driven content.
 */

import { supabase } from '@/lib/supabase';
import { ProjectData } from '@/types/project';
import { portfolioDetailedProjects } from '@/data/portfolio-detailed';

export interface PortfolioProjectRow {
  id: string;
  title: string;
  location: string;
  year: string | null;
  completion_date: string | null;
  units: number | null;
  status: 'completed' | 'in-progress' | 'in-planning';
  type: string | null;
  brief_description: string;
  comprehensive_details: string | null;
  highlights: string[] | string | null; // Can be array, string (with | separator), or null
  image_url: string | null;
  image: string | null;
  display_order: number | null;
  created_at: string;
  updated_at: string;
}

/**
 * Normalizes highlights to always be an array of strings
 * Handles: string arrays, pipe-separated strings, JSON strings, null/undefined
 */
function normalizeHighlights(highlights: string[] | string | null | undefined): string[] | undefined {
  if (!highlights) {
    return undefined;
  }

  // If it's already an array, return it
  if (Array.isArray(highlights)) {
    return highlights.filter(h => h && typeof h === 'string' && h.trim() !== '');
  }

  // If it's a string, try to parse it
  if (typeof highlights === 'string') {
    const trimmed = highlights.trim();
    if (trimmed === '') {
      return undefined;
    }

    // Try parsing as JSON first (in case it's a JSON string)
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed.filter(h => h && typeof h === 'string' && h.trim() !== '');
      }
    } catch {
      // Not JSON, continue to other parsing methods
    }

    // Check if it's pipe-separated (from CSV)
    if (trimmed.includes('|')) {
      return trimmed
        .split('|')
        .map(h => h.trim())
        .filter(h => h !== '');
    }

    // If it's a single string, return as single-item array
    return [trimmed];
  }

  return undefined;
}

/**
 * Converts a database row to ProjectData format
 */
function convertRowToProjectData(row: PortfolioProjectRow): ProjectData {
  return {
    id: parseInt(row.id.split('-')[0], 16) || Date.now(), // Convert UUID to number for compatibility
    title: row.title,
    location: row.location,
    year: row.year || undefined,
    completion_date: row.completion_date || undefined,
    units: row.units || undefined,
    status: row.status,
    type: row.type || undefined,
    description: row.brief_description, // Map brief_description to description
    briefDescription: row.brief_description,
    comprehensiveDetails: row.comprehensive_details || undefined,
    image: row.image_url || row.image || undefined,
    highlights: normalizeHighlights(row.highlights),
  };
}

/**
 * Fetches portfolio projects from Supabase
 * Falls back to hardcoded data if database is empty or unavailable
 */
export async function getPortfolioProjects(): Promise<ProjectData[]> {
  try {
    const { data, error } = await supabase
      .from('portfolio')
      .select('*')
      .order('display_order', { ascending: true, nullsFirst: false })
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Error fetching portfolio projects from database:', error);
      // Fall back to hardcoded data
      return portfolioDetailedProjects;
    }

    // If database is empty, use hardcoded data
    if (!data || data.length === 0) {
      console.log('No portfolio projects in database, using hardcoded data');
      return portfolioDetailedProjects;
    }

    // Convert database rows to ProjectData format
    return data.map(convertRowToProjectData);
  } catch (error) {
    console.error('Error fetching portfolio projects:', error);
    // Fall back to hardcoded data on any error
    return portfolioDetailedProjects;
  }
}

/**
 * Fetches a single portfolio project by ID
 */
export async function getPortfolioProjectById(id: number | string): Promise<ProjectData | null> {
  try {
    // Try to find in database first
    const { data, error } = await supabase
      .from('portfolio')
      .select('*')
      .eq('id', id.toString())
      .single();

    if (!error && data) {
      return convertRowToProjectData(data);
    }

    // Fall back to hardcoded data
    return portfolioDetailedProjects.find(p => p.id === id) || null;
  } catch (error) {
    console.error('Error fetching portfolio project:', error);
    // Fall back to hardcoded data
    return portfolioDetailedProjects.find(p => p.id === id) || null;
  }
}

