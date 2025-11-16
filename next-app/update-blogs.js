const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing Supabase environment variables!");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const modularBody = `
### The Future is Built in a Factory
Canada is facing a profound housing crisis. As costs for traditional construction soar and the demand for affordable units far outpaces supply, we must turn to innovation. At the forefront of this change is **modular housing**, a revolutionary construction method that is poised to redefine our approach to building communities.

But what is modular housing? Simply put, it's a process where homes are built in sections (or "modules") in a controlled, factory environment. These modules—complete with walls, flooring, plumbing, and electrical—are then transported to the building site, where they are assembled into a complete structure. This isn't the "prefab" of decades past; today's modular construction is **high-quality, sustainable, customizable, and incredibly efficient**.

#### 1. Speed: Getting People into Homes Faster
The most significant advantage of modular construction is **speed**. A traditional site-built project is linear: you can't start framing until the foundation is cured. Modular construction is a **parallel process**.

- **Parallel Work:** While the modules are being precision-built in the factory, the on-site team is simultaneously excavating, laying the foundation, and preparing utilities.  
- **No Weather Delays:** Building indoors eliminates 100% of weather-related delays—a massive factor in Canadian construction, where rain, snow, and cold can halt work for weeks.

This parallel process can cut the total construction timeline by **50% to 60%**. In a housing crisis, this speed is not just a convenience; it's a critical lifeline, allowing organizations like **Anhart** to deliver safe, permanent housing to communities in **months, not years**. The Government of Canada lists modular construction as a key part of its [National Housing Strategy](https://www.cmhc-schl.gc.ca/en/professionals/housing-markets-data-and-research/housing-research/insight-series/modular-construction).

#### 2. Cost: Making "Affordable" Truly Attainable
Modular construction attacks high costs from multiple angles, providing **cost predictability** that is rare in traditional builds.

- **Reduced Material Waste:** Factory precision means materials are cut and used with computer-aided accuracy, dramatically reducing the waste that is common on traditional job sites.  
- **Lower Labor Costs:** Fewer on-site hours and a more streamlined assembly process reduce the high cost of skilled labor, especially in expensive urban markets.  
- **Predictability:** Factory-built projects have fewer surprises. With 90% of the work done in a controlled setting, the risk of costly overruns and change orders plummets. This financial certainty is essential for non-profit developers managing fixed budgets.

#### 3. Quality & Durability: A Superior Product
Unlike the outdated stigma of the past, today's modular homes are **often higher quality** than site-built structures.

Each module is built to exacting standards in a quality-controlled environment, with **dozens of inspections** before it ever leaves the factory. They are built "inside-out," allowing for **superior insulation and air-sealing**. Furthermore, modules must be built to withstand the stresses of transportation, which often results in them being **more rigid and durable** than traditional stick-built frames. This leads to a tighter, more resilient building that **exceeds many site-built standards**.

#### 4. Sustainability: Building a Greener Future
The environmental benefits are clear.

- **Significant reduction in material waste** → less landfill.  
- **Factory process uses less energy**.  
- **Final product is a tighter, more energy-efficient building** → lower carbon footprint and lower long-term utility costs for residents.

This method aligns perfectly with Canada's national goals for **net-zero housing**; see the [Canada Greener Homes Initiative](https://natural-resources.canada.ca/energy-efficiency/homes/canada-greener-homes-initiative/23441).

#### 5. Proof in Practice: Modular Housing in BC
This isn't just a theory; it's working in our communities. In recent years, **Vancouver and other BC municipalities** have embraced modular construction to create **hundreds of homes** for vulnerable residents, assembled on-site in **just days**. These projects demonstrate that high-performance, resilient modular housing can be delivered quickly, even in complex urban environments.

At **Anhart**, we see modular construction as a **critical tool** in our mission. It allows us to build and deliver new, safe, and supportive homes at a scale and speed that was previously impossible. It's not just about building houses; it's about **building a future where every Canadian has a place to call home**.
`;

const subsidiesBody = `
### A Guide to Affordable Rent in BC
For many individuals and families in British Columbia, finding **affordable, safe housing** can feel like an impossible task. As rents continue to rise, the gap between an average income and the cost of a home widens. This is where **housing subsidies** become a vital lifeline.

