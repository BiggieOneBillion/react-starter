import { NextRequest, NextResponse } from 'next/server';
import NodeCache from 'node-cache';

// Create cache instance (TTL: 1 hour)
const cache = new NodeCache({ stdTTL: 3600 });

const NPM_REGISTRY = 'https://registry.npmjs.org';

export async function GET(
  request: NextRequest,
  { params }: { params: { name: string } }
) {
  try {
    const packageName = params.name;

    if (!packageName) {
      return NextResponse.json(
        { error: 'Package name is required' },
        { status: 400 }
      );
    }

    // Check cache first
    const cacheKey = `package:${packageName}`;
    const cachedResult = cache.get(cacheKey);
    
    if (cachedResult) {
      return NextResponse.json(cachedResult);
    }

    // Fetch from npm registry
    const response = await fetch(`${NPM_REGISTRY}/${packageName}`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'Package not found' },
          { status: 404 }
        );
      }
      throw new Error('NPM API request failed');
    }

    const data = await response.json();

    // Extract useful information
    const packageInfo = {
      name: data.name,
      description: data.description,
      version: data['dist-tags']?.latest || Object.keys(data.versions).pop(),
      versions: Object.keys(data.versions).reverse().slice(0, 10), // Last 10 versions
      homepage: data.homepage,
      repository: data.repository?.url,
      license: data.license,
      author: data.author,
      keywords: data.keywords,
      dependencies: data.versions[data['dist-tags']?.latest]?.dependencies || {},
      devDependencies: data.versions[data['dist-tags']?.latest]?.devDependencies || {},
    };

    // Cache the result
    cache.set(cacheKey, packageInfo);

    return NextResponse.json(packageInfo);
  } catch (error) {
    console.error('NPM package fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch package details' },
      { status: 500 }
    );
  }
}
