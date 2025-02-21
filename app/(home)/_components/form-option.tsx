"use client";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  dataFetching,
  dataValidation,
  formManagement,
  iconLibrary,
  lang,
  serverStateManagement,
  stateManagement,
  stylingData,
  toastLibrary,
  uiLibrary,
} from "../data";
import ShowUserValues from "./show-user-values";
import { Loader2 } from "lucide-react";
import { ConfirmationModal } from "./result-alert-dialog";

const formSchema = z.object({
  app_name: z.string(),
  styling: z.string(),
  ui_library: z.string(),
  icon_library: z.string(),
  state_management: z.string(),
  server_state: z.string(),
  data_fetching: z.string(),
  data_validation: z.string(),
  form_management: z.string(),
  toast_library: z.string(),
  lang: z.string(),
});

export default function FormOption() {
  const downloadRef = useRef(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const [isDesktop, setIsDesktop] = useState(false);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingValues, setPendingValues] = useState<z.infer<
    typeof formSchema
  > | null>(null);

  const formValues = form.watch();

  const isPreviousFieldFilled = (fieldName: string): boolean => {
    const fields = [
      "app_name",
      "lang",
      "styling",
      "ui_library",
      "icon_library",
      "state_management",
      "server_state",
      "data_fetching",
      "data_validation",
      "form_management",
      "toast_library",
    ];

    const currentIndex = fields.indexOf(fieldName);
    if (currentIndex === 0) return true;
    const previousField = fields[currentIndex - 1];
    return !!formValues[previousField as keyof typeof formValues];
  };

  // async function onSubmit(values: z.infer<typeof formSchema>) {
  //   setIsLoading(true); // spinner should start
  //   try {
  //     const response = await fetch("/api/react", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(values), // Your POST request payload
  //     });

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     const blob = await response.blob(); // Convert the response to a Blob

  //     setIsLoading(false); // stop the spinner

  //     // Create a download link
  //     const downloadLink = document.createElement("a");
  //     const fileName = `${values.app_name}.zip`; // Desired file name
  //     downloadLink.href = URL.createObjectURL(blob);
  //     downloadLink.download = fileName;

  //     // Trigger download
  //     document.body.appendChild(downloadLink);
  //     downloadLink.click();
  //     document.body.removeChild(downloadLink);
  //     toast.success("Successful");
  //   } catch (error) {
  //     setIsLoading(false); // stop the spinner
  //     // console.error("Form submission error", error);
  //     toast.error("Please try again.");
  //   }
  // }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Check if we're on mobile
    if (window.innerWidth < 768) {
      setPendingValues(values);
      setShowConfirmation(true);
      return;
    }

    await handleSubmission(values);
  }

  async function handleSubmission(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await fetch("/api/react", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const blob = await response.blob();
      setIsLoading(false);

      const downloadLink = document.createElement("a");
      const fileName = `${values.app_name}.zip`;
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = fileName;

      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      toast.success("Successful");
    } catch (error) {
      setIsLoading(false);
      toast.error("Please try again.");
    }
  }

  // Add these handler functions
  const handleConfirmSubmit = () => {
    if (pendingValues) {
      handleSubmission(pendingValues);
      setShowConfirmation(false);
      setPendingValues(null);
    }
  };

  const handleCancelSubmit = () => {
    setShowConfirmation(false);
    setPendingValues(null);
  };

  const isStyledComponentsSelected = () => {
    return formValues.styling === "styled-components";
  };

  // Add effect to set UI library to none when styled-components is selected
  useEffect(() => {
    if (isStyledComponentsSelected()) {
      form.setValue("ui_library", "none");
    }
  }, [formValues.styling]);

  useEffect(() => {
    const handleCheck = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    handleCheck();

    window.addEventListener("resize", handleCheck);

    return () => window.removeEventListener("resize", handleCheck);
  }, []);

  return (
    <section className="grid w-full xl:grid-cols-2 gap-10 relative">
      <a href="#" className="hidden" ref={downloadRef}>
        downloadlink
      </a>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 md:w-[500px] mx-auto font-sans"
        >
          <FormField
            control={form.control}
            name="app_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name of application</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the name" type="" {...field} />
                </FormControl>
                <FormDescription>The name of your application</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lang"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Programming Language</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={!isPreviousFieldFilled("lang")}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          !isPreviousFieldFilled("lang")
                            ? "Complete previous field first"
                            : ""
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {lang.map((datum) => (
                      <SelectItem key={datum.label} value={datum.option}>
                        {datum.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  {!isPreviousFieldFilled("lang")
                    ? "Please fill in the previous field first"
                    : "Choose your programming language"}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="styling"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Styling</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={!isPreviousFieldFilled("styling")}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          !isPreviousFieldFilled("styling")
                            ? "Complete previous field first"
                            : ""
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {stylingData.map((datum) => (
                      <SelectItem key={datum.label} value={datum.option}>
                        {datum.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  {!isPreviousFieldFilled("styling")
                    ? "Please fill in the previous field first"
                    : "Choose your styling option"}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ui_library"
            render={({ field }) => (
              <FormItem>
                <FormLabel>UI Library</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={
                    !isPreviousFieldFilled("ui_library") ||
                    isStyledComponentsSelected()
                  }
                  value={isStyledComponentsSelected() ? "none" : field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          !isPreviousFieldFilled("ui_library")
                            ? "Complete previous field first"
                            : isStyledComponentsSelected()
                            ? "Not available with styled-components"
                            : ""
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {uiLibrary.map((datum) => (
                      <SelectItem key={datum.label} value={datum.option}>
                        {datum.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  {!isPreviousFieldFilled("ui_library")
                    ? "Please fill in the previous field first"
                    : isStyledComponentsSelected()
                    ? "UI Library is not needed when using styled-components"
                    : "Choose your ui library"}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="icon_library"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Icon Library</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={!isPreviousFieldFilled("icon_library")}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          !isPreviousFieldFilled("icon_library")
                            ? "Complete previous field first"
                            : ""
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {iconLibrary.map((datum) => (
                      <SelectItem key={datum.label} value={datum.option}>
                        {datum.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  {!isPreviousFieldFilled("icon_library")
                    ? "Please fill in the previous field first"
                    : "Choose your icon library"}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="state_management"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State management</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={!isPreviousFieldFilled("state_management")}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          !isPreviousFieldFilled("state_management")
                            ? "Complete previous field first"
                            : ""
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {stateManagement.map((datum) => (
                      <SelectItem key={datum.label} value={datum.option}>
                        {datum.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  {!isPreviousFieldFilled("state_management")
                    ? "Please fill in the previous field first"
                    : "Choose your state management"}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="server_state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Server State Management Tool</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={!isPreviousFieldFilled("server_state")}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          !isPreviousFieldFilled("server_state")
                            ? "Complete previous field first"
                            : ""
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {serverStateManagement.map((datum) => (
                      <SelectItem key={datum.label} value={datum.option}>
                        {datum.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  {!isPreviousFieldFilled("server_state")
                    ? "Please fill in the previous field first"
                    : "Choose your server state management tool"}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="data_fetching"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data Fetching Library</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={!isPreviousFieldFilled("data_fetching")}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          !isPreviousFieldFilled("data_fetching")
                            ? "Complete previous field first"
                            : ""
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {dataFetching.map((datum) => (
                      <SelectItem key={datum.label} value={datum.option}>
                        {datum.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  {!isPreviousFieldFilled("data_fetching")
                    ? "Please fill in the previous field first"
                    : "Choose your data fetching library"}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="data_validation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data Validation</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={!isPreviousFieldFilled("data_validation")}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          !isPreviousFieldFilled("data_validation")
                            ? "Complete previous field first"
                            : ""
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {dataValidation.map((datum) => (
                      <SelectItem key={datum.label} value={datum.option}>
                        {datum.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  {!isPreviousFieldFilled("data_validation")
                    ? "Please fill in the previous field first"
                    : "Choose your data validation library"}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="form_management"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Form Management</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={!isPreviousFieldFilled("form_management")}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          !isPreviousFieldFilled("form_management")
                            ? "Complete previous field first"
                            : ""
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {formManagement.map((datum) => (
                      <SelectItem key={datum.label} value={datum.option}>
                        {datum.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  {!isPreviousFieldFilled("form_management")
                    ? "Please fill in the previous field first"
                    : "Choose your form management tool"}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="toast_library"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Toast Library</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={!isPreviousFieldFilled("toast_library")}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          !isPreviousFieldFilled("toast_library")
                            ? "Complete previous field first"
                            : ""
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {toastLibrary.map((datum) => (
                      <SelectItem key={datum.label} value={datum.option}>
                        {datum.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  {!isPreviousFieldFilled("toast_library")
                    ? "Please fill in the previous field first"
                    : "Choose your toast library"}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" />
                Submitting
              </>
            ) : (
              <span>Submit</span>
            )}
          </Button>
        </form>
      </Form>
      {isDesktop && <ShowUserValues userValues={formValues} />}
      {!isDesktop && (
        <ConfirmationModal
          isOpen={showConfirmation}
          onClose={handleCancelSubmit}
          onConfirm={handleConfirmSubmit}
          formValues={pendingValues || {}}
        />
      )}
    </section>
  );
}
