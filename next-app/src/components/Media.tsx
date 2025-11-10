'use client';

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Play, Image, Newspaper, Calendar, ExternalLink, FileText, Download, Eye, X } from "lucide-react";
import { HeroBanner } from "@/components/shared/HeroBanner";
import { HorizontalScrollCarousel } from "@/components/shared/HorizontalScrollCarousel";
import { MediaItem, PdfDocument, PressRelease } from "@/types/common";
import React, { useRef, useState, useEffect } from "react";
import { ScrollAnimationWrapper } from "@/components/animations/ScrollAnimationWrapper";
// Hero image now uses image registry system

// =============================================================================
// EXTRACTED DATA IMPORTS
// =============================================================================
import { mediaGallery,
// @source: src/pages/Media.tsx - mediaGallery variable
pdfDocuments,
// @source: src/pages/Media.tsx - pdfDocuments variable
pressReleases // @source: src/pages/Media.tsx - pressReleases variable
} from "@/data";

// =============================================================================
// ASSET IMPORTS
// =============================================================================
// All media asset imports moved to @/data/media.ts

//promotional video imports
import promotionalVideo from "@/assets/Anhart Affordable Housing 1 minute Promotional Video.mp4";
import promotionalVideoThumbnail from "@/assets/promotionalVideoThumbnail.jpg";
import anhart4Steps from "@/assets/media/anhart4steps.mp4";

/**
 * Media Page Component
 * 
 * Displays media content including promotional videos, PDF documents,
 * press releases, and media gallery. Features modal viewers for different
 * content types and interactive elements for user engagement.
 */
