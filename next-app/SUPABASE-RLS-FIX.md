# Critical: Fix Supabase RLS Policy for Blog Posts

## Issue

Your blog posts are in the Supabase database, but the Row Level Security (RLS) policy is preventing anonymous reads. This causes:

1. ❌ **Server-side metadata generation fails** - Google can't see proper SEO metadata
2. ❌ **Blog posts return 404** on server-side rendering
3. ✅ Client-side fallback works (uses static data), but this doesn't help Google crawlers

## Current Situation

- **Blog posts inserted**: ✅ All 5 blog posts are in Supabase
- **RLS enabled**: ✅ Row Level Security is active
- **RLS policy problem**: ❌ Policy uses `{public}` role instead of `anon` role
- **Result**: Anonymous requests from server-side code are blocked

## What You Need to Fix

You need to update the RLS policy in your Supabase dashboard to allow anonymous reads.

### Step 1: Access Supabase Dashboard

1. Go to https://supabase.com/dashboard
2. Select your project: `hxqbbyglhubcgfkbqltu`
3. Navigate to **Authentication** → **Policies** (left sidebar)
4. Find the `blog_posts` table

### Step 2: Update RLS Policy

**Option A: Using Supabase Dashboard UI**

1. Find the policy named "Public can read published posts" (or similar)
2. Click "Edit Policy"
3. Change the **Roles** from `public` to `anon, authenticated`
4. Save the policy

**Option B: Using SQL Editor**

1. Go to **SQL Editor** in Supabase dashboard
2. Run this SQL:

```sql
-- Drop the old policy
DROP POLICY IF EXISTS "Public can read published posts" ON blog_posts;

-- Create new policy that allows anonymous reads
CREATE POLICY "Allow anonymous and authenticated users to read published posts" 
ON blog_posts 
FOR SELECT 
TO anon, authenticated 
USING (is_published = true);
```

3. Click "Run" to execute the SQL

### Step 3: Verify the Fix

After updating the policy, test your blog posts:

1. Visit: https://anhart.ca/blog/modular-housing-canada-innovative-solution
2. Check that the page loads without errors
3. View page source and verify SEO metadata is present:
   - `<title>` tag should have the full blog post title
   - `<meta name="description">` should have blog post excerpt
   - `<meta property="og:...">` tags should be present
   - `<script type="application/ld+json">` with Article schema should be present

### Step 4: Test with SEO Simulator

Use https://to-the-web.com/training_center/tools/search-engine-simulator/ to verify Google can crawl your blog posts:

1. Enter URL: https://anhart.ca/blog/modular-housing-canada-innovative-solution
2. Click "Run Simulation"
3. Verify:
   - Title shows: "Modular Housing in Canada: An Innovative Solution..."
   - Description shows full meta description
   - H1 and H2 headings are detected
   - Keywords are listed

## Why This Happened

In Supabase, anonymous requests (like server-side Next.js data fetching) use the `anon` role, NOT the `public` role. The RLS policy was created with `{public}` role, which doesn't grant access to anonymous requests.

## Alternative: Service Role Key (Not Recommended for This Use Case)

You could use the Supabase service role key for server-side fetches, but this is NOT recommended for public blog posts because:
- Service role bypasses ALL RLS policies (security risk if misused)
- Anonymous reads for public content should work with proper RLS policies

## Impact on SEO

**Before Fix:**
- ❌ Google sees generic 404 title: "Blog Post Not Found | Anhart"
- ❌ No blog post content in HTML for crawlers
- ❌ No structured data (JSON-LD)
- ❌ No social media preview tags

**After Fix:**
- ✅ Google sees full blog post title and description
- ✅ Complete HTML content for indexing
- ✅ Article structured data for rich snippets
- ✅ Open Graph and Twitter cards for social sharing
- ✅ Proper keywords for search ranking

## Need Help?

If you encounter issues:

1. Check Supabase logs: https://supabase.com/dashboard/project/hxqbbyglhubcgfkbqltu/logs
2. Verify your project URL and API key are correct in `.env`:
   - `NEXT_PUBLIC_SUPABASE_URL=https://hxqbbyglhubcgfkbqltu.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...` (your anon key)
3. Test the Supabase connection with a simple query in the SQL editor

## Summary

**What to do**: Update the RLS policy in Supabase dashboard to use `anon, authenticated` roles instead of `public`.

**Why**: This allows server-side Next.js code to fetch blog posts for SEO metadata generation.

**Impact**: After this fix, Google will be able to properly crawl and index all your blog posts with full SEO metadata.
