#!/usr/bin/env node

/**
 * Blog Post Migration Script
 * 
 * Migrates blog posts from src/data/blog.ts to Supabase database
 * Usage: node scripts/migrate-blog-posts.mjs [--dry-run]
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDryRun = process.argv.includes('--dry-run');

const envPath = path.join(__dirname, '../.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const trimmedLine = line.trim();
  if (trimmedLine && !trimmedLine.startsWith('#')) {
    const [key, ...valueParts] = trimmedLine.split('=');
    if (key && valueParts.length > 0) {
      const value = valueParts.join('=').replace(/^["']|["']$/g, '');
      envVars[key.trim()] = value.trim();
    }
  }
});

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Loaded environment:');
console.log(`  URL: ${supabaseUrl ? '✓ Found' : '✗ Missing'}`);
console.log(`  Key: ${supabaseKey ? '✓ Found' : '✗ Missing'}\n`);

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const imageMap = {
  'affordable-housing-community-vancouver.jpg': '/blog/affordable-housing-community-vancouver.jpg',
  'bc-housing-application-guide.jpg': '/blog/bc-housing-application-guide.jpg',
  'bc-community-impact.jpg': '/blog/bc-community-impact.jpg',
  'anhart-success-stories.jpg': '/blog/anhart-success-stories.jpg',
  'housing-subsidies-bc.jpg': '/blog/housing-subsidies-bc.jpg',
  'housing-subsidies-hero.jpg': '/blog/housing-subsidies-hero.jpg',
  'modular-housing-canada.jpg': '/blog/modular-housing-canada.jpg',
};

function getFeaturedImagePath(imageFileName) {
  if (typeof imageFileName === 'string') {
    return imageMap[imageFileName] || imageFileName;
  }
  for (const [key, value] of Object.entries(imageMap)) {
    if (imageFileName === key || JSON.stringify(imageFileName).includes(key)) {
      return value;
    }
  }
  return '/blog/default.jpg';
}

const blogPosts = [
  {
    slug: 'why-affordable-housing-matters-vancouver',
    title: 'Why Affordable Housing Matters: Building Inclusive Communities in Vancouver',
    excerpt: 'Explore how affordable housing creates thriving, diverse communities in Vancouver, with insights into the social, economic, and health benefits that impact everyone.',
    featured_image: '/blog/affordable-housing-community-vancouver.jpg',
    author_name: 'Anhart Team',
    publish_date: '2025-10-01',
    category: 'Community Impact',
    tags: ['affordable housing', 'Vancouver', 'inclusive communities', 'housing solutions', 'community development'],
    reading_time: 8,
    meta_title: 'Why Affordable Housing Matters: Building Inclusive Communities in Vancouver | Anhart',
    meta_description: 'Discover the social, economic, and health benefits of affordable housing in Vancouver. Learn how inclusive communities strengthen neighborhoods and support families.',
    keywords: ['affordable housing Vancouver', 'inclusive communities', 'housing solutions', 'community development Vancouver', 'social housing benefits', 'Vancouver housing crisis', 'diverse neighborhoods'],
    is_published: true,
    content: `<article class="prose prose-lg max-w-4xl mx-auto">
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
    <li><strong>Innovative solutions</strong>: Exploring modular construction, co-housing, and adaptive reuse</li>
    <li><strong>Long-term commitment</strong>: Sustained government and community investment</li>
  </ul>

  <h2>How Anhart is Contributing</h2>

  <p>At Anhart, we're committed to creating affordable housing solutions that strengthen communities across British Columbia. Our projects include:</p>

  <ul>
    <li><strong>The Ryder (Mount Pleasant)</strong>: 45 affordable rental units with community amenities</li>
    <li><strong>1060 Howe (Downtown Vancouver)</strong>: Mixed-income housing in the heart of the city</li>
    <li><strong>Merritt Townhomes</strong>: Family-oriented affordable housing in the Interior</li>
    <li><strong>Supportive Housing Initiatives</strong>: Projects providing housing with integrated support services</li>
  </ul>

  <p>Explore our <a href="/portfolio" class="text-primary hover:underline font-semibold">full portfolio</a> of affordable housing projects across BC.</p>

  <h2>Get Involved</h2>

  <p>Building inclusive communities requires collaboration. Here's how you can participate:</p>

  <ul>
    <li><strong>Apply for Housing</strong>: Check out our <a href="/blog/how-to-apply-affordable-housing-bc" class="text-primary hover:underline font-semibold">application guide</a></li>
    <li><strong>Support Affordable Housing</strong>: Advocate for policies that promote housing accessibility</li>
    <li><strong>Partner with Us</strong>: Learn about <a href="/limited-partnership" class="text-primary hover:underline font-semibold">partnership opportunities</a></li>
    <li><strong>Stay Informed</strong>: Subscribe to our newsletter for updates on new projects and housing resources</li>
  </ul>

  <h2>Conclusion</h2>

  <p>Affordable housing is more than just providing shelter—it's about creating the foundation for thriving, inclusive communities where everyone has the opportunity to succeed. The social, economic, and health benefits extend far beyond individual households, strengthening the entire fabric of our neighborhoods.</p>

  <p>As Vancouver continues to grow, ensuring access to safe, affordable housing must remain a top priority. Together, through collaboration, innovation, and commitment, we can build communities where everyone belongs.</p>

  <div class="bg-primary/10 p-6 rounded-lg mt-8">
    <h3 class="text-primary">Learn More About Affordable Housing</h3>
    <p>Explore Anhart's affordable housing projects and resources:</p>
    <a href="/portfolio" class="text-primary hover:underline font-semibold">View Our Portfolio →</a>
    <br />
    <a href="/blog/how-to-apply-affordable-housing-bc" class="text-primary hover:underline font-semibold">Application Guide →</a>
    <br />
    <a href="https://anhart.ca" class="text-primary hover:underline font-semibold">Visit Anhart.ca →</a>
  </div>

  <p class="text-sm text-muted-foreground mt-8"><em>Information current as of January 2025. Housing availability and programs may vary.</em></p>
</article>`
  },
];

async function migrateBlogPosts() {
  console.log('🚀 Starting blog post migration...\n');
  console.log(`Mode: ${isDryRun ? 'DRY RUN (no changes will be made)' : 'LIVE (will update database)'}\n`);

  const results = {
    success: 0,
    failed: 0,
    skipped: 0,
  };

  for (const post of blogPosts) {
    try {
      console.log(`📝 Processing: ${post.title}`);
      
      if (isDryRun) {
        console.log(`   ✓ Would upsert post with slug: ${post.slug}`);
        console.log(`   Content length: ${post.content.length} characters`);
        console.log(`   Tags: ${post.tags.join(', ')}`);
        console.log(`   Featured image: ${post.featured_image}\n`);
        results.skipped++;
        continue;
      }

      const { data, error } = await supabase
        .from('blog_posts')
        .upsert(
          {
            slug: post.slug,
            title: post.title,
            excerpt: post.excerpt,
            content: post.content,
            featured_image: post.featured_image,
            author_name: post.author_name,
            author_avatar: null,
            publish_date: post.publish_date,
            category: post.category,
            tags: post.tags,
            reading_time: post.reading_time,
            meta_title: post.meta_title,
            meta_description: post.meta_description,
            keywords: post.keywords,
            is_published: post.is_published || true,
          },
          {
            onConflict: 'slug',
            ignoreDuplicates: false,
          }
        )
        .select();

      if (error) {
        console.error(`   ❌ Error: ${error.message}\n`);
        results.failed++;
      } else {
        console.log(`   ✅ Successfully upserted (ID: ${data[0]?.id})`);
        console.log(`   Content length: ${post.content.length} characters\n`);
        results.success++;
      }
    } catch (err) {
      console.error(`   ❌ Exception: ${err.message}\n`);
      results.failed++;
    }
  }

  console.log('\n📊 Migration Results:');
  console.log(`   ✅ Success: ${results.success}`);
  console.log(`   ❌ Failed: ${results.failed}`);
  console.log(`   ⏭️  Skipped: ${results.skipped}`);
  console.log('\n✨ Migration complete!');
}

migrateBlogPosts().catch(console.error);
