import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Footer from "../../components/Footer";
// Navbar is now in layout.tsx - no need to import here

export const metadata: Metadata = {
  title: "Relocating from Kelowna to Merritt | Affordable Housing Solutions",
  description: "Escape Kelowna's high costs. Discover affordable, beautiful homes in scenic Merritt, BC.",
  alternates: { canonical: 'https://anhart.ca/Merritt/relocation/kelowna' },
};

export default function KelownaRelocationPage() {
  return (
    <div className="bg-[#f9f8f6] text-[#1a2621] font-sans antialiased min-h-screen">
      {/* Editorial frame */}
      <div className="fixed left-0 top-0 w-6 md:w-16 h-full bg-white z-[60]"></div>
      <div className="fixed right-0 top-0 w-6 md:w-16 h-full bg-white z-[60]"></div>

      {/* Navbar is now in layout.tsx */}
      <main>
      {/* Hero Section */}
      <header className="relative pt-24 pb-16 pl-8 pr-8 sm:pl-6 sm:pr-6 min-h-[80vh] md:min-h-[90vh] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <video
            src="/merritt-assets/familydrivingtomerritt.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/merritt-assets/fullvillage.webp"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#14312C]/80 via-[#14312C]/60 to-[#2a3731]/80"></div>
              </div>
        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <span className="text-[#a6906c] font-bold text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 sm:mb-4 block">Relocation Guide</span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-7xl mb-6 sm:mb-8 leading-tight font-bold uppercase text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] px-2">
            From Kelowna to Merritt
              </h1>
          <p className="text-white/90 text-base sm:text-lg md:text-xl font-light tracking-[0.05em] leading-relaxed max-w-3xl mx-auto drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] px-2">
            Keep your Okanagan lifestyle. Discover affordable homeownership in beautiful Merritt, BC.
            <span className="hidden md:inline"> Your gateway to modern townhomes for sale in the scenic Nicola Valley.</span>
              </p>
          </div>

        {/* Decorative Plant Leaf */}
        <div className="absolute -top-8 -right-8 w-32 h-32 opacity-10 pointer-events-none">
          <svg className="w-full h-full text-[#14312C]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M19 9H14V4L19 9M7 11H17V13H7V11M7 15H17V17H7V15M7 19H13V21H7V19Z"/>
          </svg>
        </div>
      </header>

        {/* Why Move Grid */}
        <section className="py-12 pl-8 pr-8 sm:pl-6 sm:pr-6 bg-white">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1a2621] text-center mb-8">
              Why Make the Move
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Financial Freedom",
                  body: "Swap Kelowna prices for affordable homes and keep more for travel, savings, and family.",
                  icon: (
                    <Image
                      src="/merritt-assets/financefreedomicon.png"
                      alt="Financial Freedom"
                      width={48}
                      height={48}
                      className="w-12 h-12"
                    />
                  ),
                },
                {
                  title: "Nature",
                  body: "Lake access, forest trails, and sunsets over the Nicola Valley—every day.",
                  icon: (
                    <Image
                      src="/merritt-assets/natureicon.png"
                      alt="Nature"
                      width={48}
                      height={48}
                      className="w-12 h-12"
                    />
                  ),
                },
                {
                  title: "Community",
                  body: "Tight-knit, welcoming town with everything you need close by.",
                  icon: (
                    <Image
                      src="/merritt-assets/communityicon.png"
                      alt="Community"
                      width={58}
                      height={58}
                      className="w-12 h-12"
                    />
                  ),
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-[#e6e2da] bg-[#f9f8f6] p-6 shadow-sm hover:shadow-md transition-shadow reveal"
                >
                  <div className="flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-[#1a2621] mb-2 text-center">{item.title}</h3>
                  <p className="text-[#1a2621]/70 text-center">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section className="py-12 pl-8 pr-8 sm:pl-6 sm:pr-6 bg-[#f9f8f6]">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1a2621] text-center mb-8">
              Kelowna vs. Merritt
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-[#e6e2da] bg-white p-6 shadow-sm reveal">
                <h3 className="text-lg font-semibold text-[#1a2621] mb-2">Kelowna Condo</h3>
                <p className="text-[#1a2621]/70"> High cost | 45-minute commute in traffic | Tiny balcony.</p>
              </div>
              <div className="rounded-2xl border border-[#a6906c] bg-[#a6906c]/10 p-6 shadow-md reveal">
                <h3 className="text-lg font-semibold text-[#1a2621] mb-2">Anhart Townhome</h3>
                <p className="text-[#1a2621]/70"> Quality homes | 0-minute commute | Surrounded by mountains.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Commute */}
        <section className="py-12 pl-8 pr-8 sm:pl-6 sm:pr-6 bg-white">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="space-y-3">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1a2621]">Easy Drive from Kelowna</h2>
              <p className="text-[#1a2621]/70">
                The drive is straightforward and scenic. A comfortable journey along Highway 97 takes you from Kelowna's bustle to Merritt's tranquility in about 45 minutes. Perfect for hybrid workers, commuters, or those wanting easy weekend access back to the Okanagan.
              </p>
            </div>
          </div>
        </section>

        {/* Remote Work */}
        <section className="py-12 pl-8 pr-8 sm:pl-6 sm:pr-6 bg-[#f9f8f6]">
          <div className="container mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-3">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1a2621]">Remote-Work Considerations</h2>
              <p className="text-[#1a2621]/70">
                We recognize that reliable internet is important for many homeowners. The project is located in an area where internet service providers may offer fibre and satellite-based services. Availability, performance, and suitability for specific uses depend on third-party providers and individual setup. Anhart townhomes include layouts intended to accommodate home-office use.
              </p>
              <ul className="space-y-2 text-[#1a2621]/70">
                <li>• Potential access to fibre and satellite-based internet services, subject to provider availability</li>
                <li>• Layouts intended to accommodate home-office use</li>
                <li>• Space that may support multi-monitor or workstation setups</li>
              </ul>
              <p className="text-xs text-[#1a2621]/50 italic mt-4">
                Internet services, speeds, latency, and availability are provided by third-party providers and are not guaranteed. Any references to connectivity are illustrative only.
              </p>
            </div>
            <div className="rounded-2xl border border-[#e6e2da] bg-white p-6 shadow-sm reveal">
              <h3 className="text-lg font-semibold text-[#1a2621] mb-2">Digital Nomad Considerations</h3>
              <p className="text-[#1a2621]/70">Merritt may appeal to those seeking a lower-cost alternative to major urban centres while working remotely, subject to individual employment and connectivity requirements.</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 pl-8 pr-8 sm:pl-6 sm:pr-6 bg-[#f9f8f6]">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1a2621] text-center mb-6">
            FAQ for Kelowna Movers
            </h2>
            <div className="space-y-4">
              <details className="bg-white border border-gray-200 rounded-lg p-4">
                <summary className="font-semibold text-[#1a2621] cursor-pointer">Is the internet fast enough for Zoom?</summary>
                <p className="text-[#1a2621]/70 mt-2">Internet service options in the area may include fibre and satellite-based providers. Performance, latency, and reliability depend on third-party services and are not guaranteed.</p>
              </details>
              <details className="bg-white border border-gray-200 rounded-lg p-4">
                <summary className="font-semibold text-[#1a2621] cursor-pointer">How far is the nearest hospital?</summary>
                <p className="text-[#1a2621]/70 mt-2">Nicola Valley Hospital & Health Centre is centrally located—no long drives for care.</p>
              </details>
              <details className="bg-white border border-gray-200 rounded-lg p-4">
                <summary className="font-semibold text-[#1a2621] cursor-pointer">Are there grocery stores and amenities?</summary>
                <p className="text-[#1a2621]/70 mt-2">Yes. No Frills, Walmart, Canadian Tire and other major retailers are all within a short drive.</p>
              </details>
            </div>
          </div>
        </section>

        {/* Live Like a Local */}
        <section className="py-14 pl-8 pr-8 sm:pl-6 sm:pr-6 bg-white">
          <div className="container mx-auto max-w-6xl space-y-6">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1a2621] text-center">
              Live Like a Local
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-[#e6e2da] bg-[#f9f8f6] p-6 shadow-sm hover:shadow-md transition-shadow reveal">
                <div className="mb-4">
                  <Image
                    src="/merritt-assets/coffee2.jpg"
                    alt="Cozy coffee shops and restaurants in Merritt, BC"
                    width={400}
                    height={128}
                    className="w-full h-32 rounded-lg object-cover"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-lg font-semibold text-[#1a2621] mb-2">Coffee & Eats</h3>
                <p className="text-[#1a2621]/70">Local cafes and restaurants around Merritt for your daily fuel and great meals.</p>
              </div>
              <div className="rounded-2xl border border-[#e6e2da] bg-[#f9f8f6] p-6 shadow-sm hover:shadow-md transition-shadow reveal">
                <div className="mb-4">
                  <Image
                    src="/merritt-assets/nicolavalley.jpg"
                    alt="Nicola Valley - Beautiful lake access and outdoor recreation in Merritt, BC"
                    width={400}
                    height={128}
                    className="w-full h-32 rounded-lg object-cover"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-lg font-semibold text-[#1a2621] mb-2">Adventure</h3>
                <p className="text-[#1a2621]/70">Nicola River and nearby lakes—hike, fish, and explore the Nicola Valley.</p>
              </div>
              <div className="rounded-2xl border border-[#e6e2da] bg-[#f9f8f6] p-6 shadow-sm hover:shadow-md transition-shadow reveal">
                <div className="mb-4">
                  <Image
                    src="/merritt-assets/nicolavalleyhospital.jpg"
                    alt="Nicola Valley Hospital - Quality healthcare in Merritt, BC"
                    width={400}
                    height={128}
                    className="w-full h-32 rounded-lg object-cover"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-lg font-semibold text-[#1a2621] mb-2">Essentials</h3>
                <p className="text-[#1a2621]/70">Nicola Valley Hospital, major retailers, schools, and all essential services are conveniently located in Merritt.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Anhart Quality */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 pl-8 pr-8 sm:pl-6 sm:pr-6 bg-[#1a2621] text-[#f9f8f6] relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-10"></div>
          <div className="container mx-auto max-w-5xl text-center relative z-10">
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-3 sm:mb-4 md:mb-6 px-2">
              Experience Anhart Quality
            </h2>
            <p className="text-[#f9f8f6]/80 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 md:mb-8 max-w-3xl mx-auto px-2">
              Join our waitlist to be among the first to experience modern living at affordable prices. Our development combines Vancouver design standards with Merritt's scenic beauty.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link
                href="/Merritt/interiors"
                className="inline-block bg-[#a6906c] text-white px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg font-bold uppercase tracking-wider hover:bg-[#8b7355] transition-colors rounded-lg glow-hover cursor-pointer text-center"
              >
                View Interiors
              </Link>
              <Link
                href="/Merritt/floorplans"
                className="inline-block border-2 border-[#a6906c] text-[#a6906c] px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg font-bold uppercase tracking-wider hover:bg-[#a6906c] hover:text-white transition-colors rounded-lg glow-hover cursor-pointer text-center"
              >
                View Floor Plans
              </Link>
              <Link
                href="/Merritt/neighbourhood"
                className="inline-block border-2 border-[#a6906c] text-[#a6906c] px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg font-bold uppercase tracking-wider hover:bg-[#a6906c] hover:text-white transition-colors rounded-lg glow-hover cursor-pointer text-center"
              >
                Explore Neighbourhood
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}


