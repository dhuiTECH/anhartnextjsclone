"use client";

import DashboardClient from './DashboardClient';
import type { User } from '@supabase/supabase-js';

interface AdminClientWrapperProps {
  user: User;
}

export default function AdminClientWrapper({ user }: AdminClientWrapperProps) {
  return <DashboardClient user={user} />;
}

