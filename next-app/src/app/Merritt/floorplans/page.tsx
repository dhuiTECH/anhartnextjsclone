'use client';

import Image from 'next/image';
import Footer from '../components/Footer';

export default function FloorplansPage() {
  return (
    <div className="bg-[#f9f8f6] text-[#1a2621] font-sans antialiased min-h-screen flex flex-col">
      {/* Navbar is now in layout.tsx */}

      {/* Coming Soon Section */}
      <section className="relative flex-1 flex items-center justify-center min-h-[80vh] overflow-hidden">
        {/* Transparent Anhart Logo Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <div className="relative w-full max-w-4xl h-full max-h-96">
            <Image
              src="/images/anhart-logo.webp"
              alt="Anhart Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Coming Soon Content */}
        <div className="relative z-10 text-center px-6 md:px-8">
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-6 md:mb-8 text-[#1a2621] font-bold uppercase">
            Coming Soon
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-[#1a2621]/70 max-w-2xl mx-auto">
            Floor plans will be available soon. Please check back later or register your interest to be notified when they're ready.
          </p>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
