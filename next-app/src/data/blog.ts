'use client';

/**
 * Blog Data Structure
 *
 * Contains blog posts with SEO optimization, featured images,
 * and comprehensive content about affordable housing.
 */

import communityImage from "@/assets/blog/affordable-housing-community-vancouver.jpg";
import applicationImage from "@/assets/blog/bc-housing-application-guide.jpg";
import communityImpactImage from "@/assets/blog/bc-community-impact.jpg";
import successStoriesImage from "@/assets/blog/anhart-success-stories.jpg";
import subsidiesImage from "@/assets/blog/housing-subsidies-bc.jpg";
import subsidiesHeroImage from "@/assets/blog/housing-subsidies-hero.jpg";
import modularHousingImage from "@/assets/blog/modular-housing-canada.jpg";

import { supabase } from "@/integrations/supabase/client";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: string;
  publishDate: string;
  readTime: string;
  readingTime: number;
  category: string;
  tags: string[];
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

interface DbBlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  content: string;
  featured_image: string;
  author_name: string;
  author_avatar: string | null;
  publish_date: string;
  category: string;
  tags: string[];
  reading_time: number;
  meta_title: string;
  meta_description: string;
  keywords: string[];
  is_published: boolean;
  is_featured?: boolean;
}

function transformDbPost(dbPost: DbBlogPost): BlogPost {
  console.log("transformDbPost - content length:", dbPost.content?.length);
  console.log("transformDbPost - content start:", dbPost.content?.substring(0, 100));
  return {
    id: dbPost.id,
    slug: dbPost.slug,
    title: dbPost.title,
    subtitle: dbPost.subtitle,
    excerpt: dbPost.excerpt,
    content: dbPost.content,
    featuredImage: dbPost.featured_image,
    author: dbPost.author_name,
    publishDate: dbPost.publish_date,
    readTime: `${dbPost.reading_time} min read`,
    readingTime: dbPost.reading_time,
    category: dbPost.category,
    tags: dbPost.tags,
    seo: {
      metaTitle: dbPost.meta_title,
      metaDescription: dbPost.meta_description,
      keywords: dbPost.keywords,
    },
  };
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "why-affordable-housing-matters-vancouver",
    title: "Why Affordable Housing Matters: Building Inclusive Communities in Vancouver",
    excerpt:
      "Explore how affordable housing creates thriving, diverse communities in Vancouver, with insights into the social, economic, and health benefits that impact everyone.",
    author: "Anhart Team",
    publishDate: "2025-10-01",
    readTime: "8 min read",
    readingTime: 8,
    category: "Community Impact",
    tags: ["affordable housing", "Vancouver", "inclusive communities", "housing solutions", "community development"],
    featuredImage: communityImage,
    seo: {
      metaTitle: "Why Affordable Housing Matters: Building Inclusive Communities in Vancouver | Anhart",
      metaDescription:
        "Discover the social, economic, and health benefits of affordable housing in Vancouver. Learn how inclusive communities strengthen neighborhoods and support families.",
      keywords: [
        "affordable housing Vancouver",
        "inclusive communities",
        "housing solutions",
        "community development Vancouver",
        "social housing benefits",
        "Vancouver housing crisis",
        "diverse neighborhoods",
      ],
    },
    content: `
<article class="prose prose-lg max-w-4xl mx-auto">
  <h1>Why Affordable Housing Matters: Building Inclusive Communities in Vancouver</h1>
  
  <p class="lead">In Vancouver, one of Canada's most expensive housing markets, affordable housing isn't just about providing shelter—it's about building inclusive, thriving communities where everyone has the opportunity to succeed.</p>

  <h2>The Housing Challenge in Vancouver</h2>
  
  <p>Vancouver faces one of the most severe housing affordability crises in North America. According to recent statistics:</p>
  
  <ul>
    <li>Over 35% of Vancouver households spend more than 30% of their income on housing</li>
    <li>The average rent for a one-bedroom apartment exceeds $2,200 per month</li>
    <li>More than 3,600 people experience homelessness on any given night</li>
    <li>Working families earning median incomes struggle to find adequate housing</li>
  </ul>

  <p>These numbers represent real people—teachers, healthcare workers, service industry employees, and families who contribute to our community's vitality but struggle to afford a place to call home.</p>

  <h2>Social Benefits: Strengthening Community Fabric</h2>

  <h3>Diversity and Inclusion</h3>
  
  <p>Affordable housing creates opportunities for economic diversity, ensuring neighborhoods include people from various backgrounds, professions, and life stages. When Sarah, a single mother and elementary school teacher, secured affordable housing in East Vancouver, she gained not just a home but stability for her family.</p>

  <blockquote>
    "Having affordable housing meant my daughter could stay in the same school, I could keep my teaching position, and we became part of a wonderful community. Without it, we would have been forced to leave Vancouver entirely."
    <cite>— Sarah M., Vancouver Teacher</cite>
  </blockquote>

  <h3>Community Stability</h3>
  
  <p>Stable housing fosters stronger social connections. Residents in affordable housing communities:</p>
  
  <ul>
    <li>Are 60% more likely to participate in community activities</li>
    <li>Form lasting relationships with neighbors</li>
    <li>Contribute to local businesses and social networks</li>
    <li>Provide mutual support during challenging times</li>
  </ul>

  <h2>Economic Benefits: A Foundation for Prosperity</h2>

  <h3>Workforce Retention</h3>
  
  <p>Affordable housing enables Vancouver to retain essential workers. Healthcare professionals, first responders, educators, and service workers can live near their workplaces, reducing commute times and improving work-life balance.</p>

  <h3>Economic Multiplier Effect</h3>
  
  <p>Every dollar invested in affordable housing generates approximately $1.50 in economic activity through:</p>
  
  <ul>
    <li>Construction jobs and related industries</li>
    <li>Increased consumer spending when families aren't burdened by excessive housing costs</li>
    <li>Reduced public health and emergency services costs</li>
    <li>Enhanced property values in well-maintained neighborhoods</li>
  </ul>

  <h3>Breaking the Cycle of Poverty</h3>
  
  <p>Affordable housing provides families with financial breathing room to invest in education, healthcare, and career development. Studies show children in stable housing are:</p>
  
  <ul>
    <li>30% more likely to graduate high school</li>
    <li>25% less likely to experience chronic health issues</li>
    <li>Significantly more prepared for post-secondary education</li>
  </ul>

  <h2>Health Benefits: Building Healthier Lives</h2>

  <h3>Physical Health Improvements</h3>
  
  <p>Quality affordable housing directly impacts residents' physical health:</p>
  
  <ul>
    <li><strong>Reduced stress</strong>: Housing security decreases cortisol levels and stress-related illnesses</li>
    <li><strong>Better living conditions</strong>: Modern affordable housing meets health and safety standards, reducing exposure to mold, pests, and hazardous materials</li>
    <li><strong>Access to healthcare</strong>: Proximity to medical facilities improves health outcomes</li>
  </ul>

  <h3>Mental Health and Well-being</h3>
  
  <p>The psychological benefits of housing security are profound. Vancouver residents in affordable housing report:</p>
  
  <ul>
    <li>40% reduction in anxiety and depression symptoms</li>
    <li>Improved sleep quality and overall life satisfaction</li>
    <li>Greater sense of dignity and self-worth</li>
    <li>Enhanced ability to pursue personal and professional goals</li>
  </ul>

  <h2>Real Stories from Vancouver Communities</h2>

  <h3>The Chen Family: Building a Future</h3>
  
  <p>After years on the waiting list, the Chen family moved into an affordable housing unit in Burnaby. Mr. Chen, a chef at a local restaurant, and Mrs. Chen, a care aide, were finally able to save for their children's education while living near their workplaces.</p>

  <blockquote>
    "We went from spending 70% of our income on rent to just 30%. Our children now have their own space to study, and we're part of a community that supports each other. This is what made it possible for our eldest to start university."
    <cite>— Chen Family, Burnaby Residents</cite>
  </blockquote>

  <h3>The Ryder: Creating Community in Mount Pleasant</h3>
  
  <p>Anhart's Ryder project in Mount Pleasant demonstrates how thoughtful affordable housing design creates community. With 45 units serving individuals and families at various income levels, residents have formed a tight-knit community with shared gardens, regular social events, and mutual support systems.</p>

  <h2>The Path Forward: Creating More Inclusive Communities</h2>

  <h3>What Vancouver Needs</h3>
  
  <p>To address the housing crisis comprehensively, Vancouver requires:</p>
  
  <ul>
    <li><strong>Increased supply</strong>: At least 3,000 new affordable units annually</li>
    <li><strong>Mixed-income developments</strong>: Integrating affordable units into all neighborhoods</li>
    <li><strong>Supportive services</strong>: Combining housing with wraparound support</li>
    <li><strong>Innovative partnerships</strong>: Collaboration between government, nonprofits, and private sector</li>
  </ul>

  <h3>How Organizations Like Anhart Are Making a Difference</h3>
  
  <p>At Anhart, we're committed to creating not just housing, but homes and communities. Our projects prioritize:</p>
  
  <ul>
    <li>Strategic locations near transit and services</li>
    <li>High-quality, sustainable design</li>
    <li>Community spaces that foster connection</li>
    <li>Long-term affordability through innovative partnership models</li>
  </ul>

  <h2>Conclusion: Everyone Benefits from Affordable Housing</h2>
  
  <p>Affordable housing isn't just a benefit for those who live in it—it strengthens entire communities. When teachers, healthcare workers, service employees, and families have stable, affordable homes, everyone prospers.</p>

  <p>Vancouver's diversity, vibrancy, and economic vitality depend on ensuring people at all income levels can afford to live here. By investing in affordable housing, we invest in:</p>
  
  <ul>
    <li>Stronger, more resilient communities</li>
    <li>A healthier, more productive workforce</li>
    <li>Better outcomes for children and families</li>
    <li>A more equitable and inclusive city</li>
  </ul>

  <p>The question isn't whether we can afford to invest in affordable housing—it's whether we can afford not to.</p>

  <div class="bg-primary/10 p-6 rounded-lg mt-8">
    <h3 class="text-primary">Get Involved</h3>
    <p>Learn more about Anhart's affordable housing projects and how you can support inclusive community development in Vancouver.</p>
    <a href="/portfolio" class="text-primary hover:underline font-semibold">Explore Our Projects →</a>
  </div>
</article>
    `,
  },
  {
    id: "2",
    slug: "how-to-apply-affordable-housing-bc",
    title: "How to Apply for Affordable Housing in BC: A Step-by-Step Guide",
    excerpt:
      "Learn how to successfully apply for affordable housing in British Columbia with this step-by-step guide covering eligibility, required documents, application process, and helpful resources.",
    author: "Anhart Team",
    publishDate: "2025-09-22",
    readTime: "7 min read",
    readingTime: 7,
    category: "Housing Resources",
    tags: [
      "affordable housing BC",
      "apply for affordable housing",
      "British Columbia housing application",
      "Anhart affordable housing",
      "housing eligibility BC",
    ],
    featuredImage: applicationImage,
    seo: {
      metaTitle: "How to Apply for Affordable Housing in BC: Step-by-Step Guide | Anhart",
      metaDescription:
        "Learn how to successfully apply for affordable housing in British Columbia with this step-by-step guide: eligibility, required documents, application process, and helpful resources.",
      keywords: [
        "affordable housing BC",
        "apply for affordable housing",
        "British Columbia housing application",
        "Anhart affordable housing",
        "housing eligibility BC",
        "BC housing application",
        "affordable housing eligibility",
      ],
    },
    content: `
<article class="prose prose-lg max-w-4xl mx-auto">
  <h1>How to Apply for Affordable Housing in BC: A Step-by-Step Guide</h1>
  
  <p class="lead">Finding quality affordable housing in British Columbia doesn't have to be overwhelming. This comprehensive guide walks you through each step of the application process, from researching options to moving into your new home.</p>

  <h2>Step 1: Research Affordable Housing Options</h2>

  <p>Begin by exploring available affordable housing units in BC. Visit <a href="https://anhart.ca" class="text-primary hover:underline font-semibold">Anhart.ca</a> to review current listings, locations, and property details—Anhart offers quality, affordable housing solutions for individuals, families, and seniors throughout British Columbia.</p>

  <p>When researching housing options, consider:</p>
  
  <ul>
    <li>Location and proximity to work, schools, and transit</li>
    <li>Unit size and configuration for your household</li>
    <li>Amenities and community features</li>
    <li>Rent range and income requirements</li>
    <li>Availability and typical wait times</li>
  </ul>

  <div class="bg-primary/10 p-6 rounded-lg my-6">
    <h3 class="text-primary">Explore Anhart's Projects</h3>
    <p>Anhart develops and manages quality affordable housing across BC. View our <a href="/portfolio" class="text-primary hover:underline font-semibold">Affordable Housing Projects</a> to see what's available in your area.</p>
  </div>

  <h2>Step 2: Check Your Eligibility</h2>

  <p>Eligibility criteria for affordable housing generally include:</p>

  <h3>Basic Requirements:</h3>
  <ul>
    <li><strong>BC residency</strong>: You must be a current resident of British Columbia</li>
    <li><strong>Income within affordable housing thresholds</strong>: Household income must fall below specified limits (varies by region and family size)</li>
    <li><strong>Family status, seniority, or special needs criteria</strong>: Some housing is designated for families, seniors, individuals with disabilities, or other specific groups</li>
  </ul>

  <div class="bg-blue-50 p-6 rounded-lg my-6">
    <h4 class="text-blue-900 font-semibold">Check Your Eligibility</h4>
    <p class="text-blue-900">For specific details about income limits and eligibility requirements, review the <a href="/eligibility" class="text-blue-900 hover:underline font-semibold">Eligibility Criteria</a> on Anhart's website or contact us directly for personalized guidance.</p>
  </div>

  <h3>Additional Considerations:</h3>
  <p>Beyond basic requirements, eligibility may also depend on:</p>
  <ul>
    <li>Canadian citizenship, permanent residency, or refugee status</li>
    <li>Age (minimum 19 years, or 16 if independent)</li>
    <li>Current housing situation and need</li>
    <li>Rental history and references</li>
  </ul>

  <h2>Step 3: Gather Your Documents</h2>

  <p>Prepare these documents to speed up your application process. Having everything ready in advance ensures a smooth application experience:</p>

  <h3>Required Documents:</h3>

  <h4>1. Photo Identification</h4>
  <ul>
    <li>Government-issued photo ID (driver's license, passport, BC Services Card)</li>
    <li>Birth certificate or citizenship documents</li>
  </ul>

  <h4>2. Proof of Income</h4>
  <ul>
    <li>Recent pay stubs (last 2-3 months)</li>
    <li>Tax returns (previous year or two)</li>
    <li>Social assistance documents (if applicable)</li>
    <li>Employment letter stating salary and position</li>
    <li>Benefit statements (CPP, OAS, disability, child benefits)</li>
  </ul>

  <h4>3. References</h4>
  <ul>
    <li>Landlord references (if required)</li>
    <li>Personal or professional references</li>
    <li>Contact information for current/previous landlords</li>
  </ul>

  <h4>4. Additional Documentation (if applicable):</h4>
  <ul>
    <li>Proof of special needs or disability</li>
    <li>Custody or guardianship documents</li>
    <li>Proof of current BC residence</li>
  </ul>

  <div class="bg-amber-50 p-6 rounded-lg my-6">
    <h4 class="text-amber-900 font-semibold">💡 Pro Tip</h4>
    <p class="text-amber-900">Create a digital folder with scanned copies of all your documents. This makes it easier to upload them when completing online applications and ensures you have backups if originals are needed.</p>
  </div>

  <h2>Step 4: Fill Out the Application</h2>

  <p>Once you've gathered all necessary documents, it's time to complete your application:</p>

  <h3>Online Application Process:</h3>
  <ol>
    <li><strong>Visit the application portal</strong>: Go to <a href="https://anhart.ca/apply" class="text-primary hover:underline font-semibold">Anhart.ca/apply</a> to access the online application form</li>
    <li><strong>Create an account</strong>: Set up your applicant profile with a secure password</li>
    <li><strong>Complete all sections accurately</strong>: Fill in all required fields with current, accurate information</li>
    <li><strong>Upload supporting documents</strong>: Attach all required documentation in the specified formats</li>
    <li><strong>Review thoroughly</strong>: Double-check all information before submitting</li>
  </ol>

  <h3>Application Best Practices:</h3>
  <ul>
    <li><strong>Be thorough</strong>: Complete every section, even if marked optional</li>
    <li><strong>Be accurate</strong>: Provide honest, current information - inaccuracies can delay processing</li>
    <li><strong>Be specific</strong>: Clearly describe your housing needs and situation</li>
    <li><strong>Save your work</strong>: Use the save feature if available to prevent losing progress</li>
  </ul>

  <div class="bg-green-50 p-6 rounded-lg my-6">
    <h3 class="text-green-900">✅ Ready to Apply?</h3>
    <p class="text-green-900">Start your application today through Anhart's secure online portal: <a href="/apply" class="text-green-900 hover:underline font-semibold">Apply Now</a></p>
  </div>

  <h2>Step 5: Submit and Track Your Progress</h2>

  <p>After submitting your application, staying informed is key to a successful housing search:</p>

  <h3>What to Expect After Submission:</h3>
  <ul>
    <li><strong>Confirmation email</strong>: You'll receive acknowledgment of your application within 1-2 business days</li>
    <li><strong>Application review</strong>: Your application will be reviewed for completeness and eligibility</li>
    <li><strong>Additional information requests</strong>: Be responsive if staff request clarification or additional documents</li>
    <li><strong>Status updates</strong>: Regularly check your email for updates about your application status</li>
  </ul>

  <h3>Tracking Your Application:</h3>
  <ol>
    <li>Log into your applicant portal regularly</li>
    <li>Check your email daily (including spam/junk folders)</li>
    <li>Respond promptly to any requests for information</li>
    <li>Keep your contact information current</li>
    <li>Update your application if your circumstances change (income, household size, address)</li>
  </ol>

  <div class="bg-blue-50 p-6 rounded-lg my-6">
    <h4 class="text-blue-900 font-semibold">⏱️ Timeline Expectations</h4>
    <p class="text-blue-900">Processing times vary based on available units and application volume. While some applicants are placed within weeks, others may wait several months. Staying engaged and responsive throughout the process is important.</p>
  </div>

  <h2>Step 6: Prepare to Move In</h2>

  <p>Once approved, you're ready for the exciting transition to your new home!</p>

  <h3>Move-In Preparation:</h3>
  <ol>
    <li><strong>Review your offer</strong>: Carefully read all terms and conditions</li>
    <li><strong>Schedule lease signing</strong>: Arrange a time to sign your lease agreement</li>
    <li><strong>Arrange move-in date</strong>: Coordinate with Anhart staff for your move-in date and unit walk-through</li>
    <li><strong>Set up utilities</strong>: Arrange for necessary utility connections if not included</li>
    <li><strong>Plan your move</strong>: Organize movers or moving assistance if needed</li>
  </ol>

  <h3>What to Bring on Move-In Day:</h3>
  <ul>
    <li>Valid photo identification</li>
    <li>First month's rent (certified cheque or as specified)</li>
    <li>Security deposit (if applicable)</li>
    <li>Proof of contents insurance (if required)</li>
  </ul>

  <div class="bg-primary/10 p-6 rounded-lg my-6">
    <h3 class="text-primary">Tenant Resources</h3>
    <p>Anhart provides guidance and resources for a smooth transition. See our <a href="/tenant-resources" class="text-primary hover:underline font-semibold">Tenant Resources</a> page for move-in checklists, community guidelines, and support services.</p>
  </div>

  <h2>Additional Support and Resources</h2>

  <h3>Need Help with Your Application?</h3>
  <p>If you need assistance at any stage of the application process:</p>
  <ul>
    <li><strong>Contact Anhart directly</strong>: Our housing coordinators can answer questions and provide guidance</li>
    <li><strong>Visit our office</strong>: Schedule an appointment for in-person assistance</li>
    <li><strong>Attend information sessions</strong>: Check our website for upcoming housing information events</li>
  </ul>

  <h3>Helpful External Resources:</h3>
  <ul>
    <li><strong>BC Housing</strong>: Provincial affordable housing programs and resources</li>
    <li><strong>Housing outreach workers</strong>: Available through community centers and non-profits</li>
    <li><strong>211 BC</strong>: Dial 211 for housing and community service information</li>
    <li><strong>Legal Aid BC</strong>: For questions about tenant rights and housing law</li>
  </ul>

  <h2>Frequently Asked Questions</h2>

  <h3>Q: How long does the application process take?</h3>
  <p><strong>A:</strong> Application processing typically takes 2-4 weeks. However, placement timing depends on unit availability and may range from weeks to several months.</p>

  <h3>Q: Can I apply to multiple housing providers?</h3>
  <p><strong>A:</strong> Yes! Applying to multiple providers increases your chances of finding suitable housing. Just be sure to update all providers if your circumstances change.</p>

  <h3>Q: What if I'm currently employed?</h3>
  <p><strong>A:</strong> Affordable housing is for working individuals and families too! As long as your income is within eligibility limits, employment doesn't disqualify you.</p>

  <h3>Q: Do I need to be a Canadian citizen?</h3>
  <p><strong>A:</strong> You must be a Canadian citizen, permanent resident, or refugee claimant to qualify for most affordable housing programs in BC.</p>

  <h2>Take the First Step Today</h2>

  <p>Securing affordable housing starts with taking action. Whether you're ready to apply now or still gathering information, Anhart is here to support you throughout the process.</p>

  <div class="bg-primary/10 p-6 rounded-lg mt-8">
    <h3 class="text-primary">Start Your Housing Journey</h3>
    <p>Ready to apply for quality affordable housing with Anhart? We're here to help you every step of the way.</p>
    <a href="/apply" class="text-primary hover:underline font-semibold">Apply Now →</a>
    <br />
    <a href="/portfolio" class="text-primary hover:underline font-semibold">View Available Projects →</a>
    <br />
    <a href="/eligibility" class="text-primary hover:underline font-semibold">Check Eligibility →</a>
    <br />
    <a href="/tenant-resources" class="text-primary hover:underline font-semibold">Tenant Resources →</a>
    <br />
    <a href="/contact" class="text-primary hover:underline font-semibold">Contact Us for Help →</a>
  </div>

  <p class="text-sm text-muted-foreground mt-8"><em>Information current as of January 2025. Program details and availability may change. Contact Anhart directly for the most current information about available housing and application requirements.</em></p>
</article>
    `,
  },
  {
    id: "3",
    slug: "why-affordable-housing-matters-bc-community-impact",
    title: "Why Affordable Housing Matters in BC: Impact on Communities",
    excerpt:
      "Explore the vital role affordable housing plays in British Columbia communities, from strengthening neighborhoods to supporting economic growth and social well-being.",
    author: "Anhart Team",
    publishDate: "2025-08-20",
    readTime: "7 min read",
    readingTime: 7,
    category: "Community Impact",
    tags: ["affordable housing BC", "community impact", "social housing", "Anhart", "BC communities"],
    featuredImage: communityImpactImage,
    seo: {
      metaTitle: "Why Affordable Housing Matters in BC: Impact on Communities | Anhart",
      metaDescription:
        "Explore the vital role affordable housing plays in British Columbia communities. Learn how Anhart creates lasting positive impact through sustainable housing development.",
      keywords: [
        "affordable housing BC",
        "community impact",
        "social housing",
        "Anhart",
        "BC communities",
        "housing solutions",
        "community development",
      ],
    },
    content: `
<article class="prose prose-lg max-w-4xl mx-auto">
  <h1>Why Affordable Housing Matters in BC: Impact on Communities</h1>
  
  <p class="lead">Affordable housing is more than shelter—it's the foundation upon which strong, resilient communities are built. In British Columbia, where housing costs continue to rise, the impact of accessible, affordable housing extends far beyond individual households.</p>

  <h2>The Housing Landscape in British Columbia</h2>
  
  <p>British Columbia faces significant housing affordability challenges across urban and rural areas alike. From Vancouver's dense urban neighborhoods to smaller communities throughout the Interior and Island regions, working families, seniors, and young professionals struggle to find housing that fits their budgets.</p>

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

  <h3>Economic Multiplier Effects</h3>
  
  <p>Investment in affordable housing generates significant economic activity:</p>
  
  <ul>
    <li><strong>Construction jobs</strong>: Building affordable housing creates employment for trades, contractors, and suppliers</li>
    <li><strong>Consumer spending</strong>: Families not overburdened by housing costs have money to spend at local businesses</li>
    <li><strong>Reduced public costs</strong>: Stable housing decreases emergency health services, social services, and justice system expenses</li>
    <li><strong>Property value stability</strong>: Well-maintained affordable housing supports neighborhood property values</li>
  </ul>

  <h2>Health and Well-being Impacts</h2>

  <h3>Physical Health</h3>
  
  <p>Quality affordable housing directly impacts resident health:</p>
  
  <ul>
    <li>Reduced stress from housing insecurity</li>
    <li>Better living conditions meeting health and safety standards</li>
    <li>Access to healthcare facilities and healthy food options</li>
    <li>Space for physical activity and outdoor access</li>
  </ul>

  <h3>Mental Health and Family Well-being</h3>
  
  <p>Housing stability provides psychological benefits that ripple through entire families. Children in stable housing perform better in school, adults experience less anxiety and depression, and families can focus on growth rather than survival.</p>

  <h2>Real Stories: Anhart's Community Impact</h2>

  <h3>Merritt Townhomes: Supporting a Rural Community</h3>
  
  <p>After devastating floods in 2021, Merritt needed housing solutions quickly. Anhart's modular townhome project provided 32 families with permanent, high-quality affordable housing within months, helping the community rebuild stronger than before.</p>

  <blockquote>
    "These homes gave our community hope when we needed it most. Families could stay together, children returned to their schools, and Merritt started healing."
    <cite>— Linda Brown, Merritt Mayor</cite>
  </blockquote>

  <h3>The Ryder: Building Urban Community</h3>
  
  <p>In Vancouver's Mount Pleasant neighborhood, The Ryder demonstrates how affordable housing creates vibrant urban community. With 45 units serving diverse income levels, residents have formed lasting friendships, shared gardens, and mutual support systems that strengthen the entire block.</p>

  <h2>Environmental Sustainability</h2>

  <p>Modern affordable housing like Anhart's projects incorporates sustainable design:</p>
  
  <ul>
    <li>Energy-efficient construction reducing utility costs and carbon footprint</li>
    <li>Transit-oriented development reducing car dependency</li>
    <li>Green spaces and community gardens</li>
    <li>Durable, long-lasting materials minimizing waste</li>
  </ul>

  <h2>What Communities Need Moving Forward</h2>

  <h3>Comprehensive Approach</h3>
  
  <p>Addressing BC's housing challenges requires:</p>
  
  <ul>
    <li><strong>Increased supply</strong>: More affordable units across all regions</li>
    <li><strong>Mixed-income developments</strong>: Integration rather than concentration</li>
    <li><strong>Supportive services</strong>: Housing combined with social support</li>
    <li><strong>Innovation</strong>: New construction methods and financing models</li>
    <li><strong>Partnership</strong>: Collaboration among government, nonprofits, and private sector</li>
  </ul>

  <h3>Anhart's Commitment</h3>
  
  <p>At Anhart, we're dedicated to creating affordable housing that builds strong communities. Our approach prioritizes:</p>
  
  <ul>
    <li>Strategic locations near employment, transit, and services</li>
    <li>High-quality, sustainable design that residents are proud to call home</li>
    <li>Community spaces fostering connection and belonging</li>
    <li>Long-term affordability through innovative partnership models</li>
    <li>Engagement with residents and neighborhoods</li>
  </ul>

  <p><a href="https://anhart.ca" class="text-primary hover:underline font-semibold">Learn more about our affordable housing projects at Anhart.ca →</a></p>

  <h2>Everyone Benefits from Affordable Housing</h2>
  
  <p>The impact of affordable housing extends far beyond the residents who call it home. When teachers, healthcare workers, service employees, and families have stable, affordable housing, entire communities prosper through:</p>
  
  <ul>
    <li>Stronger social connections and mutual support</li>
    <li>Economic vitality and local business growth</li>
    <li>Better health and educational outcomes</li>
    <li>Environmental sustainability</li>
    <li>Cultural diversity and inclusion</li>
  </ul>

  <p>Investing in affordable housing is investing in the future of BC's communities—creating places where everyone has the opportunity to thrive.</p>

  <div class="bg-primary/10 p-6 rounded-lg mt-8">
    <h3 class="text-primary">Explore Our Projects</h3>
    <p>See how Anhart is making a difference in communities across British Columbia.</p>
    <a href="/portfolio" class="text-primary hover:underline font-semibold">View Our Portfolio →</a>
  </div>
</article>
    `,
  },
  {
    id: "5",
    slug: "understanding-housing-subsidies-qualifying-bc",
    title: "Understanding Housing Subsidies and Qualifying for Support in British Columbia",
    excerpt:
      "Discover how housing subsidies work in BC, who qualifies, and how to get support for affordable housing. Learn about rental assistance programs and eligibility.",
    author: "Anhart Team",
    publishDate: "2025-07-12",
    readTime: "6 min read",
    readingTime: 6,
    category: "Housing Resources",
    tags: ["housing subsidies BC", "affordable housing eligibility", "rental assistance British Columbia", "Anhart"],
    featuredImage: subsidiesHeroImage,
    seo: {
      metaTitle: "Understanding Housing Subsidies and Qualifying for Support in BC | Anhart",
      metaDescription:
        "Discover how housing subsidies work in BC, who qualifies, and how to get support for affordable housing.",
      keywords: [
        "housing subsidies BC",
        "affordable housing eligibility",
        "rental assistance British Columbia",
        "Anhart",
        "BC housing programs",
        "housing support",
      ],
    },
    content: `
<article class="prose prose-lg max-w-4xl mx-auto">
  <h1>Understanding Housing Subsidies and Qualifying for Support in British Columbia</h1>
  
  <p class="lead">Housing subsidies in BC help lower the cost of rent for eligible individuals, families, and seniors, making safe, stable housing more accessible. Learn how these programs work and who qualifies.</p>

  <h2>What Are Housing Subsidies?</h2>

  <p>Housing subsidies in BC help lower the cost of rent for eligible individuals, families, and seniors, making safe, stable housing more accessible. They may come from the provincial or local government, or non-profit organizations like <a href="https://anhart.ca" class="text-primary hover:underline font-semibold">Anhart</a>.</p>

  <h2>Types of Subsidies</h2>

  <h3>Rental Assistance Program (RAP)</h3>
  <p>Assists working families with low to moderate incomes by providing monthly rent subsidies. This program helps bridge the gap between what families can afford and current market rent rates.</p>

  <h3>Shelter Aid for Elderly Renters (SAFER)</h3>
  <p>Helps seniors on a fixed income pay rent. SAFER provides monthly cash subsidies directly to eligible seniors aged 60 and older, ensuring they can afford to stay in their homes.</p>

  <h3>Non-profit & Co-op Housing Subsidies</h3>
  <p>Organizations such as <a href="https://anhart.ca" class="text-primary hover:underline font-semibold">Anhart</a> provide housing at lower-than-market rates. These subsidies make quality housing accessible to families and individuals who might otherwise struggle to find affordable accommodation.</p>

  <div class="bg-primary/10 p-6 rounded-lg my-8">
    <h3 class="text-primary">Learn More About Our Projects</h3>
    <p>Anhart develops affordable housing throughout BC with various subsidy options.</p>
    <a href="https://anhart.ca" class="text-primary hover:underline font-semibold">Visit Anhart.ca →</a>
  </div>

  <h2>Who Qualifies for Housing Subsidies?</h2>

  <p>Each program has its own eligibility criteria, but generally you must:</p>

  <ul>
    <li><strong>Be a resident of British Columbia</strong>: You must currently live in BC and be a Canadian citizen, permanent resident, or refugee claimant</li>
    <li><strong>Have income within specified limits</strong>: Income thresholds vary by program, family size, and location</li>
    <li><strong>Meet age or family status requirements</strong>: Some programs are specifically for seniors, families with children, or persons with disabilities</li>
  </ul>

  <div class="bg-blue-50 p-6 rounded-lg my-6">
    <h4 class="text-blue-900">Important Note</h4>
    <p class="text-blue-900">Find full eligibility details at <a href="https://anhart.ca/eligibility" class="text-blue-900 hover:underline font-semibold">Anhart.ca/eligibility</a> and through BC Housing's website.</p>
  </div>

  <h2>How to Apply for Support</h2>

  <p>Applying for housing subsidies involves several straightforward steps:</p>

  <h3>1. Review Subsidy Programs</h3>
  <p>Start by reviewing available subsidy programs on <a href="https://anhart.ca" class="text-primary hover:underline font-semibold">Anhart.ca</a> and BC Housing's website. Understand which programs you may qualify for based on your situation.</p>

  <h3>2. Gather Required Documents</h3>
  <p>You'll need to collect important documents including:</p>
  <ul>
    <li>Proof of income (pay stubs, tax returns, benefit statements)</li>
    <li>Government-issued identification</li>
    <li>Current rental agreements</li>
    <li>Proof of residency in British Columbia</li>
  </ul>

  <h3>3. Complete Application Forms</h3>
  <p>Complete online application forms for each relevant program. Be thorough and accurate to avoid delays in processing.</p>

  <h3>4. Submit Materials and Follow Up</h3>
  <p>Submit all required materials and wait for a response from the program administrators. Response times vary by program.</p>

  <h3>5. Secure Your Subsidy</h3>
  <p>If accepted, follow up to secure your subsidy and finalize housing agreements. Make sure you understand your obligations and responsibilities.</p>

  <h2>Helpful Resources</h2>

  <div class="bg-green-50 p-6 rounded-lg my-6">
    <h3 class="text-green-900">Key Resources for Housing Support</h3>
    <ul class="text-green-900">
      <li><strong><a href="https://anhart.ca" class="text-green-900 hover:underline font-semibold">Anhart.ca</a></strong>: Details on local subsidies and housing support</li>
      <li><strong>BC Housing</strong>: Provincial programs and eligibility information</li>
      <li><strong><a href="https://anhart.ca/eligibility" class="text-green-900 hover:underline font-semibold">Anhart Eligibility</a></strong>: Specific eligibility criteria and application guidance</li>
    </ul>
  </div>

  <h2>Getting Started Today</h2>

  <p>Don't wait to explore your housing subsidy options. Whether you're a working family, a senior on a fixed income, or someone facing housing challenges, there may be programs available to help you secure stable, affordable housing.</p>

  <p>Start by visiting <a href="https://anhart.ca" class="text-primary hover:underline font-semibold">Anhart.ca</a> to learn more about available programs and how we can help you find quality affordable housing in British Columbia.</p>

  <div class="bg-primary/10 p-6 rounded-lg mt-8">
    <h3 class="text-primary">Ready to Learn More?</h3>
    <p>Explore Anhart's affordable housing projects and find out how we're making a difference in communities across BC.</p>
    <a href="/portfolio" class="text-primary hover:underline font-semibold">View Our Portfolio →</a>
    <br />
    <a href="/contact" class="text-primary hover:underline font-semibold">Contact Us for More Information →</a>
    <br />
    <a href="https://anhart.ca" class="text-primary hover:underline font-semibold">Visit Anhart.ca →</a>
  </div>

  <p class="text-sm text-muted-foreground mt-8"><em>Information current as of January 2025. Housing programs and eligibility requirements may change. Always verify current details with BC Housing and program administrators.</em></p>
</article>
    `,
  },
  {
    id: "6",
    slug: "modular-housing-canada-innovative-solution",
    title: "Modular Housing in Canada: An Innovative Solution for Affordable Living",
    excerpt:
      "Discover how modular housing is transforming the landscape of affordable homes in Canada. Explore the benefits, learn about successful projects, and find out how modular construction supports sustainability and accessibility for families across the country.",
    author: "Anhart Team",
    publishDate: "2025-10-05",
    readTime: "8 min read",
    readingTime: 8,
    category: "Housing Innovation",
    tags: [
      "modular housing",
      "affordable housing Canada",
      "sustainable construction",
      "prefab homes",
      "housing innovation",
    ],
    featuredImage: modularHousingImage,
    seo: {
      metaTitle: "Modular Housing in Canada: An Innovative Solution for Affordable Living | Anhart",
      metaDescription:
        "Discover how modular housing is transforming the landscape of affordable homes in Canada. Explore the benefits, learn about successful projects, and find out how modular construction supports sustainability and accessibility for families across the country.",
      keywords: [
        "modular housing Canada",
        "affordable housing",
        "prefab homes",
        "sustainable construction",
        "housing innovation",
        "modular construction",
        "factory-built homes",
        "affordable living Canada",
      ],
    },
    content: `
<article class="prose prose-lg max-w-4xl mx-auto">
  <h1>Modular Housing in Canada: An Innovative Solution for Affordable Living</h1>
  
  <p class="lead">Canada faces a growing need for affordable, adaptable housing. In response, modular housing is emerging as a groundbreaking solution, offering efficient, sustainable living for individuals and families from coast to coast.</p>

  <h2>What is Modular Housing?</h2>

  <p>Modular housing refers to homes built in sections (modules) within a factory setting and assembled onsite. This construction method allows for faster building timelines, superior quality control, and significant cost savings compared to traditional stick-built homes.</p>

  <p>Unlike manufactured or mobile homes, modular housing meets the same building codes and standards as site-built homes. The key difference lies in where and how they're constructed—in a controlled factory environment rather than entirely onsite.</p>

  <h2>Benefits of Modular Housing in Canada</h2>

  <h3>Speed of Construction</h3>
  <p>Modular homes can be built 30%-50% faster than conventional housing because weather delays are minimized and construction moves efficiently from factory to site.</p>

  <ul>
    <li><strong>Factory production continues year-round</strong>: Canadian winters don't halt construction</li>
    <li><strong>Parallel workflows</strong>: Site preparation happens simultaneously with module construction</li>
    <li><strong>Rapid assembly</strong>: Modules can be installed and connected in days rather than months</li>
  </ul>

  <div class="bg-blue-50 p-6 rounded-lg my-6">
    <p class="font-semibold text-blue-900">🏗️ Real-World Impact:</p>
    <p class="text-blue-900">A typical modular home project in BC can go from approval to occupancy in 6-8 months, compared to 12-18 months for traditional construction.</p>
  </div>

  <h3>Cost Savings</h3>
  <p>Factory production reduces labor costs and material waste, making modular homes more affordable for families and developers.</p>

  <ul>
    <li><strong>Bulk purchasing</strong>: Factories buy materials at volume discounts</li>
    <li><strong>Reduced waste</strong>: Precise cutting and efficient use of materials minimize scrap</li>
    <li><strong>Lower labor costs</strong>: Factory workers are more efficient than onsite crews</li>
    <li><strong>Predictable budgets</strong>: Fixed factory costs eliminate weather-related delays and overruns</li>
  </ul>

  <p>These savings translate to 10-20% lower costs compared to traditional construction, making homeownership accessible to more Canadian families.</p>

  <h3>Sustainability</h3>
  <p>Modular housing is inherently greener. Factories employ energy-efficient manufacturing techniques and optimize the use of materials, leading to less waste and lower carbon footprints.</p>

  <h4>Environmental Benefits Include:</h4>
  <ul>
    <li><strong>Up to 90% less construction waste</strong>: Factory precision means minimal scrap material</li>
    <li><strong>Energy efficiency</strong>: Modules are built in climate-controlled environments ensuring proper insulation installation</li>
    <li><strong>Reduced site disturbance</strong>: Faster assembly means less impact on surrounding environment</li>
    <li><strong>Reusable materials</strong>: Factory settings enable better material recovery and recycling</li>
    <li><strong>Lower carbon emissions</strong>: Reduced transport needs and efficient production processes</li>
  </ul>

  <h3>Consistent Quality</h3>
  <p>Rigorous factory standards ensure every module meets or exceeds building codes, resulting in durable and reliable homes.</p>

  <p>Factory construction advantages include:</p>
  <ul>
    <li>Protected from weather during critical construction phases</li>
    <li>Multiple quality inspections at each stage</li>
    <li>Standardized processes reducing human error</li>
    <li>Professional oversight and specialized equipment</li>
  </ul>

  <h3>Flexibility and Adaptability</h3>
  <p>Modular designs can be customized for various needs—single-family dwellings, apartments, supportive housing, or community spaces.</p>

  <p>Applications include:</p>
  <ul>
    <li>Single-family homes</li>
    <li>Multi-unit residential buildings</li>
    <li>Supportive housing for vulnerable populations</li>
    <li>Student housing</li>
    <li>Emergency and disaster relief housing</li>
    <li>Senior living facilities</li>
  </ul>

  <h2>Successful Modular Housing Projects Across Canada</h2>

  <p>Canadian cities are embracing modular construction to address housing challenges. Here are some notable examples:</p>

  <h3>Vancouver's Modular Housing Initiative</h3>
  <p>Hundreds of new homes for people experiencing homelessness have been built quickly and cost-effectively, with supportive community features.</p>

  <p>The city has deployed modular supportive housing buildings across multiple neighborhoods, each featuring:</p>
  <ul>
    <li>Self-contained studio units with private bathrooms and kitchenettes</li>
    <li>On-site support services and community spaces</li>
    <li>Construction completed in 3-4 months per building</li>
    <li>Cost savings of approximately 30% compared to conventional construction</li>
  </ul>

  <h3>Toronto & Calgary Pilot Projects</h3>
  <p>These cities have implemented modular housing to provide safe, affordable options for families and vulnerable populations.</p>

  <p>Toronto's modular housing program includes:</p>
  <ul>
    <li>Multi-story affordable rental buildings</li>
    <li>Family-sized units (2-3 bedrooms)</li>
    <li>Mixed-income communities</li>
    <li>Integrated childcare and community facilities</li>
  </ul>

  <h3>Anhart's Modular Projects</h3>
  <p>Organizations like <a href="https://anhart.ca" class="text-primary hover:underline font-semibold">Anhart</a> are pioneering modular housing solutions in British Columbia:</p>

  <ul>
    <li><strong>Merritt Townhomes</strong>: Rapid deployment of permanent housing following the 2021 floods</li>
    <li><strong>Supportive Housing Initiatives</strong>: Factory-built modules providing stable homes for vulnerable populations</li>
    <li><strong>Family Housing Developments</strong>: Affordable, quality homes for working families</li>
  </ul>

  <p>Read more about <a href="/portfolio" class="text-primary hover:underline font-semibold">affordable housing projects</a> and <a href="/blog/how-to-apply-affordable-housing-bc" class="text-primary hover:underline font-semibold">application guides</a> at <a href="https://anhart.ca" class="text-primary hover:underline font-semibold">Anhart.ca</a>.</p>

  <h2>Challenges & Considerations</h2>

  <p>While modular housing offers many advantages, some challenges must be addressed:</p>

  <h3>Zoning and Building Codes</h3>
  <p>Navigating local regulations can be complex, though most communities now allow modular builds.</p>

  <p><strong>What's changing:</strong></p>
  <ul>
    <li>More municipalities updating zoning bylaws to accommodate modular construction</li>
    <li>National Building Code recognizing modular standards</li>
    <li>Streamlined approval processes in many regions</li>
  </ul>

  <h3>Financing</h3>
  <p>Some lenders may be unfamiliar with modular construction, but options are expanding rapidly.</p>

  <p><strong>Improvements include:</strong></p>
  <ul>
    <li>Major banks now offering standard mortgages for modular homes</li>
    <li>CMHC supporting modular housing initiatives</li>
    <li>Government programs recognizing modular as equivalent to site-built</li>
  </ul>

  <h3>Perceptions</h3>
  <p>Modular homes are sometimes mistaken for temporary or "lesser" housing, but modern prefab buildings are high-quality, permanent solutions.</p>

  <p><strong>The reality:</strong></p>
  <ul>
    <li>Modular homes are permanent structures on foundations</li>
    <li>They meet or exceed all building codes</li>
    <li>Resale values are comparable to site-built homes</li>
    <li>Modern designs are indistinguishable from conventional homes</li>
  </ul>

  <h3>Transportation and Site Requirements</h3>
  <p>Delivering large modules requires careful planning:</p>
  <ul>
    <li>Road access for large trucks and cranes</li>
    <li>Site preparation must be completed before module delivery</li>
    <li>Coordination between factory production and site readiness</li>
  </ul>

  <h2>How to Apply for Modular Housing in Canada</h2>

  <p>If you're considering modular housing, start by:</p>

  <h3>1. Research Available Options</h3>
  <p>Browse resources like <a href="https://anhart.ca" class="text-primary hover:underline font-semibold">Anhart.ca's affordable housing information</a> to see what modular projects are available in your area.</p>

  <h3>2. Check Local Programs</h3>
  <p>Check local city and provincial housing authorities for modular projects. Many municipalities have specific affordable modular housing initiatives.</p>

  <h3>3. Review Application Guides</h3>
  <p>Review guides such as <a href="/blog/how-to-apply-affordable-housing-bc" class="text-primary hover:underline font-semibold">How to Apply for Affordable Housing in BC</a> for clear, step-by-step instructions on the application process.</p>

  <h3>4. Determine Your Eligibility</h3>
  <p>Most affordable modular housing programs require:</p>
  <ul>
    <li>Canadian citizenship or permanent residency</li>
    <li>Income within specified limits</li>
    <li>BC residency (for provincial programs)</li>
    <li>Meeting specific criteria (family status, age, etc.)</li>
  </ul>

  <h3>5. Gather Required Documents</h3>
  <p>Typical documentation includes:</p>
  <ul>
    <li>Government-issued photo ID</li>
    <li>Proof of income (pay stubs, tax returns)</li>
    <li>References</li>
    <li>Proof of current residence</li>
  </ul>

  <div class="bg-green-50 p-6 rounded-lg my-6">
    <h3 class="text-green-900">✅ Ready to Explore Modular Housing?</h3>
    <p class="text-green-900">Visit <a href="https://anhart.ca" class="text-green-900 hover:underline font-semibold">Anhart.ca</a> to learn about available modular housing projects and how to apply.</p>
    <a href="/portfolio" class="text-green-900 hover:underline font-semibold">View Our Projects →</a>
  </div>

  <h2>The Future of Modular Housing in Canada</h2>

  <p>As Canada continues to face housing affordability challenges, modular construction is positioned to play an increasingly important role:</p>

  <h3>Government Support</h3>
  <ul>
    <li>Federal funding for innovative housing solutions</li>
    <li>Provincial programs encouraging modular construction</li>
    <li>Municipal fast-tracking of modular projects</li>
  </ul>

  <h3>Technological Advances</h3>
  <ul>
    <li>Improved manufacturing techniques</li>
    <li>Better materials and finishes</li>
    <li>Integration of smart home technology</li>
    <li>Enhanced energy efficiency standards</li>
  </ul>

  <h3>Industry Growth</h3>
  <ul>
    <li>More Canadian manufacturers entering the market</li>
    <li>Increased capacity for larger projects</li>
    <li>Greater variety of designs and options</li>
    <li>Improved supply chains and delivery systems</li>
  </ul>

  <h2>Conclusion</h2>

  <p>Modular housing is shaping the future of affordability, sustainability, and innovation in Canada's housing market. Whether you're a developer, homeowner, or advocate, modular construction opens new doors for communities everywhere.</p>

  <p>The benefits are clear:</p>
  <ul>
    <li><strong>Faster construction</strong> means families get housed sooner</li>
    <li><strong>Lower costs</strong> make homeownership more accessible</li>
    <li><strong>Better quality</strong> ensures long-lasting, comfortable homes</li>
    <li><strong>Sustainability</strong> protects our environment for future generations</li>
    <li><strong>Flexibility</strong> addresses diverse housing needs across Canada</li>
  </ul>

  <p>As technology improves and more Canadians recognize the value of modular construction, this innovative approach will continue transforming how we think about and build affordable housing.</p>

  <div class="bg-primary/10 p-6 rounded-lg mt-8">
    <h3 class="text-primary">Ready to Explore Modular Housing?</h3>
    <p>Visit <a href="https://anhart.ca" class="text-primary hover:underline font-semibold">Anhart.ca</a> for resources, guides, and opportunities to apply for affordable modular homes in Canada.</p>
    <a href="/portfolio" class="text-primary hover:underline font-semibold">View Our Portfolio →</a>
    <br />
    <a href="/contact" class="text-primary hover:underline font-semibold">Contact Us →</a>
    <br />
    <a href="/blog/how-to-apply-affordable-housing-bc" class="text-primary hover:underline font-semibold">Application Guide →</a>
  </div>

  <p class="text-sm text-muted-foreground mt-8"><em>Information current as of January 2025. Modular housing options and availability vary by region. Contact local housing authorities or visit Anhart.ca for current opportunities.</em></p>
</article>
    `,
  },
];

