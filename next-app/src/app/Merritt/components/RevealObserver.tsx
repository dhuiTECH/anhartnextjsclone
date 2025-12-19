'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Client component that sets up IntersectionObserver for reveal animations
 * This must be a client component because it uses browser APIs
 * 
 * Re-initializes on route changes to ensure reveal animations work on
 * client-side navigation within the Merritt section.
 */
export default function RevealObserver() {
  const pathname = usePathname();
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Function to check and activate visible elements immediately
    const activateVisibleElements = () => {
      const merrittWrapper = document.querySelector('.merritt-wrapper');
      if (!merrittWrapper) return;

      const revealElements = merrittWrapper.querySelectorAll('.reveal');
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        // Check if element is visible in viewport (with some margin for better detection)
        const isVisible = (
          rect.top < viewportHeight + 100 && // 100px margin below viewport
          rect.bottom > -100 && // 100px margin above viewport
          rect.left < viewportWidth + 100 && // 100px margin right of viewport
          rect.right > -100 // 100px margin left of viewport
        );

        if (isVisible) {
          el.classList.add('active');
        }
      });
    };

    // Cleanup previous observer if it exists
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create new IntersectionObserver for scroll-triggered animations
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '100px' // Trigger slightly before element enters viewport
    });

    const observer = observerRef.current;

    // Wait for DOM to be fully ready, then activate visible elements
    const initialize = (retryCount = 0) => {
      // Use requestAnimationFrame to ensure DOM is ready after route change
      requestAnimationFrame(() => {
        // Scope to .merritt-wrapper to match the CSS scoping
        const merrittWrapper = document.querySelector('.merritt-wrapper');
        if (!merrittWrapper) {
          // If wrapper not found, try again after a short delay (up to 10 retries)
          if (retryCount < 10) {
            setTimeout(() => initialize(retryCount + 1), 50);
          }
          return;
        }

        // First, immediately activate all visible elements
        activateVisibleElements();

        // Then set up observer for remaining elements
        const revealElements = merrittWrapper.querySelectorAll('.reveal');
        revealElements.forEach(el => {
          // Only observe elements that aren't already active
          if (!el.classList.contains('active')) {
            observer.observe(el);
          }
        });
      });
    };

    // Small delay to ensure page content has rendered after route change
    const timeoutId = setTimeout(() => {
      initialize();
    }, 10);

    // Also activate on window load (in case images or other content loads later)
    const handleLoad = () => {
      activateVisibleElements();
    };
    window.addEventListener('load', handleLoad);

    // Cleanup
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('load', handleLoad);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [pathname]); // Re-run on route changes

  return null; // This component doesn't render anything
}

