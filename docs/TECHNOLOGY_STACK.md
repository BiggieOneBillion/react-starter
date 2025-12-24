# Technology Stack

This document provides a comprehensive overview of all technologies, libraries, and tools used in the React Template Generator application.

## 🎯 Core Framework

### Next.js 14.2.16
- **Purpose**: Full-stack React framework
- **Why**: Provides server-side rendering, API routes, and excellent developer experience
- **Features Used**:
  - App Router for modern routing
  - API Routes for backend logic
  - Server Components for optimized performance
  - File-based routing

**Documentation**: [https://nextjs.org/](https://nextjs.org/)

---

## ⚛️ Frontend Technologies

### React 18
- **Purpose**: UI library for building user interfaces
- **Why**: Industry-standard library with excellent ecosystem
- **Features Used**:
  - Hooks (useState, useEffect, etc.)
  - Component composition
  - Form handling

**Documentation**: [https://react.dev/](https://react.dev/)

### TypeScript 5
- **Purpose**: Static type checking
- **Why**: Provides type safety, better IDE support, and reduces runtime errors
- **Benefits**:
  - Catch errors at compile time
  - Better code documentation
  - Enhanced IDE autocomplete

**Documentation**: [https://www.typescriptlang.org/](https://www.typescriptlang.org/)

---

## 🎨 Styling & UI

### Tailwind CSS 3.4.1
- **Purpose**: Utility-first CSS framework
- **Why**: Rapid UI development with consistent design system
- **Configuration**: Custom theme with CSS variables for colors
- **Features Used**:
  - Custom color palette (HSL-based)
  - Responsive design utilities
  - Dark mode support (class-based)
  - Custom border radius variables

**Documentation**: [https://tailwindcss.com/](https://tailwindcss.com/)

### PostCSS 8
- **Purpose**: CSS transformation tool
- **Why**: Required by Tailwind CSS for processing styles
- **Usage**: Configured via `postcss.config.mjs`

**Documentation**: [https://postcss.org/](https://postcss.org/)

### tailwindcss-animate 1.0.7
- **Purpose**: Animation utilities for Tailwind
- **Why**: Provides pre-built animation classes
- **Features**: Fade, slide, spin, and other animations

**Documentation**: [https://github.com/jamiebuilds/tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate)

### ShadCN UI
- **Purpose**: Re-usable component library
- **Why**: High-quality, accessible components built with Radix UI
- **Components Used**:
  - Alert Dialog
  - Button
  - Form
  - Input
  - Label
  - Select

**Documentation**: [https://ui.shadcn.com/](https://ui.shadcn.com/)

### Radix UI
- **Purpose**: Unstyled, accessible UI primitives
- **Why**: Foundation for ShadCN components
- **Packages Used**:
  - `@radix-ui/react-alert-dialog` (1.1.6)
  - `@radix-ui/react-label` (2.1.1)
  - `@radix-ui/react-select` (2.1.3)
  - `@radix-ui/react-slot` (1.1.2)

**Documentation**: [https://www.radix-ui.com/](https://www.radix-ui.com/)

### Lucide React 0.468.0
- **Purpose**: Icon library
- **Why**: Beautiful, consistent icons with React components
- **Usage**: Icons throughout the UI

**Documentation**: [https://lucide.dev/](https://lucide.dev/)

---

## 📝 Form Management

### React Hook Form 7.54.1
- **Purpose**: Form state management and validation
- **Why**: Performant, minimal re-renders, excellent DX
- **Features Used**:
  - Form state management
  - Field validation
  - Error handling
  - Integration with Zod

**Documentation**: [https://react-hook-form.com/](https://react-hook-form.com/)

### Zod 3.24.1
- **Purpose**: Schema validation
- **Why**: TypeScript-first validation with excellent type inference
- **Usage**: Form validation schemas
- **Integration**: Works seamlessly with React Hook Form via `@hookform/resolvers`

**Documentation**: [https://zod.dev/](https://zod.dev/)

### @hookform/resolvers 3.9.1
- **Purpose**: Validation resolver for React Hook Form
- **Why**: Bridges React Hook Form with Zod validation
- **Usage**: Connects Zod schemas to form validation

**Documentation**: [https://github.com/react-hook-form/resolvers](https://github.com/react-hook-form/resolvers)

---

## 🌐 HTTP & Data Fetching

### Axios 1.7.9
- **Purpose**: HTTP client
- **Why**: Feature-rich, promise-based HTTP client
- **Usage**: API calls for project generation
- **Features**: Request/response interceptors, automatic JSON transformation

**Documentation**: [https://axios-http.com/](https://axios-http.com/)

---

## 🔔 Notifications

### Sonner 1.7.1
- **Purpose**: Toast notification library
- **Why**: Beautiful, accessible toast notifications
- **Features**: Success, error, and info notifications
- **Usage**: User feedback for form submissions and downloads

**Documentation**: [https://sonner.emilkowal.ski/](https://sonner.emilkowal.ski/)

---

## 🛠️ Utilities

### clsx 2.1.1
- **Purpose**: Conditional className utility
- **Why**: Simplifies conditional CSS class application
- **Usage**: Dynamic className generation

**Documentation**: [https://github.com/lukeed/clsx](https://github.com/lukeed/clsx)

### tailwind-merge 2.5.5
- **Purpose**: Merge Tailwind CSS classes
- **Why**: Prevents conflicting Tailwind classes
- **Usage**: Combined with clsx in utility function (`cn`)

**Documentation**: [https://github.com/dcastil/tailwind-merge](https://github.com/dcastil/tailwind-merge)

### class-variance-authority 0.7.1
- **Purpose**: Component variant management
- **Why**: Type-safe variant props for components
- **Usage**: ShadCN component variants

**Documentation**: [https://cva.style/](https://cva.style/)

---

## 📦 File System & Archiving

### fs-extra 11.2.0
- **Purpose**: Enhanced file system operations
- **Why**: Extends Node.js fs module with promise support
- **Features Used**:
  - `copySync` - Copy template files
  - `ensureDirSync` - Create directories
  - `writeFileSync` - Write generated files
  - `removeSync` - Clean up temporary files

**Documentation**: [https://github.com/jprichardson/node-fs-extra](https://github.com/jprichardson/node-fs-extra)

### Archiver 7.0.1
- **Purpose**: Create ZIP archives
- **Why**: Package generated projects for download
- **Usage**: Create downloadable ZIP files of generated projects

**Documentation**: [https://www.archiverjs.com/](https://www.archiverjs.com/)

### file-saver 2.0.5
- **Purpose**: Client-side file saving
- **Why**: Trigger file downloads in the browser
- **Usage**: Download generated ZIP files

**Documentation**: [https://github.com/eligrey/FileSaver.js](https://github.com/eligrey/FileSaver.js)

---

## 🔧 Development Tools

### ESLint 8
- **Purpose**: JavaScript/TypeScript linting
- **Why**: Enforce code quality and consistency
- **Configuration**: Next.js recommended config
- **Config File**: `.eslintrc.json`

**Documentation**: [https://eslint.org/](https://eslint.org/)

### eslint-config-next 14.2.16
- **Purpose**: Next.js ESLint configuration
- **Why**: Pre-configured rules for Next.js projects
- **Features**: React, accessibility, and Next.js specific rules

**Documentation**: [https://nextjs.org/docs/basic-features/eslint](https://nextjs.org/docs/basic-features/eslint)

### ignore-loader 0.1.2
- **Purpose**: Webpack loader to ignore files
- **Why**: Exclude template files from Next.js compilation
- **Usage**: Prevents template files in `api/templates` from being processed
- **Configuration**: Custom webpack config in `next.config.mjs`

**Documentation**: [https://www.npmjs.com/package/ignore-loader](https://www.npmjs.com/package/ignore-loader)

---

## 📘 TypeScript Type Definitions

The project includes TypeScript type definitions for libraries that don't include them:

- `@types/node` (^20) - Node.js types
- `@types/react` (^18) - React types
- `@types/react-dom` (^18) - React DOM types
- `@types/archiver` (^6.0.3) - Archiver types
- `@types/file-saver` (^2.0.7) - FileSaver types
- `@types/fs-extra` (^11.0.4) - fs-extra types

---

## 🏗️ Build Configuration

### next.config.mjs
Custom Next.js configuration:
```javascript
{
  webpack(config) {
    // Ignore template files from compilation
    config.module.rules.push({
      test: /api\/templates/,
      loader: 'ignore-loader',
    });
    return config;
  }
}
```

### tailwind.config.ts
Custom Tailwind configuration:
- Dark mode support (class-based)
- Custom color system using CSS variables
- Extended theme with custom border radius
- Animation plugin

### tsconfig.json
TypeScript configuration:
- Strict type checking
- Path aliases support
- Next.js specific settings

### components.json
ShadCN UI configuration:
- Component style: default
- Base color: slate
- CSS variables: true
- Tailwind prefix: none

---

## 📊 Project Structure

```
react-boilerplate-next-js/
├── app/                          # Next.js app directory
│   ├── (home)/                   # Home route group
│   │   ├── _components/          # Home page components
│   │   └── data.tsx              # Configuration options data
│   ├── api/                      # API routes
│   │   ├── react/                # React generation endpoint
│   │   ├── templates/            # Base templates (ignored by webpack)
│   │   ├── react-setup.ts        # Project setup logic
│   │   ├── react-setup-utils.ts  # JS setup utilities
│   │   ├── react-ts-setup-utils.ts # TS setup utilities
│   │   └── utils.ts              # General utilities
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Root page
├── components/                   # Shared components
│   └── ui/                       # ShadCN UI components
├── lib/                          # Utility functions
├── docs/                         # Documentation (this folder)
├── next.config.mjs               # Next.js configuration
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
├── components.json               # ShadCN configuration
└── package.json                  # Dependencies
```

---

## 🔄 Generated Project Technologies

The application can generate projects with the following technology combinations:

### Language Options
- JavaScript (ES6+)
- TypeScript

### Build Tool
- Vite 6.0.1 (for all generated projects)

### Styling Options
- Tailwind CSS
- Styled Components

### UI Library Options
- ShadCN UI
- None

### Icon Library Options
- React Icons
- Lucide React

### State Management Options
- Redux Toolkit + React Redux
- Zustand

### Server State Options
- TanStack Query (React Query)
- SWR

### Data Fetching Options
- Axios
- Fetch API

### Validation Options
- Zod
- Joi

### Form Management Options
- React Hook Form
- Formik

### Toast Library Options
- React Toastify
- Sonner

### Routing Options
- React Router

---

## 🎯 Technology Decisions

### Why Next.js?
- **Full-stack**: API routes eliminate need for separate backend
- **Performance**: Server components and optimizations
- **Developer Experience**: Hot reload, TypeScript support
- **Production Ready**: Built-in optimizations

### Why TypeScript?
- **Type Safety**: Catch errors early
- **Better DX**: Autocomplete and IntelliSense
- **Maintainability**: Self-documenting code

### Why Tailwind CSS?
- **Rapid Development**: Utility classes speed up styling
- **Consistency**: Design system built-in
- **Customization**: Easy to customize via config

### Why ShadCN UI?
- **Ownership**: Components are copied to project (not npm dependency)
- **Customization**: Full control over component code
- **Quality**: Built on Radix UI (accessibility)
- **Styling**: Uses Tailwind (consistent with project)

### Why React Hook Form + Zod?
- **Performance**: Minimal re-renders
- **Type Safety**: Zod provides runtime and compile-time validation
- **Developer Experience**: Simple API, great TypeScript support

---

## 📚 Learning Resources

For developers new to these technologies, here are recommended learning paths:

1. **Next.js**: [Next.js Tutorial](https://nextjs.org/learn)
2. **React**: [React Documentation](https://react.dev/learn)
3. **TypeScript**: [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
4. **Tailwind CSS**: [Tailwind CSS Documentation](https://tailwindcss.com/docs)
5. **React Hook Form**: [React Hook Form Get Started](https://react-hook-form.com/get-started)
6. **Zod**: [Zod Documentation](https://zod.dev/)
