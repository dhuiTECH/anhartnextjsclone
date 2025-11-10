'use client';

/**
 * =============================================================================
 * OUR FOCUS DATA
 * =============================================================================
 *
 * Our Focus Section Data Structure
 *
 * Contains the data for the "Our Focus" section that showcases the different
 * purposes and concepts of Anhart's projects. This data is isolated from other
 * project data to maintain separation of concerns.
 *
 * Structure:
 * - title: Section title
 * - description: Section description
 * - cards: Array of focus cards with purpose and example project
 *
 * @author Anhart Development Team
 * @version 1.0.0
 * @since 2025
 */

// =============================================================================
// TYPES
// =============================================================================

export interface FocusCard {
  id: number;
  title: string;
  description: string;
  purpose: string;
  exampleProject: {
    name: string;
    location: string;
    description: string;
    image: string;
    highlights: string[];
  };
  icon: string;
  link?: string;
}

export interface OurFocusPage {
  title: string;
  description: string;
  cards: FocusCard[];
}

export interface OurFocusData {
  title: string;
  pages: OurFocusPage[];
}

// =============================================================================
// OUR FOCUS DATA
// =============================================================================

export const ourFocusData: OurFocusData = {
  title: "Our Focus",
  pages: [
    {
      title: "Affordable Rental and Renewals & Support",
      description: "Transforming communities through innovative affordable housing.",
      cards: [
        {
          id: 1,
          title: "Affordable Rental Housing",
          description: "Creating safe, secure, and reasonably priced rental homes for individuals and families.",
          purpose:
            "Provide stable, affordable rental housing that serves as a foundation for community stability and individual growth.",
          exampleProject: {
            name: "The Ryder",
            location: "Hope, British Columbia",
            description:
              "40 affordable modular homes delivered to a rural community, prioritizing eligibility for underserved community members.",
            image: "Ryder_1",
            highlights: [
              "40 affordable modular homes delivered",
              "Rural and remote community focus",
              "First development of affordable housing",
              "Prioritization eligibility for under-served community members",
              "Sustainable building materials",
            ],
          },
          icon: "Home",
        },
        {
          id: 2,
          title: "Hotel & SRO Conversions",
          description: "Revitalizing aging single-room occupancy buildings into modern, affordable homes.",
          purpose:
            "Transform underutilized urban infrastructure into vibrant affordable housing while preserving community character.",
          exampleProject: {
            name: "Dodson Hotel",
            location: "Vancouver, BC",
            description:
              "Historic SRO building renovation creating 71 affordable housing units in the Downtown Eastside.",
            image: "Dodson St",
            highlights: [
              "71 affordable housing units created",
              "Historic SRO building renovation",
              "Downtown Eastside community investment",
              "Preserved architectural heritage",
              "Community support services integrated",
            ],
          },
          icon: "Building",
        },
        {
          id: 3,
          title: "Housing Continuums",
          description: "Creating compact micro-suites as a vital first step from shelters to permanent housing.",
          purpose: "Bridge the gap between emergency shelter and permanent housing through transitional support.",
          exampleProject: {
            name: "162 Main St",
            location: "Vancouver, BC",
            description: "69 micro-suite units providing transitional housing with comprehensive support services.",
            image: "162MainSt",
            highlights: [
              "69 micro-suite units for transitional housing",
              "Bridge from shelter to permanent housing",
              "Comprehensive support services",
              "Mix of micro-dwellings and retail markets",
              "Community integration focus",
            ],
          },
          icon: "Users",
        },
      ],
    },
    {
      title: "Affordable Home Ownership",
      description: "Providing low-cost intergenerational homes",
      cards: [
        {
          id: 4,
          title: "Affordable Home Ownership",
          description: "Providing pathways to home ownership through innovative ownership models.",
          purpose:
            "Create intergenerational wealth and community stability through accessible home ownership opportunities.",
          exampleProject: {
            name: "Merritt Townhomes",
            location: "Merritt, BC",
            description: "48 multigenerational townhome units designed to balance privacy, shared space, and equity.",
            image: "merritt",
            highlights: [
              "48 multigenerational townhome units",
              "Balanced privacy and community design",
              "Affordable ownership opportunities",
              "Rural community revitalization",
              "Environmental efficient housing",
            ],
          },
          icon: "Key",
        },
        {
          id: 5,
          title: "Modular Housing Solutions",
          description: "Innovative modular construction for rapid, cost-effective, and local modular housing delivery.",
          purpose: "Accelerate housing delivery through efficient, sustainable modular construction methods.",
          exampleProject: {
            name: "Modular Tiny Homes",
            location: "Hope, BC",
            description:
              "Modular homes combining private ownership with shared infrastructure to foster affordable, resilient communities.",
            image: "ModularH_1",
            highlights: [
              "Modular tiny home units",
              "Shared infrastructure model",
              "Private ownership opportunities",
              "Community resilience focus",
              "Innovative modular construction",
            ],
          },
          icon: "Layers",
          link: "https://anhartconstruction.ca/modular",
        },
        {
          id: 6,
          title: "Community Development",
          description: "Building not just homes, but thriving, inclusive communities.",
          purpose: "Foster social cohesion and community resilience through integrated housing and support services.",
          exampleProject: {
            name: "Detached Homes Program",
            location: "Various BC Locations",
            description:
              "Various affordable detached home styles providing long-term ownership stability across multiple communities.",
            image: "AFS_1",
            highlights: [
              "Various affordable detached home styles",
              "Long-term ownership stability",
              "Multiple community locations",
              "Accessible design standards",
              "Energy-efficient construction",
            ],
          },
          icon: "Heart",
        },
      ],
    },
  ],
};
