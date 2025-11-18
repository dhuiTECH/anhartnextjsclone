'use client';

import Link from 'next/link';
/**
 * =============================================================================
 * OUR FOCUS SECTION COMPONENT
 * =============================================================================
 * * A dedicated component for the "Our Focus" section that showcases the different
 * purposes and concepts of Anhart's projects. This component maintains the original
 * carousel layout with 3 cards per page, scroll functionality, and navigation arrows.
 * * Features:
 * - Carousel layout with 3 cards per page
 * - Drag scroll functionality on desktop
 * - Navigation arrows for tablet and mobile
 * - Pagination dots
 * - View Details modal for example projects
 * - Responsive design (mobile, tablet, desktop)
 * * @author Anhart Development Team
 * @version 1.0.1 (Refactored to remove icons)
 * @since 2025
 */

// =============================================================================
// REACT IMPORTS
// =============================================================================
import React, { useState, useRef, useEffect } from "react";

// =============================================================================
// COMPONENT IMPORTS
// =============================================================================
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollAnimationWrapper } from "@/components/animations/ScrollAnimationWrapper";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// =============================================================================
// ICON IMPORTS (REMOVED - ONLY PLACEHOLDER)
// =============================================================================
// All lucide-react icons are removed as requested.
import { ExternalLink } from "lucide-react";
// =============================================================================
// DATA IMPORTS
// =============================================================================
import { ourFocusData, FocusCard, OurFocusPage } from "@/data/our-focus";

// =============================================================================
// IMAGE IMPORTS
// =============================================================================
import img162Main from "@/assets/162Main.png";
import img162Main_2 from "@/assets/162Main_2.png";
import img162MainSt from "@/assets/162MainSt.webp";
import imgDodsonsRooms_1 from "@/assets/DodsonsRooms_1.png";
import imgDodsonSt from "@/assets/DodsonSt.webp";
import imgMeritt_TH_1 from "@/assets/Meritt_TH_1.png";
import imgMerritt from "@/assets/merritt.png";
import imgTheRyder from "@/assets/TheRyder.jpeg";
import imgRyder_2 from "@/assets/Ryder_2.png";
import imgModularH_1 from "@/assets/ModularH_1.png";
import imgAFS_1 from "@/assets/AFS_1.png";

// =============================================================================
// TYPES
// =============================================================================
interface OurFocusSectionProps {
  className?: string;
}

// =============================================================================
// ICON MAPPING (REMOVED/SIMPLIFIED)
// =============================================================================
// Since icons are removed, this map is no longer necessary.
// A fallback function will be used instead.

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get image paths with WebP and PNG fallback
 * Maps image names to their imported static assets
 */
const getImagePaths = (imageName: string): { webp?: string; fallback: string } => {
  const imageMap: Record<string, any> = {
    "162Main": img162Main,
    "162Main_2": img162Main_2,
    "162MainSt": img162MainSt,
    DodsonsRooms_1: imgDodsonsRooms_1,
    "Dodson St": imgDodsonSt,
    Meritt_TH_1: imgMeritt_TH_1,
    merritt: imgMerritt,
    Ryder_1: imgTheRyder,
    Ryder_2: imgRyder_2,
    ModularH_1: imgModularH_1,
    AFS_1: imgAFS_1,
  };
  const image = imageMap[imageName];
  const imageSrc = typeof image === 'string' ? image : image?.src || imageName;
  
  // Check if image is already WebP (like 162MainSt, DodsonSt)
  const isWebP = imageSrc.includes('.webp') || imageName.includes('St') || imageName === '162MainSt' || imageName === 'Dodson St';
  
  return {
    webp: isWebP ? imageSrc : undefined,
    fallback: imageSrc
  };
};

// Legacy function for backward compatibility
const getOriginalImagePath = (imageName: string): string => {
  return getImagePaths(imageName).fallback;
};

/**
 * Get a simple, text-based indicator for a focus card
 * (Replaces the getIconComponent function)
 */
