"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useToast } from "../ui/use-toast";
import { deleteFiles, fileDownload } from "@/actions/file";
import SubmitButton from "./SubmitButton";

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
                description:
                    "Please take a seat while we are processing your file.",
            });
        }
    };

    return (
        <div className="flex h-full flex-col items-center justify-center">
            <span>
                https://www.baqa.com.tr/XMLExport/5E8A9B3E8A984DED8CE5D667CB56B5B9
            </span>

            <div className="flex h-full w-full max-w-md  items-center justify-center">
                <form action={clientAction} className="w-full space-y-4">
                    <div>
                        <Label htmlFor="fileUrl">Feed URL</Label>
                        <Input
                            placeholder="Feed URL..."
                            id="fileUrl"
                            name="fileUrl"
                        />
                    </div>
                    <SubmitButton title="Confirm" />
                </form>
            </div>
            <form action={deleteFiles}>
                <Button variant="destructive">Delete Files</Button>
            </form>
        </div>
    );
};

export default FileFormURL;
