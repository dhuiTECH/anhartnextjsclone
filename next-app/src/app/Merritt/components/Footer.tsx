import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

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
        <div className="container mx-auto px-6 md:px-8 text-center max-w-7xl">
            <div className="mb-4">
                <a
                    href="https://anhart.ca"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block hover:opacity-80 transition-opacity duration-300"
                >
                    <img
                        src="/merritt-assets/anhartmerritt1.png"
                        alt="Anhart Logo"
                        className="h-10 md:h-12 w-auto mx-auto"
                    />
                </a>
            </div>
            <div className="text-[0.5rem] md:text-xs uppercase tracking-[0.4em] mb-8 md:mb-12 opacity-60">Affordable Housing Developer</div>
            <p className="mt-2 text-xs opacity-40">Building Better Communities | Merritt, BC</p>
            <div className="flex justify-center space-x-6 mt-6 md:mt-8">
                {socialLinks.map(item => <a key={item.name} href={item.href} target="_blank" rel="noopener noreferrer" className="text-[#f2f0eb]/70 hover:text-[#f2f0eb] transition-colors duration-200" aria-label={`Follow us on ${item.name}`}>
                    <item.icon className="h-6 w-6" />
                  </a>)}
            </div>
            <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/10">
                <p className="text-xs opacity-60 leading-relaxed max-w-5xl mx-auto text-center px-4">
                    *The material provided herein is for general informational purposes only and is not intended to depict as-built construction designs or finishes. No offering for sale can be made until after a Disclosure Statement, issued pursuant to the Real Estate Development Marketing Act of B.C., has been provided to a prospective purchaser. The Developer reserves the right in its sole discretion to make modifications or changes to building design, floor plans, project designs, specifications, finishes, features, incentives and dimensions, without prior notice. Renderings and any depicted views are artistic concepts only. Square footages are approximate and have been calculated from architectural drawings. Actual final dimensions, following completion of construction, may vary from those set out herein and in the accompanying materials. E.&O.E.
                </p>
                <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-white/10 text-center">
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
