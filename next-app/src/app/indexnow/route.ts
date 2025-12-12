import { NextRequest, NextResponse } from 'next/server';

/**
 * IndexNow API Endpoint
 * 
 * This endpoint implements the IndexNow protocol to notify search engines
 * (Bing, Yandex, etc.) when URLs are created, updated, or deleted.
 * 
 * Protocol: https://www.indexnow.org/
 * 
 * Usage:
 * POST /indexnow
 * Body: {
 *   "host": "anhart.ca",
 *   "key": "your-verification-key",
 *   "urlList": [
 *     "https://anhart.ca/blog/post-slug",
 *     "https://anhart.ca/projects/project-slug"
 *   ]
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { host, key, urlList } = body;

    // Validate required fields
    if (!host || !key || !urlList || !Array.isArray(urlList)) {
      return NextResponse.json(
        { 
          error: 'Invalid request. Required fields: host, key, urlList (array)' 
        },
        { status: 400 }
      );
    }

    // Validate host matches your domain
    const allowedHosts = ['anhart.ca', 'www.anhart.ca'];
    if (!allowedHosts.includes(host)) {
      return NextResponse.json(
        { error: 'Invalid host' },
        { status: 400 }
      );
    }

    // Security: Require IndexNow key from environment variable (no default)
    const expectedKey = process.env.INDEXNOW_KEY;
    if (!expectedKey) {
      console.error('INDEXNOW_KEY environment variable is not set');
      return NextResponse.json(
        { error: 'IndexNow service is not configured' },
        { status: 500 }
      );
    }
    if (key !== expectedKey) {
      return NextResponse.json(
        { error: 'Invalid key' },
        { status: 401 }
      );
    }

    // Validate URLs are from your domain
    const baseUrl = `https://${host}`;
    const invalidUrls = urlList.filter(
      (url: string) => !url.startsWith(baseUrl)
    );
    
    if (invalidUrls.length > 0) {
      return NextResponse.json(
        { 
          error: 'All URLs must be from the specified host',
          invalidUrls 
        },
        { status: 400 }
      );
    }

    // Submit to IndexNow-compatible search engines
    const searchEngines = [
      'https://api.indexnow.org/indexnow',
      'https://www.bing.com/indexnow',
      'https://yandex.com/indexnow',
    ];

    const results = await Promise.allSettled(
      searchEngines.map(async (endpoint) => {
        try {
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              host,
              key,
              urlList,
            }),
          });

          return {
            endpoint,
            status: response.status,
            ok: response.ok,
          };
        } catch (error) {
          return {
            endpoint,
            error: error instanceof Error ? error.message : 'Unknown error',
          };
        }
      })
    );

    // Log results (optional - for debugging)
    console.log('IndexNow submission results:', results);

    // Return success even if some engines fail (they may not all be available)
    const successful = results.filter(
      (r) => r.status === 'fulfilled' && r.value.ok
    ).length;

    return NextResponse.json({
      success: true,
      message: `Submitted ${urlList.length} URL(s) to ${successful} search engine(s)`,
      submittedUrls: urlList,
      results: results.map((r) => 
        r.status === 'fulfilled' ? r.value : { error: r.reason }
      ),
    });
  } catch (error) {
    console.error('IndexNow error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Allow GET for verification (some implementations check this)
export async function GET() {
  return NextResponse.json({
    message: 'IndexNow endpoint is active',
    protocol: 'https://www.indexnow.org/',
    usage: 'POST /indexnow with { host, key, urlList }',
  });
}

