"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import MultipleSelector, { Option } from "@/components/ui/multiselect";
import { useState } from "react";

type Props = {
    keys: Option[];
    fileName: string;
}

export type ExportType = {
    message: string;
    success: boolean;
    data?: unknown[];
}

export default function ExportForm({ keys, fileName }: Props) {
    const { toast } = useToast();
    const [field, setField] = useState<Option[]>([]);
    const [checkAll, setCheckAll] = useState(false);


    const clientAction = async () => {
        try {
            const res = await fetch("/api/export", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ field, checkAll }),
            });

            const result: ExportType = await res.json();

            if (!res.ok) {
                throw new Error(result.message ?? "Failed to export data");
            }

            const blob = new Blob([JSON.stringify(result.data)], { type: "application/json" });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = fileName + "_exported.json";
            document.body.appendChild(a);
            a.click();
            a.remove();

            toast({
                title: "Success!",
                description: result.message,
            });
        } catch (error) {
            toast({
                title: "Error!",
                description: error instanceof Error ? error.message : "An unexpected error occurred",
                variant: "destructive"
            });
        }
    };

    const handleCheckAll = (val: boolean) => {
        if (val) {
            setField([]);
        }

        setCheckAll(val);
    }

    const handleSelectOptions = (options: Option[]) => {
        if (options.length === keys.length) {
            setCheckAll(true);
        } else {
            setCheckAll(false);
        }
        setField(options);
    }
    return (
        <form action={clientAction} className="space-y-4">
            <div className="space-y-1">
                <Label
                    htmlFor="field-select"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"

                >
                    Select Your Field(s)
                </Label>
                <MultipleSelector
                    value={field}
                    onChange={(options) => handleSelectOptions(options as Option[])}
                    defaultOptions={keys}
                    placeholder="Select fields you like..."
                    clearAllCallback={() => setField([])}
                    emptyIndicator={
                        <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                            no results found.
                        </p>
                    }
                />
            </div>

            <div className="items-center flex space-x-2 ">
                <Checkbox id="check-all" name="check-all" checked={checkAll} onCheckedChange={handleCheckAll} />
                <Label
                    htmlFor="check-all"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Select All
                </Label>
            </div>

            <Button className="w-full">Export</Button>
        </form>
    );
}