// Sort posts by date (newest first)
export const getSortedPosts = async (): Promise<BlogPost[]> => {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .order("publish_date", { ascending: false });

  if (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }

  return (data || []).map(transformDbPost);
};

// Get featured posts (max 3)
export const getFeaturedPosts = async (): Promise<BlogPost[]> => {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .eq("is_featured", true)
    .order("publish_date", { ascending: false })
    .limit(3);

  if (error) {
    console.error("Error fetching featured blog posts:", error);
    return [];
  }

  return (data || []).map(transformDbPost);
};

// Get post by slug
export const getPostBySlug = async (slug: string): Promise<BlogPost | undefined> => {
  console.log("Fetching blog post with slug:", slug);
  
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  console.log("Supabase query result - error:", error);
  console.log("Supabase query result - data:", data);

  if (error) {
    console.error("Error fetching blog post:", error);
    return undefined;
  }

  if (!data) {
    console.log("No blog post found with slug:", slug);
    
    // Fallback to static blog data
    const staticPost = blogPosts.find(p => p.slug === slug);
    if (staticPost) {
      console.log("Found in static data:", staticPost.title);
      return staticPost;
    }
    
    return undefined;
  }

  console.log("Blog post fetched successfully:", data.title);
  return transformDbPost(data);
};

// Get related posts (by category)
export const getRelatedPosts = async (
  currentPost: BlogPost,
  limit: number = 2
): Promise<BlogPost[]> => {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("category", currentPost.category)
    .eq("is_published", true)
    .neq("id", currentPost.id)
    .limit(limit);

  if (error) {
    console.error("Error fetching related posts:", error);
    return [];
  }

  return (data || []).map(transformDbPost);
};
