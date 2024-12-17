import { NextRequest, NextResponse } from "next/server";
import path, { join } from "path";
import { setupProject } from "../react-setup";
import { fileURLToPath } from "url";
import archiver from "archiver";
import fsExtra from "fs-extra";

const { removeSync } = fsExtra;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json(); // Correctly parse the JSON body

    const templatesPath = join(__dirname, "..", "templates");
    // const templatesPath = join('../templates');
    const selectedTemplate = body.lang === "js" ? "basic" : "basic-ts"; // based on the user choice of either typescript or javascript we are going to select the template
    const templatePath = join(templatesPath, selectedTemplate);

    // console.log("Template Path -----",templatesPath);
    // console.log("Templates in Path -----",templatePath);

    const options = {
      projectName: body.app_name,
      router: "React-router",
      styling: body.styling,
      uiLibrary: body.ui_library,
      stateManagement: body.state_management,
      iconsLibrary: body.icon_library,
      dataFetching: body.data_fetching,
      serverState: body.server_state,
      formManagement: body.form_management,
      toastLibrary: body.toast_library,
      lang: body.lang,
    };

    await setupProject({
      // set up the react application
      options,
      templatePath,
      selectedTemplate,
      templatesPath,
    });

    const projectDir = join(templatesPath, body.app_name); // path to folder to zip
    // Create a readable stream for the ZIP file
    const zipStream = new ReadableStream({
      async start(controller) {
        const archive = archiver("zip", { zlib: { level: 9 } });

        // Pipe the archiver output to the controller
        archive.on("data", (chunk) => controller.enqueue(chunk));
        archive.on("end", () => {
          console.log("Archive successfully created")
          controller.close();
          removeSync(projectDir);
        });
        archive.on("error", (err) => controller.error(err));

        // Archive the directory and push the data to the controller
        archive.directory(projectDir, false);
        await archive.finalize();
      },
    });

    // Create the response headers
    const headers = new Headers({
      "Content-Disposition": `attachment; filename="react-app.zip"`,
      "Content-Type": "application/zip",
    });

    console.log("Headers:---------------------------", headers);

    return new NextResponse(zipStream, { headers });
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid request body", error },
      { status: 400 }
    );
  }
}
