"use client";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import anhartLogoWebp from "@/assets/anhart-logo.webp";
import anhartLogoPng from "@/assets/anhart-logo.png";
import { ScrollAnimationWrapper } from "@/components/animations/ScrollAnimationWrapper";
import { useRef, useState } from "react";
import { useParallax } from "@/hooks/useParallax";
import { useIsMobile } from "@/hooks/use-mobile";
import { logger } from "@/utils/logger";
import { useScroll, useTransform, motion } from "framer-motion";

const anhartLogoWebpSrc =
  typeof anhartLogoWebp === "string"
    ? anhartLogoWebp
    : anhartLogoWebp?.src || "";
const anhartLogoPngSrc =
  typeof anhartLogoPng === "string" ? anhartLogoPng : anhartLogoPng?.src || "";

// Marquee animation styles - optimized for performance
// On mobile: start with text visible sooner (0% = left edge) so "Check out our featured project..." appears right away
const marqueeStyle = `
  @keyframes marquee {
    0% { transform: translate3d(100%, 0, 0); }
    100% { transform: translate3d(-100%, 0, 0); }
  }
  @keyframes marquee-mobile {
    0% { transform: translate3d(0%, 0, 0); }
    100% { transform: translate3d(-100%, 0, 0); }
  }
  .animate-marquee {
    animation: marquee 18s linear infinite;
    will-change: transform;
  }
  @media (max-width: 767px) {
    .animate-marquee {
      animation-name: marquee-mobile;
      animation-duration: 18s;
    }
  }
`;

export const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const isMobile = useIsMobile();
  const [videoError, setVideoError] = useState(false);

  // Apply parallax effect (disabled on mobile)
  useParallax({
    videoRef,
    contentRef,
    enabled: !isMobile,
    videoRate: -0.5,
    contentRate: 0.15,
    heroHeightMultiplier: 0.85,
  });

  // Scroll-based opacity fade for promotional banner - fades out as user scrolls down
  const { scrollYProgress } = useScroll();
  // Banner fades from full opacity at top to 0 opacity as user scrolls through first 5% of page (very aggressive fade)
  const bannerOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0], { clamp: true });

  return (
    <section
      className="relative h-[85vh] sm:h-[95vh] w-full overflow-hidden" // ADJUST THIS: Original heights—change percentages for size (e.g., 90vh for medium)
      aria-label="Hero section with affordable housing information"
    >
      {/* Moving Banner Carousel - Performance Optimized */}
      <style dangerouslySetInnerHTML={{ __html: marqueeStyle }} />
      <motion.div 
        className="absolute top-0 left-0 right-0 z-40 flex items-center min-h-[2rem] bg-primary text-white overflow-hidden border-b border-primary/90"
        style={{ opacity: bannerOpacity }}
      >
        <div className="animate-marquee whitespace-nowrap py-1">
          <Link
            href="/Merritt"
            className="inline-flex items-center hover:bg-primary/80 transition-colors duration-300 px-4 rounded"
          >
            <span className="font-semibold hover:underline">Check out our featured project, Anhart Merritt</span>
          </Link>
          <span className="mx-32">•</span>
          <Link
            href="/Merritt"
            className="inline-flex items-center hover:bg-primary/80 transition-colors duration-300 px-4 rounded"
          >
            <span className="font-semibold hover:underline">Check out our featured project, Anhart Merritt</span>
          </Link>
        </div>
      </motion.div>
      {/* Anhart logo as backdrop with WebP/PNG fallback */}
      <picture className="absolute inset-0 z-0 flex items-center justify-center opacity-30 pointer-events-none">
        <source srcSet={anhartLogoWebpSrc} type="image/webp" />
        <img
          src={anhartLogoPngSrc}
          alt=""
          className="w-full h-full object-contain object-center"
          aria-hidden="true"
          loading="lazy"
          fetchPriority="low"
          width="1200"
          height="600"
          style={{ 
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
            opacity: 0.3
          }}
        />
      </picture>
      {/* Fallback background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/70 to-primary/90 z-[0.5]" />
      {/* Full-screen background video with extended height for parallax */}
      {/* Optimized for LCP: Use poster image and lazy load video to improve initial page load */}
      <video
        ref={videoRef}
        className={`absolute top-0 left-0 w-full h-full object-cover z-[1] ${videoError ? "hidden" : ""}`}
        style={{
          height: isMobile ? "100vh" : "150vh", // ADJUST THIS: Original 150vh on desktop for parallax—reduce to 130vh if too tall
          minHeight: isMobile ? "100vh" : "150vh",
          objectFit: "cover",
        }}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster=""
        aria-label="Background video showing housing development animation"
        onError={() => {
          logger.warn("Hero background video failed to load, using fallback gradient", {
            component: "Hero",
          });
          setVideoError(true);
        }}
      >
        <source src="/mediaAssets/hero-background-video.mp4" type="video/mp4" />
      </video>
      {/* Fallback gradient background when video fails to load */}
      {videoError && (
        <div
          className="absolute top-0 left-0 w-full z-[1]"
          style={{
            height: isMobile ? "100vh" : "150vh",
            minHeight: isMobile ? "100vh" : "150vh",
            background:
              "linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)",
          }}
          aria-hidden="true"
        />
      )}
      {/* Centered content container */}
      <div
        ref={contentRef}
        className="relative z-30 h-lvh flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 bg-black/20 rounded-lg py-4"
      >
        <div className="text-center">
          <ScrollAnimationWrapper direction="top" delay={100}>
            <h1 className="text-4xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl font-bold tracking-tight text-white mb-2 sm:mb-4 [text-shadow:_0_4px_16px_rgba(0,0,0,0.8)]">
              Plan Your Housing Project for Free
            </h1>
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper direction="top" delay={200}>
            <p className="text-base sm:text-xl md:text-2xl lg:text-3xl text-white font-light bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] tracking-wider">
              Instant development estimates and data-driven feasibility.
            </p>
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper direction="top" delay={250}>
            <h2 className="text-xs sm:text-base md:text-base lg:text-xl font-semibold text-white/60 mb-6 [text-shadow:_0_2px_8px_rgba(0,0,0,0.7)]">
              Free pre-development consultations across Canada.
            </h2>
          </ScrollAnimationWrapper>
          {/* Single CTA button - width fits text */}
          <div className="mt-8 sm:mt-12 flex justify-center">
            <ScrollAnimationWrapper direction="bottom" delay={300}>
              <Link href="/tdce?view=simplified">
                <Button
                  name="Start Your Estimate"
                  size="lg"
                  variant="outline"
                  className="bg-primary/65 backdrop-blur-md text-white hover:bg-white hover:text-primary font-semibold px-6 py-3 text-lg w-fit transition-all duration-300 border border-primary/50 hover:border-white shadow-lg hover:shadow-xl"
                >
                  Start Your Estimate
                </Button>
              </Link>
            </ScrollAnimationWrapper>
          </div>
        </div>

      </div>
      {/* Scroll Down Arrow */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40">
        <div className="flex flex-col items-center gap-2">
          <ChevronDown
            strokeWidth={2.5}
            className="w-12 h-8 text-white animate-bounce-fade"
          />
        </div>
      </div>
    </section>
  );
};
