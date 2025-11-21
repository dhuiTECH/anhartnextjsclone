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
      description: "Building Dignified, Affordable Homes That Put People First",
      cards: [
        {
          id: 1,
          title: "Affordable Rental Housing",
          description: "Securing long-term, dignified rental opportunities that remain accessible to working families and individuals.",
          purpose:
            "To provide security of tenure and financial stability, serving as a launchpad for individual growth and community health.",
          exampleProject: {
            name: "The Ryder",
            location: "Hope, British Columbia",
            description:
              "40 affordable modular homes delivered to a rural community, prioritizing eligibility for underserved community members.",
            image: "Ryder_1",
            highlights: [
              "40 units of secure, affordable housing delivered",
              "Addressing critical rural housing gaps",
              "Pioneering development for community retention",
              "Prioritizing access for underserved populations",
              "Sustainable, energy-efficient material integration",
            ],
          },
          icon: "Home",
        },
        {
          id: 2,
          title: "Hotel & SRO Conversions",
          description: "Transforming aging urban infrastructure into safe, modern homes without displacing community roots.",
          purpose:
            "To preserve vital housing and architectural heritage while significantly improving living standards for vulnerable residents.",
          exampleProject: {
            name: "Dodson Hotel",
            location: "Vancouver, BC",
            description:
              "A restorative renovation of a historic SRO, preserving 71 units of essential housing in the Downtown Eastside.",
            image: "Dodson St",
            highlights: [
              "71 units of essential housing preserved",
              "Restorative renovation of historic SRO",
              "Deep investment in Downtown Eastside stability",
              "Preservation of cultural and architectural heritage",
              "Integrated, on-site social support networks",
            ],
          },
          icon: "Building",
        },
        {
          id: 3,
          title: "Transitional Housing Continuums",
          description: "Establishing a bridge between vulnerability to stability through supported micro-living environments.",
          purpose: "To fill the critical gap between emergency shelter and permanent residency through a supportive continuum of care.",
          exampleProject: {
            name: "162 Main St",
            location: "Vancouver, BC",
            description: "69 micro-suite units providing transitional housing with comprehensive support services.",
            image: "162MainSt",
            highlights: [
              "69 micro-suites for transitional stability",
              "Critical pathway from shelter to permanent housing",
              "Holistic wraparound support services",
              "Innovative mix of micro-dwellings and social enterprise",
              "Fostering social reintegration and belonging",
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
          description: "Providing pathways to home ownership through alternative financing and innovative ownership models.",
          purpose:
            "Create intergenerational long lasting communities through accessible home ownership opportunities.",
          exampleProject: {
            name: "Merritt Townhomes",
            location: "Merritt, BC",
            description: "48 multigenerational townhome units designed to balance privacy, shared space, and equity.",
            image: "merritt",
            highlights: [
              "48 units of multigenerational family housing",
              "Design that balances privacy with social connection",
              "Lower the barriers to market entry",
              "Catalyst for rural economic revitalization",
              "Environmentally conscious, high-performance design",
            ],
          },
          icon: "Key",
        },
        {
          id: 5,
          title: "Modular Housing Solutions",
          description: "Innovative modular construction technology to deliver rapid, cost-effective, and local modular housing delivery.",
          purpose: "To solve the housing supply crisis through scalable, sustainable, and cost-efficient modular methodologies.",
          exampleProject: {
            name: "Modular Tiny Homes",
            location: "Hope, BC",
            description:
              "A forward-thinking model combining private ownership with shared infrastructure to foster affordable, resilient communities.",
            image: "ModularH_1",
            highlights: [
              "High-efficiency modular tiny home units",
              "Collaborative shared infrastructure model",
              "Accessible private ownership opportunities",
              "Focus on climate and social resilience",
              "Rapid deployment via off-site construction",
            ],
          },
          icon: "Layers",
          link: "https://anhartconstruction.ca/modular",
        },
        {
          id: 6,
          title: "Holistic Community Development",
          description: "Building not just homes, complete ecosystems where social connection, commerce, and housing intersect.",
          purpose: "To move beyond 'housing units' and build inclusive neighborhoods that foster belonging and social capital.",
          exampleProject: {
            name: "Detached Homes Program",
            location: "Various BC Locations",
            description:
              "Various affordable detached home styles providing long-term ownership stability across multiple communities.",
            image: "AFS_1",
            highlights: [
              "Diverse architectural styles respecting local context",
              "Ensuring long-term family stability",
              "Seamless integration into existing communities",
              "Universal design standards for accessibility",
              "Net-zero ready construction practices",
            ],
          },
          icon: "Heart",
        },
      ],
    },
  ],
};
