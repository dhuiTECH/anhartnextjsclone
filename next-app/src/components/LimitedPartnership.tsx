'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileText, Users, DollarSign, Building, Shield, Target, Calendar, Mail, CheckCircle, ArrowRight, TrendingUp, Heart, ChevronLeft, ChevronRight, ChevronDown, Lock, Leaf, MapPin, Phone } from "lucide-react";
import { useFormSubmission } from "@/hooks/useFormSubmission";
import { useTurnstile } from "@/hooks/useTurnstile";
import { logger } from "@/utils/logger";
import { ScrollAnimationWrapper } from "@/components/animations/ScrollAnimationWrapper";
import React, { useEffect, useState } from "react";
import { Turnstile } from "@/components/Turnstile";
import { AddressUtils, CONTACT_INFO } from "@/config/address";

// Partnership expectations - what we expect from limited partners
const partnershipExpectations = [{
  icon: DollarSign,
  title: "Accredited Investors Only",
  description: "Minimum $100,000 investment from accredited investors under Canadian securities law, with significant capital commitment to long-term affordable housing development."
}, {
  icon: Calendar,
  title: "Long-Term Commitment",
  description: "3-year minimum hold with 50-year partnership term. We seek mission-aligned partners, not short-term speculators seeking quick returns."
}, {
  icon: Shield,
  title: "Mission Alignment",
  description: "Partners who share our vision of creating both strong financial returns and measurable social impact in affordable housing."
}, {
  icon: Users,
  title: "Community Focus",
  description: "Investors interested in supporting local housing projects that directly benefit their own communities across Canada and beyond."
}];

// What limited partners can expect to receive
const partnerBenefits = [{
  icon: TrendingUp,
  title: "2% Preferred Return",
  description: "2% preferred rate of return, paid semi-annually, subject to the availability of distributable cash after expenses, debts, liabilities, and reserves. Returns depend on distributable cash and are not guaranteed."
}, {
  icon: Building,
  title: "Direct Project Impact & Transparency",
  description: "Your investment directly funds affordable housing projects across Canada, with regular updates on project performance metrics, financial distributions, and social impact outcomes."
}, {
  icon: Heart,
  title: "Social Impact Returns",
  description: "Beyond financial returns, contribute to creating sustainable, affordable housing solutions that strengthen communities long-term."
}, {
  icon: Target,
  title: "Net Sale Proceeds",
  description: "Distribution of net proceeds from sales of project lands or assets, providing additional return potential beyond ongoing cash flow distributions. Subject to distributable cash availability."
}];
const investmentTerms = [{
  label: "Units Offered",
  value: "Up to 10 million units"
}, {
  label: "Minimum Investment",
  value: "$100,000 (Accredited Investors Only)"
}, {
  label: "Offering Price",
  value: "CAD $1.00 per unit"
}, {
  label: "Preferred Return",
  value: "2% annually, paid semi-annually (subject to distributable cash)"
}, {
  label: "Redemption Rights",
  value: "After 3 years (with conditions and limits)"
}, {
  label: "Transfer Restrictions",
  value: "Non-transferable (limited exceptions)"
}, {
  label: "Dissolution",
  value: "50 years"
}];

// Three-Stage National Expansion data
const expansionStages = [{
  icon: Target,
  title: "Foundation Phase (2004-2023)",
  description: "Established core operations with foundational projects including Jubilee Rooms, Dodson Hotel, and early developments, building the foundation for national expansion.",
  milestones: [
    "151 affordable housing units",
    "$6M in impact loans managed",
    "Community Builders Group formation",
    "Ryder Village development (Hope, BC)"
  ],
  color: "primary"
}, {
  icon: Calendar,
  title: "Scaling Phase (2024-2026)",
  description: "Scaling operations through the Limited Partnership, expanding reach and impact across multiple regions with proven models.",
  milestones: [
    "Limited Partnership launch",
    "Regional expansion projects",
    "Clean Start social enterprise",
    "Provincial partnership development"
  ],
  color: "muted"
}, {
  icon: Building,
  title: "National Rollout (2026-2028)",
  description: "Full national expansion with comprehensive coverage across all provinces and territories, leveraging the Limited Partnership for coast-to-coast affordable housing development.",
  milestones: [
    "National operator network",
    "All provinces/territories coverage",
    "10,000+ housing units target",
    "Full-scale impact delivery"
  ],
  color: "primary"
}];

// Additional Ways to Support data
const supportMethods = [{
  icon: DollarSign,
  title: "Impact Lending",
  description: "Offer below-market loans that directly fund affordable housing projects, prioritizing mission-driven impact over financial return.",
  benefits: [
    "Direct project funding",
    "Below-market interest rates",
    "Mission-driven impact"
  ],
  color: "muted"
}, {
  icon: Heart,
  title: "Share Donations",
  description: "Donate shares or securities to support affordable housing development while receiving tax benefits.",
  benefits: [
    "Tax receipt benefits",
    "Avoid capital gains tax",
    "Direct social impact"
  ],
  color: "primary"
}, {
  icon: Users,
  title: "Estate Strategies",
  description: "Include affordable housing in your estate planning to create lasting community impact for future generations.",
  benefits: [
    "Legacy building",
    "Estate tax benefits",
    "Multi-generational impact"
  ],
  color: "muted"
}];

// Investment strategy selector data
const strategyOptions = [{
  name: "Fixed Income",
  badgeClass: "bg-slate-700 text-white",
  risk: "Low",
  returns: "5-9%",
  term: "5-10 Years",
  project: "Vector Mortgage Trust",
  image: "https://images.unsplash.com/photo-1529429617124-aee6d3ce0108?auto=format&fit=crop&w=1200&q=80",
  equity: "$8,000,000",
  irr: "7-10%",
  minInvest: "$10,000"
}, {
  name: "Core Plus",
  badgeClass: "bg-lime-600 text-white",
  risk: "Low-Moderate",
  returns: "9-15%",
  term: "4-8 Years",
  project: "600 Norfolk Street N LP",
  image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
  equity: "$1,600,000",
  irr: "11.4%",
  minInvest: "$50,000"
}, {
  name: "Value Add",
  badgeClass: "bg-orange-600 text-white",
  risk: "Moderate-High",
  returns: "12-18%",
  term: "1-6 Years",
  project: "Centra Apartments",
  image: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
  equity: "$18,500,000",
  irr: "17.5%",
  minInvest: "$20,000"
}, {
  name: "Opportunistic",
  badgeClass: "bg-red-800 text-white",
  risk: "High",
  returns: "18-27%",
  term: "3-8 Years",
  project: "Upper Mayfield Estates",
  image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
  equity: "$21,900,000",
  irr: "26.82%",
  minInvest: "$5,000"
}];

