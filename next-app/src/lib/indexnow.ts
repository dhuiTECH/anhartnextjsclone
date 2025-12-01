/**
 * IndexNow Utility Functions
 * 
 * Helper functions to submit URLs to IndexNow when content is created or updated.
 */

const INDEXNOW_ENDPOINT = '/indexnow';
const BASE_URL = 'https://anhart.ca';

interface IndexNowResponse {
  success: boolean;
  message?: string;
  error?: string;
  submittedUrls?: string[];
  results?: any[];
}

/**
 * Submit URLs to IndexNow
 * 
 * @param urls - Array of URLs to submit (can be relative or absolute)
 * @param key - IndexNow verification key (optional, uses env var if not provided)
 * @returns Promise with submission results
 */
export async function submitToIndexNow(
  urls: string[],
  key?: string
): Promise<IndexNowResponse> {
  try {
    // Get key from parameter, environment variable, or use default
    const verificationKey = key || process.env.NEXT_PUBLIC_INDEXNOW_KEY || '4ab9b2d18280488dbd072cff98dc2626';

    // Normalize URLs to absolute URLs
    const absoluteUrls = urls.map((url) => {
      if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
      }
      // Remove leading slash if present
      const path = url.startsWith('/') ? url.slice(1) : url;
      return `${BASE_URL}/${path}`;
    });

    // Extract host from base URL
    const host = new URL(BASE_URL).hostname.replace('www.', '');

    // Use absolute URL for server-side, relative for client-side
    const endpoint = typeof window === 'undefined' 
      ? `${BASE_URL}${INDEXNOW_ENDPOINT}`
      : INDEXNOW_ENDPOINT;
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        host,
        key: verificationKey,
        urlList: absoluteUrls,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      return {
        success: false,
        error: error.error || `HTTP ${response.status}`,
      };
    }

    const data = await response.json();
    return {
      success: true,
      ...data,
    };
  } catch (error) {
    console.error('Error submitting to IndexNow:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Submit a single URL to IndexNow
 * 
 * @param url - URL to submit (can be relative or absolute)
 * @param key - IndexNow verification key (optional)
 * @returns Promise with submission results
 */
export async function submitUrlToIndexNow(
  url: string,
  key?: string
): Promise<IndexNowResponse> {
  return submitToIndexNow([url], key);
}

/**
 * Submit blog post URL to IndexNow
 * 
 * @param slug - Blog post slug
 * @returns Promise with submission results
 */
export async function submitBlogPostToIndexNow(
  slug: string
): Promise<IndexNowResponse> {
  return submitUrlToIndexNow(`/blog/${slug}`);
}

/**
 * Submit project URL to IndexNow
 * 
 * @param slug - Project slug
 * @returns Promise with submission results
 */
export async function submitProjectToIndexNow(
  slug: string
): Promise<IndexNowResponse> {
  return submitUrlToIndexNow(`/projects/${slug}`);
}

