'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";

const anhartLogoWebp = "/images/anhart-logo-text.webp";
const anhartLogoPng = "/images/anhart-logo-text.png";

const navigation = [{ name: "Home", href: "/" }];

const aboutUsDropdown = [
  { name: "Our Story", href: "/about" },
  { name: "News & Media", href: "/media" },
  { name: "Blog", href: "/blog" },
];

const portfolioDropdown = [
  { name: "Projects", href: "/portfolio" },
  { name: "Impact Investing", href: "/limited-partnership" },
];

const connectDropdown = [
  { name: "Partner With Us", href: "/partner" },
  { name: "Contact Us", href: "/contact" },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Desktop dropdown states
  const [aboutUsDropdownOpen, setAboutUsDropdownOpen] = useState(false);
  const [portfolioDropdownOpen, setPortfolioDropdownOpen] = useState(false);
  const [connectDropdownOpen, setConnectDropdownOpen] = useState(false);

  // Mobile accordion state
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);

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
      document.body.style.overflow = "hidden";
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
    setActiveMobileDropdown(activeMobileDropdown === dropdownName ? null : dropdownName);
  };

  return (
    <>
      <header className={`header ${isScrolled ? "shrunk" : ""}`}>
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8 h-full">
          <div className="flex lg:flex-1">
            <a href="/" className="flex items-center">
              <picture>
                <source srcSet={anhartLogoWebp} type="image/webp" />
                <img src={anhartLogoPng} alt="Anhart" className="header-logo" width="405" height="160" loading="eager" fetchPriority="high" />
              </picture>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              {mobileMenuOpen ? <X className="h-9 w-9" /> : <Menu className="h-9 w-9" />}
            </Button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:gap-x-6 lg:ml-auto lg:mr-4 text-lg">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="header-nav-link pt-2.5">
                {item.name}
              </a>
            ))}

            <Dropdown
              title="About Us"
              items={aboutUsDropdown}
              open={aboutUsDropdownOpen}
              setOpen={setAboutUsDropdownOpen}
            />

            <Dropdown
              title="Portfolio"
              items={portfolioDropdown}
              open={portfolioDropdownOpen}
              setOpen={setPortfolioDropdownOpen}
            />

            <Dropdown
              title="Connect With Us"
              items={connectDropdown}
              open={connectDropdownOpen}
              setOpen={setConnectDropdownOpen}
            />
          </div>
        </nav>
      </header>

      {/* Mobile overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/50 transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100 z-40" : "opacity-0 pointer-events-none -z-10"
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

const Dropdown = ({ title, items, open, setOpen }: any) => (
  <div className="relative group">
    <button
      className="header-nav-link flex items-center"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onClick={() => setOpen(!open)}
    >
      {title}
      <ChevronDown className="ml-1 h-7 w-7" />
    </button>
    <div
      className={`absolute top-full left-0 mt-1 w-48 bg-background/95 backdrop-blur-md border border-border shadow-lg z-50 transition-all duration-200 overflow-hidden rounded-lg ${
        open ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
      }`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="py-2">
        {items.map((item: any, index: number) => (
          <a
            key={item.name}
            href={item.href}
            className="block px-4 py-2.5 text-sm font-medium text-foreground/80 hover:text-primary transition-all duration-150 border-l-2 border-transparent"
            style={{ transitionDelay: `${index * 25}ms` }}
          >
            {item.name}
          </a>
        ))}
      </div>
    </div>
  </div>
);

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
    <div className="px-6 py-6 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="flex items-center">
        <picture>
          <source srcSet={anhartLogoWebp} type="image/webp" />
          <img src={anhartLogoPng} alt="Anhart" className="h-10 w-auto" width="405" height="160" loading="lazy" />
        </picture>
      </div>
    </div>

    <div className="px-6 py-6">
      <nav className="space-y-1" role="navigation">
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
          title="About Us"
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
      <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
    </button>
    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-60" : "max-h-0"}`}>
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
