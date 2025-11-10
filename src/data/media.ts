/**
 * =============================================================================
 * MEDIA DATA
 * =============================================================================
 *
 * Media Content Data Structures
 *
 * Contains all media-related data for the Media page including:
 * - Media gallery (videos and images)
 * - PDF documents for download and preview
 * - Press releases and news articles
 *
 * @source src/pages/Media.tsx - mediaGallery, pdfDocuments, pressReleases variables
 */

// =============================================================================
// TYPE IMPORTS
// =============================================================================
import { MediaItem, PdfDocument, PressRelease } from "@/types/common";

// =============================================================================
// ASSET IMPORTS
// =============================================================================
// PDF URLS (from public/mediaAssets/)
export const TRI_BROCH_PDF = "/mediaAssets/Display+Brochure+October+1+2025-compressed.pdf";
export const ANHART_BROCHURE_PDF = "/mediaAssets/Anhart Brochure September 16 2025.pdf";
export const ANHART_LP_PDF = "/mediaAssets/8-Pager-Slide-Version-January-30-2025.pdf";
export const INVESTMENTS_PROSPECTUS_PDF = "/mediaAssets/Investments Prospectus March 24 2025.pdf";
// =============================================================================
// MEDIA GALLERY DATA
// =============================================================================

export const mediaGallery: MediaItem[] = [
  {
    id: 1,
    type: "video",
    title: "Ryder Village",
    description:
      "Ryder Village in Hope, BC is 40 affordable family apartments developed by Anhart in 2022 with impact investments and the CMHC's RCFI program.",
    date: "November 2020",
    thumbnail: "https://img.youtube.com/vi/LhDOnUN2SOw/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=LhDOnUN2SOw",
  },
  {
    id: 2,
    type: "video",
    title: "Winnipeg Revitalized",
    description:
      "Anhart is working with local non profits and community champion consultants to develop supportive and affordable housing in Winnipeg. Manitoba.",
    date: "July, 2024",
    thumbnail: "https://img.youtube.com/vi/RBy5tRKA8FM/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=RBy5tRKA8FM",
  },
  {
    id: 3,
    type: "video",
    title: "Hope Tiny Homes",
    description:
      "Hope Tiny Homes builds housing for as little at $99,000 with 5% down and 15% impact investments to qualified low income buyers.",
    date: "September, 2024",
    thumbnail: "https://img.youtube.com/vi/PxIIKiIyYzs/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=PxIIKiIyYzs",
  },
];

// =============================================================================
// PDF DOCUMENTS DATA
// =============================================================================

export const pdfDocuments: PdfDocument[] = [
  {
    id: 1,
    title: "Anhart Brochure ONPHA October 3 2025",
    description: " A brochure for Anhart Affordable Housing, detailing our mission to provide sustainable, affordable homes.",
    date: "October 2025",
    pages: 2,
    size: "0.5 MB",
    url: triBrochPdf,
  },
  {
    id: 2,
    title: "Anhart Brochure September 16, 2025",
    description: "A comprehensive overview of what forms of housing do we at Anhart Affordable Housing provide to communities.",
    date: "September, 2025",
    pages: 2,
    size: "1.89 MB",
    url: anhartBrochurePdf,
  },
  {
    id: 3,
    title: "Anhart Affordable Limited Partnership",
    description: "An overview of the Anhart Affordable Housing Limited Partnership, including the investment terms and conditions.",
    date: "January, 2025",
    pages: 8,
    size: "1.15 MB",
    url: anhartLimitedPartnershipPdf,
  },
  {
    id: 4,
    title: "Investments Prospectus March 24, 2025",
    description: "Detailed investment prospectus outlining Anhart'sopportunities and financial performance for potential investors.",
    date: "March, 2025",
    pages: 12,
    size: "2.1 MB",
    url: investmentsProspectusPdf,
  },
];

// =============================================================================
// PRESS RELEASES DATA
// =============================================================================

export const pressReleases: PressRelease[] = [
  {
    id: 1,
    title: "6-Storey Micro Dwelling Proposed for Vancouver's Main Street",
    source: "Vancouver Market",
    date: "August, 2019",
    excerpt: "A six-storey micro-suite building has been proposed for Main Street, aiming to provide an innonative urban housing solution.",
    type: "external",
    url: "https://vancouvermarket.ca/2019/08/26/6-storey-micro-dwelling-building-proposed-for-main-street/",
  },
  {
    id: 2,
    title: "Anhart Ryder Project Supports Affordable Housing",
    source: "Vancity Rethink",
    date: "2024",
    excerpt: "Vancity highlights Anhart Affordable Housing's Ryder project as a key contribution to affordable rental housing in Hope, BC.",
    type: "external",
    url: "https://rethink.vancity.com/actions/anhart-ryder",
  },
  {
    id: 3,
    title: "Province Buys The Ryder Apartment Building in Hope",
    source: "Hope Standard",
    date: "October, 2023",
    excerpt:
      "The provincial government purchases The Ryder building to secure affordable housing units in Hope, ensuring community stability.",
    type: "external",
    url: "https://www.hopestandard.com/local-news/province-buys-the-ryder-apartment-building-in-hope-to-ensure-affordable-housing-5887454",
  },
  {
    id: 4,
    title: "Anhart Stories: The Foundation of Community Housing",
    source: "Anhart Community Stories",
    date: "2024",
    excerpt:
      "The inspiring story of how Hart and Anita Molthagen's philanthropic vision grew into a comprehensive affordable housing organization.",
    type: "modal",
    fullText: `<h3>Anhart Stories: The Foundation of Community Housing</h3>
        <p><em>From the Anhart Community Stories Archive - 2024</em></p>
        
        <h4>A Vision Born from Success</h4>
        <p>In his 50th year, Hart Molthagen and his wife Anita decided to give back to a nearby community from their successful business profits. In 2000 they purchased and renovated a 80 single room occupancy run down building and renamed it Jubilee Rooms.</p>
        
        <p>This initial act of community service would become the foundation for what is now one of Canada's most respected affordable housing organizations.</p>
        
        <h4>Inspiring Others to Act</h4>
        <p>In 2004, David and Lise Ash followed the inspiration of the Molthagens and purchased and renovated the 71 room Dodson Hotel. Their commitment to community development demonstrated how individual acts of generosity could create lasting change.</p>
        
        <h4>Building an Organization</h4>
        <p>Since 2002, Anhart operated and managed the renovations for the two philanthropist families. In 2013, both buildings were sold to Anhart for 50% of their fair market value - a generous gift that provided the organization with the capital and experience needed to expand their mission.</p>
        
        <h4>Expanding Impact</h4>
        <p>The generosity of the Molthagens and Ashes was also the foundation of the efforts of the Community Builders Group to house 800 at-risk persons in Vancouver's core, and the creation of Clean Start, a large community contribution company that hires persons with barriers to employment.</p>
        
        <h4>A Legacy of Community Building</h4>
        <p>What began as a single act of philanthropy has grown into a comprehensive approach to community development. From those first 151 rooms in the Jubilee and Dodson buildings, Anhart has expanded to develop hundreds of affordable housing units across Western Canada.</p>
        
        <p>The story demonstrates how individual generosity, when combined with professional management and a long-term vision, can create sustainable solutions to housing challenges that continue to benefit communities for decades.</p>
        
        <p><em>This story is part of the Anhart Community Stories project, documenting the people and partnerships that have made affordable housing possible in communities across Canada.</em></p>`,
  },
];
