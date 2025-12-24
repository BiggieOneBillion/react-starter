import { TemplateDefinition } from './types';

export const fileTemplates: TemplateDefinition[] = [
  {
    id: 'react-component-ts',
    name: 'React Component (TypeScript)',
    description: 'Functional React component with TypeScript',
    language: 'typescript',
    category: 'component',
    content: `import React from 'react';

interface {{ComponentName}}Props {
  // Add your props here
}

export default function {{ComponentName}}({ }: {{ComponentName}}Props) {
  return (
    <div>
      <h1>{{ComponentName}}</h1>
    </div>
  );
}
`
  },
  {
    id: 'react-component',
    name: 'React Component (JavaScript)',
    description: 'Functional React component with JavaScript',
    language: 'javascript',
    category: 'component',
    content: `import React from 'react';

export default function {{ComponentName}}({ }) {
  return (
    <div>
      <h1>{{ComponentName}}</h1>
    </div>
  );
}
`
  },
  {
    id: 'api-route-ts',
    name: 'API Route (TypeScript)',
    description: 'Next.js API route with TypeScript',
    language: 'typescript',
    category: 'api',
    content: `import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Your GET logic here
    return NextResponse.json({ message: 'Success' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Your POST logic here
    return NextResponse.json({ message: 'Created' }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Bad Request' },
      { status: 400 }
    );
  }
}
`
  },
  {
    id: 'typescript-interface',
    name: 'TypeScript Interface',
    description: 'TypeScript type definitions',
    language: 'typescript',
    category: 'utility',
    content: `export interface {{InterfaceName}} {
  id: string;
  name: string;
  // Add more properties here
}

export type {{TypeName}} = {
  // Add type definition here
};
`
  },
  {
    id: 'utility-function',
    name: 'Utility Function',
    description: 'Reusable utility function',
    language: 'typescript',
    category: 'utility',
    content: `/**
 * {{FunctionDescription}}
 * @param param - Description of parameter
 * @returns Description of return value
 */
export function {{functionName}}(param: any): any {
  // Your implementation here
  return param;
}
`
  },
  {
    id: 'test-file',
    name: 'Test File',
    description: 'Jest/Vitest test file',
    language: 'typescript',
    category: 'test',
    content: `import { describe, it, expect } from 'vitest';
import { {{functionName}} } from './{{fileName}}';

describe('{{functionName}}', () => {
  it('should work correctly', () => {
    // Arrange
    const input = 'test';
    
    // Act
    const result = {{functionName}}(input);
    
    // Assert
    expect(result).toBeDefined();
  });
});
`
  },
  {
    id: 'config-file',
    name: 'Configuration File',
    description: 'JSON configuration file',
    language: 'json',
    category: 'config',
    content: `{
  "name": "{{configName}}",
  "version": "1.0.0",
  "description": "Configuration file"
}
`
  },
  {
    id: 'empty',
    name: 'Empty File',
    description: 'Blank file',
    language: 'plaintext',
    category: 'utility',
    content: ''
  }
];

// Helper function to apply template with variables
export function applyTemplate(
  template: string,
  variables: Record<string, string>
): string {
  let result = template;
  
  Object.entries(variables).forEach(([key, value]) => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    result = result.replace(regex, value);
  });
  
  return result;
}

// Helper function to get file language from extension
export function getLanguageFromExtension(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase();
  
  const languageMap: Record<string, string> = {
    'ts': 'typescript',
    'tsx': 'typescript',
    'js': 'javascript',
    'jsx': 'javascript',
    'json': 'json',
    'css': 'css',
    'scss': 'scss',
    'html': 'html',
    'md': 'markdown',
    'yml': 'yaml',
    'yaml': 'yaml',
    'xml': 'xml',
    'sql': 'sql',
    'sh': 'shell',
    'bash': 'shell',
  };
  
  return languageMap[ext || ''] || 'plaintext';
}

// Helper function to get icon for file type
export function getFileIcon(node: { type: 'file' | 'folder'; name: string }): string {
  if (node.type === 'folder') {
    return '📁';
  }
  
  const ext = node.name.split('.').pop()?.toLowerCase();
  
  const iconMap: Record<string, string> = {
    'ts': '🔷',
    'tsx': '⚛️',
    'js': '🟨',
    'jsx': '⚛️',
    'json': '📋',
    'css': '🎨',
    'scss': '🎨',
    'html': '🌐',
    'md': '📝',
    'yml': '⚙️',
    'yaml': '⚙️',
    'xml': '📄',
    'sql': '🗄️',
    'sh': '⚡',
    'bash': '⚡',
    'png': '🖼️',
    'jpg': '🖼️',
    'jpeg': '🖼️',
    'gif': '🖼️',
    'svg': '🎨',
  };
  
  return iconMap[ext || ''] || '📄';
}
