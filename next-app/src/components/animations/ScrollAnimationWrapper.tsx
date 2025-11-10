'use client';

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ReactNode } from "react";

interface ScrollAnimationWrapperProps {
  children: ReactNode;
  direction?: "left" | "right" | "top" | "bottom";
  delay?: number;
  className?: string;
}

export const ScrollAnimationWrapper = ({
  children,
  direction = "left",
  delay = 0,
  className = "",
}: ScrollAnimationWrapperProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true });

  const getAnimationClass = () => {
    if (!isVisible) return "opacity-0";
    
    switch (direction) {
      case "left":
        return "animate-slide-in-left";
      case "right":
        return "animate-slide-in-right";
      case "top":
        return "animate-slide-in-down";
      case "bottom":
        return "animate-slide-in-up";
      default:
        return "animate-fade-in";
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-in-out ${getAnimationClass()} ${className}`}
      style={{ 
        transitionDelay: `${delay}ms`,
        animationDelay: `${delay}ms`,
        willChange: isVisible ? 'auto' : 'transform, opacity'
      }}
    >
      {children}
    </div>
  );
};
