"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
import { useFormState, useFormStatus } from "react-dom";
import { processFile } from "@/actions/file.actions";
import { Loader2 } from "lucide-react";

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

export type Data = {
  keys: string[];
  result: {
    [key: string]: string;
  }[];
};

export type InitialState<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      message: string;
    };

const initialState: InitialState<Data> = {
  success: false,
  message: "",
};

const FileFormURL = () => {
  const [state, formAction] = useFormState(processFile, initialState);
  const [keys, setKeys] = useState<Data["keys"]>();

  return (
    <div>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <form action={formAction}>
          {/* <Input type="email" placeholder="Email" /> */}
          <SubmitButton />
        </form>
      </div>
      {state.success && <pre>{JSON.stringify(state.data.keys, null, 2)}</pre>}
      {state.success && <pre>{JSON.stringify(state.data.result, null, 2)}</pre>}
    </div>
  );
};

export default FileFormURL;
