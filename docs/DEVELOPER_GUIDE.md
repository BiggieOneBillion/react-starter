# Developer Guide

This guide will help you understand, set up, and contribute to the React Template Generator project.

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 20 or higher
- **npm**: Version 9 or higher (comes with Node.js)
- **Git**: For version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/BiggieOneBillion/react-starter.git
   cd react-boilerplate-next-js
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure Explained

### Root Level Files

```
react-boilerplate-next-js/
├── .eslintrc.json          # ESLint configuration
├── .gitignore              # Git ignore rules
├── components.json         # ShadCN UI configuration
├── next.config.mjs         # Next.js configuration
├── package.json            # Project dependencies
├── postcss.config.mjs      # PostCSS configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project overview
```

### App Directory (`app/`)

```
app/
├── (home)/                 # Home route group
│   ├── _components/        # Private components
│   │   ├── form-option.tsx          # Main form component
│   │   ├── header.tsx               # Page header
│   │   ├── home.tsx                 # Home layout
│   │   ├── result-alert-dialog.tsx  # Success dialog
│   │   └── show-user-values.tsx     # Preview component
│   └── data.tsx            # Configuration options
├── api/                    # API routes
│   ├── react/              # Project generation endpoint
│   │   └── route.ts        # POST handler
│   ├── templates/          # Base templates
│   │   ├── basic/          # JavaScript template
│   │   └── basic-ts/       # TypeScript template
│   ├── react-setup.ts      # Main setup logic
│   ├── react-setup-utils.ts      # JS utilities
│   ├── react-ts-setup-utils.ts   # TS utilities
│   └── utils.ts            # Core utilities
├── globals.css             # Global styles
├── layout.tsx              # Root layout
└── page.tsx                # Root page
```

### Components Directory (`components/`)

```
components/
└── ui/                     # ShadCN UI components
    ├── alert-dialog.tsx    # Alert dialog component
    ├── button.tsx          # Button component
    ├── form.tsx            # Form components
    ├── input.tsx           # Input component
    ├── label.tsx           # Label component
    └── select.tsx          # Select component
```

### Library Directory (`lib/`)

```
lib/
└── utils.ts                # Utility functions (cn helper)
```

---

## 🔧 Configuration Files

### Next.js Configuration (`next.config.mjs`)

```javascript
const nextConfig = {
  webpack(config) {
    // Ignore template files from compilation
    config.module.rules.push({
      test: /api\/templates/,
      loader: 'ignore-loader',
    });
    return config;
  },
};
```

**Purpose**: Prevents Next.js from compiling template files in `api/templates/`

### Tailwind Configuration (`tailwind.config.ts`)

```typescript
const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        // ... more colors
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
```

**Purpose**: Configures Tailwind with custom colors using CSS variables

### TypeScript Configuration (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

**Key Settings**:
- `strict: true` - Enables all strict type checking
- `paths` - Allows `@/` imports
- `jsx: preserve` - Lets Next.js handle JSX

---

## 🎨 Styling Guide

### CSS Variables

Global styles are defined in `app/globals.css`:

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    /* ... more variables */
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* ... dark mode overrides */
  }
}
```

### Using Tailwind Classes

```tsx
// Use semantic color names
<div className="bg-background text-foreground">
  <button className="bg-primary text-primary-foreground">
    Click me
  </button>
</div>
```

### The `cn()` Utility

Located in `lib/utils.ts`:

```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Usage**:
```tsx
import { cn } from "@/lib/utils"

<div className={cn(
  "base-classes",
  condition && "conditional-classes",
  "more-classes"
)}>
```

---

## 🧩 Component Development

### Creating a New Component

1. **Create the component file**
   ```tsx
   // app/(home)/_components/my-component.tsx
   import React from 'react';
   
   interface MyComponentProps {
     title: string;
     description?: string;
   }
   
   export default function MyComponent({ title, description }: MyComponentProps) {
     return (
       <div className="p-4 border rounded-md">
         <h2 className="text-xl font-bold">{title}</h2>
         {description && <p className="text-muted-foreground">{description}</p>}
       </div>
     );
   }
   ```

