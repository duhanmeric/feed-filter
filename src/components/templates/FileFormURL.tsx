"use client";

import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useToast } from "../ui/use-toast";
import { fileDownload } from "@/actions/file.actions";
import SubmitButton from "./SubmitButton";
import { useRouter } from "next/navigation";

const FileFormURL = () => {
    const router = useRouter();
    const { toast } = useToast();

    const clientAction = async (formData: FormData) => {
        const result = await fileDownload(formData);
        if (result?.message) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: result.message,
                "aria-label": "error-toast",
            });
        } else {
            toast({
                title: "Success!",
                description: "Please take a seat while we are processing your file.",
            });
            router.push("/filter");
        }
    };

    return (
        <div className="flex h-full flex-col items-center justify-center">
            <div className="flex h-full w-full max-w-md  items-center justify-center">
                <form action={clientAction} className="mb-28 w-full space-y-4">
                    <div>
                        <Label htmlFor="fileUrl">Feed URL</Label>
                        <Input
                            data-testid="feed-url-input"
                            placeholder="Feed URL..."
                            id="fileUrl"
                            name="fileUrl"
                            // defaultValue="http://localhost:3000/basic.xml"
                            defaultValue="http://localhost:3000/nested.xml"
                        />
                    </div>
                    <SubmitButton title="Confirm" />
                </form>
            </div>
        </div>
    );
};

export default FileFormURL;
