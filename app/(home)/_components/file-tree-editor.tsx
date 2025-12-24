'use client';

import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { FileNode } from '@/lib/types';
import { useProjectStore } from '@/lib/store';
import { FileTreeNode } from './file-tree-node';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, FolderPlus, FilePlus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';


export function FileTreeEditor() {
  const { fileStructure, addNode, moveNode, setSelectedFile } = useProjectStore();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newNodeName, setNewNodeName] = useState('');
  const [newNodeType, setNewNodeType] = useState<'file' | 'folder'>('file');
  const [selectedParent, setSelectedParent] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      moveNode(active.id as string, over.id as string);
    }
  };

  const handleAddNode = () => {
    if (!newNodeName.trim()) return;

    const newNode: FileNode = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: newNodeName,
      type: newNodeType,
      children: newNodeType === 'folder' ? [] : undefined,
      content: newNodeType === 'file' ? '' : undefined,
      isExpanded: newNodeType === 'folder' ? false : undefined,
    };

    addNode(selectedParent, newNode);
    setShowAddDialog(false);
    setNewNodeName('');
    setSelectedParent(null);
  };

  const openAddDialog = (type: 'file' | 'folder', parentId: string | null = null) => {
    setNewNodeType(type);
    setSelectedParent(parentId);
    setShowAddDialog(true);
  };

  // Flatten tree for sortable context
  const flattenTree = (nodes: FileNode[]): string[] => {
    const ids: string[] = [];
    const traverse = (items: FileNode[]) => {
      items.forEach(item => {
        ids.push(item.id);
        if (item.children) {
          traverse(item.children);
        }
      });
    };
    traverse(nodes);
    return ids;
  };

  return (
    <div className="flex flex-col h-full border rounded-md">
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-2 border-b bg-muted/50">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => openAddDialog('folder')}
          className="gap-1"
        >
          <FolderPlus className="h-4 w-4" />
          <span className="hidden sm:inline">Folder</span>
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => openAddDialog('file')}
          className="gap-1"
        >
          <FilePlus className="h-4 w-4" />
          <span className="hidden sm:inline">File</span>
        </Button>
      </div>

      {/* File Tree */}
      <div className="flex-1 overflow-y-auto p-2">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={flattenTree(fileStructure)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-1">
              {fileStructure.map((node) => (
                <FileTreeNode
                  key={node.id}
                  node={node}
                  level={0}
                  onAddChild={(parentId, type) => openAddDialog(type, parentId)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {fileStructure.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <p className="text-sm mb-4">No files or folders yet</p>
            <Button onClick={() => openAddDialog('folder')} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add First Folder
            </Button>
          </div>
        )}
      </div>

      {/* Add Node Dialog */}
      {showAddDialog && (
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Add New {newNodeType === 'folder' ? 'Folder' : 'File'}
              </DialogTitle>
              <DialogDescription>
                Enter a name for the new {newNodeType}.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Input
                placeholder={newNodeType === 'folder' ? 'folder-name' : 'file-name.tsx'}
                value={newNodeName}
                onChange={(e) => setNewNodeName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAddNode();
                }}
                autoFocus
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddNode} disabled={!newNodeName.trim()}>
                Add {newNodeType === 'folder' ? 'Folder' : 'File'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
