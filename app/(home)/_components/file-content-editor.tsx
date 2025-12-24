'use client';

import React from 'react';
import Editor from '@monaco-editor/react';
import { useProjectStore } from '@/lib/store';
import { getLanguageFromExtension } from '@/lib/templates';
import { Button } from '@/components/ui/button';
import { Save, X } from 'lucide-react';

export function FileContentEditor() {
  const { selectedFile, updateFileContent, setSelectedFile } = useProjectStore();

  if (!selectedFile || selectedFile.type !== 'file') {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        <p className="text-sm">Select a file to edit</p>
      </div>
    );
  }

  const language = selectedFile.language || getLanguageFromExtension(selectedFile.name);

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      updateFileContent(selectedFile.id, value);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-2 border-b bg-muted/50">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{selectedFile.name}</span>
          <span className="text-xs text-muted-foreground">({language})</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setSelectedFile(null)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-hidden">
        <Editor
          height="100%"
          language={language}
          value={selectedFile.content || ''}
          onChange={handleEditorChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on',
          }}
        />
      </div>
    </div>
  );
}
