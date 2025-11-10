-- Insert missing blog posts

-- Post 3: Community Impact
INSERT INTO blog_posts (
  id,
  slug,
  title,
  excerpt,
  content,
  featured_image,
  author_name,
  publish_date,
  reading_time,
  category,
  tags,
  meta_title,
  meta_description,
  keywords,
  is_published
) VALUES (
  gen_random_uuid(),
  'why-affordable-housing-matters-bc-community-impact',
  'Why Affordable Housing Matters in BC: Impact on Communities',
  'Explore the vital role affordable housing plays in British Columbia communities, from strengthening neighborhoods to supporting economic growth and social well-being.',
  '<article class="prose prose-lg max-w-4xl mx-auto">
  <h1>Why Affordable Housing Matters in BC: Impact on Communities</h1>
  
  <p class="lead">Affordable housing is more than shelter—it''s the foundation upon which strong, resilient communities are built. In British Columbia, where housing costs continue to rise, the impact of accessible, affordable housing extends far beyond individual households.</p>

  <h2>The Housing Landscape in British Columbia</h2>
  
  <p>British Columbia faces significant housing affordability challenges across urban and rural areas alike. From Vancouver''s dense urban neighborhoods to smaller communities throughout the Interior and Island regions, working families, seniors, and young professionals struggle to find housing that fits their budgets.</p>

  <div class="bg-primary/10 p-6 rounded-lg my-6">
    <h3>BC Housing Statistics (2025)</h3>
    <ul>
      <li>Over 40% of BC renters spend more than 30% of income on housing</li>
      <li>Average rent for a 2-bedroom apartment in Vancouver: $3,200/month</li>
      <li>Estimated 24,000+ people experiencing homelessness across BC</li>
      <li>Median household income growing slower than housing costs</li>
    </ul>
  </div>

  <h2>Strengthening Community Fabric</h2>

  <h3>Diverse and Inclusive Neighborhoods</h3>
  
  <p>When affordable housing is integrated throughout communities, neighborhoods become more diverse and vibrant. Teachers, healthcare workers, service industry employees, artists, and retirees can all live near where they work and contribute their unique perspectives and skills.</p>

  <p>This diversity creates richer community experiences, where people from different backgrounds interact, learn from one another, and build mutual understanding and support networks.</p>

  <h3>Community Stability and Connection</h3>
  
  <p>Stable housing enables residents to put down roots. Children attend the same schools year after year. Neighbors get to know each other and look out for one another. Local businesses gain loyal customers who become part of the neighborhood identity.</p>

  <blockquote>
    "When we opened our café five years ago, many of our regular customers were from the affordable housing building down the street. They became like family—not just customers, but community members who made our business succeed."
    <cite>— Maria Santos, Small Business Owner, East Vancouver</cite>
  </blockquote>

  <h2>Economic Benefits for Everyone</h2>

  <h3>Supporting Local Workforce</h3>
  
  <p>Essential workers—nurses, teachers, police officers, firefighters, retail employees—are the backbone of functioning communities. Affordable housing enables these professionals to live near their work, reducing commute times, transportation costs, and environmental impact while improving work-life balance.</p>

  <p>For more information about our projects, visit <a href="/portfolio" class="text-primary hover:underline font-semibold">our portfolio</a>.</p>
  
  <div class="bg-primary/10 p-6 rounded-lg mt-8">
    <h3 class="text-primary">Explore Our Projects</h3>
    <p>See how Anhart is making a difference in communities across British Columbia.</p>
    <a href="/portfolio" class="text-primary hover:underline font-semibold">View Our Portfolio →</a>
  </div>
</article>',
  'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1200&h=800&fit=crop',
  'Anhart Team',
  '2025-08-20',
  7,
  'Community Impact',
  ARRAY['affordable housing BC', 'community impact', 'social housing', 'Anhart', 'BC communities'],
  'Why Affordable Housing Matters in BC: Impact on Communities | Anhart',
  'Explore the vital role affordable housing plays in British Columbia communities. Learn how Anhart creates lasting positive impact through sustainable housing development.',
  ARRAY['affordable housing BC', 'community impact', 'social housing', 'Anhart', 'BC communities', 'housing solutions', 'community development'],
  true
);

