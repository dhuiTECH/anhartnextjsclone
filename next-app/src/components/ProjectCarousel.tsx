"use client";

/**
 * =============================================================================
 * PROJECT CAROUSEL COMPONENT
 * =============================================================================
 *
 * A 3D carousel component that displays project images with smooth animations.
 * Features include:
 * - 3D perspective transforms with rotateY for depth effect
 * - Smooth CSS transitions between states
 * - Circular navigation (wraps around)
 * - Touch/drag support for mobile
 * - Responsive design
 * - Keyboard navigation (arrow keys)
 *
 * @author Anhart Development Team
 * @version 1.0.0
 */

import React, { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";

// =============================================================================
// TYPES
// =============================================================================

export interface CarouselItem {
  id: string;
  imageUrl: string;
  altText: string;
  title?: string;
  link?: string;
}

interface ProjectCarouselProps {
  items: CarouselItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

type Position = "CENTER" | "LEFT" | "RIGHT" | "HIDDEN";

// =============================================================================
// VISUAL STATE CONFIGURATION
// =============================================================================

const VISUAL_STATES = {
  CENTER: {
    translateX: 0,
    scale: 1,
    rotateY: 0,
    opacity: 1,
    zIndex: 30,
  },
  LEFT: {
    translateX: -55, // percentage
    scale: 0.75,
    rotateY: 25, // degrees - rotate toward viewer on left side
    opacity: 0.6,
    zIndex: 20,
  },
  RIGHT: {
    translateX: 55, // percentage
    scale: 0.75,
    rotateY: -25, // degrees - rotate toward viewer on right side
    opacity: 0.6,
    zIndex: 20,
  },
  HIDDEN: {
    translateX: 0,
    scale: 0.5,
    rotateY: 0,
    opacity: 0,
    zIndex: 0,
  },
} as const;

// Responsive visual states for mobile
const VISUAL_STATES_MOBILE = {
  CENTER: {
    translateX: 0,
    scale: 1,
    rotateY: 0,
    opacity: 1,
    zIndex: 30,
  },
  LEFT: {
    translateX: -40,
    scale: 0.8,
    rotateY: 15,
    opacity: 0.5,
    zIndex: 20,
  },
  RIGHT: {
    translateX: 40,
    scale: 0.8,
    rotateY: -15,
    opacity: 0.5,
    zIndex: 20,
  },
  HIDDEN: {
    translateX: 0,
    scale: 0.5,
    rotateY: 0,
    opacity: 0,
    zIndex: 0,
  },
} as const;

// =============================================================================
// POSITION RESOLUTION LOGIC
// =============================================================================

/**
 * Resolves the visual position of an item based on its index relative to the active item.
 * Supports circular wrapping for seamless navigation.
 */
function resolvePosition(
  itemIndex: number,
  activeIndex: number,
  totalItems: number
): Position {
  if (totalItems === 0) return "HIDDEN";
  
  const offset = itemIndex - activeIndex;

  // Center position
  if (offset === 0) {
    return "CENTER";
  }

  // Left position (directly before center, with circular wrap)
  if (offset === -1 || offset === totalItems - 1) {
    return "LEFT";
  }

  // Right position (directly after center, with circular wrap)
  if (offset === 1 || offset === -(totalItems - 1)) {
    return "RIGHT";
  }

  return "HIDDEN";
}

// =============================================================================
// CAROUSEL CARD COMPONENT
// =============================================================================

interface CarouselCardProps {
  item: CarouselItem;
  position: Position;
  isMobile: boolean;
  onClick?: () => void;
}

const CarouselCard: React.FC<CarouselCardProps> = ({
  item,
  position,
  isMobile,
  onClick,
}) => {
  const states = isMobile ? VISUAL_STATES_MOBILE : VISUAL_STATES;
  const state = states[position];

  const cardStyle: React.CSSProperties = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: `
      translate(-50%, -50%)
      translateX(${state.translateX}%)
      scale(${state.scale})
      rotateY(${state.rotateY}deg)
    `,
    opacity: state.opacity,
    zIndex: state.zIndex,
    transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
    transformStyle: "preserve-3d",
    cursor: position !== "CENTER" ? "pointer" : "default",
  };

  const content = (
    <div
      className="relative rounded-2xl overflow-hidden shadow-2xl bg-background"
      style={{
        width: isMobile ? "280px" : "400px",
        height: isMobile ? "200px" : "280px",
        backfaceVisibility: "hidden",
      }}
    >
      <img
        src={item.imageUrl}
        alt={item.altText}
        className="w-full h-full object-cover"
        loading="lazy"
        draggable={false}
      />
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      
      {/* Title overlay */}
      {item.title && position === "CENTER" && (
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="text-lg md:text-xl font-bold drop-shadow-lg">
            {item.title}
          </h3>
        </div>
      )}
    </div>
  );

  // If it's not the center card, make it clickable to navigate
  if (position !== "CENTER" && onClick) {
    return (
      <div
        style={cardStyle}
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
          }
        }}
        aria-label={`View ${item.altText}`}
      >
        {content}
      </div>
    );
  }

  // Center card with optional link
  if (item.link && position === "CENTER") {
    return (
      <div style={cardStyle}>
        <Link href={item.link} className="block">
          {content}
        </Link>
      </div>
    );
  }

  return <div style={cardStyle}>{content}</div>;
};

