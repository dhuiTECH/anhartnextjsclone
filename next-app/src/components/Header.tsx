"use client";

import { useState, useEffect, useRef } from "react"; // Added useRef
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";

const anhartLogoWebp = "/images/anhart-logo-text.webp";
const anhartLogoPng = "/images/anhart-logo-text.png";

const navigation: { name: string; href: string }[] = [];

const aboutUsDropdown = [
  {
    name: "Our Story",
    href: "/about",
    description: "Learn about our journey, mission and values at Anhart",
  },
  {
    name: "News & Media",
    href: "/media",
    description:
      "Stay updated with our latest news and stories from our partners",
  },
  {
    name: "Blog",
    href: "/blog",
    description: "Read guides, insights and stories from our Anhart team",
  },
];

const portfolioDropdown = [
  {
    name: "Projects",
    href: "/portfolio",
    description:
      "Explore a few of our affordable housing projects across Canada",
  },
  {
    name: "Impact Investing",
    href: "/limited-partnership",
    description:
      "Learn about how you can invest in sustainable housing solutions",
  },
];

const connectDropdown = [
  {
    name: "Partner With Us",
    href: "/partner",
    description:
      "Join us in creating affordable housing solutions across Canada",
  },
  {
    name: "Contact Us",
    href: "/contact",
    description:
      "Get in touch with our team or learn about our contact information",
  },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Desktop dropdown states
  const [aboutUsDropdownOpen, setAboutUsDropdownOpen] = useState(false);
  const [portfolioDropdownOpen, setPortfolioDropdownOpen] = useState(false);
  const [connectDropdownOpen, setConnectDropdownOpen] = useState(false);

  // Mobile accordion state
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<
    string | null
  >(null);

  // Smooth scroll detection with throttling
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollPosition = window.scrollY;
          setIsScrolled(scrollPosition > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Esc key to close mobile menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (mobileMenuOpen) {
      setActiveMobileDropdown(null);
    }
  };

  const handleMobileDropdownToggle = (dropdownName: string) => {
    setActiveMobileDropdown(
      activeMobileDropdown === dropdownName ? null : dropdownName,
    );
  };

  return (
    <>
      <header className={`header ${isScrolled ? "shrunk" : ""}`}>
        <nav className="w-full flex items-center justify-between px-3 lg:px-10 h-full">
          {/* Left side: Logo */}
          <div className="flex items-center gap-x-6 h-full pt-1 pb-3">
            <a href="/" className="flex items-center">
              <picture>
                <source srcSet={anhartLogoWebp} type="image/webp" />
                <img
                  src={anhartLogoPng}
                  alt="Anhart"
                  className="header-logo"
                  width="405"
                  height="160"
                  loading="eager"
                  fetchPriority="high"
                />
              </picture>
            </a>

            {/* Desktop navigation - left side */}
            <div className="hidden lg:flex h-full text-lg">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="header-nav-link flex items-center h-full px-2"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden h-full items-center">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              {mobileMenuOpen ? (
                <X className="h-9 w-9" />
              ) : (
                <Menu className="h-9 w-9" />
              )}
            </Button>
          </div>

          {/* Right side: About + Portfolio + Connect With Us button */}
          <div className="hidden lg:flex h-full items-center gap-x-6">
            <div className="flex h-full text-lg">
              <Dropdown
                title="About"
                items={aboutUsDropdown}
                open={aboutUsDropdownOpen}
                setOpen={setAboutUsDropdownOpen}
                isScrolled={isScrolled}
              />

              <Dropdown
                title="Portfolio"
                items={portfolioDropdown}
                open={portfolioDropdownOpen}
                setOpen={setPortfolioDropdownOpen}
                isScrolled={isScrolled}
              />
            </div>
            <ConnectButton
              items={connectDropdown}
              open={connectDropdownOpen}
              setOpen={setConnectDropdownOpen}
              isScrolled={isScrolled}
            />
          </div>
        </nav>
      </header>

      {/* Mobile overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/50 transition-opacity duration-300 ${
          mobileMenuOpen
            ? "opacity-100 z-40"
            : "opacity-0 pointer-events-none -z-10"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile menu */}
      <MobileMenu
        open={mobileMenuOpen}
        navigation={navigation}
        aboutUsDropdown={aboutUsDropdown}
        portfolioDropdown={portfolioDropdown}
        connectDropdown={connectDropdown}
        activeMobileDropdown={activeMobileDropdown}
        onDropdownToggle={handleMobileDropdownToggle}
        closeMenu={() => setMobileMenuOpen(false)}
      />
    </>
  );
};

