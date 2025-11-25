import React from "react";
import comBuildImg from "@/assets/partnercarousel/communitybuilder.jpg";
import AACImg from "@/assets/partnercarousel/AAC.png";
import cleanStartImg from "@/assets/partnercarousel/cleanstart.png";
import GWAImg from "@/assets/partnercarousel/gwa_architecture.png";
import smartantImg from "@/assets/partnercarousel/smartant.png";

// Helper to extract .src from Next.js static imports
const getImageSrc = (img: any): string => typeof img === 'string' ? img : img?.src || '';

interface Partner {
  id: number;
  name: string;
  logo: string;
  alt: string;
  website: string;
}

export const GlobalPartners: React.FC<{
  children?: React.ReactNode;
}> = (
  {
    children
  }
) => {
  const partners: Partner[] = [
    {
      id: 1,
      name: "Community Builders",
      logo: getImageSrc(comBuildImg),
      alt: "Community Builders Logo",
      website: "https://www.communitybuilders.ca/",
    },
    {
      id: 2,
      name: "Anhart Constructions",
      logo: getImageSrc(AACImg),
      alt: "Anhart Constructions Logo",
      website: "https://anhartconstruction.ca/",
    },
    {
      id: 3,
      name: "CleanStart",
      logo: getImageSrc(cleanStartImg),
      alt: "CleanStart Logo",
      website: "https://cleanstartbc.ca/",
    },
    {
      id: 4,
      name: "GWA Architecture",
      logo: getImageSrc(GWAImg),
      alt: "GWA Architecture logo",
      website: "https://www.gwaarchitecture.com/",
    },
    {
      id: 5,
      name: "SmartAnt",
      logo: getImageSrc(smartantImg),
      alt: "SmartAnt logo",
      website: "#",
    },
  ];

  // Duplicate partners array for seamless loop
  const allPartners = [...partners, ...partners];

  return (
    <section className="py-12 overflow-hidden" style={{ backgroundColor: "#f5f5f5" }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Subheader */}
        <div className="text-center mb-8">
          <h2
            className="text-3xl font-bold pb-4 inline-block"
            style={{
              color: "#333333",
              borderBottom: "3px solid #1a252f",
            }}
          >
            Our Global Partners
          </h2>
        </div>

        {/* Scrolling Partners Row */}
        <div className="relative">
          <div className="partner-scroll-container">
            <div className="partner-scroll-content">
              {allPartners.map((partner, index) => (
                <a
                  key={`${partner.id}-${index}`}
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="partner-card"
                  aria-label={`Visit ${partner.name}`}
                >
                  <img src={partner.logo} alt={partner.alt} className="partner-logo" loading="lazy" decoding="async" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .partner-scroll-container {
          position: relative;
          width: 100%;
          overflow: hidden;
        }

        .partner-scroll-content {
          display: flex;
          gap: 3rem;
          animation: scroll-left 25s linear infinite;
          width: fit-content;
        }

        .partner-scroll-content:hover {
          animation-play-state: paused;
        }

        .partner-card {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-center;
          padding: 1.5rem 2rem;
          background: white;
          border-radius: 0.75rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          min-width: 200px;
          height: 120px;
        }

        .partner-card:hover {
          box-shadow: 0 4px 12px rgba(255, 77, 109, 0.3);
          transform: translateY(-4px);
          border: 2px solid #ff4d6d;
        }

        .partner-logo {
          max-width: 160px;
          max-height: 80px;
          width: auto;
          height: auto;
          object-fit: contain;
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .partner-scroll-content {
            gap: 2rem;
            animation: scroll-left 20s linear infinite;
          }

          .partner-card {
            min-width: 160px;
            height: 100px;
            padding: 1rem 1.5rem;
          }

          .partner-logo {
            max-width: 120px;
            max-height: 60px;
          }
        }

        @media (max-width: 480px) {
          .partner-scroll-content {
            gap: 1.5rem;
            animation: scroll-left 15s linear infinite;
          }

          .partner-card {
            min-width: 140px;
            height: 80px;
            padding: 0.75rem 1rem;
          }

          .partner-logo {
            max-width: 100px;
            max-height: 50px;
          }
        }
      `}</style>
    </section>
  );
};
