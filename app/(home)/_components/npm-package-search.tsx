'use client';

import React, { useState, useEffect } from 'react';
import { useProjectStore } from '@/lib/store';
import { NpmPackage, NpmSearchResult } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Plus, ExternalLink, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

export function NpmPackageSearch() {
  const { selectedPackages, addPackage, searchQuery, setSearchQuery } = useProjectStore();
  const [results, setResults] = useState<NpmSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Perform search
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      return;
    }

    const searchPackages = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/npm/search?q=${encodeURIComponent(debouncedQuery)}&limit=20`
        );
        
        if (!response.ok) throw new Error('Search failed');
        
        const data = await response.json();
        setResults(data.results || []);
      } catch (error) {
        console.error('Search error:', error);
        toast.error('Failed to search packages');
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    searchPackages();
  }, [debouncedQuery]);

  const handleAddPackage = (result: NpmSearchResult) => {
    const pkg: NpmPackage = {
      name: result.package.name,
      version: result.package.version,
      description: result.package.description,
      keywords: result.package.keywords,
      homepage: result.package.links.homepage,
      repository: result.package.links.repository,
      author: result.package.author?.name,
      category: 'dependency',
    };

    addPackage(pkg);
    toast.success(`Added ${pkg.name}`);
  };

  const isPackageSelected = (packageName: string) => {
    return selectedPackages.some(p => p.name === packageName);
  };

  const formatDownloads = (score: number) => {
    // Approximate downloads from popularity score
    const downloads = Math.floor(score * 1000000);
    if (downloads >= 1000000) return `${(downloads / 1000000).toFixed(1)}M`;
    if (downloads >= 1000) return `${(downloads / 1000).toFixed(0)}K`;
    return downloads.toString();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Search Input */}
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search npm packages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto p-4">
        {loading && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}

        {!loading && results.length === 0 && searchQuery && (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">No packages found</p>
          </div>
        )}

        {!loading && !searchQuery && (
          <div className="text-center py-8 text-muted-foreground">
            <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-sm">Search for npm packages to add to your project</p>
          </div>
        )}

        <div className="space-y-3">
          {results.map((result) => (
            <div
              key={result.package.name}
              className="border rounded-lg p-4 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm truncate">
                      {result.package.name}
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      v{result.package.version}
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {result.package.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    {result.score.detail.popularity > 0 && (
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        <span>{formatDownloads(result.score.detail.popularity)} downloads</span>
                      </div>
                    )}
                    
                    {result.package.links.homepage && (
                      <a
                        href={result.package.links.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:text-primary"
                      >
                        <ExternalLink className="h-3 w-3" />
                        <span>Homepage</span>
                      </a>
                    )}
                  </div>

                  {result.package.keywords && result.package.keywords.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {result.package.keywords.slice(0, 3).map((keyword) => (
                        <span
                          key={keyword}
                          className="text-xs bg-muted px-2 py-0.5 rounded"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <Button
                  size="sm"
                  onClick={() => handleAddPackage(result)}
                  disabled={isPackageSelected(result.package.name)}
                >
                  {isPackageSelected(result.package.name) ? (
                    'Added'
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </>
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
