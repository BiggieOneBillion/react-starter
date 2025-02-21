import { join } from "path";
import fsExtra from "fs-extra";
import {
  axiosSetUp,
  fetchSetUp,
  reactSetUpInit,
  shadcnSetUp,
  swrSetUp,
  tailwindSetUp,
  tanstackQuerySetUp,
} from "./react-setup-utils";

import {
  axiosSetUp as axiosTsSetUp,
  fetchSetUp as fetchTsSetUp,
  reactSetUpInit as reactTsSetUpInit,
  shadcnSetUp as shadcnTsSetUp,
  swrSetUp as swrTsSetUp,
  tailwindSetUp as tailwindTsSetUp,
  tanstackQuerySetUp as tanstackQueryTsSetUp,
} from "./react-ts-setup-utils";

const { writeFileSync, appendFileSync, existsSync, removeSync } = fsExtra;

type Icustomise = {
  options: {
    router: string;
    styling: string;
    uiLibrary: string;
    stateManagement: string;
    iconsLibrary: string;
    dataFetching: string;
    serverState: string;
    formManagement: string;
    toastLibrary: string;
    projectName: string;
  };
  projectDir: string;
};

export function customizeProjectJs({ projectDir, options }: Icustomise) {
  const {
    dataFetching,
    iconsLibrary,
    router,
    stateManagement,
    styling,
    uiLibrary,
    serverState,
    formManagement,
    projectName,
  } = options;

  const dependencies: string[] = [];
  const tempDir = join(projectDir, ".setup-temp");

  // Create temp directory to track progress
  if (!existsSync(tempDir)) {
    fsExtra.ensureDirSync(tempDir);
  }

  // Handle interruption (Ctrl+C)
  process.on("SIGINT", () => {
    console.log("\nSetup cancelled by the user.");
    cleanupTemp(tempDir);
    removeSync(projectDir);
    process.exit(1); // Exit gracefully
  });

  // Create folders
  const pagesDir = join(projectDir, "src/pages");
  const componentDir = join(projectDir, "src/components");
  const layoutDir = join(projectDir, "src/layout");
  const routerDir = join(projectDir, "src/router");
  const contextDir = join(projectDir, "src/context");
  const apiDir = join(projectDir, "src/api");
  const libDir = join(projectDir, "src/lib");
  const providerDir = join(projectDir, "src/providers");
  // const packageJson = join(projectDir, "package.tson");
  fsExtra.ensureDirSync(pagesDir);
  fsExtra.ensureDirSync(componentDir);
  fsExtra.ensureDirSync(layoutDir);
  fsExtra.ensureDirSync(routerDir);
  fsExtra.ensureDirSync(contextDir);
  fsExtra.ensureDirSync(apiDir);
  fsExtra.ensureDirSync(libDir);
  fsExtra.ensureDirSync(providerDir);

  // Add router setup
  if (router === "React-router") {
    reactSetUpInit(
      dependencies,
      projectDir,
      routerDir,
      layoutDir,
      componentDir,
      pagesDir
    );
  }

  // Add Tailwind CSS setup or styled-components
  if (styling === "tailwindcss") {
    tailwindSetUp(dependencies, projectDir);
  } else if (styling === "Styled-components") {
    dependencies.push("styled-components");
  }

  if (uiLibrary === "shadcn") {
    tailwindSetUp(dependencies, projectDir);
    shadcnSetUp(dependencies, projectDir, libDir);
  }

  // Add Redux setup
  if (stateManagement === "redux") {
    dependencies.push("@reduxjs/toolkit", "react-redux");
    writeFileSync(join(projectDir, "src/store.js"), "// Redux store setup...");
  } else if (stateManagement === "zustand") {
    dependencies.push("zustand");
    writeFileSync(
      join(projectDir, "src/store.js"),
      "// Zustand store setup..."
    );
  }

  // add icons library
  if (iconsLibrary === "react-icon") {
    dependencies.push("react-icons");
  } else if (iconsLibrary === "lucide") {
    dependencies.push("lucide-react");
  }

  // add data fetching library
  if (serverState === "tanstack-qwery") {
    tanstackQuerySetUp(dependencies, projectDir, providerDir);
  } else if (serverState === "swr") {
    swrSetUp(dependencies, projectDir, providerDir);
  }

  // add data fetching library
  if (dataFetching === "axios") {
    // axios setUp
    axiosSetUp(dependencies, apiDir);
  } else if (dataFetching === "fetch") {
    fetchSetUp(apiDir);
  }

  // add form Management
  if (formManagement === "react-hook-form") {
    // add the react-hook-form-depencies
    dependencies.push("react-hook-form");
  } else if (formManagement === "formik") {
    // add the setup for formik form
    dependencies.push("formik --save");
  }

  // add toast library

  // Append custom instructions to README.md
  appendFileSync(join(projectDir, "README.md"), "\n## Customizations\n");
  appendFileSync(join(projectDir, "README.md"), `- Router: ${router}\n`);
  appendFileSync(join(projectDir, "README.md"), `- Styling: ${styling}\n`);
  appendFileSync(join(projectDir, "README.md"), `- UI Library: ${uiLibrary}\n`);
  appendFileSync(
    join(projectDir, "README.md"),
    `- State Management: ${stateManagement}\n`
  );

  // Install dependencies
  if (dependencies.length) {
    const list: Map<string, string> = new Map();
    list.set("react", "^18.3.1");
    list.set("react-dom", "^18.3.1");
    for (let i = 0; i < dependencies.length; i++) {
      list.set(dependencies[i], "latest");
    }
    const packageJsonContent = `
        {
          "name": "${projectName}",
          "private": true,
          "version": "0.0.0",
          "type": "module",
          "scripts": {
            "dev": "vite",
            "build": "vite build",
            "lint": "eslint .",
            "preview": "vite preview"
          },
          "dependencies": ${JSON.stringify(Object.fromEntries(list))},
          "devDependencies": {
            "@eslint/js": "^9.15.0",
            "@types/react": "^18.3.12",
            "@types/react-dom": "^18.3.1",
            "@vitejs/plugin-react-swc": "^3.5.0",
            "eslint": "^9.15.0",
            "eslint-plugin-react": "^7.37.2",
            "eslint-plugin-react-hooks": "^5.0.0",
            "eslint-plugin-react-refresh": "^0.4.14",
            "globals": "^15.12.0",
            "vite": "^6.0.1"
          }
        }
      `;
    writeFileSync(join(projectDir, "package.json"), packageJsonContent);

    // README with dependencies documentation
    const dependencyDocs = `
    # ${projectName}
    
    ## Dependencies Documentation
    
    ### Core Dependencies
    - [React](https://react.dev/) - A JavaScript library for building user interfaces
    - [React DOM](https://react.dev/reference/react-dom) - React package for working with the DOM
    
    ${styling === 'tailwindcss' ? `### Styling
    - [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
    ` : styling === 'Styled-components' ? `### Styling
    - [Styled Components](https://styled-components.com/) - Visual primitives for the component age
    ` : ''}
    
    ${router === 'React-router' ? `### Routing
    - [React Router](https://reactrouter.com/) - Declarative routing for React applications
    ` : ''}
    
    ${stateManagement === 'redux' ? `### State Management
    - [Redux Toolkit](https://redux-toolkit.js.org/) - The official, opinionated toolset for Redux development
    - [React Redux](https://react-redux.js.org/) - Official React bindings for Redux
    ` : stateManagement === 'zustand' ? `### State Management
    - [Zustand](https://zustand-demo.pmnd.rs/) - A small, fast, and scalable state management solution
    ` : ''}
    
    ${serverState === 'tanstack-qwery' ? `### Server State Management
    - [TanStack Query](https://tanstack.com/query/latest) - Powerful asynchronous state management
    ` : serverState === 'swr' ? `### Server State Management
    - [SWR](https://swr.vercel.app/) - React Hooks for Data Fetching
    ` : ''}
    
    ${dataFetching === 'axios' ? `### Data Fetching
    - [Axios](https://axios-http.com/) - Promise based HTTP client
    ` : ''}
    
    ${formManagement === 'react-hook-form' ? `### Form Management
    - [React Hook Form](https://react-hook-form.com/) - Performant, flexible and extensible forms
    ` : formManagement === 'formik' ? `### Form Management
    - [Formik](https://formik.org/) - Build forms in React without tears
    ` : ''}
    
    ${iconsLibrary === 'react-icon' ? `### Icons
    - [React Icons](https://react-icons.github.io/react-icons/) - Popular icons in one package
    ` : iconsLibrary === 'lucide' ? `### Icons
    - [Lucide React](https://lucide.dev/) - Beautiful & consistent icons
    ` : ''}
    
    ${uiLibrary === 'shadcn' ? `### UI Components
    - [shadcn/ui](https://ui.shadcn.com/) - Re-usable components built with Radix UI and Tailwind CSS
    ` : ''}
    
    ## Development Dependencies
    - [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
    - [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types
    - [ESLint](https://eslint.org/) - Pluggable JavaScript linter
    
    ## Getting Started
    
    1. Install dependencies:
    \`\`\`bash
    npm install
    \`\`\`
    
    2. Start development server:
    \`\`\`bash
    npm run dev
    \`\`\`
    
    3. Build for production:
    \`\`\`bash
    npm run build
    \`\`\`
    `;
    
    writeFileSync(join(projectDir, "README.md"), dependencyDocs);

    cleanupTemp(tempDir);
  }
}

export function customizeProjectTS({ projectDir, options }: Icustomise) {
  const {
    dataFetching,
    iconsLibrary,
    router,
    stateManagement,
    styling,
    uiLibrary,
    serverState,
    formManagement,
    projectName,
  } = options;

  const dependencies: string[] = [];
  const tempDir = join(projectDir, ".setup-temp");

  // Create temp directory to track progress
  if (!existsSync(tempDir)) {
    fsExtra.ensureDirSync(tempDir);
  }

  // Handle interruption (Ctrl+C)
  process.on("SIGINT", () => {
    console.log("\nSetup cancelled by the user.");
    cleanupTemp(tempDir);
    removeSync(projectDir);
    process.exit(1); // Exit gracefully
  });

  // Create folders
  const pagesDir = join(projectDir, "src/pages");
  const componentDir = join(projectDir, "src/components");
  const layoutDir = join(projectDir, "src/layout");
  const routerDir = join(projectDir, "src/router");
  const contextDir = join(projectDir, "src/context");
  const apiDir = join(projectDir, "src/api");
  const libDir = join(projectDir, "src/lib");
  const providerDir = join(projectDir, "src/providers");
  // const packageJson = join(projectDir, "package.json");
  fsExtra.ensureDirSync(pagesDir);
  fsExtra.ensureDirSync(componentDir);
  fsExtra.ensureDirSync(layoutDir);
  fsExtra.ensureDirSync(routerDir);
  fsExtra.ensureDirSync(contextDir);
  fsExtra.ensureDirSync(apiDir);
  fsExtra.ensureDirSync(libDir);
  fsExtra.ensureDirSync(providerDir);

  // Add router setup
  if (router === "React-router") {
    reactTsSetUpInit(
      dependencies,
      projectDir,
      routerDir,
      layoutDir,
      componentDir,
      pagesDir
    );
  }

  // Add Tailwind CSS setup or styled-components
  if (styling === "tailwindcss") {
    tailwindTsSetUp(dependencies, projectDir);
  } else if (styling === "Styled-components") {
    dependencies.push("styled-components");
  }

  if (uiLibrary === "shadcn") {
    tailwindTsSetUp(dependencies, projectDir);
    shadcnTsSetUp(dependencies, projectDir, libDir);
  }

  // Add Redux setup
  if (stateManagement === "redux") {
    dependencies.push("@reduxjs/toolkit", "react-redux");
    writeFileSync(join(projectDir, "src/store.ts"), "// Redux store setup...");
  } else if (stateManagement === "zustand") {
    dependencies.push("zustand");
    writeFileSync(
      join(projectDir, "src/store.ts"),
      "// Zustand store setup..."
    );
  }

  // add icons library
  if (iconsLibrary === "react-icon") {
    dependencies.push("react-icons");
  } else if (iconsLibrary === "lucide") {
    dependencies.push("lucide-react");
  }

  // add data fetching library
  if (serverState === "tanstack-qwery") {
    tanstackQueryTsSetUp(dependencies, projectDir, providerDir);
  } else if (serverState === "swr") {
    swrTsSetUp(dependencies, projectDir, providerDir);
  }

  // add data fetching library
  if (dataFetching === "axios") {
    // axios setUp
    axiosTsSetUp(dependencies, apiDir);
  } else if (dataFetching === "fetch") {
    fetchTsSetUp(apiDir);
  }

  // add form Management
  if (formManagement === "react-hook-form") {
    // add the react-hook-form-depencies
    dependencies.push("react-hook-form");
  } else if (formManagement === "formik") {
    // add the setup for formik form
    dependencies.push("formik --save");
  }

  // add toast library

  // Append custom instructions to README.md
  appendFileSync(join(projectDir, "README.md"), "\n## Customizations\n");
  appendFileSync(join(projectDir, "README.md"), `- Router: ${router}\n`);
  appendFileSync(join(projectDir, "README.md"), `- Styling: ${styling}\n`);
  appendFileSync(join(projectDir, "README.md"), `- UI Library: ${uiLibrary}\n`);
  appendFileSync(
    join(projectDir, "README.md"),
    `- State Management: ${stateManagement}\n`
  );

  // Install dependencies
  if (dependencies.length) {
    const name = projectName;
    const list: Map<string, string> = new Map();
    list.set("react", "^18.3.1");
    list.set("react-dom", "^18.3.1");
    for (let i = 0; i < dependencies.length; i++) {
      list.set(dependencies[i], "latest");
    }
    const packageJsonContent = `
          {
            "name": "${name}",
            "private": true,
            "version": "0.0.0",
            "type": "module",
            "scripts": {
              "dev": "vite",
              "build": "vite build",
              "lint": "eslint .",
              "preview": "vite preview"
            },
            "dependencies": ${JSON.stringify(Object.fromEntries(list))},
            "devDependencies": {
              "@eslint/js": "^9.15.0",
              "@types/react": "^18.3.12",
              "@types/react-dom": "^18.3.1",
              "@vitejs/plugin-react-swc": "^3.5.0",
              "eslint": "^9.15.0",
              "eslint-plugin-react": "^7.37.2",
              "eslint-plugin-react-hooks": "^5.0.0",
              "eslint-plugin-react-refresh": "^0.4.14",
              "globals": "^15.12.0",
              "vite": "^6.0.1"
            }
          }
        `;
    writeFileSync(join(projectDir, "package.json"), packageJsonContent);

      // Generate detailed README with dependencies documentation
      const dependencyDocs = `
      # ${projectName}
      
      ## Dependencies Documentation
      
      ### Core Dependencies
      - [React](https://react.dev/) - A JavaScript library for building user interfaces
      - [React DOM](https://react.dev/reference/react-dom) - React package for working with the DOM
      
      ${styling === 'tailwindcss' ? `### Styling
      - [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
      ` : styling === 'Styled-components' ? `### Styling
      - [Styled Components](https://styled-components.com/) - Visual primitives for the component age
      ` : ''}
      
      ${router === 'React-router' ? `### Routing
      - [React Router](https://reactrouter.com/) - Declarative routing for React applications
      ` : ''}
      
      ${stateManagement === 'redux' ? `### State Management
      - [Redux Toolkit](https://redux-toolkit.js.org/) - The official, opinionated toolset for Redux development
      - [React Redux](https://react-redux.js.org/) - Official React bindings for Redux
      ` : stateManagement === 'zustand' ? `### State Management
      - [Zustand](https://zustand-demo.pmnd.rs/) - A small, fast, and scalable state management solution
      ` : ''}
      
      ${serverState === 'tanstack-qwery' ? `### Server State Management
      - [TanStack Query](https://tanstack.com/query/latest) - Powerful asynchronous state management
      ` : serverState === 'swr' ? `### Server State Management
      - [SWR](https://swr.vercel.app/) - React Hooks for Data Fetching
      ` : ''}
      
      ${dataFetching === 'axios' ? `### Data Fetching
      - [Axios](https://axios-http.com/) - Promise based HTTP client
      ` : ''}
      
      ${formManagement === 'react-hook-form' ? `### Form Management
      - [React Hook Form](https://react-hook-form.com/) - Performant, flexible and extensible forms
      ` : formManagement === 'formik' ? `### Form Management
      - [Formik](https://formik.org/) - Build forms in React without tears
      ` : ''}
      
      ${iconsLibrary === 'react-icon' ? `### Icons
      - [React Icons](https://react-icons.github.io/react-icons/) - Popular icons in one package
      ` : iconsLibrary === 'lucide' ? `### Icons
      - [Lucide React](https://lucide.dev/) - Beautiful & consistent icons
      ` : ''}
      
      ${uiLibrary === 'shadcn' ? `### UI Components
      - [shadcn/ui](https://ui.shadcn.com/) - Re-usable components built with Radix UI and Tailwind CSS
      ` : ''}
      
      ## Development Dependencies
      - [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
      - [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types
      - [ESLint](https://eslint.org/) - Pluggable JavaScript linter
      
      ## Getting Started
      
      1. Install dependencies:
      \`\`\`bash
      npm install
      \`\`\`
      
      2. Start development server:
      \`\`\`bash
      npm run dev
      \`\`\`
      
      3. Build for production:
      \`\`\`bash
      npm run build
      \`\`\`
      `;
      
      writeFileSync(join(projectDir, "README.md"), dependencyDocs);

    cleanupTemp(tempDir);
  }
}

function cleanupTemp(tempDir: string) {
  if (fsExtra.existsSync(tempDir)) {
    fsExtra.removeSync(tempDir);
    console.log("Cleaned up temporary files.");
  }
}
