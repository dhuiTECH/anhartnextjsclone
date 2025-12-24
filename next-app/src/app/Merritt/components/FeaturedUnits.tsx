'use client';

import Image from 'next/image';
import { Check } from 'lucide-react';
import { useRef } from 'react';

const featuredUnits = [
  {
    id: 1,
    title: 'Garden Townhome',
    sqft: '1,200 sq ft',
    image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=1000&auto=format&fit=crop',
    features: [
      'Private garden patio',
      'Energy-efficient design',
      'Modern kitchen appliances',
      'Walking distance to parks'
    ]
  },
  {
    id: 2,
    title: 'Sunlit Villa',
    sqft: '1,800 sq ft',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1000&auto=format&fit=crop',
    features: [
      'Floor-to-ceiling windows',
      'Surrounded by mature trees',
      'Open-concept living',
      'Solar panel ready'
    ]
  },
  {
    id: 3,
    title: 'Forest Retreat',
    sqft: '2,100 sq ft',
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1000&auto=format&fit=crop',
    features: [
      'Woodland views',
      'Large outdoor deck',
      'Fireplace included',
      'Quiet neighborhood'
    ]
  },
  {
    id: 4,
    title: 'Sky Townhome',
    sqft: '1,614 sq ft',
    image: '/merritt-assets/merrittdeck.jpg',
    features: [
      'Private patio perfect for BBQ is available right next to the kitchen',
      'Potential private deck: is a small patio for your bedroom',
      'Massive two-story home with separate living and sleeping floors',
      'Master suite with walk-in closet & ensuite'
    ]
  }
];

const FeaturedUnits = () => {
  const containerRef = useRef(null);

  return (
    <section ref={containerRef} className="relative py-20 bg-gradient-to-br from-emerald-50 to-yellow-50 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-4">
            Featured Garden Homes
          </h2>
          <p className="text-lg text-emerald-700 max-w-2xl mx-auto">
            Sun-drenched spaces surrounded by nature
          </p>
        </div>

        {/* Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Tree - static positioning */}
          <div className="absolute -left-16 md:-left-24 top-0 w-48 md:w-72 h-full pointer-events-none z-20 flex items-center">
            <Image
              src="/merritt-assets/trees1.png"
              alt="Decorative pine tree"
              width={400}
              height={600}
              className="object-contain w-full h-auto"
            />
          </div>

          {/* Right Tree - static positioning */}
          <div className="absolute -right-16 md:-right-24 top-0 w-48 md:w-72 h-full pointer-events-none z-20 flex items-center">
            <Image
              src="/merritt-assets/trees2.png"
              alt="Decorative pine tree"
              width={400}
              height={600}
              className="object-contain w-full h-auto"
            />
          </div>

          {featuredUnits.map((unit) => (
            <div
              key={unit.id}
              className="bg-white rounded-2xl shadow-lg border border-emerald-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={unit.image}
                  alt={unit.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Sq Ft Badge */}
                <div className="absolute top-4 right-4 bg-yellow-500 text-emerald-900 px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                  {unit.sqft}
                </div>
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-emerald-900 mb-4">
                  {unit.title}
                </h3>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {unit.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      <span className="text-emerald-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedUnits;
