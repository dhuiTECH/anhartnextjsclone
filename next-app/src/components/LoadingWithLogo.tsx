"use client";

import { useEffect, useState } from "react";
import anhartLogoWebp from "@/assets/anhart-logo.webp";
import anhartLogoPng from "@/assets/anhart-logo.png";
import { motion } from "framer-motion";

const anhartLogoWebpSrc =
  typeof anhartLogoWebp === "string"
    ? anhartLogoWebp
    : anhartLogoWebp?.src || "";
const anhartLogoPngSrc =
  typeof anhartLogoPng === "string" ? anhartLogoPng : anhartLogoPng?.src || "";

interface LoadingWithLogoProps {
  message?: string;
  onLoadingComplete?: () => void;
}

export function LoadingWithLogo({ 
  message = "Loading...", 
  onLoadingComplete 
}: LoadingWithLogoProps) {
  const [colorProgress, setColorProgress] = useState(0);

  useEffect(() => {
    // Animate from grayscale (0) to full color (1) over 2 seconds for a smooth transition
    const duration = 2000;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease-out cubic function for smooth, natural animation
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setColorProgress(easedProgress);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else if (onLoadingComplete) {
        // Optional callback when animation completes
        onLoadingComplete();
      }
    };
    
    // Start animation immediately
    requestAnimationFrame(animate);
  }, [onLoadingComplete]);

  // Calculate grayscale filter value (0 = full color, 1 = full grayscale)
  const grayscaleValue = 1 - colorProgress;
  
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-8 px-4">
        {/* Animated Logo */}
        <motion.div
          className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <picture className="block w-full h-full">
            <source srcSet={anhartLogoWebpSrc} type="image/webp" />
            <img
              src={anhartLogoPngSrc}
              alt="Anhart Logo"
              className="w-full h-full object-contain"
              style={{
                filter: `grayscale(${grayscaleValue * 100}%)`,
                transition: "filter 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              width="400"
              height="400"
            />
          </picture>
          
          {/* Subtle pulsing ring effect */}
          <motion.div
            className="absolute inset-0 border-2 border-indigo-600/20 rounded-full pointer-events-none"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Loading Message */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <p className="text-lg sm:text-xl text-muted-foreground font-medium">
            {message}
          </p>
          
          {/* Loading Dots Animation */}
          <div className="flex items-center justify-center gap-1 mt-4">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="w-2 h-2 bg-indigo-600 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

