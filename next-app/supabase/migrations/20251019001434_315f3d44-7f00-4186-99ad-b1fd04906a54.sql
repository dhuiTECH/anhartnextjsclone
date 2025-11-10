-- Create blog_posts table
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  featured_image TEXT NOT NULL,
  author_name TEXT NOT NULL DEFAULT 'Anhart Team',
  author_avatar TEXT,
  publish_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  category TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  reading_time INTEGER NOT NULL DEFAULT 5,
  meta_title TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  keywords TEXT[] NOT NULL DEFAULT '{}',
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view published posts
CREATE POLICY "Anyone can view published posts"
ON public.blog_posts
FOR SELECT
USING (is_published = true);

-- Policy: Admins can view all posts
CREATE POLICY "Admins can view all posts"
ON public.blog_posts
FOR SELECT
USING (is_admin());

-- Policy: Admins can insert posts
CREATE POLICY "Admins can insert posts"
ON public.blog_posts
FOR INSERT
WITH CHECK (is_admin());

-- Policy: Admins can update posts
CREATE POLICY "Admins can update posts"
ON public.blog_posts
FOR UPDATE
USING (is_admin());

-- Policy: Admins can delete posts
CREATE POLICY "Admins can delete posts"
ON public.blog_posts
FOR DELETE
USING (is_admin());

