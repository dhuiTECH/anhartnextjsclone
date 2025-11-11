# Anhart Affordable Housing - Next.js Application

## Overview
This is a Next.js web application for Anhart Affordable Housing, showcasing their mission, portfolio, and partnerships in affordable housing development across British Columbia.

## Recent Changes (November 11, 2025)
- **Vercel to Replit Migration Completed**
  - Configured Next.js development server to run on port 5000 with host 0.0.0.0
  - Fixed Supabase client configuration to use environment variables (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)
  - Fixed Google Analytics component to use Next.js environment variable syntax (process.env.NEXT_PUBLIC_GA_TRACKING_ID)
  - Installed Node.js 20 runtime
  - Configured development workflow
  - Configured production deployment settings (autoscale)

- **Image Path Fixes**
  - Fixed all "[object Object]" errors by extracting `.src` property from Next.js static import objects
  - Updated components: Footer, Hero, About, GlobalPartners, ClientCarousel, OurFocusSection, ProjectModal, ProjectGalleryModal, PDFViewer
  - Created `getImageSrc()` helper function for consistent image path handling
  - All images now render correctly across home, about, and contact pages

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
│   ├── components/       # React components
│   ├── assets/           # Images and media files
│   ├── integrations/     # Third-party integrations (Supabase)
│   └── services/         # Business logic services
├── public/               # Static assets
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
