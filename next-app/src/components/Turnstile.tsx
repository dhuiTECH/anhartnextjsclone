"use client";

import { useEffect, useRef, useState } from "react";
import { logger } from "@/utils/logger";

declare global {
  interface Window {
    turnstile: {
      render: (
        element: HTMLElement,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
          size?: "normal" | "compact" | "flexible";
        }
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

interface TurnstileProps {
  siteKey: string;
  onSuccess: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
  theme?: "light" | "dark" | "auto";
  size?: "normal" | "compact" | "invisible";
  className?: string;
}

export const Turnstile = ({
  siteKey,
  onSuccess,
  onError,
  onExpire,
  theme = "auto",
  size = "normal",
  className = "",
}: TurnstileProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Store callbacks in refs to prevent re-renders when they change
  const onSuccessRef = useRef(onSuccess);
  const onErrorRef = useRef(onError);
  const onExpireRef = useRef(onExpire);
  
  // Update refs when callbacks change
  useEffect(() => {
    onSuccessRef.current = onSuccess;
    onErrorRef.current = onError;
    onExpireRef.current = onExpire;
  }, [onSuccess, onError, onExpire]);

  useEffect(() => {
    // Check if Turnstile script is loaded
    const checkTurnstile = () => {
      if (window.turnstile) {
        setIsLoaded(true);
        return true;
      }
      return false;
    };

    // If already loaded, set state
    if (checkTurnstile()) {
      return;
    }

    // Try to load the script if it's not already in the DOM
    // Add cache-busting query parameter to prevent stale script issues
    const existingScript = document.querySelector('script[src*="turnstile"]');
    if (!existingScript) {
      const script = document.createElement('script');
      // Add cache-busting timestamp to prevent stale script caching
      const cacheBuster = Date.now();
      script.src = `https://challenges.cloudflare.com/turnstile/v0/api.js?cb=${cacheBuster}`;
      script.async = true;
      script.crossOrigin = 'anonymous';
      // Prevent caching of the script
      script.setAttribute('data-no-cache', 'true');
      script.onload = () => {
        if (window.turnstile) {
          setIsLoaded(true);
        }
      };
      script.onerror = () => {
        logger.error("Failed to load Turnstile script", new Error("Script load failed"), { component: "Turnstile" });
        // Retry once after a short delay
        setTimeout(() => {
          const retryScript = document.createElement('script');
          retryScript.src = `https://challenges.cloudflare.com/turnstile/v0/api.js?cb=${Date.now()}`;
          retryScript.async = true;
          retryScript.crossOrigin = 'anonymous';
          retryScript.setAttribute('data-no-cache', 'true');
          retryScript.onload = () => {
            if (window.turnstile) {
              setIsLoaded(true);
            }
          };
          document.body.appendChild(retryScript);
        }, 1000);
      };
      document.body.appendChild(script);
    } else {
      // Script exists, but check if it's actually loaded
      if (window.turnstile) {
        setIsLoaded(true);
      } else {
        // Script tag exists but not loaded - remove and reload with cache-busting
        existingScript.remove();
        const script = document.createElement('script');
        const cacheBuster = Date.now();
        script.src = `https://challenges.cloudflare.com/turnstile/v0/api.js?cb=${cacheBuster}`;
        script.async = true;
        script.crossOrigin = 'anonymous';
        script.setAttribute('data-no-cache', 'true');
        script.onload = () => {
          if (window.turnstile) {
            setIsLoaded(true);
          }
        };
        document.body.appendChild(script);
      }
    }

    // Otherwise, wait for script to load (with timeout)
    let attempts = 0;
    const maxAttempts = 100; // 10 seconds max wait
    const interval = setInterval(() => {
      attempts++;
      if (checkTurnstile()) {
        clearInterval(interval);
      } else if (attempts >= maxAttempts) {
        clearInterval(interval);
        logger.error("Turnstile script failed to load within timeout", new Error("Timeout"), { component: "Turnstile" });
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isLoaded || !containerRef.current) {
      return;
    }

    // Clean up existing widget if it exists (e.g., when props change)
    if (widgetIdRef.current && window.turnstile) {
      try {
        window.turnstile.remove(widgetIdRef.current);
      } catch (error) {
        logger.error("Error removing existing Turnstile", error, { component: "Turnstile" });
      }
      widgetIdRef.current = null;
    }

    try {
      // Convert "invisible" to "compact" for the API (smaller footprint for hidden widgets)
      // but keep visual hiding via CSS
      const apiSize = size === "invisible" ? "compact" : size;
      
      const widgetId = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        callback: (token: string) => {
          onSuccessRef.current?.(token);
        },
        "error-callback": () => {
          onErrorRef.current?.();
        },
        "expired-callback": () => {
          onExpireRef.current?.();
        },
        theme,
        size: apiSize,
      });

      widgetIdRef.current = widgetId;
    } catch (error) {
      logger.error("Error rendering Turnstile", error, { component: "Turnstile" });
    }

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch (error) {
          logger.error("Error removing Turnstile", error, { component: "Turnstile" });
        }
        widgetIdRef.current = null;
      }
    };
  }, [isLoaded, siteKey, theme, size]); // Removed callbacks from dependencies

  const reset = () => {
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
    }
  };

  // Expose reset function via ref if needed
  useEffect(() => {
    if (containerRef.current) {
      (containerRef.current as any).resetTurnstile = reset;
    }
  }, []);

  // For invisible mode, hide the container completely
  const isInvisible = size === "invisible";
  
  // Show loading state if script hasn't loaded yet
  if (!isLoaded && !isInvisible) {
    return (
      <div className={`flex items-center justify-center min-h-[65px] ${className}`}>
        <div className="text-sm text-gray-500">Loading verification...</div>
      </div>
    );
  }
  
  return (
    <div
      ref={containerRef}
      className={isInvisible ? "hidden" : className}
      data-sitekey={siteKey}
    />
  );
};

