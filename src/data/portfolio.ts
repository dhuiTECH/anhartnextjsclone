/**
 * =============================================================================
 * PORTFOLIO DATA
 * =============================================================================
 *
 * Portfolio Projects Data Structure
 *
 * Contains the complete portfolio of projects for the gallery modal.
 * This data is used when users click on the "Homes Created" statistic
 * to view all projects in a detailed gallery format.
 *
 * Each project includes:
 * - Basic info: id, title, location, year, completion_date
 * - Project details: units, description, status, type
 * - Visual: image path
 * - Highlights: array of key project achievements
 *
 * @source src/pages/Home.tsx and ProjectGalleryModal - portfolioProjects variable
 */

// =============================================================================
// TYPE IMPORTS
// =============================================================================
import { ProjectData } from "@/types/project";

// =============================================================================
// ASSET IMPORTS
// =============================================================================
// All image imports have been moved to the image registry system
// Images are now referenced by name and loaded through OptimizedImage component

// =============================================================================
// PORTFOLIO PROJECTS DATA
// =============================================================================

export const portfolioProjects: ProjectData[] = [
  {
    id: 1,
    title: "Jubilee Rooms",
    location: "Vancouver, BC",
    year: "2000",
    units: 80,
    description:
      "Our foundational project in Vancouver's Downtown Eastside, transforming a historic building into affordable housing through innovative renovation.",
    image: "Jubilee-Sign",
    status: "completed",
    type: "Historic Renovation",
    highlights: [
      "80 affordable housing units created",
      "Historic building preservation",
      "Downtown Eastside community investment",
      "Foundational project that launched our mission",
      "Innovative renovation techniques",
      "Community support services integration",
    ],
  },
  {
    id: 2,
    title: "Dodson Hotel",
    location: "Vancouver, BC",
    year: "2004",
    units: 71,
    description:
      "A historical hotel renovation creating affordable housing units while preserving the character of Vancouver's Downtown Eastside. Established the early need for clean, safe and dignified housing for vulnerable individuals. ",
    image: "DodsonsRooms_1",
    status: "completed",
    type: "Hotel Conversion",
    highlights: [
      "71 affordable housing units",
      "Historic hotel conversion",
      "Preserved architectural character",
      "Downtown Eastside revitalization",
      "Community-centered design",
      "Long-term affordability secured",
    ],
  },
  {
    id: 3,
    title: "The Ryder",
    location: "Hope, BC",
    year: "2021",
    units: 40,
    description:
      "Delivering 40 units of modular homes that expand affordable housing efforts in rural and remote communities focusing on building and fostering residency self-sufficiency.",
    image: "Ryder_1",
    status: "completed",
    type: "Modular Housing",
    highlights: [
      "40 affordable modular homes delivered",
      "Rural and remote community focus",
      "First development of affordable housing",
      "Prioritization eligibility for under-served community members",
      "Sustainable building materials",
    ],
  },
  {
    id: 4,
    title: "162 Main",
    location: "Vancouver, BC",
    completion_date: "2023",
    units: 69,
    description:
      "Inner-city development that provides integrated support services and sustainable, resident-focused living environments for individuals experiencing homelessness with mental health callenges and low income.",
    image: "162Main",
    status: "completed",
    type: "Micro-Suites",
    highlights: [
      "69 micro-suite units for transitional housing",
      "Bridge from shelter to permanent housing",
      "Comprehensive support services",
      "Mix of micro-dwellings and retail markets",
      "Community integration focus",
    ],
  },
  {
    id: 5,
    title: "Merritt Village",
    location: "3757 De Wolf Way, Merritt, BC",
    year: "2026",
    units: 46,
    description:
      "Multigenerational townhomes community in Merritt, BC, offering affordable two- and three-bedroom units that balance privacy, shared spaces, and equity to strengthen community resilience",
    image: "Merritt",
    status: "in-progress",
    type: "Townhomes",
    highlights: [
      "46 multigenerational townhome units",
      "Balanced privacy and community design",
      "Affordable ownership opportunities",
      "Rural community revitalization",
      "Environmental efficient housing",
    ],
  },
  {
    id: 6,
    title: "179 Main & 626 Alexander",
    location: "Vancouver, BC",
    year: "2018, 2020",
    units: 14,
    description:
      "Development of low-income affordable inner-city housing, integrating modern designs with community needs.",
    image: "affordapartment",
    status: "completed",
    type: "Multi-Phase Development",
    highlights: [
      "14 affordable apartment units (9 + 5)",
      "Inner-city location advantages",
      "Modern design integration",
      "Community-focused amenities",
    ],
  },
];
