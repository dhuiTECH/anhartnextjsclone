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
    // Security: Get key from parameter or environment variable (no hardcoded default)
    const verificationKey = key || process.env.NEXT_PUBLIC_INDEXNOW_KEY;
    if (!verificationKey) {
      return {
        success: false,
        error: 'IndexNow key is not configured. Set NEXT_PUBLIC_INDEXNOW_KEY environment variable.',
      };
    }

    // Normalize URLs to absolute URLs and ensure non-www
    const absoluteUrls = urls.map((url) => {
      let normalizedUrl: string;
      if (url.startsWith('http://') || url.startsWith('https://')) {
        normalizedUrl = url;
      } else {
        // Remove leading slash if present
        const path = url.startsWith('/') ? url.slice(1) : url;
        normalizedUrl = `${BASE_URL}/${path}`;
      }
      // Normalize to always use non-www version
      return normalizedUrl.replace(/^https?:\/\/(www\.)?anhart\.ca/, 'https://anhart.ca');
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

