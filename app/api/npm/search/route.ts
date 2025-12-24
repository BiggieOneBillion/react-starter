import { NextRequest, NextResponse } from 'next/server';
import NodeCache from 'node-cache';

// Create cache instance (TTL: 1 hour)
const cache = new NodeCache({ stdTTL: 3600 });

const NPM_SEARCH_API = 'https://registry.npmjs.org/-/v1/search';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    const limit = parseInt(searchParams.get('limit') || '20');

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    // Check cache first
    const cacheKey = `search:${query}:${limit}`;
    const cachedResult = cache.get(cacheKey);
    
    if (cachedResult) {
      return NextResponse.json(cachedResult);
    }

    // Fetch from npm registry
    const response = await fetch(
      `${NPM_SEARCH_API}?text=${encodeURIComponent(query)}&size=${limit}`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('NPM API request failed');
    }

    const data = await response.json();

    // Cache the result
    cache.set(cacheKey, data);

    return NextResponse.json(data);
  } catch (error) {
    console.error('NPM search error:', error);
    return NextResponse.json(
      { error: 'Failed to search packages' },
      { status: 500 }
    );
  }
}
