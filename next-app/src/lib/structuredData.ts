// Structured data for SEO
'use client';
export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": ["Organization", "NonProfitOrganization", "HousingProvider"],
  "name": "Anhart",
  "alternateName": ["Anhart Housing", "Anhart Non-Profit Housing"],
  "url": "https://anhart.ca",
  "logo": "https://anhart.ca/images/anhart-logo.png",
  "description": "Vertically integrated affordable housing developer in Vancouver, BC. We develop, manage, and advocate for SROs, modular homes, micro-suites, and supportive housing that creates inclusive communities for low-income families and individuals.",
  "foundingDate": "2000",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "5003 Station Terminal",
    "addressLocality": "Vancouver",
    "addressRegion": "BC",
    "postalCode": "V6B 4A9",
    "addressCountry": "CA"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-6045296259",
    "contactType": "customer service",
    "email": "info@anhart.ca",
    "availableLanguage": "English"
  },
  "sameAs": [
    "https://twitter.com/anhart_housing",
    "https://linkedin.com/company/anhart-affordable-housing",
    "https://facebook.com/anhartaffordablehousing",
    "https://instagram.com/anhart_housing",
    "https://youtube.com/@anhartaffordablehousing",
    "https://vimeo.com/anharthousing",
    "https://flickr.com/photos/anhart-housing",
    "https://pinterest.com/anhart_housing",
    "https://tiktok.com/@anhart_housing",
    "https://medium.com/@anhart_housing",
    "https://issuu.com/anhart_housing",
    "https://slideshare.net/anhart_housing"
  ],
  "areaServed": [
    {
      "@type": "Country",
      "name": "Canada"
    },
    {
      "@type": "State",
      "name": "British Columbia",
      "containsPlace": [
        {"@type": "City", "name": "Vancouver"},
        {"@type": "City", "name": "Hope"},
        {"@type": "City", "name": "Merritt"},
        {"@type": "City", "name": "Victoria"},
        {"@type": "City", "name": "Surrey"},
        {"@type": "City", "name": "Burnaby"}
      ]
    },
    {
      "@type": "State",
      "name": "Alberta",
      "containsPlace": [
        {"@type": "City", "name": "Calgary"},
        {"@type": "City", "name": "Edmonton"},
        {"@type": "City", "name": "Red Deer"},
        {"@type": "City", "name": "Lethbridge"}
      ]
    },
    {
      "@type": "State",
      "name": "Manitoba",
      "containsPlace": [
        {"@type": "City", "name": "Winnipeg"},
        {"@type": "City", "name": "Brandon"},
        {"@type": "City", "name": "Steinbach"}
      ]
    },
    {
      "@type": "State",
      "name": "Ontario",
      "containsPlace": [
        {"@type": "City", "name": "Toronto"},
        {"@type": "City", "name": "Ottawa"},
        {"@type": "City", "name": "Hamilton"},
        {"@type": "City", "name": "London"},
        {"@type": "City", "name": "Kitchener"},
        {"@type": "City", "name": "Windsor"}
      ]
    }
  ],
  "serviceType": [
    "Affordable Housing Development",
    "SRO Conversion",
    "Modular Housing",
    "Micro-Suite Development",
    "Supportive Housing",
    "Non-Profit Housing Management"
  ],
  "keywords": [
    "affordable housing",
    "SROs",
    "modular homes",
    "non-profit housing",
    "low-income housing",
    "subsidized housing",
    "below-market housing",
    "supportive housing",
    "inclusionary housing",
    "affordability",
    "micro-suites",
    "micro-units",
    "vacancy development",
    "derelict homes",
    "single room occupancy",
    "social housing",
    "community housing",
    "rental housing",
    "housing continuum",
    "transitional housing",
    "affordable housing Vancouver",
    "affordable housing Toronto",
    "affordable housing Calgary",
    "affordable housing Edmonton",
    "affordable housing Winnipeg",
    "affordable housing Ottawa",
    "affordable housing Hamilton",
    "affordable housing BC",
    "affordable housing Alberta",
    "affordable housing Manitoba",
    "affordable housing Ontario",
    "SRO conversion Vancouver",
    "SRO conversion Toronto",
    "modular housing BC",
    "modular housing Alberta",
    "modular housing Ontario",
    "micro-suites Vancouver",
    "micro-suites Toronto",
    "supportive housing Calgary",
    "supportive housing Winnipeg",
    "community housing development",
    "housing solutions Canada",
    "non-profit housing development"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Affordable Housing Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Affordable Rental Housing Development",
          "description": "Development of safe, secure, and reasonably priced rental homes for individuals and families"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "SRO and Hotel Conversions",
          "description": "Revitalizing aging single-room occupancy buildings into modern, affordable homes"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Housing Continuum Development",
          "description": "Creating micro-suites as transitional housing from shelters to permanent housing"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Modular Housing Solutions",
          "description": "Innovative modular construction for rapid, cost-effective housing delivery"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Supportive Housing Services",
          "description": "Housing with integrated support services for vulnerable populations"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Community Development",
          "description": "Building thriving, inclusive communities through integrated housing and support services"
        }
      }
    ]
  },
  "knowsAbout": [
    "Affordable Housing Policy",
    "Housing Development",
    "Community Planning",
    "Social Housing",
    "Housing Finance",
    "Modular Construction",
    "SRO Management",
    "Housing Advocacy"
  ]
};

