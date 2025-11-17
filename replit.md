# Anhart - Next.js Application

## Overview
This Next.js web application for Anhart, an affordable housing developer in Vancouver, BC, showcases their mission, portfolio, and partnerships. The project aims to contribute to building 20,000 homes by 2045 through various initiatives like modular homes, SRO conversions, and open-source Community Commons. The application highlights Anhart's commitment to creating accessible and sustainable housing across Canada.

## User Preferences
No specific user preferences were provided in the original replit.md.

## System Architecture
The application is built with **Next.js 16 (App Router)**, React 18 with TypeScript, and styled using **Tailwind CSS**. It leverages **Radix UI + shadcn/ui** for its component library. **Supabase (PostgreSQL)** serves as the database, handling blog posts, user profiles, and member-accessible files. The project uses a server-side rendering (SSR) approach with a clear separation of server and client components.

**Key Features:**
- **Comprehensive Rebranding:** All user-facing content is updated to "Anhart," with consistent branding across the application and metadata.
- **Admin Dashboard:** A secure `/admin/dashboard` provides a rich text editor (TipTap) for publishing and managing blog posts. It includes an advanced formatting toolbar, publish date input, and category management.
- **Member Portal:** A secure `/member/dashboard` allows members to access and download files from a dedicated Supabase storage bucket.
- **Authentication & Authorization:** Implemented with Supabase, utilizing `@supabase/ssr` for both client and server-side authentication, including role-based access control (RBAC) for admin and member roles.
- **SEO Enhancements:** Dynamic `generateMetadata` for blog posts, JSON-LD structured data (Article and RealEstateAgent schemas), and optimized image handling for improved search engine visibility.
- **Toast Notification System:** Provides app-wide success/error feedback for form submissions.
- **Image Optimization:** All images are converted to WebP format for performance and Vercel compatibility.
- **Directory Structure:** Organizes code into `app/` (Next.js App Router pages including admin/member portals), `components/`, `assets/`, `integrations/` (Supabase), `lib/`, and `services/`.

## External Dependencies
- **Supabase:** Used for database (PostgreSQL), authentication, and file storage (`member-files` bucket).
- **Google Analytics:** Integrated for tracking user behavior, configured via `NEXT_PUBLIC_GA_TRACKING_ID`.
- **TipTap:** Rich text editor used in the admin dashboard for blog post creation, including `@tiptap/react`, `@tiptap/starter-kit`, `CodeBlockLowlight` with `lowlight` and `highlight.js` for syntax highlighting, and "Insert Code" dialog for adding formatted code blocks.

## Known Issues
- **Homepage Video Background:** The hero section uses a 19MB video file (`/mediaAssets/hero-background-video.mp4`) which may load slowly. If the video doesn't load, a pink/coral gradient background is shown as fallback.
- **Image Registry:** AVIF image variants are incorrectly mapped to WebP files in `src/assets/registry.ts`. The OptimizedImage component has been updated to skip AVIF and use WebP directly.
- **Blog Image Loading:** Fixed missing blog featured images by updating database references to point to existing images in `/public/blog/` directory.