const getFocusIndicator = (iconName: string): string => {
  // A simple placeholder based on the first letter of the icon name (if possible)
  return iconName.charAt(0).toUpperCase() || "F";
};

// =============================================================================
// FOCUS CARD COMPONENT
// =============================================================================

interface FocusCardProps {
  card: FocusCard;
  onViewDetails: (card: FocusCard) => void;
}
const FocusCardComponent: React.FC<FocusCardProps> = ({ card, onViewDetails }) => {
  const indicator = getFocusIndicator(card.icon);
  return (
    <Card
      className="group hover:shadow-sm sm:hover:shadow-lg transition-all duration-300 hover:shadow-xl hover:border-primary/20 select-none"
      data-card-interactive
    >
      {/* Project Example Image */}
      <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
        {(() => {
          const imagePaths = getImagePaths(card.exampleProject.image);
          return (
            <picture>
              {imagePaths.webp && <source srcSet={imagePaths.webp} type="image/webp" />}
              <img
                src={imagePaths.fallback}
                alt={card.exampleProject.name}
                className="w-full h-full object-cover object-center group-hover:brightness-110 transition-all duration-300"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = "none";
                  const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = "flex";
                }}
              />
            </picture>
          );
        })()}
        <div
          className="w-full h-full bg-muted flex items-center justify-center"
          style={{
            display: "none",
          }}
        >
          <span className="text-sm text-muted-foreground">Image not found</span>
        </div>
      </div>

      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          {/* Replaced Icon with a stylized letter/indicator */}

          <CardTitle className="text-xl">{card.title}</CardTitle>
        </div>
        <p className="text-muted-foreground text-sm">{card.description}</p>
      </CardHeader>

      <CardContent>
        <Button
          onClick={() => onViewDetails(card)}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-colors"
        >
          View Details
          {/* ExternalLink icon removed */}
        </Button>
      </CardContent>
    </Card>
  );
};

// =============================================================================
// PROJECT DETAILS MODAL COMPONENT
// =============================================================================

