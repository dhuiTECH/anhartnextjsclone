"use client";

import dynamic from 'next/dynamic';
import type { User } from '@supabase/supabase-js';

// Dynamically import ArticleCreation to prevent TipTap/ProseMirror from being bundled in main chunks
const ArticleCreation = dynamic(() => import('./page-client'), {
  ssr: false,
  loading: () => <p className="p-8">Loading article editor...</p>,
});

interface ArticleCreationWrapperProps {
  user: User;
}

export default function ArticleCreationWrapper({ user }: ArticleCreationWrapperProps) {
  return <ArticleCreation user={user} />;
}

