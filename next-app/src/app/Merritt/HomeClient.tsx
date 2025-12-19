'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useScroll, useTransform, motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import Footer from './components/Footer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTurnstile } from '@/hooks/useTurnstile';
import { Turnstile } from '@/components/Turnstile';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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
  // Using pixels instead of percentages to prevent sub-pixel rendering jitter
  const villageY = useTransform(villageScrollProgress, [0, 1], [0, 200]);

  // Mobile image switching state
  const [gardenFlatImage, setGardenFlatImage] = useState(0); // 0: exterior, 1: bedroom, 2: kitchen
  const [skyTownhomeImage, setSkyTownhomeImage] = useState(0); // 0: exterior, 1: bedroom, 2: kitchen

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    unitType: '',
    currentLocation: '',
    hearAboutUs: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Cloudflare Turnstile
  const { token: turnstileToken, key: turnstileKey, reset: resetTurnstile, handlers: turnstileHandlers } = useTurnstile();

  // Section refs for layout
  const featuredSectionRef = useRef(null);
  const amenitiesSectionRef = useRef(null);

  // GSAP refs for tree animations
  const leftTreeRef = useRef(null);
  const rightTreeRef = useRef(null);

  // GSAP refs for mountain parallax
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

  // GSAP Tree Animation - Fixed with proper timing
  useEffect(() => {
    // Add a small delay to ensure DOM is fully mounted
    const timer = setTimeout(() => {
      if (!leftTreeRef.current || !rightTreeRef.current || !featuredSectionRef.current) {
        return;
      }

      // Animate Left Tree (In from left side, staying grounded)
      gsap.fromTo(leftTreeRef.current,
        { x: -50, y: 0 }, // Starting position (outside left, grounded)
        {
          x: 0,
          y: 0,
          ease: 'none',
          force3D: true, // Forces GPU usage to prevent sub-pixel jitter
          scrollTrigger: {
            trigger: featuredSectionRef.current,
            start: 'top bottom', // Start when top of section hits bottom of viewport
            end: 'bottom top',   // End when bottom of section hits top of viewport
            scrub: 0.3,          // Reduced lag for better scroll responsiveness
            fastScrollEnd: true, // Stop calculation when idle to prevent micro-drifting
          }
        }
      );

      // Animate Right Tree (In from right side, staying grounded)
      gsap.fromTo(rightTreeRef.current,
        { x: 50, y: 0 }, // Starting position (outside right, grounded)
        {
          x: 0,
          y: 0,
          ease: 'none',
          force3D: true, // Forces GPU usage to prevent sub-pixel jitter
          scrollTrigger: {
            trigger: featuredSectionRef.current,
            start: 'top bottom', // Start when top of section hits bottom of viewport
            end: 'bottom top',   // End when bottom of section hits top of viewport
            scrub: 0.3,          // Reduced lag for better scroll responsiveness
            fastScrollEnd: true, // Stop calculation when idle to prevent micro-drifting
          }
        }
      );
    }, 100); // Small delay to ensure DOM is ready

    return () => {
      clearTimeout(timer);
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // GSAP Mountain Parallax Animation
  useGSAP(() => {
    if (!mountainRef.current || !amenitiesSectionRef.current) return;

    gsap.to(mountainRef.current, {
      y: 150, // Move down slightly as we scroll down for parallax effect
      ease: 'none',
      force3D: true, // Forces GPU usage to prevent sub-pixel jitter
      scrollTrigger: {
        trigger: amenitiesSectionRef.current,
        start: 'top bottom', // Start when top of section enters viewport
        end: 'bottom top',   // End when bottom of section leaves viewport
        scrub: 0.3,          // Reduced lag for better scroll responsiveness
        fastScrollEnd: true, // Stop calculation when idle to prevent micro-drifting
      },
    });
  }, { scope: amenitiesSectionRef });

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('=== FORM SUBMIT HANDLER CALLED ===');
    console.log('Form submit triggered', formData);
    console.log('Event:', e);
    
    // Validate required fields before proceeding
    if (!formData.firstName || !formData.lastName || !formData.email) {
      console.error('Validation failed - missing required fields');
      setSubmitStatus('error');
      alert('Please fill in all required fields (First Name, Last Name, Email)');
      return;
    }

    // Validate Turnstile token
    if (!turnstileToken) {
      console.error('Turnstile verification required');
      setSubmitStatus('error');
      alert('Please complete the verification. The form is verifying your request...');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Prepare JSON data matching the Google Apps Script expectations
      const jsonData = {
        formSource: 'Home Page',
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone || '',
        unitType: formData.unitType || '',
        currentLocation: formData.currentLocation || '',
        referralSource: formData.hearAboutUs || '',
        message: formData.message || ''
      };

      console.log('Submitting form data:', jsonData);

      // Send JSON data to Google Apps Script
      // Use 'no-cors' mode to avoid CORS issues with Google Apps Script
      // Note: With no-cors, we can't set custom headers, but JSON body should still work
      // The script expects JSON in e.postData.contents
      try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbxgDQSGyo5GbWuSXs68FUW2S_E6Nio_TI8RFMDuclYpqulveMdHPmzQ6_INc7Lk5hv1jw/exec', {
          method: 'POST',
          mode: 'no-cors', // Required for Google Apps Script to avoid CORS errors
          // Note: Can't set Content-Type header with no-cors, but body will still be sent
          body: JSON.stringify(jsonData),
        });

        // With no-cors mode, we can't read the response, but the data was sent
        // Assume success if no error was thrown
        console.log('Form data sent successfully (no-cors mode - cannot verify response)');
        
        setSubmitStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          unitType: '',
          currentLocation: '',
          hearAboutUs: '',
          message: ''
        });
        resetTurnstile(); // Reset Turnstile after successful submission
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } catch (fetchError) {
        // If fetch fails, try alternative method using form submission
        console.log('Fetch failed, trying alternative method:', fetchError);
        throw fetchError;
      }
    } catch (error: any) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Button click handler as backup
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Button clicked directly!', formData);
    // Don't prevent default - let the form handle it naturally
    // This is just for debugging
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f9f8f6] text-[#1a2621] font-sans antialiased selection:bg-[#1a2621] selection:text-white overflow-x-hidden">
      {/* All styles are in merritt-styles.css - scoped to .merritt-wrapper */}

      {/* EDITORIAL FRAME */}
      <div className="fixed left-0 top-0 w-6 md:w-16 h-full bg-white z-[60]"></div>
      <div className="fixed right-0 top-0 w-6 md:w-16 h-full bg-white z-[60]"></div>

      {/* REMOVED: <Navbar /> (It is now in layout.tsx) */}

      {/* Hero Section */}
      <header className="relative h-[85vh] md:h-[88vh] lg:h-[90vh] w-full overflow-hidden flex items-center justify-center bg-black">
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
        <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-6 md:px-8 lg:px-6 mt-8 md:mt-12 min-h-[60vh]">
            <div className="max-w-4xl w-full">
                <h1 className="font-serif text-2xl md:text-4xl lg:text-5xl xl:text-6xl mb-4 md:mb-6 lg:mb-8 leading-tight font-bold opacity-0 animate-fade-up uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] drop-shadow-[0_0px_8px_rgba(0,0,0,0.5)] text-stroke-black text-center px-2" style={{ animationDelay: '0.4s' }}>
                    Affordable Townhomes<br/>in Merritt, BC
                </h1>
                <p className="text-sm md:text-base lg:text-lg font-bold tracking-[0.15em] leading-relaxed opacity-0 animate-fade-up text-white mb-4 md:mb-8 lg:mb-12 uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] drop-shadow-[0_0px_8px_rgba(0,0,0,0.5)] text-stroke-black text-center max-w-3xl mx-auto px-4" style={{ animationDelay: '0.6s' }}>
                    <span className="md:hidden">Affordable homeownership and modern living in scenic merritt, bc</span>
                    <span className="hidden md:inline">New Townhomes in beautiful Merritt, BC. Your accessible gateway to homeownership in BC's scenic Nicola Valley.</span>
                </p>
            </div>
            <Link href="/Merritt/contact" className="inline-block bg-white text-[#1a2621] px-6 md:px-8 py-3 md:py-4 text-xs md:text-sm tracking-[0.2em] uppercase font-black rounded-full shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/30 hover:bg-[#a6906c] hover:text-white transition-all duration-300 opacity-0 animate-fade-up glow-hover cursor-pointer" style={{ animationDelay: '0.8s' }}>
                Register for Priority Updates
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
      {/* GPU acceleration added to prevent scroll jitter with absolute positioned elements */}
      <section 
        className="w-full py-16 md:py-20 lg:py-32 pb-24 md:pb-24 lg:pb-32 bg-white overflow-hidden"
        style={{ transform: 'translateZ(0)' }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          {/* Tablet: Stack vertically, Desktop: Side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">

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
                We believe housing should be within reach. As a dedicated affordable housing developer, we are proud to introduce our newest community in Merritt, BC.
              </p>
              <p className="text-sm md:text-base">
                The project contemplates the potential development of entry-level townhome units, which may include two- and three-bedroom configurations. All details, including design, unit count, and pricing, are preliminary and subject to change.
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
          {/* GPU acceleration on parent container to prevent scroll jitter */}
          <div 
            className="relative mt-6 md:mt-8 lg:mt-0 lg:pl-10"
            style={{ 
              transform: 'translateZ(0)', 
              backfaceVisibility: 'hidden' 
            }}
          >

            {/* 1. Main Resort Image (The Anchor) */}
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/merritt-assets/livingroom.jpg"
                alt="Modern living room in Anhart Merritt townhome - spacious and well-lit interior design"
                width={800}
                height={600}
                priority
                className="w-full h-auto object-cover"
                style={{ transform: 'translateZ(0)' }}
              />
            </div>

            {/* 2. Overlapping Keith Image (The Floater) */}
            {/* Positioned absolute relative to the parent div, NOT inside the image div */}
            {/* Tablet: Adjust positioning to prevent overflow */}
            {/* GPU acceleration added via transform to prevent scroll jitter */}
            <div
              className="absolute z-20 -bottom-8 md:-bottom-12 lg:-bottom-16 left-4 md:left-8 lg:left-12 xl:-left-6 w-[35%] md:w-[40%] lg:w-[45%] max-w-[180px] md:max-w-none border-[4px] md:border-[6px] lg:border-[8px] border-white rounded-lg shadow-2xl overflow-hidden"
              style={{ 
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                WebkitFontSmoothing: 'antialiased',
                transform: 'translateZ(0)'
              }}
            >
               {/* Aspect ratio square for Keith */}
              <div className="aspect-square relative">
                  <Image
                  src="/merritt-assets/keithpicture.jpg"
                  alt="Keith Wiebe Gordon - Co-Founder of Anhart with 20 years of development experience"
                  fill
                  className="object-cover"
                  />
              </div>
            </div>

            {/* Keith's Title - Positioned below the image frame */}
            <div
              className="absolute z-30 -bottom-8 md:-bottom-16 lg:-bottom-24 left-4 md:left-8 lg:left-12 xl:-left-6 w-[40%] md:w-[40%] lg:w-[45%] max-w-[200px] md:max-w-none flex justify-center"
              style={{ 
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                WebkitFontSmoothing: 'antialiased',
                transform: 'translateZ(0)'
              }}
            >
              <p className="text-white font-black text-[9px] md:text-xs lg:text-sm tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] drop-shadow-[0_0px_8px_rgba(0,0,0,0.6)] text-center px-1 leading-tight">
                Co-Founder Keith Wiebe Gordon<br/>(20 years of development experience)
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
          style={{ y: villageY, rotateZ: 0.01 }}
        >
          <picture className="w-full h-full">
            <source srcSet="/merritt-assets/fullvillage.webp" type="image/webp" />
            <img
              src="/merritt-assets/fullvillage.jpg"
              alt="Merritt townhome community site in the scenic Nicola Valley landscape"
              className="w-full h-full object-cover scale-110"
            />
          </picture>
        </motion.div>
      </section>

      {/* Featured Units and Homes */}
      <section ref={featuredSectionRef} className="relative bg-white py-12 md:py-16 lg:py-24 overflow-hidden">
        <div className="container mx-auto px-8 md:px-10 lg:px-8 max-w-7xl">
          <div className="text-center mb-8 md:mb-12">
            <span className="text-xs uppercase tracking-widest-xl text-[#1a2621]/50">Available Properties</span>
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl mt-4 text-[#1a2621]">Featured Units & Homes</h2>
          </div>
          {/* Tablet: 2 columns side by side, Mobile: Stack, Desktop: 2 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto relative z-10">
            {/* Garden Flat (2-Bedroom) */}
            <div className="bg-white rounded-xl shadow-xl border border-[#e6e2da] overflow-hidden group hover:shadow-2xl transition-all duration-300 h-full flex flex-col relative z-10">
              <div
                className="relative h-80 overflow-hidden group cursor-pointer md:cursor-default"
                onClick={() => setGardenFlatImage((prev) => (prev + 1) % 3)}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  setGardenFlatImage((prev) => (prev + 1) % 3);
                }}
              >
                {/* Mobile tap indicator */}
                <div className="absolute bottom-8 right-4 md:hidden">
                  <div className="bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                    Tap to cycle
                  </div>
                </div>
                {/* Exterior Garden View - Default */}
                <img
                  src="/merritt-assets/seniorgarden.jpg"
                  alt="Garden Flat exterior - Ground level 2-bedroom Anhart townhome in Merritt with private garden access"
                  loading="lazy"
                   className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                     gardenFlatImage === 0 ? 'opacity-100' : 'opacity-0'
                   } md:group-hover:opacity-0`}
                />
                {/* Bedroom Interior */}
                <img
                  src="/merritt-assets/gbedroom.jpg"
                  alt="Garden Flat bedroom - Comfortable and well-designed bedroom in Merritt townhome"
                  loading="lazy"
                   className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                     gardenFlatImage === 1 ? 'opacity-100' : 'opacity-0'
                   } md:group-hover:opacity-100`}
                />
                {/* Kitchen Interior */}
                <img
                  src="/merritt-assets/gkitchen.jpg"
                  alt="Garden Flat kitchen - Modern, functional kitchen design in Anhart Merritt townhome"
                  loading="lazy"
                   className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                     gardenFlatImage === 2 ? 'opacity-100' : 'opacity-0'
                   } md:group-hover:opacity-100 md:group-hover:delay-1000`}
                />
                <div className="absolute top-4 left-4">
                  <div className="w-16 h-8 bg-[#a6906c] rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg">GROUND</div>
                </div>
                  <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-serif text-2xl text-white drop-shadow-lg" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 4px 8px rgba(0,0,0,0.6)' }}>Garden Flat</h3>
                  <p className="text-white/90 text-sm" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.6)' }}>1-2 Bedrooms • ~800* sq ft</p>
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
                  <div className="w-full bg-[#a6906c] text-white py-3 px-4 rounded-lg text-sm font-semibold inline-block text-center">
                    Final product specifications to be determined
                  </div>
                </div>
              </div>
            </div>

            {/* Sky Townhome (3-Bedroom) */}
            <div className="bg-white rounded-xl shadow-xl border border-[#e6e2da] overflow-hidden group hover:shadow-2xl transition-all duration-300 h-full flex flex-col relative z-10">
              <div
                className="relative h-80 overflow-hidden group cursor-pointer md:cursor-default"
                onClick={() => setSkyTownhomeImage((prev) => (prev + 1) % 3)}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  setSkyTownhomeImage((prev) => (prev + 1) % 3);
                }}
              >
                {/* Mobile tap indicator */}
                <div className="absolute bottom-8 right-4 md:hidden">
                  <div className="bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                    Tap to cycle
                  </div>
                </div>
                {/* Exterior View - Default */}
                <img
                  src="/merritt-assets/family.jpg"
                  alt="Sky Townhome exterior - Two-story 3-bedroom Anhart townhome in Merritt"
                  loading="lazy"
                   className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                     skyTownhomeImage === 0 ? 'opacity-100' : 'opacity-0'
                   } md:group-hover:opacity-0`}
                />
                {/* Bedroom Interior */}
                <img
                  src="/merritt-assets/sbedroom.jpg"
                  alt="Sky Townhome master bedroom - Spacious bedroom with walk-in closet in Merritt townhome"
                  loading="lazy"
                   className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                     skyTownhomeImage === 1 ? 'opacity-100' : 'opacity-0'
                   } md:group-hover:opacity-100`}
                />
                {/* Kitchen Interior */}
                <img
                  src="/merritt-assets/skitchen.jpg"
                  alt="Sky Townhome kitchen - Entertainer's kitchen with large U-shaped design in Merritt townhome"
                  loading="lazy"
                   className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                     skyTownhomeImage === 2 ? 'opacity-100' : 'opacity-0'
                   } md:group-hover:opacity-100 md:group-hover:delay-1000`}
                />
                <div className="absolute top-4 left-4">
                  <div className="w-20 md:w-16 h-8 bg-[#a6906c] rounded-full flex items-center justify-center text-white font-bold text-[9px] md:text-[10px] shadow-lg px-2">2-STORY</div>
                </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-serif text-2xl text-white drop-shadow-lg" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 4px 8px rgba(0,0,0,0.6)' }}>Sky Townhome</h3>
                    <p className="text-white/90 text-sm" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.6)' }}>2-3 Bedrooms • ~1,500* sq ft</p>
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
                  <div className="w-full bg-[#a6906c] text-white py-3 px-4 rounded-lg text-sm font-semibold inline-block text-center">
                    Final product specifications to be determined
                  </div>
                </div>
              </div>
            </div>
          </div>

            {/* Decorative Trees - GSAP Animated */}
            {/* Tablet: Smaller trees, Desktop: Full size */}
            <div ref={leftTreeRef} className="absolute bottom-0 left-0 md:left-4 lg:left-8 xl:left-12 w-64 md:w-80 lg:w-96 xl:w-[32rem] pointer-events-none z-0 overflow-hidden">
            <Image
              src="/merritt-assets/trees1.png"
              alt="Decorative pine tree"
              width={500}
              height={1500}
              className="object-contain w-full h-auto opacity-70"
            />
          </div>

            <div ref={rightTreeRef} className="absolute bottom-0 right-0 md:right-4 lg:right-8 xl:right-12 w-64 md:w-80 lg:w-96 xl:w-[32rem] pointer-events-none z-0 overflow-hidden">
            <Image
              src="/merritt-assets/trees2.png"
              alt="Decorative pine tree"
              width={500}
              height={1500}
              className="object-contain w-full h-auto opacity-70"
            />
          </div>
        </div>
      </section>

      {/* Expertise Grid */}
      <section ref={amenitiesSectionRef} id="expertise" className="relative overflow-hidden py-12 md:py-20 border-t border-[#e6e2da]">

          {/* Mountain Background Image - GSAP Parallax */}
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
        <div className="container mx-auto px-8 md:px-10 lg:px-8 relative z-10">
            <div className="text-center mb-8 md:mb-12">
              <span className="text-xs uppercase tracking-widest-xl text-[#1a2621]/50">Location Advantages</span>
              <h2 className="font-serif text-3xl md:text-4xl mt-4 text-[#1a2621]">Three Best Amenities</h2>
            </div>
            {/* Tablet: Stack all cards (1 column), Desktop: 3 columns side by side */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
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
                  <p className="text-[#1a2621]/70 leading-relaxed mb-4 text-sm md:text-base px-2 md:px-0">
                    These quality amenities provide exceptional convenience, allowing residents to walk to education, dining, and entertainment - perfect for busy professionals and growing families.
                  </p>
                  <div className="space-y-3 px-2 md:px-0">
                    <div className="border-l-4 border-[#a6906c] pl-4">
                        <h4 className="font-semibold text-[#1a2621] text-sm">NVIT Campus</h4>
                        <p className="text-[#1a2621]/60 text-xs">850m walk • 12 minutes</p>
                    </div>
                    <div className="border-l-4 border-[#a6906c] pl-4">
                        <h4 className="font-semibold text-[#1a2621] text-sm">Game On Sports Bar</h4>
                        <p className="text-[#1a2621]/60 text-xs">Next door • 3701 De Wolf Way</p>
                    </div>
                    <div className="border-l-4 border-[#a6906c] pl-4">
                        <h4 className="font-semibold text-[#1a2621] text-sm">Trails & Hikes</h4>
                        <p className="text-[#1a2621]/60 text-xs">Immediate access • Scenic walking paths</p>
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
            <div className="text-center mt-8 md:mt-12 px-4">
              <Link
                href="/Merritt/neighbourhood"
                className="inline-block bg-[#a6906c] text-white px-6 md:px-8 py-3 md:py-4 text-sm md:text-lg font-bold uppercase tracking-wider rounded-full shadow-lg hover:bg-[#8b7355] transition-all duration-300 cursor-pointer glow-hover"
              >
                Explore the Complete Neighbourhood Guide
              </Link>
            </div>
        </div>
      </section>

    {/* MAP / LOCATION SECTION */}
    <section className="relative z-10 bg-[#1a2621] text-[#f9f8f6] py-16 md:py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-10"></div>
        {/* Tablet: Stack vertically, Desktop: Side by side */}
        <div className="container mx-auto px-8 md:px-10 lg:px-8 relative z-10 flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-16 items-center max-w-7xl">
            <div className="w-full lg:w-1/3">
                <span className="text-[#a6906c] text-xs tracking-widest uppercase mb-4 block">Location</span>
                <h2 className="font-serif text-2xl md:text-3xl mb-6">Merritt Townhome Community</h2>
                <p className="text-[#e6e2da] leading-relaxed mb-8 font-light text-sm md:text-base px-2 md:px-0">Located in the heart of Merritt, BC, our townhome community offers the perfect balance of urban convenience and natural beauty in the scenic Nicola Valley.</p>
                <ul className="space-y-4 text-sm tracking-wide px-2 md:px-0">
                    <li className="flex items-center gap-3 border-b border-white/10 pb-2"><MapPin className="text-[#a6906c] w-4 h-4 flex-shrink-0" /> Prime Merritt Location</li>
                    <li className="flex items-center gap-3 border-b border-white/10 pb-2"><MapPin className="text-[#a6906c] w-4 h-4 flex-shrink-0" /> Walking Distance to Amenities & Hikes/Trails</li>
                    <li className="flex items-center gap-3 border-b border-white/10 pb-2"><MapPin className="text-[#a6906c] w-4 h-4 flex-shrink-0" /> Easy Highway Access</li>
                </ul>
            </div>
            <div className="w-full lg:w-2/3 space-y-6">
                {/* Google Maps - Top */}
                <div className="h-[300px] md:h-[400px] bg-[#23362b] rounded-lg overflow-hidden shadow-2xl border border-white/10 relative group">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3254.789!2d-120.762!3d50.1205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54813f8b4e6c9b9f%3A0x3757%20De%20Wolf%20Way%2C%20Merritt%2C%20BC!2s3757%20De%20Wolf%20Way%2C%20Merritt%2C%20BC!5e0!3m2!1sen!2sca!4v1715123456789!5m2!1sen!2sca"
                        width="100%"
                        height="100%"
                        style={{border:0}}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Merritt Townhome Community, Merritt, BC"
                        className="opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                    />
                </div>

                {/* Mountain Views Image - Bottom */}
                <div className="h-[200px] md:h-[300px] rounded-lg overflow-hidden shadow-2xl border border-white/10 relative group">
                    <Image
                        src="/merritt-assets/mountainviews.jpg"
                        alt="Breathtaking Nicola Valley mountain views from Merritt townhome location"
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="font-serif text-lg font-bold mb-1">Mountain Views</h3>
                        <p className="text-sm text-white/90">Breathtaking scenery surrounds our community</p>
                    </div>
                </div>

            </div>
        </div>
    </section>

    {/* CONTACT FORM */}
    <section id="contact" className="relative z-10 py-12 md:py-16 lg:py-20 bg-[#f9f8f6] overflow-hidden">
        {/* Happy Family Background Overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
            <img
                src="/merritt-assets/happyfamily.jpg"
                alt="Happy family background"
                className="w-full h-full object-cover"
            />
        </div>
        <div className="container mx-auto px-6 md:px-8 relative z-10 max-w-7xl">
            <div className="max-w-4xl mx-auto bg-white p-6 md:p-8 lg:p-12 shadow-2xl shadow-[#1a2621]/5 relative overflow-hidden reveal">
                <div className="absolute top-0 left-0 w-full h-2 bg-[#1a2621]"></div>
                <div className="text-center mb-6 md:mb-8">
                    <h2 className="font-serif text-2xl md:text-3xl text-[#1a2621] mb-3">Register for Priority Updates</h2>
                    <p className="text-[#1a2621]/60 text-sm md:text-base">Join our interest list for affordable housing in Merritt, BC.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <input 
                            type="text" 
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="First Name" 
                            required
                            className="bg-transparent border-b border-[#1a2621]/20 py-3 md:py-3 outline-none focus:border-[#a6906c] transition-colors placeholder-[#1a2621]/40 text-base md:text-sm"/>
                        <input 
                            type="text" 
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder="Last Name" 
                            required
                            className="bg-transparent border-b border-[#1a2621]/20 py-3 md:py-3 outline-none focus:border-[#a6906c] transition-colors placeholder-[#1a2621]/40 text-base md:text-sm"/>
                    </div>
                    <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email Address" 
                        required
                        className="w-full bg-transparent border-b border-[#1a2621]/20 py-3 md:py-3 outline-none focus:border-[#a6906c] transition-colors placeholder-[#1a2621]/40 text-base md:text-sm"/>
                    <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Phone Number" 
                        required
                        className="w-full bg-transparent border-b border-[#1a2621]/20 py-3 md:py-3 outline-none focus:border-[#a6906c] transition-colors placeholder-[#1a2621]/40 text-base md:text-sm"/>
                    <select 
                        name="unitType"
                        value={formData.unitType}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-transparent border-b border-[#1a2621]/20 py-3 md:py-3 outline-none focus:border-[#a6906c] transition-colors text-[#1a2621]/70 text-base md:text-sm">
                        <option value="">Select Unit Type</option>
                        <option value="2-Bedroom Garden Flat">2-Bedroom Garden Flat</option>
                        <option value="3-Bedroom Sky Townhome">3-Bedroom Sky Townhome</option>
                        <option value="Corner Unit">Corner Unit</option>
                        <option value="General Inquiry">General Inquiry</option>
                    </select>
                    <select 
                        name="currentLocation"
                        value={formData.currentLocation}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-transparent border-b border-[#1a2621]/20 py-3 md:py-3 outline-none focus:border-[#a6906c] transition-colors text-[#1a2621]/70 text-base md:text-sm">
                        <option value="">Current Location</option>
                        <option value="Kamloops Area">Kamloops Area</option>
                        <option value="Kelowna Area">Kelowna Area</option>
                        <option value="Vancouver Area">Vancouver Area</option>
                        <option value="Other Location">Other Location</option>
                    </select>
                    <select 
                        name="hearAboutUs"
                        value={formData.hearAboutUs}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-transparent border-b border-[#1a2621]/20 py-3 md:py-3 outline-none focus:border-[#a6906c] transition-colors text-[#1a2621]/70 text-base md:text-sm">
                        <option value="">How did you hear about us?</option>
                        <option value="Online Search">Online Search</option>
                        <option value="Social Media">Social Media</option>
                        <option value="Referral from friend/family">Referral from friend/family</option>
                        <option value="Real estate agent">Real estate agent</option>
                        <option value="Newspaper/magazine">Newspaper/magazine</option>
                        <option value="Billboard/signage">Billboard/signage</option>
                        <option value="Community event">Community event</option>
                        <option value="Other">Other</option>
                    </select>
                    <textarea 
                        rows={3} 
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about your housing needs and timeline..." 
                        className="w-full bg-transparent border-b border-[#1a2621]/20 py-3 md:py-3 outline-none focus:border-[#a6906c] transition-colors placeholder-[#1a2621]/40 text-base md:text-sm resize-none"></textarea>

                    {submitStatus === 'success' && (
                        <div className="text-center text-green-600 text-sm">
                            Thank you! Your interest has been registered successfully.
                        </div>
                    )}
                    {submitStatus === 'error' && (
                        <div className="text-center text-red-600 text-sm">
                            There was an error submitting your form. Please try again.
                        </div>
                    )}

                    {/* Cloudflare Turnstile - Hidden */}
                    <div className="flex justify-center py-4" key={turnstileKey}>
                        <Turnstile
                            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "0x4AAAAAACHSP48uvsbyUZG1"}
                            onSuccess={turnstileHandlers.onSuccess}
                            onError={turnstileHandlers.onError}
                            onExpire={turnstileHandlers.onExpire}
                            theme="auto"
                            size="invisible"
                        />
                    </div>

                    <div className="pt-4 md:pt-6 text-center">
                        <button 
                            type="submit" 
                            onClick={handleButtonClick}
                            disabled={isSubmitting || !turnstileToken}
                            className={`inline-block px-6 py-3 text-base font-bold uppercase tracking-wider transition-colors rounded-lg ${
                                !turnstileToken 
                                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                                    : 'bg-[#a6906c] text-white hover:bg-[#8b7355] glow-hover cursor-pointer'
                            } disabled:opacity-50 disabled:cursor-not-allowed`}>
                            {!turnstileToken 
                                ? 'Verifying User...' 
                                : isSubmitting 
                                    ? 'Submitting...' 
                                    : 'Register Interest'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </section>

    {/* Footer */}
    <Footer />
    </div>
  );
}