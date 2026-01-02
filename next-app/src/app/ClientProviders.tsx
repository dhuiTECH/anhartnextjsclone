"use client";

import { useState, useEffect } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/useAuth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { unregisterServiceWorkers } from "@/utils/serviceWorker";

export function ClientProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { staleTime: 60 * 1000 } },
      }),
  );

  // Clean up stale service workers on mount to prevent caching issues
  useEffect(() => {
    // Only run cleanup if explicitly enabled or in development
    // In production, the new service worker will handle updates automatically
    if (process.env.NEXT_PUBLIC_CLEANUP_SW === 'true' || process.env.NODE_ENV === 'development') {
      // Delay cleanup to ensure page is fully loaded
      const timer = setTimeout(() => {
        unregisterServiceWorkers().catch(console.error);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <TooltipProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </QueryClientProvider>
    </TooltipProvider>
  );
}
