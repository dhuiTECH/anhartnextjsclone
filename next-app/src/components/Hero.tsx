"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { heroCarouselPartners } from "@/assets/HeroCarousel/heroCarouselPartners";
import { ScrollAnimationWrapper } from "@/components/animations/ScrollAnimationWrapper";
import { useLayoutEffect, useRef, useState } from "react";
import { useParallax } from "@/hooks/useParallax";
import { MOBILE_BREAKPOINT, useIsMobile } from "@/hooks/use-mobile";
import { logger } from "@/utils/logger";
import { useScroll, useTransform, motion } from "framer-motion";


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
  @keyframes marquee-fast {
    0% { transform: translateX(0); }
    100% { transform: translateX(-33.33%); } /* Adjusted for 3 duplicate sets to scroll exactly one set width */
  }
  .animate-marquee {
    animation: marquee 18s linear infinite;
    will-change: transform;
  }
  .animate-marquee-fast {
    animation: marquee-fast 60s linear infinite;
    display: flex;
    width: max-content;
  }
  .hover\\:pause-animation:hover {
    animation-play-state: paused;
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

  // Mobile: eager-fetch video before first paint (metadata-only preload delays autoplay on mobile).
  useLayoutEffect(() => {
    const el = videoRef.current;
    if (!el || typeof window === "undefined") return;
    if (window.innerWidth >= MOBILE_BREAKPOINT) return;
    el.preload = "auto";
    el.setAttribute("fetchpriority", "high");
    el.load();
  }, []);

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
  const bannerOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0], {
    clamp: true,
  });

  return (
    <section
      className="relative h-[85vh] sm:h-[95vh] w-full overflow-hidden"
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
            <span className="font-semibold hover:underline">
              Check out our featured project, Anhart Merritt
            </span>
          </Link>
          <span className="mx-32">•</span>
          <Link
            href="/Merritt"
            className="inline-flex items-center hover:bg-primary/80 transition-colors duration-300 px-4 rounded"
          >
            <span className="font-semibold hover:underline">
              Check out our featured project, Anhart Merritt
            </span>
          </Link>
        </div>
      </motion.div>
      {/* Anhart logo as backdrop with WebP/PNG fallback */}
      <picture className="absolute inset-0 z-0 flex items-center justify-center opacity-30 pointer-events-none">
        <img
          src="/images/anhart-logo.png"
          alt=""
          className="w-full h-full object-contain object-center"
          aria-hidden="true"
          loading="lazy"
          fetchPriority="low"
          width="1200"
          height="600"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
            opacity: 0.3,
          }}
        />
      </picture>
      {/* Fallback background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/70 to-primary/90 z-[0.5]" />
      {/* Full-screen background video with extended height for parallax */}
      {/* Desktop: metadata preload keeps bandwidth for LCP. Mobile: auto preload + useLayoutEffect starts fetch early. */}
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
        preload={isMobile ? "auto" : "metadata"}
        poster=""
        aria-label="Background video showing housing development animation"
        onError={() => {
          logger.warn(
            "Hero background video failed to load, using fallback gradient",
            {
              component: "Hero",
            },
          );
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
            height: "100%",
            background:
              "linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)",
          }}
          aria-hidden="true"
        />
      )}
      {/* Centered content container */}
      <div
        ref={contentRef}
        className="relative z-30 h-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 bg-black/20 rounded-lg py-4 pb-20"
      >
        <div className="text-center">
          <ScrollAnimationWrapper direction="top" delay={50}>
            <h1 className="text-sm sm:text-base md:text-lg text-white/80 font-medium uppercase tracking-[0.2em] mb-4 drop-shadow-md m-0 p-0">
              Canada&apos;s National Non-Profit Housing Developer
            </h1>
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper direction="top" delay={100}>
            <div className="text-4xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl font-bold tracking-tight text-white mb-2 sm:mb-4 [text-shadow:_0_4px_16px_rgba(0,0,0,0.8)]">
              Plan Your Housing Project for Free
            </div>
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper direction="top" delay={200}>
            <p className="text-base sm:text-xl md:text-2xl lg:text-3xl text-white font-light bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] tracking-wider">
              Get started in minutes with our free development cost estimator.
            </p>
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
      <div className="absolute bottom-0 left-0 right-0 z-40 bg-black/30 backdrop-blur-md border-t border-white/10 overflow-hidden py-2">
        <div className="flex items-center w-full px-4 h-20 sm:h-24 max-w-[100vw] overflow-hidden">
<div className="flex-shrink-0 text-white/70 font-semibold text-xs sm:text-sm tracking-widest uppercase mr-6 hidden sm:block">
            Trusted By
          </div>
           
          {/* Continuous scrolling container */}
          <div className="flex-1 overflow-hidden relative" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
            <div className="flex animate-marquee-fast hover:pause-animation items-center space-x-8 sm:space-x-12">
              {/* Duplicate the items to create a seamless loop */}
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex space-x-8 sm:space-x-12 min-w-max items-center">
                  {heroCarouselPartners
                    .filter((partner) => !partner.hidden)
                    .map((partner, index) => (
                    <div
                      key={index}
                      className="flex h-14 w-36 shrink-0 items-center justify-center rounded-md bg-white/5 px-2 py-1 opacity-70 backdrop-blur-sm transition-opacity duration-300 sm:h-16 sm:w-44"
                    >
                      <img
                        src={partner.src}
                        alt={partner.name}
                        className="pointer-events-none block max-h-full max-w-full object-contain object-center"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
