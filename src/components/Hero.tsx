import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import heroBackgroundVideo from "@/assets/hero-background-video.mp4";
import anhartLogo from "@/assets/anhart-logo.png";
import { ScrollAnimationWrapper } from "@/components/animations/ScrollAnimationWrapper";
import { useEffect, useRef } from "react";
export const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const heroHeight = window.innerHeight * 0.85;
      if (scrolled <= heroHeight) {
        const videoRate = scrolled * -0.5; // More dramatic parallax for video
        const contentRate = scrolled * 0.15; // Content moves slightly down for depth

        if (videoRef.current) {
          videoRef.current.style.transform = `translateY(${videoRate}px)`;
        }
        if (contentRef.current) {
          contentRef.current.style.transform = `translateY(${contentRate}px)`;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <section
      className="relative h-[85vh] sm:h-[95vh] w-full overflow-hidden"
      aria-label="Hero section with affordable housing information"
    >
      {/* Anhart logo as backdrop */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 z-0"
        style={{
          backgroundImage: `url(${anhartLogo})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center'
        }}
      />
      
      {/* Fallback background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/70 to-primary/90 z-[0.5]" />

      {/* Full-screen background video with extended height for parallax */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full object-cover z-[1]"
        style={{
          height: "150vh",
          minHeight: "150vh",
        }}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-label="Background video showing housing development animation"
      >
        <source src={heroBackgroundVideo} type="video/mp4" />
      </video>

      {/* Centered content container */}
      <div
        ref={contentRef}
        className="relative z-30 h-lvh flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center">
          <ScrollAnimationWrapper direction="top" delay={100}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-white mb-4 sm:mb-6 [text-shadow:_0_4px_16px_rgba(0,0,0,0.8)]">
              The Power of Small
            </h1>
          </ScrollAnimationWrapper>

          <ScrollAnimationWrapper direction="top" delay={200}>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 font-light bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] tracking-wider">
              Redefining Affordable Housing
            </p>
          </ScrollAnimationWrapper>

          {/* Buttons positioned below text */}
          <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Mobile: Side-by-side buttons */}
            <div className="flex flex-row gap-2 sm:hidden w-full max-w-sm">
              <ScrollAnimationWrapper direction="bottom" delay={300} className="flex-1">
                <a href="https://anhart.ca/portfolio" target="_blank" rel="noopener noreferrer" className="block">
                  <Button
                    name="explore our work"
                    size="sm"
                    className="bg-primary/60 backdrop-blur-md text-white hover:bg-white hover:text-primary font-semibold px-3 py-2 text-sm w-full transition-all duration-300 border border-primary/50 hover:border-white shadow-lg hover:shadow-xl"
                  >
                    Explore More
                    <span className="ml-1 text-sm font-bold">{">"}</span>
                  </Button>
                </a>
              </ScrollAnimationWrapper>

              <ScrollAnimationWrapper direction="bottom" delay={400} className="flex-1">
                <a href="https://anhart.ca/partner" target="_blank" rel="noopener noreferrer" className="block">
                  <Button
                    name="partner with us"
                    size="sm"
                    variant="outline"
                    className="bg-white/5 backdrop-blur-sm border-white/30 text-white font-semibold px-3 py-2 text-sm w-full hover:bg-white/15 hover:border-white/50 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Partner With Us
                  </Button>
                </a>
              </ScrollAnimationWrapper>
            </div>

            {/* Desktop: Original buttons */}
            <div className="hidden sm:flex flex-row items-center justify-center gap-4">
              <ScrollAnimationWrapper direction="bottom" delay={300}>
                <a href="https://anhart.ca/portfolio" target="_blank" rel="noopener noreferrer">
                  <Button
                    name="explore our work"
                    size="lg"
                    className="bg-primary/60 backdrop-blur-md text-white hover:bg-white hover:text-primary font-semibold px-6 py-3 text-base group relative transition-all duration-300 border border-primary/50 hover:border-white shadow-lg hover:shadow-xl"
                  >
                    Explore Our Work
                    <span className="ml-2 text-lg font-bold">{">"}</span>
                  </Button>
                </a>
              </ScrollAnimationWrapper>

              <ScrollAnimationWrapper direction="bottom" delay={400}>
                <a href="https://anhart.ca/partner" target="_blank" rel="noopener noreferrer">
                  <Button
                    name="partner with us"
                    size="lg"
                    variant="outline"
                    className="bg-white/5 backdrop-blur-sm border-white/30 text-white font-semibold px-8 py-3 text-base hover:bg-white/15 hover:border-white/50 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Partner with Us
                  </Button>
                </a>
              </ScrollAnimationWrapper>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Arrow */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40" aria-label="Scroll indicator">
        <div className="flex flex-col items-center gap-2">
          <ChevronDown strokeWidth={2.5} className="w-12 h-8 text-white animate-bounce-fade" />
        </div>
      </div>
    </section>
  );
};
