import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import dynamic from 'next/dynamic';
import type { Database } from '@/integrations/supabase/types';

// Dynamically import AdminClient to prevent TipTap/ProseMirror from being bundled in main chunks
// This reduces the main bundle size by ~150KB+ since TipTap is only needed on admin pages
const AdminClient = dynamic(() => import('./AdminClient'), {
  ssr: false, // Admin dashboard is client-side only
  loading: () => <p className="p-8">Loading admin dashboard...</p>,
});

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {}
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return <p className="p-8">Redirecting to login...</p>;

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (profile?.role !== 'admin') return <p className="p-8 text-red-600">Access denied: Admin only.</p>;

  return <AdminClient user={user} />;
}
