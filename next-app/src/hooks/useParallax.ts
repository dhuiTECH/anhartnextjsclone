import { useEffect, RefObject } from "react";

interface UseParallaxOptions {
  /**
   * Ref to the video element that will move at a different rate
   */
  videoRef: RefObject<HTMLVideoElement>;
  /**
   * Ref to the content element that will move at a different rate
   */
  contentRef: RefObject<HTMLElement>;
  /**
   * Whether parallax should be enabled (typically false on mobile)
   */
  enabled: boolean;
  /**
   * Multiplier for video movement rate (negative moves up)
   * @default -0.5
   */
  videoRate?: number;
  /**
   * Multiplier for content movement rate (positive moves down)
   * @default 0.15
   */
  contentRate?: number;
  /**
   * Height multiplier for the hero section (0-1)
   * @default 0.85
   */
  heroHeightMultiplier?: number;
}

/**
 * Custom hook for parallax scrolling effect
 * 
 * Applies parallax transform to video and content elements based on scroll position.
 * Uses requestAnimationFrame for optimal performance.
 * 
 * @param options - Configuration options for parallax effect
 * 
 * @example
 * ```tsx
 * const videoRef = useRef<HTMLVideoElement>(null);
 * const contentRef = useRef<HTMLDivElement>(null);
 * const isMobile = useIsMobile();
 * 
 * useParallax({
 *   videoRef,
 *   contentRef,
 *   enabled: !isMobile,
 * });
 * ```
 */
export const useParallax = ({
  videoRef,
  contentRef,
  enabled,
  videoRate = -0.5,
  contentRate = 0.15,
  heroHeightMultiplier = 0.85,
}: UseParallaxOptions) => {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    let rafId: number | null = null;

    const handleScroll = () => {
      // Cancel any pending animation frame
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }

      // Batch DOM reads and writes using requestAnimationFrame
      rafId = requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        const heroHeight = window.innerHeight * heroHeightMultiplier;

        if (scrolled <= heroHeight) {
          const videoTransform = scrolled * videoRate;
          const contentTransform = scrolled * contentRate;

          // Batch all DOM writes together
          if (videoRef.current) {
            videoRef.current.style.transform = `translateY(${videoTransform}px)`;
          }
          if (contentRef.current) {
            contentRef.current.style.transform = `translateY(${contentTransform}px)`;
          }
        }
        rafId = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [enabled, videoRef, contentRef, videoRate, contentRate, heroHeightMultiplier]);
};

