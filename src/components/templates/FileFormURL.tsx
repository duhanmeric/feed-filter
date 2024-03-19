"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { extractKeys } from "@/actions/file.actions";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" aria-disabled={pending}>
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
    if (state.success) {
      router.push(state.data);
    }
  }, [state.success, state.data, router]);

  return (
    <div>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <form action={formAction}>
          <SubmitButton />
        </form>
      </div>
    </div>
  );
};

export default FileFormURL;