export const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Anhart",
  "url": "https://anhart.ca",
  "description" : "Anhart is a vertically integrated affordable housing developer in Vancouver, BC. Modular homes, SRO conversions, open-source Community Commons. Building 20,000 homes by 2045.",
    "publisher": {
    "@type": "Organization",
    "name": "Anhart",
    "logo": {
      "@type": "ImageObject",
      "url": "https://anhart.ca/images/anhart-logo.png"
    }
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://anhart.ca/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export const breadcrumbStructuredData = (items: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": `https://anhart.ca${item.url}`
  }))
});

export const projectStructuredData = (project: {
  name: string;
  description: string;
  location: string;
  dateCompleted?: string;
  image?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Project",
  "name": project.name,
  "description": project.description,
  "location": {
    "@type": "Place",
    "name": project.location
  },
  "dateCompleted": project.dateCompleted,
  "image": project.image,
  "sponsor": {
    "@type": "Organization",
    "name": "Anhart"
  }
});

// FAQ Schema for common affordable housing questions
export const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is affordable housing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Affordable housing refers to housing units that are affordable to households with incomes below the median income in their area. This includes SROs, modular homes, micro-suites, and other below-market housing options that provide safe, secure, and reasonably priced homes for individuals and families."
      }
    },
    {
      "@type": "Question", 
      "name": "What are SROs and how do they help with affordable housing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SROs (Single Room Occupancy) are small, self-contained units that provide affordable housing in urban areas. We convert aging SRO buildings into modern, affordable homes that preserve community character while providing safe, secure housing for low-income individuals."
      }
    },
    {
      "@type": "Question",
      "name": "What are modular homes and how do they provide affordable housing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Modular homes are prefabricated housing units built in factories and assembled on-site. They provide rapid, cost-effective housing delivery while maintaining quality standards. Our modular housing solutions include tiny homes and multi-unit developments that create affordable communities."
      }
    },
    {
      "@type": "Question",
      "name": "What is supportive housing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Supportive housing combines affordable housing with integrated support services for vulnerable populations. This includes housing with on-site services for individuals experiencing homelessness, mental health challenges, or other barriers to stable housing."
      }
    },
    {
      "@type": "Question",
      "name": "What are micro-suites and how do they help with housing affordability?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Micro-suites are compact, self-contained living units that provide an affordable stepping stone from emergency shelters to permanent housing. They offer privacy and stability while being cost-effective to build and maintain, helping address housing shortages in urban areas."
      }
    },
    {
      "@type": "Question",
      "name": "How does Anhart develop affordable housing projects?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Anhart develops affordable housing through partnerships with communities, non-profit organizations, and government agencies. We provide no-cost pre-development services, architectural feasibility studies, and comprehensive project management to create sustainable, affordable housing solutions."
      }
    }
  ]
};

