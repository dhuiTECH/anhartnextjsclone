"use client";

import Link from "next/link";
/**
 * =============================================================================
 * HOME PAGE COMPONENT
 * =============================================================================
 *
 * This is the main landing page for Anhart website.
 * It showcases the organization's mission, featured projects, services, and
 * provides contact functionality.
 *
 * Key Features:
 * - Hero section with animated statistics
 * - Featured projects carousel with drag scroll functionality
 * - Services section with responsive layout
 * - Contact form with validation
 * - Modal dialogs for project details and gallery
 *
 * Responsive Design:
 * - Mobile: Single column layouts with touch-friendly interactions
 * - Tablet: Optimized 2+1 layout for services section
 * - Desktop: Full grid layouts with drag scroll functionality
 *
 * @author Anhart Development Team
 * @version 1.0.0
 * @since 2025
 */

// =============================================================================
// REACT & HOOKS IMPORTS
// =============================================================================
import React, { useState, useEffect, useCallback } from "react";

// =============================================================================
// CUSTOM HOOKS
// =============================================================================
import { useCountUp } from "@/hooks/useCountUp";
import { useFormSubmission } from "@/hooks/useFormSubmission";

// =============================================================================
// CONFIGURATION IMPORTS
// =============================================================================
import { CONTACT_INFO, AddressUtils } from "@/config/address";
import { openGoogleMapsSearch } from "@/utils/externalLinks";

// =============================================================================
// COMPONENT IMPORTS
// =============================================================================
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import SEO from "@/components/SEO";
import ProjectModal from "@/components/ProjectModal";
import { ProjectGalleryModal } from "@/components/ProjectGalleryModal";
import { ClientCarousel } from "@/components/ClientCarousel";
import { GlobalPartners } from "@/components/GlobalPartners";
import { ThreeCardSection } from "@/components/shared/ThreeCardSection";
import MetricsModal from "@/components/MetricsModal";
import { FAQSection } from "@/components/FAQSection";
import { Turnstile } from "@/components/Turnstile";
import { ScrollAnimationWrapper } from "@/components/animations/ScrollAnimationWrapper";
import { OurFocusSection } from "@/components/OurFocusSection";
// OptimizedImage import removed - using high-fidelity images

// =============================================================================
// UI COMPONENT IMPORTS
// =============================================================================
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

// =============================================================================
// ICON IMPORTS
// =============================================================================
import {
  Home as HomeIcon,
  Heart,
  Globe,
  ExternalLink,
  ArrowRight,
  ArrowLeft,
  X,
  Calendar,
  Clock,
} from "lucide-react";

// =============================================================================
// TYPE IMPORTS
// =============================================================================
import { ProjectData } from "@/types/project";
import { BlogPost, getFeaturedPosts } from "@/data/blog";

// =============================================================================
// DATA & CONFIGURATION IMPORTS
// =============================================================================
import {
  organizationStructuredData,
  websiteStructuredData,
  faqStructuredData,
  localBusinessStructuredData,
  provinceBusinessSchemas,
} from "@/lib/structuredData";

// =============================================================================
// EXTRACTED DATA IMPORTS
// =============================================================================
import {
  // @source: src/pages/Home.tsx - portfolioProjects variable
  portfolioProjects,
  // @source: src/pages/Home.tsx - howDoWeDoItPillars variable
  howDoWeDoItPillars, // @source: src/pages/Home.tsx - howDoWeDoItPillars variable
} from "@/data";

// =============================================================================
// ASSET IMPORTS
// =============================================================================
// All asset imports moved to respective data files:
// - Project images: @/data/projects.ts
// - Portfolio images: @/data/portfolio.ts
// - Pillar images: @/data/pillars.ts

/**
 * =============================================================================
 * HOME COMPONENT
 * =============================================================================
 *
 * Main component that renders the Anhart homepage.
 * Manages state for modals, carousels, forms, and drag scroll functionality.
 */