export const LimitedPartnership = () => {
  const {
    submitForm,
    isSubmitting
  } = useFormSubmission();

  // =============================================================================
  // PAGINATION STATE
  // =============================================================================
  const [currentExpectationsPage, setCurrentExpectationsPage] = useState(0);
  const [currentBenefitsPage, setCurrentBenefitsPage] = useState(0);
  const [currentExpansionPage, setCurrentExpansionPage] = useState(0);
  const [currentSupportPage, setCurrentSupportPage] = useState(0);
  const fallbackStrategyImage = "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80";
  const strategyData = [{
    name: 'Fixed Income',
    pillClass: 'bg-slate-700 text-white',
    risk: 'Low',
    return: '5-9%',
    term: '5-10 Years',
    project: 'Vector Mortgage Trust',
    equity: '$8,000,000',
    irr: '7-10%',
    minInvest: '$10,000',
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80'
  }, {
    name: 'Core Plus',
    pillClass: 'bg-lime-600 text-white',
    risk: 'Low-Moderate',
    return: '9-15%',
    term: '4-8 Years',
    project: '600 Norfolk Street N LP',
    equity: '$1,600,000',
    irr: '11.4%',
    minInvest: '$50,000',
    image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80'
  }, {
    name: 'Value Add',
    pillClass: 'bg-orange-600 text-white',
    risk: 'Moderate-High',
    return: '12-18%',
    term: '1-6 Years',
    project: 'Centra Apartments',
    equity: '$18,500,000',
    irr: '17.5%',
    minInvest: '$20,000',
    image: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=1200&q=80'
  }, {
    name: 'Opportunistic',
    pillClass: 'bg-red-800 text-white',
    risk: 'High',
    return: '18-27%',
    term: '3-8 Years',
    project: 'Upper Mayfield Estates',
    equity: '$21,900,000',
    irr: '26.82%',
    minInvest: '$5,000',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80'
  }];
  const [selectedStrategy, setSelectedStrategy] = useState(strategyData[0]);
  const [isStrategyCardVisible, setIsStrategyCardVisible] = useState(true);
  
  // =============================================================================
  // DISCLAIMER COLLAPSE STATE
  // =============================================================================
  const [isDisclaimerExpanded, setIsDisclaimerExpanded] = useState(false);
  
  // Touch handling state
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });
  const [touchTimeout, setTouchTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isTouchActive, setIsTouchActive] = useState(false);
  
  // Swipe animation state
  const [isAnimating, setIsAnimating] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  
  // Horizontal gesture locking state
  const [isHorizontalGesture, setIsHorizontalGesture] = useState(false);
  const [gestureStartY, setGestureStartY] = useState(0);
  
  // Turnstile state
  const { token: turnstileToken, key: turnstileKey, reset: resetTurnstile, handlers: turnstileHandlers } = useTurnstile();

  // =============================================================================
  // NAVIGATION FUNCTIONS
  // =============================================================================
  const goToPreviousExpectationsPage = () => {
    setCurrentExpectationsPage(prev => 
      prev > 0 ? prev - 1 : partnershipExpectations.length - 1
    );
  };

  const goToNextExpectationsPage = () => {
    setCurrentExpectationsPage(prev => 
      prev < partnershipExpectations.length - 1 ? prev + 1 : 0
    );
  };

  const goToPreviousBenefitsPage = () => {
    setCurrentBenefitsPage(prev => 
      prev > 0 ? prev - 1 : partnerBenefits.length - 1
    );
  };

  const goToNextBenefitsPage = () => {
    setCurrentBenefitsPage(prev => 
      prev < partnerBenefits.length - 1 ? prev + 1 : 0
    );
  };

  const goToPreviousExpansionPage = () => {
    setCurrentExpansionPage(prev => 
      prev > 0 ? prev - 1 : 2 // 3 stages (0, 1, 2)
    );
  };

  const goToNextExpansionPage = () => {
    setCurrentExpansionPage(prev => 
      prev < 2 ? prev + 1 : 0 // 3 stages (0, 1, 2)
    );
  };

  const goToPreviousSupportPage = () => {
    setCurrentSupportPage(prev => 
      prev > 0 ? prev - 1 : 2 // 3 support methods (0, 1, 2)
    );
  };

  const goToNextSupportPage = () => {
    setCurrentSupportPage(prev => 
      prev < 2 ? prev + 1 : 0 // 3 support methods (0, 1, 2)
    );
  };

  // Touch handling functions
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.targetTouches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
    setTouchEnd({ x: 0, y: 0 });
    setIsTouchActive(true);
    
    // Capture initial Y position for gesture detection
    setGestureStartY(touch.clientY);
    setIsHorizontalGesture(false);
    
    // Clear any existing timeout
    if (touchTimeout) {
      clearTimeout(touchTimeout);
    }
    
    // Set a timeout to reset touch state if no movement occurs
    const timeout = setTimeout(() => {
      setTouchStart({ x: 0, y: 0 });
      setTouchEnd({ x: 0, y: 0 });
      setIsTouchActive(false);
    }, 1000); // Reset after 1 second of no movement
    
    setTouchTimeout(timeout);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.targetTouches[0];
    setTouchEnd({ x: touch.clientX, y: touch.clientY });
    
    // Clear timeout since user is moving
    if (touchTimeout) {
      clearTimeout(touchTimeout);
      setTouchTimeout(null);
    }
    
    // Calculate movement distances
    const deltaX = Math.abs(touch.clientX - touchStart.x);
    const deltaY = Math.abs(touch.clientY - gestureStartY);
    
    // Detect horizontal gesture if horizontal movement is dominant
    if (!isHorizontalGesture && deltaX > 20 && deltaX > deltaY * 2) {
      setIsHorizontalGesture(true);
    }
    
    // If horizontal gesture is detected, prevent vertical scrolling
    if (isHorizontalGesture) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    // Determine swipe direction for animation
    if (deltaX > 10) {
      setSwipeDirection((touch.clientX - touchStart.x) > 0 ? 'right' : 'left');
    }
  };

  const handleTouchEnd = (type: 'expectations' | 'benefits' | 'expansion' | 'support') => {
    // Clear any pending timeout
    if (touchTimeout) {
      clearTimeout(touchTimeout);
      setTouchTimeout(null);
    }
    
    // Only process swipe if we have both start and end positions
    if (touchStart.x && touchEnd.x) {
      const distance = touchStart.x - touchEnd.x;
      const isLeftSwipe = distance > 50;
      const isRightSwipe = distance < -50;

      // Trigger swipe animation
      if (swipeDirection) {
        setIsAnimating(true);
        setTimeout(() => {
          setIsAnimating(false);
          setSwipeDirection(null);
        }, 300);
      }
      
      if (isLeftSwipe) {
        if (type === 'expectations') goToNextExpectationsPage();
        if (type === 'benefits') goToNextBenefitsPage();
        if (type === 'expansion') goToNextExpansionPage();
        if (type === 'support') goToNextSupportPage();
      }
      if (isRightSwipe) {
        if (type === 'expectations') goToPreviousExpectationsPage();
        if (type === 'benefits') goToPreviousBenefitsPage();
        if (type === 'expansion') goToPreviousExpansionPage();
        if (type === 'support') goToPreviousSupportPage();
      }
    }
    
    // Always reset touch state after touch end to allow vertical scrolling
    setTouchStart({ x: 0, y: 0 });
    setTouchEnd({ x: 0, y: 0 });
    setIsTouchActive(false);
    setIsHorizontalGesture(false);
  };

  // Handle touch cancel events (when touch is interrupted)
  const handleTouchCancel = () => {
    // Clear any pending timeout
    if (touchTimeout) {
      clearTimeout(touchTimeout);
      setTouchTimeout(null);
    }
    
    // Reset touch state immediately on cancel
    setTouchStart({ x: 0, y: 0 });
    setTouchEnd({ x: 0, y: 0 });
    setIsTouchActive(false);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Check honeypot field - if filled, it's likely a bot
    const honeypot = formData.get('website') as string;
    if (honeypot && honeypot.trim() !== "") {
      // Silently reject bot submissions - no logging needed
      return;
    }
    
    // Validate Turnstile token
    if (!turnstileToken) {
      // Silently return - Turnstile widget should handle user feedback
      return;
    }
    
    const name = formData.get('name') as string;
    const success = await submitForm({
      name,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      organization: formData.get('organization') as string,
      investment_amount: formData.get('investmentAmount') as string,
      message: formData.get('message') as string,
      form_type: 'limited_partnership',
      turnstile_token: turnstileToken || undefined,
    });
    if (success) {
      form.reset();
      resetTurnstile();
    }
  };
  useEffect(() => {
    const tabs = Array.from(document.querySelectorAll<HTMLButtonElement>(".why-tab"));
    const panels = Array.from(document.querySelectorAll<HTMLElement>(".why-panel"));

    const deactivateAll = () => {
      tabs.forEach(tab => {
        tab.classList.remove("border-[#E57373]", "bg-rose-50", "text-[#1c1917]", "shadow-[0_10px_30px_-12px_rgba(229,115,115,0.35)]");
        tab.classList.add("border-stone-200", "text-slate-700");
      });
      panels.forEach(panel => {
        panel.classList.add("hidden");
        panel.classList.remove("opacity-100");
        panel.classList.add("opacity-0");
      });
    };

    const activate = (targetId: string) => {
      deactivateAll();
      const targetTab = tabs.find(t => t.dataset.target === targetId);
      const targetPanel = document.getElementById(targetId);
      if (targetTab) {
        targetTab.classList.remove("border-stone-200", "text-slate-700");
        targetTab.classList.add("border-[#E57373]", "bg-rose-50", "text-[#1c1917]", "shadow-[0_10px_30px_-12px_rgba(229,115,115,0.35)]");
      }
      if (targetPanel) {
        targetPanel.classList.remove("hidden");
        requestAnimationFrame(() => {
          targetPanel.classList.remove("opacity-0");
          targetPanel.classList.add("opacity-100");
        });
      }
    };

    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        const target = tab.dataset.target;
        if (target) activate(target);
      });
    });

    // set default active
    activate("content-1");

    return () => {
      tabs.forEach(tab => {
        tab.replaceWith(tab.cloneNode(true));
      });
    };
  }, []);

  return <section id="limited-partnership" className="py-8 md:py-16 bg-gradient-to-br from-muted/20 via-muted/30 to-muted/40 sm:py-[40px] relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"></div>
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        
        {/* Hero style header aligned with brand spec */}
        <ScrollAnimationWrapper direction="top" delay={0}>
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 lg:py-16 overflow-hidden">
            <div className="relative grid items-center gap-16 lg:gap-20 lg:grid-cols-2">
              {/* Left copy */}
              <div className="space-y-8">
                <h1 className="text-5xl lg:text-6xl font-serif font-bold leading-tight text-[#1c1917]">
                  Affordable Housing Limited Partnership for Accredited Canadian Investors
                </h1>
                <p className="font-sans text-lg text-stone-600 leading-relaxed max-w-2xl">
                  Institutional-grade impact investments in Vancouver, BC with stable preferred returns backed by affordable housing assets across Canada. Built for accredited investors seeking community-scale outcomes.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    variant="default"
                    asChild
                    className="font-sans rounded-lg bg-[#E57373] border border-[#E57373] hover:bg-[#d65b5b] text-white shadow-[0_10px_30px_-12px_rgba(229,115,115,0.45)] px-7 sm:px-10 py-3 text-sm sm:text-base font-semibold tracking-wide"
                  >
                    <a href="#investment-inquiry">Start Investing</a>
                  </Button>
                  <Button
                    variant="outline"
                    asChild
                    className="font-sans rounded-lg border border-stone-300 text-stone-800 hover:bg-stone-50 px-7 sm:px-10 py-3 text-sm sm:text-base font-semibold tracking-wide"
                  >
                    <a href="#investment-strategy">View Offerings</a>
                  </Button>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-stone-600">
                  <a href={`tel:${CONTACT_INFO.phone.replace(/[^\d]/g, '')}`} className="hover:text-[#E57373] transition-colors">
                    Call {CONTACT_INFO.phone}
                  </a>
                  <span className="hidden sm:inline text-stone-400">•</span>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-[#E57373] transition-colors">
                    Email {CONTACT_INFO.email}
                  </a>
                  <span className="hidden sm:inline text-stone-400">•</span>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(AddressUtils.getGoogleMapsAddress())}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#E57373] transition-colors"
                  >
                    {AddressUtils.getShortAddress()}
                  </a>
                </div>
                <div className="font-sans flex flex-wrap gap-6 text-xs font-semibold uppercase tracking-[0.18em] text-stone-600 mt-12">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-[#E57373]" />
                    Vetted Deals
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-[#E57373]" />
                    1000+ Units Planned
                  </div>
                </div>
              </div>

              {/* Right card with decorative backdrop */}
              <div className="relative flex justify-center lg:justify-end">
                <div className="absolute -inset-4 -z-10 rotate-3 rounded-3xl bg-stone-100" aria-hidden="true"></div>
                <Card className="relative w-full max-w-xl rounded-2xl border border-stone-100 bg-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)]">
                  <CardContent className="p-6 sm:p-8 space-y-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2">
                        <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-stone-400">
                          Current Opportunity
                        </p>
                        <p className="font-sans text-2xl font-bold text-stone-900">
                          Anhart National LP
                        </p>
                      </div>
                      <span className="font-sans inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-xs font-bold">
                        Open for Funding
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-6 sm:gap-8">
                      <div>
                        <div className="font-sans text-4xl font-bold text-[#E57373] leading-none">2.0%</div>
                        <p className="font-sans text-sm text-stone-500 mt-2">Pref Return + Profit</p>
                      </div>
                      <div className="flex flex-col items-start sm:items-end">
                        <div className="font-sans text-4xl font-bold text-stone-900 leading-none">$16M</div>
                        <p className="font-sans text-sm text-stone-500 mt-2 text-left sm:text-right">Capital Deployed</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 rounded-xl border border-stone-100 bg-stone-50 px-4 py-4 mt-8">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-stone-200 text-[#E57373] flex-shrink-0">
                        <TrendingUp className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-sans font-semibold text-stone-900">Stable Cash Flow</p>
                        <p className="font-sans text-sm text-stone-600">
                          Returns generated from operational affordable housing assets across Canada.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </ScrollAnimationWrapper>

        {/* Why Invest Section - Brand theme */}
        <ScrollAnimationWrapper direction="top" delay={50}>
          <section className="bg-white rounded-3xl py-14 px-6 md:px-10 lg:px-14 shadow-2xl mt-10 lg:mt-16 mb-16 md:mb-24 border border-stone-100 font-roboto">
            <div className="mx-auto max-w-6xl">
              <div className="mb-10 space-y-3">
                <p className="text-sm uppercase tracking-[0.24em] text-[#3b4d34] font-semibold">Why Invest</p>
                <h3 className="text-3xl md:text-4xl font-bold leading-tight text-[#2f4c2d]">Direct deal investments that align with your goals and risk appetite.</h3>
                <p className="text-sm md:text-base text-[#2f4c2d]/80 max-w-3xl">Choose a strategy to preview a representative portfolio example with key metrics.</p>
              </div>
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-12">
                {/* Left column feature buttons */}
                <div className="space-y-4" id="why-invest-tabs">
                  <button data-target="content-1" className="why-tab w-full text-left flex items-center gap-4 rounded-2xl border border-stone-200 px-5 py-5 bg-white/80 hover:border-stone-300 transition">
                    <TrendingUp className="h-6 w-6 text-[#E57373]" />
                    <span className="text-lg md:text-xl font-semibold text-slate-800">2% Preferred Return</span>
                  </button>
                  <button data-target="content-2" className="why-tab w-full text-left flex items-center gap-4 rounded-2xl border border-stone-200 px-5 py-5 bg-white/80 hover:border-stone-300 transition">
                    <Building className="h-6 w-6 text-[#E57373]" />
                    <span className="text-lg md:text-xl font-semibold text-slate-800">Direct Project Impact</span>
                  </button>
                  <button data-target="content-3" className="why-tab w-full text-left flex items-center gap-4 rounded-2xl border border-stone-200 px-5 py-5 bg-white/80 hover:border-stone-300 transition">
                    <Heart className="h-6 w-6 text-[#E57373]" />
                    <span className="text-lg md:text-xl font-semibold text-slate-800">Social Impact Returns</span>
                  </button>
                  <button data-target="content-4" className="why-tab w-full text-left flex items-center gap-4 rounded-2xl border border-stone-200 px-5 py-5 bg-white/80 hover:border-stone-300 transition">
                    <Target className="h-6 w-6 text-[#E57373]" />
                    <span className="text-lg md:text-xl font-semibold text-slate-800">Net Sale Proceeds</span>
                  </button>
                </div>

                {/* Right column dynamic content */}
                <div className="relative">
                  <div id="content-1" className="why-panel rounded-2xl border border-stone-200 bg-white p-6 md:p-8 shadow-xl">
                    <div className="relative h-64 md:h-80 rounded-xl overflow-hidden bg-gradient-to-br from-rose-50 via-white to-white flex items-center justify-center border border-rose-100">
                      <div className="flex flex-col items-center gap-3">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E57373]/10 border border-[#E57373]/40 text-[#E57373]">
                          <TrendingUp className="h-7 w-7" />
                        </div>
                        <span className="inline-flex items-center gap-2 rounded-full bg-[#E57373] text-white px-3 py-1 text-xs font-bold shadow-md">Semi-Annual Preferred</span>
                      </div>
                    </div>
                    <div className="mt-5 space-y-2">
                      <h4 className="text-xl font-semibold text-slate-900">2% Preferred Return</h4>
                      <p className="text-stone-600 text-sm md:text-base">2% preferred rate of return, paid semi-annually, subject to the availability of distributable cash after expenses, debts, liabilities, and reserves. Returns depend on distributable cash and are not guaranteed.</p>
                    </div>
                  </div>

                  <div id="content-2" className="why-panel hidden opacity-0 transition-opacity duration-300 rounded-2xl border border-stone-200 bg-white p-6 md:p-8 shadow-xl">
                    <div className="relative h-64 md:h-80 rounded-xl overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-white flex items-center justify-center border border-emerald-100">
                      <div className="flex flex-col items-center gap-3">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E57373]/10 border border-[#E57373]/40 text-[#E57373]">
                          <Building className="h-7 w-7" />
                        </div>
                        <span className="inline-flex items-center gap-2 rounded-full bg-[#E57373] text-white px-3 py-1 text-xs font-bold shadow-md">Project Updates</span>
                      </div>
                    </div>
                    <div className="mt-5 space-y-2">
                      <h4 className="text-xl font-semibold text-slate-900">Direct Project Impact & Transparency</h4>
                      <p className="text-stone-600 text-sm md:text-base">Your investment directly funds affordable housing projects across Canada, with regular updates on project performance metrics, financial distributions, and social impact outcomes.</p>
                    </div>
                  </div>

                  <div id="content-3" className="why-panel hidden opacity-0 transition-opacity duration-300 rounded-2xl border border-stone-200 bg-white p-6 md:p-8 shadow-xl">
                    <div className="relative h-64 md:h-80 rounded-xl overflow-hidden bg-gradient-to-br from-rose-50 to-white flex items-center justify-center border border-stone-200">
                      <div className="w-full max-w-sm">
                        <div className="h-40 bg-gradient-to-br from-[#E57373]/25 via-[#E57373]/15 to-white rounded-xl relative overflow-hidden border border-rose-100">
                          <div className="absolute inset-0 px-6 py-4 flex flex-col justify-between">
                            <div className="text-slate-900 font-semibold">Social Impact</div>
                            <div className="space-y-2 text-xs text-stone-600">
                              <div className="flex items-center justify-between"><span>Community Benefit</span><span className="font-semibold text-[#E57373]">▲ durable</span></div>
                              <div className="flex items-center justify-between"><span>Housing Stability</span><span className="font-semibold text-stone-500">↑ stronger</span></div>
                            </div>
                          </div>
                          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 space-y-2">
                      <h4 className="text-xl font-semibold text-slate-900">Social Impact Returns</h4>
                      <p className="text-stone-600 text-sm md:text-base">Beyond financial returns, contribute to creating sustainable, affordable housing solutions that strengthen communities long-term.</p>
                    </div>
                  </div>

                  <div id="content-4" className="why-panel hidden opacity-0 transition-opacity duration-300 rounded-2xl border border-stone-200 bg-white p-6 md:p-8 shadow-xl">
                    <div className="relative h-64 md:h-80 rounded-xl overflow-hidden bg-gradient-to-br from-amber-50 via-white to-white flex items-center justify-center border border-amber-100">
                      <div className="flex flex-col items-center gap-3">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E57373]/10 border border-[#E57373]/40 text-[#E57373]">
                          <Target className="h-7 w-7" />
                        </div>
                        <span className="inline-flex items-center gap-2 rounded-full bg-[#E57373] text-white px-3 py-1 text-xs font-bold shadow-md">Additional Upside</span>
                      </div>
                    </div>
                    <div className="mt-5 space-y-2">
                      <h4 className="text-xl font-semibold text-slate-900">Net Sale Proceeds</h4>
                      <p className="text-stone-600 text-sm md:text-base">Distribution of net proceeds from sales of project lands or assets, providing additional return potential beyond ongoing cash flow distributions. Subject to distributable cash availability.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ScrollAnimationWrapper>

        {/* Partnership Expectations Section - Enhanced */}
        <ScrollAnimationWrapper direction="left" delay={100}>
          <div className="mb-16 md:mb-24">
            <div className="text-center mb-8 md:mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 md:mb-6">What We Expect from Limited Partners</h3>
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
                We seek long-term committed partners who share our mission of creating sustainable, affordable housing solutions across Canada.
              </p>
            </div>
            {/* Desktop Layout - 2x2 Grid */}
            <div className="hidden lg:grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {partnershipExpectations.map((expectation, index) => (
                <ScrollAnimationWrapper key={index} direction="top" delay={200 + (index * 100)}>
                  <Card className="text-center border-l-4 border-l-primary hover:shadow-xl hover:scale-105 transition-all duration-300 group rounded-xl overflow-hidden bg-gradient-to-br from-white to-red-50/30 hover:from-red-50/50 hover:to-white h-full flex flex-col">
                    <CardContent className="p-6 flex-1 flex flex-col">
                      <div className="mx-auto w-12 h-12 bg-gradient-to-br from-primary/20 to-red-400/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-red-200/50">
                        <expectation.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h4 className="text-lg font-semibold mb-3">{expectation.title}</h4>
                      <p className="text-sm text-muted-foreground">{expectation.description}</p>
                    </CardContent>
                  </Card>
                </ScrollAnimationWrapper>
              ))}
            </div>

            {/* Tablet and Mobile Layout - Horizontal Scroll with Pagination */}
            <div className="lg:hidden">
              {/* Pagination Dots */}
              <ScrollAnimationWrapper direction="top" delay={200}>
                <div className="flex justify-center items-center mb-6 space-x-2">
                  {partnershipExpectations.map((_, index) => (
                    <button 
                      key={index} 
                      onClick={() => setCurrentExpectationsPage(index)} 
                      className={`h-3 rounded-full transition-all duration-300 ${
                        index === currentExpectationsPage 
                          ? 'bg-primary w-8 shadow-lg shadow-primary/30' 
                          : 'bg-primary/40 hover:bg-primary/60 w-3'
                      }`} 
                      aria-label={`Go to page ${index + 1}`} 
                    />
                  ))}
                </div>
              </ScrollAnimationWrapper>

              {/* Navigation Container */}
              <ScrollAnimationWrapper direction="bottom" delay={300}>
                <div 
                  className={`relative touch-pan-x transition-all duration-300 ${isTouchActive ? 'shadow-2xl shadow-primary/20' : ''} ${
                    isAnimating 
                      ? swipeDirection === 'left' 
                        ? 'animate-slide-out-left' 
                        : 'animate-slide-out-right'
                      : ''
                  }`}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={() => handleTouchEnd('expectations')}
                  onTouchCancel={handleTouchCancel}
                  style={{ touchAction: 'auto' }}
                >
                  {/* Previous Arrow - Overlaid on left */}
                  <button 
                    onClick={goToPreviousExpectationsPage} 
                    className="absolute left-1 top-1/2 -translate-y-1/2 z-20 text-foreground/60 hover:text-foreground text-3xl font-bold transition-all duration-200 hover:scale-110" 
                    aria-label="Previous expectation"
                  >
                    ‹
                  </button>

                  {/* Next Arrow - Overlaid on right */}
                  <button 
                    onClick={goToNextExpectationsPage} 
                    className="absolute right-1 top-1/2 -translate-y-1/2 z-20 text-foreground/60 hover:text-foreground text-3xl font-bold transition-all duration-200 hover:scale-110" 
                    aria-label="Next expectation"
                  >
                    ›
                  </button>

                  {/* Single Card Display - Full width content */}
                  <div className="px-6">
                    {partnershipExpectations[currentExpectationsPage] && (
                      <div className="flex justify-center">
                        <div className="w-full max-w-sm">
                          <ScrollAnimationWrapper direction="top" delay={200 + (currentExpectationsPage * 100)}>
                            <Card className="text-center border-l-4 border-l-primary hover:shadow-xl hover:scale-105 transition-all duration-300 group rounded-xl overflow-hidden bg-gradient-to-br from-white to-red-50/30 hover:from-red-50/50 hover:to-white h-full">
                              <CardContent className="p-6">
                                <div className="mx-auto w-12 h-12 bg-gradient-to-br from-primary/20 to-red-400/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-red-200/50">
                                  {React.createElement(partnershipExpectations[currentExpectationsPage].icon, {
                                    className: "w-6 h-6 text-primary"
                                  })}
                                </div>
                                <h4 className="text-lg font-semibold mb-3">
                                  {partnershipExpectations[currentExpectationsPage].title}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {partnershipExpectations[currentExpectationsPage].description}
                                </p>
                              </CardContent>
                            </Card>
                          </ScrollAnimationWrapper>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </ScrollAnimationWrapper>
            </div>
          </div>
        </ScrollAnimationWrapper>

        {/* Structure & Flow of Funds */}
        <ScrollAnimationWrapper direction="top" delay={400}>
          <div className="mb-8 md:mb-16">
            <div className="text-center mb-8 md:mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Partnership Structure & Flow of Funds</h3>
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
                Understanding the layered ownership structure and how funds flow through the Limited Partnership.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              {/* Ownership Structure */}
              <ScrollAnimationWrapper direction="left" delay={500}>
                <Card className="border-2 border-blue-200 h-full flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Building className="w-5 h-5 text-blue-600" />
                      Ownership Structure
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 flex-1">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-blue-600">1</span>
                        </div>
                        <div>
                          <div className="font-medium">Anhart Community Housing Society</div>
                          <div className="text-sm text-muted-foreground">Non-profit parent organization</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-blue-600">2</span>
                        </div>
                        <div>
                          <div className="font-medium">Anhart Ventures</div>
                          <div className="text-sm text-muted-foreground">Holds LP Units</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-blue-600">3</span>
                        </div>
                        <div>
                          <div className="font-medium">General Partner (Anhart Investments Ltd.)</div>
                          <div className="text-sm text-muted-foreground">Manages the Limited Partnership</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-blue-600">4</span>
                        </div>
                        <div>
                          <div className="font-medium">Anhart Affordable Homes Corporation</div>
                          <div className="text-sm text-muted-foreground">National Operator</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-blue-600">5</span>
                        </div>
                        <div>
                          <div className="font-medium">Provincial/Territorial Affiliates</div>
                          <div className="text-sm text-muted-foreground">Local operating entities in all provinces and territories</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollAnimationWrapper>

              {/* Fund Flow Process */}
              <ScrollAnimationWrapper direction="right" delay={600}>
                <Card className="border-2 border-green-200 h-full flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      Fund Flow Process
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 flex-1">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-medium">Distributable Cash Priority</div>
                          <div className="text-sm text-muted-foreground">Reinvestment in projects may take priority over partner distributions depending on project needs</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-medium">Reserve Requirements</div>
                          <div className="text-sm text-muted-foreground">Obligations to set aside reserves for project stability</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-medium">Semi-Annual Distributions</div>
                          <div className="text-sm text-muted-foreground">2% preferred return paid when distributable cash is available</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-medium">Net Sale Proceeds</div>
                          <div className="text-sm text-muted-foreground">Additional distributions from project land/asset sales</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollAnimationWrapper>
            </div>
          </div>
        </ScrollAnimationWrapper>

        {/* Three-Stage Growth Strategy */}
        <ScrollAnimationWrapper direction="top" delay={500}>
          <div className="mb-8 md:mb-16">
            <div className="text-center mb-8 md:mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Three-Stage National Expansion (2004-2028)</h3>
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
                The Limited Partnership is part of Anhart's strategic three-stage growth plan to expand affordable housing across Canada.
              </p>
            </div>
            
            {/* Desktop Layout - 3 Column Grid */}
            <div className="hidden lg:grid grid-cols-1 lg:grid-cols-3 gap-8">
              {expansionStages.map((stage, index) => (
                <ScrollAnimationWrapper key={index} direction="left" delay={600 + (index * 100)}>
                  <Card className="text-center border-2 border-primary/20 hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                    <CardHeader>
                      <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <span className="text-2xl font-bold text-primary">{index + 1}</span>
                      </div>
                      <CardTitle className="text-xl">{stage.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-muted-foreground mb-4">
                        {stage.description}
                      </p>
                      <div className="text-sm font-medium text-primary">Key Milestones</div>
                      <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                        {stage.milestones.map((milestone, idx) => (
                          <li key={idx}>• {milestone}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </ScrollAnimationWrapper>
              ))}
            </div>

            {/* Tablet and Mobile Layout - Carousel */}
            <div className="lg:hidden">
              {/* Pagination Dots */}
              <ScrollAnimationWrapper direction="top" delay={200}>
                <div className="flex justify-center items-center mb-6 space-x-2">
                  {expansionStages.map((_, index) => (
                    <button 
                      key={index} 
                      onClick={() => setCurrentExpansionPage(index)} 
                      className={`h-3 rounded-full transition-all duration-300 ${
                        index === currentExpansionPage 
                          ? 'bg-primary w-8 shadow-lg shadow-primary/30' 
                          : 'bg-primary/40 hover:bg-primary/60 w-3'
                      }`} 
                      aria-label={`Go to stage ${index + 1}`} 
                    />
                  ))}
                </div>
              </ScrollAnimationWrapper>

              {/* Navigation Container */}
              <ScrollAnimationWrapper direction="bottom" delay={300}>
                <div 
                  className={`relative touch-pan-x transition-all duration-300 ${isTouchActive ? 'shadow-2xl shadow-primary/20' : ''} ${
                    isAnimating 
                      ? swipeDirection === 'left' 
                        ? 'animate-slide-out-left' 
                        : 'animate-slide-out-right'
                      : ''
                  }`}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={() => handleTouchEnd('expansion')}
                  onTouchCancel={handleTouchCancel}
                  style={{ touchAction: 'auto' }}
                >
                  {/* Previous Arrow */}
                  <button 
                    onClick={goToPreviousExpansionPage} 
                    className="absolute left-1 top-1/2 -translate-y-1/2 z-20 text-foreground/60 hover:text-foreground text-3xl font-bold transition-all duration-200 hover:scale-110" 
                    aria-label="Previous stage"
                  >
                    ‹
                  </button>

                  {/* Next Arrow */}
                  <button 
                    onClick={goToNextExpansionPage} 
                    className="absolute right-1 top-1/2 -translate-y-1/2 z-20 text-foreground/60 hover:text-foreground text-3xl font-bold transition-all duration-200 hover:scale-110" 
                    aria-label="Next stage"
                  >
                    ›
                  </button>

                  {/* Single Stage Display */}
                  <div className="px-6">
                    {expansionStages[currentExpansionPage] && (
                      <div className="flex justify-center">
                        <div className="w-full max-w-sm">
                          <ScrollAnimationWrapper direction="top" delay={200 + (currentExpansionPage * 100)}>
                            <Card className="text-center border-2 border-primary/20 hover:shadow-lg transition-shadow duration-300">
                              <CardHeader>
                                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                  <span className="text-2xl font-bold text-primary">{currentExpansionPage + 1}</span>
                                </div>
                                <CardTitle className="text-xl">{expansionStages[currentExpansionPage].title}</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="text-muted-foreground mb-4">
                                  {expansionStages[currentExpansionPage].description}
                                </p>
                                <div className="text-sm font-medium text-primary">Key Milestones</div>
                                <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                                  {expansionStages[currentExpansionPage].milestones.map((milestone, idx) => (
                                    <li key={idx}>• {milestone}</li>
                                  ))}
                                </ul>
                              </CardContent>
                            </Card>
                          </ScrollAnimationWrapper>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </ScrollAnimationWrapper>
            </div>
          </div>
        </ScrollAnimationWrapper>

        {/* Key Investment Information */}
        <ScrollAnimationWrapper direction="top" delay={600}>
          <div className="mb-8 md:mb-16">
            <div className="text-center mb-8 md:mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Key Investment Information</h3>
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
                Essential details for accredited investors considering the Limited Partnership.
              </p>
            </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Investment Terms */}
            <ScrollAnimationWrapper direction="left" delay={500}>
              <Card className="border-2 border-primary/20 h-full flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  Investment Terms
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 flex-1">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="text-sm text-muted-foreground">Minimum Investment</div>
                    <div className="font-semibold text-lg">$100,000</div>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="text-sm text-muted-foreground">Price Per Unit</div>
                    <div className="font-semibold text-lg">$1.00 CAD</div>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="text-sm text-muted-foreground">Preferred Return</div>
                    <div className="font-semibold text-lg">2% Annually</div>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="text-sm text-muted-foreground">Redemption Rights</div>
                    <div className="font-semibold text-lg">After 3 Years</div>
                    <div className="text-xs font-medium italic text-muted-foreground mt-1">Subject to GP approval and partnership conditions</div>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="text-sm text-muted-foreground mb-2">Partnership Term</div>
                  <div className="font-semibold">50 Years</div>
                </div>
                <div className="pt-4 border-t">
                  <div className="text-sm text-muted-foreground mb-2">Important Terms & Conditions</div>
                  <div className="space-y-2 text-sm">
                    <div><strong>Transferability:</strong> Units are non-transferable except in very limited circumstances as defined in the Limited Partnership Agreement.</div>
                    <div><strong>Redemption Rights:</strong> Available after 3 years, subject to conditions and limits including minimum hold periods and General Partner approval.</div>
                    <div><strong>Accredited Investors:</strong> Only available to investors who meet Canadian securities law requirements for accredited investor status.</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            </ScrollAnimationWrapper>

            {/* Why Choose Anhart LP */}
            <ScrollAnimationWrapper direction="right" delay={600}>
              <Card className="border-2 border-green-200 h-full flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Heart className="w-5 h-5 text-green-600" />
                  Why Choose Anhart LP
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 flex-1">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Non-Profit Owned</div>
                      <div className="text-sm text-muted-foreground">Unique structure allows focus on mission over profit maximization</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Proven Track Record</div>
                      <div className="text-sm text-muted-foreground">Successfully managed $6M in impact loans before 2019</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Local Impact</div>
                      <div className="text-sm text-muted-foreground">Invest in housing projects that benefit your own community</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Transparent Reporting</div>
                      <div className="text-sm text-muted-foreground">Regular updates on both financial and social impact metrics</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            </ScrollAnimationWrapper>
          </div>
        </div>
        </ScrollAnimationWrapper>



        {/* Investment Strategy Selector */}
        <section id="investment-strategy" className="bg-stone-50 rounded-3xl border border-stone-100 shadow-xl px-6 md:px-10 lg:px-14 py-12 md:py-16 mb-12 md:mb-16 font-roboto text-slate-800">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 md:mb-10">
              <p className="text-sm uppercase tracking-[0.22em] text-slate-600 font-semibold">Investment Strategy Selector</p>
              <h3 className="text-3xl md:text-4xl font-bold text-[#1c1917] mt-3">Direct deal investments that align with your goals and risk appetite.</h3>
              <p className="text-slate-700 mt-3 max-w-3xl">Choose a strategy to instantly preview a representative portfolio example with key metrics.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 items-start">
              {/* Left: Strategy list */}
              <div className="lg:col-span-2 space-y-3">
                <div className="grid grid-cols-4 text-xs sm:text-sm font-semibold text-slate-500 px-3">
                  <span>Strategy</span>
                  <span className="text-center">Risk Profile</span>
                  <span className="text-center">Typical Return</span>
                  <span className="text-center">Typical Term</span>
                </div>
                <div className="space-y-3">
                  {strategyData.map((strategy) => {
                    const isActive = selectedStrategy.name === strategy.name;
                    return (
                      <button
                        key={strategy.name}
                        onClick={() => {
                          setIsStrategyCardVisible(false);
                          setSelectedStrategy(strategy);
                          setTimeout(() => setIsStrategyCardVisible(true), 20);
                        }}
                        className={`w-full transition-all duration-200 border ${
                          isActive ? 'bg-white rounded-full shadow-md border-slate-200' : 'border-transparent'
                        }`}
                      >
                  <div className="grid grid-cols-4 items-center gap-2 px-4 py-3 sm:py-4">
                          <div className="flex items-center gap-3">
                            <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${strategy.pillClass}`}>
                              {strategy.name}
                            </span>
                          </div>
                          <div className="text-center text-[#2f4c2d] text-sm">{strategy.risk}</div>
                          <div className="text-center text-[#2f4c2d] text-sm">{strategy.return}</div>
                          <div className="text-center text-[#2f4c2d] text-sm">{strategy.term}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right: Portfolio card */}
              <div className="lg:col-span-1 w-full">
                <div
                  className={`bg-white border border-stone-200 rounded-2xl shadow-lg overflow-hidden transition-opacity duration-300 ${
                    isStrategyCardVisible ? 'opacity-100' : 'opacity-0'
                  }`}
                  key={selectedStrategy.name}
                >
                  <div className="sm:flex">
                    <div className="sm:w-1/2 h-56 sm:h-auto bg-stone-100 overflow-hidden">
                      <img
                        src={selectedStrategy.image || fallbackStrategyImage}
                        alt={selectedStrategy.project}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (target.src !== fallbackStrategyImage) {
                            target.src = fallbackStrategyImage;
                          }
                        }}
                      />
                    </div>
                    <div className="sm:w-1/2 p-6 space-y-4 text-[#2f4c2d]">
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-[#2f4c2d]/70 font-semibold">Portfolio</p>
                        <h4 className="text-2xl font-bold mt-1 leading-tight">{selectedStrategy.project}</h4>
                      </div>
                      <div className="space-y-3 text-sm">
                        <div className="border-b border-stone-200 pb-2">
                          <p className="text-xs uppercase tracking-[0.12em] text-[#2f4c2d]/80">Total Equity</p>
                          <p className="text-lg font-bold leading-tight">{selectedStrategy.equity}</p>
                        </div>
                        <div className="border-b border-stone-200 pb-2">
                          <p className="text-xs uppercase tracking-[0.12em] text-[#2f4c2d]/80">IRR</p>
                          <p className="text-lg font-bold leading-tight">{selectedStrategy.irr}</p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-[0.12em] text-[#2f4c2d]/80">Minimum Investment</p>
                          <p className="text-lg font-bold leading-tight">{selectedStrategy.minInvest}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Ways to Contribute */}
        <ScrollAnimationWrapper direction="top" delay={700}>
          <div className="mb-8 md:mb-16">
            <div className="text-center mb-8 md:mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Additional Ways to Support Our Mission</h3>
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
                Beyond the Limited Partnership, there are several other ways to contribute to affordable housing development across Canada.
              </p>
            </div>
            
            {/* Desktop Layout - 3 Column Grid */}
            <div className="hidden lg:grid grid-cols-1 lg:grid-cols-3 gap-8">
              {supportMethods.map((method, index) => (
                <ScrollAnimationWrapper key={index} direction="left" delay={800 + (index * 100)}>
                  <Card className="text-center border-2 border-muted-foreground/20 hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                    <CardHeader>
                      <div className="mx-auto w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mb-4">
                        <method.icon className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <CardTitle className="text-xl">{method.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-muted-foreground mb-4">
                        {method.description}
                      </p>
                      <div className="text-sm font-medium text-muted-foreground">Benefits</div>
                      <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                        {method.benefits.map((benefit, idx) => (
                          <li key={idx}>• {benefit}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </ScrollAnimationWrapper>
              ))}
            </div>

            {/* Tablet and Mobile Layout - Carousel */}
            <div className="lg:hidden">
              {/* Pagination Dots */}
              <ScrollAnimationWrapper direction="top" delay={200}>
                <div className="flex justify-center items-center mb-6 space-x-2">
                  {supportMethods.map((_, index) => (
                    <button 
                      key={index} 
                      onClick={() => setCurrentSupportPage(index)} 
                      className={`h-3 rounded-full transition-all duration-300 ${
                        index === currentSupportPage 
                          ? 'bg-primary w-8 shadow-lg shadow-primary/30' 
                          : 'bg-primary/40 hover:bg-primary/60 w-3'
                      }`} 
                      aria-label={`Go to method ${index + 1}`} 
                    />
                  ))}
                </div>
              </ScrollAnimationWrapper>

              {/* Navigation Container */}
              <ScrollAnimationWrapper direction="bottom" delay={300}>
                <div 
                  className={`relative touch-pan-x transition-all duration-300 ${isTouchActive ? 'shadow-2xl shadow-primary/20' : ''} ${
                    isAnimating 
                      ? swipeDirection === 'left' 
                        ? 'animate-slide-out-left' 
                        : 'animate-slide-out-right'
                      : ''
                  }`}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={() => handleTouchEnd('support')}
                  onTouchCancel={handleTouchCancel}
                  style={{ touchAction: 'auto' }}
                >
                  {/* Previous Arrow */}
                  <button 
                    onClick={goToPreviousSupportPage} 
                    className="absolute left-1 top-1/2 -translate-y-1/2 z-20 text-foreground/60 hover:text-foreground text-3xl font-bold transition-all duration-200 hover:scale-110" 
                    aria-label="Previous method"
                  >
                    ‹
                  </button>

                  {/* Next Arrow */}
                  <button 
                    onClick={goToNextSupportPage} 
                    className="absolute right-1 top-1/2 -translate-y-1/2 z-20 text-foreground/60 hover:text-foreground text-3xl font-bold transition-all duration-200 hover:scale-110" 
                    aria-label="Next method"
                  >
                    ›
                  </button>

                  {/* Single Method Display */}
                  <div className="px-6">
                    {supportMethods[currentSupportPage] && (
                      <div className="flex justify-center">
                        <div className="w-full max-w-sm">
                          <ScrollAnimationWrapper direction="top" delay={200 + (currentSupportPage * 100)}>
                            <Card className="text-center border-2 border-muted-foreground/20 hover:shadow-lg transition-shadow duration-300">
                              <CardHeader>
                                <div className="mx-auto w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mb-4">
                                  {React.createElement(supportMethods[currentSupportPage].icon, {
                                    className: "w-8 h-8 text-muted-foreground"
                                  })}
                                </div>
                                <CardTitle className="text-xl">{supportMethods[currentSupportPage].title}</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="text-muted-foreground mb-4">
                                  {supportMethods[currentSupportPage].description}
                                </p>
                                <div className="text-sm font-medium text-muted-foreground">Benefits</div>
                                <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                                  {supportMethods[currentSupportPage].benefits.map((benefit, idx) => (
                                    <li key={idx}>• {benefit}</li>
                                  ))}
                                </ul>
                              </CardContent>
                            </Card>
                          </ScrollAnimationWrapper>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </ScrollAnimationWrapper>
            </div>
          </div>
        </ScrollAnimationWrapper>

        {/* Disclaimer */}
        <div className="mb-8 md:mb-16">
          <Card className="border-amber-200 bg-amber-50/50">
            <CardContent className="p-4 md:p-6">
              {/* Mobile: Collapsible Header */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsDisclaimerExpanded(!isDisclaimerExpanded)}
                  className="flex items-center justify-between w-full text-left"
                  aria-expanded={isDisclaimerExpanded}
                  aria-controls="disclaimer-content"
                >
                  <h4 className="text-lg font-semibold text-amber-800">Forward-Looking Statements & Risk Factors</h4>
                  <ChevronDown 
                    className={`w-5 h-5 text-amber-800 transition-transform duration-200 ${
                      isDisclaimerExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                {/* Collapsible Content */}
                <div 
                  id="disclaimer-content"
                  className={`overflow-hidden transition-all duration-300 ${
                    isDisclaimerExpanded ? 'max-h-[2000px] opacity-100 mt-4' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="text-sm text-amber-700 space-y-3">
                    <p>
                      The information in this document is for informational purposes only and isn't an offer or recommendation to buy securities from Anhart. 
                      It shouldn't be relied on for making investment decisions and isn't a substitute for professional advice. 
                      No securities commission has approved the information in this document.
                    </p>
                    <p>
                      This document contains forward-looking statements about Anhart's proposed strategies, plans, and objectives. 
                      These statements are subject to risks and uncertainties that could cause actual results to differ materially.
                    </p>
                    <div>
                      <strong>Important Risk Factors:</strong> The Limited Partnership involves significant risks including but not limited to:
                      <ul className="mt-2 space-y-1 text-sm">
                        <li>• No guarantee of returns</li>
                        <li>• Potential loss of capital</li>
                        <li>• Limited transferability of units</li>
                        <li>• Dependence on project performance</li>
                        <li>• Regulatory changes and market conditions</li>
                        <li>• Obligation to set aside reserves</li>
                        <li>• Returns are not assured and depend on the availability of distributable cash after expenses, debts, liabilities, and reserves</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop: Always Expanded */}
              <div className="hidden md:block">
                <h4 className="text-lg font-semibold text-amber-800 mb-4">Forward-Looking Statements & Risk Factors</h4>
                <div className="text-sm text-amber-700 space-y-3">
                  <p>
                    The information in this document is for informational purposes only and isn't an offer or recommendation to buy securities from Anhart. 
                    It shouldn't be relied on for making investment decisions and isn't a substitute for professional advice. 
                    No securities commission has approved the information in this document.
                  </p>
                  <p>
                    This document contains forward-looking statements about Anhart's proposed strategies, plans, and objectives. 
                    These statements are subject to risks and uncertainties that could cause actual results to differ materially.
                  </p>
                  <div>
                    <strong>Important Risk Factors:</strong> The Limited Partnership involves significant risks including but not limited to:
                    <ul className="mt-2 space-y-1 text-sm">
                      <li>• No guarantee of returns</li>
                      <li>• Potential loss of capital</li>
                      <li>• Limited transferability of units</li>
                      <li>• Dependence on project performance</li>
                      <li>• Regulatory changes and market conditions</li>
                      <li>• Obligation to set aside reserves</li>
                      <li>• Returns are not assured and depend on the availability of distributable cash after expenses, debts, liabilities, and reserves</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <ScrollAnimationWrapper direction="left" delay={700}>
          <div className="mx-auto mt-8 md:mt-16 grid max-w-6xl grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2 lg:items-stretch">
            {/* Investment Inquiry Form */}
            <Card id="investment-inquiry" className="shadow-lg flex flex-col h-full">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl md:text-2xl">Investment Inquiry</CardTitle>
              <p className="text-sm md:text-base text-muted-foreground">
                Ready to learn more? Contact Keith Gordon to discuss your investment and request key documents.
              </p>
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-6 flex-1 flex flex-col">
              <form className="space-y-4 md:space-y-6 flex-1 flex flex-col" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">
                      Full Name <span className="text-destructive">*</span>
                    </Label>
                    <Input id="name" name="name" placeholder="Your full name" required />
                  </div>
                  <div>
                    <Label htmlFor="email">
                      Email <span className="text-destructive">*</span>
                    </Label>
                    <Input id="email" name="email" type="email" placeholder="your.email@example.com" required />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">
                      Phone Number <span className="text-destructive">*</span>
                    </Label>
                    <Input id="phone" name="phone" type="tel" placeholder="Your phone number" required />
                  </div>
                  <div>
                    <Label htmlFor="organization">Organization (Optional)</Label>
                    <Input id="organization" name="organization" placeholder="Your organization" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="investmentAmount">Potential Investment Amount</Label>
                  <Input id="investmentAmount" name="investmentAmount" placeholder="e.g., $100,000 - $500,000" />
                </div>
                
                <div>
                  <Label htmlFor="message">
                    Investment Questions & Document Requests <span className="text-destructive">*</span>
                  </Label>
                  <Textarea id="message" name="message" placeholder="Please specify which documents you'd like to request and any questions about the Limited Partnership investment opportunity." className="min-h-[120px]" required />
                </div>

                {/* Honeypot field - hidden from users but visible to bots */}
                <div style={{ display: 'none' }}>
                  <Label htmlFor="website">Website (leave blank)</Label>
                  <Input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                </div>
                
                {/* Cloudflare Turnstile Widget */}
                <div className="flex justify-center" key={turnstileKey}>
                  <Turnstile
                    siteKey="0x4AAAAAACHSP48uvsbyUZG1"
                    onSuccess={turnstileHandlers.onSuccess}
                    onError={turnstileHandlers.onError}
                    onExpire={turnstileHandlers.onExpire}
                    theme="auto"
                    size="invisible"
                  />
                </div>
                
                <Button type="submit" className="w-full mt-auto" size="lg" disabled={isSubmitting || !turnstileToken}>
                  {isSubmitting ? "Sending Inquiry..." : "Send Investment Inquiry"}
                </Button>
              </form>
            </CardContent>
          </Card>
        
          {/* Contact Information & Process */}
          <ScrollAnimationWrapper direction="right" delay={800}>
            <Card className="shadow-lg flex flex-col h-full">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl md:text-2xl">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col space-y-6 md:space-y-8">
                {/* Contact Card */}
                <Card className="hover:shadow-md transition-shadow duration-300">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white flex-shrink-0">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Keith Gordon</h4>
                        <p className="text-muted-foreground">Co-founder, Anhart Investments</p>
                        <p className="text-primary font-semibold">keith.gordon@anhart.ca</p>
                      </div>
                    </div>
                    <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-foreground" />
                        <a
                          href={`tel:${CONTACT_INFO.phone.replace(/[^\d]/g, '')}`}
                          className="font-medium text-foreground hover:text-primary transition-colors"
                        >
                          {CONTACT_INFO.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-foreground" />
                        <a
                          href={`mailto:${CONTACT_INFO.email}`}
                          className="font-medium text-foreground hover:text-primary transition-colors"
                        >
                          {CONTACT_INFO.email}
                        </a>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 mt-0.5 text-foreground" />
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(AddressUtils.getGoogleMapsAddress())}`}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium text-foreground hover:text-primary transition-colors"
                        >
                          {AddressUtils.getOneLineAddress()}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Investment Process - Hidden on Mobile */}
                <div className="hidden md:block flex-1 flex flex-col">
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground mb-4 md:mb-6">
                    Investment Process
                  </h3>
                  <Card className="hover:shadow-md transition-shadow duration-300 flex-1">
                    <CardContent className="p-4 md:p-6">
                      <div className="space-y-6">
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-sm font-bold text-white">1</span>
                          </div>
                          <div>
                            <div className="font-semibold text-foreground mb-1">Submit Inquiry</div>
                            <div className="text-sm text-muted-foreground">Complete the form with your investment details and questions</div>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-sm font-bold text-white">2</span>
                          </div>
                          <div>
                            <div className="font-semibold text-foreground mb-1">Initial Consultation</div>
                            <div className="text-sm text-muted-foreground">Keith will contact you within 48 hours to schedule a call</div>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-sm font-bold text-white">3</span>
                          </div>
                          <div>
                            <div className="font-semibold text-foreground mb-1">Document Review</div>
                            <div className="text-sm text-muted-foreground">Receive and review LPA, Term Sheet, and Business Plan</div>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-sm font-bold text-white">4</span>
                          </div>
                          <div>
                            <div className="font-semibold text-foreground mb-1">Investment Decision</div>
                            <div className="text-sm text-muted-foreground">Complete subscription agreement if you decide to invest</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
            </ScrollAnimationWrapper>
          </div>
        </ScrollAnimationWrapper>
      </div>
    </section>;
};