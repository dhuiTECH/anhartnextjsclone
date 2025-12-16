'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Footer from '../components/Footer';
// Navbar is now in layout.tsx - no need to import here

// Dynamically import Map with SSR disabled to prevent initialization issues
const Map = dynamic(() => import('@/components/merritt-ui/Map'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-[#F9F7F2] rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-4">🗺️</div>
        <p className="text-[#14312C]/60">Loading map...</p>
      </div>
    </div>
  ),
});

export default function NeighbourhoodPage() {
  const [activeLayer, setActiveLayer] = useState<'parks' | 'dining' | 'shopping' | 'schools' | 'transit'>('parks');

  // Landmarks data for 3757 De Wolf Way, Merritt, BC
  const LANDMARKS = [
    // DINING (De Wolf Way has many options right next door)
    {
      id: 'd1',
      lat: 50.1195,
      lng: -120.7610,
      title: 'Triple O\'s',
      category: 'Dining'
    },
    {
      id: 'd2',
      lat: 50.1200,
      lng: -120.7600,
      title: 'Popeyes Louisiana Kitchen',
      category: 'Dining'
    },
    {
      id: 'd3',
      lat: 50.1180,
      lng: -120.7650,
      title: 'Starbucks (Voght St)',
      category: 'Dining'
    },
    {
      id: 'd4',
      lat: 50.1220,
      lng: -120.7630,
      title: 'Boston Pizza',
      category: 'Dining'
    },

    // SHOPPING
    {
      id: 's1',
      lat: 50.1230,
      lng: -120.7680,
      title: 'Peter\'s Your Independent Grocer',
      category: 'Shopping'
    },
    {
      id: 's2',
      lat: 50.1240,
      lng: -120.7700,
      title: 'Walmart Supercentre',
      category: 'Shopping'
    },
    {
      id: 's3',
      lat: 50.1225,
      lng: -120.7660,
      title: 'Canadian Tire',
      category: 'Shopping'
    },

    // SCHOOLS
    {
      id: 'e1',
      lat: 50.1210,
      lng: -120.7750,
      title: 'Nicola Valley Institute of Technology (NVIT)',
      category: 'Schools'
    },
    {
      id: 'e2',
      lat: 50.1080,
      lng: -120.7950,
      title: 'Merritt Secondary School',
      category: 'Schools'
    },

    // PARKS & REC
    {
      id: 'p1',
      lat: 50.1130,
      lng: -120.7850,
      title: 'Rotary Park',
      category: 'Parks'
    },
    {
      id: 'p2',
      lat: 50.1150,
      lng: -120.7920,
      title: 'Central Park',
      category: 'Parks'
    },

    // TRANSIT (Approximate stops near the gateway)
    {
      id: 't1',
      lat: 50.1202,
      lng: -120.7615,
      title: 'Bus Stop: De Wolf Way',
      category: 'Transit'
    }
  ];

  // Filter markers based on active layer for map display
  const markers = LANDMARKS.filter(landmark => {
    switch (activeLayer) {
      case 'parks':
        return landmark.category === 'Parks';
      case 'dining':
        return landmark.category === 'Dining';
      case 'shopping':
        return landmark.category === 'Shopping';
      case 'schools':
        return landmark.category === 'Schools';
      case 'transit':
        return landmark.category === 'Transit';
      default:
        return true;
    }
  });

  const layerData = {
    parks: {
      title: 'Parks & Recreation',
      items: [
        { name: 'Nicola River Greenway', distance: 'Nearby' },
        { name: 'Merritt River Provincial Park', distance: '15 min drive' },
        { name: 'Douglas Lake', distance: '20 min drive' },
        { name: 'Merritt Golf Club', distance: '5 min drive' },
        { name: 'Local hiking trails', distance: 'On site' }
      ]
    },
    dining: {
      title: 'Dining',
      items: [
        { name: 'Local cafés and bakeries', distance: 'Downtown' },
        { name: 'Family restaurants', distance: 'Downtown' },
        { name: 'Fast casual dining', distance: 'Downtown' },
        { name: 'Coffee shops', distance: 'Downtown' },
        { name: 'Specialty food stores', distance: 'Downtown' }
      ]
    },
    shopping: {
      title: 'Shopping',
      items: [
        { name: 'Merritt Mall', distance: '2 min drive' },
        { name: 'Local boutiques', distance: 'Downtown' },
        { name: 'Grocery stores', distance: 'Downtown' },
        { name: 'Hardware stores', distance: 'Downtown' },
        { name: 'Pharmacy & services', distance: 'Downtown' }
      ]
    },
    schools: {
      title: 'Schools',
      items: [
        { name: 'Merritt Secondary School', distance: '3 min drive' },
        { name: 'Clementine Elementary', distance: '5 min drive' },
        { name: 'Merritt Heritage Elementary', distance: '4 min drive' },
        { name: 'Virtual schools', distance: 'Online' },
        { name: 'Nicola Valley Institute of Technology', distance: '15 min drive' }
      ]
    },
    transit: {
      title: 'Transit',
      items: [
        { name: 'BC Transit bus services', distance: 'Downtown' },
        { name: 'Kamloops transit connections', distance: '45 min drive' },
        { name: 'Kelowna transit access', distance: '1.5 hr drive' },
        { name: 'Regional airport', distance: '20 min drive' },
        { name: 'Major highway access', distance: 'On site' }
      ]
    }
  };

  return (
    <div className="bg-[#F9F7F2] text-[#14312C] font-sans antialiased min-h-screen">
      {/* Editorial frame */}
      <div className="fixed left-0 top-0 w-6 md:w-16 h-full bg-white z-[60]"></div>
      <div className="fixed right-0 top-0 w-6 md:w-16 h-full bg-white z-[60]"></div>

      {/* Navbar is now in layout.tsx */}

      {/* Hero Section */}
      <header className="relative pt-24 pb-16 pl-8 pr-8 sm:pl-6 sm:pr-6 min-h-[80vh] md:min-h-[90vh] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <video
            src="/merritt-assets/eaglemeritt.mp4"
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
          <span className="text-[#a6906c] font-bold text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 sm:mb-4 block">Community Location</span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-7xl mb-6 sm:mb-8 leading-tight font-bold uppercase text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] px-2">
            The neighbourhood.
          </h1>
          <p className="text-white/90 text-base sm:text-lg md:text-xl font-light tracking-[0.05em] leading-relaxed max-w-3xl mx-auto drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] px-2">
            Merritt has been designed to fit seamlessly into the vibrant community of the Nicola Valley.
            Known as Canada's Country Music Capital, the area celebrates its rich musical heritage with festivals and events throughout the year.
            The city is close enough to major centers to be convenient, yet removed enough to provide a break from the city.
            Life in Merritt brings a sense of connectivity, but not at the expense of the calm we require from our home.
          </p>
        </div>
      </header>

      {/* Neighbourhood Features */}
      <section className="py-20 pl-8 pr-8 sm:pl-6 sm:pr-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-[#14312C] mb-6">
              Everything you need to grow.
            </h2>
            <p className="text-xl text-[#14312C]/70 max-w-3xl mx-auto">
              Surrounded by spectacular nature, excellent schools, and convenient amenities, the Nicola Valley is ideal for any stage of life.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Parks & Recreation */}
            <div className="bg-[#F9F7F2] p-8 rounded-lg shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full border-2 border-gray-300 overflow-hidden flex-shrink-0">
                  <img
                    src="/merritt-assets/trees.jpg"
                    alt="Beautiful forest and nature scenery"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-serif text-[#14312C]">Parks & Recreation</h3>
              </div>
              <div className="space-y-3">
                <div className="border-l-4 border-[#F08E70] pl-4">
                  <h4 className="font-semibold text-[#14312C] text-sm">Nicola River Greenway</h4>
                </div>
                <div className="border-l-4 border-[#F08E70] pl-4">
                  <h4 className="font-semibold text-[#14312C] text-sm">Merritt River Provincial Park</h4>
                </div>
                <div className="border-l-4 border-[#F08E70] pl-4">
                  <h4 className="font-semibold text-[#14312C] text-sm">Douglas Lake</h4>
                </div>
                <div className="border-l-4 border-[#F08E70] pl-4">
                  <h4 className="font-semibold text-[#14312C] text-sm">Merritt Golf Club</h4>
                </div>
                <div className="border-l-4 border-[#F08E70] pl-4">
                  <h4 className="font-semibold text-[#14312C] text-sm">Local hiking trails</h4>
                </div>
              </div>
            </div>

              {/* Dining */}
              <div className="bg-[#F9F7F2] p-8 rounded-lg shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full border-2 border-gray-300 overflow-hidden flex-shrink-0">
                    <img
                      src="/merritt-assets/coffee.jpg"
                      alt="Local coffee shops and dining"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-serif text-[#14312C]">Dining</h3>
                </div>
              <div className="space-y-3">
                <div className="border-l-4 border-[#F08E70] pl-4">
                  <h4 className="font-semibold text-[#14312C] text-sm">Local cafés and bakeries</h4>
                </div>
                <div className="border-l-4 border-[#F08E70] pl-4">
                  <h4 className="font-semibold text-[#14312C] text-sm">Family restaurants</h4>
                </div>
                <div className="border-l-4 border-[#F08E70] pl-4">
                  <h4 className="font-semibold text-[#14312C] text-sm">Fast casual dining</h4>
                </div>
                <div className="border-l-4 border-[#F08E70] pl-4">
                  <h4 className="font-semibold text-[#14312C] text-sm">Coffee shops</h4>
                </div>
                <div className="border-l-4 border-[#F08E70] pl-4">
                  <h4 className="font-semibold text-[#14312C] text-sm">Specialty food stores</h4>
                </div>
              </div>
            </div>

            {/* Shopping */}
            <div className="bg-[#F9F7F2] p-8 rounded-lg shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full border-2 border-gray-300 overflow-hidden flex-shrink-0">
                  <img
                    src="/merritt-assets/malls.jpg"
                    alt="Shopping malls and retail centers"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-serif text-[#14312C]">Shopping</h3>
              </div>
              <div className="space-y-3">
                <div className="border-l-4 border-[#F08E70] pl-4">
                  <h4 className="font-semibold text-[#14312C] text-sm">Merritt Mall</h4>
                </div>
                <div className="border-l-4 border-[#F08E70] pl-4">
                  <h4 className="font-semibold text-[#14312C] text-sm">Local boutiques</h4>
                </div>
                <div className="border-l-4 border-[#F08E70] pl-4">
                  <h4 className="font-semibold text-[#14312C] text-sm">Grocery stores</h4>
                </div>
                <div className="border-l-4 border-[#F08E70] pl-4">
                  <h4 className="font-semibold text-[#14312C] text-sm">Hardware stores</h4>
                </div>
                <div className="border-l-4 border-[#F08E70] pl-4">
                  <h4 className="font-semibold text-[#14312C] text-sm">Pharmacy & services</h4>
                </div>
              </div>
            </div>

              {/* Schools */}
              <div className="bg-[#F9F7F2] p-8 rounded-lg shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full border-2 border-gray-300 overflow-hidden flex-shrink-0">
                    <img
                      src="/merritt-assets/schools.jpg"
                      alt="Local schools and educational facilities"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-serif text-[#14312C]">Schools</h3>
                </div>
              <div className="space-y-3">
                <div className="border-l-4 border-[#F08E70] pl-4">
                  <h4 className="font-semibold text-[#14312C] text-sm">Merritt Secondary School</h4>
                </div>
                <div className="border-l-4 border-[#F08E70] pl-4">
                  <h4 className="font-semibold text-[#14312C] text-sm">Clementine Elementary</h4>
                </div>
                <div className="border-l-4 border-[#F08E70] pl-4">
                  <h4 className="font-semibold text-[#14312C] text-sm">Merritt Heritage Elementary</h4>
                </div>
                <div className="border-l-4 border-[#F08E70] pl-4">
                  <h4 className="font-semibold text-[#14312C] text-sm">Virtual schools</h4>
                </div>
                <div className="border-l-4 border-[#F08E70] pl-4">
                  <h4 className="font-semibold text-[#14312C] text-sm">Nicola Valley Institute of Technology</h4>
                </div>
              </div>
            </div>

              {/* Transit */}
              <div className="bg-[#F9F7F2] p-8 rounded-lg shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full border-2 border-gray-300 overflow-hidden flex-shrink-0">
                    <img
                      src="/merritt-assets/transit.jpg"
                      alt="Public transit and transportation"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-serif text-[#14312C]">Transit</h3>
                </div>
              <div className="space-y-3">
                <div className="border-l-4 border-[#F08E70] pl-4">
                  <h4 className="font-semibold text-[#14312C] text-sm">BC Transit bus services</h4>
                </div>
                <div className="border-l-4 border-[#F08E70] pl-4">
                  <h4 className="font-semibold text-[#14312C] text-sm">Kamloops transit connections</h4>
                </div>
                <div className="border-l-4 border-[#F08E70] pl-4">
                  <h4 className="font-semibold text-[#14312C] text-sm">Kelowna transit access</h4>
                </div>
                <div className="border-l-4 border-[#F08E70] pl-4">
                  <h4 className="font-semibold text-[#14312C] text-sm">Regional airport</h4>
                </div>
                <div className="border-l-4 border-[#F08E70] pl-4">
                  <h4 className="font-semibold text-[#14312C] text-sm">Major highway access</h4>
                </div>
              </div>
            </div>

              {/* Neighbourhood Café */}
              <div className="bg-[#F9F7F2] p-8 rounded-lg shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full border-2 border-gray-300 overflow-hidden flex-shrink-0">
                    <img
                      src="/merritt-assets/countrymusic.jpg"
                      alt="Country music festival and events in Merritt"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-serif text-[#14312C]">Country Music Capital</h3>
                </div>
              <p className="text-[#14312C]/70 mb-4">
                Known as Canada's Country Music Capital, Merritt celebrates its rich musical heritage with festivals, events, and community gatherings throughout the year.
              </p>
              <div className="text-sm text-[#14312C]/60">
                Year-round celebrations and events
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-20 pl-8 pr-8 sm:pl-6 sm:pr-6 bg-[#14312C] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Neighbourhood map.</h2>
            <p className="text-white/80 text-xl max-w-3xl mx-auto">
              Explore the amenities and features that make Merritt the perfect place to call home.
            </p>
          </div>

          {/* Map Toggle */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Object.entries(layerData).map(([key, data]) => (
              <button
                key={key}
                onClick={() => setActiveLayer(key as typeof activeLayer)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                  activeLayer === key
                    ? 'bg-[#F08E70] text-[#14312C]'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {data.title}
              </button>
            ))}
          </div>

          {/* Interactive Map */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0">
              <Image
                src="/merritt-assets/nicolavalley.jpg"
                alt="Nicola Valley landscape background"
                fill
                className="object-cover opacity-40"
              />
            </div>
            <div className="relative z-10 h-96 rounded-lg overflow-hidden mb-6">
              <Map
                center={[50.1205, -120.7620]}
                zoom={14}
                markers={markers}
                className="h-full w-full"
              />
            </div>

            {/* Active Layer Content */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {layerData[activeLayer].items.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-[#F9F7F2] rounded-lg">
                  <div className="w-3 h-3 bg-[#F08E70] rounded-full flex-shrink-0"></div>
                  <div>
                    <div className="font-semibold text-[#14312C]">{item.name}</div>
                    <div className="text-sm text-[#14312C]/60">{item.distance}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Connection Section */}
      <section className="py-20 pl-8 pr-8 sm:pl-6 sm:pr-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif text-[#14312C] mb-12">
            Designed for connection.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            <div className="text-center">
              <div className="w-28 h-28 mx-auto mb-4 rounded-full border-2 border-gray-300 overflow-hidden">
                <img
                  src="/merritt-assets/trees.jpg"
                  alt="Beautiful forest and nature scenery"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-[#14312C] mb-2">Spectacular nature nearby</h3>
              <p className="text-[#14312C]/70 text-sm">Hiking trails and scenic views right at your doorstep</p>
            </div>
            <div className="text-center">
              <div className="w-28 h-28 mx-auto mb-4 rounded-full border-2 border-gray-300 overflow-hidden">
                <img
                  src="/merritt-assets/schools.jpg"
                  alt="Local schools and educational facilities"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-[#14312C] mb-2">Schools nearby</h3>
              <p className="text-[#14312C]/70 text-sm">Quality education options for all ages</p>
            </div>
            <div className="text-center">
              <div className="w-28 h-28 mx-auto mb-4 rounded-full border-2 border-gray-300 overflow-hidden">
                <img
                  src="/merritt-assets/countrymusic.jpg"
                  alt="Country music festival and events in Merritt"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-[#14312C] mb-2">Country Music Capital</h3>
              <p className="text-[#14312C]/70 text-sm">Canada's Country Music Capital with festivals and events</p>
            </div>
            <div className="text-center">
              <div className="w-28 h-28 mx-auto mb-4 rounded-full border-2 border-gray-300 overflow-hidden">
                <img
                  src="/merritt-assets/coffee.jpg"
                  alt="Cozy café and community gathering space"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-[#14312C] mb-2">Café on grounds</h3>
              <p className="text-[#14312C]/70 text-sm">Community gathering place coming soon</p>
            </div>
            <div className="text-center">
              <div className="w-28 h-28 mx-auto mb-4 rounded-full border-2 border-gray-300 overflow-hidden">
                <img
                  src="/merritt-assets/transit.jpg"
                  alt="Transportation and transit connections in Merritt"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-[#14312C] mb-2">Easy transit access</h3>
              <p className="text-[#14312C]/70 text-sm">Connected to regional transportation networks</p>
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
                href="/Merritt/floorplans"
                className="inline-block bg-[#a6906c] text-white px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg font-bold uppercase tracking-wider hover:bg-[#8b7355] transition-colors rounded-lg glow-hover cursor-pointer text-center"
              >
                View Floor Plans
              </Link>
              <Link
                href="/Merritt/interiors"
                className="inline-block border-2 border-[#a6906c] text-[#a6906c] px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg font-bold uppercase tracking-wider hover:bg-[#a6906c] hover:text-white transition-colors rounded-lg glow-hover cursor-pointer text-center"
              >
                View Interiors
              </Link>
            </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
