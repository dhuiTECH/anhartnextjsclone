import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Generate a URL-safe slug from a title
 * - lowercase
 * - hyphen-separated
 * - no special characters
 */
function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')  // Remove special chars
    .replace(/\s+/g, '-')       // Replace spaces with hyphens
    .replace(/-+/g, '-')        // Replace multiple hyphens with single
    .replace(/^-|-$/g, '');     // Trim hyphens from ends
}

/**
 * API Route to generate slugs for all portfolio projects
 * POST /api/portfolio/generate-slugs
 * 
 * This is useful for:
 * 1. Initial migration to add slugs to existing records
 * 2. Regenerating slugs if titles change
 * 
 * Note: Requires database write permissions
 */
export async function POST(request: NextRequest) {
  try {
    // Create Supabase client with service role for write access
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Fetch all portfolio projects
    const { data: projects, error: fetchError } = await supabase
      .from('portfolio')
      .select('id, title, slug')
      .order('created_at', { ascending: true });
    
    if (fetchError) {
      return NextResponse.json(
        { error: `Failed to fetch projects: ${fetchError.message}` },
        { status: 500 }
      );
    }
    
    if (!projects || projects.length === 0) {
      return NextResponse.json(
        { message: 'No projects found', updated: 0 },
        { status: 200 }
      );
    }
    
    // Track used slugs to handle duplicates
    const usedSlugs = new Set<string>();
    const updates: { id: string; title: string; oldSlug: string | null; newSlug: string }[] = [];
    
    for (const project of projects) {
      // Skip if already has a valid slug
      if (project.slug && project.slug.trim() !== '') {
        usedSlugs.add(project.slug);
        continue;
      }
      
      // Generate base slug
      let baseSlug = slugify(project.title);
      let finalSlug = baseSlug;
      let counter = 1;
      
      // Handle duplicates by appending numbers
      while (usedSlugs.has(finalSlug)) {
        counter++;
        finalSlug = `${baseSlug}-${counter}`;
      }
      
      usedSlugs.add(finalSlug);
      updates.push({
        id: project.id,
        title: project.title,
        oldSlug: project.slug,
        newSlug: finalSlug
      });
    }
    
    // Update projects with new slugs
    const results = [];
    for (const update of updates) {
      const { error: updateError } = await supabase
        .from('portfolio')
        .update({ slug: update.newSlug })
        .eq('id', update.id);
      
      if (updateError) {
        results.push({
          id: update.id,
          title: update.title,
          success: false,
          error: updateError.message
        });
      } else {
        results.push({
          id: update.id,
          title: update.title,
          slug: update.newSlug,
          success: true
        });
      }
    }
    
    const successCount = results.filter(r => r.success).length;
    const failCount = results.filter(r => !r.success).length;
    
    return NextResponse.json({
      message: `Generated slugs for ${successCount} projects`,
      updated: successCount,
      failed: failCount,
      results
    });
    
  } catch (error) {
    console.error('Error generating slugs:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint to preview what slugs would be generated
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    const { data: projects, error } = await supabase
      .from('portfolio')
      .select('id, title, slug')
      .order('display_order', { ascending: true, nullsFirst: false })
      .order('created_at', { ascending: false });
    
    if (error) {
      return NextResponse.json(
        { error: `Failed to fetch projects: ${error.message}` },
        { status: 500 }
      );
    }
    
    // Generate preview of slugs
    const usedSlugs = new Set<string>();
    const preview = projects?.map(project => {
      const existingSlug = project.slug?.trim();
      
      if (existingSlug) {
        usedSlugs.add(existingSlug);
        return {
          id: project.id,
          title: project.title,
          currentSlug: existingSlug,
          newSlug: null,
          needsUpdate: false
        };
      }
      
      let baseSlug = slugify(project.title);
      let finalSlug = baseSlug;
      let counter = 1;
      
      while (usedSlugs.has(finalSlug)) {
        counter++;
        finalSlug = `${baseSlug}-${counter}`;
      }
      
      usedSlugs.add(finalSlug);
      
      return {
        id: project.id,
        title: project.title,
        currentSlug: null,
        newSlug: finalSlug,
        needsUpdate: true
      };
    }) || [];
    
    const needsUpdate = preview.filter(p => p.needsUpdate).length;
    
    return NextResponse.json({
      total: preview.length,
      needsUpdate,
      upToDate: preview.length - needsUpdate,
      projects: preview
    });
    
  } catch (error) {
    console.error('Error previewing slugs:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

