'use client';

import { useEffect, useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export function FloatingBackButton() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show button if scrolling down or if at top
      if (currentScrollY === 0) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down - hide button
        setIsVisible(false);
      } else {
        // Scrolling up - show button
        setIsVisible(true);
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    // Save scroll position before leaving
    sessionStorage.setItem('portfolioScrollPosition', String(sessionStorage.getItem('portfolioScrollPosition') || 0));
  };

  return (
    <Link
      href="/portfolio"
      onClick={handleClick}
      className={`fixed left-6 top-24 z-40 flex items-center gap-2 px-4 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-semibold shadow-lg transition-all duration-300 ${
        isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
      }`}
      aria-label="Back to portfolio"
    >
      <ChevronLeft className="w-5 h-5" />
      <span>Back</span>
    </Link>
  );
}
