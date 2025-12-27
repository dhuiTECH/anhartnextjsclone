import type { Metadata } from "next";
import Image from 'next/image';
import Footer from '../Merritt/components/Footer';
import { MapPin, DollarSign, Home, Palette, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Realtor Portal | Anhart Merritt',
  description: 'Exclusive portal for realtors and agents - Anhart affordable townhomes in Merritt, BC.',
  robots: 'noindex, nofollow, noarchive, nosnippet, noimageindex, nocache',
};

export default function RealtorPortalPage() {
  return (
    <div className="bg-[#f9f8f6] text-[#1a2621] font-sans antialiased min-h-screen flex flex-col">
      {/* Navbar is now in layout.tsx */}

      {/* Main Content Section */}
      <section className="relative flex-1 flex items-center justify-center min-h-[80vh] overflow-hidden">
        {/* Transparent Anhart Logo Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <div className="relative w-full max-w-4xl h-full max-h-96">
            <Image
              src="/images/anhart-logo.webp"
              alt="Anhart Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Portal Content */}
        <div className="relative z-10 text-center px-6 md:px-8 max-w-6xl mx-auto">
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-6 md:mb-8 text-[#1a2621] font-bold uppercase">
            Realtor Portal
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-[#1a2621]/70 max-w-3xl mx-auto mb-12 md:mb-16">
            Exclusive resources and information for real estate professionals representing Anhart's affordable townhome development in Merritt, BC.
          </p>

          {/* Marketing Materials Grid */}
          <div className="mb-16 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/95 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-[#e6e2da] text-center hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-[#a6906c] rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[#1a2621] mb-2">Site Plan & Pricing</h3>
                <p className="text-sm text-[#1a2621] opacity-70">Detailed site layout and current pricing information for all available units.</p>
              </div>

              <div className="bg-white/95 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-[#e6e2da] text-center hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-[#a6906c] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[#1a2621] mb-2">Floor Plans</h3>
                <p className="text-sm text-[#1a2621] opacity-70">Complete floor plan layouts with dimensions and room configurations.</p>
              </div>

              <div className="bg-white/95 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-[#e6e2da] text-center hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-[#a6906c] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Palette className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[#1a2621] mb-2">Features & Finishes</h3>
                <p className="text-sm text-[#1a2621] opacity-70">Material specifications, appliance packages, and upgrade options available.</p>
              </div>

              <div className="bg-white/95 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-[#e6e2da] text-center hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-[#a6906c] rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[#1a2621] mb-2">Marketing Materials</h3>
                <p className="text-sm text-[#1a2621] opacity-70">Brochures, renderings, neighborhood information, and sales collateral.</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-[#1a2621] text-[#f2f0eb] p-8 rounded-lg max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
              Contact Information
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-2 text-[#a6906c]">Developer</h3>
                <p className="opacity-90">Anhart</p>
                <p className="opacity-90">885 W Georgia St Suite 1480</p>
                <p className="opacity-90">Vancouver, BC V6C 3E8</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-[#a6906c]">Contact</h3>
                <p className="opacity-90">Phone: <a href="tel:+16045296259" className="hover:text-[#a6906c] transition-colors">+1-604-529-6259</a></p>
                <p className="opacity-90">Email: <a href="mailto:info@anhart.ca" className="hover:text-[#a6906c] transition-colors">info@anhart.ca</a></p>
                <p className="opacity-90">Website: <a href="https://anhart.ca" target="_blank" rel="noopener noreferrer" className="hover:text-[#a6906c] transition-colors">anhart.ca</a></p>
              </div>
            </div>
          </div>


          {/* Legal Disclaimer */}
          <div className="mt-12 mb-12 bg-[#1a2621] text-[#f2f0eb] p-8 rounded-lg max-w-4xl mx-auto">
            <div className="flex items-start gap-3">
              <FileText className="w-6 h-6 text-[#a6906c] mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold mb-3 text-[#a6906c]">Important Notice</h3>
                <p className="text-sm opacity-90 leading-relaxed">
                  Purchasers acknowledge and agree that the Agreement of Purchase and Sale may be subject to further changes by the vendor (without notice) prior to presenting the agreement for execution by purchasers.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
