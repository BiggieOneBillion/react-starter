'use client';

import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FileNode } from '@/lib/types';
import { useProjectStore } from '@/lib/store';
import { getFileIcon } from '@/lib/templates';
import {
  ChevronRight,
  ChevronDown,
  MoreVertical,
  Edit2,
  Trash2,
  FilePlus,
  FolderPlus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

interface FileTreeNodeProps {
  node: FileNode;
  level: number;
  onAddChild: (parentId: string, type: 'file' | 'folder') => void;
}

export function FileTreeNode({ node, level, onAddChild }: FileTreeNodeProps) {
  const {
    selectedFile,
    setSelectedFile,
    toggleFolder,
    updateNode,
    deleteNode,
  } = useProjectStore();

  const [isRenaming, setIsRenaming] = useState(false);
  const [renameName, setRenameName] = useState(node.name);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: node.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const isSelected = selectedFile?.id === node.id;
  const isFolder = node.type === 'folder';
  const isExpanded = node.isExpanded;

  const handleClick = () => {
    if (isFolder) {
      toggleFolder(node.id);
    } else {
      setSelectedFile(node);
    }
  };

  const handleRename = () => {
    if (renameName.trim() && renameName !== node.name) {
      updateNode(node.id, { name: renameName.trim() });
    }
    setIsRenaming(false);
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete "${node.name}"?`)) {
      deleteNode(node.id);
    }
  };

  return (
    <div ref={setNodeRef} style={style}>
      {/* Node Row */}
      <div
        className={`
          flex items-center gap-1 px-2 py-1 rounded-md cursor-pointer
          hover:bg-accent/50 transition-colors
          ${isSelected ? 'bg-accent' : ''}
        `}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        {...attributes}
        {...listeners}
      >
        {/* Expand/Collapse Icon */}
        {isFolder && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFolder(node.id);
            }}
            className="p-0.5 hover:bg-accent rounded"
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        )}

        {/* File/Folder Icon */}
        <span className="text-base" onClick={handleClick}>
          {getFileIcon(node)}
        </span>

        {/* Name */}
        {isRenaming ? (
          <Input
            value={renameName}
            onChange={(e) => setRenameName(e.target.value)}
            onBlur={handleRename}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleRename();
              if (e.key === 'Escape') {
                setIsRenaming(false);
                setRenameName(node.name);
              }
            }}
            className="h-6 text-sm flex-1"
            autoFocus
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <span
            className="text-sm flex-1 truncate"
            onClick={handleClick}
          >
            {node.name}
          </span>
        )}

        {/* Actions Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {isFolder && (
              <>
                <DropdownMenuItem onClick={() => onAddChild(node.id, 'file')}>
                  <FilePlus className="h-4 w-4 mr-2" />
                  New File
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onAddChild(node.id, 'folder')}>
                  <FolderPlus className="h-4 w-4 mr-2" />
                  New Folder
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            )}
            <DropdownMenuItem onClick={() => setIsRenaming(true)}>
              <Edit2 className="h-4 w-4 mr-2" />
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete} className="text-destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Children */}
      {isFolder && isExpanded && node.children && (
        <div>
          {node.children.map((child) => (
            <FileTreeNode
              key={child.id}
              node={child}
              level={level + 1}
              onAddChild={onAddChild}
            />
          ))}
        </div>
      )}
    </div>
  );
}
