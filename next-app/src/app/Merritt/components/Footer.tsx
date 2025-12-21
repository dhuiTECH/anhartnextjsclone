import { Facebook, Twitter, Linkedin, Instagram, Phone, Mail, MapPin } from "lucide-react";

// Social media links from Anhart
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

export default function Footer() {
  return (
    <footer className="relative z-10 bg-[#1a2621] text-[#f2f0eb] py-12 md:py-16 lg:py-20 border-t border-white/5 relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-8 max-w-7xl">

            {/* Main Footer Content - Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16 mb-8 md:mb-12">

                {/* Company Info & Logo */}
                <div className="text-center md:text-left lg:col-span-1">
                    <div className="mb-6">
                        <a
                            href="https://anhart.ca"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block hover:opacity-80 transition-opacity duration-300"
                        >
                            <img
                                src="/merritt-assets/anhartmerritt1.png"
                                alt="Anhart - Vancouver-based affordable housing developer"
                                className="h-10 md:h-12 w-auto mx-auto md:mx-0"
                            />
                        </a>
                    </div>
                    <div className="space-y-3">
                        <div className="text-[0.5rem] md:text-xs uppercase tracking-[0.4em] opacity-60">Affordable Housing Developer</div>
                        <p className="text-sm opacity-70 leading-relaxed">Building Better Communities | Merritt, BC</p>
                        <p className="text-xs opacity-60">Creating inclusive, sustainable communities where everyone has access to safe, quality homes.</p>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="text-center md:text-left">
                    <h3 className="text-lg font-semibold mb-6 text-[#a6906c]">Contact Us</h3>
                    <div className="space-y-4">
                        <a href="tel:604.529.6259" className="flex items-center justify-center md:justify-start gap-3 text-[#f2f0eb]/80 hover:text-[#f2f0eb] transition-colors group">
                            <Phone className="w-5 h-5 text-[#a6906c] group-hover:scale-110 transition-transform" />
                            <span className="text-sm">604.529.6259</span>
                        </a>
                        <a href="mailto:info@anhart.ca" className="flex items-center justify-center md:justify-start gap-3 text-[#f2f0eb]/80 hover:text-[#f2f0eb] transition-colors group">
                            <Mail className="w-5 h-5 text-[#a6906c] group-hover:scale-110 transition-transform" />
                            <span className="text-sm">info@anhart.ca</span>
                        </a>
                        <div className="flex items-center justify-center md:justify-start gap-3 text-[#f2f0eb]/60">
                            <MapPin className="w-5 h-5 text-[#a6906c] flex-shrink-0" />
                            <span className="text-sm text-left">Suite 1480, RBC Building<br/>Vancouver, BC</span>
                        </div>
                    </div>
                </div>

                {/* Social Media & Connect */}
                <div className="text-center md:text-left">
                    <h3 className="text-lg font-semibold mb-6 text-[#a6906c]">Connect With Us</h3>
                    <div className="flex justify-center md:justify-start space-x-4 mb-6">
                        {socialLinks.map(item => (
                            <a
                                key={item.name}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#f2f0eb]/70 hover:text-[#a6906c] transition-all duration-200 hover:scale-110 p-2 rounded-full hover:bg-white/5"
                                aria-label={`Follow us on ${item.name}`}
                            >
                                <item.icon className="h-6 w-6" />
                            </a>
                        ))}
                    </div>
                    <div className="space-y-2">
                        <a
                            href="/privacy-policy"
                            className="block text-xs opacity-60 hover:text-[#a6906c] hover:opacity-100 transition-colors text-center md:text-left"
                        >
                            Privacy Policy
                        </a>
                        <p className="text-xs opacity-60 text-center md:text-left">
                            Stay updated with our latest projects and community impact stories.
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom Section - Disclaimer & Credits */}
            <div className="pt-8 md:pt-12 border-t border-white/10">
                <p className="text-xs opacity-60 leading-relaxed max-w-5xl mx-auto text-center px-4 mb-6">
                    *The material provided herein is for general informational purposes only and is not intended to depict as-built construction designs or finishes. No offering for sale can be made until after a Disclosure Statement, issued pursuant to the Real Estate Development Marketing Act of B.C., has been provided to a prospective purchaser. The Developer reserves the right in its sole discretion to make modifications or changes to building design, floor plans, project designs, specifications, finishes, features, incentives and dimensions, without prior notice. Renderings and any depicted views are artistic concepts only. Square footages are approximate and have been calculated from architectural drawings. Actual final dimensions, following completion of construction, may vary from those set out herein and in the accompanying materials. E.&O.E.
                </p>
                <div className="pt-6 border-t border-white/10 text-center">
                    <p className="text-xs opacity-40 px-4">
                        Website Designed & Managed by{' '}
                        <a
                            href="https://ddaiagency.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#a6906c] hover:text-[#8b7355] transition-colors duration-300"
                        >
                            D&D AI Agency
                        </a>
                    </p>
                </div>
            </div>
        </div>
    </footer>
  );
}
