-- Create projects table for featured project details
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  location TEXT,
  completion_date DATE,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Projects are publicly readable" 
ON public.projects 
FOR SELECT 
USING (true);

-- Insert sample data for existing projects
INSERT INTO public.projects (name, description, location, completion_date, image_url) VALUES
('The Ryder', 'Delivering 40 modular homes that expand affordable housing in rural and remote communities. This innovative project combines sustainable building practices with community-focused design to create lasting housing solutions.', 'Rural BC', '2023-08-15', NULL),
('Dodson Hotel', 'Revitalizing aging SROs into modern, affordable homes that renew communities and strengthen inner cities. A comprehensive renovation project that preserves historic character while providing modern amenities.', 'Vancouver Downtown Eastside', '2023-06-20', NULL),
('162 Main St', 'Creating compact micro-suites as a vital first step from shelters to permanent housing, offering stability to rebuild lives. Features innovative space-saving designs and community support services.', 'Vancouver', '2023-09-10', NULL),
('Merritt, BC Townhomes', 'Multigenerational townhomes designed to balance privacy, shared space and equity to strengthen communities. Features flexible layouts that adapt to changing family needs over time.', 'Merritt, BC', '2024-02-28', NULL),
('Deattached Homes', 'Durable, affordable homes, providing communities with accessible, long-term ownership to a path of stability. Built with sustainable materials and energy-efficient systems.', 'Various Locations BC', '2024-01-15', NULL),
('Modular Homes', 'Modular home combining private ownership with shared infrastructure to foster affordable and resilient communities. Features innovative construction techniques for faster delivery.', 'Fraser Valley', '2024-03-20', NULL);

-- Create trigger for automatic timestamp updates
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();