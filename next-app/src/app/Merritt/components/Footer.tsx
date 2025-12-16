export default function Footer() {
  return (
    <footer className="relative z-10 bg-[#1a2621] text-[#f2f0eb] py-20 border-t border-white/5 relative">
        <div className="container mx-auto px-6 text-center">
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
                        className="h-12 w-auto mx-auto"
                    />
                </a>
            </div>
            <div className="text-[0.5rem] uppercase tracking-[0.4em] mb-12 opacity-60">Affordable Housing Developer</div>
            <p className="mt-2 text-xs opacity-40">Building Better Communities | Merritt, BC</p>
            <div className="mt-12 pt-8 border-t border-white/10">
                <p className="text-xs opacity-60 leading-relaxed max-w-5xl mx-auto text-center">
                    The material provided herein is for general informational purposes only and is not intended to depict as-built construction designs or finishes. No offering for sale can be made until after a Disclosure Statement, issued pursuant to the Real Estate Development Marketing Act of B.C., has been provided to a prospective purchaser. The Developer reserves the right in its sole discretion to make modifications or changes to building design, floor plans, project designs, specifications, finishes, features, incentives and dimensions, without prior notice. Renderings and any depicted views are artistic concepts only. Square footages are approximate and have been calculated from architectural drawings. Actual final dimensions, following completion of construction, may vary from those set out herein and in the accompanying materials. E.&O.E.
                </p>
                <div className="mt-8 pt-6 border-t border-white/10 text-center">
                    <p className="text-xs opacity-40">
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
