"use client";

/**
 * =============================================================================
 * PORTFOLIO DETAILED DATA
 * =============================================================================
 *
 * Detailed Portfolio Projects Data Structure
 *
 * Contains the complete portfolio of projects for the Portfolio page.
 * This data includes all project details with comprehensive information
 * for the portfolio gallery display.
 *
 * Each project includes:
 * - Basic info: id, title, location, year, completion_date
 * - Project details: units, description, status, type
 * - Visual: image path
 * - Highlights: array of key project achievements
 *
 * @source src/pages/Portfolio.tsx - projects variable
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

export const portfolioDetailedProjects: ProjectData[] = [
  {
    id: 1,
    title: "Jubilee Rooms",
    location: "235 Main, Vancouver, BC",
    year: "2000",
    units: 80,
    description:
      "Our foundational project in Vancouver's Downtown Eastside, transforming a historic building into affordable housing through innovative renovation.",
    briefDescription:
      "Historic rooming house revitalized into 80 affordable units, marking the beginning of our housing-first mission in Vancouver's Downtown Eastside.",
    comprehensiveDetails:
      "The Jubilee Rooms project represents the cornerstone of Anhart's affordable housing mission. This historic building renovation in Vancouver's Downtown Eastside created 80 affordable housing units while preserving the architectural character of the original structure. The project demonstrated our innovative approach to transforming existing buildings into dignified, safe, and affordable housing solutions. Through careful renovation techniques and community-centered design, we established a model for sustainable urban housing development that continues to guide our work today. The project includes integrated support services and community spaces, fostering a sense of belonging and stability for residents.",
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
    title: "The Ryder",
    location: "1270 Ryder, Hope, BC",
    year: "2021",
    units: 40,
    description:
      `Delivering 40 modular homes that expand affordable housing efforts in rural and remote communities while fostering resident stability and self-sufficiency.

## How We Keep Housing Affordable

The Ryder serves as a proof of concept for Anhart's sustainable model of affordable housing that thrives outside major metropolitan hubs. Our approach combines philanthropy, innovation, and community empowerment to keep housing costs below market rates:

**Community Champions Program**: We tackle soaring construction costs through our Community Champions initiative, where local business owners and professionals provide deep discounts on materials and services. In Hope, BC, this meant partnering with local geotechnical engineers, landscape architects, and construction professionals who contributed their expertise at reduced rates. This program is a cornerstone of our plan to build affordable housing without passing high costs to residents.

**Modular Construction Advantage**: Units were assembled in a Kamloops factory before being transported to the site, offering significant advantages: faster completion (from groundbreaking to occupancy in just 8 months), precise quality control in a climate-controlled environment, and accessibility features like Rick Hansen Foundation Silver certification.

**Tenant-Led Management**: Affordability extends beyond initial development through our innovative tenant-led model. Instead of traditional building managers, residents are paid to handle cleaning, maintenance, community watch, and amenity bookings. This creates a 'heartbeat' within the building, fostering volunteerism and mutual aid among diverse residents including seniors, families, and those formerly homeless.

**Non-Profit Mission**: As a charity-owned society, our focus is community impact rather than profit maximization, allowing us to reinvest savings in lower rents and sustainable operations.

## Financing Stack & Partnerships

**Credit Union Partnerships**: We work closely with credit unions like Coast Capital Savings to provide flexible financing solutions. For The Ryder project, Coast Capital provided construction financing that aligned with our community impact goals, offering competitive rates and terms that supported our non-profit mission.

**Impact Investors**: Our financing stack includes impact investors who prioritize social returns alongside financial returns. These investors understand that affordable housing creates long-term community benefits and are willing to provide patient capital that doesn't require rapid exits or excessive returns.

**Community Champions Business Network**: Beyond individual professional discounts, our Community Champions program includes strategic partnerships with local businesses who provide ongoing support. In Hope, this included partnerships with local suppliers who offered volume discounts and payment terms that supported our cash flow needs.

**Hybrid Financing Model**: We combine multiple funding sources including charitable contributions, impact investment, credit union financing, and government grants. This diversified approach reduces risk and ensures we can deliver projects even in challenging economic environments.`,
    briefDescription:
      "40 modular homes in Hope, BC, expanding affordable housing in rural communities with a focus on stability, self-sufficiency, and community-building.",
    comprehensiveDetails:
      `The Ryder project represents Anhart's commitment to addressing housing needs in rural and remote communities across British Columbia. This innovative modular housing development delivered 40 affordable homes to Hope, demonstrating our ability to adapt construction methods to meet the unique challenges of smaller communities. The project prioritizes resident self-sufficiency through thoughtful design and community support services. Using sustainable building materials and modern construction techniques, The Ryder provides high-quality, energy-efficient housing that serves as a model for rural affordable housing development. The project includes community spaces and support services designed to foster resident independence and community connection.

## How We Keep Housing Affordable

The Ryder serves as a proof of concept for Anhart's sustainable model of affordable housing that thrives outside major metropolitan hubs. Our approach combines philanthropy, innovation, and community empowerment to keep housing costs below market rates:

**Community Champions Program**: We tackle soaring construction costs through our Community Champions initiative, where local business owners and professionals provide deep discounts on materials and services. In Hope, BC, this meant partnering with local geotechnical engineers, landscape architects, and construction professionals who contributed their expertise at reduced rates. This program is a cornerstone of our plan to build affordable housing without passing high costs to residents.

**Modular Construction Advantage**: Units were assembled in a Kamloops factory before being transported to the site, offering significant advantages: faster completion (from groundbreaking to occupancy in just 8 months), precise quality control in a climate-controlled environment, and accessibility features like Rick Hansen Foundation Silver certification.

**Tenant-Led Management**: Affordability extends beyond initial development through our innovative tenant-led model. Instead of traditional building managers, residents are paid to handle cleaning, maintenance, community watch, and amenity bookings. This creates a 'heartbeat' within the building, fostering volunteerism and mutual aid among diverse residents including seniors, families, and those formerly homeless.

**Non-Profit Mission**: As a charity-owned society, our focus is community impact rather than profit maximization, allowing us to reinvest savings in lower rents and sustainable operations.

## Financing Stack & Partnerships

**Credit Union Partnerships**: We work closely with credit unions like Coast Capital Savings to provide flexible financing solutions. For The Ryder project, Coast Capital provided construction financing that aligned with our community impact goals, offering competitive rates and terms that supported our non-profit mission.

**Impact Investors**: Our financing stack includes impact investors who prioritize social returns alongside financial returns. These investors understand that affordable housing creates long-term community benefits and are willing to provide patient capital that doesn't require rapid exits or excessive returns.

**Community Champions Business Network**: Beyond individual professional discounts, our Community Champions program includes strategic partnerships with local businesses who provide ongoing support. In Hope, this included partnerships with local suppliers who offered volume discounts and payment terms that supported our cash flow needs.

**Hybrid Financing Model**: We combine multiple funding sources including charitable contributions, impact investment, credit union financing, and government grants. This diversified approach reduces risk and ensures we can deliver projects even in challenging economic environments.`,
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
    id: 3,
    title: "162 Main St",
    location: "Vancouver, BC",
    year: "2023",
    units: 69,
    description:
      `Inner-city development that provides affordable homes with integrated support services for individuals facing mental health challenges and low incomes.

## How We Keep Housing Affordable in Urban Centers

The housing crisis in Canada's major metropolitan areas is particularly acute, and 162 Main St serves as a model for sustainable affordable housing development in dense urban environments. Our approach demonstrates how philanthropy, innovation, and community empowerment can keep housing affordable even in high-cost areas:

**Community Champions Program**: In Vancouver's competitive construction market, we leverage our Community Champions program where local business owners and professionals provide deep discounts on professional services and construction materials. This reduces costs without compromising quality, ensuring the project remains viable for low-income residents.

**Innovative Construction Methods**: The building utilizes a hybrid structure of light wood frame over a concrete podium, optimizing construction efficiency while maintaining structural integrity on a narrow urban infill site. This approach allows us to build high-quality homes more cost-effectively than traditional methods.

**Supportive Housing Model**: Affordability extends beyond rent through integrated support services. The MPA Society provides on-site mental health support, counseling, and community programs that help residents maintain housing stability and reduce the need for emergency services, creating long-term cost savings for both residents and the community.

**Non-Profit Mission**: As a charity-owned society, our goal is community impact rather than profit maximization. We reinvest in lower rents and prioritize vulnerable populations including seniors, newcomers, and individuals transitioning from shelters, ensuring housing remains permanently affordable rather than becoming market-rate over time.

## Financing Stack & Partnerships

**Credit Union Partnerships**: We collaborate with credit unions that share our community-focused values. These partnerships provide construction financing at competitive rates while supporting our mission-driven approach to affordable housing development.

**Impact Investors**: Our financing includes impact investors who recognize the long-term social and economic benefits of affordable housing. These investors provide patient capital that allows us to focus on community impact rather than short-term financial returns.

**Community Champions Business Network**: In urban markets like Vancouver, our Community Champions program extends to include strategic partnerships with local businesses, suppliers, and service providers who offer volume discounts and flexible terms. This network helps reduce construction costs and supports our cash flow needs.

**Hybrid Financing Model**: We employ a diversified financing approach combining charitable foundations, impact investment, credit union financing, and government subsidies. This multi-source funding strategy reduces risk and ensures we can deliver complex urban projects that serve vulnerable populations.`,
    briefDescription:
      "69-unit affordable housing project combining independent suites with on-site support services for vulnerable inner-city residents.",
    comprehensiveDetails:
      `162 Main St represents a groundbreaking approach to addressing homelessness and mental health challenges in Vancouver's urban core. This innovative development provides 69 micro-suite units designed specifically for individuals transitioning from shelter to permanent housing. The project integrates comprehensive support services directly into the living environment, creating a bridge between emergency shelter and stable housing. Each micro-suite is thoughtfully designed to provide privacy and dignity while fostering community connection. The building includes on-site support staff, counseling services, and community spaces that promote healing and stability. The mixed-use design incorporates retail spaces that serve both residents and the broader community, creating economic opportunities and reducing stigma.

## How We Keep Housing Affordable in Urban Centers

The housing crisis in Canada's major metropolitan areas is particularly acute, and 162 Main St serves as a model for sustainable affordable housing development in dense urban environments. Our approach demonstrates how philanthropy, innovation, and community empowerment can keep housing affordable even in high-cost areas:

**Community Champions Program**: In Vancouver's competitive construction market, we leverage our Community Champions program where local business owners and professionals provide deep discounts on professional services and construction materials. This reduces costs without compromising quality, ensuring the project remains viable for low-income residents.

**Innovative Construction Methods**: The building utilizes a hybrid structure of light wood frame over a concrete podium, optimizing construction efficiency while maintaining structural integrity on a narrow urban infill site. This approach allows us to build high-quality homes more cost-effectively than traditional methods.

**Supportive Housing Model**: Affordability extends beyond rent through integrated support services. The MPA Society provides on-site mental health support, counseling, and community programs that help residents maintain housing stability and reduce the need for emergency services, creating long-term cost savings for both residents and the community.

**Non-Profit Mission**: As a charity-owned society, our goal is community impact rather than profit maximization. We reinvest in lower rents and prioritize vulnerable populations including seniors, newcomers, and individuals transitioning from shelters, ensuring housing remains permanently affordable rather than becoming market-rate over time.

## Financing Stack & Partnerships

**Credit Union Partnerships**: We collaborate with credit unions that share our community-focused values. These partnerships provide construction financing at competitive rates while supporting our mission-driven approach to affordable housing development.

**Impact Investors**: Our financing includes impact investors who recognize the long-term social and economic benefits of affordable housing. These investors provide patient capital that allows us to focus on community impact rather than short-term financial returns.

**Community Champions Business Network**: In urban markets like Vancouver, our Community Champions program extends to include strategic partnerships with local businesses, suppliers, and service providers who offer volume discounts and flexible terms. This network helps reduce construction costs and supports our cash flow needs.

**Hybrid Financing Model**: We employ a diversified financing approach combining charitable foundations, impact investment, credit union financing, and government subsidies. This multi-source funding strategy reduces risk and ensures we can deliver complex urban projects that serve vulnerable populations.`,
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
    id: 4,
    title: "Dodson Hotel",
    location: "25 East Hastings, Vancouver, BC",
    year: "2004",
    units: 71,
    description:
      "Historic hotel conversion providing 71 supportive housing units for low-income residents in Vancouver’s Downtown Eastside.",
    briefDescription:
      "71-unit affordable housing development created through the renovation of the historic Dodson Hotel.",
    comprehensiveDetails:
      "The Dodson Hotel was acquired and renovated by Anhart impact investors in 2004 to provide safe, clean, and supportive housing in Vancouver’s Downtown Eastside. With 71 units and additional community space, the project addressed pressing needs for individuals struggling with poverty, addiction, and mental health issues. Its 4,500 sq. ft. drop-in centre includes a kitchen, laundry, showers, and women’s lounge, demonstrating the benefits of integrating housing with community-based resources. The Dodson became a landmark example of estate-sharing and private-public impact investment.",
    image: "DodsonsRooms_1",
    status: "completed",
    type: "Hotel Conversion",
    highlights: [
      "65 affordable housing units",
      "Historic hotel conversion",
      "Preserved architectural character",
      "Downtown Eastside revitalization",
      "Community-centered design",
      "Long-term affordability secured",
    ],
  },
  {
    id: 5,
    title: "Skeena House",
    location: "3475 East Hastings, Vancouver, BC",
    year: "2012",
    units: 57,
    description:
      "Former Ramada Inn converted into permanent affordable housing through partnership between the City of Vancouver, BC Housing, Vancouver Aboriginal Friendship Centre Society, Community Builders Benevolence Group and Anhart Community Housing Society.",
    briefDescription:
      "57-unit housing project repurposing a former hotel into permanent homes for vulnerable residents.",
    comprehensiveDetails:
      "Skeena House transformed a former Ramada Inn into 57 units of affordable housing through collaboration between the City of Vancouver, BC Housing, Vancouver Aboriginal Friendship Centre Society, Community Builders Benevolence Group and Anhart Community Housing Society. The project provided stable, private accommodations for individuals previously sleeping on mats in shelters, with culturally appropriate engagement and support. Skeena House set a precedent for converting hotels into permanent housing and demonstrated the value of Indigenous-led partnerships in housing solutions.",
    image: "skeena",
    status: "Completed",
    type: "Temporary Housing",
    highlights: [
      "Conversion of hotels into permanent, affordable housing",
      "Provided initiatives for the transition of shelter mats to stable housing",
      "Partnership-driven solutions with Vancouver Aboriginal Friendship Centre Society",
      "Culturally Inclusive Community Engagement",
      "Priority for Indigenous communities",
    ],
  },
  {
    id: 6,
    title: "Metson Rooms",
    location: "1060 Howe, Vancouver, BC",
    year: "2013",
    units: 100,
    description:
      "Transformation of a 100-room hotel in downtown Vancouver into affordable housing through partnership between the City of Vancouver, Community Builders Benevolence Group and Anhart Community Housing Society.",
    briefDescription:
      "100-room hotel in Vancouver's business district converted into affordable housing with a self-organizing resident community.",
    comprehensiveDetails:
      "Metson Rooms (formerly the Bosman Hotel) was converted in partnership with the City of Vancouver, Community Builders Benevolence Group and Anhart Community Housing Society. This 100-room initiative provided semi-supportive housing for individuals with independent living skills in Vancouver's business district. With City subsidies for at-risk tenants and a resident-led community model, it demonstrated how hotel leases can provide stable, affordable housing in high-demand urban areas without ongoing operational partners.",
    image: "1060howe",
    status: "Completed",
    type: "Hotel Conversion",
    highlights: [
      "Provided affordable housing for at-risk individuals",
      "Long-term hotel lease as affordable housing model",
      "Provided housing in a high-demand urban area",
      "Self-organizing community with in-house resident support",
      "Stable housing in Vancouver's downtown location",
    ],
  },
  {
    id: 7,
    title: "The Oppenheimer Park Initiative",
    location: "1335 Howe, Vancouver, BC",
    year: "2016",
    units: 160,
    description:
      "Relocation of 150 persons experiencing homelessness at an encampment in Oppenheimer Park that also housed another 150 persons over a 30 month period.",
    briefDescription:
      "160-room leased hotel provided emergency housing for 300 individuals displaced from Oppenheimer Park encampments over 30 months.",
    comprehensiveDetails:
      "The Oppenheimer Park Initiative addressed the critical housing crisis by relocating 150 persons experiencing homelessness from the Oppenheimer Park encampment. The initiative also provided housing for an additional 150 persons over a 30-month period. In 2015, Anhart partnered with the City of Vancouver to lease the Quality Inn at 1335 Howe Street, providing safe and secure temporary housing, wrap-around services, and transition supports to help residents move into permanent homes. The initiative demonstrated how hotel leases can serve as a rapid, scalable response to homelessness while bridging toward long-term solutions.",
    image: "TheOppenhiemer",
    status: "Completed",
    type: "Temporary Housing",
  },
  {
    id: 10,
    title: "179 Main & 626 Alexander",
    location: "Vancouver, BC",
    year: "2018, 2020",
    units: "14",
    description:
      "Two mixed-income projects providing affordable rental apartments through private investment at 626 Alexander and 179 Main.",
    briefDescription:
      "14 affordable rental units below market at 626 Alexander and 179 Main, blending market and non-market models geared towards low-income households.",
    comprehensiveDetails:
      "Anhart developed two key mixed-income affordable rental projects: 626 Alexander (2018) and 179 Main (2020). Both developments leveraged private investment to create deeply affordable units alongside market rentals. 626 Alexander focused on mixed-income housing with community engagement opportunities, while 179 Main delivered deeply affordable units within a market rental development. Together, they demonstrated how non-profits and market developers can collaborate to integrate affordable housing into urban neighbourhoods without reliance on public funds.",
    image: "affordapartment",
    status: "completed",
    type: "Multi-Phase Development",
    highlights: [
      "14 affordable apartment units (9 + 5)",
      "Inner-city location advantages",
      "Modern design integration",
      "Two-phase development approach",
      "Transit-accessible location",
      "Community-focused amenities",
    ],
  },
  {
    id: 15,
    title: "Modular Villages",
    location: "1051 Nelson Avenue, Hope, BC",
    year: "2024",
    units: 6,
    description:
      "Display units showcasing 6 different types of modular homes. Check them out at https://anhartconstruction.ca/modular/",
    briefDescription:
      "6 display units showcasing different modular tiny home options with private ownership and shared community infrastructure.",
    comprehensiveDetails:
      "The Modular Villages project in Hope, BC, features 6 display units showcasing different varieties of modular tiny homes, each thoughtfully designed to balance privacy, functionality, and affordability. These display units demonstrate the range of options available for potential homeowners. Built on wheels to meet building code standards, these homes provide the flexibility and mobility often absent in conventional housing. By localizing construction and management, the project reduces the typical overhead costs associated with commercial development, passing these savings directly to residents. Shared community infrastructure—including utilities, common spaces, and maintenance—further enhances cost efficiency while fostering a supportive, connected neighborhood. Visit our showhomes at https://anhartconstruction.ca/modular/ to see all 6 different unit types and learn more about modular homeownership opportunities. For more information about our construction services, visit https://anhartconstruction.ca/",
    image: "ModularH_1",
    status: "in-progress",
    type: "Modular Tiny Homes",
    highlights: [
      "6 different display unit types",
      "Private ownership opportunities",
      "Shared infrastructure model reduces costs",
      "Community resilience focus",
      "Innovative modular construction methods",
      "Visit https://anhartconstruction.ca/modular/ for details",
      "Learn more at https://anhartconstruction.ca/",
    ],
  },
  {
    id: 9,
    title: "Merritt Village",
    location: "Merritt, BC",
    year: "2026",
    units: "TBD",
    description:
      "Planned affordable housing development in Merritt, BC, responding to community housing needs following the 2021 flood.\n\n## How We Keep Housing Affordable\n\nOur proven approach to affordability rests on three pillars: partnerships with local businesses providing deep discounts on construction costs, cutting-edge modular construction methods for efficient and cost-effective homes, and strategic collaborations with impact investors and credit unions dedicated to affordable housing solutions.",
    briefDescription:
      "A planned affordable housing development in Merritt, BC, designed to address community housing needs and support local recovery efforts.",
    comprehensiveDetails:
      `Merritt Village is a planned affordable housing development in Merritt, British Columbia, developed in response to the community's housing needs following the 2021 flood. This project represents Anhart's commitment to supporting rural communities through thoughtful, sustainable housing solutions. The development aims to provide much-needed housing options while contributing to the community's long-term recovery and resilience. Specific project details, including unit count and design features, will be finalized as the project progresses through the planning and development phases.

## How We Keep Housing Affordable

Our proven approach to affordability rests on three pillars: partnerships with local businesses providing deep discounts on construction costs, cutting-edge modular construction methods for efficient and cost-effective homes, and strategic collaborations with impact investors and credit unions dedicated to affordable housing solutions.`,
    image: "Merritt",
    status: "in-planning",
    type: "Affordable Housing Development",
  },
  {
    id: 16,
    title: "Modular Homes Factory",
    location: "Hope, BC",
    year: "2024",
    units: 120,
    description:
      "State-of-the-art modular homes manufacturing facility producing prefabricated affordable housing for rapid deployment across Canada. Advanced prefabrication technology delivers 120+ units annually while reducing construction timelines and housing costs.",
    briefDescription:
      "State-of-the-art manufacturing facility producing 120+ prefabricated modular homes annually for rapid deployment across Canada.",
    comprehensiveDetails:
      "The Modular Homes Factory is Anhart's flagship manufacturing facility dedicated to solving the affordable housing crisis through industrial-scale modular home production. Located strategically in Hope, BC, this state-of-the-art prefabrication plant manufactures 120+ complete modular homes annually, representing a transformative approach to residential construction. \n\nAdvanced Manufacturing Process: Our facility utilizes computer-aided design (CAD), robotic manufacturing systems, and quality-controlled assembly lines to produce prefabricated housing components with precision and consistency. Each modular home is constructed in a climate-controlled environment, eliminating weather-related delays and ensuring superior craftsmanship compared to traditional on-site construction methods.\n\nAffordable Housing Solutions: By consolidating manufacturing operations, we significantly reduce construction costs—typically 30-40% lower than conventional stick-built homes. These cost savings translate directly into more affordable housing options for low-income families, first-time homebuyers, and underserved communities across Canada.\n\nSustainability & Energy Efficiency: Every modular home manufactured meets rigorous environmental standards, featuring energy-efficient insulation, sustainable materials, and renewable energy integration capabilities. Our commitment to green building practices reduces operational costs for residents while contributing to Canada's climate goals.\n\nRapid Deployment & Housing Crisis Response: Modular construction reduces on-site assembly time from 6-9 months to 2-3 months, enabling rapid response to housing shortages and emergency housing needs. This acceleration is critical for addressing Canada's affordable housing crisis.\n\nEconomic Impact & Local Employment: The facility creates skilled manufacturing jobs in Hope, BC, stimulating local economic growth while building the workforce expertise needed for nationwide housing production scaling.\n\nContribution to 20,000 Homes Goal: This manufacturing capacity is instrumental in Anhart's mission to develop 20,000 affordable homes by 2045, providing a sustainable, scalable solution to housing affordability across Canada.",
    image: "ModularFactory",
    status: "in-progress",
    type: "Manufacturing Facility",
    highlights: [
      "120+ prefabricated modular homes manufactured annually",
      "Advanced offsite construction and manufacturing technology",
      "Computer-aided design (CAD) and robotic manufacturing systems",
      "30-40% cost reduction compared to traditional construction",
      "Rapid deployment reduces construction timelines by 50-60%",
      "Sustainable building standards and eco-friendly materials",
      "Energy-efficient modular home designs with HVAC integration",
      "Climate-controlled manufacturing environment",
      "Quality-controlled assembly and precision manufacturing",
      "Scales affordable housing production nationwide across Canada",
      "Addresses Canadian housing crisis and affordability gap",
      "Creates skilled manufacturing jobs in rural BC communities",
      "Supports Anhart's 20,000 homes by 2045 mission",
      "Strategic rural location in Hope, BC for distribution access",
      "Low-income housing solutions and first-time homebuyer options",
    ],
  },
  {
    id: 11,
    title: "Anhart Sustainable Villages",
    location: "Multiple Locations",
    year: "2030",
    units: 50,
    description:
      "International development initiative working with local communities in regions of Africa to build 6 maternity clinics, approximately 50 homes, and 5 schools, contributing to our 20,000 homes goal by 2045.",
    briefDescription:
      "International development initiative building homes, clinics, and schools in African communities through local partnerships.",
    comprehensiveDetails:
      "Anhart Global Villages represents our commitment to international development and community building in regions of Africa. Through partnerships with local communities, we are working to construct 6 maternity clinics to improve healthcare access, approximately 50 homes to address housing needs, and 5 schools to enhance educational opportunities. This initiative demonstrates our belief that affordable housing and community infrastructure are fundamental human necessities that should be accessible globally. By working directly with local partners and communities, we ensure that our projects are culturally appropriate, sustainable, and truly serve the needs of the people they are designed to help. This international work complements our domestic efforts and contributes to our broader goal of creating 20,000 homes by 2045.",
    image: "Maternity",
    status: "in-progress",
    type: "Multi-Site Initiative",
    highlights: [
      "6 maternity clinics in African regions",
      "Approximately 50 homes built",
      "5 schools constructed",
      "Local community partnerships",
      "International development focus",
      "Contributes to 20,000-unit goal by 2045",
    ],
  },
  {
    id: 8,
    title: "Kwas House",
    location: "477 Hudson St, Hope, BC",
    year: "2026",
    units: 14,
    description:
      "A 14-unit supportive housing project in Hope, BC, for adults with cognitive challenges and seniors, featuring a community kitchen and shared living spaces, developed in partnership with the Fraser Inclusive and Supportive Housing Society (FISH).",
    briefDescription:
      "14-unit affordable housing for adults with cognitive challenges and seniors in Hope, BC, developed in partnership with the Fraser Inclusive and Supportive Housing Society.",
    comprehensiveDetails:
      "Kwas House is a community-driven vision that began in 2017 with parents from Hope's Tillicum Centre who wanted to ensure their adult children with cognitive challenges had a secure future. They formed the Fraser Inclusive and Supportive Housing Society (FISH) to create a home where their children could live independently among peers. The project was made possible by a generous donation of property at 477 Hudson Bay Street by community member Olga Kwas. In partnership with Anhart, FISH is developing a 14-unit apartment building designed for both people with intellectual challenges and seniors. The building will feature accessible design, a communal kitchen, social spaces, and an outdoor patio to foster a supportive community environment. This model aims to provide a 'forever home' that promotes independence, safety, and social connection.",
    image: "Kwas",
    status: "in-progress",
    type: "Supportive Housing",
    highlights: [
      "14 affordable housing units",
      "Partnership with Fraser Inclusive and Supportive Housing Society (FISH)",
      "Housing for adults with cognitive challenges and seniors",
      "Property generously donated by a community member",
      "Includes community kitchen and social spaces",
      "Focus on independent living with peer support",
    ],
  },
];
