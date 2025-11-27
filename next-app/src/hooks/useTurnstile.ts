import { useState, useCallback } from "react";

/**
 * Custom hook for managing Turnstile CAPTCHA state
 * 
 * Provides token state, reset functionality, and event handlers for Cloudflare Turnstile.
 * The hook manages the token state and provides a key for resetting the Turnstile widget.
 * 
 * @returns Object containing token, key, reset function, and event handlers
 * 
 * @example
 * ```tsx
 * const { token, key, reset, handlers } = useTurnstile();
 * 
 * <Turnstile
 *   siteKey="your-site-key"
 *   key={key}
 *   onSuccess={handlers.onSuccess}
 *   onError={handlers.onError}
 *   onExpire={handlers.onExpire}
 * />
 * 
 * // Reset after form submission
 * if (success) {
 *   reset();
 * }
 * ```
 */
export const useTurnstile = () => {
  const [token, setToken] = useState<string | null>(null);
  const [key, setKey] = useState(0);

  /**
   * Reset the Turnstile widget by incrementing the key
   * This forces React to unmount and remount the component
   */
  const reset = useCallback(() => {
    setToken(null);
    setKey((prev) => prev + 1);
  }, []);

  /**
   * Handlers for Turnstile events
   * All handlers are memoized to prevent unnecessary re-renders
   */
  const handlers = {
    onSuccess: useCallback((token: string) => {
      setToken(token);
    }, []),

    onError: useCallback(() => {
      setToken(null);
    }, []),

    onExpire: useCallback(() => {
      setToken(null);
    }, []),
  };

  return {
    token,
    key,
    reset,
    handlers,
  };
};

