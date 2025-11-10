# Blog Admin Guide

Welcome to your blog management system! This guide will help you create and manage blog posts seamlessly.

## Accessing the Blog Admin

1. Navigate to `/admin/blog` in your browser
2. You must be logged in as an admin to access this page

## Creating a New Blog Post

### Step 1: Click "New Post" Button
Click the "+ New Post" button in the top right corner to open the blog post editor.

### Step 2: Fill in Basic Information

#### Title * (Required)
- Enter your blog post title
- **Auto-magic**: The slug and meta title will automatically generate from your title!
- Example: "10 Ways to Save Energy" → slug: "10-ways-to-save-energy"

#### Slug * (Required)
- URL-friendly version of your title
- Auto-generated but you can customize it
- Use lowercase letters, numbers, and hyphens only
- Example: `affordable-housing-guide-2025`

#### Excerpt * (Required)
- Short summary of your post (150-200 characters recommended)
- **Auto-magic**: Also populates your meta description!
- This appears in blog listings and search results

### Step 3: Create Your Content

#### Rich Text Editor
- Use the toolbar to format your content:
  - **Headers**: H1, H2, H3 for structure
  - **Text Formatting**: Bold, italic, underline, strikethrough
  - **Lists**: Numbered and bulleted lists
  - **Links**: Add hyperlinks
  - **Images**: Insert images directly
  - **Clean**: Remove all formatting

**Pro Tips:**
- Structure your content with headers (H2, H3)
- Use lists for better readability
- Add links to relevant pages/resources
- Keep paragraphs short and scannable

### Step 4: Upload Featured Image

#### Two Options:
1. **Upload File**: Click "Upload" button
   - Select an image from your computer
   - Image is automatically uploaded to Supabase Storage
   - URL is generated and inserted for you
   
2. **Enter URL**: Paste an existing image URL
   - Works with any public image URL
   - Must be accessible online

**Image Guidelines:**
- Recommended size: 1200x630px (or 16:9 ratio)
- Format: JPG, PNG, WebP
- Max file size: 20MB
- Use descriptive, relevant images

### Step 5: Set Metadata

#### Author Name
- Default: "Anhart Team"
- Can be customized per post

#### Publish Date
- Defaults to today's date
- Can be scheduled for future or backdated

#### Category * (Required)
- Examples: "Housing Resources", "Community Impact", "Winter Tips"
- Used for filtering and organization

#### Reading Time
- Estimate in minutes
- Helps readers know time commitment
- Default: 5 minutes

#### Published Status
- **Toggle ON**: Post is live and visible on your blog
- **Toggle OFF**: Saved as draft (not visible publicly)

### Step 6: Add Tags
- Comma-separated list
- Example: `affordable housing, BC, energy savings, winter tips`
- Used for search and related posts
- No limit on number of tags

### Step 7: SEO Settings

#### Meta Title * (Required, 60 chars max)
- SEO-optimized title for search engines
- Auto-populates from your title
- Should include main keyword
- Character counter helps you stay within limit

#### Meta Description * (Required, 160 chars max)
- Compelling description for search results
- Auto-populates from your excerpt
- Should include main keyword naturally
- Character counter helps you stay within limit

#### SEO Keywords
- Comma-separated list
- Example: `save on winter energy bills, Canadian winter energy tips, BC Hydro rebates`
- Include main keyword and variations
- Think about what people might search for

### Step 8: Save Your Post

1. **Review**: Double-check all fields
2. **Validate**: Required fields are marked with *
3. **Click "Save"**: Your post is saved to the database
4. **Success**: You'll see a confirmation message

## Editing Existing Posts

1. Find your post in the list
2. Click the **Edit** button (pencil icon)
3. Make your changes
4. Click **Save** to update

## Deleting Posts

1. Find the post you want to delete
2. Click the **Delete** button (trash icon)
3. Confirm deletion (this cannot be undone!)

## Best Practices

### Content Quality
- **Write comprehensive content**: 800-2000+ words for better SEO
- **Use headers**: Break content into sections
- **Add examples**: Real-world scenarios resonate
- **Include statistics**: Data adds credibility
- **Add internal links**: Link to other blog posts and pages

### SEO Optimization
- **Research keywords**: What are people searching for?
- **Use keywords naturally**: Don't stuff keywords
- **Write for humans first**: SEO is secondary to good content
- **Update regularly**: Fresh content ranks better
- **Use descriptive URLs**: Keep slugs readable

### Images
- **Compress images**: Use tools like TinyPNG before uploading
- **Use relevant images**: Match content theme
- **Alt text**: Use descriptive featured images
- **Optimize file names**: `energy-saving-tips-winter.jpg` not `IMG_1234.jpg`

### Publishing Strategy
- **Start as draft**: Review before publishing
- **Schedule posts**: Use future dates for content calendar
- **Update old posts**: Keep content fresh and relevant
- **Monitor performance**: Track which posts perform best

## Quick Reference

### Auto-Generated Fields
When you fill in certain fields, others auto-populate:
- **Title** → Slug + Meta Title
- **Excerpt** → Meta Description

### Required Fields
- Title
- Slug
- Excerpt
- Content
- Featured Image
- Category
- Meta Title
- Meta Description

### Optional Fields
- Author Name (defaults to "Anhart Team")
- Publish Date (defaults to today)
- Reading Time (defaults to 5 minutes)
- Tags
- SEO Keywords
- Published status (defaults to draft)

## Troubleshooting

### "Validation Error: Title is required"
- Make sure the title field is not empty
- Title must have at least one character

### "Validation Error: Slug is required"
- Slug should auto-generate from title
- If manually editing, use only lowercase, numbers, and hyphens

### "Validation Error: Content is required"
- Add content in the rich text editor
- Content cannot be empty

### "Failed to upload image"
- Check file size (max 20MB)
- Ensure you're logged in as admin
- Try a different image format (JPG, PNG)

### Changes not appearing on blog
- Make sure "Published" toggle is ON
- Clear browser cache and refresh
- Check that publish date is not in the future

## Support

If you need help or encounter issues:
1. Check this guide first
2. Review field validation messages
3. Check browser console for error messages
4. Contact technical support if issues persist

## Tips for Success

1. **Plan your content**: Outline before writing
2. **Write regularly**: Consistency helps SEO and audience building
3. **Use the rich editor**: Makes formatting easy
4. **Optimize images**: Better performance and user experience
5. **Review before publishing**: Check for typos and formatting
6. **Update regularly**: Keep content fresh and accurate
7. **Monitor analytics**: Learn what content resonates
8. **Engage readers**: Encourage comments and sharing

---

Happy blogging! 🎉