But what is a housing subsidy? In short, it's a **financial assistance program**, most often from the government, designed to help low-income households afford their rent. It **bridges the gap** between what a family can afford and the actual market rent.

#### The Primary Model: Rent-Geared-to-Income (RGI)
When most people talk about "social housing" or "subsidized housing," they are often referring to **Rent-Geared-to-Income (RGI)**.

**How it works:**  
With RGI, your rent is **not a fixed dollar amount**. Instead, it is calculated to be a **percentage of your household's total gross income** (typically **30%**).

**Why it matters:**  
This model provides **incredible stability**. If your income goes down one month (due to job loss or illness), your rent also goes down. If your income increases, your rent contribution increases, but it **never exceeds that 30% cap**. This ensures that you are not spending a disproportionate amount of your income on shelter, freeing up money for groceries, healthcare, and transportation. RGI is the **cornerstone of true housing affordability**.

#### Other Key Support Programs in BC
While RGI is the most comprehensive model, **BC Housing** also offers other forms of **rent supplement** assistance:

| Program | Who It Helps | Key Details |
|---------|--------------|-------------|
| **Rental Assistance Program (RAP)** | Low-income working families with children under 19 | Monthly cash subsidy for private-market rent. 2025 income limit: **$60,000** (varies by family size). [Apply here](https://www2.gov.bc.ca/gov/content/housing-tenancy/rental-assistance-programs/rental-assistance-program) |
| **Shelter Aid For Elderly Renters (SAFER)** | Seniors aged 60+ with low-to-moderate income | Cash subsidy for private-market rent. [Apply here](https://www2.gov.bc.ca/gov/content/housing-tenancy/rental-assistance-programs/safer) |
| **Affordable Rental** | General low-income tenants | Units (like many operated by **Anhart**) where rent is set **below market** but not tied to income. |

#### How Do I Qualify for Support?
Qualifying for subsidized housing in British Columbia typically depends on a few key factors:

1. **Household Income** – Must be below the **Housing Income Limit (HIL)** for your community (published annually by BC Housing).  
2. **Family Size** – Determines the unit size you qualify for.  
3. **Residency** – Canadian citizen, permanent resident, or refugee claimant.  
4. **Assets** – Generally under **$100,000** (varies by program).  
5. **Need** – Priority for seniors, people with disabilities, families with children, or those facing homelessness.

#### The First Step: The BC Housing Hub
Navigating these systems can be daunting, but there is a **central starting point**. The main portal for applying for **all forms of RGI** and many other subsidized housing options is **The Housing Registry**, operated by **BC Housing**.

- Submit **one application** (online or by mail) → entered into a **centralized waitlist**.  
- Makes you eligible for units managed by **BC Housing** *and* hundreds of non-profit partners—like **Anhart**—across the province.  

**Apply here:** [The Housing Registry](https://www.bchousing.org/housing-assistance/the-housing-registry)

When a unit becomes available, the housing provider contacts the next eligible applicant. Waitlists can be long, which is why organizations like ours are working hard to **build new supply**.

At **Anhart**, we work directly with **BC Housing** and other partners to provide units that are part of this critical system. We believe **everyone deserves a safe and affordable home**, and subsidies are a vital part of making that a reality.
`;

async function run() {
  const { error: e1 } = await supabase
    .from("blog_posts")
    .update({ content: modularBody })
    .eq(
      "title",
      "Modular Housing Solutions: The Future of Affordable Living in Canada",
    );

  const { error: e2 } = await supabase
    .from("blog_posts")
    .update({ content: subsidiesBody })
    .eq(
      "title",
      "Understanding Housing Subsidies and Qualifying for Support in British Columbia",
    );

  console.log(e1 ? "Modular error:" : "Modular updated", e1);
  console.log(e2 ? "Subsidies error:" : "Subsidies updated", e2);
}

run();
