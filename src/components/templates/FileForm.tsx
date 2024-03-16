"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";

const MAX_FILE_SIZE = 500000;
const formSchema = z.object({
  file: z
    .any()
    .refine((files) => files?.length >= 1, { message: "File is required." })
    .refine((files) => files?.[0]?.type === "text/xml", {
      message: "XML files are accepted.",
    })
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
      message: `Max file size is 5MB.`,
    }),
});

const FileForm = () => {
  const [output, setOutput] = useState<any>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: "",
    },
  });

  const fileRef = form.register("file");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.file.length > 0) {
      const file = values.file[0];
      const reader = new FileReader();

      reader.onload = async (e) => {
        const xmlText = e.target?.result;

        const res = await fetch("/api/process", {
          method: "POST",
          headers: {
            "Content-Type": "text/plain",
          },
          body: JSON.stringify(xmlText),
        });

        if (!res.ok) {
          console.error("Failed to submit form.");
        } else {
          const json = await res.json();
          setOutput(json.data);
        }
      };

      reader.readAsText(file);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Feed File</FormLabel>
                <FormControl>
                  <Input type="file" {...fileRef} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      {output && (
        <div className="mt-10">
          <h2>Output</h2>
          <pre>{JSON.stringify(output, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default FileForm;
