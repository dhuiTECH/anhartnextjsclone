-- Update the publish date for the energy savings article to today
UPDATE blog_posts 
SET 
  publish_date = now(), 
  updated_at = now()
WHERE slug = '10-smart-ways-to-save-on-energy-bills-this-winter-in-canada';