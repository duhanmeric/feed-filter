"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useToast } from "../ui/use-toast";
import { fileDownload } from "@/actions/file";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full" type="submit" aria-disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <span>Please wait</span>
        </>
      ) : (
        "Start"
      )}
    </Button>
  );
}

const FileFormURL = () => {
  const { toast } = useToast();

  const clientAction = async (formData: FormData) => {
    const result = await fileDownload(formData);
    if (result?.message) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: result.message,
      });
    } else {
      toast({
        title: "Success!",
        description: "Please take a seat while we are processing your file.",
      });
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-full ">
      <span>
        https://www.baqa.com.tr/XMLExport/5E8A9B3E8A984DED8CE5D667CB56B5B9
      </span>

      <div className="flex justify-center items-center h-full  max-w-md w-full">
        <form action={clientAction} className="w-full space-y-4">
          <div>
            <Label htmlFor="fileUrl">Feed URL</Label>
            <Input
              placeholder="Feed URL..."
              id="fileUrl"
              name="fileUrl"
            />
          </div>
          <SubmitButton />
        </form>
      </div>
    </div>
  );
};

export default FileFormURL;
