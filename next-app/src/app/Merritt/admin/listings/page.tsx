'use client';

/**
 * Listing Editor Page
 * 
 * Admin interface for creating and editing property listings.
 * Features a split-panel layout with form inputs on the left and
 * a live preview of the listing card on the right.
 * 
 * The preview updates in real-time as you type, showing exactly
 * how the listing will appear on the listings page.
 * 
 * @route /admin/listings
 */

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bed, Bath, Move, Save, ArrowLeft, Loader2 } from 'lucide-react';
// Navbar is now in layout.tsx - no need to import here
import ImageUpload from './components/ImageUpload';
import { supabase } from '../../../lib/supabase';

export default function ListingEditorPage() {
  // Form state for listing data
  const [listingData, setListingData] = useState({
    price: '$1,250,000',
    title: 'The Highland Lodge',
    location: 'Kamaniskeg Lake',
    beds: 6,
    baths: 5,
    sqft: 4500,
    image: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=2670&auto=format&fit=crop',
    tag: 'Just Listed'
  });

  const router = useRouter();
  
  // Upload and save state
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  // Reveal animation effect and authentication check
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

  /**
   * Handle form input changes
   * Updates the listing data state and triggers preview update
   */
  const handleInputChange = (field: string, value: string | number) => {
    setListingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  /**
   * Format price input
   * Adds dollar sign and formatting to price field
   */
  const handlePriceChange = (value: string) => {
    // Remove any non-numeric characters except decimal point
    const numericValue = value.replace(/[^0-9.]/g, '');
    if (numericValue) {
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(parseFloat(numericValue));
      handleInputChange('price', formatted);
    } else {
      handleInputChange('price', '');
    }
  };

  /**
   * Handle form submission
   * Saves listing data to Supabase database
   * TODO: Implement API call to save listing to database
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isUploading) {
      alert('Please wait for image upload to complete');
      return;
    }

    setIsSaving(true);
    
    try {
      // TODO: Add Supabase database insert/update here
      // Example:
      // const { data, error } = await supabase
      //   .from('listings')
      //   .insert([listingData]);
      
      console.log('Saving listing:', listingData);
      alert('Listing saved! (This is a demo - database integration pending)');
    } catch (error) {
      console.error('Error saving listing:', error);
      alert('Failed to save listing. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

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

      {/* Navbar is now in layout.tsx */}

      {/* HEADER */}
      <header className="pt-40 pb-12 px-6 bg-white border-b border-[#e6e2da]">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <div>
              <Link 
                href="/admin" 
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#1a2621]/60 hover:text-[#a6906c] transition-colors mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Admin
              </Link>
              <h1 className="font-serif text-4xl md:text-5xl text-[#1a2621]">Listing Editor</h1>
              <p className="text-[#1a2621]/60 text-sm mt-2">Create or edit property listings</p>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT - SPLIT PANEL */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* LEFT PANEL - EDITOR FORM */}
            <div className="bg-white p-8 md:p-12 shadow-2xl shadow-[#1a2621]/5 reveal relative">
              <div className="absolute top-0 left-0 w-full h-2 bg-[#1a2621]"></div>
              
              <h2 className="font-serif text-2xl text-[#1a2621] mb-8">Listing Details</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Price Input */}
                <div className="group">
                  <label htmlFor="price" className="block text-xs uppercase tracking-widest text-[#1a2621]/70 mb-3 font-bold">
                    Price
                  </label>
                  <input
                    type="text"
                    id="price"
                    value={listingData.price}
                    onChange={(e) => handlePriceChange(e.target.value)}
                    placeholder="$1,250,000"
                    className="input-underlined placeholder-[#1a2621]/40 w-full"
                    required
                  />
                </div>

                {/* Title Input */}
                <div className="group">
                  <label htmlFor="title" className="block text-xs uppercase tracking-widest text-[#1a2621]/70 mb-3 font-bold">
                    Property Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={listingData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="The Highland Lodge"
                    className="input-underlined placeholder-[#1a2621]/40 w-full"
                    required
                  />
                </div>

                {/* Location Input */}
                <div className="group">
                  <label htmlFor="location" className="block text-xs uppercase tracking-widest text-[#1a2621]/70 mb-3 font-bold">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    value={listingData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="Kamaniskeg Lake"
                    className="input-underlined placeholder-[#1a2621]/40 w-full"
                    required
                  />
                </div>

                {/* Image Upload */}
                <div className="group">
                  <label className="block text-xs uppercase tracking-widest text-[#1a2621]/70 mb-3 font-bold">
                    Property Image
                  </label>
                  <ImageUpload
                    value={listingData.image}
                    onChange={(url) => handleInputChange('image', url)}
                    onUpload={setIsUploading}
                  />
                </div>

                {/* Tag Input */}
                <div className="group">
                  <label htmlFor="tag" className="block text-xs uppercase tracking-widest text-[#1a2621]/70 mb-3 font-bold">
                    Status Tag
                  </label>
                  <select
                    id="tag"
                    value={listingData.tag}
                    onChange={(e) => handleInputChange('tag', e.target.value)}
                    className="input-underlined text-[#1a2621]/70 bg-transparent w-full"
                  >
                    <option>Just Listed</option>
                    <option>Under Contract</option>
                    <option>Exclusive</option>
                    <option>Commercial</option>
                    <option>New</option>
                    <option>Cozy</option>
                    <option>Design</option>
                    <option>Flagship</option>
                  </select>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#1a2621]/10">
                  <div className="group">
                    <label htmlFor="beds" className="block text-xs uppercase tracking-widest text-[#1a2621]/70 mb-3 font-bold">
                      Beds
                    </label>
                    <input
                      type="number"
                      id="beds"
                      value={listingData.beds}
                      onChange={(e) => handleInputChange('beds', parseInt(e.target.value) || 0)}
                      min="0"
                      className="input-underlined placeholder-[#1a2621]/40 w-full"
                      required
                    />
                  </div>

                  <div className="group">
                    <label htmlFor="baths" className="block text-xs uppercase tracking-widest text-[#1a2621]/70 mb-3 font-bold">
                      Baths
                    </label>
                    <input
                      type="number"
                      id="baths"
                      value={listingData.baths}
                      onChange={(e) => handleInputChange('baths', parseInt(e.target.value) || 0)}
                      min="0"
                      className="input-underlined placeholder-[#1a2621]/40 w-full"
                      required
                    />
                  </div>

                  <div className="group">
                    <label htmlFor="sqft" className="block text-xs uppercase tracking-widest text-[#1a2621]/70 mb-3 font-bold">
                      SqFt
                    </label>
                    <input
                      type="number"
                      id="sqft"
                      value={listingData.sqft}
                      onChange={(e) => handleInputChange('sqft', parseInt(e.target.value) || 0)}
                      min="0"
                      className="input-underlined placeholder-[#1a2621]/40 w-full"
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-8 border-t border-[#1a2621]/10">
                  <button
                    type="submit"
                    disabled={isUploading || isSaving}
                    className="w-full bg-[#1a2621] text-white px-12 py-4 text-xs tracking-widest uppercase font-bold hover:bg-[#a6906c] transition-colors duration-300 glow-hover flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Save Listing
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* RIGHT PANEL - LIVE PREVIEW */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="bg-white p-8 md:p-12 shadow-2xl shadow-[#1a2621]/5 reveal relative">
                <div className="absolute top-0 left-0 w-full h-2 bg-[#a6906c]"></div>
                
                <h2 className="font-serif text-2xl text-[#1a2621] mb-8">Live Preview</h2>
                
                {/* Preview Card - Matches listings page design */}
                <div className="group">
                  {/* Image Card */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-200 mb-8">
                    <img 
                      src={listingData.image || '/placeholder.jpg'} 
                      alt={listingData.title || 'Property'} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        // Fallback if image fails to load
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=2670&auto=format&fit=crop';
                      }}
                    />
                    {/* Status Tag Badge */}
                    <div className="absolute top-4 left-4 bg-white px-3 py-1 text-[10px] font-bold tracking-widest uppercase text-[#1a2621]">
                      {listingData.tag || 'Just Listed'}
                    </div>
                    {/* View Details Overlay (on hover) */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <span className="border border-white text-white px-6 py-3 text-xs tracking-widest uppercase">
                        View Details
                      </span>
                    </div>
                  </div>

                  {/* Details Section */}
                  <div className="flex justify-between items-start border-b border-[#1a2621]/10 pb-6">
                    <div>
                      <span className="text-[#a6906c] text-xs font-bold tracking-widest uppercase mb-2 block">
                        {listingData.price || '$0'}
                      </span>
                      <h3 className="font-serif text-2xl text-[#1a2621] mb-1 group-hover:text-[#a6906c] transition-colors">
                        {listingData.title || 'Property Title'}
                      </h3>
                      <p className="text-[#1a2621]/60 text-sm mb-4">
                        {listingData.location || 'Location'}
                      </p>
                    </div>
                  </div>
                  
                  {/* Specs Row */}
                  <div className="flex gap-6 pt-4 text-[#1a2621]/60 text-xs tracking-wide">
                    <span className="flex items-center gap-2">
                      <Bed className="w-4 h-4"/> {listingData.beds || 0} Beds
                    </span>
                    <span className="flex items-center gap-2">
                      <Bath className="w-4 h-4"/> {listingData.baths || 0} Baths
                    </span>
                    <span className="flex items-center gap-2">
                      <Move className="w-4 h-4"/> {listingData.sqft || 0} SqFt
                    </span>
                  </div>
                </div>

                {/* Preview Note */}
                <div className="mt-8 pt-8 border-t border-[#1a2621]/10">
                  <p className="text-xs text-[#1a2621]/50 italic">
                    This preview shows exactly how your listing will appear on the listings page.
                  </p>
                </div>
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

