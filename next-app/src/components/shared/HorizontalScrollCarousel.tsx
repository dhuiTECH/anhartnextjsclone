'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * HorizontalScrollCarousel Component
 * 
 * A reusable horizontal scroll carousel component with drag functionality,
 * pagination dots, and navigation arrows. Provides smooth scrolling experience
 * across desktop, tablet, and mobile devices.
 * 
 * @param children - React nodes to render inside the carousel
 * @param className - Additional CSS classes for the container
 * @param itemClassName - CSS classes for individual items
 * @param showScrollIndicator - Whether to show scroll indicator (mobile only)
 * @param showPagination - Whether to show pagination dots
 * @param showArrows - Whether to show navigation arrows
 * @param gap - Gap between items (default: 'gap-6')
 * @param itemsPerPage - Number of items to show per page (default: 1)
 */
interface HorizontalScrollCarouselProps {
  children: React.ReactNode;
  className?: string;
  itemClassName?: string;
  showScrollIndicator?: boolean;
  showPagination?: boolean;
  showArrows?: boolean;
  gap?: string;
  itemsPerPage?: number;
}

export const HorizontalScrollCarousel: React.FC<{
  children?: React.ReactNode;
}> = ({
  children,
  className = '',
  itemClassName = '',
  showScrollIndicator = false,
  showPagination = true,
  showArrows = true,
  gap = 'gap-6',
  itemsPerPage = 1
}) => {
  // Scroll container reference
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Drag scroll state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  
  // Swipe animation state
  const [isAnimating, setIsAnimating] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  
  // Horizontal gesture locking state
  const [isHorizontalGesture, setIsHorizontalGesture] = useState(false);
  const [gestureStartY, setGestureStartY] = useState(0);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const childrenArray = React.Children.toArray(children);
  const totalPages = Math.ceil(childrenArray.length / itemsPerPage);

  /**
   * Mouse down handler for drag scroll initiation
   */
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  /**
   * Mouse move handler for drag scrolling
   */
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll sensitivity multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  /**
   * Mouse up handler to end drag scroll
   */
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  /**
   * Mouse leave handler to end drag scroll when leaving container
   */
  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  /**
   * Touch start handler for mobile drag scroll
   */
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    
    // Capture initial Y position for gesture detection
    setGestureStartY(e.touches[0].pageY);
    setIsHorizontalGesture(false);
  };

  /**
   * Touch move handler for mobile drag scroll
   */
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
      const walk = (x - startX) * 2;
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
      
      // Determine swipe direction for animation
      if (deltaX > 10) {
        setSwipeDirection((x - startX) > 0 ? 'right' : 'left');
      }
    }
  };

  /**
   * Touch end handler to end mobile drag scroll
   */
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

  /**
   * Navigate to specific page
   */
  const goToPage = (pageIndex: number) => {
    if (!scrollContainerRef.current) return;
    
    setCurrentPage(pageIndex);
    const container = scrollContainerRef.current;
    const containerWidth = container.offsetWidth;
    const scrollPosition = pageIndex * containerWidth;
    
    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  };

  /**
   * Navigate to previous page
   */
  const goToPreviousPage = () => {
    const prevPage = currentPage > 0 ? currentPage - 1 : totalPages - 1;
    goToPage(prevPage);
  };

  /**
   * Navigate to next page
   */
  const goToNextPage = () => {
    const nextPage = currentPage < totalPages - 1 ? currentPage + 1 : 0;
    goToPage(nextPage);
  };

  /**
   * Update current page based on scroll position
   */
  const updateCurrentPage = () => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const containerWidth = container.offsetWidth;
    const scrollLeft = container.scrollLeft;
    const newPage = Math.round(scrollLeft / containerWidth);
    
    if (newPage !== currentPage && newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Update page on scroll
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (!isDragging) {
        updateCurrentPage();
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [isDragging, currentPage, totalPages]);

  return (
    <div className={cn('relative', className)}>
      {/* Pagination Dots - Mobile/Tablet Only */}
      {showPagination && totalPages > 1 && (
        <div className="flex justify-center items-center mb-6 space-x-2 md:hidden">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index)}
              className={cn(
                'h-3 rounded-full transition-all duration-300',
                index === currentPage
                  ? 'bg-primary w-8 shadow-lg shadow-primary/30'
                  : 'bg-primary/40 hover:bg-primary/60 w-3'
              )}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Scroll Indicator - Fallback for when pagination is disabled */}
      {showScrollIndicator && !showPagination && (
        <div className="flex justify-center mb-4 md:hidden">
          <div className="bg-muted rounded-full px-3 py-1">
            <span className="text-xs text-muted-foreground">← Swipe to explore →</span>
          </div>
        </div>
      )}

      {/* Main Container with Navigation */}
      <div className="relative">
        {/* Left Navigation Arrow - Mobile/Tablet Only */}
        {showArrows && totalPages > 1 && (
          <button
            onClick={goToPreviousPage}
            className="absolute left-1 top-1/2 -translate-y-1/2 z-20 
                       text-foreground/60 hover:text-foreground 
                       text-3xl font-bold 
                       transition-all duration-200 hover:scale-110
                       md:hidden"
            aria-label="Previous project"
          >
            ‹
          </button>
        )}

        {/* Right Navigation Arrow - Mobile/Tablet Only */}
        {showArrows && totalPages > 1 && (
          <button
            onClick={goToNextPage}
            className="absolute right-1 top-1/2 -translate-y-1/2 z-20 
                       text-foreground/60 hover:text-foreground 
                       text-3xl font-bold 
                       transition-all duration-200 hover:scale-110
                       md:hidden"
            aria-label="Next project"
          >
            ›
          </button>
        )}

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className={cn(
            'overflow-x-auto overflow-y-hidden scrollbar-hide',
            'md:overflow-visible', // Show all items on desktop
            isDragging ? 'cursor-grabbing' : 'cursor-grab',
            'md:cursor-default', // Remove cursor change on desktop
            isAnimating 
              ? swipeDirection === 'left' 
                ? 'animate-slide-out-left' 
                : 'animate-slide-out-right'
              : ''
          )}
          style={{
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch'
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className={cn(
            'flex',
            gap,
            // Mobile/Tablet: Horizontal scroll layout
            'md:grid md:grid-cols-2 lg:grid-cols-3', // Desktop: Grid layout
            'md:gap-8'
          )}>
            {React.Children.map(children, (child, index) => (
              <div
                key={index}
                className={cn(
                  // Mobile/Tablet: Fixed width for horizontal scroll
                  'flex-shrink-0 w-72 sm:w-80',
                  // Desktop: Full width in grid
                  'md:w-auto md:flex-shrink',
                  // Scroll snap alignment
                  'scroll-snap-align-start',
                  itemClassName
                )}
                style={{ scrollSnapAlign: 'start' }}
              >
                {child}
              </div>
            ))}
          </div>
        </div>

        {/* Fade Edges for Mobile/Tablet - Only when no arrows */}
        {!showArrows && (
          <>
            <div className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-background to-transparent pointer-events-none md:hidden" />
            <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-background to-transparent pointer-events-none md:hidden" />
          </>
        )}
      </div>
    </div>
  );
};
