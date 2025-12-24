'use client';

import React from 'react';
import { useProjectStore } from '@/lib/store';
import { NpmPackage } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { X, Package, ExternalLink } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function PackageManager() {
  const { selectedPackages, removePackage, updatePackage } = useProjectStore();

  const handleCategoryChange = (packageName: string, category: 'dependency' | 'devDependency') => {
    updatePackage(packageName, { category });
  };

  const getTotalSize = () => {
    // This is a placeholder - in a real app, you'd fetch actual package sizes
    return selectedPackages.length * 150; // Rough estimate in KB
  };

  const formatSize = (kb: number) => {
    if (kb >= 1024) return `${(kb / 1024).toFixed(1)} MB`;
    return `${kb} KB`;
  };

  if (selectedPackages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-8">
        <Package className="h-12 w-12 mb-4 opacity-50" />
        <p className="text-sm text-center">
          No packages selected yet.<br />
          Search and add packages to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">Selected Packages</h3>
          <span className="text-sm text-muted-foreground">
            {selectedPackages.length} package{selectedPackages.length !== 1 ? 's' : ''}
          </span>
        </div>
        <div className="text-xs text-muted-foreground">
          Estimated size: ~{formatSize(getTotalSize())}
        </div>
      </div>

      {/* Package List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {selectedPackages.map((pkg) => (
            <div
              key={pkg.name}
              className="border rounded-lg p-3 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm truncate">{pkg.name}</h4>
                    <span className="text-xs text-muted-foreground">
                      v{pkg.version}
                    </span>
                  </div>
                  
                  {pkg.description && (
                    <p className="text-xs text-muted-foreground line-clamp-1 mb-2">
                      {pkg.description}
                    </p>
                  )}

                  <div className="flex items-center gap-2">
                    <Select
                      value={pkg.category || 'dependency'}
                      onValueChange={(value: 'dependency' | 'devDependency') =>
                        handleCategoryChange(pkg.name, value)
                      }
                    >
                      <SelectTrigger className="h-7 text-xs w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dependency">Dependency</SelectItem>
                        <SelectItem value="devDependency">Dev Dependency</SelectItem>
                      </SelectContent>
                    </Select>

                    {pkg.homepage && (
                      <a
                        href={pkg.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => removePackage(pkg.name)}
                  className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="p-4 border-t bg-muted/30">
        <div className="text-xs space-y-1">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Dependencies:</span>
            <span className="font-medium">
              {selectedPackages.filter(p => p.category === 'dependency').length}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Dev Dependencies:</span>
            <span className="font-medium">
              {selectedPackages.filter(p => p.category === 'devDependency').length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