-- Create indexes for better performance
CREATE INDEX idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX idx_blog_posts_category ON public.blog_posts(category);
CREATE INDEX idx_blog_posts_publish_date ON public.blog_posts(publish_date DESC);
CREATE INDEX idx_blog_posts_published ON public.blog_posts(is_published);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert existing blog posts from code into database
INSERT INTO public.blog_posts (slug, title, excerpt, content, featured_image, author_name, publish_date, category, tags, reading_time, meta_title, meta_description, keywords, is_published)
VALUES
  (
    'why-affordable-housing-matters',
    'Why Affordable Housing Matters: Building Stronger Communities',
    'Explore the critical importance of affordable housing in creating sustainable, thriving communities across British Columbia.',
    '<p>Affordable housing is more than just a roof over one''s head—it''s the foundation of strong, vibrant communities. At Anhart, we believe that everyone deserves access to quality housing that doesn''t compromise their financial stability or quality of life.</p><h2>The Housing Crisis in British Columbia</h2><p>British Columbia, particularly the Lower Mainland and Vancouver Island, faces a significant affordable housing shortage. Rising property values and rental costs have made it increasingly difficult for working families, seniors, and individuals to find suitable accommodation.</p><h2>Economic Benefits</h2><p>Affordable housing creates positive ripple effects throughout communities:</p><ul><li>Stimulates local economies through construction jobs</li><li>Reduces homelessness and associated social costs</li><li>Enables workforce stability for local businesses</li><li>Frees up household income for other essential needs</li></ul><h2>Social Impact</h2><p>When people have stable, affordable housing, they can:</p><ul><li>Focus on education and career development</li><li>Maintain better physical and mental health</li><li>Build stronger community connections</li><li>Provide stability for their families</li></ul><h2>Our Approach</h2><p>Anhart develops affordable housing projects that prioritize:</p><ul><li>Quality construction and sustainable design</li><li>Community integration and support services</li><li>Long-term affordability through innovative financing</li><li>Partnerships with government and non-profit organizations</li></ul><h2>Making a Difference</h2><p>Through strategic development and community partnerships, we''re helping address BC''s housing crisis one project at a time. Our commitment extends beyond building structures—we''re building communities where people can thrive.</p>',
    '/src/assets/blog/affordable-housing-community-vancouver.jpg',
    'Anhart Team',
    '2024-01-15',
    'Community Impact',
    ARRAY['affordable housing', 'community development', 'social impact', 'housing crisis'],
    8,
    'Why Affordable Housing Matters | Anhart Community Development',
    'Discover how affordable housing creates stronger communities in British Columbia. Learn about the economic and social benefits of quality affordable housing development.',
    ARRAY['affordable housing BC', 'community development', 'housing crisis Vancouver', 'social impact housing'],
    true
  ),
  (
    'how-to-apply-bc-housing',
    'How to Apply for Affordable Housing in BC: A Step-by-Step Guide',
    'Navigate the BC Housing application process with confidence. Learn eligibility requirements, required documents, and tips for a successful application.',
    '<p>Finding and applying for affordable housing in British Columbia can seem overwhelming, but understanding the process makes it much more manageable. This comprehensive guide will walk you through each step.</p><h2>Understanding BC Housing Programs</h2><p>BC Housing offers several programs designed to help British Columbians access affordable housing:</p><ul><li><strong>Subsidized Housing:</strong> Rent is based on your income (typically 30% of gross household income)</li><li><strong>Non-Profit Housing:</strong> Below-market rental housing operated by non-profit organizations</li><li><strong>Co-operative Housing:</strong> Member-owned and operated housing communities</li><li><strong>Supportive Housing:</strong> Housing with on-site support services</li></ul><h2>Eligibility Requirements</h2><p>To qualify for most BC Housing programs, you must:</p><ul><li>Be a Canadian citizen or permanent resident</li><li>Meet income limits for your household size</li><li>Be 19 years of age or older (or meet specific criteria for family housing)</li><li>Demonstrate housing need</li><li>Not own property or assets above program limits</li></ul><h2>Application Process</h2><h3>Step 1: Gather Required Documents</h3><p>You''ll need:</p><ul><li>Government-issued photo ID</li><li>Proof of income (pay stubs, tax returns, benefit statements)</li><li>Proof of citizenship or permanent resident status</li><li>References from previous landlords</li><li>Banking information</li></ul><h3>Step 2: Complete the Application</h3><p>Applications can be submitted:</p><ul><li>Online through BC Housing''s website</li><li>In person at local BC Housing offices</li><li>Through partner non-profit housing providers</li></ul><h3>Step 3: Wait for Assessment</h3><p>Your application will be reviewed based on:</p><ul><li>Housing need</li><li>Income level</li><li>Family composition</li><li>Special circumstances</li></ul><h3>Step 4: Interview and Verification</h3><p>If selected, you''ll be contacted for:</p><ul><li>An in-person or phone interview</li><li>Document verification</li><li>Credit and reference checks</li></ul><h2>Tips for Success</h2><ul><li><strong>Apply Early:</strong> Wait times can be significant, so don''t delay</li><li><strong>Be Thorough:</strong> Complete applications fully and accurately</li><li><strong>Keep Documents Updated:</strong> Notify housing providers of any changes in your situation</li><li><strong>Explore Multiple Options:</strong> Apply to various housing providers and programs</li><li><strong>Stay in Contact:</strong> Respond promptly to all communications</li></ul><h2>Alternative Options</h2><p>While waiting for subsidized housing:</p><ul><li>Consider rent supplements or portable housing benefits</li><li>Explore private market rentals with non-profit support</li><li>Look into shared housing arrangements</li><li>Check with local municipalities for additional programs</li></ul><h2>Getting Help</h2><p>Need assistance with your application?</p><ul><li>Contact BC Housing directly: 1-800-257-7756</li><li>Reach out to local non-profit housing providers</li><li>Connect with community advocacy organizations</li><li>Visit your local Service BC office</li></ul>',
    '/src/assets/blog/bc-housing-application-guide.jpg',
    'Anhart Team',
    '2024-02-20',
    'Resources',
    ARRAY['BC housing', 'housing application', 'affordable housing guide', 'subsidized housing'],
    10,
    'How to Apply for Affordable Housing in BC | Complete Guide',
    'Step-by-step guide to applying for affordable housing in British Columbia. Learn eligibility requirements, application process, and tips for success.',
    ARRAY['BC housing application', 'affordable housing BC', 'subsidized housing application', 'BC housing eligibility'],
    true
  );

COMMENT ON TABLE public.blog_posts IS 'Stores blog post content for the Anhart website';
COMMENT ON COLUMN public.blog_posts.slug IS 'URL-friendly unique identifier for the blog post';
COMMENT ON COLUMN public.blog_posts.is_published IS 'Whether the post is visible to the public';