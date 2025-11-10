-- Fix broken blog post images and missing content

-- Update the short blog post with complete content
UPDATE blog_posts 
SET 
  featured_image = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=800&fit=crop',
  content = '<article class="prose prose-lg max-w-4xl mx-auto">
  <h1>Why Affordable Housing Matters: Building Stronger Communities</h1>
  
  <p class="lead">Affordable housing is more than just a roof over one''s head—it''s the foundation of strong, vibrant communities. At Anhart, we believe that everyone deserves access to quality housing that doesn''t compromise their financial stability or quality of life.</p>

  <h2>The Housing Crisis in British Columbia</h2>
  
  <p>British Columbia, particularly the Lower Mainland and Vancouver Island, faces a significant affordable housing shortage. Rising property values and rental costs have made it increasingly difficult for working families, seniors, and individuals to find suitable accommodation.</p>

  <p>According to recent statistics from BC Housing, over 30,000 households in British Columbia are in core housing need, spending more than 30% of their gross income on housing. This financial burden forces many families to make difficult choices between paying rent and covering other essential expenses like food, healthcare, and education.</p>

  <h2>Economic Benefits</h2>
  
  <p>Affordable housing creates positive ripple effects throughout communities:</p>
  
  <ul>
    <li><strong>Stimulates local economies through construction jobs</strong> - Each affordable housing project creates numerous employment opportunities</li>
    <li><strong>Reduces homelessness and associated social costs</strong> - Studies show that providing affordable housing saves taxpayers money in emergency services and healthcare</li>
    <li><strong>Enables workforce stability for local businesses</strong> - Workers can afford to live near their jobs, reducing commute times and increasing productivity</li>
    <li><strong>Frees up household income for other essential needs</strong> - When housing costs are manageable, families have more resources for education, healthcare, and savings</li>
  </ul>

  <h2>Social Impact</h2>
  
  <p>When people have stable, affordable housing, they can:</p>
  
  <ul>
    <li><strong>Focus on education and career development</strong> - Housing stability is directly linked to better educational outcomes for children</li>
    <li><strong>Maintain better physical and mental health</strong> - Secure housing reduces stress and provides a safe environment</li>
    <li><strong>Build stronger community connections</strong> - Long-term residents invest in their neighborhoods and create social networks</li>
    <li><strong>Provide stability for their families</strong> - Children thrive when they don''t have to worry about frequent moves or housing insecurity</li>
  </ul>

  <h2>Environmental Considerations</h2>
  
  <p>Modern affordable housing projects like those developed by Anhart incorporate sustainable design principles that benefit both residents and the planet:</p>
  
  <ul>
    <li>Energy-efficient building materials and systems that reduce utility costs</li>
    <li>Proximity to public transportation, reducing carbon emissions</li>
    <li>Green spaces and community gardens that enhance quality of life</li>
    <li>Water conservation systems and renewable energy where possible</li>
  </ul>

  <h2>Our Approach at Anhart</h2>
  
  <p>Anhart develops affordable housing projects that prioritize:</p>
  
  <ul>
    <li><strong>Quality construction and sustainable design</strong> - We never compromise on building standards or durability</li>
    <li><strong>Community integration and support services</strong> - Our projects include spaces for community programs and resident services</li>
    <li><strong>Long-term affordability through innovative financing</strong> - We work with government partners and investors committed to keeping housing affordable</li>
    <li><strong>Partnerships with government and non-profit organizations</strong> - Collaboration ensures projects meet real community needs</li>
  </ul>

  <h2>Success Stories</h2>
  
  <p>Across British Columbia, our projects have helped hundreds of families achieve housing stability. Residents report improved quality of life, better health outcomes, and increased ability to save for the future. Children in stable housing show improved school attendance and academic performance.</p>

  <h2>Making a Difference</h2>
  
  <p>Through strategic development and community partnerships, we''re helping address BC''s housing crisis one project at a time. Our commitment extends beyond building structures—we''re building communities where people can thrive.</p>

  <p>Every affordable housing unit we create represents a family that can afford to stay in their community, a child who can focus on school instead of worry, and a neighborhood that grows stronger through diversity and inclusion.</p>

  <div class="bg-primary/10 p-6 rounded-lg my-6">
    <h3 class="text-primary">Get Involved</h3>
    <p>Whether you''re a potential resident, investor, or community partner, there are many ways to support affordable housing development in BC. Contact Anhart to learn more about our projects and how you can contribute to building stronger communities.</p>
  </div>
</article>'
WHERE slug = 'why-affordable-housing-matters';

-- Fix broken image paths
UPDATE blog_posts 
SET featured_image = 'https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=1200&h=800&fit=crop'
WHERE featured_image = '/src/assets/blog/energy-savings-winter-canada.jpg';

UPDATE blog_posts 
SET featured_image = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=800&fit=crop'
WHERE featured_image = '/src/assets/blog/bc-housing-application-guide.jpg';

UPDATE blog_posts 
SET featured_image = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=800&fit=crop'
WHERE featured_image = '/src/assets/blog/affordable-housing-community-vancouver.jpg';