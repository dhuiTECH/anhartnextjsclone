'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, ChevronDown, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/Merritt/interiors', label: 'Interiors' },
  { href: '/Merritt/floorplans', label: 'Floor Plans' },
  { href: '/Merritt/neighbourhood', label: 'Neighbourhood' },
  {
    label: 'Relocation',
    dropdown: [
      { href: '/Merritt/relocation/kamloops', label: 'Kamloops' },
      { href: '/Merritt/relocation/kelowna', label: 'Kelowna' },
      { href: '/Merritt/relocation/vancouver', label: 'Vancouver' },
    ]
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Use a ref for lastScrollY to ensure it persists correctly across renders
  const lastScrollY = useRef(0);
  const navRef = useRef<HTMLElement>(null);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const isRelocationActive = pathname.startsWith('/Merritt/relocation');

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node) && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // --- SCROLL LOGIC ---
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Debugging: Check your console to see if numbers change!
      // console.log("Scrolling:", currentScrollY); 

      // 1. If at the top (or negative scroll like on Mac), always show navbar
      if (currentScrollY <= 10) {
        setIsScrolled(false);
        lastScrollY.current = currentScrollY;
        return;
      }

      // 2. Check direction
      // We add a tiny buffer (5px) so small jitters don't trigger it
      if (currentScrollY > lastScrollY.current + 5) {
        // Scrolling DOWN -> Hide
        setIsScrolled(true);
      } else if (currentScrollY < lastScrollY.current - 5) {
        // Scrolling UP -> Show
        setIsScrolled(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const linkClass = (href: string) =>
    `hover:text-[#a6906c] transition-colors ${
      isActive(href) ? 'text-[#a6906c]' : ''
    }`;

  const contactActive = pathname.startsWith('/Merritt/contact')
    ? 'bg-[#1a2621] text-white'
    : 'hover:bg-[#a6906c] hover:text-white';

  return (
    <nav
      ref={navRef}
      id="navbar"
      // REMOVED 'relative' class. Kept 'fixed'.
      className={`fixed w-full z-50 bg-white backdrop-blur-md text-[#1a2621] shadow-sm transition-transform duration-300 px-4 md:px-0 border-b border-[#e6e2da] overflow-visible ${
        isScrolled ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="container mx-auto px-12 md:px-20 py-4 flex justify-between items-center">
        <Link href="/" className="text-center group flex flex-col items-center">
          <img
            src="/anhartmerritt1.png"
            alt="Merritt Realty Logo"
            className="h-14 w-auto group-hover:opacity-80 hover:scale-105 hover:drop-shadow-xl transition-all duration-300 drop-shadow-lg"
          />
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm tracking-wider uppercase font-semibold text-[#1a2621]" style={{ fontFamily: 'Inter, sans-serif' }}>
          {navLinks.map((link) => {
            if (link.dropdown) {
              return (
                <div
                  key={link.label}
                  className="relative group"
                >
                  <button
                    className={`flex items-center gap-1 text-sm tracking-wider uppercase font-semibold hover:text-[#a6906c] transition-colors ${isRelocationActive ? 'text-[#a6906c]' : ''}`}
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {link.label}
                    <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                  </button>
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-[#e6e2da] shadow-lg rounded-md py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out transform translate-y-[-10px] group-hover:translate-y-0">
                      {link.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.href}
                          href={dropdownItem.href}
                          className={`block px-4 py-2 text-sm tracking-wider uppercase font-semibold hover:bg-[#f9f8f6] transition-colors ${isActive(dropdownItem.href) ? 'text-[#a6906c] bg-[#f9f8f6]' : 'text-[#1a2621]'}`}
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </div>
                </div>
              );
            }
            return (
              <Link key={link.href} href={link.href} className={linkClass(link.href)} style={{ fontFamily: 'Inter, sans-serif' }}>
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/Merritt/contact"
            className={`px-6 py-2.5 border border-[#1a2621] transition-all duration-300 glow-hover ${contactActive}`}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Register Today
          </Link>
        </div>
        <button
          className="md:hidden text-[#1a2621] p-2 mr-2 hover:bg-gray-100 rounded"
          onClick={(e) => {
            e.stopPropagation();
            setIsMobileMenuOpen(!isMobileMenuOpen);
          }}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="block md:hidden bg-white border-t border-[#e6e2da] shadow-lg absolute top-full left-0 right-0 z-40 w-full min-h-screen">
          <div className="px-6 py-6 space-y-4 max-w-full overflow-hidden">
            {navLinks.map((link) => {
              if (link.dropdown) {
                return (
                  <div key={link.label} className="space-y-2">
                    <div className={`text-sm tracking-wider uppercase font-semibold ${isRelocationActive ? 'text-[#a6906c]' : 'text-[#1a2621]'}`}>
                      {link.label}
                    </div>
                    <div className="ml-4 space-y-2">
                      {link.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.href}
                          href={dropdownItem.href}
                          className={`block text-sm tracking-wider uppercase font-semibold py-2 px-1 ${isActive(dropdownItem.href) ? 'text-[#a6906c]' : 'text-[#1a2621] hover:text-[#a6906c]'}`}
                          style={{ fontFamily: 'Inter, sans-serif' }}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block text-sm tracking-wider uppercase font-semibold py-2 px-1 ${linkClass(link.href)}`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-4 border-t border-[#e6e2da]">
              <Link
                href="/Merritt/contact"
                className={`block text-center px-6 py-3 border border-[#1a2621] transition-all duration-300 ${contactActive}`}
                style={{ fontFamily: 'Inter, sans-serif' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Register Today
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}