const Home = () => {
  // =============================================================================
  // CUSTOM HOOKS
  // =============================================================================

  /**
   * Form submission hook for contact form handling
   * Provides submitForm function and isSubmitting state
   */
  const { submitForm, isSubmitting } = useFormSubmission();

  /**
   * Animated counter hooks for statistics section
   * Each hook animates a number from 0 to the specified end value
   */
  const { count: homesCount, elementRef: homesRef } = useCountUp({
    end: 500, // Total homes created
  });
  const { count: capitalCount, elementRef: capitalRef } = useCountUp({
    end: 20, // Patient capital in millions
  });
  const { count: partnersCount, elementRef: partnersRef } = useCountUp({
    end: 20, // Global partners count
  });

  // =============================================================================
  // STATE MANAGEMENT
  // =============================================================================

  /**
   * Statistics Animation State
   * Controls when the bounce animation should play
   */
  const [showStatsAnimation, setShowStatsAnimation] = useState(false);

  /**
   * Modal State Management
   * Controls visibility of various modal dialogs
   */
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(
    null,
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [clientsDialogOpen, setClientsDialogOpen] = useState(false);
  const [metricsModalOpen, setMetricsModalOpen] = useState(false);

  /**
   * Turnstile State Management
   * Tracks the Cloudflare Turnstile token for form submission
   */
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileKey, setTurnstileKey] = useState(0); // Key to force Turnstile reset

  /**
   * Featured Blogs State Management
   * Stores the featured blog posts to display
   */
  const [featuredBlogs, setFeaturedBlogs] = useState<BlogPost[]>([]);

  // =============================================================================
  // TURNSTILE CALLBACKS (Memoized to prevent re-render loops)
  // =============================================================================

  /**
   * Turnstile success callback - memoized to prevent infinite re-renders
   */
  const handleTurnstileSuccess = useCallback((token: string) => {
    setTurnstileToken(token);
  }, []);

  /**
   * Turnstile error callback - memoized to prevent infinite re-renders
   */
  const handleTurnstileError = useCallback(() => {
    setTurnstileToken(null);
  }, []);

  /**
   * Turnstile expire callback - memoized to prevent infinite re-renders
   */
  const handleTurnstileExpire = useCallback(() => {
    setTurnstileToken(null);
  }, []);

  // =============================================================================
  // EVENT HANDLERS
  // =============================================================================

  /**
   * Contact Form Submission Handler
   *
   * Handles the submission of the contact form in the Contact Us section.
   * Extracts form data, submits via the useFormSubmission hook, and resets
   * the form on successful submission.
   *
   * @param e - React form event
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Check honeypot field - if filled, it's likely a bot
    const honeypot = formData.get("website") as string;
    if (honeypot && honeypot.trim() !== "") {
      console.log("Bot detected via honeypot");
      return; // Silently reject the submission
    }

    // Validate Turnstile token
    if (!turnstileToken) {
      console.error("Turnstile verification required");
      return; // Prevent submission without Turnstile verification
    }

    // Submit form data using the custom hook
    const success = await submitForm({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      organization: formData.get("organization") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
      form_type: "home",
      turnstile_token: turnstileToken || undefined,
    });

    // Reset form and Turnstile on successful submission
    if (success) {
      form.reset();
      setTurnstileToken(null);
      setTurnstileKey((prev) => prev + 1); // Force Turnstile to reset by changing key
    }
  };

  // =============================================================================
  // EFFECTS & LIFECYCLE
  // =============================================================================

  /**
   * Statistics Section Intersection Observer
   *
   * Triggers the bounce animation when the statistics section comes into view.
   * Uses Intersection Observer API for efficient scroll detection.
   * Animation plays for 1 second then stops automatically.
   * Animation only plays once per page load.
   */
  useEffect(() => {
    let hasAnimated = false; // Track if animation has already played

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true; // Mark as animated
            setShowStatsAnimation(true);
            // Reset animation state after 1 second but don't allow re-triggering
            setTimeout(() => {
              setShowStatsAnimation(false);
            }, 1000);
          }
        });
      },
      {
        threshold: 0.4,
        // Trigger when 30% of the section is visible
        rootMargin: "0px 0px -50px 0px", // Trigger slightly before fully in view
      },
    );
    const statsSection = document.getElementById("statistics-section");
    if (statsSection) {
      observer.observe(statsSection);
    }
    return () => {
      if (statsSection) {
        observer.unobserve(statsSection);
      }
    };
  }, []); // Empty dependency array - only runs once

  /**
   * Fetch Featured Blog Posts
   *
   * Fetches blog posts marked as featured from the database.
   */
  useEffect(() => {
    const fetchFeaturedBlogs = async () => {
      try {
        const posts = await getFeaturedPosts();
        setFeaturedBlogs(posts);
      } catch (error) {
        console.error("Error fetching featured blogs:", error);
      }
    };
    fetchFeaturedBlogs();
  }, []);

  // =============================================================================
  // MODAL HANDLERS
  // =============================================================================

  /**
   * Open Project Details Modal
   *
   * Opens the project details modal with the selected project data.
   * Used when user clicks "View Details" on a project card.
   * Finds the corresponding project in portfolioProjects for detailed information.
   *
   * @param projectData - The project data to display in the modal
   */
  const handleViewDetails = (projectData: ProjectData) => {
    // Find the corresponding project in portfolioProjects by matching originalTitle or title
    const portfolioProject = portfolioProjects.find(
      (project) =>
        project.title === projectData.originalTitle ||
        project.title === projectData.title ||
        (projectData.originalTitle &&
          project.title.includes(projectData.originalTitle)) ||
        (projectData.title && project.title.includes(projectData.title)),
    );

    // Use portfolio project data if found, otherwise fall back to featured project data
    const modalProject = portfolioProject
      ? {
          ...portfolioProject,
          title: projectData.originalTitle || projectData.title, // Keep the original title for display
        }
      : {
          ...projectData,
          title: projectData.originalTitle || projectData.title,
        };
    setSelectedProject(modalProject);
    setModalOpen(true);
  };

  /**
   * Close Project Details Modal
   *
   * Closes the project details modal and clears the selected project data.
   */
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProject(null);
  };

  /**
   * Open Project Gallery Modal
   *
   * Opens the full project gallery modal showing all portfolio projects.
   * Used when user clicks on the "Homes Created" statistic.
   */
  const handleOpenGallery = () => {
    setGalleryModalOpen(true);
  };

  /**
   * Close Project Gallery Modal
   *
   * Closes the project gallery modal.
   */
  const handleCloseGallery = () => {
    setGalleryModalOpen(false);
  };

  /**
   * Open Metrics Modal
   *
   * Opens the metrics modal to display performance and growth data.
   */
  const handleOpenMetrics = () => {
    setMetricsModalOpen(true);
  };

  /**
   * Close Metrics Modal
   *
   * Closes the metrics modal.
   */
  const handleCloseMetrics = () => {
    setMetricsModalOpen(false);
  };

  /**
   * Open Partners Dialog
   *
   * Opens the partners carousel dialog.
   * Used when user clicks on the "Global Partners" statistic.
   */
  const openClientsDialog = () => setClientsDialogOpen(true);

  /**
   * Close Partners Dialog
   *
   * Closes the partners carousel dialog.
   */
  const closeClientsDialog = () => setClientsDialogOpen(false);

  // =============================================================================
  // HELPER FUNCTIONS
  // =============================================================================

  /**
   * Normalize Blog Image URL
   *
   * Helper function to normalize blog post image URLs for display.
   */
  const normalizeImageUrl = (url: string | undefined | null): string => {
    if (!url) return "/blog/default.jpg";
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    if (url.startsWith("data:")) {
      return url;
    }
    if (url.startsWith("/")) {
      return `https://anhart.ca${url}`;
    }
    return `https://anhart.ca/${url}`;
  };

  /**
   * Format Date
   *
   * Formats a date string into a readable format.
   */
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // =============================================================================
  // DATA STRUCTURES
  // =============================================================================

  // howDoWeDoItPillars data extracted to @/data/pillars.ts

  // portfolioProjects data extracted to @/data/portfolio.ts

  // =============================================================================
  // RENDER
  // =============================================================================

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Anhart – Affordable Housing Developer in Canada"
        description="Anhart is a vertically integrated affordable housing developer in Vancouver, BC. Modular homes, SRO conversions, open-source Community Commons. Building 20,000 homes by 2045."
        keywords="affordable housing, SROs, modular homes, non-profit housing, low-income housing, subsidized housing, below-market housing, supportive housing, inclusionary housing, affordability, micro-suites, micro-units, vacancy development, derelict homes, single room occupancy, social housing, community housing, rental housing, housing continuum, transitional housing, Vancouver, BC, Canada, housing development, housing solutions, community development, sustainable housing"
        url="/"
        structuredData={[
          organizationStructuredData,
          websiteStructuredData,
          faqStructuredData,
          localBusinessStructuredData,
          provinceBusinessSchemas.BC,
          provinceBusinessSchemas.Alberta,
          provinceBusinessSchemas.Manitoba,
          provinceBusinessSchemas.Ontario,
        ]}
      />
      <Header />
      <main>
        {/* =====================================================================
              HERO SECTION
              ===================================================================== */}
        <Hero />

        {/* =====================================================================
              STATISTICS SECTION
              =====================================================================
              Displays animated statistics that users can interact with to view more details.
           */}
        <section id="statistics-section" className="py-16 bg-muted/30">
          <div className="mx-auto max-w-6xl px-6 lg:px-8 text-center">
            <ScrollAnimationWrapper direction="top">
              <h1 className="text-3xl font-bold tracking-tight text-foreground mb-6 text-center">
                Launched By Impact Investors, Led by Communities
              </h1>
            </ScrollAnimationWrapper>
            <ScrollAnimationWrapper direction="top" delay={200}>
              <p className="text-base sm:text-lg lg:text-xl leading-7 text-gray-700/95 mb-8">
                {/* Mobile text */}
                <span className="block sm:hidden">
                  From our first project in Vancouver to communities nationwide,
                  Anhart partners with local non-profits to deliver 20,000
                  affordable homes by 2045 — proving that small, trusted
                  collaborations can achieve big goals.
                </span>

                {/* Tablet/Desktop text */}
                <span className="hidden sm:block text-xl leading-8 text-muted-foreground mb-8">
                  From our first project in Vancouver's Downtown Eastside in
                  2000, Anhart has grown into one of Canada's leading non-profit
                  real estate developers. We are on track to deliver 20,000
                  affordable homes nationwide by 2045, working coast to coast to
                  coast. Our model combines patient capital, trusted local
                  partnerships, and the latest insights from complex adaptive
                  systems. To us, <strong>“small”</strong> means staying at
                  scale while remaining deeply rooted in local networks — a
                  distributed approach where each community functions like a
                  vital cell in a living system. Together, these small,
                  connected efforts form the larger organism of affordable
                  housing, proving that the power of small is the most effective
                  pathway to achieving big goals.
                </span>
              </p>
            </ScrollAnimationWrapper>
            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div
                className="flex flex-col items-center cursor-pointer hover:scale-105 transition-all duration-300 animate-scale-in delay-300 group"
                onClick={handleOpenGallery}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleOpenGallery();
                  }
                }}
                aria-label="View our housing projects"
              >
                <div className="bg-primary/10 p-4 rounded-full mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300 shadow-2xl shadow-primary/30">
                  <HomeIcon
                    className={`w-8 h-8 text-primary group-hover:text-primary/80 transition-all duration-300 drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)] drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] drop-shadow-[0_0_0_4px_rgba(255,255,255,1)] ${showStatsAnimation ? "animate-[bounce_1s_ease-in-out]" : ""}`}
                  />
                </div>
                <p
                  ref={homesRef}
                  className="text-3xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300"
                >
                  {homesCount}+
                </p>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  Homes Created
                </p>
              </div>

              <div
                className="flex flex-col items-center cursor-pointer hover:scale-105 transition-all duration-300 animate-scale-in delay-400 group"
                onClick={handleOpenMetrics}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleOpenMetrics();
                  }
                }}
                aria-label="View our patient capital details"
              >
                <div className="bg-primary/10 p-4 rounded-full mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300 shadow-2xl shadow-primary/30">
                  <Heart
                    className={`w-8 h-8 text-primary group-hover:text-primary/80 transition-all duration-300 drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)] drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] drop-shadow-[0_0_0_4px_rgba(255,255,255,1)] ${showStatsAnimation ? "animate-[bounce_1s_ease-in-out]" : ""}`}
                  />
                </div>
                <p
                  ref={capitalRef}
                  className="text-3xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300"
                >
                  ${capitalCount}M
                </p>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  Patient Capital
                </p>
              </div>

              <div
                className="flex flex-col items-center cursor-pointer hover:scale-105 transition-all duration-300 animate-scale-in delay-500 group"
                onClick={openClientsDialog}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openClientsDialog();
                  }
                }}
                aria-label="View our global partners"
              >
                <div className="bg-primary/10 p-4 rounded-full mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300 shadow-2xl shadow-primary/30">
                  <Globe
                    className={`w-8 h-8 text-primary group-hover:text-primary/80 transition-all duration-300 drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)] drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] drop-shadow-[0_0_0_4px_rgba(255,255,255,1)] ${showStatsAnimation ? "animate-[bounce_1s_ease-in-out]" : ""}`}
                  />
                </div>
                <p
                  ref={partnersRef}
                  className="text-3xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300"
                >
                  {partnersCount}+
                </p>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  Global Partners
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
              OUR FOCUS SECTION
              =====================================================================
              Showcases the different purposes and concepts of Anhart's projects
              with their own isolated data structure and component.
           */}
        <OurFocusSection />

        {/* =====================================================================
              IMPACT INVESTORS SECTION
              =====================================================================
              Displays the organization's mission statement and background.
           */}

        {/* =====================================================================
              PARTNERS DIALOG
              =====================================================================
              Modal dialog that displays the partners carousel when users click
              on the "Global Partners" statistic.
           */}
        <Dialog open={clientsDialogOpen} onOpenChange={setClientsDialogOpen}>
          <DialogContent className="w-[95vw] max-w-4xl p-0 overflow-hidden dialog-content">
            <DialogTitle className="sr-only">Our Clients</DialogTitle>
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 z-10 bg-background/80 hover:bg-background"
                onClick={closeClientsDialog}
              >
                <X className="h-4 w-4" />
              </Button>
              <ClientCarousel />
            </div>
          </DialogContent>
        </Dialog>

        {/* =====================================================================
              SERVICES SECTION - "HOW DO WE DO IT?"
              =====================================================================
              Displays the three pillars of Anhart's approach with responsive layout:
              - Mobile: Single column stack
              - Tablet: 2 items on top, 1 centered below
              - Desktop: 3-column grid
           */}
        {/* How Do We Do It Section - Using ThreeCardSection Component */}
        <ThreeCardSection
          title="How do we do it?"
          description="Our Approach: Expertise, Altruism, Research, and Community Housing Leadership"
          cards={howDoWeDoItPillars}
          bgColor="muted"
          layout="grid"
          showImages={true}
          flippable={true}
        />

        {/* =====================================================================
              FAQ SECTION
              =====================================================================
              Frequently Asked Questions section with collapsible accordion
           */}
        <FAQSection />

        {/* =====================================================================
              CONTACT US SECTION
              =====================================================================
              Contact form and company information with two-column layout:
              - Left: Contact form with validation
              - Right: Company details and contact information
           */}
        <section className="py-16 bg-muted/30">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="text-center mb-12">
              <ScrollAnimationWrapper direction="top">
                <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">
                  Contact Us
                </h2>
              </ScrollAnimationWrapper>
              <ScrollAnimationWrapper direction="top" delay={100}>
                <p className="text-lg text-muted-foreground">
                  Reach out to connect with our friendly-staff or call us at{" "}
                  <a
                    href="tel:604-529-6259"
                    className="font-bold text-foreground hover:text-primary transition-colors"
                  >
                    604-529-6259
                  </a>
                </p>
              </ScrollAnimationWrapper>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              {/* Contact Form */}
              <ScrollAnimationWrapper direction="left" delay={200}>
                <Card className="h-full hover:shadow-md transition-shadow duration-300">
                  <CardContent className="p-8 h-full">
                    <form
                      className="space-y-6 h-full flex flex-col"
                      onSubmit={handleSubmit}
                    >
                      <div className="flex-1 space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="name">
                              Name <span className="text-destructive">*</span>
                            </Label>
                            <Input
                              id="name"
                              name="name"
                              placeholder="Your full name"
                              className="mt-1"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="email">
                              Email <span className="text-destructive">*</span>
                            </Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              placeholder="your.email@example.com"
                              className="mt-1"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="phone">
                              Phone Number{" "}
                              <span className="text-destructive">*</span>
                            </Label>
                            <Input
                              id="phone"
                              name="phone"
                              type="tel"
                              placeholder="Your phone number"
                              className="mt-1"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="organization">
                              Organization (Optional)
                            </Label>
                            <Input
                              id="organization"
                              name="organization"
                              placeholder="Your organization name"
                              className="mt-1"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="subject">
                            Subject <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="subject"
                            name="subject"
                            placeholder="Subject of your message"
                            className="mt-1"
                            required
                          />
                        </div>

                        <div className="flex-1">
                          <Label htmlFor="message">
                            Message <span className="text-destructive">*</span>
                          </Label>
                          <Textarea
                            id="message"
                            name="message"
                            placeholder="Tell us about your project or how we can help..."
                            required
                            className="mt-1 min-h-[200px] resize-none"
                          />
                        </div>

                        {/* Honeypot field - hidden from users but visible to bots */}
                        <div
                          style={{
                            display: "none",
                          }}
                        >
                          <Label htmlFor="website">Website (leave blank)</Label>
                          <Input
                            id="website"
                            name="website"
                            type="text"
                            tabIndex={-1}
                            autoComplete="off"
                          />
                        </div>
                      </div>

                      {/* Cloudflare Turnstile Widget */}
                      <div className="flex justify-center" key={turnstileKey}>
                        <Turnstile
                          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "0x4AAAAAACBa8qdGLdmp2t2Q"}
                          onSuccess={handleTurnstileSuccess}
                          onError={handleTurnstileError}
                          onExpire={handleTurnstileExpire}
                          theme="auto"
                          size="normal"
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full mt-6"
                        disabled={isSubmitting || !turnstileToken}
                      >
                        {isSubmitting ? "Submitting..." : "Submit Message"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </ScrollAnimationWrapper>

              {/* Contact Information */}
              <div className="flex flex-col gap-6 h-full">
                <ScrollAnimationWrapper direction="right" delay={300}>
                  <Card className="flex-1 hover:shadow-md transition-shadow duration-300">
                    <CardContent className="p-8 h-full">
                      <h3 className="text-xl font-semibold text-foreground mb-6">
                        Main Office
                      </h3>
                      <div className="space-y-4 text-muted-foreground">
                        <p className="flex items-start">
                          <HomeIcon className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                          <button
                            onClick={() =>
                              openGoogleMapsSearch(
                                AddressUtils.getGoogleMapsAddress(),
                              )
                            }
                            className="hover:underline text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 rounded"
                          >
                            {AddressUtils.getAddressLines().map(
                              (line, index) => (
                                <React.Fragment key={index}>
                                  {line}
                                  {index <
                                    AddressUtils.getAddressLines().length -
                                      1 && <br />}
                                </React.Fragment>
                              ),
                            )}
                          </button>
                        </p>

                        <p className="flex items-center">
                          <ExternalLink className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                          <a
                            href={`tel:${CONTACT_INFO.phone.replace(/[^\d]/g, "")}`}
                            className="hover:underline"
                          >
                            Phone: {CONTACT_INFO.phone}
                          </a>
                        </p>

                        <p className="flex items-center">
                          <Heart className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                          <a
                            href="mailto:info@anhart.ca"
                            className="hover:underline"
                          >
                            Email: info@anhart.ca
                          </a>
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollAnimationWrapper>

                <ScrollAnimationWrapper direction="right" delay={400}>
                  <Card className="flex-1 hover:shadow-md transition-shadow duration-300 hidden md:block">
                    <CardContent className="p-8 h-full flex flex-col">
                      <h3 className="text-xl font-semibold text-foreground mb-6">
                        Get In Touch
                      </h3>
                      <p className="text-muted-foreground mb-6 flex-grow">
                        We'd love to hear about your housing project or
                        partnership opportunity. Our team is ready to work with
                        you to create sustainable, affordable housing solutions.
                      </p>
                      <ul className="list-disc list-inside space-y-3 text-sm text-muted-foreground">
                        <li>No-cost pre-development</li>
                        <li>No-cost architectural feasibility</li>
                        <li>Non-profit developmental services</li>
                        <li>Property & Tenant Management Support</li>
                      </ul>
                    </CardContent>
                  </Card>
                </ScrollAnimationWrapper>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
              FEATURED BLOGS SECTION
              =====================================================================
              Displays the latest blog posts in a card grid layout.
           */}
        {featuredBlogs.length > 0 && (
          <section className="py-16 bg-background">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="text-center mb-12">
                <ScrollAnimationWrapper direction="top">
                  <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">
                    Featured Blogs
                  </h2>
                </ScrollAnimationWrapper>
                <ScrollAnimationWrapper direction="top" delay={100}>
                  <p className="text-lg text-muted-foreground">
                    Discover featured insights and resources about affordable housing
                  </p>
                </ScrollAnimationWrapper>
              </div>

              <div
                className={`grid gap-8 ${
                  featuredBlogs.length === 1
                    ? "md:grid-cols-1 justify-center max-w-2xl mx-auto"
                    : featuredBlogs.length === 2
                      ? "md:grid-cols-2 lg:grid-cols-2 max-w-5xl mx-auto"
                      : "md:grid-cols-2 lg:grid-cols-3"
                }`}
              >
                {featuredBlogs.map((post, index) => (
                  <ScrollAnimationWrapper
                    key={post.id}
                    direction="bottom"
                    delay={index * 0.1}
                  >
                      <Link href={`/blog/${post.slug}`} className="block h-full">
                        <Card className="h-full hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                          {post.featuredImage && (
                            <div className="relative h-48 overflow-hidden">
                              <img
                                src={normalizeImageUrl(post.featuredImage)}
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = "none";
                                }}
                              />
                            </div>
                          )}
                          <CardHeader>
                            <Badge className="mb-3 w-fit bg-primary text-primary-foreground">
                              {post.category}
                            </Badge>
                            <h3 className="text-xl font-bold text-foreground mb-2 hover:text-primary transition-colors line-clamp-2">
                              {post.title}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {formatDate(post.publishDate)}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {post.readingTime} min
                              </span>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground mb-4 line-clamp-3">
                              {post.excerpt}
                            </p>
                            <div className="flex items-center text-primary font-semibold group-hover:gap-2 transition-all">
                              Read More
                              <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </ScrollAnimationWrapper>
                  ))}
              </div>

              <div className="text-center mt-12">
                <Link href="/blog">
                  <Button variant="outline" size="lg">
                    View All Blogs
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>
      {/* =====================================================================
            FOOTER
            ===================================================================== */}
      <Footer />

      {/* =====================================================================
            MODALS
            =====================================================================
            Modal dialogs for enhanced user interactions:
            - Project Details: Shows detailed information for individual projects
            - Project Gallery: Displays all portfolio projects in a gallery format
         */}

      {/* Project Details Modal - Shows individual project information */}
      <ProjectModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        project={selectedProject}
      />

      {/* Project Gallery Modal - Shows all portfolio projects */}
      <ProjectGalleryModal
        isOpen={galleryModalOpen}
        onClose={handleCloseGallery}
        projects={portfolioProjects}
      />

      {/* Metrics Modal - Shows performance and growth data */}
      <MetricsModal isOpen={metricsModalOpen} onClose={handleCloseMetrics} />
    </div>
  );
};
export default Home;
