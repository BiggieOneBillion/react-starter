"use client";
import { useRef, useState } from "react";
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

  const formValues = form.watch();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true); // spinner should start
    try {
      const response = await fetch("/api/react", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values), // Your POST request payload
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const blob = await response.blob(); // Convert the response to a Blob

      setIsLoading(false); // stop the spinner

      // Create a download link
      const downloadLink = document.createElement("a");
      const fileName = `${values.app_name}.zip`; // Desired file name
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = fileName;

      // Trigger download
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      toast.success("Successful");
    } catch (error) {
      setIsLoading(false); // stop the spinner
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <section className="grid xl:grid-cols-2 gap-10 relative">
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
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="" />
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
                  Choose your programming language
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
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="" />
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
                <FormDescription>Choose your styling option</FormDescription>
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
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="" />
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
                  Select your preferred UI Library
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
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="" />
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
                <FormDescription>Select your icon library</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="state_management"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State Management</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="" />
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
                  Select your preferred state management
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
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="" />
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
                  Select your preferred server state management tool
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
                <FormLabel>Data Fetching </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="" />
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
                  Select your preferred data fetching library
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
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
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
                  Choose your data validation library
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
                <FormLabel>Form Management </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
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
                  Select your preferred form management tool
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
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="" />
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
                  Select your preferred toast system
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
      <ShowUserValues userValues={formValues} />
    </section>
  );
}
