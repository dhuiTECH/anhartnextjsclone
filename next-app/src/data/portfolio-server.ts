/**
 * =============================================================================
 * PORTFOLIO SERVER DATA
 * =============================================================================
 *
 * Portfolio Projects Data Structure
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
// PORTFOLIO PROJECTS DATA
// =============================================================================

export const portfolioProjectsData: ProjectData[] = [
  {
    id: 1,
    title: "Jubilee Rooms",
    location: "235 Main, Vancouver, BC",
    year: "2000",
    units: 80,
    description: "The Jubilee Rooms (235 Main St) serves as the foundational cornerstone of Anhart's history. Completed in 2000, this project involved the acquisition and extensive renovation of a derelict historic hotel on the corner of Main and Powell.\n\nAt a time when few developers were investing in the Downtown Eastside, this project proved our core thesis: that private capital could be effectively mobilized to solve public housing crises. By transforming a neglected property into 80 units of safe, affordable housing, the Jubilee Rooms set the standard for SRO (Single Room Occupancy) revitalization in Vancouver.\n\n## Operations & Management\n\nWhile developed and originally managed by Anhart, the Jubilee Rooms is now part of the provincial supportive housing portfolio to ensure its affordability in perpetuity.\n\nThe building is currently operated by [RainCity Housing](https://www.raincityhousing.org/programs/jubilee-rooms/), providing residents with 24/7 support services and meal programs.\n\nTenant Inquiries: For all inquiries regarding housing applications or tenant support at this location, please visit the RainCity Housing Jubilee Rooms page.",
    briefDescription: "Historic rooming house revitalized into 80 affordable units, marking the beginning of our housing-first mission in Vancouver's Downtown Eastside.",
    comprehensiveDetails: "The Jubilee Rooms project represents the cornerstone of Anhart's affordable housing mission. This historic building renovation in Vancouver's Downtown Eastside created 80 affordable housing units while preserving the architectural character of the original structure. The project demonstrated our innovative approach to transforming existing buildings into dignified, safe, and affordable housing solutions. Through careful renovation techniques and community-centered design, we established a model for sustainable urban housing development that continues to guide our work today.",
    image: "Jubilee-Sign",
    status: "completed",
    type: "Historic Renovation",
    highlights: [
      "80 Affordable Homes: Preserved critical low-income housing stock in a rapidly gentrifying neighbourhood.",
      "Heritage Preservation: Restored the character of the turn-of-the-century building while upgrading life-safety systems and plumbing.",
      "The \"First\" Project: The success of the Jubilee Rooms launched Anhart's broader mission, leading to the creation of over 15 subsequent social impact developments.",
      "Community Catalyst: Demonstrated the viability of the \"Social Enterprise\" model in real estate, influencing housing policy in the Downtown Eastside.",
    ],
  },
  {
    id: 2,
    title: "The Ryder",
    location: "1270 Ryder, Hope, BC",
    year: "2021",
    units: 40,
    description: "The Ryder (1270 Ryder Street) stands as a landmark affordable housing development in the District of Hope, BC. As the first purpose-built rental building constructed in the community in over three decades, it addressed a critical 0% vacancy rate upon its opening in March 2020.\n\nThis 3-storey, 40-unit modular building showcases the speed and quality of offsite construction, moving from groundbreaking to occupancy in just 8 months. Originally developed by Anhart, the property was acquired by the Province of BC in 2023, ensuring these homes remain permanently affordable for seniors, families, and workers in the Fraser Valley.\n\n## Operations & Management\n\nFollowing its successful development and stabilization, ownership and operations of The Ryder were transferred to the Fraser-East Affordable Housing Society to secure its long-term status as community housing.\n\nTenant Inquiries & Applications: For current vacancy information or to apply for housing at The Ryder, please visit the official [Fraser-East Housing Application](https://frasereast.org/fraser-east-housing-application/) page or contact them directly at info@frasereast.org.",
    briefDescription: "40 modular homes in Hope, BC, expanding affordable housing in rural communities with a focus on stability, self-sufficiency, and community-building.",
    comprehensiveDetails: "The Ryder project represents Anhart's commitment to addressing housing needs in rural and remote communities across British Columbia.",
    image: "Ryder_1",
    status: "completed",
    type: "Modular Housing",
    highlights: [
      "Rapid Modular Delivery: The 40-unit project was manufactured offsite and assembled quickly, proving the viability of modular construction for urgent rural housing needs.",
      "Accessibility Certified: The building features Rick Hansen Foundation Accessibility Certification (RHFAC), with six fully accessible ground-floor units designed for seniors and people with disabilities.",
      "Energy Efficiency: Designed to exceed building codes, achieving over 30% energy savings and greenhouse gas reductions compared to standard builds.",
      "Community Impact: Provides a mix of studio, 1, 2, and 3-bedroom homes, serving a diverse demographic from seniors to young families.",
    ],
  },
  {
    id: 3,
    title: "162 Main St",
    location: "Vancouver, BC",
    year: "2023",
    units: 69,
    description: "162 Main St is a pioneering mixed-income housing development located in Vancouver's Downtown Eastside (DTES). This 6-storey building features 69 self-contained micro-suites, designed to provide dignity and independence for residents ranging from seniors and newcomers to individuals transitioning from shelters.\n\nInnovative in its design, the building utilizes a hybrid structure of light wood frame over a concrete podium. The units were uniquely engineered with flexibility in mind, allowing for potential consolidation into larger family units in the future. This project serves as a model for how affordable rental housing can be delivered on narrow, urban infill sites.\n\n## Operations & Management\n\nWhile Anhart led the development vision for this project, the building's day-to-day operations and supportive services are managed by the [MPA Society](https://mpa-society.org/supported-housing/).\n\nThe MPA Society provides residents with integrated mental health support, advocacy, and community building programs.\n\nTenant Inquiries: For information regarding vacancies, eligibility, or supportive housing applications, please contact the MPA Society Housing Department.",
    briefDescription: "69-unit affordable housing project combining independent suites with on-site support services for vulnerable inner-city residents.",
    comprehensiveDetails: "162 Main St represents a groundbreaking approach to addressing homelessness and mental health challenges in Vancouver's urban core.",
    image: "162Main",
    status: "completed",
    type: "Micro-Suites",
    highlights: [
      "69 Micro-Suites: Efficient, self-contained homes designed for affordability and independence.",
      "Flexible Design: Units feature 'knock-out' panels, allowing two micro-suites to be merged into a 1 or 2-bedroom family unit as community needs change.",
      "Community Amenities: Features a full rooftop garden and shared amenity spaces to foster social connection among residents.",
      "Mixed-Use Integration: Includes ground-floor retail space to contribute to the vibrancy of the Main Street corridor.",
    ],
  },
  {
    id: 4,
    title: "Dodson Hotel",
    location: "25 East Hastings, Vancouver, BC",
    year: "2004",
    units: 71,
    description: "The Dodson Hotel (25 East Hastings) represents a significant heritage restoration and SRO (Single Room Occupancy) renewal project in the heart of Vancouver's Downtown Eastside. Originally built in 1910, this historic building was extensively renovated in 2004 to improve livability while preserving its architectural character.\n\nThe project successfully converted a neglected hotel into 71 units of safe, supportive housing, providing a stable foundation for low-income residents and individuals transitioning out of homelessness.\n\n## Operations & Management\n\nThe Dodson Hotel is operated by our non-profit partners at [Community Builders](https://www.communitybuilders.ca/our-sites/dodson-rooms), who ensure residents receive more than just a roof over their heads.\n\nThrough their \"Whole Life\" housing program, staff provide 24/7 support, meal programs, and connection to health resources.\n\nLooking for Housing? For vacancy inquiries and application information for the Dodson Rooms, please contact the site manager directly via the Community Builders Dodson Rooms page.",
    briefDescription: "71-unit affordable housing development created through the renovation of the historic Dodson Hotel.",
    comprehensiveDetails: "The Dodson Hotel was acquired and renovated by Anhart impact investors in 2004 to provide safe, clean, and supportive housing.",
    image: "DodsonsRooms_1",
    status: "completed",
    type: "Hotel Conversion",
    highlights: [
      "71 Supportive Homes: A mix of renovated SRO units providing long-term affordability in a critical location.",
      "Heritage Restoration: The project involved significant upgrades to the building's 1910 structure, preserving the historic façade while modernizing safety and plumbing systems.",
      "Integrated Support: Features on-site management offices and common areas designed to facilitate the delivery of wraparound social services.",
      "Prime Accessibility: Located on a major transit corridor, giving residents immediate access to downtown services and community resources.",
    ],
  },
  {
    id: 5,
    title: "Skeena House",
    location: "Vancouver, BC",
    year: "2020",
    units: 85,
    description: "Skeena House is a vital supportive housing site located at 3475 East Hastings Street in the Hastings-Sunrise neighbourhood. Originally a commercial hotel, the property was acquired and rapidly converted into housing to provide an immediate response to the city's homelessness crisis.\n\nDeveloped in partnership with the Vancouver Aboriginal Friendship Centre Society (VAFCS), this project prioritizes housing for Indigenous individuals, offering a culturally safe environment that fosters community connection and stability.\n\n## Operations & Management\n\nSkeena House is operated by the Vancouver Aboriginal Friendship Centre Society (VAFCS).\n\nThe society provides 24/7 on-site support, including access to cultural programming, health resources, and meals, ensuring residents receive holistic care rooted in Indigenous values.\n\nHousing Inquiries: For information on eligibility and vacancy at Skeena House, please contact the [VAFCS Housing & Shelter Department](https://www.vafcs.org/) directly.",
    briefDescription: "85-unit supportive housing development addressing homelessness and providing transitional pathways.",
    comprehensiveDetails: "Skeena House provides supportive housing services for vulnerable populations.",
    image: "skeena",
    status: "completed",
    type: "Supportive Housing",
    highlights: [
      "85 Supportive Homes: Provides secure, self-contained units for individuals transitioning out of displacement.",
      "Rapid Conversion: Demonstrates the efficiency of adaptive reuse, transforming an existing hotel into fully functional housing in a fraction of the time required for new construction.",
      "Indigenous-Led Support: Operations are grounded in Indigenous advocacy and cultural wellness, addressing the disproportionate representation of Indigenous peoples in the homeless population.",
      "Decentralized Location: Located outside the Downtown Eastside, providing residents with a quieter community setting while remaining close to transit and amenities.",
    ],
  },
  {
    id: 6,
    title: "Metson Rooms",
    location: "Vancouver, BC",
    year: "2021",
    units: 100,
    description: "Metson Rooms is a landmark affordable housing project in Vancouver, BC, transforming a former hotel into 100 units of safe, supportive accommodation. Located at 1060 Howe Street, this project demonstrates the speed and efficiency of hotel conversions to address the urgent housing crisis. By repurposing existing infrastructure, we successfully created immediate housing solutions for vulnerable inner-city residents, preserving a vital community asset in the heart of downtown.\n\n## Operations & Management\n\nWhile this facility was developed as part of our housing portfolio, the day-to-day operations and tenant support services are managed by our partners at Community Builders.\n\nCommunity Builders provides 24/7 staffing, meal programs, and the \"Whole Life\" housing program to support resident wellness.\n\nLooking for Housing? For vacancy inquiries, application details, and shelter availability, please visit the official [Metson Rooms & Metson Shelter](https://www.communitybuilders.ca/our-sites/metson-rooms) page managed by Community Builders.",
    briefDescription: "100-unit hotel conversion providing affordable rooms and support services.",
    comprehensiveDetails: "Metson Rooms is a landmark affordable housing project in Vancouver, BC, transforming a former hotel into 100 units of safe, supportive accommodation. Located at 1060 Howe Street, this project demonstrates the speed and efficiency of hotel conversions to address the urgent housing crisis.",
    image: "1060howe",
    status: "completed",
    type: "Hotel Conversion",
    highlights: [
      "100 Supportive Homes: Fully self-contained units designed for long-term residency.",
      "Adaptive Reuse: A sustainable hotel conversion project that reduced construction waste and timeline compared to new builds.",
      "Prime Location: Situated in downtown Vancouver, providing residents with easy access to transit, healthcare, and community services.",
      "Integrated Shelter: Includes a 40-bed shelter component on the ground floor to assist those in immediate need.",
      "24/7 Support Services: Operated by Community Builders with comprehensive tenant care and wellness programs.",
    ],
  },
  {
    id: 7,
    title: "The Oppenheimer Park Initiative",
    location: "Vancouver, BC",
    year: "2020",
    units: 93,
    description: "The Oppenheimer Park Initiative (The Gastown Hotel) involved the complete seismic and interior renovation of a prominent heritage asset located at 112 Water Street. Situated at the gateway between historic Gastown and the Downtown Eastside, this project revitalized a century-old building into 93 units of safe, supportive housing.\n\nBy preserving this critical Single Room Occupancy (SRO) stock, Anhart ensured that vulnerable residents were not displaced by gentrification, while simultaneously restoring the building's historic façade and upgrading life-safety systems.\n\n## Operations & Management\n\nThe Gastown Hotel is managed by our non-profit partners at Community Builders. The site features 24/7 staffing and tenant support services designed to foster community and stability.\n\nTenant Inquiries: For information regarding vacancies or housing applications for this location, please visit the official [Community Builders Gastown Hotel page](https://www.communitybuilders.ca/our-sites/gastown-hotel/).",
    briefDescription: "93-unit affordable housing development addressing urban affordability crisis near Oppenheimer Park.",
    comprehensiveDetails: "The Oppenheimer Park Initiative demonstrates innovative urban housing development with community-centered design.",
    image: "TheOppenhiemer",
    status: "completed",
    type: "Heritage Restoration",
    highlights: [
      "93 Supportive Homes: Preserved and upgraded affordable units to serve the community in the Oppenheimer District.",
      "Heritage Rehabilitation: Involved extensive restoration of the 1912 Edwardian commercial architecture, maintaining the historic character of the streetscape.",
      "Seismic Upgrades: A full structural retrofit was completed to bring the unreinforced masonry building up to modern safety codes.",
      "Mixed-Use Vibrancy: The ground floor retains commercial retail space, contributing to the economic vitality of the neighbourhood while supporting the housing above.",
    ],
  },
  {
    id: 8,
    title: "179 Main & 626 Alexander",
    location: "Vancouver, BC",
    year: "2018",
    units: 140,
    description: "This initiative represents a dual-site Rapid Response Housing development located at 179 Main Street and 626 Alexander Street. Constructed to address the urgent homelessness crisis in Vancouver, these buildings utilize advanced modular construction technology.\n\nBy manufacturing the units off-site, we were able to deliver 140 safe, self-contained homes on an accelerated timeline, bypassing the lengthy delays associated with traditional concrete construction. These projects serve as a case study for how underutilized urban land can be rapidly activated for social good.\n\n## Operations & Management\n\nBoth properties are managed by our non-profit partners at Community Builders. They provide round-the-clock support services, ensuring residents have the stability and care they need to maintain their housing.\n\nHousing Inquiries: For vacancy information or application details for either location, please visit the specific site pages below:\n\n179 Main Street: Visit the [Community Builders 179 Main page](https://www.communitybuilders.ca/our-sites/179-main/).\n\n626 Alexander Street: Visit the [Community Builders 626 Alexander page](https://www.communitybuilders.ca/our-sites/626-alexander/).",
    briefDescription: "140-unit development across two downtown Vancouver properties providing affordable housing.",
    comprehensiveDetails: "The 179 Main and 626 Alexander properties represent strategic urban infill development.",
    image: "179Main",
    status: "completed",
    type: "Rapid Response Modular",
    highlights: [
      "179 Main Street: Located near the intersection of Main and Powell, providing immediate access to Downtown Eastside community services.",
      "626 Alexander Street: Situated in the Railtown district, offering a quieter setting while remaining central.",
      "Self-Contained Living: Unlike older SROs, every unit in these modular buildings features a private bathroom and kitchenette, restoring dignity and independence to residents.",
      "Rapid Delivery: The modular manufacturing process allowed for simultaneous site preparation and building construction, significantly reducing the development schedule.",
    ],
  },
  {
    id: 10,
    title: "Kwas House",
    location: "Hope, BC",
    year: "2027",
    units: 14,
    description: "Kwas House is a specialized inclusive housing development located at 477 Hudson Bay Street in Hope, BC. Developed in partnership with the Fraser Inclusive and Supportive Housing Society (FISH), this project was designed to address a critical gap in the housing market: safe, independent living for adults with cognitive disabilities and seniors.\n\nThe 3-storey building features 14 purpose-built rental units that foster a \"neighbour-helping-neighbour\" community model. By combining independent suites with shared amenity spaces, Kwas House allows residents to live with autonomy while remaining connected to vital support networks.\n\n## Operations & Management\n\nThis project was developed by Anhart on behalf of the Fraser Inclusive and Supportive Housing Society (FISH), who now own and operate the building.\n\nFISH is a parent-led non-profit dedicated to creating housing solutions that allow loved ones to stay in their home community of Hope rather than being displaced to larger cities for care.\n\nHousing Inquiries: For information on eligibility and availability at Kwas House, please visit the [Kwas House / FISH Society website](https://www.kwashouse.org/) or contact them at info@kwashouse.org.",
    briefDescription: "14-unit inclusive housing development for adults with cognitive disabilities and seniors in Hope, BC.",
    comprehensiveDetails: "Kwas House is a specialized inclusive housing development designed to support adults with cognitive disabilities and seniors.",
    image: "Kwas",
    status: "in-progress",
    type: "Inclusive Housing",
    highlights: [
      "14 Inclusive Homes: A boutique collection of units designed specifically for adults with developmental disabilities and seniors.",
      "Parent-Led Partnership: A unique collaboration where Anhart provided development expertise to realize the vision of local parents seeking long-term housing security for their adult children.",
      "Accessible Design: Features fully accessible ground-floor units and universal design principles to support residents with mobility challenges.",
      "Community Integration: Centrally located near downtown Hope, ensuring residents have walkable access to local shops, transit, and social services.",
    ],
  },
  {
    id: 14,
    title: "Merritt Village",
    location: "3757 De Wolf Way, Merritt, BC",
    year: "2027",
    units: 45,
    description: "Located in the heart of the Nicola Valley, this development delivers 45 family-oriented townhomes to the Merritt, BC market. This project focuses on attainable home ownership, addressing the critical gap for working families seeking entry into the real estate market.\n\nThe development utilizes a Shared Infrastructure Model, where communal amenities and efficient site planning significantly reduce the purchase price and ongoing maintenance costs for owners. Designed with community resilience in mind, the site creates a secure, connected neighbourhood suited for the unique climate and geography of the region.\n\n## Ownership Opportunities\n\nThese units are designed to provide a pathway to equity for first-time buyers and local families.\n\nRegister Your Interest: For floor plans, pricing, and sales release dates, please contact our development team or visit the [Anhart Construction Residential page](https://anhartconstruction.ca/).",
    briefDescription: "45-unit townhouse village providing affordable homeownership and community-building opportunities.",
    comprehensiveDetails: "Merritt Village represents an innovative approach to affordable housing with emphasis on ownership and community resilience.",
    image: "Merritt",
    status: "in-progress",
    type: "Attainable Ownership",
    highlights: [
      "45 Attainable Homes: A mix of 2 and 3-bedroom townhomes designed for modern family living.",
      "Cost-Reducing Infrastructure: By centralizing utilities and amenity spaces, the development lowers construction costs and ongoing strata fees for owners.",
      "Community Resilience: Engineered to withstand local climate challenges, featuring durable materials and fire-smart landscaping principles.",
      "The Missing Middle: Specifically targets the gap between subsidized rental housing and high-end market real estate, providing a realistic step onto the property ladder.",
    ],
  },
  {
    id: 15,
    title: "Anhart Sustainable Villages",
    location: "Homa Bay, Kenya",
    year: "2025",
    units: 200,
    description: "Anhart Sustainable Villages represents our commitment to global equity, extending our mission beyond Canada to the developing world. The flagship initiative is currently underway in Homa Bay, Kenya, where we are constructing a community of 200 sustainable homes for families facing extreme housing insecurity.\n\nUnlike traditional aid, this project utilizes Earthbag (Superadobe) construction—an eco-friendly, seismically sound method that uses locally sourced soil and labor. This approach not only lowers the carbon footprint but also keeps investment dollars within the local economy, creating jobs and skills training for community members.\n\n## Community-Led Development\n\nWe believe the most sustainable solutions are locally rooted. Anhart acts as a catalyst—providing capital, architectural planning, and project management oversight—while our local on-ground partners lead the construction and tenant selection process.\n\nThis Community Land Trust model ensures that the housing remains affordable in perpetuity and that the village infrastructure (water, sanitation, and solar power) is maintained by the community, for the community.",
    briefDescription: "200-unit international development initiative providing sustainable housing in African communities.",
    comprehensiveDetails: "Anhart Sustainable Villages represents Anhart's global commitment to affordable housing and sustainable community development.",
    image: "Maternity",
    status: "in-progress",
    type: "International Sustainable",
    highlights: [
      "Earthbag Technology: Utilizes thermal-mass construction that naturally regulates temperature, requiring zero energy for cooling in hot climates.",
      "Economic Empowerment: The construction process employs over 100 local workers, providing income and transferring valuable trade skills to the region.",
      "Holistic Infrastructure: The village includes clean water access, solar lighting, and communal agricultural spaces to support food security.",
      "Scalable Prototype: Designed as a blueprint for low-cost, high-durability housing that can be replicated in other regions of the Global South.",
    ],
  },
  {
    id: 20,
    title: "Modular Villages",
    location: "1051 Nelson Avenue, Hope, BC",
    year: "2024",
    units: 6,
    description: "Modular Villages (1051 Nelson Avenue) serves as Anhart's Innovation & Discovery Centre in Hope, BC. This site features a curated collection of six fully furnished modular tiny homes, acting as a live showroom for prospective homeowners, land developers, and municipalities.\n\nThese units demonstrate the versatility of our factory-built solutions, ranging from compact studios to family-sized suites. The village showcases how CSA-certified modular construction can provide high-quality, energy-efficient housing for private ownership, workforce accommodation, or backyard garden suites (ADUs).\n\n## Tours & Ownership Opportunities\n\nThese units are open for viewing to demonstrate the quality and layout of Anhart's modular products. Whether you are looking for a laneway home, a recreational cabin, or a rapid housing solution for your land, these models prove what is possible.\n\nPlan Your Visit: To view floor plans, pricing, or book a tour of the display village, please visit our manufacturing division at [Anhart Construction: Modular Solutions](https://anhartconstruction.ca/modular/).",
    image: "ModularH_1",
    status: "in-progress",
    type: "Display Village & Showroom",
    highlights: [
      "6 Distinct Models: A variety of floor plans showcasing options for singles, couples, and small families.",
      "CSA Certified: All units are built to strict Canadian standards (CSA A277/Z240), ensuring they meet municipal building codes and mortgage requirements.",
      "Plug-and-Play Installation: Demonstrates the speed of delivery, where homes arrive nearly complete and are quickly connected to site utilities.",
      "Resilient Community Design: The site layout highlights a 'pocket neighborhood' concept, using shared infrastructure to lower development costs and foster social connection.",
    ],
  },
  {
    id: 21,
    title: "Modular Homes Factory",
    location: "Hope, BC",
    year: "2024",
    units: 120,
    description: "The Modular Homes Factory: Canada's Next Gen Housing Solution\n\nThe Modular Homes Factory is Anhart's flagship manufacturing facility dedicated to solving the affordable housing crisis through industrial-scale modular housing production. Located in Hope, BC, this state-of-the-art prefabrication plant manufactures 120+ complete modular homes annually.\n\n## Why Modular Housing is the Future\n\nFactory-built modular homes represent a paradigm shift in Canadian housing construction. Unlike traditional site-built homes vulnerable to weather delays and inconsistent quality, our manufacturing process delivers homes 50-60% faster while maintaining superior quality control. This means faster delivery to families, no weather setbacks during construction, and completely predictable costs—critical advantages for addressing Canada's affordable housing crisis.\n\n## Our Climate-Controlled Manufacturing Process\n\n### Superior Quality Control\n\nEvery component is manufactured in a climate-controlled environment with rigorous multi-stage inspections. Our dry materials eliminate moisture and mold risks, and every unit adheres strictly to Canadian building codes and exceeds provincial standards. This precision manufacturing ensures consistent quality that on-site construction cannot match.\n\n### Sustainable & Low-Waste Building\n\nWe're committed to environmental responsibility through engineered materials, in-plant recycling programs, and reduced construction waste. Factory manufacturing generates 50-60% less waste than traditional construction, while our sustainable material sourcing supports Canada's environmental goals.\n\n### Engineered for Canadian Climates\n\nOur modular homes are specifically engineered for Canadian climates with 2x6 wall framing, premium insulation exceeding code requirements, and energy-efficient HVAC systems. We meet or exceed Energy Step Code standards and support Net Zero initiatives, aligning with government priorities for sustainable housing across Canada.\n\n## Factory Overview: From Design to Delivery\n\nDesign & Engineering: Projects begin with custom designs tailored to local needs and climate requirements. Our team utilizes advanced computer-aided design (CAD) systems to ensure each modular home meets specific site conditions and regional building codes while optimizing for energy efficiency and affordability.\n\nFabrication: In our climate-controlled manufacturing facility, robotic systems and precision assembly lines construct wall, floor, and roof modules with remarkable consistency and speed. This industrial approach eliminates weather delays and ensures every component meets exact specifications, resulting in superior quality compared to traditional on-site construction.\n\nQuality Assurance: Each completed module undergoes rigorous multi-stage inspection for structural integrity, electrical systems, plumbing installations, and finishing quality. Our quality control process exceeds Canadian building code requirements and ensures every home delivered meets Anhart's high standards for durability and livability.\n\nShipping & On-Site Assembly: Completed modules are carefully transported to site and professionally assembled by our installation team. This final stage reduces total on-site construction time from 6-9 months down to just 2-3 weeks, dramatically accelerating housing delivery without compromising quality or safety.",
    briefDescription: "Leading modular home manufacturer in British Columbia producing 120+ prefabricated affordable housing units annually through innovative offsite construction and sustainable building practices for rapid deployment.",
    comprehensiveDetails: "The Modular Homes Factory is Anhart's flagship manufacturing facility dedicated to solving the affordable housing crisis through industrial-scale modular home production. Located strategically in Hope, BC, this state-of-the-art prefabrication plant manufactures 120+ complete modular homes annually, representing a transformative approach to residential construction.\n\nAdvanced Manufacturing Process: Our facility utilizes computer-aided design (CAD), robotic manufacturing systems, and quality-controlled assembly lines to produce prefabricated housing components with precision and consistency. Each modular home is constructed in a climate-controlled environment, eliminating weather-related delays and ensuring superior craftsmanship compared to traditional on-site construction methods.\n\nAffordable Housing Solutions: By consolidating manufacturing operations, we significantly reduce construction costs—typically 30-40% lower than conventional stick-built homes. These cost savings translate directly into more affordable housing options for low-income families, first-time homebuyers, and underserved communities across Canada.\n\nSustainability & Energy Efficiency: Every modular home manufactured meets rigorous environmental standards, featuring energy-efficient insulation, sustainable materials, and renewable energy integration capabilities. Our commitment to green building practices reduces operational costs for residents while contributing to Canada's climate goals.\n\nRapid Deployment & Housing Crisis Response: Modular construction reduces on-site assembly time from 6-9 months to 2-3 months, enabling rapid response to housing shortages and emergency housing needs. This acceleration is critical for addressing Canada's affordable housing crisis.\n\nEconomic Impact & Local Employment: The facility creates skilled manufacturing jobs in Hope, BC, stimulating local economic growth while building the workforce expertise needed for nationwide housing production scaling.\n\nContribution to 20,000 Homes Goal: This manufacturing capacity is instrumental in Anhart's mission to develop 20,000 affordable homes by 2045, providing a sustainable, scalable solution to housing affordability across Canada.",
    image: "ModularFactoryCard",
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
];
