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
const { writeFileSync, copySync, appendFileSync, existsSync, removeSync } =
  fsExtra;


// app_name: 'my-app',
// styling: 'tailwindcss',
// ui_library: 'shadcn',
// icon_library: 'react-icon',
// state_management: 'redux',
// server_state: 'tanstack-qwery',
// data_fetching: 'axios',
// data_validation: 'zod',
// form_management: 'react-hook-form',
// toast_library: 'react-toastify'

type IsetUpProps = {
  options: {
    projectName: string;
    router: string;
    styling: string;
    uiLibrary: string;
    stateManagement: string;
    iconsLibrary: string;
    dataFetching: string;
    serverState: string;
    formManagement: string;
    toastLibrary: string;
  };
  templatePath: string;
  templatesPath: string;
  selectedTemplate: string;
};

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
  };
  projectDir: string;
};

export async function setupProject({
  options,
  templatesPath,
  templatePath,
}: IsetUpProps) {
  const {
    projectName,
    dataFetching,
    iconsLibrary,
    router,
    stateManagement,
    styling,
    uiLibrary,
    formManagement,
    serverState,
    toastLibrary,
  } = options;
  const projectDir = join(templatesPath, projectName);

  // Copy template files to the project directory
  // console.log(`Setting up files from template: ${selectedTemplate}`);
  copySync(templatePath, projectDir);

  const customiseOption = {
    router,
    styling,
    uiLibrary,
    stateManagement,
    iconsLibrary,
    dataFetching,
    formManagement,
    serverState,
    toastLibrary,
  };

  // Apply customizations based on user input
  customizeProject({ projectDir, options: customiseOption });
}

export function customizeProject({ projectDir, options }: Icustomise) {
  const {
    dataFetching,
    iconsLibrary,
    router,
    stateManagement,
    styling,
    uiLibrary,
    serverState,
    formManagement,
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
  fsExtra.ensureDirSync(apiDir)
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
        "name": "basic",
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
 
    cleanupTemp(tempDir);
  }
}

function cleanupTemp(tempDir: string) {
  if (fsExtra.existsSync(tempDir)) {
    fsExtra.removeSync(tempDir);
    console.log("Cleaned up temporary files.");
  }
}
