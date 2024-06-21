"use client";

import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

type Props = {
    keys: string[];
    fileName: string;
}

export type ExportType = {
    message: string;
    success: boolean;
    data?: unknown[];
}

export default function ExportForm({ keys, fileName }: Props) {
    const { toast } = useToast();

    const clientAction = async (formData: FormData) => {
        const checkAll = formData.get("check-all") as string;
        const field = formData.get("field") as string;

        try {
            const res = await fetch("/api/export", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ checkAll, field }),
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

    return (
        <form action={clientAction} className="space-y-4">
            <div className="space-y-1">
                <Label
                    htmlFor="field-select"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Select Your Field
                </Label>
                <Select name="field">
                    <SelectTrigger>
                        <SelectValue placeholder="Select Field" />
                    </SelectTrigger>
                    <SelectContent id="field-select">
                        {
                            keys.map((key) => {
                                return (
                                    <SelectItem key={key} value={key}>
                                        {key}
                                    </SelectItem>
                                );
                            })
                        }
                    </SelectContent>
                </Select>
            </div>

            <div className="items-center flex space-x-2 ">
                <Checkbox id="check-all" name="check-all" />
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
