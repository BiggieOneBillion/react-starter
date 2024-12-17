import fsExtra from "fs-extra";
import { join } from "path";

const { writeFileSync } = fsExtra;

export function tailwindSetUp(dependencies: string[], projectDir: string) {
  // Add TailwindCSS-related dependencies
  dependencies.push("tailwindcss", "postcss", "autoprefixer");

  // TailwindCSS configuration file content
  const tailwindConfig = `
    import type { Config } from 'tailwindcss'

    const config: Config = {
      content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
      theme: {
        extend: {},
      },
      plugins: [],
    }

    export default config;
  `;

  // PostCSS configuration file content
  const postcssConfig = `
    export default {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    }
  `;

  // TailwindCSS index settings (CSS file)
  const tailwindIndexSettings = `
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
  `;

  // Write configuration files
  writeFileSync(join(projectDir, "postcss.config.ts"), postcssConfig);
  writeFileSync(join(projectDir, "tailwind.config.ts"), tailwindConfig);
  writeFileSync(join(projectDir, "src/index.css"), tailwindIndexSettings);
}

export function shadcnSetUp(
  dependencies: string[],
  projectDir: string,
  libDir: string
) {
  dependencies.push(
    "tailwindcss-animate",
    "class-variance-authority",
    "clsx",
    "tailwind-merge",
    "lucide-react"
  );

  const jsconfigContent = `
        {
            "compilerOptions": {
                "baseUrl": ".",         
                "paths": {
                "@/*": ["src/*"]      
                },
                "jsx": "react-jsx"       
            },
            "include": [
                "src/**/*"               
            ]
       }
    `;
  const tailwindConfigContent = `
    /** @type {import('tailwindcss').Config} */
    module.exports = {
      darkMode: ["class"],
      content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
      theme: {
        extend: {
          colors: {
            border: "hsl(var(--border))",
            input: "hsl(var(--input))",
            ring: "hsl(var(--ring))",
            background: "hsl(var(--background))",
            foreground: "hsl(var(--foreground))",
            primary: {
              DEFAULT: "hsl(var(--primary))",
              foreground: "hsl(var(--primary-foreground))",
            },
            // Add the rest of your theme extensions here...
          },
          borderRadius: {
            lg: "var(--radius)",
            md: "calc(var(--radius) - 2px)",
            sm: "calc(var(--radius) - 4px)",
          },
        },
      },
      plugins: [require("tailwindcss-animate")],
    }

    `;

  const globalCssConfig = `
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    `;

  const utilsSettings = `
    import { clsx, type ClassValue } from "clsx";
    import { twMerge } from "tailwind-merge";

    export function cn(...inputs: ClassValue[]): string {
      return twMerge(clsx(inputs));
    }
  `;

  writeFileSync(join(libDir, "utils.ts"), utilsSettings);
  writeFileSync(join(projectDir, "src/index.css"), globalCssConfig);
  writeFileSync(join(projectDir, "tailwind.config.ts"), tailwindConfigContent);
  writeFileSync(join(projectDir, "jsconfig.json"), jsconfigContent);
}

export function reactSetUpInit(
  dependencies: string[],
  projectDir: string,
  routerDir: string,
  layoutDir: string,
  componentDir: string,
  pagesDir: string
) {
  dependencies.push("react-router-dom");

  const routerContent = `
    import React from "react";
    import {
      Route,
      createBrowserRouter,
      createRoutesFromElements,
    } from "react-router-dom";
    import Root from "../layouts/root";
    import NotFound from "../components/not-found";

    const router = createBrowserRouter(
      createRoutesFromElements(
        <Route path="/" element={<Root />} errorElement={<NotFound />}>
            {/* define all your routes here */}
          <Route path="index" element={<Home />} />
        </Route>
      )
    );

    export default router;
  `;

  const rootComponentContent = `
    import React from "react";
    import { Outlet } from "react-router-dom";

    const Root = () => {
      return (
        <main>
          <Outlet />
        </main>
      );
    };

    export default Root;
  `;

  const notFoundComponentContent = `
      import React from "react";

      const NotFound = () => {
        return (
          <section className="h-screen w-full flex items-center gap-5 flex-col justify-center">
            <div className="flex items-end justify-center gap-5">
              <h1 className="text-3xl text-slate-900 font-semibold px-5 border-r border-slate-500">
                404
              </h1>
              <p className="text-base text-slate-500 font-medium">Page Not Found</p>
            </div>
          </section>
        );
      };

      export default NotFound;
  `;

  const appComponentContent = `
    import React from "react";
    import { RouterProvider } from "react-router-dom";
    import router from "./router/router";

    const App: React.FC = () => {
      return <RouterProvider router={router} />;
    };

    export default App;
  `;

  const homeComponentContent = `
  const Home = () => {
   return (
       <>
         <p> No place like home </p>
       </>
      )
   }
`;

  const homepageContent = `
 import React from "react"

 const HomePage = () => {
     return (
       <Home />
     )
 }
`;

  writeFileSync(join(projectDir, "src/App.tsx"), appComponentContent);
  writeFileSync(join(routerDir, "router.tsx"), routerContent);
  writeFileSync(join(layoutDir, "root.tsx"), rootComponentContent);
  writeFileSync(join(componentDir, "not-found.tsx"), notFoundComponentContent);
  writeFileSync(join(componentDir, "home.tsx"), homeComponentContent);
  writeFileSync(join(pagesDir, "home.jsx"), homepageContent);
}

