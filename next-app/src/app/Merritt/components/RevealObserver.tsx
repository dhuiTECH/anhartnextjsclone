'use client';

import { useEffect } from 'react';

/**
 * Client component that sets up IntersectionObserver for reveal animations
 * This must be a client component because it uses browser APIs
 */
export default function RevealObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    // Scope to .merritt-wrapper to match the CSS scoping
    const merrittWrapper = document.querySelector('.merritt-wrapper');
    if (!merrittWrapper) return;

    const revealElements = merrittWrapper.querySelectorAll('.reveal');
    revealElements.forEach(el => {
      observer.observe(el);
      // If element is already in viewport, trigger immediately
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('active');
      }
    });

    return () => {
      revealElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return null; // This component doesn't render anything
}

