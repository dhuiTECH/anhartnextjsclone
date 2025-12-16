'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';
// Navbar is now in layout.tsx - no need to import here

// Mock floorplans data
const MOCK_FLOORPLANS = [
  { id: 'A1', image: '/merritt-assets/floorplan-a1.jpg', bedrooms: 2, sqFt: 807, isSold: false },
  { id: 'A2', image: '/merritt-assets/floorplan-a2.jpg', bedrooms: 2, sqFt: 820, isSold: true },
  { id: 'B1', image: '/merritt-assets/floorplan-b1.jpg', bedrooms: 3, sqFt: 1614, isSold: false },
  { id: 'B2', image: '/merritt-assets/floorplan-b2.jpg', bedrooms: 3, sqFt: 1650, isSold: false },
  { id: 'C1', image: '/merritt-assets/floorplan-c1.jpg', bedrooms: 1, sqFt: 580, isSold: true },
  { id: 'C2', image: '/merritt-assets/floorplan-c2.jpg', bedrooms: 2, sqFt: 750, isSold: false },
  { id: 'D1', image: '/merritt-assets/floorplan-d1.jpg', bedrooms: 3, sqFt: 1750, isSold: false },
  { id: 'D2', image: '/merritt-assets/floorplan-d2.jpg', bedrooms: 2, sqFt: 900, isSold: true },
];

type BedroomFilter = 'all' | '1' | '2' | '3';
type SizeFilter = 'all' | 'small' | 'medium' | 'large';

