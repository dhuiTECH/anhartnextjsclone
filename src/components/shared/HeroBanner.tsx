import React from 'react';
import OptimizedImage from '@/components/OptimizedImage';

/**
 * HeroBanner Component
 * 
 * A reusable hero banner component that provides consistent styling and layout
 * across different pages. Features a background image with gradient overlays
 * and customizable content positioning.
 * 
 * @param backgroundImage - URL or imported image for the background
 * @param title - Main heading text
 * @param subtitle - Optional subtitle text
 * @param contentPosition - Position of content ('left', 'center', 'right')
 * @param className - Additional CSS classes
 */
interface HeroBannerProps {
  backgroundImage: string;
  title: string;
  subtitle?: string;
  contentPosition?: 'left' | 'center' | 'right';
  className?: string;
}
export const HeroBanner: React.FC<HeroBannerProps> = ({
  backgroundImage,
  title,
  subtitle,
  contentPosition = 'right',
  className = ''
}) => {
  const getContentAlignment = () => {
    switch (contentPosition) {
      case 'left':
        return 'justify-start pl-12';
      case 'center':
        return 'justify-center';
      case 'right':
        return 'justify-end pr-12';
      default:
        return 'justify-end pr-12';
    }
  };
  return <section className={`relative h-80 overflow-hidden ${className}`}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <OptimizedImage imageName={backgroundImage} alt={title} category="hero" className="w-full h-full object-cover object-left" priority={true} aspectRatio="16/9" sizes="100vw" />
      </div>
      
      {/* Primary Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-red-400/80" />
      
      {/* Secondary Geometric Overlay */}
      <div className="absolute inset-0" style={{
      background: `linear-gradient(135deg, transparent 40%, #E57373cc 40%)`
    }} />
      
      {/* Content Container */}
      <div className={`relative z-10 flex items-center h-full px-6 ${getContentAlignment()}`}>
        <div className="text-center max-w-md">
          <h1 className="text-4xl text-white max-w-md text-center font-bold md:text-5xl animate-slide-in-right">
            {title}
          </h1>
          {subtitle && <p className="text-lg text-white/90">
              {subtitle}
            </p>}
        </div>
      </div>
    </section>;
};