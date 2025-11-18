"use client";

import dynamic from 'next/dynamic';
import type { User } from '@supabase/supabase-js';

// Dynamically import AdminClient to prevent TipTap/ProseMirror from being bundled in main chunks
// This reduces the main bundle size by ~150KB+ since TipTap is only needed on admin pages
// Using ssr: false ensures it only loads on the client side
const AdminClient = dynamic(() => import('./AdminClient'), {
  ssr: false, // Admin dashboard is client-side only
  loading: () => <p className="p-8">Loading admin dashboard...</p>,
});

interface AdminClientWrapperProps {
  user: User;
}

export default function AdminClientWrapper({ user }: AdminClientWrapperProps) {
  return <AdminClient user={user} />;
}

