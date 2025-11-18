'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import OptimizedImage from '@/components/OptimizedImage';
import { cn } from '@/lib/utils';
import { ScrollAnimationWrapper } from '@/components/animations/ScrollAnimationWrapper';
import { FlippableCard } from '@/components/shared/FlippableCard';

/**
 * ThreeCardSection Component
 * 
 * A comprehensive, reusable component that mimics the exact layout patterns
 * from Home.tsx "Featured Projects" and "How do we do it" sections.
 * 
 * Responsive Behavior:
 * - Mobile: Single column with navigation arrows (like Featured Projects)
 * - Tablet: 2+1 layout (2 on top, 1 centered below)
 * - Desktop: 3-column grid OR drag-scrollable carousel with pagination
 * 
 * @param title - Section title
 * @param description - Section description
 * @param cards - Array of card data
 * @param bgColor - Background color ('default' | 'muted')
 * @param layout - Layout style ('grid' | 'carousel')
 * @param showImages - Whether cards have images
 * @param onCardAction - Optional action handler for card buttons
 */

interface CardData {
  id?: string | number;
  title: string;
  description: string;
  image?: string;
  icon?: React.ComponentType<{
    className?: string;
  }>;
  buttonText?: string;
  buttonAction?: () => void;
  // Back side data for flippable cards
  backTitle?: string;
  backDescription?: string;
  backImage?: string;
}
interface ThreeCardSectionProps {
  title: string;
  description?: string;
  cards: CardData[];
  bgColor?: 'default' | 'muted';
  layout?: 'grid' | 'carousel';
  showImages?: boolean;
  onCardAction?: (card: CardData, index: number) => void;
  className?: string;
  flippable?: boolean; // Enable card flipping functionality
}
export const ThreeCardSection: React.FC<{
  children?: React.ReactNode;
}> = ({
  title,
  description,
  cards,
  bgColor = 'default',
  layout = 'grid',
  showImages = false,
  onCardAction,
  className = '',
  flippable = false,
  children
}) => {
  // Carousel state (only used when layout === 'carousel')
  const [currentPage, setCurrentPage] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Drag scroll state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  // Cache containerLeft to avoid forced reflows
  const containerLeftRef = useRef<number>(0);
  // Cache containerWidth to avoid forced reflows
  const containerWidthRef = useRef<number>(0);
  
  // Swipe animation state
  const [isAnimating, setIsAnimating] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  
  // Horizontal gesture locking state
  const [isHorizontalGesture, setIsHorizontalGesture] = useState(false);
  const [gestureStartY, setGestureStartY] = useState(0);

  // Calculate pages for carousel mode
  const totalPages = layout === 'carousel' ? Math.ceil(cards.length / 3) : 1;
  const cardPages = layout === 'carousel' ? Array.from({
    length: totalPages
  }, (_, i) => cards.slice(i * 3, i * 3 + 3)) : [cards];

  /**
   * Drag scroll handlers (for carousel mode)
   */
  const handleMouseDown = (e: React.MouseEvent) => {
    if (layout !== 'carousel' || !scrollContainerRef.current) return;
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
    if (!isDragging || layout !== 'carousel' || !scrollContainerRef.current) return;
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
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);
  const handleTouchStart = (e: React.TouchEvent) => {
    if (layout !== 'carousel' || !scrollContainerRef.current) return;
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
    if (!isDragging || layout !== 'carousel' || !scrollContainerRef.current) return;
    
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
      const walk = (x - startX) * 2;
      // Determine swipe direction for animation
      if (deltaX > 10) {
        setSwipeDirection((x - startX) > 0 ? 'right' : 'left');
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

  // Enhanced touch handling for mobile carousel
  const [touchStart, setTouchStart] = useState({
    x: 0,
    y: 0
  });
  const [touchEnd, setTouchEnd] = useState({
    x: 0,
    y: 0
  });
  const [touchTimeout, setTouchTimeout] = useState<NodeJS.Timeout | null>(null);
  
  const handleMobileTouchStart = (e: React.TouchEvent) => {
    const touch = e.targetTouches[0];
    setTouchStart({
      x: touch.clientX,
      y: touch.clientY
    });
    setTouchEnd({
      x: 0,
      y: 0
    });
    
    // Clear any existing timeout
    if (touchTimeout) {
      clearTimeout(touchTimeout);
    }
    
    // Set a timeout to reset touch state if no movement occurs
    const timeout = setTimeout(() => {
      setTouchStart({ x: 0, y: 0 });
      setTouchEnd({ x: 0, y: 0 });
    }, 1000); // Reset after 1 second of no movement
    
    setTouchTimeout(timeout);
  };
  const handleMobileTouchMove = (e: React.TouchEvent) => {
    const touch = e.targetTouches[0];
    setTouchEnd({
      x: touch.clientX,
      y: touch.clientY
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
        if (layout === 'carousel') {
          goToNextPage();
        } else {
          const newIndex = currentPage < cards.length - 1 ? currentPage + 1 : 0;
          setCurrentPage(newIndex);
        }
      }
      if (isRightSwipe) {
        if (layout === 'carousel') {
          goToPreviousPage();
        } else {
          const newIndex = currentPage > 0 ? currentPage - 1 : cards.length - 1;
          setCurrentPage(newIndex);
        }
      }
    }
    
    // Always reset touch state after touch end to allow vertical scrolling
    setTouchStart({ x: 0, y: 0 });
    setTouchEnd({ x: 0, y: 0 });
  };

  // Handle touch cancel events (when touch is interrupted)
  const handleMobileTouchCancel = () => {
    // Clear any pending timeout
    if (touchTimeout) {
      clearTimeout(touchTimeout);
      setTouchTimeout(null);
    }
    
    // Reset touch state immediately on cancel
    setTouchStart({ x: 0, y: 0 });
    setTouchEnd({ x: 0, y: 0 });
  };

  /**
   * Navigation functions (for carousel mode)
   */
  const scrollToPage = (pageIndex: number) => {
    if (layout !== 'carousel' || !scrollContainerRef.current) return;
    // Use cached width if available, otherwise read it once
    const containerWidth = containerWidthRef.current || scrollContainerRef.current.offsetWidth;
    if (!containerWidthRef.current) {
      containerWidthRef.current = containerWidth;
    }
    // Use requestAnimationFrame to batch DOM operations
    requestAnimationFrame(() => {
      if (!scrollContainerRef.current) return;
      scrollContainerRef.current.scrollTo({
        left: pageIndex * containerWidth,
        behavior: 'smooth'
      });
    });
    setCurrentPage(pageIndex);
  };
  const goToPreviousPage = () => {
    const newPage = currentPage > 0 ? currentPage - 1 : totalPages - 1;
    scrollToPage(newPage);
  };
  const goToNextPage = () => {
    const newPage = currentPage < totalPages - 1 ? currentPage + 1 : 0;
    scrollToPage(newPage);
  };

  // Cache container width on mount and resize (carousel mode)
  useEffect(() => {
    if (layout !== 'carousel') return;
    const updateContainerWidth = () => {
      if (scrollContainerRef.current) {
        containerWidthRef.current = scrollContainerRef.current.offsetWidth;
      }
    };
    updateContainerWidth();
    window.addEventListener('resize', updateContainerWidth);
    return () => window.removeEventListener('resize', updateContainerWidth);
  }, [layout]);

  /**
   * Update current page based on scroll position (carousel mode)
   */
  useEffect(() => {
    if (layout !== 'carousel') return;
    let rafId: number | null = null;
    const handleScroll = () => {
      if (!isDragging) {
        // Cancel any pending animation frame
        if (rafId !== null) {
          cancelAnimationFrame(rafId);
        }
        
        // Use requestAnimationFrame to batch DOM reads
        rafId = requestAnimationFrame(() => {
          if (!scrollContainerRef.current) return;
          const container = scrollContainerRef.current;
          // Batch all DOM reads together
          const scrollPosition = container.scrollLeft;
          // Use cached width to avoid forced reflow
          const containerWidth = containerWidthRef.current || container.offsetWidth;
          if (!containerWidthRef.current) {
            containerWidthRef.current = containerWidth;
          }
          const newPage = Math.round(scrollPosition / containerWidth);
          setCurrentPage(newPage);
          rafId = null;
        });
      }
    };
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        container.removeEventListener('scroll', handleScroll);
        if (rafId !== null) {
          cancelAnimationFrame(rafId);
        }
      };
    }
  }, [layout, isDragging]);

  /**
   * Render individual card
   */
  const renderCard = (card: CardData, index: number) => {
    // Use FlippableCard if flippable prop is true
    if (flippable) {
      return <FlippableCard key={card.id || index} card={card} index={index} showImages={showImages} onCardAction={onCardAction} />;
    }

    // Original card rendering (non-flippable)
    const IconComponent = card.icon;
    const delay = index * 100;
    return <ScrollAnimationWrapper key={card.id || index} direction="top" delay={delay}>
        <Card className="group hover:shadow-sm sm:hover:shadow-lg transition-all duration-300 hover:shadow-xl hover:border-primary/20 h-full flex flex-col" data-card-interactive>
          {/* Image Section */}
          {showImages && card.image && <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
              {card.image.startsWith('http') ?
          // Use regular img tag for external URLs only
          <img src={card.image} alt={card.title} className="w-full h-full object-cover" loading="lazy" decoding="async" onError={e => {
            console.log('Image failed to load:', card.image);
            (e.currentTarget as HTMLElement).style.display = 'none';
            const fallback = e.currentTarget.nextElementSibling as HTMLElement;
            if (fallback) fallback.style.display = 'flex';
          }} /> :
          // Use OptimizedImage for all other images
          <OptimizedImage imageName={card.image} alt={card.title} category="initiative" className="w-full h-full" aspectRatio="16/9" loading="lazy" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />}
              {/* Fallback for failed images */}
              <div className="w-full h-full bg-muted flex items-center justify-center" style={{
            display: 'none'
          }}>
                <span className="text-sm text-muted-foreground">Image not found</span>
              </div>
            </div>}
          
          {/* Icon Section (alternative to image) */}
          {!showImages && IconComponent && <div className="flex justify-center pt-6">
              <div className="w-16 h-16 mx-auto bg-accent/10 rounded-full flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-accent/20">
                <IconComponent className="w-8 h-8 text-accent" />
              </div>
            </div>}
          
          <CardHeader className={cn("flex-shrink-0", !showImages && !IconComponent && "text-center")}>
            <CardTitle className="text-xl">{card.title}</CardTitle>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col justify-between">
            <p className="text-muted-foreground leading-relaxed mb-4">
              {card.description}
            </p>
            
            {/* Action Button */}
            {(card.buttonText || onCardAction) && <Button onClick={() => {
            if (card.buttonAction) {
              card.buttonAction();
            } else if (onCardAction) {
              onCardAction(card, index);
            }
          }} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-colors mt-auto">
                {card.buttonText || 'Learn More'}
              </Button>}
          </CardContent>
        </Card>
      </ScrollAnimationWrapper>;
  };
  const sectionBgClass = bgColor === 'muted' ? 'bg-muted/30' : 'bg-background';
  return <section className={cn('py-16', sectionBgClass, className)} data-section="how-we-do-it">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <ScrollAnimationWrapper direction="top" delay={0}>
            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">
              {title}
            </h2>
          </ScrollAnimationWrapper>
          {description && <ScrollAnimationWrapper direction="top" delay={100}>
              <p className="text-lg text-muted-foreground">
                {description}
              </p>
            </ScrollAnimationWrapper>}
        </div>

        {/* DESKTOP LAYOUT */}
        {layout === 'carousel' ?
      // Desktop Carousel Layout (like Featured Projects)
      <div className="hidden xl:block">
            {/* Pagination Dots */}
            {totalPages > 1 && <div className="flex justify-center items-center mb-6 space-x-2">
                {cardPages.map((_, index) => <button key={index} onClick={() => scrollToPage(index)} className={cn('h-4 rounded-full transition-all duration-300', index === currentPage ? 'bg-primary w-12 shadow-lg shadow-primary/30' : 'bg-primary/40 hover:bg-primary/60 w-4')} aria-label={`Go to page ${index + 1}`} />)}
              </div>}

            {/* Drag-scrollable Container */}
            <div ref={scrollContainerRef} className={cn('relative overflow-x-auto overflow-y-hidden scrollbar-hide', isDragging ? 'cursor-grabbing' : 'cursor-grab', 
              isAnimating 
                ? swipeDirection === 'left' 
                  ? 'animate-slide-out-left' 
                  : 'animate-slide-out-right'
                : ''
            )} style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch'
        }} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseLeave} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
              <div className="flex">
                {cardPages.map((pageCards, pageIndex) => <div key={pageIndex} className="w-full flex-shrink-0 px-2" style={{
              scrollSnapAlign: 'start'
            }}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch auto-rows-fr">
                      {pageCards.map((card, cardIndex) => renderCard(card, cardIndex))}
                    </div>
                  </div>)}
              </div>
            </div>
          </div> :
      // Desktop Grid Layout (like How do we do it)
      <div className="hidden lg:block">
            <div className="grid grid-cols-3 gap-8 items-stretch auto-rows-fr">
              {cards.map((card, index) => renderCard(card, index))}
            </div>
          </div>}

        {/* TABLET LAYOUT - 2+1 Layout (2 on top, 1 centered below) */}
        <div className="hidden md:block lg:hidden">
          <div className="space-y-8">
            {/* Top row - 2 items */}
            <div className="grid grid-cols-2 gap-8 items-stretch auto-rows-fr">
              {cards.slice(0, 2).map((card, index) => renderCard(card, index))}
            </div>
            
            {/* Bottom row - 1 item centered */}
            {cards[2] && <div className="flex justify-center">
                <div className="w-full max-w-md">
                  {renderCard(cards[2], 2)}
                </div>
              </div>}
          </div>
        </div>

        {/* MOBILE LAYOUT - Single column with navigation arrows */}
        <div className="md:hidden">
          {layout === 'carousel' && totalPages > 1 ?
        // Mobile Carousel with arrows
        <div className="relative">
              {/* Mobile Pagination Dots */}
              {totalPages > 1 && <div className="flex justify-center items-center mb-6 space-x-2">
                  {cardPages.map((_, index) => <button key={index} onClick={() => scrollToPage(index)} className={cn('h-3 rounded-full transition-all duration-300', index === currentPage ? 'bg-primary w-8 shadow-lg shadow-primary/30' : 'bg-primary/40 hover:bg-primary/60 w-3')} aria-label={`Go to page ${index + 1}`} />)}
                </div>}

              {/* Navigation Arrows */}
              <button onClick={goToPreviousPage} className="absolute left-1 top-1/2 -translate-y-1/2 z-20 text-foreground/60 hover:text-foreground text-3xl font-bold transition-all duration-200 hover:scale-110" aria-label="Previous">
                ‹
              </button>
              
              <button onClick={goToNextPage} className="absolute right-1 top-1/2 -translate-y-1/2 z-20 text-foreground/60 hover:text-foreground text-3xl font-bold transition-all duration-200 hover:scale-110" aria-label="Next">
                ›
              </button>

              {/* Single Card Display */}
              <div className="px-8" onTouchStart={handleMobileTouchStart} onTouchMove={handleMobileTouchMove} onTouchEnd={handleMobileTouchEnd} onTouchCancel={handleMobileTouchCancel} style={{
            touchAction: 'auto'
          }}>
                <div className="grid grid-cols-1 gap-6">
                  {cardPages[currentPage]?.map((card, index) => renderCard(card, index))}
                </div>
              </div>
            </div> :
        // Mobile single card carousel with arrows
        cards.length > 1 ? <div className="relative">
                {/* Mobile Pagination Dots */}
                <div className="flex justify-center items-center mb-6 space-x-2">
                  {cards.map((_, index) => <button key={index} onClick={() => setCurrentPage(index)} className={cn('h-3 rounded-full transition-all duration-300', index === currentPage ? 'bg-primary w-8 shadow-lg shadow-primary/30' : 'bg-primary/40 hover:bg-primary/60 w-3')} aria-label={`Go to card ${index + 1}`} />)}
                </div>

                {/* Navigation Arrows */}
                <button onClick={() => {
            const newIndex = currentPage > 0 ? currentPage - 1 : cards.length - 1;
            setCurrentPage(newIndex);
          }} className="absolute left-1 top-1/2 -translate-y-1/2 z-20 text-foreground/60 hover:text-foreground text-3xl font-bold transition-all duration-200 hover:scale-110" aria-label="Previous card">
                  ‹
                </button>
                
                <button onClick={() => {
            const newIndex = currentPage < cards.length - 1 ? currentPage + 1 : 0;
            setCurrentPage(newIndex);
          }} className="absolute right-1 top-1/2 -translate-y-1/2 z-20 text-foreground/60 hover:text-foreground text-3xl font-bold transition-all duration-200 hover:scale-110" aria-label="Next card">
                  ›
                </button>

                {/* Single Card Display */}
                <div onTouchStart={handleMobileTouchStart} onTouchMove={handleMobileTouchMove} onTouchEnd={handleMobileTouchEnd} onTouchCancel={handleMobileTouchCancel} style={{
            touchAction: 'auto'
          }} className="px-8 touch-pan-x">
                  <div className="transition-all duration-300">
                    {renderCard(cards[currentPage], currentPage)}
                  </div>
                </div>
              </div> :
        // Single card without navigation
        <div className="px-8">
                {cards[0] && renderCard(cards[0], 0)}
              </div>}
        </div>
      </div>
    </section>;
};