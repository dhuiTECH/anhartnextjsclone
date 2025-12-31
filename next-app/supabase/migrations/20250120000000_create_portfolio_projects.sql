-- Create portfolio_projects table
CREATE TABLE IF NOT EXISTS public.portfolio_projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  year TEXT,
  completion_date TEXT,
  units INTEGER,
  status TEXT NOT NULL DEFAULT 'in-planning' CHECK (status IN ('completed', 'in-progress', 'in-planning')),
  type TEXT,
  brief_description TEXT NOT NULL,
  comprehensive_details TEXT,
  highlights TEXT[],
  image_url TEXT,
  image TEXT, -- For backward compatibility with existing image references
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  display_order INTEGER DEFAULT 0 -- For custom ordering
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_status ON public.portfolio_projects(status);
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_display_order ON public.portfolio_projects(display_order);

-- Enable Row Level Security
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read published projects
CREATE POLICY "Portfolio projects are publicly readable" 
ON public.portfolio_projects 
FOR SELECT 
USING (true);

-- Policy: Only authenticated users can insert
CREATE POLICY "Authenticated users can insert portfolio projects" 
ON public.portfolio_projects 
FOR INSERT 
TO authenticated
WITH CHECK (true);

-- Policy: Only authenticated users can update
CREATE POLICY "Authenticated users can update portfolio projects" 
ON public.portfolio_projects 
FOR UPDATE 
TO authenticated
USING (true)
WITH CHECK (true);

-- Policy: Only authenticated users can delete
CREATE POLICY "Authenticated users can delete portfolio projects" 
ON public.portfolio_projects 
FOR DELETE 
TO authenticated
USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_portfolio_projects_updated_at
  BEFORE UPDATE ON public.portfolio_projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create storage bucket for portfolio images if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-images', 'portfolio-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policy: Anyone can read portfolio images
CREATE POLICY "Portfolio images are publicly readable"
ON storage.objects FOR SELECT
USING (bucket_id = 'portfolio-images');

-- Storage policy: Authenticated users can upload portfolio images
CREATE POLICY "Authenticated users can upload portfolio images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'portfolio-images');

-- Storage policy: Authenticated users can update portfolio images
CREATE POLICY "Authenticated users can update portfolio images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'portfolio-images');

-- Storage policy: Authenticated users can delete portfolio images
CREATE POLICY "Authenticated users can delete portfolio images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'portfolio-images');

