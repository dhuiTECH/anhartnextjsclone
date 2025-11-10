/**
 * Image Usage Examples
 * 
 * This file demonstrates how to use the new optimized image system
 * with WebP/AVIF support and responsive loading.
 */

import React from 'react';
import OptimizedImage from '@/components/OptimizedImage';

const ImageUsageExample: React.FC<{
  children?: React.ReactNode;
}> = (
  {
    children
  }
) => {
  return (
    <div className="space-y-8 p-8">
      <h1 className="text-3xl font-bold">Optimized Image Usage Examples</h1>
      
      {/* Example 1: Hero Image */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Hero Image (High Priority)</h2>
        <div className="h-64 w-full">
          <OptimizedImage
            imageName="about-hero"
            alt="About page hero image"
            category="hero"
            priority={true}
            className="w-full h-full object-cover rounded-lg"
            aspectRatio="16/9"
            sizes="100vw"
          />
        </div>
      </section>

      {/* Example 2: Project Images */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Project Images (Lazy Loaded)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="h-48">
            <OptimizedImage
              imageName="162Main"
              alt="162 Main Street project"
              category="project"
              className="w-full h-full object-cover rounded-lg"
              aspectRatio="16/9"
              loading="lazy"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
          <div className="h-48">
            <OptimizedImage
              imageName="Ryder_1"
              alt="The Ryder project"
              category="project"
              className="w-full h-full object-cover rounded-lg"
              aspectRatio="16/9"
              loading="lazy"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
          <div className="h-48">
            <OptimizedImage
              imageName="Jubilee-Sign"
              alt="Jubilee Rooms project"
              category="portfolio"
              className="w-full h-full object-cover rounded-lg"
              aspectRatio="16/9"
              loading="lazy"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        </div>
      </section>

      {/* Example 3: Initiative Images */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Initiative Images</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-48">
            <OptimizedImage
              imageName="sustainable-homes-initiative"
              alt="Sustainable homes initiative"
              category="initiative"
              className="w-full h-full object-cover rounded-lg"
              aspectRatio="16/9"
              loading="lazy"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
            />
          </div>
          <div className="h-48">
            <OptimizedImage
              imageName="affordable-living-complex"
              alt="Affordable living complex"
              category="initiative"
              className="w-full h-full object-cover rounded-lg"
              aspectRatio="16/9"
              loading="lazy"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Example 4: Custom Sizing */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Custom Sizing and Aspect Ratios</h2>
        <div className="flex gap-4">
          <div className="w-32 h-32">
            <OptimizedImage
              imageName="162Main"
              alt="Square image"
              category="project"
              className="w-full h-full object-cover rounded-lg"
              aspectRatio="1/1"
              loading="lazy"
              sizes="128px"
            />
          </div>
          <div className="w-48 h-32">
            <OptimizedImage
              imageName="about-hero"
              alt="Wide image"
              category="hero"
              className="w-full h-full object-cover rounded-lg"
              aspectRatio="3/2"
              loading="lazy"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Example 5: Error Handling */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Error Handling (Non-existent Image)</h2>
        <div className="h-48 w-64">
          <OptimizedImage
            imageName="non-existent-image"
            alt="This image doesn't exist"
            category="project"
            className="w-full h-full object-cover rounded-lg"
            aspectRatio="16/9"
            loading="lazy"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        </div>
      </section>
    </div>
  );
};

export default ImageUsageExample;