const Dropdown = ({ title, items, open, setOpen, isScrolled }: any) => {
  // NOTE: Ensure these numbers match your CSS .header height EXACTLY
  const headerHeight = isScrolled ? 64 : 72;

  // Use a ref to manage the timeout so we can clear it if the user moves mouse back
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 150); // 150ms buffer to bridge any gaps
  };

  return (
    <>
      {" "}
      {/* REFACTORED: No more wrapper div */}
      <button
        className="header-nav-link flex items-center h-full px-5"
        onClick={() => setOpen(!open)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {title}
        <ChevronDown
          className={`ml-2 h-5 w-5 text-gray-400/40 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`fixed right-4 w-[450px] z-50 transition-opacity duration-[50ms] pt-4 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        style={{
          // FIX: Subtract 1px to overlap the border and kill the gap
          top: `${headerHeight - 1}px`,
          maxHeight: `calc(100vh - ${headerHeight}px)`,
          height: "auto",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="bg-background/95 backdrop-blur-md border-l border-border shadow-lg rounded-lg overflow-hidden">
          <div className="py-4 px-4">
            {items.map((item: any, index: number) => (
              <a
                key={item.name}
                href={item.href}
                className={`block px-4 py-3 hover:bg-primary/10 hover:text-primary transition-all duration-[50ms] rounded-lg ${
                  open
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-2"
                }`}
                style={{ transitionDelay: `${index * 25}ms` }}
              >
                <div className="text-lg font-semibold text-[#333333] mb-1">
                  {item.name}
                </div>
                {item.description && (
                  <div className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </div>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const ConnectButton = ({ items, open, setOpen, isScrolled }: any) => {
  const headerHeight = isScrolled ? 64 : 72;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 150);
  };

  const handleScrollToContact = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      const headerOffset = headerHeight;
      // Use requestAnimationFrame to batch DOM reads and avoid forced reflow
      requestAnimationFrame(() => {
        const elementPosition = contactSection.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      });
    } else {
      // Fallback: navigate to home page with hash
      window.location.href = "/#contact";
    }
    setOpen(false);
  };

  return (
    // Wrapper here is needed for flex positioning in the parent, but logic is consistent
    <div className="relative h-full flex items-center">
      <button
        className="connect-nav-button flex items-center px-8 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-all duration-200"
        style={{ borderRadius: "50px" }}
        onClick={handleScrollToContact}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Connect With Us
        <ChevronDown
          className={`ml-2 h-4 w-4 text-white transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`fixed right-4 w-[450px] z-50 transition-opacity duration-[50ms] pt-4 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        style={{
          top: `${headerHeight - 1}px`,
          maxHeight: `calc(100vh - ${headerHeight}px)`,
          height: "auto",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="bg-background/95 backdrop-blur-md border-l border-border shadow-lg rounded-lg overflow-hidden">
          <div className="py-4 px-4">
            {items.map((item: any, index: number) => (
              <a
                key={item.name}
                href={item.href}
                className={`block px-4 py-3 hover:bg-primary/20 hover:text-primary transition-all duration-[50ms] rounded-lg ${
                  open
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-2"
                }`}
                style={{ transitionDelay: `${index * 25}ms` }}
              >
                <div className="text-lg font-semibold text-[#333333] mb-1">
                  {item.name}
                </div>
                {item.description && (
                  <div className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </div>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// MobileMenu and MobileAccordionDropdown remain unchanged
const MobileMenu = ({
  open,
  navigation,
  aboutUsDropdown,
  portfolioDropdown,
  connectDropdown,
  activeMobileDropdown,
  onDropdownToggle,
  closeMenu,
}: any) => (
  <div
    className="lg:hidden fixed top-0 bottom-0 z-50 max-w-[80vw] w-80 overflow-y-auto bg-background/95 backdrop-blur-md border-r border-border shadow-2xl transition-transform duration-300"
    style={{ transform: open ? "translateX(0)" : "translateX(-100%)" }}
  >
    {/* Mobile Header with Logo */}
    <div className="px-4 py-4 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="flex items-center">
        <picture>
          <source srcSet={anhartLogoWebp} type="image/webp" />
          <img
            src={anhartLogoPng}
            alt="Anhart"
            className="h-10 w-auto"
            width="405"
            height="160"
            loading="lazy"
          />
        </picture>
      </div>
    </div>

    <div className="px-6 py-6">
      <nav className="space-y-2" role="navigation">
        {navigation.map((item: any) => (
          <a
            key={item.name}
            href={item.href}
            className="block px-4 py-3 text-base font-semibold text-foreground hover:text-primary rounded-lg transition-all duration-200"
            onClick={closeMenu}
          >
            {item.name}
          </a>
        ))}

        <MobileAccordionDropdown
          title="About"
          items={aboutUsDropdown}
          isOpen={activeMobileDropdown === "about-us"}
          onToggle={() => onDropdownToggle("about-us")}
          closeMenu={closeMenu}
        />
        <MobileAccordionDropdown
          title="Portfolio"
          items={portfolioDropdown}
          isOpen={activeMobileDropdown === "portfolio"}
          onToggle={() => onDropdownToggle("portfolio")}
          closeMenu={closeMenu}
        />
        <MobileAccordionDropdown
          title="Connect With Us"
          items={connectDropdown}
          isOpen={activeMobileDropdown === "connect"}
          onToggle={() => onDropdownToggle("connect")}
          closeMenu={closeMenu}
        />
      </nav>
    </div>
  </div>
);

const MobileAccordionDropdown = ({
  title,
  items,
  isOpen,
  onToggle,
  closeMenu,
}: {
  title: string;
  items: any[];
  isOpen: boolean;
  onToggle: () => void;
  closeMenu: () => void;
}) => (
  <div className="rounded-lg overflow-hidden">
    <button
      className="flex items-center justify-between w-full px-4 py-3 text-base font-semibold text-foreground hover:text-primary rounded-lg transition-all duration-200"
      onClick={onToggle}
    >
      {title}
      <ChevronDown
        className={`ml-1 h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
      />
    </button>
    <div
      className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-60" : "max-h-0"}`}
    >
      <div className="mt-1 space-y-1">
        {items.map((item: any) => (
          <a
            key={item.name}
            href={item.href}
            className="block px-8 py-2.5 text-sm font-medium text-foreground/80 hover:text-primary rounded-lg transition-all duration-200 ml-4"
            onClick={closeMenu}
          >
            {item.name}
          </a>
        ))}
      </div>
    </div>
  </div>
);