2. **Use the component**
   ```tsx
   import MyComponent from './_components/my-component';
   
   export default function Page() {
     return <MyComponent title="Hello" description="World" />;
   }
   ```

### Adding ShadCN Components

```bash
# Install a new ShadCN component
npx shadcn-ui@latest add [component-name]

# Example: Add a dialog component
npx shadcn-ui@latest add dialog
```

This will:
- Add the component to `components/ui/`
- Install required dependencies
- Update `components.json`

---

## 🔌 API Development

### Creating a New API Route

1. **Create the route file**
   ```typescript
   // app/api/my-endpoint/route.ts
   import { NextRequest, NextResponse } from 'next/server';
   
   export async function GET(request: NextRequest) {
     try {
       const data = { message: 'Hello from API' };
       return NextResponse.json(data);
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
       // Process the request
       return NextResponse.json({ success: true });
     } catch (error) {
       return NextResponse.json(
         { error: 'Bad Request' },
         { status: 400 }
       );
     }
   }
   ```

2. **Call the API from frontend**
   ```typescript
   import axios from 'axios';
   
   const response = await axios.post('/api/my-endpoint', {
     data: 'value'
   });
   ```

### Understanding the Project Generation API

The main API route is at `app/api/react/route.ts`:

```typescript
export async function POST(request: Request) {
  // 1. Parse request body
  const options = await request.json();
  
  // 2. Validate inputs (should add Zod validation)
  
  // 3. Determine template
  const templatePath = options.lang === 'ts' ? 'basic-ts' : 'basic';
  
  // 4. Generate project
  await setupProject({
    options,
    templatePath,
    templatesPath
  });
  
  // 5. Create ZIP file
  const zipBuffer = await createZipFile(projectPath);
  
  // 6. Return ZIP
  return new Response(zipBuffer, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="${projectName}.zip"`
    }
  });
}
```

---

## 🛠️ Working with Templates

### Template Structure

Templates are located in `app/api/templates/`:

```
templates/
├── basic/              # JavaScript template
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       └── index.css
└── basic-ts/           # TypeScript template
    ├── index.html
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts
    └── src/
        ├── App.tsx
        ├── main.tsx
        └── index.css
```

### Adding a New Template

1. **Create template directory**
   ```bash
   mkdir app/api/templates/my-template
   ```

2. **Add template files**
   Create your base project structure

3. **Update setup logic**
   ```typescript
   // app/api/react-setup.ts
   const templatePath = options.template === 'my-template' 
     ? 'my-template' 
     : options.lang === 'ts' ? 'basic-ts' : 'basic';
   ```

### Modifying Template Generation

The main customization logic is in `app/api/utils.ts`:

```typescript
export function customizeProjectJs({ projectDir, options }: Icustomise) {
  const dependencies: string[] = [];
  
  // Add your custom logic here
  if (options.myFeature === 'enabled') {
    dependencies.push('my-package');
    // Create files, folders, etc.
  }
  
  // Generate package.json
  writeFileSync(
    join(projectDir, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );
}
```

---

## 📝 Form Development

### Understanding the Form

The main form is in `app/(home)/_components/form-option.tsx`:

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Define schema
const formSchema = z.object({
  projectName: z.string().min(1, "Required"),
  lang: z.enum(['js', 'ts']),
  // ... more fields
});

// Use in component
const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    projectName: "",
    lang: "js",
  },
});
```

### Adding a New Form Field

1. **Update the schema**
   ```typescript
   const formSchema = z.object({
     // ... existing fields
     myNewField: z.string().min(1, "Required"),
   });
   ```

2. **Add to form**
   ```tsx
   <FormField
     control={form.control}
     name="myNewField"
     render={({ field }) => (
       <FormItem>
         <FormLabel>My New Field</FormLabel>
         <Select onValueChange={field.onChange} defaultValue={field.value}>
           <FormControl>
             <SelectTrigger>
               <SelectValue placeholder="Select option" />
             </SelectTrigger>
           </FormControl>
           <SelectContent>
             <SelectItem value="option1">Option 1</SelectItem>
             <SelectItem value="option2">Option 2</SelectItem>
           </SelectContent>
         </Select>
         <FormMessage />
       </FormItem>
     )}
   />
   ```

3. **Update data source**
   ```typescript
   // app/(home)/data.tsx
   export const myNewFieldData = [
     { label: "Option 1", option: "option1" },
     { label: "Option 2", option: "option2" },
   ];
   ```

4. **Handle in API**
   ```typescript
   // app/api/react-setup.ts
   if (options.myNewField === 'option1') {
     // Handle option 1
   }
   ```

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] Form validation works
- [ ] All library combinations generate successfully
- [ ] ZIP file downloads correctly
- [ ] Generated project runs without errors
- [ ] README is generated with correct info
- [ ] package.json has correct dependencies

