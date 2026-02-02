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
        defaultOptions: { 
          queries: { 
            staleTime: 60 * 1000, // Consider data fresh for 1 min to reduce egress
            gcTime: 5 * 60 * 1000, // Keep in cache for 5 minutes
            refetchOnWindowFocus: true,
            refetchOnMount: true,
            retry: 3,
          } 
        },
      }),
  );

  // ALWAYS clean up stale service workers to prevent caching issues
  // This runs on every page load to ensure users get fresh code
  useEffect(() => {
    // Clean up service workers to prevent stale code issues
    const timer = setTimeout(() => {
      unregisterServiceWorkers().catch(console.error);
    }, 1000);
    return () => clearTimeout(timer);
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
