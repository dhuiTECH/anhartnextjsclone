# Anhart Affordable Housing - Next.js Application

## Overview
This is a Next.js web application for Anhart Affordable Housing, showcasing their mission, portfolio, and partnerships in affordable housing development across British Columbia.

## Recent Changes (November 12, 2025)
- **Vercel Deployment Preparation** ✅ COMPLETE
  - Converted all 116 AVIF images to WebP format for Vercel compatibility
  - Updated registry.ts to use .webp imports instead of .avif (120 imports updated)
  - Removed AVIF files (Vercel doesn't support AVIF in build process)
  - Installed all required dependencies: @tiptap/extension-code-block-lowlight, lowlight, highlight.js, @supabase/ssr
  - Updated eslint to latest version and removed deprecated eslint config from next.config.js
  - Verified local build succeeds with WebP images (builds in 15.4s)
  - Development server running without warnings
  - All images render correctly with WebP format
  - **Ready for Vercel deployment** - commit and push to deploy

## Earlier Changes (November 12, 2025)
- **Admin Dashboard Blog Editor Enhancements**
  - Added subtitle/subhead input field to blog post form (optional field for desk/subhead)
  - Installed TipTap CodeBlockLowlight extension with syntax highlighting for HTML, CSS, JavaScript, and TypeScript
  - Added `</> Code` button to formatting toolbar for inserting HTML code blocks
  - Added `subtitle` column to `blog_posts` database table
  - Updated blog post display to show subtitle below title (italic, light font weight)
  - Added dark-theme code block styling in both editor (#282c34 background) and blog display
  - Code blocks support syntax highlighting for multiple languages
  - Inline code styled with light gray background and pink text color
  - Fixed TipTap plugin duplication error by excluding default CodeBlock from StarterKit (prevents conflict with CodeBlockLowlight)

- **Toast Notification System**
  - Fixed toast auto-dismiss delay from 1,000,000ms (16+ minutes) to 5,000ms (5 seconds)
  - Added Toaster component to app providers for app-wide toast notification support
  - Added explicit 5-second duration prop to ToastProvider in toaster.tsx
  - Toast notifications now properly display and auto-dismiss for all form submissions
  - All forms (Contact Us, Partner With Us, Impact Investing, Newsletter) show success/error toasts
  - Toasts styled with theme colors (bg-background, bg-destructive) matching site design

- **Limited Partnership Page Fix**
  - Fixed hero banner image rendering on `/limited-partnership` page
  - Extracted `.src` property from Next.js static import to resolve `[object Object]` error
  - Hero banner now displays handshake image with coral/pink gradient overlay correctly

## Recent Changes (November 11, 2025)
- **Admin Dashboard Enhancements**
  - Added comprehensive TipTap formatting toolbar with H1, H2, H3 heading controls
  - Added Bold, Italic, Bullet List, Ordered List, and Paragraph formatting buttons
  - Implemented publish date input field with proper database persistence
  - Added CSS styling for editor content (headings, paragraphs, lists, bold, italic, links)
  - Fixed date formatting to ensure compatibility with HTML date input (YYYY-MM-DD format)
  - Toolbar buttons highlight active formatting state for better UX

- **Blog Post Rendering Fixed**
  - Fixed blank content issue by adding static blog data fallback mechanism
  - Fixed Navigate component error by replacing with proper Next.js 404 handling
  - Added detailed error logging for Supabase queries
  - Enabled Row Level Security (RLS) on blog_posts table with policy for anonymous reads
  - Blog posts now render correctly with full content from static data while RLS is configured

- **Authentication System Fixed**
  - Migrated from mixed Supabase packages to unified `@supabase/ssr` for both client and server
  - Fixed cookie parsing errors by using consistent cookie format across all auth flows
  - Updated admin login to use `createBrowserClient` from `@supabase/ssr`
  - Updated admin and member dashboards to use `createServerClient` from `@supabase/ssr`
  - Fixed Next.js 15+ async cookies() API - properly await cookies() in server components
  - Added `immediatelyRender: false` to TipTap editor to fix SSR hydration mismatch
  - Login page uses router.refresh() to ensure cookies are synced after authentication
  - Admin and member portals now fully functional with proper authentication

- **Blog Database Setup & Content Migration**
  - Created `blog_posts` table in Supabase with complete schema (title, slug, content, images, SEO fields)
  - Copied blog images from `src/assets/blog/` to `public/blog/` for serving via Next.js
  - Blog images now accessible at `/blog/*.jpg` paths
  - Seeded 1 blog post: "Why Affordable Housing Matters: Building Inclusive Communities in Vancouver"
  - Remaining 4 blog posts from `src/data/blog.ts` can be added via admin dashboard edit interface
  - Migration script available at `scripts/migrate-blog-posts.mjs` for reference

- **Admin & Member Portal System**
  - Created complete admin dashboard with TipTap rich text editor for blog publishing at `/admin/dashboard`
  - Implemented secure admin login at `/admin/login` with Supabase authentication
  - Built member portal at `/member/dashboard` with file download capabilities  
  - Added role-based access control (RBAC) using Supabase profiles table
  - Installed TipTap editor dependencies (@tiptap/react, @tiptap/starter-kit, extensions)
  - Installed @supabase/ssr package for cookie-based authentication
  - All portals use server-side rendering (SSR) with server/client component split pattern

- **Vercel to Replit Migration Completed**
  - Configured Next.js development server to run on port 5000 with host 0.0.0.0
  - Fixed Google Analytics component to use Next.js environment variable syntax (process.env.NEXT_PUBLIC_GA_TRACKING_ID)
  - Installed Node.js 20 runtime
  - Configured development workflow
  - Configured production deployment settings (autoscale)

- **Image and Media Fixes**
  - Fixed all "[object Object]" errors by extracting `.src` property from Next.js static import objects
  - Fixed HeroBanner and OptimizedImage component TypeScript interfaces to accept proper props
  - Fixed hero banner images on `/media` and `/limited-partnership` pages
  - Fixed promotional video playback by renaming video file to `promotional-video.mp4`
  - Fixed video thumbnail to extract `.src` from Next.js static import
  - Updated components: Footer, Hero, About, GlobalPartners, ClientCarousel, OurFocusSection, ProjectModal, ProjectGalleryModal, PDFViewer, HeroBanner, OptimizedImage
  - Created `getImageSrc()` helper function for consistent image path handling
  - All images and videos now render correctly across all pages

## Project Architecture
- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 18 with TypeScript
- **Component Library**: Radix UI + shadcn/ui
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Replit Autoscale

### Directory Structure
```
next-app/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── admin/        # Admin portal (login, dashboard with blog editor)
│   │   ├── member/       # Member portal (dashboard with file downloads)
│   │   └── ...           # Public pages (home, about, contact, partner)
│   ├── components/       # React components
│   ├── assets/           # Images and media files
│   ├── integrations/     # Third-party integrations (Supabase)
│   ├── lib/              # Utility libraries (Supabase client re-export)
│   └── services/         # Business logic services
├── public/               # Static assets
├── update-blogs.js       # Script to update blog post content
└── scripts/              # Utility scripts
```

## Environment Variables

**IMPORTANT SECURITY NOTE**: 
The `.env` file in the `next-app/` directory contains Supabase credentials that should NOT be committed to version control. For production deployments:

1. **Remove `.env` from git tracking**: The `.env` file is now in `.gitignore` to prevent future commits
2. **Rotate exposed credentials**: The Supabase keys in the current `.env` should be considered exposed and rotated
3. **Use Replit Secrets**: Set environment variables in Replit's Secrets manager instead of committing them to the repository

### Required Environment Variables:
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anonymous/public key (standard Supabase naming)
- `NEXT_PUBLIC_SUPABASE_PROJECT_ID`: Supabase project identifier
- `NEXT_PUBLIC_GA_TRACKING_ID`: Google Analytics tracking ID (optional)

### How to Set Environment Variables in Replit:
1. Open the "Secrets" tool in the Replit sidebar (🔒 icon)
2. Add each environment variable with its corresponding value
3. Replit will automatically inject these into your application at runtime
4. Delete the local `.env` file after setting up Replit Secrets

## Development
- Run `npm install` to install dependencies
- Run `npm run dev` to start development server on port 5000
- Development server accessible at the Replit webview

### Admin & Member Portals
- **Admin Login**: `/admin/login` - Authenticate as admin (requires role='admin' in profiles table)
- **Admin Dashboard**: `/admin/dashboard` - Features:
  - Create new blog posts with TipTap rich text editor
  - Edit existing blog posts (dropdown selector loads posts for editing)
  - Comprehensive formatting toolbar: H1, H2, H3 headings, Bold, Italic, Lists, Paragraphs
  - Publish date input field (defaults to today for new posts)
  - Toggle between "New Post" and "Edit" modes
  - Auto-saves to `blog_posts` table in Supabase (including publish_date field)
  - Categories: Housing Resources, Community Impact, Housing Innovation, Insights, News, Updates, Community
- **Member Dashboard**: `/member/dashboard` - View and download files from `member-files` storage bucket
- **Blog Migration**: Script at `scripts/migrate-blog-posts.mjs` (dry-run mode works, live mode blocked by RLS policies)

### Database Requirements
The portals require these Supabase database tables:
- `profiles`: User profiles with `role` field ('admin' or 'member')
- `blog_posts`: Blog content with fields for title, slug, content, meta_description, category, etc.
- Storage bucket `member-files`: For storing member-accessible files

## Production Deployment
- Configured for Replit Autoscale deployment
- Build: `npm install && npm run build`
- Start: `npm run start` (runs on port 5000)

## Known Issues
- AVIF images show warnings in Turbopack (Next.js dev mode) - images still work but are not optimized
- These warnings are cosmetic and do not affect functionality
- Supabase client queries currently returning no data despite RLS policies being in place - static blog data fallback active
