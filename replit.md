# Anhart Affordable Housing - Next.js Application

## Overview
This is a Next.js web application for Anhart Affordable Housing, showcasing their mission, portfolio, and partnerships in affordable housing development across British Columbia.

## Recent Changes (November 11, 2025)
- **Authentication System Fixed**
  - Migrated from mixed Supabase packages to unified `@supabase/ssr` for both client and server
  - Fixed cookie parsing errors by using consistent cookie format across all auth flows
  - Updated admin login to use `createBrowserClient` from `@supabase/ssr`
  - Updated admin and member dashboards to use `createServerClient` from `@supabase/ssr`
  - Fixed Next.js 15+ async cookies() API - properly await cookies() in server components
  - Added `immediatelyRender: false` to TipTap editor to fix SSR hydration mismatch
  - Login page uses router.refresh() to ensure cookies are synced after authentication
  - Admin and member portals now fully functional with proper authentication

- **Blog Database Setup**
  - Created `blog_posts` table in Supabase with complete schema (title, slug, content, images, SEO fields)
  - Copied blog images from `src/assets/blog/` to `public/blog/` for serving via Next.js
  - Blog images now accessible at `/blog/*.jpg` paths
  - Database ready to receive blog content from admin dashboard or seeding scripts
  - Note: Legacy blog posts in `src/data/blog.ts` need to be migrated to database for display

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
- **Admin Dashboard**: `/admin/dashboard` - Rich text blog editor with TipTap, publishes to `blog_posts` table
- **Member Dashboard**: `/member/dashboard` - View and download files from `member-files` storage bucket
- **Blog Updates**: Run `node update-blogs.js` to update existing blog post content

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
