/**
 * =============================================================================
 * PILLARS DATA
 * =============================================================================
 *
 * How Do We Do It Section Data Structure
 *
 * Contains the three pillars of Anhart's approach structured for
 * the ThreeCardSection component.
 *
 * @source src/pages/Home.tsx - howDoWeDoItPillars variable
 */

// =============================================================================
// ASSET IMPORTS
// =============================================================================
// All image imports have been moved to the image registry system
// Images are now referenced by name and loaded through OptimizedImage component
// Note: These images are not yet optimized - using fallback paths

// =============================================================================
// PILLARS DATA
// =============================================================================

export const howDoWeDoItPillars = [
  {
    id: 1,
    title: "Experience",
    description:
      "We recognize that intelligence thrives at every level. Our solutions are built on insights from the ground up, from local residents to city planners.",
    image: "beaverConsturction",
    backTitle: "Trusted Technical Partners",
    backDescription:
      "We partner with proven architects, engineers, and builders who reduce costs and deliver quality—without cutting corners. Their expertise ensures innovation.",
    backImage: "Trusted-Partners",
  },
  {
    id: 2,
    title: "Altruism",
    description:
      "We apply insights from decentralized systems theory to our work, creating interconnected housing solutions that strengthen entire communities.",
    image: "expert-consultation",
    backTitle: "Altruism in Action",
    backDescription:
      "A key part of our system involves guiding impact investors to secure patient capital, ensuring financial goals are aligned with long-term community well-being.",
    backImage: "systemsNetwork",
  },
  {
    id: 3,
    title: "Multi-Scale",
    description:
      "Studying community intelligence at every level to design housing that strengthens resilience and belonging. Focusing on the macro and micro of bodies in a system.",
    image: "thinkingStatueLaptop",
    backTitle: "Partners in Development",
    backDescription:
      "Our champion partners bring invaluable local knowledge and passion. They are essential to creating housing that is not just built, but truly belongs.",
    backImage: "communityChampions",
  },
];
