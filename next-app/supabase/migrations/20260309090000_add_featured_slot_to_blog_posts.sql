-- Add featured_slot column to blog_posts to support three homepage positions
ALTER TABLE public.blog_posts
ADD COLUMN IF NOT EXISTS featured_slot INTEGER NOT NULL DEFAULT 0;

COMMENT ON COLUMN public.blog_posts.featured_slot IS
  'Homepage featured slot: 0 = not featured, 1-3 = specific featured positions';

-- Optional helper index for querying featured posts by slot
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured_slot
  ON public.blog_posts (featured_slot);

