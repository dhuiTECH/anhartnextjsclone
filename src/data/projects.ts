/**
 * =============================================================================
 * PROJECTS DATA
 * =============================================================================
 *
 * Featured Projects Data Structure
 *
 * Contains the project data organized into pages for the Featured Projects(Our Focus)
 * carousel. Each page represents a category of projects with multiple
 * individual projects displayed in a grid layout.
 *
 * Structure:
 * - title: Category title displayed above the projects
 * - description: Category description shown in the section header
 * - projects: Array of individual project objects
 *
 * @source src/pages/Home.tsx - projectPages variable
 */

// =============================================================================
// ASSET IMPORTS
// =============================================================================
// All image imports have been moved to the image registry system
// Images are now referenced by name and loaded through OptimizedImage component

// =============================================================================
// PROJECT PAGES DATA
// =============================================================================

export const projectPages = [
  {
    title: "Affordable Rental and Renewals & Support",
    description: "Transforming communities through innovative affordable housing.",
    projects: [
      {
        id: 1,
        title: "Affordable Rental",
        originalTitle: "The Ryder",
        description:
          "Affordable rental housing provides safe, secure, and reasonably priced homes for individuals and families.",
        image: "Ryder_1",
        location: "Hope, British Columbia",
        completion_date: "2020",
        units: 40,
        status: "completed" as const,
        type: "Modular Housing",
        highlights: [
          "40 affordable modular homes delivered",
          "Rural and remote community focus",
          "First development of affordable housing",
          "Priortization eligbility for under-served and or community members",
          "Sustainable building materials",
        ],
      },
      {
        id: 2,
        title: "Hotel Conversion",
        originalTitle: "Dodson Hotel",
        description:
          "Revitalizing aging SROs into modern, affordable homes that renew communities and strengthen inner cities.",
        image: "DodsonsRooms_1",
        location: "Vancouver, BC",
        completion_date: "2025",
        units: 71,
        status: "completed" as const,
        type: "Historic Renovation",
        highlights: [
          "71 affordable housing units created",
          "Historic SRO building renovation",
          "Downtown Eastside community investment",
          "Preserved architectural heritage",
          "Community support services integrated",
        ],
      },
      {
        id: 3,
        title: "Housing Continuums",
        originalTitle: "162 Main St",
        description:
          "Creating compact micro-suites as a vital first step from shelters to permanent housing, offering stability to rebuild lives.",
        image: "162MainSt",
        location: "Vancouver, BC",
        completion_date: "2024",
        units: 69,
        status: "completed" as const,
        type: "Micro-Suites",
        highlights: [
          "69 micro-suite units for transitional housing",
          "Bridge from shelter to permanent housing",
          "Comprehensive support services",
          "Mix of micro-dwellings and retail markets",
          "Community integration focus",
        ],
      },
    ],
  },
  {
    title: "Affordable Home Ownership",
    description: "Providing low-cost intergenerational homes",
    projects: [
      {
        id: 4,
        title: "Affordable Town Homes",
        originalTitle: "Merritt, BC Townhomes",
        description:
          "Multigenerational townhomes designed to balance privacy, shared space and equity to strengthen communities.",
        image: "merritt",
        location: "Merritt, BC",
        completion_date: "2026",
        units: 35,
        status: "planned" as const,
        type: "Townhomes",
        highlights: [
          "48 multigenerational townhome units",
          "Balanced privacy and community design",
          "Affordable ownership opportunities",
          "Rural community revitalization",
          "Enviromental efficient housing",
        ],
      },
      {
        id: 5,
        title: "Low-cost standalone housing",
        originalTitle: "Detached Homes",
        description:
          "Durable, affordable homes, providing communities with accessible, long-term ownership to a path of stability.",
        image: "AFS_1",
        location: "Various BC Locations",
        units: 6,
        status: "in-progress" as const,
        type: "Single-Family Homes",
        highlights: [
          "Various affordable detached homes styles",
          "Long-term ownership stability",
          "Multiple community locations",
          "Accessible design standards",
          "Energy-efficient construction",
        ],
      },
      {
        id: 6,
        title: "Modular Villages",
        originalTitle: "Modular Tiny Homes",
        description:
          "Modular homes combining private ownership with shared infrastructure to foster affordable, resilient communities.",
        image: "ModularH_1",
        location: "Hope, BC",
        year: "2024",
        status: "in-progress" as const,
        type: "Modular Tiny Homes",
        highlights: [
          "Modular tiny home units",
          "Shared infrastructure model",
          "Private ownership opportunities",
          "Community resilience focus",
          "Innovative modular construction",
        ],
      },
    ],
  },
];
