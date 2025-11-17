"use client";

import { useEffect, useRef, useState } from "react";

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
          size?: "normal" | "compact" | "invisible";
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

    // Otherwise, wait for script to load
    const interval = setInterval(() => {
      if (checkTurnstile()) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isLoaded || !containerRef.current || widgetIdRef.current) {
      return;
    }

    try {
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
        size,
      });

      widgetIdRef.current = widgetId;
    } catch (error) {
      console.error("Error rendering Turnstile:", error);
    }

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch (error) {
          console.error("Error removing Turnstile:", error);
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
  
  return (
    <div
      ref={containerRef}
      className={isInvisible ? "hidden" : className}
      data-sitekey={siteKey}
    />
  );
};