interface ProjectDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  card: FocusCard | null;
}
const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({ isOpen, onClose, card }) => {
  if (!card) return null;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-4xl h-auto max-h-[90vh] md:max-h-[85vh] p-0 flex flex-col">
        <div className="relative p-4 md:p-6 overflow-y-auto flex-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute right-2 top-2 h-7 w-7 p-0 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg z-20"
          >
            <span className="flex items-center justify-center text-xs leading-none">✕</span>
          </Button>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {/* ============================================================================= */}
            {/* LEFT COLUMN: Project Image and Focus Area Info (Stacked)                         */}
            {/* ============================================================================= */}
            <div className="space-y-4 md:space-y-6">
              {/* Project Image */}
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                {(() => {
                  const imagePaths = getImagePaths(card.exampleProject.image);
                  return (
                    <picture>
                      {imagePaths.webp && <source srcSet={imagePaths.webp} type="image/webp" />}
                      <img
                        src={imagePaths.fallback}
                        alt={card.exampleProject.name}
                        className="w-full h-full object-cover object-center"
                        onError={(e) => {
                          (e.currentTarget as HTMLElement).style.display = "none";
                          const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = "flex";
                        }}
                      />
                    </picture>
                  );
                })()}
                <div
                  className="w-full h-full bg-muted flex items-center justify-center"
                  style={{
                    display: "none",
                  }}
                >
                  <span className="text-sm text-muted-foreground">Image not found</span>
                </div>
              </div>

              {/* Focus Area Info */}
              <div className="bg-muted/50 p-3 md:p-4 rounded-lg">
                <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">Focus Area: {card.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-2">{card.description}</p>
                <p className="text-xs md:text-sm text-foreground">
                  <strong>Purpose:</strong> {card.purpose}
                </p>
              </div>
            </div>

            {/* ============================================================================= */}
            {/* RIGHT COLUMN: Project Details and Key Highlights (Stacked)                      */}
            {/* ============================================================================= */}
            <div className="space-y-3 md:space-y-4">
              {/* Project Details (Name, Location, Description) */}
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">{card.exampleProject.name}</h2>
                <p className="text-sm md:text-base text-muted-foreground mb-3 md:mb-4">
                  {card.exampleProject.location}
                </p>
                <p className="text-sm md:text-base text-foreground line-clamp-4">{card.exampleProject.description}</p>
              </div>

              {/* Key Highlights */}
              <div>
                <h3 className="text-base md:text-lg font-semibold text-foreground mb-2 md:mb-3">Key Highlights:</h3>
                <ul className="space-y-2">
                  {card.exampleProject.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start text-xs md:text-sm text-muted-foreground">
                      <span className="text-primary mr-2 mt-1">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* External Link */}
              {card.link && (
                <div className="mt-4">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <a href={card.link} target="_blank" rel="noopener noreferrer">
                      For more information about modular homes
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export const OurFocusSection: React.FC<OurFocusSectionProps> = ({ className = "" }) => {
  // =============================================================================
  // STATE MANAGEMENT
  // =============================================================================
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCard, setSelectedCard] = useState<FocusCard | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // =============================================================================
  // DRAG SCROLL FUNCTIONALITY
  // =============================================================================
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Swipe animation state
  const [isAnimating, setIsAnimating] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);

  // Horizontal gesture locking state
  const [isHorizontalGesture, setIsHorizontalGesture] = useState(false);
  const [gestureStartY, setGestureStartY] = useState(0);

  // =============================================================================
  // EVENT HANDLERS
  // =============================================================================

  /**
   * Handle View Details button click
   */
  const handleViewDetails = (card: FocusCard) => {
    setSelectedCard(card);
    setModalOpen(true);
  };

  /**
   * Close modal
   */
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCard(null);
  };

  // =============================================================================
  // DRAG SCROLL EVENT HANDLERS
  // =============================================================================

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);

    // Capture initial Y position for gesture detection
    setGestureStartY(e.touches[0].pageY);
    setIsHorizontalGesture(false);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;

    const touch = e.touches[0];
    const x = touch.pageX - scrollContainerRef.current.offsetLeft;
    const y = touch.pageY;

    // Calculate movement distances
    const deltaX = Math.abs(x - startX);
    const deltaY = Math.abs(y - gestureStartY);

    // Detect horizontal gesture if horizontal movement is dominant
    if (!isHorizontalGesture && deltaX > 20 && deltaX > deltaY * 2) {
      setIsHorizontalGesture(true);
    }

    // If horizontal gesture is detected, prevent vertical scrolling
    if (isHorizontalGesture) {
      e.preventDefault();
      e.stopPropagation();
    }

    // Only perform horizontal scrolling if it's a horizontal gesture
    if (isHorizontalGesture || deltaX > deltaY) {
      const walk = (x - startX) * 1.5;
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;

      // Determine swipe direction for animation
      if (deltaX > 10) {
        setSwipeDirection(x - startX > 0 ? "right" : "left");
      }
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

  // Enhanced touch handling for mobile carousel
  const [touchStart, setTouchStart] = useState({
    x: 0,
    y: 0,
  });
  const [touchEnd, setTouchEnd] = useState({
    x: 0,
    y: 0,
  });
  const [touchTimeout, setTouchTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isTouchActive, setIsTouchActive] = useState(false);
  const handleMobileTouchStart = (e: React.TouchEvent) => {
    const touch = e.targetTouches[0];
    setTouchStart({
      x: touch.clientX,
      y: touch.clientY,
    });
    setTouchEnd({
      x: 0,
      y: 0,
    });
    setIsTouchActive(true);

    // Clear any existing timeout
    if (touchTimeout) {
      clearTimeout(touchTimeout);
    }

    // Set a timeout to reset touch state if no movement occurs
    const timeout = setTimeout(() => {
      setTouchStart({
        x: 0,
        y: 0,
      });
      setTouchEnd({
        x: 0,
        y: 0,
      });
      setIsTouchActive(false);
    }, 1000); // Reset after 1 second of no movement

    setTouchTimeout(timeout);
  };
  const handleMobileTouchMove = (e: React.TouchEvent) => {
    const touch = e.targetTouches[0];
    setTouchEnd({
      x: touch.clientX,
      y: touch.clientY,
    });

    // Clear timeout since user is moving
    if (touchTimeout) {
      clearTimeout(touchTimeout);
      setTouchTimeout(null);
    }

    // Calculate horizontal and vertical movement
    const horizontalMovement = Math.abs(touch.clientX - touchStart.x);
    const verticalMovement = Math.abs(touch.clientY - touchStart.y);

    // Only prevent vertical scrolling if horizontal movement is SIGNIFICANTLY dominant
    // Increased threshold to favor vertical scrolling
    if (horizontalMovement > 30 && horizontalMovement > verticalMovement * 2) {
      e.preventDefault();
      e.stopPropagation();
    }
  };
  const handleMobileTouchEnd = () => {
    // Clear any pending timeout
    if (touchTimeout) {
      clearTimeout(touchTimeout);
      setTouchTimeout(null);
    }

    // Only process swipe if we have both start and end positions
    if (touchStart.x && touchEnd.x) {
      const distance = touchStart.x - touchEnd.x;
      const isLeftSwipe = distance > 50;
      const isRightSwipe = distance < -50;
      if (isLeftSwipe) {
        goToNextPage();
      }
      if (isRightSwipe) {
        goToPreviousPage();
      }
    }

    // Always reset touch state after touch end to allow vertical scrolling
    setTouchStart({
      x: 0,
      y: 0,
    });
    setTouchEnd({
      x: 0,
      y: 0,
    });
    setIsTouchActive(false);
  };

  // Handle touch cancel events (when touch is interrupted)
  const handleMobileTouchCancel = () => {
    // Clear any pending timeout
    if (touchTimeout) {
      clearTimeout(touchTimeout);
      setTouchTimeout(null);
    }

    // Reset touch state immediately on cancel
    setTouchStart({
      x: 0,
      y: 0,
    });
    setTouchEnd({
      x: 0,
      y: 0,
    });
    setIsTouchActive(false);
  };

  // =============================================================================
  // NAVIGATION FUNCTIONS
  // =============================================================================

  const scrollToPage = (pageIndex: number) => {
    if (scrollContainerRef.current) {
      // In the mobile/tablet view, we don't use the scrollRef for navigation
      // because we're rendering only the current page content directly, not a long scrollable strip.
      // So, this scroll is only effective for the desktop drag-scroll layout.
      if (window.innerWidth >= 1280) {
        // Check for XL breakpoint (desktop)
        const containerWidth = scrollContainerRef.current.offsetWidth;
        scrollContainerRef.current.scrollTo({
          left: pageIndex * containerWidth,
          behavior: "smooth",
        });
      }
      setCurrentPage(pageIndex);
    } else {
      // Fallback for mobile/tablet where scrollContainerRef might not be the primary navigation method
      setCurrentPage(pageIndex);
    }
  };
  const goToPreviousPage = () => {
    const newPage = currentPage > 0 ? currentPage - 1 : ourFocusData.pages.length - 1;
    scrollToPage(newPage);
  };
  const goToNextPage = () => {
    const newPage = currentPage < ourFocusData.pages.length - 1 ? currentPage + 1 : 0;
    scrollToPage(newPage);
  };

  // =============================================================================
  // EFFECTS
  // =============================================================================

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const scrollPosition = scrollContainerRef.current.scrollLeft;
        const containerWidth = scrollContainerRef.current.offsetWidth;
        // Only update current page based on scroll position if we're in the desktop view
        if (window.innerWidth >= 1280) {
          const newPage = Math.round(scrollPosition / containerWidth);
          setCurrentPage(newPage);
        }
      }
    };
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  // =============================================================================
  // RENDER
  // =============================================================================

  return (
    <section
      className={`py-16 bg-background transition-all duration-300 ${isTouchActive ? "ring-[3px] ring-primary ring-opacity-50" : ""} ${className}`}
      data-section="our-focus"
    >
      <div className="mx-auto max-w-7xl px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-8">
          <ScrollAnimationWrapper direction="top">
            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">{ourFocusData.title}</h2>
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper direction="top" delay={100}>
            <p className="text-lg text-muted-foreground">{ourFocusData.pages[currentPage]?.description}</p>
          </ScrollAnimationWrapper>
        </div>

        {/* Desktop Layout - 3 columns with drag scroll */}
        <div className="hidden xl:block">
          {/* Pagination Dots - Desktop */}
          <ScrollAnimationWrapper direction="top" delay={200}>
            <div className="flex justify-center items-center mb-6 space-x-2">
              {ourFocusData.pages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToPage(index)}
                  className={`h-4 rounded-full transition-all duration-300 ${index === currentPage ? "bg-primary w-12 shadow-lg shadow-primary/30" : "bg-primary/40 hover:bg-primary/60 w-4"}`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
          </ScrollAnimationWrapper>

          {/* Drag-scrollable container - Desktop */}
          <ScrollAnimationWrapper direction="bottom" delay={300}>
            <div
              ref={scrollContainerRef}
              className={`relative overflow-x-auto overflow-y-hidden scrollbar-hide ${isDragging ? "cursor-grabbing" : "cursor-grab"} ${
                isAnimating ? (swipeDirection === "left" ? "animate-slide-out-left" : "animate-slide-out-right") : ""
              }`}
              style={{
                scrollSnapType: "x mandatory",
                WebkitOverflowScrolling: "touch",
                touchAction: "auto",
                transition: isAnimating ? "transform 0.3s ease-out" : "none",
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex"
                style={{
                  width: `${ourFocusData.pages.length * 100}%`,
                }}
              >
                {ourFocusData.pages.map((page, pageIndex) => (
                  <div
                    key={pageIndex}
                    className="flex-shrink-0 px-2"
                    style={{
                      width: `${100 / ourFocusData.pages.length}%`,
                      scrollSnapAlign: "start",
                    }}
                  >
                    <div className="grid grid-cols-3 gap-8 p-4">
                      {page.cards.map((card, index) => (
                        <FocusCardComponent key={card.id} card={card} onViewDetails={handleViewDetails} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollAnimationWrapper>
        </div>

        {/* Mobile Layout - Single project with overlaid arrows */}
        <div className="md:hidden">
          {/* Pagination Dots - Mobile */}
          <ScrollAnimationWrapper direction="top" delay={200}>
            <div className="flex justify-center items-center mb-6 space-x-2">
              {ourFocusData.pages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToPage(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${index === currentPage ? "bg-primary w-8 shadow-lg shadow-primary/30" : "bg-primary/40 hover:bg-primary/60 w-3"}`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
          </ScrollAnimationWrapper>

          {/* Navigation Container */}
          <ScrollAnimationWrapper direction="bottom" delay={300}>
            <div
              className="relative touch-pan-x"
              onTouchStart={handleMobileTouchStart}
              onTouchMove={handleMobileTouchMove}
              onTouchEnd={handleMobileTouchEnd}
              onTouchCancel={handleMobileTouchCancel}
              style={{
                touchAction: "auto",
              }}
            >
              {/* Previous Arrow - Replaced with text arrow */}
              <button
                onClick={goToPreviousPage}
                className="absolute left-1 top-1/2 -translate-y-1/2 z-20 text-foreground/60 hover:text-foreground text-3xl font-bold transition-all duration-200 hover:scale-110"
                aria-label="Previous project"
              >
                ‹
              </button>

              {/* Next Arrow - Replaced with text arrow */}
              <button
                onClick={goToNextPage}
                className="absolute right-1 top-1/2 -translate-y-1/2 z-20 text-foreground/60 hover:text-foreground text-3xl font-bold transition-all duration-200 hover:scale-110"
                aria-label="Next project"
              >
                ›
              </button>

              {/* Single Project Display - Show only current page */}
              <div className="px-8">
                {ourFocusData.pages[currentPage] && (
                  <div className="grid grid-cols-1 gap-6 py 3">
                    {ourFocusData.pages[currentPage].cards.map((card) => (
                      <FocusCardComponent key={card.id} card={card} onViewDetails={handleViewDetails} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </ScrollAnimationWrapper>
        </div>

        {/* Tablet Layout - 2+1 organization with navigation arrows */}
        <div className="hidden md:block xl:hidden">
          {/* Pagination Dots - Tablet */}
          <ScrollAnimationWrapper direction="top" delay={200}>
            <div className="flex justify-center items-center mb-6 space-x-2">
              {ourFocusData.pages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToPage(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${index === currentPage ? "bg-primary w-8 shadow-lg shadow-primary/30" : "bg-primary/40 hover:bg-primary/60 w-3"}`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
          </ScrollAnimationWrapper>

          {/* Navigation Container */}
          <ScrollAnimationWrapper direction="bottom" delay={300}>
            <div
              className="relative touch-pan-x"
              onTouchStart={handleMobileTouchStart}
              onTouchMove={handleMobileTouchMove}
              onTouchEnd={handleMobileTouchEnd}
              onTouchCancel={handleMobileTouchCancel}
              style={{
                touchAction: "auto",
              }}
            >
              {/* Previous Arrow - Replaced with text arrow */}
              <button
                onClick={goToPreviousPage}
                className="absolute left-1 top-1/2 -translate-y-1/2 z-20 text-foreground/60 hover:text-foreground text-3xl font-bold transition-all duration-200 hover:scale-110"
                aria-label="Previous project"
              >
                ‹
              </button>

              {/* Next Arrow - Replaced with text arrow */}
              <button
                onClick={goToNextPage}
                className="absolute right-1 top-1/2 -translate-y-1/2 z-20 text-foreground/60 hover:text-foreground text-3xl font-bold transition-all duration-200 hover:scale-110"
                aria-label="Next project"
              >
                ›
              </button>

              {/* 2+1 Layout - Show only current page */}
              <div className="px-8">
                {ourFocusData.pages[currentPage] && (
                  <div className="space-y-6">
                    {/* Top row - 2 projects */}
                    <div className="grid grid-cols-2 gap-6 p-4">
                      {ourFocusData.pages[currentPage].cards.slice(0, 2).map((card) => (
                        <FocusCardComponent key={card.id} card={card} onViewDetails={handleViewDetails} />
                      ))}
                    </div>

                    {/* Bottom row - 1 centered project (if exists) */}
                    {ourFocusData.pages[currentPage].cards.length > 2 && (
                      <div className="flex justify-center">
                        <div className="w-full max-w-sm">
                          <FocusCardComponent
                            card={ourFocusData.pages[currentPage].cards[2]}
                            onViewDetails={handleViewDetails}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </ScrollAnimationWrapper>
        </div>

        {/* View All Projects Button */}
        <div className="flex justify-center mt-8">
          <ScrollAnimationWrapper direction="bottom" delay={600}>
            <Button
              variant="outline"
              className="group hover:bg-primary hover:text-primary-foreground transition-colors"
              asChild
            >
              <a href="https://anhart.ca/portfolio" target="_blank" rel="noopener noreferrer">
                View All Projects
                <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </Button>
          </ScrollAnimationWrapper>
        </div>
      </div>

      {/* Project Details Modal */}
      <ProjectDetailsModal isOpen={modalOpen} onClose={handleCloseModal} card={selectedCard} />
    </section>
  );
};
export default OurFocusSection;
