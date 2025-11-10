import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { organizationStructuredData } from "@/lib/structuredData";
import { StaffContactModal } from "@/components/StaffContactModal";
import { HeroBanner } from "@/components/shared/HeroBanner";
import { InfoCard } from "@/components/shared/InfoCard";
import { HorizontalScrollCarousel } from "@/components/shared/HorizontalScrollCarousel";
import { StaffMember, ValueItem } from "@/types/common";
import { useState, useRef } from "react";
import { ScrollAnimationWrapper } from "@/components/animations/ScrollAnimationWrapper";
// Data imports
import { boardMembers, staff } from "@/data/about_staff";
import { values } from "@/data/about_values";
// Hero image now uses image registry system
import ourVisionImg from "@/assets/our-vision.jpg";
import ourApproachImg from "@/assets/OurVision.jpeg";

/**
 * About Page Component
 *
 * This component displays information about Anhart Affordable Housing,
 * including the company's mission, values, team members, and organizational
 * structure. Features interactive staff member cards with modal details.
 */
const About = () => {
  // State management for staff contact modal
  const [selectedStaffMember, setSelectedStaffMember] = useState<StaffMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Carousel state for both Board and Staff
  const [currentBoardIndex, setCurrentBoardIndex] = useState(0);
  const [currentStaffIndex, setCurrentStaffIndex] = useState(0);

  // Touch handling state
  const [touchStart, setTouchStart] = useState({
    x: 0,
    y: 0
  });
  const [touchEnd, setTouchEnd] = useState({
    x: 0,
    y: 0
  });
  const [touchTimeout, setTouchTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isTouchActive, setIsTouchActive] = useState(false);
  
  // Swipe animation state
  const [isAnimating, setIsAnimating] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  
  // Horizontal gesture locking state
  const [isHorizontalGesture, setIsHorizontalGesture] = useState(false);
  const [gestureStartY, setGestureStartY] = useState(0);

  /**
   * Handles staff member card click to open contact modal
   * @param member - The selected staff member data
   */
  const handleStaffClick = (member: StaffMember) => {
    setSelectedStaffMember(member);
    setIsModalOpen(true);
  };

  /**
   * Closes the staff contact modal and clears selected member
   */
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStaffMember(null);
  };

  // Board carousel navigation
  const goToPreviousBoard = () => {
    setCurrentBoardIndex(prev => prev > 0 ? prev - 1 : boardMembers.length - 1);
  };
  const goToNextBoard = () => {
    setCurrentBoardIndex(prev => prev < boardMembers.length - 1 ? prev + 1 : 0);
  };

  // Staff carousel navigation
  const goToPreviousStaff = () => {
    setCurrentStaffIndex(prev => prev > 0 ? prev - 1 : staff.length - 1);
  };
  const goToNextStaff = () => {
    setCurrentStaffIndex(prev => prev < staff.length - 1 ? prev + 1 : 0);
  };

  // Touch handling functions
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.targetTouches[0];
    setTouchStart({
      x: touch.clientX,
      y: touch.clientY
    });
    setTouchEnd({
      x: 0,
      y: 0
    });
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
      setTouchStart({
        x: 0,
        y: 0
      });
      setTouchEnd({
        x: 0,
        y: 0
      });
      setIsTouchActive(false);
    }, 1000); // Reset after 1 second of no movement

    setTouchTimeout(timeout);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.targetTouches[0];
    setTouchEnd({
      x: touch.clientX,
      y: touch.clientY
    });

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
  const handleTouchEnd = (type: "board" | "staff") => {
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
        if (type === "board") goToNextBoard();
        if (type === "staff") goToNextStaff();
      }
      if (isRightSwipe) {
        if (type === "board") goToPreviousBoard();
        if (type === "staff") goToPreviousStaff();
      }
    }

    // Always reset touch state after touch end to allow vertical scrolling
    setTouchStart({
      x: 0,
      y: 0
    });
    setTouchEnd({
      x: 0,
      y: 0
    });
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
    setTouchStart({
      x: 0,
      y: 0
    });
    setTouchEnd({
      x: 0,
      y: 0
    });
    setIsTouchActive(false);
  };
  return <div className="min-h-screen bg-background">
      <SEO title="About Us - Our Mission & Team" description="Learn about Anhart Affordable Housing's mission to create inclusive communities through innovative housing solutions. Meet our experienced team of housing professionals and community advocates." keywords="about anhart, affordable housing team, housing professionals, community development, mission, values, leadership" url="/about" structuredData={organizationStructuredData} />
      <Header />
      <main>
        {/* Hero Banner - Company story and mission introduction */}
        <HeroBanner backgroundImage="about-hero" title="Our Story" contentPosition="right" />

        {/* Mission Section */}
        <section className="py-12 md:py-24 bg-gradient-to-b from-background to-muted/20">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <ScrollAnimationWrapper direction="top" delay={0}>
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold tracking-tight text-foreground mb-6">Our Journey</h2>
                <p className="text-lg leading-8 text-muted-foreground">
                  Anhart began with a simple idea: build practical, affordable homes that serve communities first. From
                  revitalizing Vancouver’s Jubilee Rooms and the Dodson Hotel to adding micro-suites and mixed-income
                  projects, we’ve grown from local work to partnerships across Canada. We blend business discipline with
                  community values to create community-based housing—coast to coast to coast.
                </p>
              </div>
            </ScrollAnimationWrapper>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 max-w-5xl mx-auto">
              <ScrollAnimationWrapper direction="left" delay={200}>
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-primary/10 hover:border-primary/30">
                  <div className="aspect-video relative overflow-hidden">
                    <img src={ourVisionImg} alt="Our vision of thriving affordable housing communities" className="w-full h-full object-cover" loading="lazy" decoding="async" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg md:text-2xl">Our Vision</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm md:text-lg leading-relaxed">
                      We envision a future where every Canadian community thrives — resilient, and inclusive. 
                      Guided by thinking systems and innovation, we see cities not just as collections of buildings, 
                      but as living ecosystems shaped by people and technology. Our vision is to empower communities 
                      with housing that adapts to change, supports human potential, and creates lasting social value. 
                      We aim to build equitable urban environments that uplift all residents.</p>
                  </CardContent>
                </Card>
              </ScrollAnimationWrapper>

              <ScrollAnimationWrapper direction="right" delay={200}>
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-primary/10 hover:border-primary/30">
                  <div className="aspect-video relative overflow-hidden">
                    <img src={ourApproachImg} alt="A modular housing unit being installed by a crane" className="w-full h-full object-cover" loading="lazy" decoding="async" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg md:text-2xl">Our Approach</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm md:text-lg leading-relaxed">
                      We believe affordable housing is built through collaboration. Our approach combines practical
                      tools with local partnerships to reduce costs and maximize impact. Whether through modular
                      construction for speed, conventional builds for scale, or retrofits that breathe new life into
                      existing homes, we work alongside nonprofits, municipalities, and community-driven champions to
                      create housing solutions that are accessible, durable, and community-focused.
                    </p>
                  </CardContent>
                </Card>
              </ScrollAnimationWrapper>
            </div>
          </div>
        </section>

        {/* Values Section - Company principles and core beliefs */}
        <section className="py-12 md:py-24 bg-muted/30">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <ScrollAnimationWrapper direction="top" delay={0}>
                <h2 className="text-3xl font-bold tracking-tight text-foreground mb-6">Our Values</h2>
              </ScrollAnimationWrapper>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => <ScrollAnimationWrapper key={value.title} direction="top" delay={index * 100}>
                  <InfoCard icon={value.icon} title={value.title} description={value.description} className="text-center" />
                </ScrollAnimationWrapper>)}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-12 md:py-24">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <ScrollAnimationWrapper direction="top" delay={0}>
                <h2 className="text-3xl font-bold tracking-tight text-foreground mb-6">Our Team</h2>
              </ScrollAnimationWrapper>
              <ScrollAnimationWrapper direction="top" delay={100}>
                <p className="text-lg leading-8 text-muted-foreground">
                  Meet the dedicated professionals working to advance affordable housing across Canada.
                </p>
              </ScrollAnimationWrapper>
            </div>

            {/* Board Section */}
            <div className="mb-16">
              <h3 className="text-2xl font-semibold text-center text-foreground mb-8">Anhart Directors</h3>

              {/* Desktop Layout - Keith and Crystal in first row, others in second row */}
              <div className="hidden md:block">
                {/* First Row - Keith and Crystal */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 max-w-4xl mx-auto">
                  {boardMembers.slice(0, 2).map(member => <Card key={member.name} className="border-2 border-primary/20 shadow-lg cursor-pointer hover:scale-105 transform transition-transform hover:shadow-xl" onClick={() => handleStaffClick(member)}>
                      <CardContent className="p-6 text-center">
                        <div className="h-28 w-28 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 mx-auto mb-4 flex items-center justify-center">
                          <Users className="h-10 w-10 text-primary" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-1 text-lg">{member.name}</h3>
                        <p className="text-sm text-primary font-medium mb-3">{member.role}</p>
                        <p className="text-xs text-muted-foreground mt-2 opacity-70">Click for contact info</p>
                      </CardContent>
                    </Card>)}
                </div>

                {/* Second Row - Other 3 board members */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                  {boardMembers.slice(2).map(member => <Card key={member.name} className="border-2 border-primary/20 shadow-lg cursor-pointer hover:scale-105 transform transition-transform hover:shadow-xl" onClick={() => handleStaffClick(member)}>
                      <CardContent className="p-6 text-center">
                        <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 mx-auto mb-4 flex items-center justify-center">
                          <Users className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-1 text-lg">{member.name}</h3>
                        <p className="text-sm text-primary font-medium mb-3">{member.role}</p>
                        <p className="text-xs text-muted-foreground mt-2 opacity-70">Click for contact info</p>
                      </CardContent>
                    </Card>)}
                </div>
              </div>

              {/* Mobile Layout - Single Card Carousel */}
              <div className="md:hidden">
                {/* Pagination Dots */}
                <ScrollAnimationWrapper direction="top" delay={200}>
                  <div className="flex justify-center items-center mb-6 space-x-2">
                    {boardMembers.map((_, index) => <button key={index} onClick={() => setCurrentBoardIndex(index)} className={`h-3 rounded-full transition-all duration-300 ${index === currentBoardIndex ? "bg-primary w-8 shadow-lg shadow-primary/30" : "bg-primary/40 hover:bg-primary/60 w-3"}`} aria-label={`Go to board member ${index + 1}`} />)}
                  </div>
                </ScrollAnimationWrapper>

                {/* Navigation Container */}
                <ScrollAnimationWrapper direction="bottom" delay={300}>
                  <div className={`relative transition-all duration-300 ${isTouchActive ? 'shadow-2xl shadow-primary/20' : ''} ${
                    isAnimating 
                      ? swipeDirection === 'left' 
                        ? 'animate-slide-out-left' 
                        : 'animate-slide-out-right'
                      : ''
                  }`} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={() => handleTouchEnd("board")} onTouchCancel={handleTouchCancel}>
                    {/* Previous Arrow */}
                    <button onClick={goToPreviousBoard} className="absolute left-1 top-1/2 -translate-y-1/2 z-20 text-foreground/60 hover:text-foreground text-3xl font-bold transition-all duration-200 hover:scale-110" aria-label="Previous board member">
                      ‹
                    </button>

                    {/* Next Arrow */}
                    <button onClick={goToNextBoard} className="absolute right-1 top-1/2 -translate-y-1/2 z-20 text-foreground/60 hover:text-foreground text-3xl font-bold transition-all duration-200 hover:scale-110" aria-label="Next board member">
                      ›
                    </button>

                    {/* Single Card Display */}
                    <div className="px-6">
                      {boardMembers[currentBoardIndex] && <div className="flex justify-center">
                          <div className="w-full max-w-sm">
                            <ScrollAnimationWrapper direction="top" delay={200 + currentBoardIndex * 100}>
                              <Card className="border-2 border-primary/20 shadow-lg cursor-pointer hover:scale-105 transform transition-all duration-300 hover:shadow-xl" onClick={() => handleStaffClick(boardMembers[currentBoardIndex])}>
                                <CardContent className="p-6 text-center">
                                  <div className="h-28 w-28 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 mx-auto mb-4 flex items-center justify-center">
                                    <Users className="h-10 w-10 text-primary" />
                                  </div>
                                  <h3 className="font-semibold text-foreground mb-1 text-lg">
                                    {boardMembers[currentBoardIndex].name}
                                  </h3>
                                  <p className="text-sm text-primary font-medium mb-3">
                                    {boardMembers[currentBoardIndex].role}
                                  </p>
                                  <p className="text-xs text-muted-foreground mt-2 opacity-70">
                                    Click for contact info
                                  </p>
                                </CardContent>
                              </Card>
                            </ScrollAnimationWrapper>
                          </div>
                        </div>}
                    </div>
                  </div>
                </ScrollAnimationWrapper>
              </div>
            </div>

            {/* Staff Section */}
            <div>
              <h3 className="text-2xl font-semibold text-center text-foreground mb-8">Our Staff</h3>

              {/* Desktop Layout - Sheri and Reyah in first row, others in rows below */}
              <div className="hidden md:block">
                {/* First Row - Sheri and Reyah */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 max-w-4xl mx-auto">
                  {staff.slice(0, 2).map(member => <Card key={member.name} className="hover:shadow-lg hover:shadow-red-200/60 transition-all cursor-pointer hover:scale-105 transform transition-transform border-2 border-red-200/50 shadow-lg shadow-red-100/40" onClick={() => handleStaffClick(member)}>
                      <CardContent className="p-6 text-center">
                        <div className="h-24 w-24 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                          <Users className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-1 text-lg">{member.name}</h3>
                        <p className="text-sm text-primary font-medium mb-3">{member.role}</p>
                        <p className="text-xs text-muted-foreground mt-2 opacity-70">Click for contact info</p>
                      </CardContent>
                    </Card>)}
                </div>

                {/* Remaining Staff - 2 per row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
                  {staff.slice(2).map(member => <Card key={member.name} className="hover:shadow-md transition-shadow cursor-pointer hover:scale-105 transform transition-transform" onClick={() => handleStaffClick(member)}>
                      <CardContent className="p-6 text-center">
                        <div className="h-20 w-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                          <Users className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-1">{member.name}</h3>
                        <p className="text-sm text-primary font-medium mb-3">{member.role}</p>
                        <p className="text-xs text-muted-foreground mt-2 opacity-70">Click for contact info</p>
                      </CardContent>
                    </Card>)}
                </div>
              </div>

              {/* Mobile Layout - Single Card Carousel */}
              <div className="md:hidden">
                {/* Pagination Dots */}
                <ScrollAnimationWrapper direction="top" delay={200}>
                  <div className="flex justify-center items-center mb-6 space-x-2">
                    {staff.map((_, index) => <button key={index} onClick={() => setCurrentStaffIndex(index)} className={`h-3 rounded-full transition-all duration-300 ${index === currentStaffIndex ? "bg-primary w-8 shadow-lg shadow-primary/30" : "bg-primary/40 hover:bg-primary/60 w-3"}`} aria-label={`Go to staff member ${index + 1}`} />)}
                  </div>
                </ScrollAnimationWrapper>

                {/* Navigation Container */}
                <ScrollAnimationWrapper direction="bottom" delay={300}>
                  <div className={`relative transition-all duration-300 ${isTouchActive ? 'shadow-2xl shadow-primary/20' : ''} ${
                    isAnimating 
                      ? swipeDirection === 'left' 
                        ? 'animate-slide-out-left' 
                        : 'animate-slide-out-right'
                      : ''
                  }`} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={() => handleTouchEnd("staff")} onTouchCancel={handleTouchCancel}>
                    {/* Previous Arrow */}
                    <button onClick={goToPreviousStaff} className="absolute left-1 top-1/2 -translate-y-1/2 z-20 text-foreground/60 hover:text-foreground text-3xl font-bold transition-all duration-200 hover:scale-110" aria-label="Previous staff member">
                      ‹
                    </button>

                    {/* Next Arrow */}
                    <button onClick={goToNextStaff} className="absolute right-1 top-1/2 -translate-y-1/2 z-20 text-foreground/60 hover:text-foreground text-3xl font-bold transition-all duration-200 hover:scale-110" aria-label="Next staff member">
                      ›
                    </button>

                    {/* Single Card Display */}
                    <div className="px-6">
                      {staff[currentStaffIndex] && <div className="flex justify-center">
                          <div className="w-full max-w-sm">
                            <ScrollAnimationWrapper direction="top" delay={200 + currentStaffIndex * 100}>
                              <Card className={`hover:shadow-lg transition-all cursor-pointer hover:scale-105 transform transition-all duration-300 h-full ${currentStaffIndex < 2 ? "border-2 border-red-200/50 shadow-lg shadow-red-100/40 hover:shadow-red-200/60" : "hover:shadow-md"}`} onClick={() => handleStaffClick(staff[currentStaffIndex])}>
                                <CardContent className="p-6 text-center">
                                  <div className="h-20 w-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                                    <Users className="h-6 w-6 text-muted-foreground" />
                                  </div>
                                  <h3 className="font-semibold text-foreground mb-1">
                                    {staff[currentStaffIndex].name}
                                  </h3>
                                  <p className="text-sm text-primary font-medium mb-3">
                                    {staff[currentStaffIndex].role}
                                  </p>
                                  <p className="text-sm text-muted-foreground">{staff[currentStaffIndex].bio}</p>
                                  <p className="text-xs text-muted-foreground mt-2 opacity-70">
                                    Click for contact info
                                  </p>
                                </CardContent>
                              </Card>
                            </ScrollAnimationWrapper>
                          </div>
                        </div>}
                    </div>
                  </div>
                </ScrollAnimationWrapper>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Staff Contact Modal */}
      <StaffContactModal isOpen={isModalOpen} onClose={handleCloseModal} staffMember={selectedStaffMember} />
    </div>;
};
export default About;