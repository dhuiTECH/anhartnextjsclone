import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import MemberClient from './MemberClient';

export const dynamic = 'force-dynamic';

export default async function MemberDashboard() {
  const cookieStore = await cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return <p className="p-8">Redirecting to login...</p>;

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  
  if (profile?.role !== 'member') {
    return <p className="p-8 text-red-600">Access denied: Member only. Your role: {profile?.role || 'none'}</p>;
  }

  const { data: files } = await supabase.storage.from('member-files').list('', { limit: 100 });
  const cleanFiles = files?.filter(f => !f.name.startsWith('.')) || [];

  return <MemberClient user={user} files={cleanFiles} />;
}
