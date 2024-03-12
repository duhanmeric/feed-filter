"use client";

// import { handleFileUpload } from "@/actions/file";
// import { useFormState } from "react-dom";
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

// export type InitialStateType = {
// status: "success" | "error" | null;
// message: string;
// };

// const initialState: InitialStateType = {
// message: "",
// status: null,
// };

const FileForm = () => {
  // const [state, formAction] = useFormState(handleFileUpload, initialState);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: "",
    },
  });

  const fileRef = form.register("file");

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    console.log("submitting");
  }

  return (
    <div>
      {/* <textarea
        name="output"
        value={state.message}
        cols={75}
        rows={20}
        readOnly
        className="text-black"
      ></textarea> */}
      {/* {state.status === "success" && (
        <p className="text-green-500">{state.message}</p>
      )}
      {state.status === "error" && (
        <p className="text-red-500">{state.message}</p>
      )} */}
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
    </div>
  );
};

export default FileForm;