-- Post 5: Housing Subsidies
INSERT INTO blog_posts (
  id,
  slug,
  title,
  excerpt,
  content,
  featured_image,
  author_name,
  publish_date,
  reading_time,
  category,
  tags,
  meta_title,
  meta_description,
  keywords,
  is_published
) VALUES (
  gen_random_uuid(),
  'understanding-housing-subsidies-qualifying-bc',
  'Understanding Housing Subsidies and Qualifying for Support in British Columbia',
  'Discover how housing subsidies work in BC, who qualifies, and how to get support for affordable housing. Learn about rental assistance programs and eligibility.',
  '<article class="prose prose-lg max-w-4xl mx-auto">
  <h1>Understanding Housing Subsidies and Qualifying for Support in British Columbia</h1>
  
  <p class="lead">Housing subsidies in BC help lower the cost of rent for eligible individuals, families, and seniors, making safe, stable housing more accessible. Learn how these programs work and who qualifies.</p>

  <h2>What Are Housing Subsidies?</h2>

  <p>Housing subsidies in BC help lower the cost of rent for eligible individuals, families, and seniors, making safe, stable housing more accessible. They may come from the provincial or local government, or non-profit organizations like Anhart.</p>

  <h2>Types of Subsidies</h2>

  <h3>Rental Assistance Program (RAP)</h3>
  <p>Assists working families with low to moderate incomes by providing monthly rent subsidies. This program helps bridge the gap between what families can afford and current market rent rates.</p>

  <h3>Shelter Aid for Elderly Renters (SAFER)</h3>
  <p>Helps seniors on a fixed income pay rent. SAFER provides monthly cash subsidies directly to eligible seniors aged 60 and older, ensuring they can afford to stay in their homes.</p>

  <h3>Non-profit & Co-op Housing Subsidies</h3>
  <p>Organizations such as Anhart provide housing at lower-than-market rates. These subsidies make quality housing accessible to families and individuals who might otherwise struggle to find affordable accommodation.</p>

  <div class="bg-primary/10 p-6 rounded-lg my-8">
    <h3 class="text-primary">Learn More About Our Projects</h3>
    <p>Anhart develops affordable housing throughout BC with various subsidy options.</p>
    <a href="/portfolio" class="text-primary hover:underline font-semibold">View Our Portfolio →</a>
  </div>
</article>',
  'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=800&fit=crop',
  'Anhart Team',
  '2025-07-12',
  6,
  'Housing Resources',
  ARRAY['housing subsidies BC', 'affordable housing eligibility', 'rental assistance British Columbia', 'Anhart'],
  'Understanding Housing Subsidies and Qualifying for Support in BC | Anhart',
  'Discover how housing subsidies work in BC, who qualifies, and how to get support for affordable housing.',
  ARRAY['housing subsidies BC', 'affordable housing eligibility', 'rental assistance British Columbia', 'Anhart', 'BC housing programs', 'housing support'],
  true
);

-- Post 6: Modular Housing
INSERT INTO blog_posts (
  id,
  slug,
  title,
  excerpt,
  content,
  featured_image,
  author_name,
  publish_date,
  reading_time,
  category,
  tags,
  meta_title,
  meta_description,
  keywords,
  is_published
) VALUES (
  gen_random_uuid(),
  'modular-housing-canada-innovative-solution',
  'Modular Housing in Canada: An Innovative Solution for Affordable Living',
  'Discover how modular housing is transforming the landscape of affordable homes in Canada. Explore the benefits, learn about successful projects, and find out how modular construction supports sustainability and accessibility for families across the country.',
  '<article class="prose prose-lg max-w-4xl mx-auto">
  <h1>Modular Housing in Canada: An Innovative Solution for Affordable Living</h1>
  
  <p class="lead">Canada faces a growing need for affordable, adaptable housing. In response, modular housing is emerging as a groundbreaking solution, offering efficient, sustainable living for individuals and families from coast to coast.</p>

  <h2>What is Modular Housing?</h2>

  <p>Modular housing refers to homes built in sections (modules) within a factory setting and assembled onsite. This construction method allows for faster building timelines, superior quality control, and significant cost savings compared to traditional stick-built homes.</p>

  <p>Unlike manufactured or mobile homes, modular housing meets the same building codes and standards as site-built homes. The key difference lies in where and how they''re constructed—in a controlled factory environment rather than entirely onsite.</p>

  <h2>Benefits of Modular Housing in Canada</h2>

  <h3>Speed of Construction</h3>
  <p>Modular homes can be built 30%-50% faster than conventional housing because weather delays are minimized and construction moves efficiently from factory to site.</p>

  <ul>
    <li><strong>Factory production continues year-round</strong>: Canadian winters don''t halt construction</li>
    <li><strong>Parallel workflows</strong>: Site preparation happens simultaneously with module construction</li>
    <li><strong>Rapid assembly</strong>: Modules can be installed and connected in days rather than months</li>
  </ul>

  <h3>Cost Savings</h3>
  <p>Factory production reduces labor costs and material waste, making modular homes more affordable for families and developers.</p>

  <h3>Sustainability</h3>
  <p>Modular housing is inherently greener. Factories employ energy-efficient manufacturing techniques and optimize the use of materials, leading to less waste and lower carbon footprints.</p>

  <h2>Successful Modular Housing Projects Across Canada</h2>

  <h3>Anhart''s Modular Projects</h3>
  <p>Organizations like Anhart are pioneering modular housing solutions in British Columbia:</p>

  <ul>
    <li><strong>Merritt Townhomes</strong>: Rapid deployment of permanent housing following the 2021 floods</li>
    <li><strong>Supportive Housing Initiatives</strong>: Factory-built modules providing stable homes for vulnerable populations</li>
    <li><strong>Family Housing Developments</strong>: Affordable, quality homes for working families</li>
  </ul>

  <div class="bg-primary/10 p-6 rounded-lg mt-8">
    <h3 class="text-primary">Ready to Explore Modular Housing?</h3>
    <p>Visit Anhart for resources, guides, and opportunities to apply for affordable modular homes in Canada.</p>
    <a href="/portfolio" class="text-primary hover:underline font-semibold">View Our Portfolio →</a>
  </div>
</article>',
  'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&h=800&fit=crop',
  'Anhart Team',
  '2025-10-05',
  8,
  'Housing Innovation',
  ARRAY['modular housing', 'affordable housing Canada', 'sustainable construction', 'prefab homes', 'housing innovation'],
  'Modular Housing in Canada: An Innovative Solution for Affordable Living | Anhart',
  'Discover how modular housing is transforming the landscape of affordable homes in Canada. Explore the benefits, learn about successful projects, and find out how modular construction supports sustainability and accessibility for families across the country.',
  ARRAY['modular housing Canada', 'affordable housing', 'prefab homes', 'sustainable construction', 'housing innovation', 'modular construction', 'factory-built homes', 'affordable living Canada'],
  true
);