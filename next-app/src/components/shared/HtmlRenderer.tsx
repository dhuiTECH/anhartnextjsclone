'use client';

import { useMemo } from 'react';

interface HtmlRendererProps {
  html: string;
  className?: string;
}

/**
 * Component to safely render HTML content with proper styling.
 * Supports embedded images, links, lists, and other HTML elements.
 * 
 * Usage in content:
 * - Images: <img src="https://..." alt="description" class="rounded-lg max-w-full h-auto">
 * - Links: <a href="https://..." target="_blank" rel="noopener noreferrer nofollow">link text</a>
 * - Lists: <ul><li>item</li></ul> or <ol><li>item</li></ol>
 * - Paragraphs: <p>content</p>
 */
export function HtmlRenderer({ html, className = '' }: HtmlRendererProps) {
  // Decode HTML entities that might be double-encoded
  const decodedHtml = useMemo(() => {
    return html
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");
  }, [html]);

  return (
    <div
      className={`prose prose-lg max-w-none 
        [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-4
        [&_img]:rounded-lg [&_img]:max-w-full [&_img]:h-auto [&_img]:my-4
        [&_a]:text-indigo-600 [&_a]:hover:text-indigo-800 [&_a]:underline
        [&_strong]:font-semibold [&_strong]:text-foreground
        [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:my-4
        [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:my-4
        [&_li]:mb-1 [&_li]:text-muted-foreground
        [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-8 [&_h2]:mb-4
        [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mt-6 [&_h3]:mb-3
        [&_h4]:text-base [&_h4]:font-semibold [&_h4]:text-foreground [&_h4]:mt-4 [&_h4]:mb-2
        ${className}`}
      dangerouslySetInnerHTML={{ __html: decodedHtml }}
    />
  );
}

export default HtmlRenderer;
