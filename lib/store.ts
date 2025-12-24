import { create } from 'zustand';
import { FileNode, NpmPackage } from '@/lib/types';

interface ProjectStore {
  // File structure state
  fileStructure: FileNode[];
  selectedFile: FileNode | null;
  
  // NPM packages state
  selectedPackages: NpmPackage[];
  searchQuery: string;
  
  // Actions for file structure
  setFileStructure: (structure: FileNode[]) => void;
  addNode: (parentId: string | null, node: FileNode) => void;
  updateNode: (id: string, updates: Partial<FileNode>) => void;
  deleteNode: (id: string) => void;
  moveNode: (nodeId: string, newParentId: string | null, index?: number) => void;
  setSelectedFile: (file: FileNode | null) => void;
  updateFileContent: (id: string, content: string) => void;
  toggleFolder: (id: string) => void;
  
  // Actions for NPM packages
  addPackage: (pkg: NpmPackage) => void;
  removePackage: (packageName: string) => void;
  updatePackage: (packageName: string, updates: Partial<NpmPackage>) => void;
  setSearchQuery: (query: string) => void;
  clearPackages: () => void;
  
  // Reset
  reset: () => void;
}

// Helper function to find node by ID
const findNodeById = (nodes: FileNode[], id: string): FileNode | null => {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children) {
      const found = findNodeById(node.children, id);
      if (found) return found;
    }
  }
  return null;
};

// Helper function to update node in tree
const updateNodeInTree = (
  nodes: FileNode[],
  id: string,
  updates: Partial<FileNode>
): FileNode[] => {
  return nodes.map(node => {
    if (node.id === id) {
      return { ...node, ...updates };
    }
    if (node.children) {
      return {
        ...node,
        children: updateNodeInTree(node.children, id, updates)
      };
    }
    return node;
  });
};

// Helper function to delete node from tree
const deleteNodeFromTree = (nodes: FileNode[], id: string): FileNode[] => {
  return nodes.filter(node => {
    if (node.id === id) return false;
    if (node.children) {
      node.children = deleteNodeFromTree(node.children, id);
    }
    return true;
  });
};

// Helper function to add node to tree
const addNodeToTree = (
  nodes: FileNode[],
  parentId: string | null,
  newNode: FileNode
): FileNode[] => {
  if (parentId === null) {
    return [...nodes, newNode];
  }
  
  return nodes.map(node => {
    if (node.id === parentId) {
      return {
        ...node,
        children: [...(node.children || []), newNode]
      };
    }
    if (node.children) {
      return {
        ...node,
        children: addNodeToTree(node.children, parentId, newNode)
      };
    }
    return node;
  });
};

// Default file structure
const defaultStructure: FileNode[] = [
  {
    id: 'src',
    name: 'src',
    type: 'folder',
    isExpanded: true,
    children: [
      {
        id: 'src-components',
        name: 'components',
        type: 'folder',
        isExpanded: false,
        children: []
      },
      {
        id: 'src-pages',
        name: 'pages',
        type: 'folder',
        isExpanded: false,
        children: []
      },
      {
        id: 'src-app',
        name: 'App.tsx',
        type: 'file',
        language: 'typescript',
        content: ''
      },
      {
        id: 'src-main',
        name: 'main.tsx',
        type: 'file',
        language: 'typescript',
        content: ''
      }
    ]
  },
  {
    id: 'public',
    name: 'public',
    type: 'folder',
    isExpanded: false,
    children: []
  }
];

export const useProjectStore = create<ProjectStore>((set, get) => ({
  // Initial state
  fileStructure: defaultStructure,
  selectedFile: null,
  selectedPackages: [],
  searchQuery: '',
  
  // File structure actions
  setFileStructure: (structure) => set({ fileStructure: structure }),
  
  addNode: (parentId, node) => set((state) => ({
    fileStructure: addNodeToTree(state.fileStructure, parentId, node)
  })),
  
  updateNode: (id, updates) => set((state) => ({
    fileStructure: updateNodeInTree(state.fileStructure, id, updates)
  })),
  
  deleteNode: (id) => set((state) => ({
    fileStructure: deleteNodeFromTree(state.fileStructure, id),
    selectedFile: state.selectedFile?.id === id ? null : state.selectedFile
  })),
  
  moveNode: (nodeId, newParentId, index) => {
    // This is a simplified version - full implementation would handle index positioning
    const state = get();
    const node = findNodeById(state.fileStructure, nodeId);
    if (!node) return;
    
    // Remove from current location
    let newStructure = deleteNodeFromTree(state.fileStructure, nodeId);
    // Add to new location
    newStructure = addNodeToTree(newStructure, newParentId, node);
    
    set({ fileStructure: newStructure });
  },
  
  setSelectedFile: (file) => set({ selectedFile: file }),
  
  updateFileContent: (id, content) => set((state) => ({
    fileStructure: updateNodeInTree(state.fileStructure, id, { content }),
    selectedFile: state.selectedFile?.id === id 
      ? { ...state.selectedFile, content }
      : state.selectedFile
  })),
  
  toggleFolder: (id) => set((state) => {
    const node = findNodeById(state.fileStructure, id);
    if (!node || node.type !== 'folder') return state;
    
    return {
      fileStructure: updateNodeInTree(state.fileStructure, id, {
        isExpanded: !node.isExpanded
      })
    };
  }),
  
  // NPM package actions
  addPackage: (pkg) => set((state) => {
    // Check if package already exists
    const exists = state.selectedPackages.some(p => p.name === pkg.name);
    if (exists) return state;
    
    return {
      selectedPackages: [...state.selectedPackages, pkg]
    };
  }),
  
  removePackage: (packageName) => set((state) => ({
    selectedPackages: state.selectedPackages.filter(p => p.name !== packageName)
  })),
  
  updatePackage: (packageName, updates) => set((state) => ({
    selectedPackages: state.selectedPackages.map(p =>
      p.name === packageName ? { ...p, ...updates } : p
    )
  })),
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  clearPackages: () => set({ selectedPackages: [] }),
  
  // Reset everything
  reset: () => set({
    fileStructure: defaultStructure,
    selectedFile: null,
    selectedPackages: [],
    searchQuery: ''
  })
}));