### Testing a Generated Project

1. **Generate a project** using the UI
2. **Extract the ZIP file**
3. **Navigate to the project**
   ```bash
   cd my-generated-project
   ```
4. **Install dependencies**
   ```bash
   npm install
   ```
5. **Run the project**
   ```bash
   npm run dev
   ```
6. **Verify** it works correctly

---

## 🐛 Debugging

### Common Issues

#### Issue: Template files causing build errors

**Solution**: Ensure `ignore-loader` is configured in `next.config.mjs`

```javascript
webpack(config) {
  config.module.rules.push({
    test: /api\/templates/,
    loader: 'ignore-loader',
  });
  return config;
}
```

#### Issue: Form not submitting

**Solution**: Check browser console for validation errors

```typescript
// Add logging to form submit
const onSubmit = async (data: FormData) => {
  console.log('Form data:', data);
  // ... rest of submit logic
};
```

#### Issue: ZIP file corrupted

**Solution**: Ensure archiver is properly finalized

```typescript
await archive.finalize();
const buffer = await streamToBuffer(archive);
```

### Debugging Tips

1. **Use console.log** liberally during development
2. **Check Network tab** for API request/response
3. **Inspect generated files** in temp directory
4. **Test with minimal options** first, then add complexity
5. **Use TypeScript errors** to catch issues early

---

## 📦 Building for Production

### Build the Application

```bash
npm run build
```

This will:
- Compile TypeScript
- Bundle JavaScript
- Optimize images
- Generate static pages
- Create production build in `.next/`

### Start Production Server

```bash
npm start
```

### Environment Variables

Create a `.env.local` file for environment-specific settings:

```env
# Example environment variables
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

---

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your repository
   - Deploy

### Other Platforms

- **Netlify**: Similar to Vercel
- **Railway**: Supports Next.js
- **DigitalOcean**: Use App Platform
- **AWS**: Use Amplify or EC2

---

## 🤝 Contributing

### Code Style

- **TypeScript**: Use strict mode
- **Components**: Functional components with TypeScript
- **Naming**: PascalCase for components, camelCase for functions
- **Formatting**: Use ESLint rules

### Git Workflow

1. **Create a branch**
   ```bash
   git checkout -b feature/my-feature
   ```

2. **Make changes** and commit
   ```bash
   git add .
   git commit -m "Add: my feature description"
   ```

3. **Push to GitHub**
   ```bash
   git push origin feature/my-feature
   ```

4. **Create Pull Request** on GitHub

### Commit Message Convention

```
Type: Short description

Longer description if needed

Types:
- Add: New feature
- Fix: Bug fix
- Update: Update existing feature
- Refactor: Code refactoring
- Docs: Documentation changes
- Style: Formatting changes
- Test: Adding tests
```

---

## 📚 Additional Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [ShadCN UI Docs](https://ui.shadcn.com)
- [React Hook Form Docs](https://react-hook-form.com)

### Learning Resources
- [Next.js Tutorial](https://nextjs.org/learn)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Tailwind CSS Tutorial](https://tailwindcss.com/docs/utility-first)

---

## 💡 Tips & Best Practices

1. **Keep components small** - Single responsibility principle
2. **Use TypeScript** - Catch errors early
3. **Validate inputs** - Both client and server side
4. **Handle errors gracefully** - User-friendly error messages
5. **Test generated projects** - Ensure they work
6. **Document your code** - Help future developers
7. **Use semantic HTML** - Better accessibility
8. **Optimize images** - Use Next.js Image component
9. **Keep dependencies updated** - Security and features
10. **Follow ESLint rules** - Consistent code style

---

Happy coding! 🎉
