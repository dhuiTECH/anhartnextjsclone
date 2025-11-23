/**
 * Utility function to convert project titles to URL-safe slugs
 * Used for generating SEO-friendly project page URLs
 */
export function generateProjectSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Find a project by slug from the portfolio data
 */
export function getProjectBySlug(slug: string, projects: any[]) {
  return projects.find(project => generateProjectSlug(project.title) === slug);
}
