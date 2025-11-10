'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileText, Users, DollarSign, Building, Shield, Target, Calendar, Mail, CheckCircle, ArrowRight, TrendingUp, Heart, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { useFormSubmission } from "@/hooks/useFormSubmission";
import { ScrollAnimationWrapper } from "@/components/animations/ScrollAnimationWrapper";
import React, { useState } from "react";

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
      console.log("Bot detected via honeypot");
      return; // Silently reject the submission
    }
    
    const name = formData.get('name') as string;
    const success = await submitForm({
      name,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      organization: formData.get('organization') as string,
      investment_amount: formData.get('investmentAmount') as string,
      message: formData.get('message') as string,
      form_type: 'limited_partnership'
    });
    if (success) {
      form.reset();
    }
  };
  return <section id="limited-partnership" className="py-12 md:py-24 bg-gradient-to-br from-muted/20 via-muted/30 to-muted/40 sm:py-[50px] relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"></div>
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        
        {/* Header Section with Enhanced Design */}
        <ScrollAnimationWrapper direction="top" delay={0}>
          <div className="text-center mb-8 md:mb-16">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-primary/30 to-red-400/20 rounded-2xl blur-lg"></div>
              <div className="relative bg-gradient-to-r from-background/95 via-background to-background/95 rounded-2xl p-4 md:p-8 shadow-2xl border border-red-100/50 backdrop-blur-sm">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6">
                  Limited Partnership Investment
                </h2>
                <p className="text-base md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">Learn about Anhart's Limited Partnership (LP) that invests in community-led housing solutions across Canada. Owned by a non-profit organization, our LP offers unique opportunities for both financial and social returns.</p>
              </div>
            </div>
          </div>
        </ScrollAnimationWrapper>

        {/* Partnership Expectations Section - Enhanced */}
        <ScrollAnimationWrapper direction="left" delay={100}>
          <div className="mb-8 md:mb-16">
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

        {/* What Partners Can Expect Section - Enhanced with Green Theme */}
        <ScrollAnimationWrapper direction="right" delay={200}>
          <div className="mb-8 md:mb-16 relative">
            <div className="">
              <div className="text-center mb-8 md:mb-12">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 md:mb-6">What Limited Partners Receive</h3>
                <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
                  As a limited partner, you'll receive both financial returns and the satisfaction of creating meaningful social impact.
                </p>
              </div>
              
              {/* Desktop Layout - 2x2 Grid */}
              <div className="hidden lg:grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {partnerBenefits.map((benefit, index) => (
                  <ScrollAnimationWrapper key={index} direction="top" delay={300 + (index * 100)}>
                    <Card className="text-center border-l-4 border-l-green-500 hover:shadow-xl hover:scale-105 transition-all duration-300 group rounded-xl overflow-hidden bg-gradient-to-br from-white to-green-50/30 hover:from-green-50/50 hover:to-white h-full flex flex-col">
                      <CardContent className="p-6 flex-1 flex flex-col">
                        <div className="mx-auto w-12 h-12 bg-gradient-to-br from-green-500/20 to-green-400/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-green-200/50">
                          <benefit.icon className="w-6 h-6 text-green-500 group-hover:text-green-600 transition-colors duration-300" />
                        </div>
                        <h4 className="text-lg font-semibold mb-3">{benefit.title}</h4>
                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
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
                    {partnerBenefits.map((_, index) => (
                      <button 
                        key={index} 
                        onClick={() => setCurrentBenefitsPage(index)} 
                        className={`h-3 rounded-full transition-all duration-300 ${
                          index === currentBenefitsPage 
                            ? 'bg-green-500 w-8 shadow-lg shadow-green-500/30' 
                            : 'bg-green-500/40 hover:bg-green-500/60 w-3'
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
                    onTouchEnd={() => handleTouchEnd('benefits')}
                    onTouchCancel={handleTouchCancel}
                    style={{ touchAction: 'auto' }}
                  >
                    {/* Previous Arrow - Overlaid on left */}
                    <button 
                      onClick={goToPreviousBenefitsPage} 
                      className="absolute left-1 top-1/2 -translate-y-1/2 z-20 text-foreground/60 hover:text-foreground text-3xl font-bold transition-all duration-200 hover:scale-110" 
                      aria-label="Previous benefit"
                    >
                      ‹
                    </button>

                    {/* Next Arrow - Overlaid on right */}
                    <button 
                      onClick={goToNextBenefitsPage} 
                      className="absolute right-1 top-1/2 -translate-y-1/2 z-20 text-foreground/60 hover:text-foreground text-3xl font-bold transition-all duration-200 hover:scale-110" 
                      aria-label="Next benefit"
                    >
                      ›
                    </button>

                    {/* Single Card Display - Full width content */}
                    <div className="px-6">
                      {partnerBenefits[currentBenefitsPage] && (
                        <div className="flex justify-center">
                          <div className="w-full max-w-sm">
                            <ScrollAnimationWrapper direction="top" delay={300 + (currentBenefitsPage * 100)}>
                              <Card className="text-center border-l-4 border-l-green-500 hover:shadow-xl hover:scale-105 transition-all duration-300 group rounded-xl overflow-hidden bg-gradient-to-br from-white to-green-50/30 hover:from-green-50/50 hover:to-white h-full">
                                <CardContent className="p-6">
                                  <div className="mx-auto w-12 h-12 bg-gradient-to-br from-green-500/20 to-green-400/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-green-200/50">
                                    {React.createElement(partnerBenefits[currentBenefitsPage].icon, {
                                      className: "w-6 h-6 text-green-500"
                                    })}
                                  </div>
                        <h4 className="text-lg font-semibold mb-3">
                          {partnerBenefits[currentBenefitsPage].title}
                        </h4>
                                  <p className="text-sm text-muted-foreground">
                                    {partnerBenefits[currentBenefitsPage].description}
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
          <div className="mx-auto mt-8 md:mt-16 grid max-w-6xl grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
            {/* Investment Inquiry Form */}
            <Card className="shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl md:text-2xl">Investment Inquiry</CardTitle>
              <p className="text-sm md:text-base text-muted-foreground">
                Ready to learn more? Contact Keith Gordon to discuss your investment and request key documents.
              </p>
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-6">
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
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
                
                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? "Sending Inquiry..." : "Send Investment Inquiry"}
                </Button>
              </form>
            </CardContent>
          </Card>
        
          {/* Contact Information & Process */}
          <ScrollAnimationWrapper direction="right" delay={800}>
            <div className="space-y-6 md:space-y-8">
            {/* Contact Information */}
            <div>
              <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground mb-4 md:mb-8">
                Contact Information
              </h3>
              <Card className="hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Keith Gordon</h4>
                      <p className="text-muted-foreground">Co-founder, Anhart Investments</p>
                      <p className="text-primary font-semibold">keith.gordon@anhart.ca</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Investment Process - Hidden on Mobile */}
            <div className="hidden md:block">
              <h3 className="text-2xl font-bold tracking-tight text-foreground mb-8">
                Investment Process
              </h3>
              <Card className="hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-6">
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
            </div>
            </ScrollAnimationWrapper>
          </div>
        </ScrollAnimationWrapper>
      </div>
    </section>;
};