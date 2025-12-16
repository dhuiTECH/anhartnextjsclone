'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// FRAMER MOTION for animations (GSAP removed due to iframe compatibility issues)
import { useScroll, useTransform, motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

// NOTE: Navbar import removed because it is now in layout.tsx

const expertise = [
  {
    title: "Quality Cabins",
    description: "From timber-frame masterpieces to renovated A-frames, find a property that blends rustic charm with modern comfort.",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Resorts & Investment",
    description: "Commercial opportunities for boutique resorts, rental compounds, and hospitality ventures in high-traffic tourist zones.",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Land Acquisition",
    description: "Secure your legacy with pristine acreage. Expertise in zoning, water rights, and development potential.",
    image: "https://images.unsplash.com/photo-1470246973918-29a93221c455?q=80&w=2070&auto=format&fit=crop"
  }
];

export default function HomeClient() {
  // --- UPDATED LOGIC FOR SECTION 2 (Sticky Parallax) ---
  const villageRef = useRef(null);
  const { scrollYProgress: villageScrollProgress } = useScroll({
    target: villageRef,
    offset: ['start start', 'end start'] // Tracks when top of section hits top of screen
  })

  // This makes the image move slightly slower than the scroll (Parallax effect)
  const villageY = useTransform(villageScrollProgress, [0, 1], ["0%", "20%"]);

  // Mobile image switching state
  const [gardenFlatImage, setGardenFlatImage] = useState(0); // 0: exterior, 1: bedroom, 2: kitchen
  const [skyTownhomeImage, setSkyTownhomeImage] = useState(0); // 0: exterior, 1: bedroom, 2: kitchen

  // GSAP refs for tree animation
  const featuredSectionRef = useRef(null);
  const leftTreeRef = useRef(null);
  const rightTreeRef = useRef(null);

  // GSAP refs for mountain parallax
  const amenitiesSectionRef = useRef(null);
  const mountainRef = useRef(null);

  // --- EXISTING OBSERVERS ---
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    // REMOVED: The manual navbar scroll listener. 
    // The Navbar component in layout.tsx now handles its own state.

    return () => {
      revealElements.forEach(el => observer.unobserve(el));
    }
  }, []);

  // Tree and mountain animations removed - GSAP caused cross-origin iframe issues
  // The page works without these scroll-triggered animations

  return (
    // UPDATED: Added min-h-screen and flex-col to prevent scroll locking
    <div className="min-h-screen flex flex-col bg-[#f9f8f6] text-[#1a2621] font-sans antialiased selection:bg-[#1a2621] selection:text-white overflow-x-hidden">

      {/* Styles are now in merritt-styles.css - scoped to .merritt-wrapper */}

      {/* EDITORIAL FRAME */}
      <div className="fixed left-0 top-0 w-6 md:w-16 h-full bg-white z-[60]"></div>
      <div className="fixed right-0 top-0 w-6 md:w-16 h-full bg-white z-[60]"></div>

      {/* REMOVED: <Navbar /> (It is now in layout.tsx) */}

      {/* Hero Section */}
      <header className="relative h-[85vh] md:h-[90vh] w-full overflow-hidden flex items-center justify-center bg-black">
        <div className="absolute inset-0 z-0">
            <video
                src="/merritt-assets/Heroheader.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster="/merritt-assets/fullvillage.webp"
                className="w-full h-full object-cover border-0"
                style={{ filter: 'brightness(0.9)' }}
            />
            <div className="absolute inset-0 bg-black/30"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-8 md:px-6 mt-8 md:mt-12 min-h-[60vh]">
            <div className="max-w-4xl w-full">
                <h1 className="font-serif text-2xl md:text-5xl lg:text-6xl mb-4 md:mb-8 leading-tight font-bold opacity-0 animate-fade-up uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] drop-shadow-[0_0px_8px_rgba(0,0,0,0.5)] text-stroke-black text-center px-2" style={{ animationDelay: '0.4s' }}>
                    Affordable Homeownership<br/>in Merritt, BC
                </h1>
                <p className="text-sm md:text-base lg:text-lg font-bold tracking-[0.15em] leading-relaxed opacity-0 animate-fade-up text-white mb-4 md:mb-12 uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] drop-shadow-[0_0px_8px_rgba(0,0,0,0.5)] text-stroke-black text-center max-w-3xl mx-auto px-4" style={{ animationDelay: '0.6s' }}>
                    <span className="md:hidden">Modern townhomes for sale in Merritt, BC.</span>
                    <span className="hidden md:inline">Discover modern townhomes for sale in beautiful Merritt, BC. Your accessible gateway to homeownership in BC's scenic Nicola Valley.</span>
                </p>
            </div>
            <Link href="/Merritt/contact" className="inline-block bg-white text-[#1a2621] px-6 md:px-8 py-4 text-sm md:text-xs tracking-[0.2em] uppercase font-black rounded-full shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/30 hover:bg-[#a6906c] hover:text-white transition-all duration-300 opacity-0 animate-fade-up glow-hover cursor-pointer" style={{ animationDelay: '0.8s' }}>
                Contact Sales Team
            </Link>
        </div>
        <div className="absolute bottom-0 left-0 w-full leading-none z-20">
            <svg className="relative block w-full h-[80px] md:h-[120px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200" preserveAspectRatio="none">
                {/* Triangle shapes in white */}
                <g fill="#ffffff" fillOpacity="1">
                    {/* Left triangles */}
                    <polygon points="0,200 60,120 120,200"/>
                    <polygon points="80,200 140,140 200,200"/>
                    <polygon points="160,200 220,160 280,200"/>

                    {/* Center triangles */}
                    <polygon points="400,200 460,100 520,200"/>
                    <polygon points="480,200 540,130 600,200"/>
                    <polygon points="560,200 620,150 680,200"/>

                    {/* Right triangles */}
                    <polygon points="800,200 860,120 920,200"/>
                    <polygon points="880,200 940,140 1000,200"/>
                    <polygon points="960,200 1020,160 1080,200"/>

                    {/* Additional scattered triangles */}
                    <polygon points="300,200 340,170 380,200"/>
                    <polygon points="700,200 740,180 780,200"/>
                    <polygon points="1100,200 1140,150 1180,200"/>
                    <polygon points="1200,200 1240,130 1280,200"/>
                    <polygon points="1300,200 1340,160 1380,200"/>
                </g>
            </svg>
        </div>
      </header>

      {/* Tropical Living Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 pb-24 md:pb-24 lg:pb-32 bg-white overflow-visible">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">

          {/* LEFT COLUMN: Text Content */}
          <div className="flex flex-col items-start space-y-6 md:space-y-8">
            <span className="text-teal-500 font-bold text-xs tracking-[0.2em] uppercase">
              Affordable Homeownership
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-6xl font-serif text-slate-800 leading-tight">
              Simply the best <br />
              <span className="italic text-[#A05C4D] font-light">value</span> in BC.
            </h2>

            <div className="space-y-4 md:space-y-6 text-gray-500 leading-relaxed">
              <p className="text-sm md:text-base">
                We believe housing should be within reach. As a dedicated affordable housing developer, we are proud to introduce our newest community at 3757 De Wolf Way, Merritt, BC.
              </p>
              <p className="text-sm md:text-base">
                We are developing 48 entry-level 2 and 3-bedroom townhomes designed for real families. Accessible homeownership is finally here, with prices starting at{' '}
                <motion.span
                  className="inline-block"
                  initial={{ color: '#6b7280' }}
                  whileInView={{
                    color: '#dc2626',
                    textShadow: '0 0 8px rgba(220, 38, 38, 0.5)'
                  }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  viewport={{ once: true, margin: '-50px' }}
                >
                  $249k
                </motion.span>
                .
              </p>
            </div>

            {/* Pill Button */}
            <div className="mt-8">
              <Link
                href="https://anhart.ca/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-[#1a2621] px-6 py-3 text-sm font-bold uppercase tracking-wider rounded-full shadow-lg hover:bg-[#a6906c] hover:text-white transition-all duration-300 cursor-pointer glow-hover"
              >
                Learn More About Anhart
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: Image Stack - CORRECTED STRUCTURE */}
          {/* The wrapper must be relative to anchor the absolute surfer image */}
          <div className="relative mt-6 md:mt-12 lg:mt-0 md:pl-10">

            {/* 1. Main Resort Image (The Anchor) */}
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/merritt-assets/livingroom.jpg"
                alt="Modern living room"
                width={800}
                height={600}
                priority
                className="w-full h-auto object-cover"
              />
            </div>

            {/* 2. Overlapping Keith Image (The Floater) */}
            {/* Positioned absolute relative to the parent div, NOT inside the image div */}
            <div className="absolute z-20 -bottom-12 md:-bottom-16 left-12 md:-left-6 w-[35%] md:w-[45%] border-[4px] md:border-[8px] border-white rounded-lg shadow-2xl overflow-hidden">
               {/* Aspect ratio square for Keith */}
              <div className="aspect-square relative">
                  <Image
                  src="/merritt-assets/keithpicture.jpg"
                  alt="Keith"
                  fill
                  className="object-cover"
                  />
              </div>
            </div>

            {/* Keith's Title */}
            <div className="absolute z-30 -bottom-16 md:-bottom-24 left-12 md:-left-6 w-[35%] md:w-[45%] flex justify-center">
              <p className="text-white font-black text-xs md:text-sm tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] drop-shadow-[0_0px_8px_rgba(0,0,0,0.6)] text-center">
                Co-Founder Keith Wiebe Gordon
              </p>
            </div>


          {/* Optional: Background decorative blob to match the 'glow' in your screenshot */}
          <div className="absolute -top-12 -right-12 w-full h-full bg-white/50 rounded-full blur-3xl -z-10" />
          </div>

        </div>
        </div>
      </section>

      {/* --- SECTION 2: STICKY PARALLAX IMAGE --- */}
      {/* 1. h-screen: Ensures it takes up full view
          2. sticky top-0: Makes it stick to viewport top
          3. z-0: Puts it BEHIND the next section
      */}
      <section ref={villageRef} className="relative w-full h-[80vh] md:h-[90vh] lg:h-screen sticky top-0 z-0 overflow-hidden bg-white">
        <motion.div
          className="w-full h-full absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden"
          style={{ y: villageY }}
        >
          <picture className="w-full h-full">
            <source srcSet="/merritt-assets/fullvillage.webp" type="image/webp" />
            <img
              src="/merritt-assets/fullvillage.jpg"
              alt="Full village landscape"
              className="w-full h-full object-cover scale-110"
            />
          </picture>
        </motion.div>
      </section>

      {/* Featured Units and Homes */}
      <section ref={featuredSectionRef} className="relative bg-white py-12 md:py-16 lg:py-24 overflow-hidden">
        <div className="container mx-auto px-6 md:px-8">
          <div className="text-center mb-8 md:mb-12">
            <span className="text-xs uppercase tracking-widest-xl text-[#1a2621]/50">Available Properties</span>
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl mt-4 text-[#1a2621]">Featured Units & Homes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            {/* Garden Flat (2-Bedroom) */}
            <div className="bg-white rounded-xl shadow-xl border border-[#e6e2da] overflow-hidden group hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
              <div
                className="relative h-80 overflow-hidden group cursor-pointer md:cursor-default"
                onClick={() => setGardenFlatImage((prev) => (prev + 1) % 3)}
              >
                {/* Exterior Garden View - Default */}
                <img
                  src="/merritt-assets/seniorgarden.jpg"
                  alt="Garden Flat - Ground level 2-bedroom townhome with garden access"
                  loading="lazy"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    gardenFlatImage === 0 ? 'opacity-100' : 'opacity-0'
                  } group-hover:opacity-0`}
                />
                {/* Bedroom Interior - Shows immediately on hover */}
                <img
                  src="/merritt-assets/gbedroom.jpg"
                  alt="Garden Flat - Cozy bedroom interior"
                  loading="lazy"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    gardenFlatImage === 1 ? 'opacity-100' : 'opacity-0'
                  } group-hover:opacity-100`}
                />
                {/* Kitchen Interior - Shows after bedroom */}
                <img
                  src="/merritt-assets/gkitchen.jpg"
                  alt="Garden Flat - Functional kitchen interior"
                  loading="lazy"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    gardenFlatImage === 2 ? 'opacity-100' : 'opacity-0'
                  } group-hover:opacity-100 group-hover:delay-1000`}
                />
                <div className="absolute top-4 left-4">
                  <div className="w-16 h-8 bg-[#a6906c] rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg">GROUND</div>
                </div>
                {/* Mobile tap indicator */}
                <div className="absolute bottom-16 right-4 md:hidden">
                  <div className="bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                    Tap to explore
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-serif text-2xl text-white drop-shadow-lg" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 4px 8px rgba(0,0,0,0.6)' }}>Garden Flat</h3>
                  <p className="text-white/90 text-sm" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.6)' }}>2-Bedroom • 807 sq ft • From $249,000</p>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="mb-auto">
                  <p className="text-[#1a2621]/70 leading-relaxed mb-4 text-sm md:text-base">
                    <strong>Best For:</strong> First-time buyers, seniors/downsizers, or those with mobility needs.<br/>
                    <strong>Selling Point:</strong> Single-level living with zero stairs and direct patio access.
                  </p>
                  <div className="hidden md:block space-y-3">
                    <div className="border-l-4 border-[#a6906c] pl-4">
                      <span className="text-[#1a2621]/70 text-sm"><strong>2 Bedrooms:</strong> Primary with ensuite + guest/office</span>
                    </div>
                    <div className="border-l-4 border-[#a6906c] pl-4">
                      <span className="text-[#1a2621]/70 text-sm"><strong>Open Concept:</strong> Kitchen, dining & living flow together</span>
                    </div>
                    <div className="border-l-4 border-[#a6906c] pl-4">
                      <span className="text-[#1a2621]/70 text-sm"><strong>Direct Access:</strong> Grade-level patio for easy outdoor living</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <Link
                    href="/Merritt/floorplans"
                    className="w-full bg-[#a6906c] text-white py-3 px-4 rounded-lg hover:bg-[#8b7355] transition-colors text-sm font-semibold inline-block text-center glow-hover"
                  >
                    View Floor Plan
                  </Link>
                </div>
              </div>
            </div>

            {/* Sky Townhome (3-Bedroom) */}
            <div className="bg-white rounded-xl shadow-xl border border-[#e6e2da] overflow-hidden group hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
              <div
                className="relative h-80 overflow-hidden group cursor-pointer md:cursor-default"
                onClick={() => setSkyTownhomeImage((prev) => (prev + 1) % 3)}
              >
                {/* Exterior View - Default */}
                <img
                  src="/merritt-assets/family.jpg"
                  alt="Sky Townhome - Two-story 3-bedroom townhome exterior"
                  loading="lazy"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    skyTownhomeImage === 0 ? 'opacity-100' : 'opacity-0'
                  } group-hover:opacity-0`}
                />
                {/* Bedroom Interior - Shows immediately on hover */}
                <img
                  src="/merritt-assets/sbedroom.jpg"
                  alt="Sky Townhome - Master bedroom interior"
                  loading="lazy"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    skyTownhomeImage === 1 ? 'opacity-100' : 'opacity-0'
                  } group-hover:opacity-100`}
                />
                {/* Kitchen Interior - Shows after bedroom */}
                <img
                  src="/merritt-assets/skitchen.jpg"
                  alt="Sky Townhome - Modern kitchen interior"
                  loading="lazy"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    skyTownhomeImage === 2 ? 'opacity-100' : 'opacity-0'
                  } group-hover:opacity-100 group-hover:delay-1000`}
                />
                <div className="absolute top-4 left-4">
                  <div className="w-20 md:w-16 h-8 bg-[#a6906c] rounded-full flex items-center justify-center text-white font-bold text-[9px] md:text-[10px] shadow-lg px-2">2-STORY</div>
                </div>
                {/* Mobile tap indicator */}
                <div className="absolute bottom-16 right-4 md:hidden">
                  <div className="bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                    Tap to explore
                  </div>
                </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-serif text-2xl text-white drop-shadow-lg" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 4px 8px rgba(0,0,0,0.6)' }}>Sky Townhome</h3>
                    <p className="text-white/90 text-sm" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.6)' }}>3-Bedroom • 1,614 sq ft • From $279,000</p>
                  </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="mb-auto">
                  <p className="text-[#1a2621]/70 leading-relaxed mb-4 text-sm md:text-base">
                    <strong>Best For:</strong> Growing families, young professionals, or buyers wanting a "house-like" feel.<br/>
                    <strong>Selling Point:</strong> Massive two-story home with separate living and sleeping floors.
                  </p>
                  <div className="hidden md:block space-y-3">
                    <div className="border-l-4 border-[#a6906c] pl-4">
                      <span className="text-[#1a2621]/70 text-sm"><strong>Master Suite:</strong> Spacious with walk-in closet & ensuite</span>
                    </div>
                    <div className="border-l-4 border-[#a6906c] pl-4">
                      <span className="text-[#1a2621]/70 text-sm"><strong>Entertainer's Kitchen:</strong> Large U-shaped with window</span>
                    </div>
                    <div className="border-l-4 border-[#a6906c] pl-4">
                      <span className="text-[#1a2621]/70 text-sm"><strong>Private Deck:</strong> Balcony off the living area</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <Link
                    href="/Merritt/floorplans"
                    className="w-full bg-[#a6906c] text-white py-3 px-4 rounded-lg hover:bg-[#8b7355] transition-colors text-sm font-semibold inline-block text-center glow-hover"
                  >
                    View Floor Plan
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* GSAP Animated Trees - Moderately Taller */}
          <div ref={leftTreeRef} className="absolute bottom-0 left-8 md:left-12 w-96 md:w-[32rem] pointer-events-none z-20">
            <Image
              src="/merritt-assets/trees1.png"
              alt="Decorative pine tree"
              width={500}
              height={1500}
              className="object-contain w-full h-auto"
            />
          </div>

          <div ref={rightTreeRef} className="absolute bottom-0 right-8 md:right-12 w-96 md:w-[32rem] pointer-events-none z-20">
            <Image
              src="/merritt-assets/trees2.png"
              alt="Decorative pine tree"
              width={500}
              height={1500}
              className="object-contain w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Expertise Grid */}
      <section ref={amenitiesSectionRef} id="expertise" className="relative overflow-hidden py-12 md:py-20 border-t border-[#e6e2da]">

        {/* Mountain Background Image */}
        <div ref={mountainRef} className="absolute top-[-100px] left-0 right-0 w-full h-full z-0 pointer-events-none opacity-20">
          <Image
            src="/merritt-assets/mountains.png?v=2"
            alt="Merritt Mountains background"
            fill
            className="object-cover"
            style={{ objectPosition: 'center 0%' }}
            unoptimized
          />
        </div>

        {/* Existing Content wrapped in relative z-10 */}
        <div className="container mx-auto px-6 md:px-6 relative z-10">
            <div className="text-center mb-8 md:mb-12">
              <span className="text-xs uppercase tracking-widest-xl text-[#1a2621]/50">Location Advantages</span>
              <h2 className="font-serif text-3xl md:text-4xl mt-4 text-[#1a2621]">Three Best Amenities</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* 1. Walking Distance Highlights */}
              <div className="bg-white rounded-xl shadow-xl border border-[#e6e2da] overflow-hidden group hover:shadow-2xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src="/merritt-assets/NVIT.jpg"
                    alt="Nicola Valley Institute of Technology campus"
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-[#a6906c] rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">1</div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-serif text-2xl text-white drop-shadow-lg" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 4px 8px rgba(0,0,0,0.6)' }}>Walking Distance</h3>
                    <p className="text-white/90 text-sm" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.6)' }}>Car-free lifestyle</p>
                  </div>
                </div>
                <div className="p-8 md:p-8">
                  <p className="text-[#1a2621]/70 leading-relaxed mb-4 text-sm md:text-base">
                    These quality amenities provide exceptional convenience, allowing residents to walk to education, dining, and entertainment - perfect for busy professionals and growing families.
                  </p>
                  <div className="space-y-3">
                    <div className="border-l-4 border-[#a6906c] pl-4">
                        <h4 className="font-semibold text-[#1a2621] text-sm">NVIT Campus</h4>
                        <p className="text-[#1a2621]/60 text-xs">850m walk • 12 minutes</p>
                    </div>
                    <div className="border-l-4 border-[#a6906c] pl-4">
                        <h4 className="font-semibold text-[#1a2621] text-sm">Game On Sports Bar</h4>
                        <p className="text-[#1a2621]/60 text-xs">Next door • 3701 De Wolf Way</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Shopping & Essentials */}
              <div className="bg-white rounded-xl shadow-xl border border-[#e6e2da] overflow-hidden group hover:shadow-2xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src="/merritt-assets/shoppingmerritt.jpg"
                    alt="Merritt shopping and retail amenities"
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-[#a6906c] rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">2</div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-serif text-2xl text-white drop-shadow-lg" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 4px 8px rgba(0,0,0,0.6)' }}>Shopping & Essentials</h3>
                    <p className="text-white/90 text-sm" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.6)' }}>2-5 minute drive</p>
                  </div>
                </div>
                <div className="p-8 md:p-8">
                  <p className="text-[#1a2621]/70 leading-relaxed mb-4 text-sm md:text-base">
                    Located just north of the Coquihalla interchange - home to all major retailers and services.
                  </p>
                  <div className="space-y-3">
                    <div className="border-l-4 border-[#a6906c] pl-4">
                      <h4 className="font-semibold text-[#1a2621] text-sm">Walmart</h4>
                      <p className="text-[#1a2621]/60 text-xs">1.9km • 6 min drive</p>
                    </div>
                    <div className="border-l-4 border-[#a6906c] pl-4">
                      <h4 className="font-semibold text-[#1a2621] text-sm">No Frills</h4>
                      <p className="text-[#1a2621]/60 text-xs">Down the road</p>
                    </div>
                    <div className="border-l-4 border-[#a6906c] pl-4">
                      <h4 className="font-semibold text-[#1a2621] text-sm">Canadian Tire</h4>
                      <p className="text-[#1a2621]/60 text-xs">Highway hub</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Schools & Recreation */}
              <div className="bg-white rounded-xl shadow-xl border border-[#e6e2da] overflow-hidden group hover:shadow-2xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src="/merritt-assets/merrittpool.jpg"
                    alt="Merritt aquatic centre and recreational facilities"
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-[#a6906c] rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">3</div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-serif text-2xl text-white drop-shadow-lg" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 4px 8px rgba(0,0,0,0.6)' }}>Schools & Recreation</h3>
                    <p className="text-white/90 text-sm" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.6)' }}>5-10 minute drive</p>
                  </div>
                </div>
                <div className="p-8 md:p-8">
                  <p className="text-[#1a2621]/70 leading-relaxed mb-4 text-sm md:text-base">
                    Short commute to Merritt's educational and recreational facilities in the town center.
                  </p>
                  <div className="space-y-3">
                    <div className="border-l-4 border-[#a6906c] pl-4">
                      <h4 className="font-semibold text-[#1a2621] text-sm">Elementary & Secondary Schools</h4>
                      <p className="text-[#1a2621]/60 text-xs">10 min drive</p>
                    </div>
                    <div className="border-l-4 border-[#a6906c] pl-4">
                      <h4 className="font-semibold text-[#1a2621] text-sm">Aquatic Centre</h4>
                      <p className="text-[#1a2621]/60 text-xs">10 min drive</p>
                    </div>
                    <div className="border-l-4 border-[#a6906c] pl-4">
                      <h4 className="font-semibold text-[#1a2621] text-sm">Central Park</h4>
                      <p className="text-[#1a2621]/60 text-xs">10 min drive</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center mt-12">
              <Link
                href="/Merritt/neighbourhood"
                className="inline-block bg-[#a6906c] text-white px-8 py-4 text-lg font-bold uppercase tracking-wider rounded-full shadow-lg hover:bg-[#8b7355] transition-all duration-300 cursor-pointer glow-hover"
              >
                Explore the Complete Neighbourhood Guide
              </Link>
            </div>
        </div>
      </section>

    {/* MAP / LOCATION SECTION */}
    <section className="relative z-10 bg-[#1a2621] text-[#f9f8f6] py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-10"></div>
        <div className="container mx-auto px-6 md:px-6 relative z-10 flex flex-col lg:flex-row gap-12 md:gap-16 items-center">
            <div className="w-full lg:w-1/3 px-4 md:px-0">
                <span className="text-[#a6906c] text-xs tracking-widest uppercase mb-4 block">Location</span>
                <h2 className="font-serif text-3xl mb-6">3757 De Wolf Way</h2>
                <p className="text-[#e6e2da] leading-relaxed mb-8 font-light text-sm md:text-base">Located in the heart of Merritt, BC, our 48-unit townhome development at 3757 De Wolf Way offers the perfect balance of urban convenience and natural beauty in the scenic Nicola Valley.</p>
                <ul className="space-y-4 text-sm tracking-wide">
                    <li className="flex items-center gap-3 border-b border-white/10 pb-2"><MapPin className="text-[#a6906c] w-4 h-4" /> Prime Merritt Location</li>
                    <li className="flex items-center gap-3 border-b border-white/10 pb-2"><MapPin className="text-[#a6906c] w-4 h-4" /> Walking Distance to Amenities</li>
                    <li className="flex items-center gap-3 border-b border-white/10 pb-2"><MapPin className="text-[#a6906c] w-4 h-4" /> Easy Highway Access</li>
                </ul>
            </div>
            <div className="w-full lg:w-2/3 h-[400px] bg-[#23362b] rounded-lg overflow-hidden shadow-2xl border border-white/10 relative group px-4 md:px-0">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3254.789!2d-120.762!3d50.1205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54813f8b4e6c9b9f%3A0x3757%20De%20Wolf%20Way%2C%20Merritt%2C%20BC!2s3757%20De%20Wolf%20Way%2C%20Merritt%2C%20BC!5e0!3m2!1sen!2sca!4v1715123456789!5m2!1sen!2sca" width="100%" height="100%" style={{border:0}} allowFullScreen loading="lazy" className="opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700"></iframe>
            </div>
        </div>
    </section>

    {/* CONTACT FORM */}
    <section id="contact" className="relative z-10 py-12 md:py-16 bg-[#f9f8f6] overflow-hidden">
        {/* Happy Family Background Overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
            <img
                src="/merritt-assets/happyfamily.jpg"
                alt="Happy family background"
                className="w-full h-full object-cover"
            />
        </div>
        <div className="container mx-auto px-6 md:px-8 relative z-10">
            <div className="max-w-4xl mx-auto bg-white p-6 md:p-8 lg:p-12 shadow-2xl shadow-[#1a2621]/5 relative overflow-hidden reveal">
                <div className="absolute top-0 left-0 w-full h-2 bg-[#1a2621]"></div>
                <div className="text-center mb-6 md:mb-8">
                    <h2 className="font-serif text-2xl md:text-3xl text-[#1a2621] mb-3">Register Your Interest</h2>
                    <p className="text-[#1a2621]/60 text-sm md:text-base">Join our interest list for affordable housing in Merritt, BC.</p>
                </div>
                <form className="space-y-4 md:space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <input type="text" placeholder="First Name" className="bg-transparent border-b border-[#1a2621]/20 py-3 md:py-3 outline-none focus:border-[#a6906c] transition-colors placeholder-[#1a2621]/40 text-base md:text-sm"/>
                        <input type="text" placeholder="Last Name" className="bg-transparent border-b border-[#1a2621]/20 py-3 md:py-3 outline-none focus:border-[#a6906c] transition-colors placeholder-[#1a2621]/40 text-base md:text-sm"/>
                    </div>
                    <input type="email" placeholder="Email Address" className="w-full bg-transparent border-b border-[#1a2621]/20 py-3 md:py-3 outline-none focus:border-[#a6906c] transition-colors placeholder-[#1a2621]/40 text-base md:text-sm"/>
                    <input type="tel" placeholder="Phone Number" className="w-full bg-transparent border-b border-[#1a2621]/20 py-3 md:py-3 outline-none focus:border-[#a6906c] transition-colors placeholder-[#1a2621]/40 text-base md:text-sm"/>
                    <select className="w-full bg-transparent border-b border-[#1a2621]/20 py-3 md:py-3 outline-none focus:border-[#a6906c] transition-colors text-[#1a2621]/70 text-base md:text-sm">
                        <option>Select Unit Type</option>
                        <option>2-Bedroom Garden Flat</option>
                        <option>3-Bedroom Sky Townhome</option>
                        <option>Corner Unit</option>
                        <option>General Inquiry</option>
                    </select>
                    <select className="w-full bg-transparent border-b border-[#1a2621]/20 py-3 md:py-3 outline-none focus:border-[#a6906c] transition-colors text-[#1a2621]/70 text-base md:text-sm">
                        <option>Current Location</option>
                        <option>Kamloops Area</option>
                        <option>Kelowna Area</option>
                        <option>Vancouver Area</option>
                        <option>Other BC Location</option>
                    </select>
                    <select className="w-full bg-transparent border-b border-[#1a2621]/20 py-3 md:py-3 outline-none focus:border-[#a6906c] transition-colors text-[#1a2621]/70 text-base md:text-sm">
                        <option>How did you hear about us?</option>
                        <option>Online Search</option>
                        <option>Social Media</option>
                        <option>Referral from friend/family</option>
                        <option>Real estate agent</option>
                        <option>Newspaper/magazine</option>
                        <option>Billboard/signage</option>
                        <option>Community event</option>
                        <option>Other</option>
                    </select>
                    <textarea rows={3} placeholder="Tell us about your housing needs and timeline..." className="w-full bg-transparent border-b border-[#1a2621]/20 py-3 md:py-3 outline-none focus:border-[#a6906c] transition-colors placeholder-[#1a2621]/40 text-base md:text-sm resize-none"></textarea>

                    <div className="pt-4 md:pt-6 text-center">
                        <button type="button" className="inline-block bg-[#a6906c] text-white px-6 py-3 text-base font-bold uppercase tracking-wider hover:bg-[#8b7355] transition-colors rounded-lg glow-hover cursor-pointer">
                            Register Interest
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </section>

    </div>
  );
}