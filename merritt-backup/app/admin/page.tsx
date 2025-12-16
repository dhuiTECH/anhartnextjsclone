'use client';

/**
 * Admin Dashboard Page
 * 
 * Main admin interface providing access to various management tools.
 * Currently includes navigation to the listing editor.
 * 
 * @route /admin
 */

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FileText, ArrowRight, Loader2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import { supabase } from '../../lib/supabase';

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Set up reveal animation observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });
    
    // Observe all reveal elements
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => {
      observer.observe(el);
      // If element is already in viewport, trigger immediately
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('active');
      }
    });

    // Listen for auth state changes first (more reliable)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setAuthenticated(true);
        setLoading(false);
        // Make reveal elements visible immediately after sign in
        setTimeout(() => {
          document.querySelectorAll('.reveal').forEach(el => {
            el.classList.add('active');
          });
        }, 100);
      } else if (event === 'SIGNED_OUT') {
        setAuthenticated(false);
        setLoading(false);
        router.push('/login');
      } else if (event === 'INITIAL_SESSION') {
        // Check initial session state
        if (session) {
          setAuthenticated(true);
          setLoading(false);
          // Make reveal elements visible immediately after auth
          setTimeout(() => {
            document.querySelectorAll('.reveal').forEach(el => {
              el.classList.add('active');
            });
          }, 100);
        } else {
          setLoading(false);
          router.push('/login');
        }
      }
    });

    // Also check current session as fallback
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Session error:', error);
          setLoading(false);
          router.push('/login');
          return;
        }

        if (session) {
          setAuthenticated(true);
          setLoading(false);
          // Make reveal elements visible immediately after auth
          setTimeout(() => {
            document.querySelectorAll('.reveal').forEach(el => {
              el.classList.add('active');
            });
          }, 100);
        } else {
          setLoading(false);
          router.push('/login');
        }
      } catch (err) {
        console.error('Auth check error:', err);
        setLoading(false);
        router.push('/login');
      }
    };

    checkAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  if (loading) {
    return (
      <div className="bg-[#f9f8f6] text-[#1a2621] font-sans antialiased min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#a6906c] animate-spin" />
      </div>
    );
  }

  if (!authenticated) {
    return null;
  }

  return (
    <div className="bg-[#f9f8f6] text-[#1a2621] font-sans antialiased min-h-screen">
      
      {/* EDITORIAL FRAME */}
      <div className="fixed left-0 top-0 w-6 md:w-16 h-full bg-white z-[60]"></div>
      <div className="fixed right-0 top-0 w-6 md:w-16 h-full bg-white z-[60]"></div>

      <Navbar />

      {/* HEADER */}
      <header className="pt-40 pb-20 px-6 bg-white text-center border-b border-[#e6e2da]">
        <h1 className="font-serif text-4xl md:text-5xl text-[#1a2621] mb-6">Admin Dashboard</h1>
        <p className="text-[#1a2621]/60 text-sm tracking-widest uppercase">Management Portal</p>
      </header>

      {/* ADMIN TOOLS GRID */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Listing Editor Card */}
            <Link 
              href="/admin/listings"
              className="group bg-white p-8 md:p-12 shadow-2xl shadow-[#1a2621]/5 relative overflow-hidden reveal hover:shadow-[#1a2621]/10 transition-shadow"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-[#1a2621]"></div>
              <div className="flex items-start gap-4">
                <div className="bg-[#1a2621]/5 p-4 rounded-sm">
                  <FileText className="w-6 h-6 text-[#1a2621]" />
                </div>
                <div className="flex-1">
                  <h2 className="font-serif text-2xl text-[#1a2621] mb-2 group-hover:text-[#a6906c] transition-colors">
                    Listing Editor
                  </h2>
                  <p className="text-[#1a2621]/60 text-sm mb-4">
                    Create and edit property listings with live preview
                  </p>
                  <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#a6906c] font-bold">
                    Open Editor <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                </div>
              </div>
            </Link>

            {/* Placeholder for future admin tools */}
            <div className="bg-white/50 p-8 md:p-12 shadow-2xl shadow-[#1a2621]/5 relative overflow-hidden reveal border-2 border-dashed border-[#1a2621]/20">
              <div className="text-center">
                <p className="text-[#1a2621]/40 text-sm">More tools coming soon</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1a2621] text-[#f2f0eb] py-20 border-t border-white/5 text-center">
        <div className="font-serif text-2xl tracking-widest mb-2">MARK WILSON</div>
        <div className="text-[0.5rem] uppercase tracking-[0.4em] opacity-60">Real Estate Brokerage</div>
      </footer>
    </div>
  );
}

