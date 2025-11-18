'use client';

import React, { useState, useEffect, useRef } from "react";

import comBuildImg from "@/assets/partnercarousel/communitybuilder.jpg";
import AACImg from "@/assets/partnercarousel/AAC.png";
import cleanStartImg from "@/assets/partnercarousel/cleanstart.png";
import GWAImg from "@/assets/partnercarousel/gwa_architecture.png";
import smartantImg from "@/assets/partnercarousel/smartant.png";
import FISHImg from "@/assets/FISH.png";
import PURPOSEImg from "@/assets/Purpose.jpg";
import QUIXULINImg from "@/assets/QUIXULIN.png";
import OTTVALImg from "@/assets/OTTVAL.png";
import SVImg from "@/assets/SV.png";
import TPOSImg from "@/assets/TPOS.png";
import GLCImg from "@/assets/GLC.png";

// Helper to extract .src from Next.js static imports
const getImageSrc = (img: any): string => typeof img === 'string' ? img : img?.src || '';

interface Client {
  id: number;
  name: string;
  logo: string;
  alt: string;
  website: string;
}

export const ClientCarousel: React.FC<{
  children?: React.ReactNode;
}> = (
  {
    children
  }
) => {
  const [currentPage, setCurrentPage] = useState(0);

  // Drag scroll functionality
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  // Cache containerLeft to avoid forced reflows
  const containerLeftRef = useRef<number>(0);

  // Swipe animation state
  const [isAnimating, setIsAnimating] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);

  // Horizontal gesture locking state
  const [isHorizontalGesture, setIsHorizontalGesture] = useState(false);
  const [gestureStartY, setGestureStartY] = useState(0);

  // Enhanced touch handling for mobile carousel (similar to Our Focus)
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });
  const [isTouchActive, setIsTouchActive] = useState(false);

  const clients: Client[] = [
    {
      id: 1,
      name: "Community Builders",
      logo: getImageSrc(comBuildImg),
      alt: "Community Builders Logo",
      website: "https://www.communitybuilders.ca/",
    },
    {
      id: 2,
      name: "Anhart Constructions",
      logo: getImageSrc(AACImg),
      alt: "Anhart Constructions Logo",
      website: "https://anhartconstruction.ca/",
    },
    {
      id: 3,
      name: "CleanStart",
      logo: getImageSrc(cleanStartImg),
      alt: "CleanStart Logo",
      website: "https://cleanstartbc.ca/",
    },
    {
      id: 4,
      name: "GWA_Architecture",
      logo: getImageSrc(GWAImg),
      alt: "GWA_Architecture logo",
      website: "https://www.gwaarchitecture.com/",
    },
    {
      id: 5,
      name: "SmartAnt",
      logo: getImageSrc(smartantImg),
      alt: "SmartAnt logo",
      website: "https://smartant.ca/",
    },
    {
      id: 6,
      name: "Fraser Inclusive and Supportive Housing",
      logo: getImageSrc(FISHImg),
      alt: "Fraser Inclusive and Supportive Housing",
      website: "https://www.facebook.com/p/Fraser-Inclusive-and-Supportive-Housing-Society-100068298222053/",
    },
    {
      id: 7,
      name: "Purpose Construction",
      logo: getImageSrc(PURPOSEImg),
      alt: "Purpose Construction",
      website: "https://www.purposeconstruction.ca/",
    },
    {
      id: 8,
      name: "Quixulin - Better Health Society",
      logo: getImageSrc(QUIXULINImg),
      alt: "Quixulin - Better Health Society",
      website: "https://quixulin.com/",
    },
    {
      id: 9,
      name: "Affordable Housing Alliance of the Ottawa Valley",
      logo: getImageSrc(OTTVALImg),
      alt: "Ottawa Valley Affordable Housing",
      website: "https://www.ahaov.com/",
    },
    {
      id: 10,
      name: "Sustainable Villages",
      logo: getImageSrc(SVImg),
      alt: "Sustainable Villages",
      website: "https://sustainable-villages.org/",
    },
    {
      id: 11,
      name: "The Power of Small",
      logo: getImageSrc(TPOSImg),
      alt: "The Power of Small",
      website: "https://thepowerofsmall.net/",
    },
    {
      id: 12,
      name: "gotta love Canada",
      logo: getImageSrc(GLCImg),
      alt: "gottaloveCanada",
      website: "https://gottalovecanada.ca/",
    },
  ];

  const clientsPerPage = 3;
  const totalPages = Math.ceil(clients.length / clientsPerPage);

  const goToPage = (pageIndex: number): void => {
    setCurrentPage(pageIndex);
  };

  const nextPage = (): void => {
    setCurrentPage((prev) => (prev + 1) % clients.length);
  };

  const prevPage = (): void => {
    setCurrentPage((prev) => (prev - 1 + clients.length) % clients.length);
  };

  // Handle mouse events for drag scrolling
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    // Batch DOM reads together - cache all geometric properties
    const container = scrollContainerRef.current;
    const containerLeft = container.offsetLeft;
    const containerScrollLeft = container.scrollLeft;
    containerLeftRef.current = containerLeft;
    setStartX(e.pageX - containerLeft);
    setScrollLeft(containerScrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    // Use cached containerLeft to avoid forced reflow
    const x = e.pageX - containerLeftRef.current;
    const walk = (x - startX) * 2;
    // Use requestAnimationFrame to batch DOM writes
    requestAnimationFrame(() => {
      if (!scrollContainerRef.current) return;
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Enhanced touch handling for mobile carousel (similar to Our Focus)
  const handleMobileTouchStart = (e: React.TouchEvent) => {
    const touch = e.targetTouches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
    setTouchEnd({ x: 0, y: 0 });
    setIsTouchActive(true);
  };

  const handleMobileTouchMove = (e: React.TouchEvent) => {
    const touch = e.targetTouches[0];
    setTouchEnd({ x: touch.clientX, y: touch.clientY });

    // Calculate horizontal and vertical movement
    const horizontalMovement = Math.abs(touch.clientX - touchStart.x);
    const verticalMovement = Math.abs(touch.clientY - touchStart.y);

    // Only prevent vertical scrolling if horizontal movement is clearly dominant
    // and the user has moved significantly horizontally (indicating a swipe intent)
    // This allows for natural vertical scrolling while still enabling horizontal swipes
    if (horizontalMovement > 30 && horizontalMovement > verticalMovement * 2) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleMobileTouchEnd = () => {
    if (!touchStart.x || !touchEnd.x) return;

    const distance = touchStart.x - touchEnd.x;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextPage();
    }
    if (isRightSwipe) {
      prevPage();
    }

    // Reset touch state after swipe completion to allow vertical scrolling
    setTouchStart({ x: 0, y: 0 });
    setTouchEnd({ x: 0, y: 0 });
    setIsTouchActive(false);
  };

  // Legacy touch handlers for backward compatibility (if needed)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    // Batch DOM reads together - cache all geometric properties
    const container = scrollContainerRef.current;
    const touch = e.touches[0];
    const containerLeft = container.offsetLeft;
    const containerScrollLeft = container.scrollLeft;
    containerLeftRef.current = containerLeft;
    setStartX(touch.pageX - containerLeft);
    setScrollLeft(containerScrollLeft);

    // Capture initial Y position for gesture detection
    setGestureStartY(touch.pageY);
    setIsHorizontalGesture(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;

    const touch = e.touches[0];
    const touchX = touch.pageX;
    const touchY = touch.pageY;

    // Calculate movement distances first (before RAF)
    const deltaX = Math.abs(touchX - startX);
    const deltaY = Math.abs(touchY - gestureStartY);

    // Detect horizontal gesture if horizontal movement is dominant
    if (!isHorizontalGesture && deltaX > 20 && deltaX > deltaY * 2) {
      setIsHorizontalGesture(true);
    }

    // If horizontal gesture is detected, prevent vertical scrolling (must be synchronous)
    if (isHorizontalGesture) {
      e.preventDefault();
      e.stopPropagation();
    }

    // Use cached containerLeft to avoid forced reflow
    if (isHorizontalGesture || deltaX > deltaY) {
      const x = touchX - containerLeftRef.current;
      const walk = (x - startX) * 1.5; // Optimized multiplier for smooth touch experience
      // Determine swipe direction for animation
      if (deltaX > 10) {
        setSwipeDirection(x - startX > 0 ? "right" : "left");
      }
      // Use requestAnimationFrame to batch DOM writes
      requestAnimationFrame(() => {
        if (!scrollContainerRef.current) return;
        scrollContainerRef.current.scrollLeft = scrollLeft - walk;
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setIsHorizontalGesture(false);

    // Trigger swipe animation
    if (swipeDirection) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(false);
        setSwipeDirection(null);
      }, 300);
    }
  };

  // Auto-scroll functionality for desktop
  useEffect(() => {
    const interval = setInterval(() => {
      // Only auto-scroll on desktop (lg screens)
      if (window.innerWidth >= 1024) {
        setCurrentPage((prev) => (prev + 1) % totalPages);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentPage, totalPages]);

  return (
    <section className="py-16 bg-background">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-primary mb-12">Our Partners</h2>

        {/* Desktop Layout - Grid view with pagination */}
        <div className="hidden lg:block">
          <div className="relative mb-8 px-12 sm:px-16">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentPage * 100}%)`,
                }}
              >
                {Array.from({ length: totalPages }).map((_, pageIndex) => (
                  <div key={pageIndex} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-3 gap-8 px-4">
                      {clients.slice(pageIndex * clientsPerPage, (pageIndex + 1) * clientsPerPage).map((client) => (
                        <div
                          key={client.id}
                          className="flex items-center justify-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 min-h-[160px] border border-muted"
                        >
                          <a href={client.website} target="_blank">
                            <img
                              src={client.logo}
                              alt={client.alt}
                              className="max-w-full max-h-28 object-contain transition-transform duration-300 hover:scale-105"
                            />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows - Desktop */}
            {totalPages > 1 && (
              <>
                <button
                  onClick={() => setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)}
                  className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-muted/10 transition-colors duration-200 border border-muted z-10"
                  aria-label="Previous page"
                >
                  <svg
                    className="w-4 h-4 sm:w-6 sm:h-6 text-muted-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={() => setCurrentPage((prev) => (prev + 1) % totalPages)}
                  className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-muted/10 transition-colors duration-200 border border-muted z-10"
                  aria-label="Next page"
                >
                  <svg
                    className="w-4 h-4 sm:w-6 sm:h-6 text-muted-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Pagination Dots - Desktop */}
          {totalPages > 1 && (
            <div className="flex justify-center space-x-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToPage(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentPage ? "bg-primary scale-110" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"}`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Mobile/Tablet Layout - Single client view with arrows */}
        <div className="lg:hidden">
          {/* Pagination Indicator - Mobile/Tablet */}
          <div className="flex justify-center mb-6">
            <span className="text-sm text-muted-foreground" aria-live="polite">
              {currentPage + 1}/{clients.length}
            </span>
          </div>

          <div className="relative">
            {/* Navigation Arrows - Mobile/Tablet */}
            <button
              onClick={prevPage}
              className="absolute left-1 top-1/2 -translate-y-1/2 z-20 text-foreground/60 hover:text-foreground text-3xl font-bold transition-all duration-200 hover:scale-110"
              aria-label="Previous client"
            >
              ‹
            </button>

            <button
              onClick={nextPage}
              className="absolute right-1 top-1/2 -translate-y-1/2 z-20 text-foreground/60 hover:text-foreground text-3xl font-bold transition-all duration-200 hover:scale-110"
              aria-label="Next client"
            >
              ›
            </button>

            {/* Single Client Display */}
            <div
              className={`px-6 transition-all duration-300 ${isTouchActive ? "shadow-2xl shadow-primary/20" : ""} ${
                isAnimating ? (swipeDirection === "left" ? "animate-slide-out-left" : "animate-slide-out-right") : ""
              }`}
              ref={scrollContainerRef}
              onTouchStart={handleMobileTouchStart}
              onTouchMove={handleMobileTouchMove}
              onTouchEnd={handleMobileTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              style={{ touchAction: "auto" }}
            >
              <div className="flex justify-center">
                <div className="flex items-center justify-center p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 min-h-[240px] max-w-sm w-full border border-muted">
                  <a
                    href={clients[currentPage].website}
                    target="_blank"
                    className="block w-full h-full flex items-center justify-center"
                  >
                    <img
                      src={clients[currentPage].logo}
                      alt={clients[currentPage].alt}
                      className="max-w-full max-h-40 object-contain transition-transform duration-300 hover:scale-105"
                    />
                  </a>
                </div>
              </div>
            </div>

            {/* Client Name - Mobile/Tablet */}
            <div className="text-center mt-4">
              <h3 className="text-lg font-semibold text-foreground">{clients[currentPage].name}</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
