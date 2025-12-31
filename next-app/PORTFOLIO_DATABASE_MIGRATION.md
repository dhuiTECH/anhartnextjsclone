# Portfolio Database Migration Guide

## Overview
This document outlines the migration from hardcoded portfolio projects to a Supabase database-driven system with a full admin interface.

## What Has Been Implemented

### 1. Database Schema (`supabase/migrations/20250120000000_create_portfolio_projects.sql`)
- Created `portfolio_projects` table with all necessary fields
- Set up Row Level Security (RLS) policies for public read, authenticated write
- Created storage bucket `portfolio-images` with proper policies
- Added indexes for performance
- Added automatic `updated_at` timestamp trigger

### 2. Data Fetching Utility (`src/lib/portfolio-data.ts`)
- `getPortfolioProjects()` - Fetches all projects from Supabase
- `getPortfolioProjectById()` - Fetches a single project
- Automatic fallback to hardcoded data if database is empty or unavailable
- Seamless migration path - no breaking changes

### 3. Updated Portfolio Component (`src/components/Portfolio.tsx`)
- Now fetches projects from Supabase on mount
- Falls back to hardcoded data if database fails
- Maintains all existing functionality

### 4. Enhanced Admin Interface (`src/app/admin/dashboard/portfoliomanager/PortfolioManagerClient.tsx`)
- **List View**: View all projects in a grid with thumbnails
- **Create Mode**: Add new projects with full form
- **Edit Mode**: Edit existing projects (click "Edit" on any project)
- **Delete**: Remove projects with confirmation
- **Image Upload**: Upload images to Supabase storage
- **Live Preview**: See how projects will look before saving

## Next Steps to Complete the Migration

### Step 1: Run the Database Migration
```bash
# If using Supabase CLI locally
supabase migration up

# Or apply the migration through Supabase Dashboard:
# 1. Go to SQL Editor in Supabase Dashboard
# 2. Copy contents of: supabase/migrations/20250120000000_create_portfolio_projects.sql
# 3. Run the SQL script
```

### Step 2: Verify Storage Bucket
1. Go to Supabase Dashboard → Storage
2. Verify `portfolio-images` bucket exists (created by migration)
3. If not, create it manually and set it to public

### Step 3: Migrate Existing Projects (Optional)
You can either:
- **Option A**: Manually add projects through the admin interface
- **Option B**: Create a migration script to import hardcoded data

### Step 4: Test the System
1. Go to `/admin/dashboard/portfoliomanager`
2. Click "New Project" and create a test project
3. Verify it appears in the list
4. Edit the project to test editing
5. Check `/portfolio` page to see if it appears there

### Step 5: Update TypeScript Types (Optional)
After migration, update `src/integrations/supabase/types.ts` to include the new table:
```typescript
portfolio_projects: {
  Row: {
    id: string
    title: string
    location: string
    // ... etc
  }
  // ...
}
```

## Database Schema

### `portfolio_projects` Table
- `id` (UUID, Primary Key)
- `title` (TEXT, Required)
- `location` (TEXT, Required)
- `year` (TEXT, Optional)
- `completion_date` (TEXT, Optional)
- `units` (INTEGER, Optional)
- `status` (TEXT, Required: 'completed' | 'in-progress' | 'in-planning')
- `type` (TEXT, Optional)
- `brief_description` (TEXT, Required)
- `comprehensive_details` (TEXT, Optional)
- `highlights` (TEXT[], Optional array)
- `image_url` (TEXT, Optional)
- `image` (TEXT, Optional - for backward compatibility)
- `created_by` (UUID, References auth.users)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)
- `display_order` (INTEGER, For custom ordering)

## Features

### Admin Interface Features
✅ Create new projects
✅ Edit existing projects
✅ Delete projects
✅ Upload images to Supabase storage
✅ Live preview of portfolio cards
✅ List view with thumbnails
✅ Status badges (Completed, In Progress, In Planning)
✅ Form validation
✅ Error handling with fallback

### Public Portfolio Features
✅ Fetches from database
✅ Falls back to hardcoded data if needed
✅ Maintains all existing functionality
✅ No breaking changes

## Security
- Public read access for portfolio projects
- Authenticated users only can create/edit/delete
- Storage bucket policies for image uploads
- Row Level Security (RLS) enabled

## Migration Path
1. **Phase 1** (Current): Database ready, admin interface ready, public page uses database with fallback
2. **Phase 2** (After testing): Remove hardcoded data fallback (optional)
3. **Phase 3** (Future): Add more features like bulk import, project ordering, etc.

## Troubleshooting

### Projects not appearing?
1. Check if migration ran successfully
2. Verify RLS policies are correct
3. Check browser console for errors
4. Verify Supabase connection

### Image upload failing?
1. Check if `portfolio-images` bucket exists
2. Verify bucket is set to public
3. Check storage policies in Supabase Dashboard

### Can't edit/delete?
1. Verify you're logged in as authenticated user
2. Check RLS policies allow authenticated users to update/delete

