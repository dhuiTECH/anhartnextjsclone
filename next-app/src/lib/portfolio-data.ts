/**
 * Portfolio Data Utility
 *
 * Fetches portfolio projects from Supabase database.
 * Database-only - no fallbacks to hardcoded data.
 * Server reads are cached via unstable_cache to cut egress.
 */

import { unstable_cache } from 'next/cache';
import { supabase } from '@/lib/supabase';
import { supabaseServer } from '@/lib/supabase-server';
import { ProjectData } from '@/types/project';
import { generateProjectSlug } from '@/lib/slug';

export interface PortfolioProjectRow {
  id: string;
  title: string;
  slug: string | null;
  location: string;
  year: string | null;
  completion_date: string | null;
  units: number | null;
  status: 'completed' | 'in-progress' | 'in-planning';
  type: string | null;
  brief_description: string;
  comprehensive_details: string | null;
  highlights: string[] | string | null;
  image_url: string | null;
  display_order: number | null;
  created_at: string;
  updated_at: string;
}

/** Columns needed for listings / cards (keeps payload small). */
export const PORTFOLIO_LIST_SELECT =
  'id, title, slug, location, year, completion_date, units, status, type, brief_description, highlights, image_url, display_order, created_at, updated_at';

/** Columns needed for a full project page. */
export const PORTFOLIO_DETAIL_SELECT =
  'id, title, slug, location, year, completion_date, units, status, type, brief_description, comprehensive_details, highlights, image_url, display_order, created_at, updated_at';

/**
 * Normalizes highlights to always be an array of strings
 */
function normalizeHighlights(highlights: string[] | string | null | undefined): string[] | undefined {
  if (!highlights) return undefined;

  if (Array.isArray(highlights)) {
    return highlights.filter(h => h && typeof h === 'string' && h.trim() !== '');
  }

  if (typeof highlights === 'string') {
    const trimmed = highlights.trim();
    if (!trimmed) return undefined;

    // Try JSON parse
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed.filter(h => h && typeof h === 'string');
      }
    } catch {
      // Not JSON
    }

    // Pipe-separated
    if (trimmed.includes('|')) {
      return trimmed.split('|').map(h => h.trim()).filter(Boolean);
    }

    return [trimmed];
  }

  return undefined;
}

/**
 * Converts a database row to ProjectData format
 */
function convertRowToProjectData(row: PortfolioProjectRow): ProjectData {
  // Handle UUID to numeric ID conversion
  let numericId: number;
  const idValue = row.id;
  
  if (typeof idValue === 'string' && idValue.includes('-')) {
    // UUID format - use first segment as hex
    numericId = parseInt(idValue.split('-')[0], 16) || Date.now();
  } else {
    numericId = parseInt(String(idValue), 10) || Date.now();
  }

  return {
    id: numericId,
    title: row.title,
    slug: row.slug || undefined,
    location: row.location,
    year: row.year || undefined,
    completion_date: row.completion_date || undefined,
    units: row.units || undefined,
    status: row.status,
    type: row.type || undefined,
    description: row.brief_description,
    briefDescription: row.brief_description,
    comprehensiveDetails: row.comprehensive_details || undefined,
    image: row.image_url || undefined,
    highlights: normalizeHighlights(row.highlights),
  };
}

// Client-side in-memory cache to reduce Supabase egress (TTL 30 min)
const PORTFOLIO_CACHE_TTL_MS = 30 * 60 * 1000;
let portfolioCache: { data: ProjectData[]; ts: number } | null = null;

async function fetchPortfolioProjectsFromDb(): Promise<ProjectData[]> {
  const { data, error } = await (supabaseServer as any)
    .from('portfolio')
    .select(PORTFOLIO_LIST_SELECT)
    .order('display_order', { ascending: true, nullsFirst: false })
    .order('created_at', { ascending: false });

  if (error || !data) {
    console.error('Error fetching portfolio projects:', error?.message);
    return [];
  }

  return data.map((row: PortfolioProjectRow) => convertRowToProjectData(row));
}

