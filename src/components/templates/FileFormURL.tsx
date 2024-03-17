"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
import { useFormState, useFormStatus } from "react-dom";
import { processFile } from "@/actions/file.actions";
import { Loader2 } from "lucide-react";
import { useFeedState } from "@/context/FeedContext";

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
      data: null;
    };

const initialState: InitialState<Data> = {
  success: false,
  message: "",
  data: null,
};

const FileFormURL = () => {
  const [state, formAction] = useFormState(processFile, initialState);
  const { setFeedData } = useFeedState();

  useEffect(() => {
    if (state.success) {
      setFeedData({ data: state.data });
    }
  }, [state.success, state.data]);

  return (
    <div>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <form action={formAction}>
          {/* <Input type="email" placeholder="Email" /> */}
          <SubmitButton />
        </form>
      </div>
    </div>
  );
};

export default FileFormURL;