export default function FloorplansPage() {
  const [bedroomFilter, setBedroomFilter] = useState<BedroomFilter>('all');
  const [sizeFilter, setSizeFilter] = useState<SizeFilter>('all');

  const filteredFloorplans = MOCK_FLOORPLANS.filter(plan => {
    const bedroomMatch = bedroomFilter === 'all' || plan.bedrooms === parseInt(bedroomFilter);
    const sizeMatch = sizeFilter === 'all' ||
      (sizeFilter === 'small' && plan.sqFt < 600) ||
      (sizeFilter === 'medium' && plan.sqFt >= 600 && plan.sqFt <= 800) ||
      (sizeFilter === 'large' && plan.sqFt > 800);
    return bedroomMatch && sizeMatch;
  });

  return (
    <div className="bg-[#F9F7F2] text-[#14312C] font-sans antialiased min-h-screen">
      {/* Navbar is now in layout.tsx */}

      {/* Header Section */}
      <header className="relative pt-24 pb-16 pl-8 pr-8 sm:pl-6 sm:pr-6 min-h-[60vh] md:min-h-[70vh] overflow-hidden flex items-center justify-center bg-[#F9F7F2]">
        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <span className="text-[#a6906c] font-bold text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 sm:mb-4 block">Floor Plans</span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-7xl mb-6 sm:mb-8 leading-tight font-bold uppercase text-[#14312C] px-2">
            Floor Plans
          </h1>
          <p className="text-[#14312C]/70 text-base sm:text-lg md:text-xl font-light tracking-[0.05em] leading-relaxed max-w-3xl mx-auto px-2 mb-8">
            With flexible, thoughtfully-designed interiors, each home offers plenty of space to live, work and play.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#a6906c] text-white px-8 py-4 text-lg font-bold uppercase tracking-wider hover:bg-[#8b7355] transition-colors rounded-lg glow-hover cursor-pointer">
              Download All Floorplans
            </button>
            <button className="border-2 border-[#a6906c] text-[#a6906c] px-8 py-4 text-lg font-bold uppercase tracking-wider hover:bg-[#a6906c] hover:text-white transition-colors rounded-lg glow-hover cursor-pointer">
              Download Feature Sheet
            </button>
          </div>
        </div>
      </header>

      {/* Main Content - Sidebar + Grid */}
      <section className="py-16 pl-8 pr-8 sm:pl-6 sm:pr-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

            {/* Sidebar - Filters */}
            <div className="lg:col-span-1 space-y-8">
              {/* Filter by Bedrooms */}
              <div>
                <h3 className="font-bold text-lg text-[#14312C] mb-4 uppercase tracking-wider">Filter by Bedrooms</h3>
                <div className="space-y-3">
                  {[
                    { value: 'all', label: 'All' },
                    { value: '1', label: '1 Bed' },
                    { value: '2', label: '2 Bed' },
                    { value: '3', label: '3 Bed' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center cursor-pointer group">
                      <div className="relative">
                        <input
                          type="radio"
                          name="bedrooms"
                          value={option.value}
                          checked={bedroomFilter === option.value}
                          onChange={(e) => setBedroomFilter(e.target.value as BedroomFilter)}
                          className="sr-only"
                        />
                        <div className={`w-4 h-4 rounded-full border-2 transition-colors ${
                          bedroomFilter === option.value
                            ? 'border-[#F08E70] bg-[#F08E70]'
                            : 'border-[#14312C] group-hover:border-[#F08E70]'
                        }`}>
                          {bedroomFilter === option.value && (
                            <div className="w-2 h-2 rounded-full bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                          )}
                        </div>
                      </div>
                      <span className={`ml-3 text-sm font-medium transition-colors ${
                        bedroomFilter === option.value ? 'text-[#F08E70]' : 'text-[#14312C] group-hover:text-[#F08E70]'
                      }`}>
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filter by Size */}
              <div>
                <h3 className="font-bold text-lg text-[#14312C] mb-4 uppercase tracking-wider">Filter by Size</h3>
                <div className="space-y-3">
                  {[
                    { value: 'all', label: 'All' },
                    { value: 'small', label: '<600 sq ft' },
                    { value: 'medium', label: '600-800 sq ft' },
                    { value: 'large', label: '>800 sq ft' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center cursor-pointer group">
                      <div className="relative">
                        <input
                          type="radio"
                          name="size"
                          value={option.value}
                          checked={sizeFilter === option.value}
                          onChange={(e) => setSizeFilter(e.target.value as SizeFilter)}
                          className="sr-only"
                        />
                        <div className={`w-4 h-4 rounded-full border-2 transition-colors ${
                          sizeFilter === option.value
                            ? 'border-[#F08E70] bg-[#F08E70]'
                            : 'border-[#14312C] group-hover:border-[#F08E70]'
                        }`}>
                          {sizeFilter === option.value && (
                            <div className="w-2 h-2 rounded-full bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                          )}
                        </div>
                      </div>
                      <span className={`ml-3 text-sm font-medium transition-colors ${
                        sizeFilter === option.value ? 'text-[#F08E70]' : 'text-[#14312C] group-hover:text-[#F08E70]'
                      }`}>
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Grid - Floorplan Cards */}
            <div className="lg:col-span-3">
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                <AnimatePresence>
                  {filteredFloorplans.map((plan) => (
                    <motion.div
                      key={plan.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative bg-white rounded-lg shadow-lg overflow-hidden group cursor-pointer"
                    >
                      {/* Floorplan Image */}
                      <div className="aspect-[4/3] bg-[#F9F7F2] flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-4xl mb-2">🏠</div>
                          <p className="text-[#14312C]/60 text-sm">Floor Plan {plan.id}</p>
                        </div>
                      </div>

                      {/* Sold Overlay */}
                      {plan.isSold && (
                        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-[#14312C] mb-2">Fully sold.</div>
                          </div>
                        </div>
                      )}

                      {/* Card Footer */}
                      <div className="p-4 border-t border-[#F9F7F2]">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-[#14312C]">{plan.id}</span>
                          <span className="text-sm text-[#14312C]/60">{plan.sqFt} sq ft</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {filteredFloorplans.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-[#14312C]/60 text-lg">No floorplans match your filters.</p>
                  <button
                    onClick={() => {
                      setBedroomFilter('all');
                      setSizeFilter('all');
                    }}
                    className="mt-4 text-[#F08E70] hover:text-[#14312C] transition-colors cursor-pointer"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Anhart Quality */}
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
                href="/Merritt/neighbourhood"
                className="inline-block bg-[#a6906c] text-white px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg font-bold uppercase tracking-wider hover:bg-[#8b7355] transition-colors rounded-lg glow-hover cursor-pointer text-center"
              >
                Explore Neighbourhood
              </Link>
              <Link
                href="/Merritt/contact"
                className="inline-block border-2 border-[#a6906c] text-[#a6906c] px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg font-bold uppercase tracking-wider hover:bg-[#a6906c] hover:text-white transition-colors rounded-lg glow-hover cursor-pointer text-center"
              >
                Register Interest
              </Link>
            </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
