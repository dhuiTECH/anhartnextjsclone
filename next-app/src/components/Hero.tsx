"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, X } from "lucide-react";
import anhartLogoImg from "@/assets/anhart-logo.png";
import { ScrollAnimationWrapper } from "@/components/animations/ScrollAnimationWrapper";
import { useEffect, useRef, useState, useCallback } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Turnstile } from "@/components/Turnstile";

const anhartLogo =
  typeof anhartLogoImg === "string" ? anhartLogoImg : anhartLogoImg?.src || "";

const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbzfMQYjHKQSR5lOwodWizxUoY4NgB1y03O3tAbHSBCV4ZgpgDbu-4xNbkUTl18lTZzw/exec";

export const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Turnstile state
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileKey, setTurnstileKey] = useState(0);

  // Turnstile callbacks (memoized to prevent re-render loops)
  const handleTurnstileSuccess = useCallback((token: string) => {
    setTurnstileToken(token);
  }, []);

  const handleTurnstileError = useCallback(() => {
    setTurnstileToken(null);
  }, []);

  const handleTurnstileExpire = useCallback(() => {
    setTurnstileToken(null);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate Turnstile token
    if (!turnstileToken) {
      alert("Please complete the verification.");
      return;
    }

    setIsSubmitting(true);

    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("turnstile_token", turnstileToken);

    try {
      const res = await fetch(GOOGLE_SHEET_URL, { method: "POST", body: data });
      if (res.ok) {
        setIsSuccess(true);
        form.reset();
        setFormData({
          name: "",
          email: "",
          phone: "",
          location: "",
          message: "",
        });
        setTurnstileToken(null);
        setTurnstileKey((prev) => prev + 1);
        setTimeout(() => {
          setIsDialogOpen(false);
          setIsSuccess(false);
        }, 3000);
      } else {
        alert("Failed. Try again.");
      }
    } catch {
      alert("No internet.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      // Disable parallax on mobile
      const handleScroll = () => {
        const scrolled = window.pageYOffset;
        const heroHeight = window.innerHeight * 0.85; // ADJUST THIS: Original was 0.85—increase to 0.95 for more parallax room, but watch for overlap
        if (scrolled <= heroHeight) {
          const videoRate = scrolled * -0.5;
          const contentRate = scrolled * 0.15;
          if (videoRef.current) {
            videoRef.current.style.transform = `translateY(${videoRate}px)`;
          }
          if (contentRef.current) {
            contentRef.current.style.transform = `translateY(${contentRate}px)`;
          }
        }
      };
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isMobile]);

  return (
    <section
      className="relative h-[85vh] sm:h-[95vh] w-full overflow-hidden" // ADJUST THIS: Original heights—change percentages for size (e.g., 90vh for medium)
      aria-label="Hero section with affordable housing information"
    >
      {/* Anhart logo as backdrop */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 z-0"
        style={{
          backgroundImage: `url(${anhartLogo})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      />
      {/* Fallback background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/70 to-primary/90 z-[0.5]" />
      {/* Full-screen background video with extended height for parallax */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full object-cover z-[1]"
        style={{
          height: isMobile ? "100vh" : "150vh", // ADJUST THIS: Original 150vh on desktop for parallax—reduce to 130vh if too tall
          minHeight: isMobile ? "100vh" : "150vh",
        }}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-label="Background video showing housing development animation"
      >
        <source src="/mediaAssets/hero-background-video.mp4" type="video/mp4" />
      </video>
      {/* Centered content container */}
      <div
        ref={contentRef}
        className="relative z-30 h-lvh flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 bg-black/20 rounded-lg py-4"
      >
        <div className="text-center">
          <ScrollAnimationWrapper direction="top" delay={100}>
            <h1 className="text-4xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-white mb-4 sm:mb-6 [text-shadow:_0_4px_16px_rgba(0,0,0,0.8)]">
              The Power of Small
            </h1>
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper direction="top" delay={200}>
            <p className="text-base sm:text-xl md:text-2xl lg:text-3xl text-white font-light bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] tracking-wider">
              Redefining Affordable Housing Development
            </p>
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper direction="top" delay={250}>
            <h2 className="text-xs sm:text-base md:text-base lg:text-xl font-semibold text-white/80 mb-6 [text-shadow:_0_2px_8px_rgba(0,0,0,0.7)]">
              (Free Pre-Development Consultation - Across Canada)
            </h2>
          </ScrollAnimationWrapper>
          {/* Buttons positioned below text */}
          <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Mobile: Side-by-side buttons */}
            <div className="flex flex-row gap-2 sm:hidden w-full max-w-sm">
              <ScrollAnimationWrapper
                direction="bottom"
                delay={300}
                className="flex-1"
              >
                <a
                  href="https://anhart.ca/portfolio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button
                    name="explore our work"
                    size="sm"
                    variant="outline"
                    className="bg-white/5 backdrop-blur-sm border-white/30 text-white font-semibold px-3 py-2 text-sm w-full hover:bg-white/15 hover:border-white/50 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Explore Projects
                    <span className="ml-1 text-sm font-bold">{">"}</span>
                  </Button>
                </a>
              </ScrollAnimationWrapper>
              <ScrollAnimationWrapper
                direction="bottom"
                delay={400}
                className="flex-1"
              >
                <Dialog
                  open={isDialogOpen}
                  onOpenChange={(open) => {
                    setIsDialogOpen(open);
                    if (!open) setIsSuccess(false);
                  }}
                >
                  <DialogTrigger asChild>
                    <Button
                      name="Book Now"
                      size="sm"
                      variant="outline"
                      className="bg-primary/60 backdrop-blur-md text-white hover:bg-white hover:text-primary font-semibold px-3 py-2 text-sm w-full transition-all duration-300 border border-primary/50 hover:border-white shadow-lg hover:shadow-xl"
                    >
                      Book Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-md border border-primary/20 shadow-2xl">
                    <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                      <X className="h-4 w-4" />
                      <span className="sr-only">Close</span>
                    </DialogClose>
                    <DialogHeader className="pb-2">
                      <DialogTitle className="text-xl font-bold text-primary pb">
                        Free Consultation
                      </DialogTitle>
                      <DialogDescription className="text-muted-foreground">
                        Tell us about your project.
                      </DialogDescription>
                    </DialogHeader>
                    {isSuccess ? (
                      <div className="text-center py-6">
                        <p className="text-green-600 font-semibold">
                          Your form has been successfully sent!
                        </p>
                        <p className="text-muted-foreground mt-2">
                          We will reach out within 24-48 hours.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit}>
                        <div>
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Your full name"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your.email@example.com"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone (optional)</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="(123) 456-7890"
                          />
                        </div>
                        <div>
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            placeholder="e.g., Toronto, ON"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="message">Message</Label>
                          <Textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Details about your project..."
                            rows={4}
                            required
                          />
                        </div>
                        <div className="flex justify-center" key={turnstileKey}>
                          <Turnstile
                            siteKey="0x4AAAAAACBhtHfX5mcNUA4m"
                            onSuccess={handleTurnstileSuccess}
                            onError={handleTurnstileError}
                            onExpire={handleTurnstileExpire}
                            theme="auto"
                            size="normal"
                          />
                        </div>
                        <DialogFooter>
                          <Button
                            type="submit"
                            disabled={isSubmitting || !turnstileToken}
                            className="w-full sm:w-auto"
                          >
                            {isSubmitting ? "Sending..." : "Send"}
                          </Button>
                        </DialogFooter>
                      </form>
                    )}
                  </DialogContent>
                </Dialog>
              </ScrollAnimationWrapper>
            </div>
            {/* Desktop: Original buttons */}
            <div className="hidden sm:flex flex-row items-center justify-center gap-4">
              <ScrollAnimationWrapper direction="bottom" delay={300}>
                <a
                  href="https://anhart.ca/portfolio"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    name="explore our work"
                    size="lg"
                    variant="outline"
                    className="bg-white/5 backdrop-blur-sm border-white/30 text-white font-semibold px-6 py-3 text-lg hover:bg-white/15 hover:border-white/50 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Explore Our Work
                    <span className="ml-2 text-lg font-bold">{">"}</span>
                  </Button>
                </a>
              </ScrollAnimationWrapper>
              <ScrollAnimationWrapper direction="bottom" delay={400}>
                <Dialog
                  open={isDialogOpen}
                  onOpenChange={(open) => {
                    setIsDialogOpen(open);
                    if (!open) setIsSuccess(false);
                  }}
                >
                  <DialogTrigger asChild>
                    <Button
                      name="Book Now"
                      size="lg"
                      variant="outline"
                      className="bg-primary/65 backdrop-blur-md text-white hover:bg-white hover:text-primary font-semibold px-6 py-3 text-lg w-[200px] flex-shrink-0 transition-all duration-300 border border-primary/50 hover:border-white shadow-lg hover:shadow-xl"
                    >
                      Book Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-md border border-primary/20 shadow-2xl">
                    <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                      <X className="h-4 w-4" />
                      <span className="sr-only">Close</span>
                    </DialogClose>
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-primary">
                        Free Consultation
                      </DialogTitle>
                      <DialogDescription className="text-muted-foreground">
                        Tell us about your project.
                      </DialogDescription>
                    </DialogHeader>
                    {isSuccess ? (
                      <div className="text-center py-6">
                        <p className="text-green-600 font-semibold">
                          Your form has been successfully sent!
                        </p>
                        <p className="text-muted-foreground mt-2">
                          We will reach out within 24-48 hours.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Your full name"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your.email@example.com"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone (optional)</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="(123) 456-7890"
                          />
                        </div>
                        <div>
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            placeholder="e.g., Toronto, ON"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="message">Message</Label>
                          <Textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Details about your project..."
                            rows={4}
                            required
                          />
                        </div>
                        <div className="flex justify-center" key={turnstileKey}>
                          <Turnstile
                            siteKey="0x4AAAAAACBhtHfX5mcNUA4m"
                            onSuccess={handleTurnstileSuccess}
                            onError={handleTurnstileError}
                            onExpire={handleTurnstileExpire}
                            theme="auto"
                            size="normal"
                          />
                        </div>
                        <DialogFooter>
                          <Button
                            type="submit"
                            disabled={isSubmitting || !turnstileToken}
                            className="w-full sm:w-auto"
                          >
                            {isSubmitting ? "Sending..." : "Send"}
                          </Button>
                        </DialogFooter>
                      </form>
                    )}
                  </DialogContent>
                </Dialog>
              </ScrollAnimationWrapper>
            </div>
          </div>
        </div>
      </div>
      {/* Scroll Down Arrow */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40"
        aria-label="Scroll indicator"
      >
        <div className="flex flex-col items-center gap-2">
          <ChevronDown
            strokeWidth={2.5}
            className="w-12 h-8 text-white animate-bounce-fade"
          />
        </div>
      </div>
    </section>
  );
};
