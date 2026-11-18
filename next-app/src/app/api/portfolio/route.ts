import { NextResponse } from 'next/server';
import { getPortfolioProjects } from '@/lib/portfolio-data';

/**
 * Cached portfolio JSON for client pages.
 * Serves from Next.js data cache so browsers hit this app, not Supabase, on every load.
 */
export async function GET() {
  try {
    const projects = await getPortfolioProjects();
    return NextResponse.json(projects, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error in /api/portfolio:', error);
    return NextResponse.json([], { status: 500 });
  }
}
