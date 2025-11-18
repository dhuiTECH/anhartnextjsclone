import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import AdminClientWrapper from './AdminClientWrapper';
import type { Database } from '@/integrations/supabase/types';

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

  return <AdminClientWrapper user={user} />;
}
