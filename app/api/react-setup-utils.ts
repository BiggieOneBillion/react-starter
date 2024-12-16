import fsExtra from "fs-extra";
import { join } from "path";

const { writeFileSync } = fsExtra;
export function tailwindSetUp(dependencies: string[], projectDir: string) {
  dependencies.push("tailwindcss", "postcss", "autoprefixer");

  const tailwindConfig = `
      /** @type {import('tailwindcss').Config} */
      export default {
        content: [
          "./index.html",
          "./src/**/*.{js,ts,jsx,tsx}",
        ],
        theme: {
          extend: {},
        },
        plugins: [],
      }
    `;

  const tailwindIndexSettings = `
     @tailwind base;
     @tailwind components;
     @tailwind utilities;
    `;

  const postcssConfig = `
        export default {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      }
    `;

  writeFileSync(join(projectDir, "postcss.config.js"), postcssConfig);
  writeFileSync(join(projectDir, "tailwind.config.js"), tailwindConfig);
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
            secondary: {
              DEFAULT: "hsl(var(--secondary))",
              foreground: "hsl(var(--secondary-foreground))",
            },
            destructive: {
              DEFAULT: "hsl(var(--destructive))",
              foreground: "hsl(var(--destructive-foreground))",
            },
            muted: {
              DEFAULT: "hsl(var(--muted))",
              foreground: "hsl(var(--muted-foreground))",
            },
            accent: {
              DEFAULT: "hsl(var(--accent))",
              foreground: "hsl(var(--accent-foreground))",
            },
            popover: {
              DEFAULT: "hsl(var(--popover))",
              foreground: "hsl(var(--popover-foreground))",
            },
            card: {
              DEFAULT: "hsl(var(--card))",
              foreground: "hsl(var(--card-foreground))",
            },
          },
          borderRadius: {
            lg: ${`var(--radius)`},
            md: ${`calc(var(--radius) - 2px)`},
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

        @layer base {
          :root {
            --background: 0 0% 100%;
            --foreground: 222.2 47.4% 11.2%;
            --muted: 210 40% 96.1%;
            --muted-foreground: 215.4 16.3% 46.9%;
            --popover: 0 0% 100%;
            --popover-foreground: 222.2 47.4% 11.2%;
            --border: 214.3 31.8% 91.4%;
            --input: 214.3 31.8% 91.4%;
            --card: 0 0% 100%;
            --card-foreground: 222.2 47.4% 11.2%;
            --primary: 222.2 47.4% 11.2%;
            --primary-foreground: 210 40% 98%;
            --secondary: 210 40% 96.1%;
            --secondary-foreground: 222.2 47.4% 11.2%;
            --accent: 210 40% 96.1%;
            --accent-foreground: 222.2 47.4% 11.2%;
            --destructive: 0 100% 50%;
            --destructive-foreground: 210 40% 98%;
            --ring: 215 20.2% 65.1%;
            --radius: 0.5rem;
          }

          .dark {
            --background: 224 71% 4%;
            --foreground: 213 31% 91%;
            --muted: 223 47% 11%;
            --muted-foreground: 215.4 16.3% 56.9%;
            --accent: 216 34% 17%;
            --accent-foreground: 210 40% 98%;
            --popover: 224 71% 4%;
            --popover-foreground: 215 20.2% 65.1%;
            --border: 216 34% 17%;
            --input: 216 34% 17%;
            --card: 224 71% 4%;
            --card-foreground: 213 31% 91%;
            --primary: 210 40% 98%;
            --primary-foreground: 222.2 47.4% 1.2%;
            --secondary: 222.2 47.4% 11.2%;
            --secondary-foreground: 210 40% 98%;
            --destructive: 0 63% 31%;
            --destructive-foreground: 210 40% 98%;
            --ring: 216 34% 17%;
          }
        }

      @layer base {
        * {
          @apply border-border;
        }
        body {
          @apply font-sans antialiased bg-background text-foreground;
        }
      }
    `;
  const utilsSettings = `
    import { clsx, type ClassValue } from "clsx"
    import { twMerge } from "tailwind-merge"

    export function cn(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs))
    }
    `;
  const componentJsonSettings = `
        {
          "$schema": "https://ui.shadcn.com/schema.json",
          "style": "new-york",
          "rsc": false,
          "tsx": true,
          "tailwind": {
            "config": "tailwind.config.js",
            "css": "src/index.css",
            "baseColor": "zinc",
            "cssVariables": true,
            "prefix": ""
          },
          "aliases": {
            "components": "@/components",
            "utils": "@/lib/utils",
            "ui": "@/components/ui",
            "lib": "@/lib",
            "hooks": "@/hooks"
          },
          "iconLibrary": "lucide"
       }
    `;
  writeFileSync(join(libDir, "utils.js"), utilsSettings);
  writeFileSync(join(projectDir, "src/index.css"), globalCssConfig);
  writeFileSync(join(projectDir, "tailwind.config.js"), tailwindConfigContent);
  writeFileSync(join(projectDir, "jsconfig.json"), jsconfigContent);
  writeFileSync(join(projectDir, "components.json"), componentJsonSettings);
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

  // create the file contents
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
        <Route path={"/"} element={<Root />} errorElement={<NotFound />}>
            {/* define all your routes here */}
          <Route path="index" element={<Home />} />
        </Route>
      )
    );

    export default router;
    `;

  // create the NotFound component and root component
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

  const homeComponentContent = `
       const Home = () => {
        return (
            <>
              <p> No place like home </>
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

  const appComponentContent = `
    import React from "react";
    import { RouterProvider } from "react-router-dom";
    import router from "./router/router";

    const App = () => {
      return <RouterProvider router={router} />;
    };

    export default App;
    `;

  writeFileSync(join(projectDir, "src/App.jsx"), appComponentContent);
  writeFileSync(join(routerDir, "router.jsx"), routerContent);
  writeFileSync(join(layoutDir, "root.jsx"), rootComponentContent);
  writeFileSync(join(componentDir, "not-found.jsx"), notFoundComponentContent);
  writeFileSync(join(componentDir, "home.jsx"), homeComponentContent);
  writeFileSync(join(pagesDir, "home.jsx"), homepageContent);
}

export function tanstackQuerySetUp(
  dependencies: string[],
  projectDir: string,
  providerDir: string
) {
  dependencies.push(
    "@tanstack/react-query",
    "@tanstack/eslint-plugin-query",
    "@tanstack/react-query-devtools"
  );
  const providerContent = `
    import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
    import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

    const queryClient = new QueryClient();

    const QueryProvider = ({ children }) => {
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
        import { StrictMode } from 'react'
        import { createRoot } from 'react-dom/client'
        import './index.css'
        import App from './App.jsx'
        import QueryProvider from './provider/tanstack-query.js'

        createRoot(document.getElementById('root')).render(
        <StrictMode>
          <QueryProvider>
            <App />
          </QueryProvider>
        </StrictMode>,
        )
   `;
  writeFileSync(join(providerDir, "tanstack-query.js"), providerContent);
  writeFileSync(join(projectDir, "src/main.jsx"), updateMainJsContent);
}

export function swrSetUp(
  dependencies: string[],
  projectDir: string,
  providerDir: string
) {
  dependencies.push("swr");
  const swrContent = `
        import { SWRConfig } from 'swr';

        const SwrProvider = ({ children }) => (
        <SWRConfig
            value={{
            refreshInterval: 3000, // Refresh every 3 seconds
            fetcher: (url) => fetch(url).then((res) => res.json()),
            }}
        >
            { children }
        </SWRConfig>
        );

        export default SwrProvider;
   `;
  const updateMainJsContent = `
        import { StrictMode } from 'react'
        import { createRoot } from 'react-dom/client'
        import './index.css'
        import App from './App.jsx'
        import SwrProvider from './provider/swr-provider.js'

        createRoot(document.getElementById('root')).render(
        <StrictMode>
          <SwrProvider>
            <App />
          </SwrProvider>
        </StrictMode>,
        )
   `;

  writeFileSync(join(providerDir, "swr-provider.js"), swrContent);
  writeFileSync(join(projectDir, "src/main.jsx"), updateMainJsContent);
}

export function axiosSetUp(dependencies: string[], apiDir: string) {
  // add the axios dependency
  dependencies.push("axios");
  // create the base api setup
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

export default api;
  `;

  writeFileSync(join(apiDir, "axios.js"), apiContent);
}

export function fetchSetUp(apiDir: string) {
  // create the base api setup
  const apiContent = `
const BASE_URL = 'https://api.example.com'; // Base URL for all requests

const api = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token'); // Example: Authorization token

  // Dynamically manage headers
  const headers = {
    Accept: 'application/json', // Default Accept header
    ...(token && { Authorization: \`Bearer \${token}\` }), // Add Authorization token if it exists
    ...options.headers, // Include custom headers
  };

  // Remove 'Content-Type' for FormData (browser sets it automatically)
  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json'; // Default to JSON
  }

  const config = {
    ...options,
    headers, // Add the dynamically generated headers
  };

  try {
    const response = await fetch(\`\${BASE_URL}\${endpoint}\`, config);

    if (!response.ok) {
      // Handle HTTP errors
      const error = await response.json();
      throw new Error(error.message || 'Something went wrong');
    }

    return await response.json(); // Return the parsed response
  } catch (error) {
    console.error('API Error:', error.message);
    throw error; // Re-throw the error for further handling
  }
};

export default api;
`;

  writeFileSync(join(apiDir, "fetch.js"), apiContent);
}
