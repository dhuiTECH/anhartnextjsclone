'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

export default function AboutClient() {

  return (
    <div className="bg-[#f9f8f6] text-[#1a2621] font-sans antialiased min-h-screen">

      {/* Editorial frame */}
      <div className="hidden md:block fixed left-0 top-0 w-6 md:w-16 h-full bg-white z-[60]"></div>
      <div className="hidden md:block fixed right-0 top-0 w-6 md:w-16 h-full bg-white z-[60]"></div>

      <Navbar />

      {/* Hero Section with Video Background */}
      <header className="relative h-[70vh] sm:h-[80vh] md:h-[90vh] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <video
            src="/Merrittlivingroom.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/fullvillage.webp"
            className="w-full h-full object-cover opacity-40 md:opacity-30"
          />

          {/* Background gradients */}
          <div className="md:hidden absolute inset-0 bg-gradient-to-br from-[#1a2621]/80 via-[#2a3731]/70 to-[#1a2621]/80"></div>
          <div className="hidden md:block absolute inset-0 bg-gradient-to-br from-[#1a2621]/80 via-[#1a2621]/60 to-[#2a3731]/80"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center text-center text-white pl-8 pr-8 sm:pl-6 sm:pr-6 mt-4 sm:mt-8 md:mt-12 min-h-[40vh] sm:min-h-[50vh] md:min-h-[60vh]">
          <div className="max-w-4xl w-full">
            <span className="text-[#a6906c] font-bold text-xs sm:text-sm tracking-[0.2em] uppercase mb-2 sm:mb-3 md:mb-4 block">Premium Interiors</span>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl mb-4 sm:mb-6 md:mb-8 leading-tight font-bold uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] px-1 sm:px-2">
              Modern Living,<br className="hidden sm:block"/>Vancouver Quality
            </h1>
            <p className="text-white/90 text-sm sm:text-base md:text-lg lg:text-xl font-light tracking-[0.05em] leading-relaxed max-w-3xl mx-auto drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] px-2">
              Experience contemporary design and superior craftsmanship in every Anhart townhome. From sleek kitchens to spacious living areas, we blend modern aesthetics with practical functionality.
            </p>
          </div>
        </div>
      </header>

      {/* Interior Showcase */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 pl-8 pr-8 sm:pl-6 sm:pr-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <span className="text-[#a6906c] font-bold text-xs sm:text-sm tracking-[0.2em] uppercase mb-2 sm:mb-3 md:mb-4 block">Design Gallery</span>
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-[#1a2621] mb-3 sm:mb-4 md:mb-6 px-2">Inside Your Future Home</h2>
            <p className="text-[#1a2621]/70 text-sm sm:text-base md:text-lg max-w-3xl mx-auto px-2">
              Discover the thoughtful design and premium finishes that make Anhart townhomes stand apart. Every detail is crafted with both beauty and functionality in mind.
            </p>
          </div>

          {/* Interior Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16">
            {[
              {
                image: '/livingroom.jpg',
                title: 'Modern Living Spaces',
                description: 'Open-concept designs with premium finishes and abundant natural light.',
                features: ['Hardwood floors', 'Large windows', 'Contemporary lighting']
              },
              {
                image: '/gbedroom.jpg',
                title: 'Serene Bedrooms',
                description: 'Peaceful retreats with walk-in closets and ensuite bathrooms.',
                features: ['Queen beds', 'Ample storage', 'Private bathrooms']
              },
              {
                image: '/gkitchen.jpg',
                title: 'Gourmet Kitchens',
                description: 'Stainless steel appliances and granite countertops in every home.',
                features: ['SS appliances', 'Granite counters', 'Ample cabinetry']
              },
              {
                image: '/sbedroom.jpg',
                title: 'Master Suites',
                description: 'Spacious master bedrooms with modern ensuite bathrooms.',
                features: ['King beds', 'Walk-in closets', 'Spa bathrooms']
              },
              {
                image: '/skitchen.jpg',
                title: 'Entertainer\'s Kitchen',
                description: 'Large, functional kitchens perfect for family gatherings.',
                features: ['Island workspaces', 'Dining areas', 'Premium appliances']
              },
              {
                image: '/fullvillage.jpg',
                title: 'Community Views',
                description: 'Beautiful mountain and valley views from select units.',
                features: ['Scenic outlook', 'Natural light', 'Peaceful ambiance']
              }
            ].map((interior, index) => (
              <div key={interior.title} className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl hover:shadow-2xl transition-all duration-500 bg-white border border-[#e6e2da]">
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                  <img
                    src={interior.image}
                    alt={interior.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="font-serif text-lg sm:text-xl font-bold mb-1 sm:mb-2">{interior.title}</h3>
                    <p className="text-white/90 text-xs sm:text-sm leading-relaxed">{interior.description}</p>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="font-serif text-lg sm:text-xl text-[#1a2621] mb-2 sm:mb-3">{interior.title}</h3>
                  <div className="space-y-2 sm:space-y-3">
                    {interior.features.map((feature) => (
                      <div key={feature} className="border-l-4 border-[#a6906c] pl-3 sm:pl-4">
                        <h4 className="font-semibold text-[#1a2621] text-xs sm:text-sm">{feature}</h4>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <FeatureSection />

      {/* Design Philosophy */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 pl-8 pr-8 sm:pl-6 sm:pr-6 bg-[#f9f8f6] border-t border-[#e6e2da]">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-center">
            <div>
              <span className="text-[#a6906c] font-bold text-xs sm:text-sm tracking-[0.2em] uppercase mb-2 sm:mb-3 md:mb-4 block">Our Philosophy</span>
              <h2 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#1a2621] mb-3 sm:mb-4 md:mb-6">
                Quality Without Compromise
              </h2>
              <p className="text-[#1a2621]/70 leading-relaxed mb-3 sm:mb-4 md:mb-6 text-sm sm:text-base">
                At Anhart, we believe that affordable housing shouldn't mean compromising on quality. Our Vancouver-based design team brings city standards to Merritt, ensuring every home features modern amenities, durable materials, and thoughtful layouts.
              </p>
              <div className="space-y-3">
                <div className="border-l-4 border-[#a6906c] pl-4">
                  <h4 className="font-semibold text-[#1a2621] text-sm">Premium Materials</h4>
                  <p className="text-[#1a2621]/60 text-xs">Quartz countertops, hardwood floors, and energy-efficient windows standard in every unit.</p>
                </div>
                <div className="border-l-4 border-[#a6906c] pl-4">
                  <h4 className="font-semibold text-[#1a2621] text-sm">Smart Layouts</h4>
                  <p className="text-[#1a2621]/60 text-xs">Open-concept designs maximize space and natural light for modern living.</p>
                </div>
                <div className="border-l-4 border-[#a6906c] pl-4">
                  <h4 className="font-semibold text-[#1a2621] text-sm">Vancouver Standards</h4>
                  <p className="text-[#1a2621]/60 text-xs">Construction quality and finish details that rival urban developments.</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                <div className="space-y-2 sm:space-y-3 md:space-y-4">
                  <div className="bg-white p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl shadow-lg border border-[#e6e2da]">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                      <div className="text-lg sm:text-xl md:text-2xl font-bold text-[#a6906c]">48</div>
                      <img
                        src="/home.png"
                        alt="Home icon"
                        className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                      />
                    </div>
                    <div className="text-xs sm:text-sm text-[#1a2621]/60 uppercase tracking-wide">Modern Townhomes</div>
                  </div>
                  <div className="bg-white p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl shadow-lg border border-[#e6e2da]">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                      <div className="text-lg sm:text-xl md:text-2xl font-bold text-[#a6906c]">$249k</div>
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#a6906c]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div className="text-xs sm:text-sm text-[#1a2621]/60 uppercase tracking-wide">Starting Price</div>
                  </div>
                </div>
                <div className="space-y-2 sm:space-y-3 md:space-y-4">
                  <div className="bg-white p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl shadow-lg border border-[#e6e2da]">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                      <div className="text-lg sm:text-xl md:text-2xl font-bold text-[#a6906c]">Vancouver</div>
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#a6906c]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    </div>
                    <div className="text-xs sm:text-sm text-[#1a2621]/60 uppercase tracking-wide">Quality Standards</div>
                  </div>
                  <div className="bg-white p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl shadow-lg border border-[#e6e2da]">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                      <div className="text-lg sm:text-xl md:text-2xl font-bold text-[#a6906c]">Merritt</div>
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#a6906c]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div className="text-sm text-[#1a2621]/60 uppercase tracking-wide">Prime Location</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 pl-8 pr-8 sm:pl-6 sm:pr-6 bg-[#1a2621] text-[#f9f8f6] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-10"></div>
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-3 sm:mb-4 md:mb-6 px-2">
            Experience Anhart Quality
          </h2>
          <p className="text-[#f9f8f6]/80 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 md:mb-8 max-w-3xl mx-auto px-2">
            Join our waitlist to be among the first to experience modern living at affordable prices. Our 48-unit development combines Vancouver design standards with Merritt's scenic beauty.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Link
              href="/Merritt/floorplans"
              className="inline-block bg-[#a6906c] text-white px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg font-bold uppercase tracking-wider hover:bg-[#8b7355] transition-colors rounded-lg glow-hover cursor-pointer text-center"
            >
              View Floor Plans
            </Link>
            <Link
              href="/Merritt/contact"
              className="inline-block bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg font-bold uppercase tracking-wider hover:bg-white/30 hover:border-white/50 transition-all duration-300 rounded-lg shadow-lg cursor-pointer text-center"
            >
              Register Interest
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Feature Section Component
function FeatureSection() {
  const [activeView, setActiveView] = useState<'kitchen' | 'bathroom'>('kitchen');

  // Hotspots data
  const hotspots = {
    kitchen: [
      { id: 1, x: 15, y: 25, label: 'Premium Appliances' },
      { id: 2, x: 45, y: 35, label: 'Granite Countertops' },
      { id: 3, x: 75, y: 45, label: 'Custom Cabinetry' },
    ],
    bathroom: [
      { id: 1, x: 20, y: 30, label: 'Rainfall Shower' },
      { id: 2, x: 50, y: 40, label: 'Marble Vanity' },
      { id: 3, x: 80, y: 50, label: 'Heated Floors' },
    ]
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">

          {/* Left Side - Image with Hotspots */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={activeView === 'kitchen'
                  ? "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1000&auto=format&fit=crop"
                  : "/swashroom.jpg"
                }
                alt={`${activeView} interior design`}
                width={activeView === 'kitchen' ? 600 : 800}
                height={activeView === 'kitchen' ? 450 : 600}
                className="w-full h-auto object-cover"
              />

              {/* Hotspots */}
              {hotspots[activeView].map((hotspot) => (
                <motion.div
                  key={`${activeView}-${hotspot.id}`}
                  className="absolute w-4 h-4 bg-[#F08E70] border-2 border-white rounded-full cursor-pointer shadow-lg"
                  style={{
                    left: `${hotspot.x}%`,
                    top: `${hotspot.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  whileHover={{ scale: 1.5 }}
                  title={hotspot.label}
                />
              ))}
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="order-1 lg:order-2">
            <div className="bg-[#14312C] rounded-2xl p-6 sm:p-8 md:p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-10 rounded-2xl"></div>
              <div className="relative z-10">

              {/* Toggle Switch */}
              <div className="flex items-center justify-center mb-6 sm:mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-full p-1 flex w-full max-w-xs">
                  <button
                    onClick={() => setActiveView('kitchen')}
                    className={`flex-1 px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
                      activeView === 'kitchen'
                        ? 'bg-[#F9F7F2] text-[#14312C]'
                        : 'text-[#A1B5B1] hover:text-white'
                    }`}
                  >
                    Kitchen
                  </button>
                  <button
                    onClick={() => setActiveView('bathroom')}
                    className={`flex-1 px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
                      activeView === 'bathroom'
                        ? 'bg-[#F9F7F2] text-[#14312C]'
                        : 'text-[#A1B5B1] hover:text-white'
                    }`}
                  >
                    Bathroom
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#F9F7F2] mb-6">
                  {activeView === 'kitchen' ? 'Kitchen Features.' : 'Bathroom Features.'}
                </h2>
                <p className="text-[#A1B5B1] leading-relaxed text-base md:text-lg">
                  {activeView === 'kitchen'
                    ? 'Experience modern kitchen design with premium appliances, custom cabinetry, and thoughtful layouts. Every detail is crafted for both functionality and aesthetic appeal, creating spaces that are as beautiful as they are practical.'
                    : 'Experience thoughtfully designed bathrooms featuring modern fixtures, quality finishes, and functional layouts. Every detail is crafted for both comfort and practicality, creating spaces that serve your daily needs beautifully.'
                  }
                </p>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