const getCachedPortfolioProjects = unstable_cache(
  fetchPortfolioProjectsFromDb,
  ['portfolio-projects-list'],
  { revalidate: 3600, tags: ['portfolio'] }
);

/**
 * Fetches portfolio projects from Supabase.
 * Server: Next.js data cache (1 hour). Browser: in-memory cache (30 min).
 */
export async function getPortfolioProjects(): Promise<ProjectData[]> {
  const isClient = typeof window !== 'undefined';
  if (isClient && portfolioCache && Date.now() - portfolioCache.ts < PORTFOLIO_CACHE_TTL_MS) {
    return portfolioCache.data;
  }

  try {
    if (!isClient) {
      return await getCachedPortfolioProjects();
    }

    const { data, error } = await (supabase as any)
      .from('portfolio')
      .select(PORTFOLIO_LIST_SELECT)
      .order('display_order', { ascending: true, nullsFirst: false })
      .order('created_at', { ascending: false });

    if (error || !data) {
      console.error('Error fetching portfolio projects:', error?.message);
      return [];
    }

    const projects = data.map((row: PortfolioProjectRow) => convertRowToProjectData(row));
    portfolioCache = { data: projects, ts: Date.now() };
    return projects;
  } catch (error) {
    console.error('Error fetching portfolio projects:', error);
    return [];
  }
}

/**
 * Fetches a single portfolio project by ID
 */
export async function getPortfolioProjectById(id: number | string): Promise<ProjectData | null> {
  try {
    const client = typeof window === 'undefined' ? supabaseServer : supabase;
    
    const { data, error } = await (client as any)
      .from('portfolio')
      .select(PORTFOLIO_DETAIL_SELECT)
      .eq('id', id.toString())
      .single();

    if (error || !data) return null;
    return convertRowToProjectData(data as PortfolioProjectRow);
  } catch (error) {
    console.error('Error fetching portfolio project:', error);
    return null;
  }
}

async function fetchPortfolioProjectBySlugFromDb(slug: string): Promise<ProjectData | null> {
  const { data: directMatch, error: directError } = await (supabaseServer as any)
    .from('portfolio')
    .select(PORTFOLIO_DETAIL_SELECT)
    .eq('slug', slug)
    .maybeSingle();

  if (!directError && directMatch) {
    return convertRowToProjectData(directMatch as PortfolioProjectRow);
  }

  // Fallback: only fetch slug+title rows, then one detail — avoid select(*) of full table
  const { data: slugRows, error } = await (supabaseServer as any)
    .from('portfolio')
    .select('id, title, slug')
    .order('display_order', { ascending: true, nullsFirst: false });

  if (error || !slugRows) return null;

  const match = slugRows.find(
    (row: { id: string; title: string; slug: string | null }) =>
      row.slug === slug || generateProjectSlug(row.title) === slug
  );
  if (!match) return null;

  const { data: detail, error: detailError } = await (supabaseServer as any)
    .from('portfolio')
    .select(PORTFOLIO_DETAIL_SELECT)
    .eq('id', match.id)
    .maybeSingle();

  if (detailError || !detail) return null;
  return convertRowToProjectData(detail as PortfolioProjectRow);
}

/**
 * Fetches a single portfolio project by slug (server-cached 1 hour).
 */
export async function getPortfolioProjectBySlug(slug: string): Promise<ProjectData | null> {
  try {
    if (typeof window === 'undefined') {
      return await unstable_cache(
        () => fetchPortfolioProjectBySlugFromDb(slug),
        ['portfolio-project', slug],
        { revalidate: 3600, tags: ['portfolio'] }
      )();
    }

    const { data: directMatch, error: directError } = await (supabase as any)
      .from('portfolio')
      .select(PORTFOLIO_DETAIL_SELECT)
      .eq('slug', slug)
      .maybeSingle();

    if (!directError && directMatch) {
      return convertRowToProjectData(directMatch as PortfolioProjectRow);
    }

    const projects = await getPortfolioProjects();
    return (
      projects.find(
        (p) => p.slug === slug || generateProjectSlug(p.title) === slug
      ) ?? null
    );
  } catch (error) {
    console.error('Error fetching portfolio project by slug:', error);
    return null;
  }
}
