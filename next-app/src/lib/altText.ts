/**
 * Utility functions for generating rich, descriptive alt text for images
 * to improve SEO and accessibility
 */

/**
 * Generate descriptive alt text for blog post featured images
 */
export function getBlogPostAltText(
  title: string,
  category?: string,
  location?: string
): string {
  const categoryText = category ? `${category} article about ` : "";
  const locationText = location ? ` in ${location}` : "";
  
  return `Featured image for ${categoryText}${title}${locationText} - Anhart affordable housing blog`;
}

/**
 * Generate descriptive alt text for blog post listing/thumbnail images
 */
export function getBlogListingAltText(
  title: string,
  category?: string
): string {
  const categoryText = category ? `${category} article: ` : "";
  return `${categoryText}${title} - Anhart affordable housing blog post`;
}

/**
 * Generate descriptive alt text for project images
 */
export function getProjectAltText(
  projectTitle: string,
  location?: string,
  projectType?: string
): string {
  const locationText = location ? ` in ${location}` : "";
  const typeText = projectType ? ` ${projectType.toLowerCase()}` : " affordable housing";
  
  return `${projectTitle}${typeText} project${locationText} - Anhart affordable housing development`;
}

/**
 * Generate descriptive alt text for portfolio listing images
 */
export function getPortfolioListingAltText(
  projectTitle: string,
  location?: string,
  projectType?: string
): string {
  const locationText = location ? ` located in ${location}` : "";
  const typeText = projectType ? ` ${projectType.toLowerCase()}` : " affordable housing";
  
  return `${projectTitle}${typeText} development${locationText} - Anhart portfolio project`;
}

/**
 * Generate descriptive alt text for card/initiative images
 */
export function getCardImageAltText(
  title: string,
  description?: string
): string {
  if (description) {
    return `${title} - ${description} - Anhart affordable housing initiative`;
  }
  return `${title} - Anhart affordable housing initiative`;
}

/**
 * Generate descriptive alt text for media/gallery images
 */
export function getMediaImageAltText(
  title: string,
  context?: string
): string {
  const contextText = context ? ` - ${context}` : "";
  return `${title}${contextText} - Anhart affordable housing media`;
}

