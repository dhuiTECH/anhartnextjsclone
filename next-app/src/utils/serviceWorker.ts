/**
 * Utility functions for managing service workers
 * Helps prevent caching issues by unregistering stale service workers
 */

export async function unregisterServiceWorkers(): Promise<void> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return;
  }

  try {
    const registrations = await navigator.serviceWorker.getRegistrations();
    
    for (const registration of registrations) {
      // Unregister all service workers
      const unregistered = await registration.unregister();
      if (unregistered) {
        console.log('Service worker unregistered:', registration.scope);
      }
    }

    // Clear all caches
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
      console.log('All caches cleared');
    }
  } catch (error) {
    console.error('Error unregistering service workers:', error);
  }
}

/**
 * Unregister service workers on page load if needed
 * Call this in a useEffect on mount to clean up stale service workers
 */
export function useServiceWorkerCleanup() {
  if (typeof window === 'undefined') {
    return;
  }

  // Only run in development or if explicitly enabled
  const shouldCleanup = process.env.NODE_ENV === 'development' || 
    process.env.NEXT_PUBLIC_CLEANUP_SW === 'true';

  if (shouldCleanup) {
    // Run cleanup after a short delay to ensure page is loaded
    setTimeout(() => {
      unregisterServiceWorkers().catch(console.error);
    }, 1000);
  }
}

