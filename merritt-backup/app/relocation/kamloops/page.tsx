import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../../components/Navbar";

export const metadata: Metadata = {
  title: "Kamloops to Merritt Relocation | Affordable Townhomes",
  description: "Escape Kamloops housing costs. Discover affordable townhomes in Merritt, BC starting at $249k - perfect for commuters and families.",
};

export default function KamloopsRelocationPage() {
  return (
    <div className="bg-[#f9f8f6] text-[#1a2621] font-sans antialiased min-h-screen">
      {/* Editorial frame */}
      <div className="fixed left-0 top-0 w-6 md:w-16 h-full bg-white z-[60]"></div>
      <div className="fixed right-0 top-0 w-6 md:w-16 h-full bg-white z-[60]"></div>

      <Navbar />
      <main>
      {/* Hero Section */}
      <header className="relative pt-24 pb-16 pl-8 pr-8 sm:pl-6 sm:pr-6 min-h-[80vh] md:min-h-[90vh] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <video
            src="/familydrivingtomerritt.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/fullvillage.webp"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#14312C]/80 via-[#14312C]/60 to-[#2a3731]/80"></div>
              </div>
        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <span className="text-[#a6906c] font-bold text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 sm:mb-4 block">Relocation Guide</span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-7xl mb-6 sm:mb-8 leading-tight font-bold uppercase text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] px-2">
            From Kamloops to Merritt
              </h1>
          <p className="text-white/90 text-base sm:text-lg md:text-xl font-light tracking-[0.05em] leading-relaxed max-w-3xl mx-auto drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] px-2">
            Kamloops is expensive. Discover affordable homeownership in beautiful Merritt, BC.
            Your gateway to modern townhomes for sale in the scenic Nicola Valley.
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
            <h2 className="text-2xl md:text-3xl font-montserrat font-bold text-primary text-center mb-8">
              Why Make the Move
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Financial Freedom",
                  body: "Lower housing costs let you invest in your startup, travel, or savings.",
                  icon: (
                    <svg className="w-12 h-12 text-[#a6906c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                },
                {
                  title: "Nature",
                  body: "Forest views, lakes, and trails replace concrete and traffic.",
                  icon: (
                    <svg className="w-12 h-12 text-[#a6906c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  ),
                },
                {
                  title: "Community",
                  body: "A quieter, tight-knit town—still connected when you need it.",
                  icon: (
                    <svg className="w-12 h-12 text-[#a6906c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  ),
                },
              ].map((item) => {
                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-muted/50 bg-muted/20 p-6 shadow-sm"
                  >
                    <div className="flex items-center justify-center mb-4">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-primary mb-2 text-center">{item.title}</h3>
                    <p className="text-muted-foreground text-center">{item.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section className="py-12 pl-8 pr-8 sm:pl-6 sm:pr-6 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-montserrat font-bold text-primary text-center mb-8">
              Kamloops vs. Merritt
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-muted/60 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-primary mb-2">Kamloops Condo</h3>
                <p className="text-muted-foreground">$700k+ | High property taxes | Urban congestion.</p>
              </div>
              <div className="rounded-2xl border border-secondary/60 bg-secondary/10 p-6 shadow-md">
                <h3 className="text-lg font-semibold text-primary mb-2">Anhart Townhome</h3>
                <p className="text-muted-foreground">From $249k | Low property taxes | Mountain lifestyle.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Commute */}
        <section className="py-12 pl-8 pr-8 sm:pl-6 sm:pr-6 bg-white">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="space-y-3">
              <h2 className="text-2xl md:text-3xl font-montserrat font-bold text-primary">Easy Drive from Kamloops</h2>
              <p className="text-muted-foreground">
                The drive from Kamloops to Merritt takes about 1.5-2 hours via Highway 5 and Highway 97.
                Perfect for daily commutes or hybrid work schedules with easy access back to Kamloops.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Approx. 2.5-3 hour drive via Hwy 7 E / Hwy 60</li>
                <li>• Scenic route through rural Ontario</li>
                <li>• Ideal for hybrid work arrangements</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Remote Ready Specs */}
        <section className="py-12 pl-8 pr-8 sm:pl-6 sm:pr-6 bg-white">
          <div className="container mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-3">
              <h2 className="text-2xl md:text-3xl font-montserrat font-bold text-primary">Remote-Ready Specs</h2>
              <p className="text-muted-foreground">
                We know that for you, Internet isn&apos;t a luxury—it&apos;s a utility. Our homes are situated in a connectivity hub featuring access to [Insert Fibre Provider] and clear views for Starlink. Run your dedicated server, host 4K video calls, and code in peace.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Fibre/Starlink capable, low-latency connections</li>
                <li>• Quiet spaces for coding and calls</li>
                <li>• Room for dual-monitor or server setups</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-muted/50 bg-muted/10 p-6 shadow-inner">
              <h3 className="text-lg font-semibold text-primary mb-2">Digital Nomad Perks</h3>
              <p className="text-muted-foreground">
                You don&apos;t need to live in Vancouver to work for a Vancouver company. Kamloops offers the perfect digital nomad lifestyle with lower costs and more space.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 pl-8 pr-8 sm:pl-6 sm:pr-6 bg-muted/30">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-montserrat font-bold text-primary text-center mb-6">
              FAQ for Kamloops Movers
            </h2>
            <div className="space-y-4">
              <details className="bg-white border border-gray-200 rounded-lg p-4">
                <summary className="font-semibold text-[#1a2621] cursor-pointer">Will I have reliable internet for work?</summary>
                <p className="text-[#1a2621]/70 mt-2">Yes. Fibre and Starlink options support low-latency, high-bandwidth work setups in Merritt.</p>
              </details>
              <details className="bg-white border border-gray-200 rounded-lg p-4">
                <summary className="font-semibold text-[#1a2621] cursor-pointer">Do I need to commute daily?</summary>
                <p className="text-[#1a2621]/70 mt-2">No. Merritt is perfect for hybrid work. Many residents commute 1-2 times per week or work remotely full-time.</p>
              </details>
              <details className="bg-white border border-gray-200 rounded-lg p-4">
                <summary className="font-semibold text-[#1a2621] cursor-pointer">What about healthcare and amenities?</summary>
                <p className="text-[#1a2621]/70 mt-2">Nicola Valley Hospital provides excellent healthcare, and all major amenities are within easy reach.</p>
              </details>
            </div>
          </div>
        </section>

        {/* Live Like a Local */}
        <section className="py-14 pl-8 pr-8 sm:pl-6 sm:pr-6 bg-white">
          <div className="container mx-auto max-w-6xl space-y-6">
            <h2 className="text-2xl md:text-3xl font-montserrat font-bold text-primary text-center">
              Live Like a Local
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-muted/50 bg-muted/20 p-6 shadow-sm">
                <div className="mb-4">
                <Image
                  src="/coffee2.jpg"
                  alt="Cozy coffee shops and restaurants in Merritt, BC"
                  width={400}
                  height={128}
                  className="w-full h-32 rounded-lg object-cover"
                  loading="lazy"
                />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">Coffee & Eats</h3>
                <p className="text-muted-foreground">Local cafes and restaurants around Merritt for your daily fuel and great meals.</p>
              </div>
              <div className="rounded-2xl border border-muted/50 bg-muted/20 p-6 shadow-sm">
                <div className="mb-4">
                  <Image
                    src="/nicolavalley.jpg"
                    alt="Nicola Valley - Beautiful lake access and outdoor recreation near Kamloops, BC"
                    width={400}
                    height={128}
                    className="w-full h-32 rounded-lg object-cover"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">Adventure</h3>
                <p className="text-muted-foreground">Nicola River and nearby lakes—hike, fish, and explore the Nicola Valley.</p>
              </div>
              <div className="rounded-2xl border border-muted/50 bg-muted/20 p-6 shadow-sm">
                <div className="mb-4">
                  <Image
                    src="/nicolavalleyhospital.jpg"
                    alt="Royal Inland Hospital - Quality healthcare in Kamloops, BC"
                    width={400}
                    height={128}
                    className="w-full h-32 rounded-lg object-cover"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">Essentials</h3>
                <p className="text-muted-foreground">Nicola Valley Hospital, major retailers, schools, and all essential services are conveniently located in Merritt.</p>
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
              Join our waitlist to be among the first to experience modern living at affordable prices. Our 48-unit development combines Vancouver design standards with Merritt's scenic beauty.
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
    </div>
  );
}


