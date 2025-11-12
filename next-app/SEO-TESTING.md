# SEO Testing Guide for Anhart Affordable Housing Blog

## Overview
This guide explains how to verify that Google can properly crawl and index your blog posts with all the SEO improvements implemented.

## What Was Fixed

### 1. **Server-Side Rendering (SSR) Metadata** ✓
- **Before**: All blog posts had static title "Blog" with same description
- **After**: Each post has unique title, description, keywords, and Open Graph tags
- **Location**: `next-app/src/app/blog/[slug]/page.tsx` - `generateMetadata()` function

### 2. **JSON-LD Structured Data** ✓
- **What**: Article schema with headline, author, publisher, dates, keywords
- **Why**: Helps Google show rich snippets in search results (e.g., author, publish date, reading time)
- **Location**: `next-app/src/components/BlogPost.tsx` - `<script type="application/ld+json">`

### 3. **Semantic HTML Structure** ✓
- **H1**: Blog post title (only one H1 per page)
- **H2**: Main section headings
- **H3**: Sub-section headings
- **Verified**: All 3 existing blog posts have proper heading hierarchy

### 4. **Admin Dashboard SEO Guidance** ✓
- Blue info panel at top of editor with best practices
- Reminds admins to use H2/H3 properly, not H1
- Encourages keyword usage and meta description optimization

## How to Test SEO (Google Search Console)

### Step 1: Submit Sitemap
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property: `https://anhart.ca`
3. Navigate to **Sitemaps** in left sidebar
4. Submit sitemap URL: `https://anhart.ca/sitemap.xml`

### Step 2: Request Indexing for Blog Posts
1. In Google Search Console, go to **URL Inspection**
2. Enter blog post URL: `https://anhart.ca/blog/why-affordable-housing-matters-vancouver`
3. Click "Request Indexing"
4. Repeat for all blog posts:
   - `/blog/modular-housing-canada-innovative-solution`
   - `/blog/understanding-housing-subsidies-qualifying-bc`
   - Any new posts you create

### Step 3: Verify Metadata (Rich Results Test)
1. Go to [Rich Results Test](https://search.google.com/test/rich-results)
2. Enter blog post URL
3. Check for:
   - ✓ Article schema detected
   - ✓ Headline, image, author, datePublished visible
   - ✓ No errors or warnings

### Step 4: Check Crawlability (Mobile-Friendly Test)
1. Go to [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
2. Enter blog post URL
3. Verify page loads correctly
4. Check "View tested page" screenshot to see if content renders properly

### Step 5: Monitor Performance (Search Console)
After 1-2 weeks:
1. Go to **Performance** in Google Search Console
2. Filter by page: `/blog/*`
3. Check metrics:
   - **Impressions**: How often your posts appear in search
   - **Clicks**: How many people click to read
   - **Average position**: Where you rank for keywords
   - **CTR**: Click-through rate

## Testing with Browser Developer Tools

### View Page Metadata (Immediate Test)
1. Open any blog post: https://anhart.ca/blog/why-affordable-housing-matters-vancouver
2. Right-click → **View Page Source**
3. Look for `<head>` section - you should see:
   ```html
   <title>Why Affordable Housing Matters: Building Inclusive Communities in Vancouver | Anhart</title>
   <meta name="description" content="Discover the social, economic, and health benefits...">
   <meta name="keywords" content="affordable housing Vancouver, inclusive communities...">
   <meta property="og:title" content="...">
   <meta property="og:description" content="...">
   <meta property="og:image" content="...">
   ```

### View JSON-LD Structured Data
1. View page source
2. Search for `application/ld+json`
3. You should see:
   ```json
   {
     "@context": "https://schema.org",
     "@type": "Article",
     "headline": "Why Affordable Housing Matters...",
     "author": {...},
     "publisher": {...},
     "datePublished": "...",
     "keywords": "..."
   }
   ```

## What Google Bots See Now

### Before (❌ Bad for SEO)
```html
<head>
  <title>Blog</title>
  <meta name="description" content="Blog page - Access and manage your content">
  <!-- No keywords, no Open Graph, no structured data -->
</head>
```

### After (✓ Good for SEO)
```html
<head>
  <title>Why Affordable Housing Matters: Building Inclusive Communities in Vancouver | Anhart</title>
  <meta name="description" content="Discover the social, economic, and health benefits of affordable housing in Vancouver...">
  <meta name="keywords" content="affordable housing Vancouver, inclusive communities, housing solutions...">
  
  <!-- Open Graph for social sharing -->
  <meta property="og:title" content="...">
  <meta property="og:description" content="...">
  <meta property="og:image" content="...">
  <meta property="og:type" content="article">
  
  <!-- Twitter cards -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="...">
  
  <!-- JSON-LD structured data -->
  <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"Article",...}
  </script>
</head>

<body>
  <!-- Proper semantic HTML -->
  <h1>Why Affordable Housing Matters: Building Inclusive Communities in Vancouver</h1>
  <h2>The Housing Challenge in Vancouver</h2>
  <h3>Rising Costs and Displacement</h3>
  ...
</body>
```

## Keywords Being Targeted

Based on meta tags and content analysis, your blog posts target:
- `affordable housing Vancouver`
- `inclusive communities`
- `housing solutions Canada`
- `modular housing Canada`
- `housing subsidies BC`
- `supportive housing`
- `community development`

## Expected Timeline
- **24-48 hours**: Google discovers new pages (if sitemap submitted)
- **1-2 weeks**: Pages indexed and appear in search results
- **2-4 weeks**: Rankings stabilize based on content quality and backlinks
- **1-3 months**: Full SEO impact visible in Google Search Console

## Troubleshooting

### Issue: Page not indexed after 1 week
**Solution**: 
1. Check robots.txt doesn't block `/blog/`
2. Ensure sitemap.xml includes blog URLs
3. Request indexing manually in Search Console

### Issue: No rich snippets showing
**Solution**:
1. Test with Rich Results Test tool
2. Verify JSON-LD is valid (no syntax errors)
3. Wait 2-3 weeks for Google to process

### Issue: Keywords not ranking
**Solution**:
1. Check keyword competition (use Google Keyword Planner)
2. Build backlinks from other sites
3. Share blog posts on social media
4. Ensure content is high-quality and comprehensive (1000+ words)

## Ongoing Maintenance

When creating new blog posts:
1. ✓ Use H2 and H3 headings (not H1)
2. ✓ Include target keywords in headings
3. ✓ Write 150-160 character meta description
4. ✓ Add meaningful subtitle
5. ✓ Choose relevant category
6. ✓ Request indexing in Google Search Console
7. ✓ Share on social media (Twitter, LinkedIn)

The SEO guidance panel in the admin dashboard will remind you of these best practices!
