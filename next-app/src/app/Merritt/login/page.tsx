'use client';

/**
 * Login Page Component
 * 
 * A styled login interface for admin access to the listing management portal.
 * Matches the design theme of the main site with elegant, minimal styling.
 * 
 * Features:
 * - Email and password authentication form
 * - Reveal animations on scroll
 * - Responsive design
 * - Consistent branding with the main site
 * 
 * @route /login
 */

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
// Navbar is now in layout.tsx - no need to import here
import { supabase } from '@/integrations/supabase/client';

export default function LoginPage() {
  const router = useRouter();
  
  // State management for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Intersection Observer Effect
   * 
   * Sets up scroll-triggered reveal animations for elements with the 'reveal' class.
   * This creates a smooth fade-in effect when elements come into view, matching
   * the animation style used throughout the site.
   */
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }, []);

  /**
   * Form Submit Handler
   * 
   * Handles the login form submission using Supabase authentication.
   * On successful login, redirects to the admin dashboard.
   * 
   * @param e - React form event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      if (data.user) {
        // Wait a moment for session to be fully established
        await new Promise(resolve => setTimeout(resolve, 100));
        // Successful login - redirect to admin dashboard
        router.push('/admin');
        router.refresh(); // Refresh to ensure session is picked up
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f9f8f6] text-[#1a2621] font-sans antialiased min-h-screen">
      
      {/* 
        EDITORIAL FRAME
        White vertical bars on left and right edges that create a magazine-style
        editorial frame, matching the design aesthetic of the main site.
      */}
      <div className="fixed left-0 top-0 w-6 md:w-16 h-full bg-white z-[60]"></div>
      <div className="fixed right-0 top-0 w-6 md:w-16 h-full bg-white z-[60]"></div>

      {/* Navigation bar component */}
      {/* Navbar is now in layout.tsx */}

      {/* 
        LOGIN SECTION
        Centered login form container with responsive padding and spacing.
        Uses flexbox to vertically center the form on the page.
      */}
      <section className="pt-40 pb-20 px-6 min-h-[calc(100vh-80px)] flex items-center justify-center">
        <div className="container mx-auto max-w-md">
          {/* 
            LOGIN CARD
            White card container with shadow and reveal animation.
            Contains the entire login form and header information.
          */}
          <div className="bg-white p-12 md:p-16 shadow-2xl shadow-[#1a2621]/5 relative overflow-hidden reveal">
            {/* 
              Top accent bar
              Dark horizontal bar at the top of the card for visual emphasis,
              matching the design pattern used in contact forms on the main site.
            */}
            <div className="absolute top-0 left-0 w-full h-2 bg-[#1a2621]"></div>
            
            {/* 
              HEADER SECTION
              Displays the page title, subtitle, and admin access label.
              Uses serif font for the main heading to match site typography.
            */}
            <div className="text-center mb-12">
              <span className="text-xs uppercase tracking-widest-xl text-[#1a2621]/50 block mb-4">Admin Access</span>
              <h1 className="font-serif text-3xl md:text-4xl text-[#1a2621] mb-4">Sign In</h1>
              <p className="text-[#1a2621]/60 text-sm">Access the listing management portal</p>
            </div>

            {/* 
              LOGIN FORM
              Contains email and password input fields with labels.
              Uses the 'input-underlined' class for consistent styling with the site.
              Form submission is handled by handleSubmit function.
            */}
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Email input field */}
              <div className="group">
                <label htmlFor="email" className="block text-xs uppercase tracking-widest text-[#1a2621]/70 mb-3 font-bold">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="input-underlined placeholder-[#1a2621]/40 w-full"
                  required
                />
              </div>

              {/* Password input field */}
              <div className="group">
                <label htmlFor="password" className="block text-xs uppercase tracking-widest text-[#1a2621]/70 mb-3 font-bold">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="input-underlined placeholder-[#1a2621]/40 w-full"
                  required
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="text-xs text-red-600 bg-red-50 p-3 rounded-sm">
                  {error}
                </div>
              )}

              {/* Submit button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#1a2621] text-white px-12 py-4 text-xs tracking-widest uppercase font-bold hover:bg-[#a6906c] transition-colors duration-300 glow-hover disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </div>
            </form>

            {/* 
              FOOTER NOTE
              Security notice indicating this is for authorized personnel only.
              Subtle styling to not distract from the main form.
            */}
            <div className="mt-12 pt-8 border-t border-[#1a2621]/10 text-center">
              <p className="text-xs text-[#1a2621]/50">
                Authorized personnel only
              </p>
            </div>
          </div>

          {/* 
            BACK TO HOME LINK
            Navigation link to return to the main homepage.
            Uses reveal animation and hover effects matching site style.
          */}
          <div className="text-center mt-8 reveal">
            <Link 
              href="/" 
              className="text-xs uppercase tracking-widest text-[#1a2621]/60 hover:text-[#a6906c] transition-colors inline-flex items-center gap-2"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>

      {/* 
        FOOTER
        Site footer matching the branding and styling of the main site.
        Displays the brokerage name and tagline.
      */}
      <footer className="bg-[#1a2621] text-[#f2f0eb] py-20 border-t border-white/5 text-center">
        <div className="font-serif text-2xl tracking-widest mb-2">MARK WILSON</div>
        <div className="text-[0.5rem] uppercase tracking-[0.4em] opacity-60">Real Estate Brokerage</div>
      </footer>
    </div>
  );
}

