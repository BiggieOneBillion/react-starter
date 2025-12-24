'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileTreeEditor } from './file-tree-editor';
import { FileContentEditor } from './file-content-editor';
import { NpmPackageSearch } from './npm-package-search';
import { PackageManager } from './package-manager';
import { FileCode, Package, Search } from 'lucide-react';

export function ProjectCustomizer() {
  return (
    <div className="w-full h-[600px] border rounded-lg overflow-hidden bg-background">
      <Tabs defaultValue="structure" className="h-full flex flex-col">
        <TabsList className="w-full justify-start rounded-none border-b bg-muted/30">
          <TabsTrigger value="structure" className="gap-2">
            <FileCode className="h-4 w-4" />
            Project Structure
          </TabsTrigger>
          <TabsTrigger value="packages" className="gap-2">
            <Package className="h-4 w-4" />
            Packages
          </TabsTrigger>
        </TabsList>

        <TabsContent value="structure" className="flex-1 m-0 p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 h-full">
            {/* File Tree */}
            <div className="border-r">
              <FileTreeEditor />
            </div>

            {/* File Editor */}
            <div>
              <FileContentEditor />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="packages" className="flex-1 m-0 p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 h-full">
            {/* Package Search */}
            <div className="border-r">
              <NpmPackageSearch />
            </div>

            {/* Package Manager */}
            <div>
              <PackageManager />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