export function tanstackQuerySetUp(
  dependencies: string[],
  projectDir: string,
  providerDir: string
) {
  dependencies.push("@tanstack/react-query", "@tanstack/react-query-devtools");

  const providerContent = `
    import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
    import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

    const queryClient = new QueryClient();

    const QueryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
      return (
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      );
    };

    export default QueryProvider;
  `;

  const updateMainJsContent = `
    import { StrictMode } from 'react';
    import { createRoot } from 'react-dom/client';
    import './index.css';
    import App from './App';
    import QueryProvider from './provider/tanstack-query';

    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <QueryProvider>
          <App />
        </QueryProvider>
      </StrictMode>
    );
  `;

  writeFileSync(join(providerDir, "tanstack-query.tsx"), providerContent);
  writeFileSync(join(projectDir, "src/main.tsx"), updateMainJsContent);
}

export function swrSetUp(
  dependencies: string[],
  projectDir: string,
  providerDir: string
) {
  dependencies.push("swr");
  const swrContent = `
import { SWRConfig } from 'swr';
import { ReactNode } from 'react';

interface SwrProviderProps {
  children: ReactNode;
}

const SwrProvider: React.FC<SwrProviderProps> = ({ children }) => (
  <SWRConfig
    value={{
      refreshInterval: 3000, // Refresh every 3 seconds
      fetcher: (url: string) => fetch(url).then((res) => res.json()),
    }}
  >
    {children}
  </SWRConfig>
);

export default SwrProvider;
`;

  const updateMainTsxContent = `
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import SwrProvider from './provider/swr-provider';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <SwrProvider>
      <App />
    </SwrProvider>
  </StrictMode>,
);
`;

  writeFileSync(join(providerDir, "swr-provider.tsx"), swrContent);
  writeFileSync(join(projectDir, "src/main.tsx"), updateMainTsxContent);
}

export function axiosSetUp(dependencies: string[], apiDir: string) {
  // Add the axios dependency
  dependencies.push("axios");

  const apiContent = `
import axios from 'axios';

// Axios instance
const api = axios.create({
  baseURL: 'https://api.example.com', // Base URL for all requests
  timeout: 10000, // Request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json', // Default content type
    Accept: 'application/json', // Accept JSON responses
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = \`Bearer \${token}\`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
`;

  writeFileSync(join(apiDir, "axios.ts"), apiContent);
}

export function fetchSetUp(apiDir: string) {
  const apiContent = `
const BASE_URL = 'https://api.example.com'; // Base URL for all requests

interface ApiOptions extends RequestInit {
  headers?: Record<string, string>;
}

const api = async <T>(endpoint: string, options: ApiOptions = {}): Promise<T> => {
  const token = localStorage.getItem('token'); // Example: Authorization token

  // Dynamically manage headers
  const headers: Record<string, string> = {
    Accept: 'application/json', // Default Accept header
    ...(token && { Authorization: \`Bearer \${token}\` }), // Add Authorization token if it exists
    ...options.headers, // Include custom headers
  };

  // Remove 'Content-Type' for FormData (browser sets it automatically)
  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json'; // Default to JSON
  }

  const config: ApiOptions = {
    ...options,
    headers, // Add the dynamically generated headers
  };

  try {
    const response = await fetch(\`\${BASE_URL}\${endpoint}\`, config);

    if (!response.ok) {
      // Handle HTTP errors
      const error = await response.json();
      throw new Error((error && error.message) || 'Something went wrong');
    }

    return await response.json(); // Return the parsed response
  } catch (error) {
    console.error('API Error:', (error as Error).message);
    throw error; // Re-throw the error for further handling
  }
};

export default api;
`;

  writeFileSync(join(apiDir, "fetch.ts"), apiContent);
}