// Multi-Province Local Business Schemas
export const localBusinessStructuredData = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "NonProfitOrganization"],
  "name": "Anhart",
  "image": "https://anhart.ca/images/anhart-logo.png",
  "description": "Vertically integrated affordable housing developer serving communities across British Columbia, Alberta, Manitoba, and Ontario.",
  "url": "https://anhart.ca",
  "telephone": "+1-6045296259",
  "email": "info@anhart.ca",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "5003 Station Terminal",
    "addressLocality": "Vancouver",
    "addressRegion": "BC",
    "postalCode": "V6B 4A9",
    "addressCountry": "CA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "49.2827",
    "longitude": "-123.1207"
  },
  "openingHours": "Mo-Fr 09:00-17:00",
  "priceRange": "$$",
  "serviceArea": [
    {
      "@type": "State",
      "name": "British Columbia",
      "containsPlace": [
        {"@type": "City", "name": "Vancouver"},
        {"@type": "City", "name": "Victoria"},
        {"@type": "City", "name": "Surrey"},
        {"@type": "City", "name": "Burnaby"},
        {"@type": "City", "name": "Richmond"}
      ]
    },
    {
      "@type": "State", 
      "name": "Alberta",
      "containsPlace": [
        {"@type": "City", "name": "Calgary"},
        {"@type": "City", "name": "Edmonton"},
        {"@type": "City", "name": "Red Deer"},
        {"@type": "City", "name": "Lethbridge"}
      ]
    },
    {
      "@type": "State",
      "name": "Manitoba", 
      "containsPlace": [
        {"@type": "City", "name": "Winnipeg"},
        {"@type": "City", "name": "Brandon"},
        {"@type": "City", "name": "Steinbach"}
      ]
    },
    {
      "@type": "State",
      "name": "Ontario",
      "containsPlace": [
        {"@type": "City", "name": "Toronto"},
        {"@type": "City", "name": "Ottawa"},
        {"@type": "City", "name": "Hamilton"},
        {"@type": "City", "name": "London"},
        {"@type": "City", "name": "Kitchener"},
        {"@type": "City", "name": "Windsor"}
      ]
    }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Affordable Housing Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Affordable Housing Development",
          "description": "Complete development services for affordable housing projects across Canada"
        }
      }
    ]
  }
};

// Province-specific business schemas
export const provinceBusinessSchemas = {
  "BC": {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "NonProfitOrganization"],
    "name": "Anhart - British Columbia",
    "description": "Affordable housing development services in British Columbia including Vancouver, Victoria, Surrey, and Burnaby.",
    "areaServed": {
      "@type": "State",
      "name": "British Columbia"
    },
    "keywords": "affordable housing BC, SRO conversion Vancouver, modular housing British Columbia, micro-suites Victoria, supportive housing Surrey"
  },
  "Alberta": {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "NonProfitOrganization"],
    "name": "Anhart - Alberta",
    "description": "Affordable housing development services in Alberta including Calgary, Edmonton, Red Deer, and Lethbridge.",
    "areaServed": {
      "@type": "State",
      "name": "Alberta"
    },
    "keywords": "affordable housing Alberta, SRO conversion Calgary, modular housing Edmonton, micro-suites Red Deer, supportive housing Lethbridge"
  },
  "Manitoba": {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "NonProfitOrganization"],
    "name": "Anhart - Manitoba",
    "description": "Affordable housing development services in Manitoba including Winnipeg, Brandon, and Steinbach.",
    "areaServed": {
      "@type": "State",
      "name": "Manitoba"
    },
    "keywords": "affordable housing Manitoba, SRO conversion Winnipeg, modular housing Brandon, micro-suites Steinbach, supportive housing Manitoba"
  },
  "Ontario": {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "NonProfitOrganization"],
    "name": "Anhart - Ontario",
    "description": "Affordable housing development services in Ontario including Toronto, Ottawa, Hamilton, London, Kitchener, and Windsor.",
    "areaServed": {
      "@type": "State",
      "name": "Ontario"
    },
    "keywords": "affordable housing Ontario, SRO conversion Toronto, modular housing Ottawa, micro-suites Hamilton, supportive housing London"
  }
};

// Housing Project Schema for individual projects
export const housingProjectStructuredData = (project: {
  name: string;
  description: string;
  location: string;
  units: number;
  type: string;
  completionDate?: string;
  image?: string;
  highlights: string[];
}) => ({
  "@context": "https://schema.org",
  "@type": "Project",
  "name": project.name,
  "description": project.description,
  "location": {
    "@type": "Place",
    "name": project.location,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": project.location
    }
  },
  "dateCompleted": project.completionDate,
  "image": project.image,
  "sponsor": {
    "@type": "Organization",
    "name": "Anhart",
    "url": "https://anhart.ca"
  },
  "additionalProperty": [
    {
      "@type": "PropertyValue",
      "name": "Number of Units",
      "value": project.units
    },
    {
      "@type": "PropertyValue", 
      "name": "Housing Type",
      "value": project.type
    }
  ],
  "about": project.highlights.map(highlight => ({
    "@type": "Thing",
    "name": highlight
  }))
});
