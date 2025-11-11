# Anhart Affordable Housing - Next.js Application

## Overview
This is a Next.js web application for Anhart Affordable Housing, showcasing their mission, portfolio, and partnerships in affordable housing development across British Columbia. The application includes public website pages, an admin portal for blog management with RBAC, and a member portal for protected file access.

## Recent Changes (November 11, 2025)

- **Pages Router Migration & Portal System** (LATEST)
  - Migrated from App Router to Pages Router architecture
  - Implemented admin portal with role-based access control (RBAC)
  - Integrated Tiptap rich text editor for blog post creation
  - Created member portal with protected file download functionality
  - Added SEO-optimized blog system with dynamic routing
  - Moved App Router files to backup (`src/app.backup/`)
  - Installed Tiptap packages: @tiptap/react, @tiptap/starter-kit, @tiptap/extension-link, @tiptap/extension-image

- **Vercel to Replit Migration Completed**
  - Configured Next.js development server to run on port 5000 with host 0.0.0.0
  - Fixed Supabase client configuration to use environment variables
  - Installed Node.js 20 runtime
  - Configured development workflow and production deployment settings (autoscale)

- **Image Path Fixes**
  - Fixed all "[object Object]" errors by extracting `.src` property from Next.js static import objects
  - Created `getImageSrc()` helper function for consistent image path handling
  - All images now render correctly across all pages

## Project Architecture
- **Framework**: Next.js 16 (Pages Router)
- **UI Library**: React 18 with TypeScript
- **Component Library**: Radix UI + shadcn/ui
- **Styling**: Tailwind CSS
- **Rich Text Editor**: Tiptap
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth with RBAC
- **Deployment**: Replit Autoscale

### Directory Structure
```
next-app/
├── pages/                # Next.js Pages Router
│   ├── _app.jsx          # App wrapper with providers
│   ├── _document.jsx     # HTML document structure
│   ├── index.jsx         # Home page
│   ├── about.jsx         # About page
│   ├── contact.jsx       # Contact page
│   ├── partner.jsx       # Partner page
│   ├── admin-login.jsx   # Admin login page
│   ├── admin/
│   │   └── dashboard.jsx # Admin dashboard with blog editor
│   ├── member/
│   │   └── dashboard.jsx # Member portal with file access
│   └── blog/
│       ├── index.jsx     # Blog list page
│       └── [slug].jsx    # Individual blog post page
├── lib/
│   └── supabase.js       # Supabase client configuration
├── src/
│   ├── components/       # React components
│   ├── assets/           # Images and media files
│   ├── integrations/     # Third-party integrations (Supabase)
│   ├── services/         # Business logic services
│   ├── globals.css       # Global styles
│   └── app.backup/       # Backup of old App Router files
├── public/               # Static assets
└── scripts/              # Utility scripts
```

## Features

### Public Website
- Home, About, Contact, and Partner pages
- Responsive design with Tailwind CSS
- Google Maps integration
- Newsletter subscription
- Contact forms with Supabase backend

### Admin Portal (`/admin-login`, `/admin/dashboard`)
- **Authentication**: Supabase Auth with email/password
- **RBAC**: Checks `profiles` table for `role = 'admin'`
- **Blog Editor**: Tiptap rich text editor with formatting tools
- **SEO Fields**: Title, meta description, featured image
- **Auto-slugification**: Generates URL-friendly slugs from titles
- **Direct Publishing**: Posts saved directly to Supabase `posts` table

### Member Portal (`/member/dashboard`)
- **Authentication**: Supabase Auth
- **File Access**: Protected file downloads from Supabase Storage
- **Storage Bucket**: `member-files` bucket for private documents

### Blog System (`/blog`, `/blog/[slug]`)
- **Dynamic Routing**: Individual post pages with SEO metadata
- **SEO Optimization**: OpenGraph tags, meta descriptions, canonical URLs
- **Featured Images**: Full-width header images
- **Published Filter**: Only shows `published = true` posts

## Environment Variables

**IMPORTANT SECURITY NOTE**: 
The `.env` file in the `next-app/` directory contains Supabase credentials that should NOT be committed to version control. For production deployments:

1. **Remove `.env` from git tracking**: The `.env` file is now in `.gitignore` to prevent future commits
2. **Rotate exposed credentials**: The Supabase keys in the current `.env` should be considered exposed and rotated
3. **Use Replit Secrets**: Set environment variables in Replit's Secrets manager instead of committing them to the repository

### Required Environment Variables:
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: Supabase anonymous/public key  
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

## Production Deployment
- Configured for Replit Autoscale deployment
- Build: `npm install && npm run build`
- Start: `npm run start` (runs on port 5000)

## Known Issues
- AVIF images show warnings in Turbopack (Next.js dev mode) - images still work but are not optimized
- These warnings are cosmetic and do not affect functionality
