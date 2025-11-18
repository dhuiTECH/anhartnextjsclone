'use client';

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Facebook, Twitter, Linkedin, Instagram, Mail, MapPin } from "lucide-react";
import anhartLogoImg from "@/assets/anhart-logo-white.webp";
import { CONTACT_INFO, AddressUtils } from "@/config/address";
import { openGoogleMapsSearch } from "@/utils/externalLinks";
import { useNewsletterSubscription } from "@/hooks/useNewsletterSubscription";
import { Turnstile } from "@/components/Turnstile";

const anhartLogo = typeof anhartLogoImg === 'string' ? anhartLogoImg : anhartLogoImg?.src || '';

// Social media links - only used section
const socialLinks = [{
  name: "Facebook",
  href: "https://www.facebook.com/anhartsolutions?rdid=RVW0ZiZ1JKyW8dI3&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2FnG5gD4iinFYGjyeT%2F",
  icon: Facebook
}, {
  name: "Twitter",
  href: "https://x.com/anharthousing",
  icon: Twitter
}, {
  name: "LinkedIn",
  href: "https://ca.linkedin.com/company/anhart",
  icon: Linkedin
}, {
  name: "Instagram",
  href: "https://www.instagram.com/anharthousing/",
  icon: Instagram
}];
export const Footer = () => {
  const [email, setEmail] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileKey, setTurnstileKey] = useState(0);
  const [honeypot, setHoneypot] = useState("");
  
  const {
    subscribe,
    isSubmitting
  } = useNewsletterSubscription();

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

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Honeypot check - if filled, it's likely a bot
    if (honeypot && honeypot.trim() !== "") {
      console.log("Bot detected via honeypot");
      return; // Silently reject the submission
    }

    // Validate Turnstile token
    if (!turnstileToken) {
      return; // Prevent submission without Turnstile verification
    }

    const success = await subscribe(email, turnstileToken);
    if (success) {
      setEmail(""); // Clear form on success
      setHoneypot(""); // Clear honeypot
      setTurnstileToken(null);
      setTurnstileKey((prev) => prev + 1); // Reset Turnstile
    }
  };
  return (
    <footer className="bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16 lg:py-20 lg:px-8">
          
          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-3 lg:gap-12">
            {/* Company Info Section */}
            <div className="space-y-8">
              <div>
                <img className="h-12 w-auto" src={anhartLogo} alt="Anhart" width="405" height="160" loading="lazy" />
              </div>
              <div className="space-y-4">
                <p className="text-base leading-7 text-background/90 font-medium">Building communities through affordable housing.</p>
                <p className="text-sm leading-6 text-background/80">
                  Creating inclusive, sustainable communities where everyone has access to safe, quality homes across Canada.
                </p>
              </div>
              <div className="flex space-x-6">
                {socialLinks.map(item => <a key={item.name} href={item.href} target="_blank" rel="noopener noreferrer" className="text-background/70 hover:text-background transition-colors duration-200" aria-label={`Follow us on ${item.name}`}>
                    <item.icon className="h-6 w-6" />
                  </a>)}
              </div>
            </div>
            
            {/* Contact & Newsletter Section */}
            <div className="col-span-2">
              <div className="grid grid-cols-2 gap-12">
                
                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold leading-7 text-background mb-6">
                    Get In Touch
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-semibold text-background mb-2 flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Main Office
                      </h4>
                      <button onClick={() => openGoogleMapsSearch(AddressUtils.getGoogleMapsAddress())} className="block text-sm leading-6 text-background/80 hover:text-background transition-colors duration-200 group text-left focus:outline-none focus:ring-2 focus:ring-background/50 focus:ring-opacity-50 rounded p-1">
                        <address className="not-italic group-hover:underline">
                          {AddressUtils.getAddressLines().map((line, index) => <React.Fragment key={index}>
                              {line}
                              {index < AddressUtils.getAddressLines().length - 1 && <br />}
                            </React.Fragment>)}
                        </address>
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="pl-[2px]">
                        <h4 className="text-sm font-semibold text-background mb-2">Phone</h4>
                        <a href={`tel:${CONTACT_INFO.phone.replace(/[^\d]/g, '')}`} className="block text-sm leading-6 text-background/80 hover:text-background transition-colors duration-200 pl-[6px] pr-[1px] -ml-1 focus:outline-none focus:ring-2 focus:ring-background/50 focus:ring-opacity-50 rounded">
                          {CONTACT_INFO.phone}
                        </a>
                      </div>
                      <div className="pl-[2px]">
                        <h4 className="text-sm font-semibold text-background mb-2">Email</h4>
                        <a href={`mailto:${CONTACT_INFO.email}`} className="block text-sm leading-6 text-background/80 hover:text-background transition-colors duration-200 pl-[6px] pr-[1px] -ml-1 focus:outline-none focus:ring-2 focus:ring-background/50 focus:ring-opacity-50 rounded">
                          {CONTACT_INFO.email}
                        </a>
                      </div>
                    </div>
                    
                    
                  </div>
                </div>
                
                {/* Newsletter Signup */}
                <div>
                  <h3 className="text-lg font-semibold leading-7 text-background mb-6">
                    Stay Updated
                  </h3>
                  <div className="space-y-4">
                    <p className="text-sm leading-6 text-background/80">
                      Subscribe to our newsletter for the latest housing news, project updates, and community impact stories.
                    </p>
                    <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                      <div className="flex gap-x-3">
                        <Input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} required disabled={isSubmitting} className="flex-1 bg-background/10 text-background placeholder:text-background/60 border-background/30 focus:border-background/50" />
                        <Button type="submit" variant="secondary" size="sm" className="px-4" disabled={isSubmitting || !turnstileToken} aria-label="Subscribe to newsletter">
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      {/* Honeypot field - hidden from users but visible to bots */}
                      <div style={{ display: "none" }}>
                        <Label htmlFor="newsletter-website">Website (leave blank)</Label>
                        <Input 
                          id="newsletter-website" 
                          name="website" 
                          type="text" 
                          value={honeypot}
                          onChange={e => setHoneypot(e.target.value)}
                          tabIndex={-1} 
                          autoComplete="off" 
                        />
                      </div>

                      {/* Cloudflare Turnstile Widget - Invisible mode */}
                      <div key={turnstileKey}>
                        <Turnstile
                          siteKey="0x4AAAAAACBhtHfX5mcNUA4m"
                          onSuccess={handleTurnstileSuccess}
                          onError={handleTurnstileError}
                          onExpire={handleTurnstileExpire}
                          theme="auto"
                          size="invisible"
                        />
                      </div>
                    </form>
                    <p className="text-xs text-background/60">
                      We respect your privacy. Unsubscribe at any time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tablet Layout */}
          <div className="hidden md:block lg:hidden">
            <div className="grid grid-cols-2 gap-8 mb-8">
              {/* Company Info - Simplified */}
              <div className="space-y-6">
                <div>
                  <img className="h-10 w-auto" src={anhartLogo} alt="Anhart" width="405" height="160" loading="lazy" />
                </div>
                <p className="text-sm leading-6 text-background/90">
                  Building communities through affordable housing solutions.
                </p>
                <div className="flex space-x-4">
                  {socialLinks.map(item => <a key={item.name} href={item.href} target="_blank" rel="noopener noreferrer" className="text-background/70 hover:text-background transition-colors duration-200" aria-label={`Follow us on ${item.name}`}>
                      <item.icon className="h-5 w-5" />
                    </a>)}
                </div>
              </div>
              
              {/* Contact - Essential Only */}
              <div className="space-y-4">
                <h3 className="text-base font-semibold text-background">Contact</h3>
                <div className="space-y-3">
                  <div>
                    <a href={`tel:${CONTACT_INFO.phone.replace(/[^\d]/g, '')}`} className="text-sm text-background/80 hover:text-background transition-colors block">
                      {CONTACT_INFO.phone}
                    </a>
                  </div>
                  <div>
                    <a href={`mailto:${CONTACT_INFO.email}`} className="text-sm text-background/80 hover:text-background transition-colors block">
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                  <div>
                    <button onClick={() => openGoogleMapsSearch(AddressUtils.getGoogleMapsAddress())} className="text-sm text-background/80 hover:text-background transition-colors text-left focus:outline-none">
                      Vancouver, BC Office
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Layout - Minimal */}
          <div className="md:hidden space-y-6">
            {/* Logo and Tagline */}
            <div className="text-center space-y-4">
              <img className="h-8 w-auto mx-auto" src={anhartLogo} alt="Anhart" width="405" height="160" loading="lazy" />
              <p className="text-sm text-background/90">
                Building communities through affordable housing solutions.
              </p>
            </div>
            
            {/* Essential Contact - Horizontal */}
            <div className="flex justify-center space-x-6 text-center">
              <a href={`tel:${CONTACT_INFO.phone.replace(/[^\d]/g, '')}`} className="text-sm text-background/80 hover:text-background transition-colors">
                {CONTACT_INFO.phone}
              </a>
              <a href={`mailto:${CONTACT_INFO.email}`} className="text-sm text-background/80 hover:text-background transition-colors">info@anhart.ca</a>
            </div>
            
            {/* Social Links and Newsletter - Combined */}
            <div className="space-y-4">
              {/* Social Links - Centered */}
              <div className="flex justify-center space-x-4">
                {socialLinks.map(item => <a key={item.name} href={item.href} target="_blank" rel="noopener noreferrer" className="text-background/70 hover:text-background transition-colors duration-200" aria-label={`Follow us on ${item.name}`}>
                    <item.icon className="h-5 w-5" />
                  </a>)}
              </div>
              
              {/* Newsletter Signup - Compact */}
              <div className="text-center">
                <form onSubmit={handleNewsletterSubmit} className="space-y-2 max-w-xs mx-auto">
                  <div className="flex gap-x-2">
                    <Input 
                      type="email" 
                      placeholder="Email for updates" 
                      value={email} 
                      onChange={e => setEmail(e.target.value)} 
                      required 
                      disabled={isSubmitting} 
                      className="flex-1 bg-background/10 text-background placeholder:text-background/60 border-background/30 focus:border-background/50 text-xs" 
                    />
                    <Button 
                      type="submit" 
                      variant="secondary" 
                      size="sm" 
                      className="px-2" 
                      disabled={isSubmitting || !turnstileToken} 
                      aria-label="Subscribe to newsletter"
                    >
                      <Mail className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  {/* Honeypot field - hidden from users but visible to bots */}
                  <div style={{ display: "none" }}>
                    <Label htmlFor="newsletter-website-mobile">Website (leave blank)</Label>
                    <Input 
                      id="newsletter-website-mobile" 
                      name="website" 
                      type="text" 
                      value={honeypot}
                      onChange={e => setHoneypot(e.target.value)}
                      tabIndex={-1} 
                      autoComplete="off" 
                    />
                  </div>

                  {/* Cloudflare Turnstile Widget - Invisible mode */}
                  <div key={turnstileKey}>
                    <Turnstile
                      siteKey="0x4AAAAAACBhtHfX5mcNUA4m"
                      onSuccess={handleTurnstileSuccess}
                      onError={handleTurnstileError}
                      onExpire={handleTurnstileExpire}
                      theme="auto"
                      size="invisible"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          
          {/* Staff Login Section - Centered */}
          <div className="mt-8 md:mt-12 lg:mt-16 border-t border-background/20 pt-4 lg:pt-4">
            <div className="text-center">
              <a 
                href="https://digitalbookkeeper.ca/Staff/" 
                className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-background hover:text-background/80 transition-colors duration-200 underline hover:no-underline"
              >
                Staff Login
              </a>
            </div>
          </div>

          {/* Footer Bottom - Community Commons */}
          <div className="mt-4 border-t border-background/20 pt-6 lg:pt-8">
            <div className="text-center">
              <p className="text-xs leading-5 text-background/70">
                © 2025 Anhart · Shared with the community.
              </p>
              <p className="text-xs leading-5 text-background/70 mt-2">
                This work is released under a Community Commons philosophy—free to use, adapt, and share for the public good.
              </p>
            </div>
          </div>
        </div>
      </footer>
  );
};