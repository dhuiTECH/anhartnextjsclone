'use client';

import { useState } from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from '@/hooks/useAuth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export function Providers({ children }: { children: React.ReactNode }) {
  // Create QueryClient in useState to ensure it's only created once on the client
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  }));

  return (
    <TooltipProvider>
      <QueryClientProvider client={queryClient}>
        // HelmetProvider removed - Next.js handles head content without providers<AuthProvider>
          {children}
        </AuthProvider>
      </QueryClientProvider>
    </TooltipProvider>
  );
}