const Media = () => {
  // PDF modal state management
  const [selectedPdf, setSelectedPdf] = useState<PdfDocument | null>(null);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [pdfError, setPdfError] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfLoadTimeout, setPdfLoadTimeout] = useState(false);

  // Video modal state management
  const [selectedVideo, setSelectedVideo] = useState<MediaItem | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Article modal state management
  const [selectedArticle, setSelectedArticle] = useState<PressRelease | null>(null);
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);

  // Carousel state for Document Library, Media Gallery, and Press Coverage
  const [currentDocumentIndex, setCurrentDocumentIndex] = useState(0);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [currentPressIndex, setCurrentPressIndex] = useState(0);

  // Pagination state for 2x2 grid layout (4 items per page)
  const [currentDocumentPage, setCurrentDocumentPage] = useState(0);
  const [currentPressPage, setCurrentPressPage] = useState(0);

  // Calculate items per page and total pages
  const itemsPerPage = 4;
  const totalDocumentPages = Math.ceil(pdfDocuments.length / itemsPerPage);
  const totalPressPages = Math.ceil(pressReleases.length / itemsPerPage);

  // Get current page items
  const getCurrentPageItems = (items: any[], currentPage: number) => {
    const startIndex = currentPage * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

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

  // Video player refs and state
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  // Handle body scroll when modal is open
  useEffect(() => {
    if (isPdfModalOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [isPdfModalOpen]);

  // Close PDF modal on Escape key
  useEffect(() => {
    if (!isPdfModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        // Close only if currently open
        if (isPdfModalOpen) {
          setSelectedPdf(null);
          setIsPdfModalOpen(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPdfModalOpen]);

  // Close Video modal on Escape key
  useEffect(() => {
    if (!isVideoModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        if (isVideoModalOpen) {
          setSelectedVideo(null);
          setIsVideoModalOpen(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVideoModalOpen]);

  // Close Article modal on Escape key
  useEffect(() => {
    if (!isArticleModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        if (isArticleModalOpen) {
          setSelectedArticle(null);
          setIsArticleModalOpen(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isArticleModalOpen]);

  // Media data structures extracted to @/data/media.ts

  const getMediaIcon = type => type === "video" ? Play : Image;
  {/*PDF MODAL*/}
  const openPdfModal = async pdf => {
    setSelectedPdf(pdf);
    setIsPdfModalOpen(true);
    setPdfError(false);
    setPdfLoading(true);
    setPdfLoadTimeout(false);

    // Set a shorter timeout for loading
    const timeoutId = setTimeout(() => {
      setPdfLoadTimeout(true);
      setPdfError(true);
    }, 3000); // 3 second timeout

    // Test if PDF is accessible
    try {
      const response = await fetch(pdf.url, {
        method: 'HEAD',
        mode: 'cors'
      });
      if (!response.ok) {
        throw new Error('PDF not accessible');
      }
    } catch (error) {
      console.warn('PDF accessibility check failed:', error);
      setPdfError(true);
      setPdfLoadTimeout(false);
    } finally {
      setPdfLoading(false);
      clearTimeout(timeoutId);
    }
  };
  const closePdfModal = () => {
    setSelectedPdf(null);
    setIsPdfModalOpen(false);
    setPdfError(false);
    setPdfLoading(false);
    setPdfLoadTimeout(false);
  };
  const downloadPdf = pdf => {
    try {
      const link = document.createElement('a');
      link.href = pdf.url;
      link.download = pdf.title.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.pdf';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback to opening in new tab
      window.open(pdf.url, '_blank', 'noopener,noreferrer');
    }
  };
  const openPdfInNewTab = pdf => {
    window.open(pdf.url, '_blank', 'noopener,noreferrer');
  };
  const handleIframeError = () => {
    setPdfError(true);
  };
  const PdfFallbackOptions = ({
    pdf
  }) => {
    return <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      <FileText className="h-16 w-16 text-blue-500 mb-4" />
      <h3 className="text-lg font-semibold mb-2">PDF Preview Not Available</h3>
      <p className="text-muted-foreground mb-6 max-w-md">
        The PDF preview cannot be displayed in your browser. You can download the file or open it in a new tab to view it.
      </p>
      
      <div className="space-y-3 w-full max-w-sm">
        <Button onClick={() => downloadPdf(pdf)} className="w-full flex items-center gap-2" variant="default">
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
        
        <Button onClick={() => openPdfInNewTab(pdf)} className="w-full flex items-center gap-2" variant="outline">
          <ExternalLink className="h-4 w-4" />
          Open in New Tab
        </Button>
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm text-blue-800">
        <p className="font-medium mb-1">Why can't I preview this?</p>
        <p>Some browsers block PDF previews for security reasons. Downloading or opening in a new tab ensures you can view the document properly.</p>
      </div>
    </div>;
  };
  {/*Promotional Video Modal*/}
  const openVideoModal = video => {
    setSelectedVideo(video);
    setIsVideoModalOpen(true);
  };
  const closeVideoModal = () => {
    setSelectedVideo(null);
    setIsVideoModalOpen(false);
  };
  {/*Article Modal*/}
  const openArticleModal = article => {
    setSelectedArticle(article);
    setIsArticleModalOpen(true);
  };
  const closeArticleModal = () => {
    setSelectedArticle(null);
    setIsArticleModalOpen(false);
  };
  const handleArticleAction = article => {
    if (article.type === "external") {
      window.open(article.url, "_blank", "noopener,noreferrer");
    } else if (article.type === "modal") {
      openArticleModal(article);
    }
  };

  // Navigation functions for carousels
  const goToPreviousDocument = () => {
    setCurrentDocumentIndex(prev => prev > 0 ? prev - 1 : pdfDocuments.length - 1);
  };
  const goToNextDocument = () => {
    setCurrentDocumentIndex(prev => prev < pdfDocuments.length - 1 ? prev + 1 : 0);
  };
  const goToPreviousMedia = () => {
    setCurrentMediaIndex(prev => prev > 0 ? prev - 1 : mediaGallery.length - 1);
  };
  const goToNextMedia = () => {
    setCurrentMediaIndex(prev => prev < mediaGallery.length - 1 ? prev + 1 : 0);
  };
  const goToPreviousPress = () => {
    setCurrentPressIndex(prev => prev > 0 ? prev - 1 : pressReleases.length - 1);
  };
  const goToNextPress = () => {
    setCurrentPressIndex(prev => prev < pressReleases.length - 1 ? prev + 1 : 0);
  };

  // Pagination navigation functions
  const goToPreviousDocumentPage = () => {
    setCurrentDocumentPage(prev => prev > 0 ? prev - 1 : totalDocumentPages - 1);
  };
  const goToNextDocumentPage = () => {
    setCurrentDocumentPage(prev => prev < totalDocumentPages - 1 ? prev + 1 : 0);
  };
  const goToPreviousPressPage = () => {
    setCurrentPressPage(prev => prev > 0 ? prev - 1 : totalPressPages - 1);
  };
  const goToNextPressPage = () => {
    setCurrentPressPage(prev => prev < totalPressPages - 1 ? prev + 1 : 0);
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
  const handleTouchEnd = (type: 'document' | 'media' | 'press') => {
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
        if (type === 'document') goToNextDocument();
        if (type === 'media') goToNextMedia();
        if (type === 'press') goToNextPress();
      }
      if (isRightSwipe) {
        if (type === 'document') goToPreviousDocument();
        if (type === 'media') goToPreviousMedia();
        if (type === 'press') goToPreviousPress();
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
      <SEO title="News & Media - Anhart Affordable Housing" description="Stay updated with the latest news, media coverage, and press releases about Anhart's affordable housing projects and community impact across Canada." keywords="anhart news, affordable housing media, housing press releases, community development news, housing coverage, anhart press, housing media" url="/media" />
      <Header />
      <main>
        {/* Hero Banner - Media and news coverage overview */}
        <HeroBanner backgroundImage="media-hero" title="Latest News and Media Coverage" contentPosition="right" />

        {/* Promotional Video */}
        <section className="py-24 bg-muted/30">
          <div className="mx-auto max-w-5xl px-6 lg:px-8 text-center">
            <ScrollAnimationWrapper direction="top">
              <h2 className="text-3xl font-bold tracking-tight text-foreground mb-6">
                Featured Promotional Video
              </h2>
            </ScrollAnimationWrapper>
            <ScrollAnimationWrapper direction="top" delay={100}>
              <p className="text-lg leading-8 text-muted-foreground mb-8">
                Learn more about our mission and impact through this short feature.
              </p>
            </ScrollAnimationWrapper>
        
            <ScrollAnimationWrapper direction="bottom" delay={200}>
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-sm sm:shadow-lg">
                <video ref={videoRef} poster={promotionalVideoThumbnail} className="w-full h-full object-cover" controls>
                  <source src={promotionalVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
          
                {!isPlaying && <div className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer" onClick={handlePlay}>
                    <button className="text-white text-lg px-4 py-2 bg-red-600 rounded-lg">
                      ▶
                    </button>
                  </div>}
          
                <div className="absolute top-2 right-4 bg-black/60 text-white text-sm px-3 py-1 rounded-lg hover:bg-red-600 transition-colors pointer-events-none">
                  <a className="pointer-events-auto" href="https://www.youtube.com/watch?v=LIjifKbBRpg" target="_blank" rel="noopener noreferrer">
                    Watch on YouTube
                  </a>
                </div>
              </div>
            </ScrollAnimationWrapper>
          </div>
        </section>

         {/* PDF Documents Section */}
         <section className="py-24">
           <div className="mx-auto max-w-6xl px-6 lg:px-8">
             {/* Section Header */}
             <div className="text-center mb-16">
               <ScrollAnimationWrapper direction="top">
                 <h2 className="text-3xl font-bold tracking-tight text-foreground mb-6">
                   Document Library
                 </h2>
               </ScrollAnimationWrapper>
               <ScrollAnimationWrapper direction="top" delay={100}>
                 <p className="text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
                   Discover our comprehensive collection of PDF documents. Curated with detailed insights, specifications, and detailed resources.
                 </p>
               </ScrollAnimationWrapper>
             </div>
           
             {/* PDF Documents - Desktop 2x2 Grid with Pagination */}
             <div className="hidden md:block">
               {/* Navigation Arrows */}
               <div className="flex justify-between items-center mb-6">
                 <button onClick={goToPreviousDocumentPage} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" aria-label="Previous page">
                   <span className="text-xl">‹</span>
                   Previous
                 </button>
                 
                 <div className="flex items-center gap-2">
                   <span className="text-sm text-muted-foreground">
                     Page {currentDocumentPage + 1} of {totalDocumentPages}
                   </span>
                 </div>
                 
                 <button onClick={goToNextDocumentPage} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" aria-label="Next page">
                   Next
                   <span className="text-xl">›</span>
                 </button>
               </div>

               {/* 2x2 Grid */}
               <div className="grid grid-cols-2 gap-6">
                 {getCurrentPageItems(pdfDocuments, currentDocumentPage).map((pdf, index) => <ScrollAnimationWrapper key={pdf.id} direction="bottom" delay={200 + index * 50}>
                     <div className="border rounded-lg p-6 hover:shadow-sm sm:hover:shadow-lg transition-shadow">
                       <div className="flex items-start justify-between mb-3">
                         <div className="flex items-center gap-3">
                           <div className="p-2 bg-red-100 text-red-600 rounded-lg">
                             <FileText className="h-6 w-6" />
                           </div>
                         </div>
                         <span className="text-sm text-muted-foreground">{pdf.date}</span>
                       </div>
                       
                       <h3 className="text-lg font-semibold mb-2">{pdf.title}</h3>
                       <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                         <span>{pdf.pages} pages</span>
                         <span>{pdf.size}</span>
                       </div>
                       <p className="text-muted-foreground mb-6 text-sm">{pdf.description}</p>
                       
                       <div className="flex gap-2">
                         <Button onClick={() => openPdfModal(pdf)} className="flex-1 flex items-center gap-2" size="sm">
                           <Eye className="h-4 w-4" />
                           Preview
                         </Button>
                         <Button variant="outline" onClick={() => downloadPdf(pdf)} size="sm" className="flex items-center gap-2">
                           <Download className="h-4 w-4" />
                           Download
                         </Button>
                       </div>
                     </div>
                   </ScrollAnimationWrapper>)}
               </div>

               {/* Pagination Dots */}
               <div className="flex justify-center items-center mt-8 space-x-2">
                 {Array.from({
                length: totalDocumentPages
              }, (_, index) => <button key={index} onClick={() => setCurrentDocumentPage(index)} className={`h-3 rounded-full transition-all duration-300 ${index === currentDocumentPage ? 'bg-primary w-8 shadow-lg shadow-primary/30' : 'bg-primary/40 hover:bg-primary/60 w-3'}`} aria-label={`Go to page ${index + 1}`} />)}
               </div>
             </div>

             {/* PDF Documents - Mobile Carousel */}
             <div className="md:hidden">
               {/* Pagination Dots */}
               <ScrollAnimationWrapper direction="top" delay={200}>
                 <div className="flex justify-center items-center mb-6 space-x-2">
                   {pdfDocuments.map((_, index) => <button key={index} onClick={() => setCurrentDocumentIndex(index)} className={`h-3 rounded-full transition-all duration-300 ${index === currentDocumentIndex ? 'bg-primary w-8 shadow-lg shadow-primary/30' : 'bg-primary/40 hover:bg-primary/60 w-3'}`} aria-label={`Go to document ${index + 1}`} />)}
                 </div>
               </ScrollAnimationWrapper>

               {/* Navigation Container */}
               <ScrollAnimationWrapper direction="bottom" delay={300}>
                 <div className={`relative touch-pan-x transition-all duration-300 ${isTouchActive ? 'shadow-2xl shadow-primary/20' : ''} ${
                  isAnimating 
                    ? swipeDirection === 'left' 
                      ? 'animate-slide-out-left' 
                      : 'animate-slide-out-right'
                    : ''
                }`} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={() => handleTouchEnd('document')} onTouchCancel={handleTouchCancel} style={{
                touchAction: 'auto'
              }}>
                   {/* Previous Arrow */}
                   <button onClick={goToPreviousDocument} className="absolute left-1 top-1/2 -translate-y-1/2 z-20 text-foreground/60 hover:text-foreground text-3xl font-bold transition-all duration-200 hover:scale-110" aria-label="Previous document">
                     ‹
                   </button>

                   {/* Next Arrow */}
                   <button onClick={goToNextDocument} className="absolute right-1 top-1/2 -translate-y-1/2 z-20 text-foreground/60 hover:text-foreground text-3xl font-bold transition-all duration-200 hover:scale-110" aria-label="Next document">
                     ›
                   </button>

                   {/* Single Document Display */}
                   <div className="px-6">
                     {pdfDocuments[currentDocumentIndex] && <div className="flex justify-center">
                         <div className="w-full max-w-sm">
                           <ScrollAnimationWrapper direction="top" delay={200 + currentDocumentIndex * 100}>
                             <div className="border rounded-lg p-6 hover:shadow-sm sm:hover:shadow-lg transition-shadow">
                               <div className="flex items-start justify-between mb-3">
                                 <div className="flex items-center gap-3">
                                   <div className="p-2 bg-red-100 text-red-600 rounded-lg">
                                     <FileText className="h-6 w-6" />
                                   </div>
                                 </div>
                                 <span className="text-sm text-muted-foreground">{pdfDocuments[currentDocumentIndex].date}</span>
                               </div>
                               
                               <h3 className="text-lg font-semibold mb-2">{pdfDocuments[currentDocumentIndex].title}</h3>
                               <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                                 <span>{pdfDocuments[currentDocumentIndex].pages} pages</span>
                                 <span>{pdfDocuments[currentDocumentIndex].size}</span>
                               </div>
                               <p className="text-muted-foreground mb-6 text-sm">{pdfDocuments[currentDocumentIndex].description}</p>
                               
                               <div className="flex gap-2">
                                 <Button onClick={() => openPdfModal(pdfDocuments[currentDocumentIndex])} className="flex-1 flex items-center gap-2" size="sm">
                                   <Eye className="h-4 w-4" />
                                   Preview
                                 </Button>
                                 <Button variant="outline" onClick={() => downloadPdf(pdfDocuments[currentDocumentIndex])} size="sm" className="flex items-center gap-2">
                                   <Download className="h-4 w-4" />
                                   Download
                                 </Button>
                               </div>
                             </div>
                           </ScrollAnimationWrapper>
                         </div>
                       </div>}
                   </div>
                 </div>
               </ScrollAnimationWrapper>
             </div>
           </div>
         </section>
  
        {/* Enhanced PDF Modal */}
        {isPdfModalOpen && selectedPdf && <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={e => {
        if (e.target === e.currentTarget) closePdfModal();
      }} onKeyDown={e => {
        if (e.key === 'Escape') closePdfModal();
      }} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="pdf-modal-title">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-full max-h-[90vh] flex flex-col">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 text-red-600 rounded-lg">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 id="pdf-modal-title" className="font-semibold text-lg">{selectedPdf.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{selectedPdf.pages} pages</span>
                      <span>{selectedPdf.size}</span>
                      <span>{selectedPdf.date}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  
                  
                  <Button variant="ghost" onClick={closePdfModal} size="sm">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

            {/* Modal Content */}
            <div className="flex-1 p-6">
              <div className="w-full h-full bg-gray-50 rounded-xl overflow-hidden shadow-inner relative">
                {pdfLoading ? <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                      <p className="text-muted-foreground">Checking PDF availability...</p>
                    </div>
                  </div> : <PdfFallbackOptions pdf={selectedPdf} />}
              </div>
            </div>

            {/* Footer with additional options */}
            
          </div>
        </div>}

        {/* Media Gallery */}
        <section className="py-24 bg-muted/30">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <ScrollAnimationWrapper direction="top">
                <h2 className="text-3xl font-bold tracking-tight text-foreground mb-6">
                  Media Gallery
                </h2>
              </ScrollAnimationWrapper>
              <ScrollAnimationWrapper direction="top" delay={100}>
                <p className="text-lg leading-8 text-muted-foreground">
                  Visual stories of our communities, construction progress, and the people we serve.
                </p>
              </ScrollAnimationWrapper>
            </div>

            {/* Media Gallery - Desktop Grid */}
            <div className="hidden md:grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {mediaGallery.map((item, index) => {
              const MediaIcon = getMediaIcon(item.type);
              return <ScrollAnimationWrapper key={item.id} direction="bottom" delay={200 + index * 50}>
                  <Card className="overflow-hidden hover:shadow-sm sm:hover:shadow-lg transition-shadow duration-300 group">
                      <div onClick={() => openVideoModal(item)} className="relative h-48 rounded-xl overflow-hidden group cursor-pointer bg-muted">
                        <img 
                          src={item.thumbnail} 
                          alt={item.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          onError={(e) => {
                            // Fallback to hqdefault if maxresdefault fails
                            const img = e.target as HTMLImageElement;
                            if (img.src.includes('maxresdefault')) {
                              img.src = img.src.replace('maxresdefault', 'hqdefault');
                            }
                          }}
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Play className="h-16 w-16 text-white" />
                        </div>
                      </div>
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.type === "video" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"}`}>
                            {item.type === "video" ? "Video" : "Image"}
                          </span>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            {item.date}
                          </div>
                        </div>
                        <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                      </CardHeader>
                      
                      <CardContent>
                        <p className="text-muted-foreground mb-4 text-sm">{item.description}</p>
                        <Button variant="outline" size="sm" className="w-full" onClick={() => openVideoModal(item)}>
                          View Video
                        </Button>
                      </CardContent>
                    </Card>
                  </ScrollAnimationWrapper>;
            })}
            </div>

            {/* Media Gallery - Mobile Carousel */}
            <div className="md:hidden">
              {/* Pagination Dots */}
              <ScrollAnimationWrapper direction="top" delay={200}>
                <div className="flex justify-center items-center mb-6 space-x-2">
                  {mediaGallery.map((_, index) => <button key={index} onClick={() => setCurrentMediaIndex(index)} className={`h-3 rounded-full transition-all duration-300 ${index === currentMediaIndex ? 'bg-primary w-8 shadow-lg shadow-primary/30' : 'bg-primary/40 hover:bg-primary/60 w-3'}`} aria-label={`Go to media ${index + 1}`} />)}
                </div>
              </ScrollAnimationWrapper>

              {/* Navigation Container */}
              <ScrollAnimationWrapper direction="bottom" delay={300}>
                <div className={`relative touch-pan-x transition-all duration-300 ${isTouchActive ? 'shadow-2xl shadow-primary/20' : ''} ${
                  isAnimating 
                    ? swipeDirection === 'left' 
                      ? 'animate-slide-out-left' 
                      : 'animate-slide-out-right'
                    : ''
                }`} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={() => handleTouchEnd('media')} onTouchCancel={handleTouchCancel} style={{
                touchAction: 'auto'
              }}>
                  {/* Previous Arrow */}
                  <button onClick={goToPreviousMedia} className="absolute left-1 top-1/2 -translate-y-1/2 z-20 text-foreground/60 hover:text-foreground text-3xl font-bold transition-all duration-200 hover:scale-110" aria-label="Previous media">
                    ‹
                  </button>

                  {/* Next Arrow */}
                  <button onClick={goToNextMedia} className="absolute right-1 top-1/2 -translate-y-1/2 z-20 text-foreground/60 hover:text-foreground text-3xl font-bold transition-all duration-200 hover:scale-110" aria-label="Next media">
                    ›
                  </button>

                  {/* Single Media Display */}
                  <div className="px-6">
                    {mediaGallery[currentMediaIndex] && <div className="flex justify-center">
                        <div className="w-full max-w-sm">
                          <ScrollAnimationWrapper direction="top" delay={200 + currentMediaIndex * 100}>
                            <Card className="overflow-hidden hover:shadow-sm sm:hover:shadow-lg transition-shadow duration-300 group">
                                <div onClick={() => openVideoModal(mediaGallery[currentMediaIndex])} className="relative h-48 rounded-xl overflow-hidden group cursor-pointer bg-muted">
                                  <img 
                                    src={mediaGallery[currentMediaIndex].thumbnail} 
                                    alt={mediaGallery[currentMediaIndex].title}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                    onError={(e) => {
                                      // Fallback to hqdefault if maxresdefault fails
                                      const img = e.target as HTMLImageElement;
                                      if (img.src.includes('maxresdefault')) {
                                        img.src = img.src.replace('maxresdefault', 'hqdefault');
                                      }
                                    }}
                                  />
                                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <Play className="h-16 w-16 text-white" />
                                  </div>
                                </div>
                                <CardHeader>
                                  <div className="flex items-center justify-between mb-2">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${mediaGallery[currentMediaIndex].type === "video" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"}`}>
                                      {mediaGallery[currentMediaIndex].type === "video" ? "Video" : "Image"}
                                    </span>
                                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                      <Calendar className="h-4 w-4" />
                                      {mediaGallery[currentMediaIndex].date}
                                    </div>
                                  </div>
                                  <CardTitle className="text-lg line-clamp-2">{mediaGallery[currentMediaIndex].title}</CardTitle>
                                </CardHeader>
                                
                                <CardContent>
                                  <p className="text-muted-foreground mb-4 text-sm">{mediaGallery[currentMediaIndex].description}</p>
                                  <Button variant="outline" size="sm" className="w-full" onClick={() => openVideoModal(mediaGallery[currentMediaIndex])}>
                                    View Video
                                  </Button>
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
        </section>

        {/* YouTube Video Modal */}
        {isVideoModalOpen && selectedVideo && <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-full max-h-[90vh] flex flex-col">
              <div className="flex items-center justify-between p-6 border-b">
                <h3 className="font-semibold text-lg">{selectedVideo.title}</h3>
                <Button variant="ghost" onClick={closeVideoModal} size="sm">
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex-1 p-6 flex items-center justify-center">
                <iframe width="100%" height="100%" className="rounded-xl" src={selectedVideo.youtubeUrl.replace("watch?v=", "embed/")} title={selectedVideo.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              </div>
            </div>
          </div>}

        {/* Press Coverage */}
        <section className="py-24">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <ScrollAnimationWrapper direction="top">
                <h2 className="text-3xl font-bold tracking-tight text-foreground mb-6">
                  Press Coverage
                </h2>
              </ScrollAnimationWrapper>
              <ScrollAnimationWrapper direction="top" delay={100}>
                <p className="text-lg leading-8 text-muted-foreground">
                  Recent news and media coverage of our work and impact in affordable housing.
                </p>
              </ScrollAnimationWrapper>
            </div>

            {/* Press Coverage - Desktop 2x2 Grid with Pagination */}
            <div className="hidden md:block">
              {/* Navigation Arrows */}
              <div className="flex justify-between items-center mb-6">
                <button onClick={goToPreviousPressPage} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" aria-label="Previous page">
                  <span className="text-xl">‹</span>
                  Previous
                </button>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Page {currentPressPage + 1} of {totalPressPages}
                  </span>
                </div>
                
                <button onClick={goToNextPressPage} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" aria-label="Next page">
                  Next
                  <span className="text-xl">›</span>
                </button>
              </div>

              {/* 2x2 Grid */}
              <div className="grid grid-cols-2 gap-6">
                {getCurrentPageItems(pressReleases, currentPressPage).map((article, index) => <ScrollAnimationWrapper key={article.id} direction="bottom" delay={200 + index * 50}>
                    <Card className="hover:shadow-sm sm:hover:shadow-lg transition-shadow duration-300">
                        <CardHeader>
                          <div className="flex items-center justify-between mb-2">
                            <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                              Press Coverage
                            </span>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              {article.date}
                            </div>
                          </div>
                          <CardTitle className="text-lg line-clamp-2 mb-2">{article.title}</CardTitle>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Newspaper className="h-4 w-4" />
                            {article.source}
                          </div>
                        </CardHeader>
                        
                        <CardContent>
                          <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                          <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={() => handleArticleAction(article)}>
                            {article.type === "external" ? <>
                                <ExternalLink className="h-4 w-4" />
                                Read Full Article
                              </> : <>
                                <Newspaper className="h-4 w-4" />
                                Read Article
                              </>}
                          </Button>
                        </CardContent>
                      </Card>
                  </ScrollAnimationWrapper>)}
              </div>

              {/* Pagination Dots */}
              <div className="flex justify-center items-center mt-8 space-x-2">
                {Array.from({
                length: totalPressPages
              }, (_, index) => <button key={index} onClick={() => setCurrentPressPage(index)} className={`h-3 rounded-full transition-all duration-300 ${index === currentPressPage ? 'bg-primary w-8 shadow-lg shadow-primary/30' : 'bg-primary/40 hover:bg-primary/60 w-3'}`} aria-label={`Go to page ${index + 1}`} />)}
              </div>
            </div>

            {/* Press Coverage - Mobile Carousel */}
            <div className="md:hidden">
              {/* Pagination Dots */}
              <ScrollAnimationWrapper direction="top" delay={200}>
                <div className="flex justify-center items-center mb-6 space-x-2">
                  {pressReleases.map((_, index) => <button key={index} onClick={() => setCurrentPressIndex(index)} className={`h-3 rounded-full transition-all duration-300 ${index === currentPressIndex ? 'bg-primary w-8 shadow-lg shadow-primary/30' : 'bg-primary/40 hover:bg-primary/60 w-3'}`} aria-label={`Go to article ${index + 1}`} />)}
                </div>
              </ScrollAnimationWrapper>

              {/* Navigation Container */}
              <ScrollAnimationWrapper direction="bottom" delay={300}>
                <div className={`relative touch-pan-x transition-all duration-300 ${isTouchActive ? 'shadow-2xl shadow-primary/20' : ''} ${
                  isAnimating 
                    ? swipeDirection === 'left' 
                      ? 'animate-slide-out-left' 
                      : 'animate-slide-out-right'
                    : ''
                }`} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={() => handleTouchEnd('press')} onTouchCancel={handleTouchCancel} style={{
                touchAction: 'auto'
              }}>
                  {/* Previous Arrow */}
                  <button onClick={goToPreviousPress} className="absolute left-1 top-1/2 -translate-y-1/2 z-20 text-foreground/60 hover:text-foreground text-3xl font-bold transition-all duration-200 hover:scale-110" aria-label="Previous article">
                    ‹
                  </button>

                  {/* Next Arrow */}
                  <button onClick={goToNextPress} className="absolute right-1 top-1/2 -translate-y-1/2 z-20 text-foreground/60 hover:text-foreground text-3xl font-bold transition-all duration-200 hover:scale-110" aria-label="Next article">
                    ›
                  </button>

                  {/* Single Article Display */}
                  <div className="px-6">
                    {pressReleases[currentPressIndex] && <div className="flex justify-center">
                        <div className="w-full max-w-sm">
                          <ScrollAnimationWrapper direction="top" delay={200 + currentPressIndex * 100}>
                            <Card className="hover:shadow-sm sm:hover:shadow-lg transition-shadow duration-300">
                                <CardHeader>
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                                      Press Coverage
                                    </span>
                                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                      <Calendar className="h-4 w-4" />
                                      {pressReleases[currentPressIndex].date}
                                    </div>
                                  </div>
                                  <CardTitle className="text-lg line-clamp-2 mb-2">{pressReleases[currentPressIndex].title}</CardTitle>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Newspaper className="h-4 w-4" />
                                    {pressReleases[currentPressIndex].source}
                                  </div>
                                </CardHeader>
                                
                                <CardContent>
                                  <p className="text-muted-foreground mb-4">{pressReleases[currentPressIndex].excerpt}</p>
                                  <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={() => handleArticleAction(pressReleases[currentPressIndex])}>
                                    {pressReleases[currentPressIndex].type === "external" ? <>
                                        <ExternalLink className="h-4 w-4" />
                                        Read Full Article
                                      </> : <>
                                        <Newspaper className="h-4 w-4" />
                                        Read Article
                                      </>}
                                  </Button>
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
        </section>

        {/* Article Modal */}
        {isArticleModalOpen && selectedArticle && <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-full max-h-[90vh] flex flex-col">
              <div className="flex items-center justify-between p-6 border-b">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                    <Newspaper className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{selectedArticle.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{selectedArticle.source}</span>
                      <span>{selectedArticle.date}</span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" onClick={closeArticleModal} size="sm">
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex-1 overflow-auto p-6">
                <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{
              __html: selectedArticle.fullText
            }} />
              </div>
            </div>
          </div>}

        {/* Anhart 4 Steps Video */}
        <section className="py-24 bg-muted/30">
          <div className="mx-auto max-w-5xl px-6 lg:px-8 text-center">
            <ScrollAnimationWrapper direction="top">
              <h2 className="text-3xl font-bold tracking-tight text-foreground mb-6">
                Anhart's 4-Step Process
              </h2>
            </ScrollAnimationWrapper>
            <ScrollAnimationWrapper direction="top" delay={100}>
              <p className="text-lg leading-8 text-muted-foreground mb-8">
                Discover how we work with communities to get started with developing affordable housing solutions.
              </p>
            </ScrollAnimationWrapper>
        
            <ScrollAnimationWrapper direction="bottom" delay={200}>
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-sm sm:shadow-lg">
                <video className="w-full h-full object-cover" controls>
                  <source src={anhart4Steps} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                <div className="absolute top-2 right-4 bg-black/60 text-white text-sm px-3 py-1 rounded-lg hover:bg-red-600 transition-colors pointer-events-none">
                  <a className="pointer-events-auto" href="https://youtu.be/h-Y6aceJmaw?si=UgFVJbwXHdPMpgWi" target="_blank" rel="noopener noreferrer">
                    Watch on YouTube
                  </a>
                </div>
              </div>
            </ScrollAnimationWrapper>
          </div>
        </section>

        {/* { Media Kit }
         <section className="py-24 bg-muted/30">
          <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-6">
              Media Kit
            </h2>
            <p className="text-lg leading-8 text-muted-foreground mb-8">
              Resources for journalists, researchers, and partners covering affordable housing topics.
            </p>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <Newspaper className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Press Releases</h3>
                  <p className="text-sm text-muted-foreground">Latest announcements and news</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <Image className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Photos & Graphics</h3>
                  <p className="text-sm text-muted-foreground">High-resolution images and logos</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <Play className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Video Content</h3>
                  <p className="text-sm text-muted-foreground">B-roll footage and interviews</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                Download Media Kit
              </Button>
              <Button variant="outline" size="lg">
                Contact Media Relations
              </Button>
            </div>
          </div>
         </section> */}
      </main>
      <Footer />
    </div>;
};
export default Media;