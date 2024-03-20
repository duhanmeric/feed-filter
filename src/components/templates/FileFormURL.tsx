"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { extractKeys } from "@/actions/file.actions";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

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

const ActionReturn: ActionReturn<string> = {
  success: false,
  message: "",
  data: null,
};

const FileFormURL = () => {
  const [state, formAction] = useFormState(extractKeys, ActionReturn);
  const router = useRouter();

  useEffect(() => {
    console.log(state);

    if (state.success) {
      // router.push(state.data);
    }
  }, [state.success, state, state.data, router]);

  return (
    <div className="flex flex-col justify-center items-center h-full ">
      <span>
        https://www.baqa.com.tr/XMLExport/5E8A9B3E8A984DED8CE5D667CB56B5B9
      </span>

      <div className="flex justify-center items-center h-full  max-w-md w-full">
        <form action={formAction} className="w-full space-y-4">
          {/* <div>
            <Label htmlFor="fileName">File Name</Label>
            <Input
              placeholder="File Name"
              id="fileName"
              name="fileName"
              required
            />
          </div> */}
          <div>
            <Label htmlFor="fileUrl">Feed URL</Label>
            <Input
              placeholder="Feed URL..."
              id="fileUrl"
              name="fileUrl"
              required
            />
            {!state.success && state.message && (
              <p className="text-red-500 text-sm mt-2">{state.message}</p>
            )}
          </div>
          <SubmitButton />
        </form>
      </div>
    </div>
  );
};

export default FileFormURL;
