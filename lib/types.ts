// File structure types
export interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  content?: string;
  language?: string; // For syntax highlighting
  template?: string;
  isExpanded?: boolean;
}

// NPM Package types
export interface NpmPackage {
  name: string;
  version: string;
  description: string;
  downloads?: number;
  repository?: string;
  homepage?: string;
  keywords?: string[];
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  license?: string;
  author?: string;
  category?: 'dependency' | 'devDependency';
}

export interface NpmSearchResult {
  package: {
    name: string;
    version: string;
    description: string;
    keywords: string[];
    links: {
      npm?: string;
      homepage?: string;
      repository?: string;
    };
    author?: {
      name: string;
    };
    publisher: {
      username: string;
    };
    date: string;
  };
  score: {
    final: number;
    detail: {
      quality: number;
      popularity: number;
      maintenance: number;
    };
  };
  searchScore: number;
}

// File templates
export type FileTemplate = 
  | 'react-component'
  | 'react-component-ts'
  | 'api-route'
  | 'api-route-ts'
  | 'typescript-interface'
  | 'utility-function'
  | 'test-file'
  | 'config-file'
  | 'empty';

export interface TemplateDefinition {
  id: FileTemplate;
  name: string;
  description: string;
  language: string;
  content: string;
  category: 'component' | 'api' | 'utility' | 'config' | 'test';
}

// Project configuration (extended from existing)
export interface ProjectConfiguration {
  projectName: string;
  lang: 'js' | 'ts';
  router: string;
  styling: string;
  uiLibrary: string;
  stateManagement: string;
  iconsLibrary: string;
  dataFetching: string;
  serverState: string;
  formManagement: string;
  toastLibrary: string;
  dataValidation: string;
  
  // New fields for Phase 1
  customStructure?: FileNode[];
  customPackages?: NpmPackage[];
}

// Drag and drop types
export interface DragData {
  id: string;
  type: 'file' | 'folder';
  parentId?: string;
}

export interface DropResult {
  overId: string;
  active: DragData;
}