// =============================================================================
// MAIN CAROUSEL COMPONENT
// =============================================================================

export const ProjectCarousel: React.FC<ProjectCarouselProps> = ({
  items,
  autoPlay = false,
  autoPlayInterval = 5000,
  className = "",
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // =============================================================================
  // RESPONSIVE HANDLING
  // =============================================================================

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // =============================================================================
  // NAVIGATION FUNCTIONS
  // =============================================================================

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const goPrevious = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  // =============================================================================
  // AUTO-PLAY
  // =============================================================================

  useEffect(() => {
    if (autoPlay && items.length > 1) {
      autoPlayRef.current = setInterval(goNext, autoPlayInterval);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [autoPlay, autoPlayInterval, goNext, items.length]);

  // Pause auto-play on interaction
  const pauseAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, []);

  // =============================================================================
  // KEYBOARD NAVIGATION
  // =============================================================================

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        pauseAutoPlay();
        goPrevious();
      } else if (e.key === "ArrowRight") {
        pauseAutoPlay();
        goNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrevious, pauseAutoPlay]);

  // =============================================================================
  // DRAG/SWIPE HANDLING
  // =============================================================================

  const handleDragStart = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      setIsDragging(true);
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      setDragStartX(clientX);
      pauseAutoPlay();
    },
    [pauseAutoPlay]
  );

  const handleDragEnd = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!isDragging) return;

      const clientX =
        "changedTouches" in e ? e.changedTouches[0].clientX : e.clientX;
      const diff = clientX - dragStartX;
      const threshold = 50;

      if (diff > threshold) {
        goPrevious();
      } else if (diff < -threshold) {
        goNext();
      }

      setIsDragging(false);
    },
    [isDragging, dragStartX, goNext, goPrevious]
  );

  // =============================================================================
  // RENDER
  // =============================================================================

  if (items.length === 0) {
    return null;
  }

  return (
    <div className={`relative w-full ${className}`}>
      {/* Carousel Container */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden select-none"
        style={{
          perspective: "1000px",
          perspectiveOrigin: "50% 50%",
          height: isMobile ? "280px" : "380px",
        }}
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onMouseLeave={() => isDragging && setIsDragging(false)}
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
        role="region"
        aria-label="Project carousel"
        aria-roledescription="carousel"
      >
        {/* 3D Stage */}
        <div
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          {items.map((item, index) => {
            const position = resolvePosition(index, activeIndex, items.length);
            
            // Handle click on side cards to navigate
            const handleCardClick = () => {
              if (position === "LEFT") {
                pauseAutoPlay();
                goPrevious();
              } else if (position === "RIGHT") {
                pauseAutoPlay();
                goNext();
              }
            };

            return (
              <CarouselCard
                key={item.id}
                item={item}
                position={position}
                isMobile={isMobile}
                onClick={position !== "CENTER" ? handleCardClick : undefined}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProjectCarousel;

