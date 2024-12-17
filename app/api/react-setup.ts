import { join } from "path";
import fsExtra from "fs-extra";
import { customizeProjectJs, customizeProjectTS } from "./utils";
const { copySync } =
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
    lang: string;
  };
  templatePath: string;
  templatesPath: string;
  selectedTemplate: string;
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
    lang,
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
    projectName,
  };

  if (lang !== "ts") {
    // Apply customizations based on user input for javascript
    customizeProjectJs({ projectDir, options: customiseOption });
  } else {
    // Apply customizations based on user input for typescript
    customizeProjectTS({ projectDir, options: customiseOption });
  }

}
