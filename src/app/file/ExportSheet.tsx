"use client";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import ExportForm from "./ExportForm";
import { Option } from "@/components/ui/multiselect";

type Props = {
    keys: string[];
    fileNameFromCookie: string;
}

export default function ExportSheet({ keys, fileNameFromCookie }: Props) {
    const keyOptions: Option[] = keys.map((key) => ({
        value: key,
        label: key
    }));

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size="sm" variant="outline">
                    Export Data
                    <span className="ml-1">✨</span>
                </Button>
            </SheetTrigger>
            <SheetContent onOpenAutoFocus={(e) => e.preventDefault()}>
                <SheetHeader>
                    <SheetTitle>Export Data</SheetTitle>
                    <SheetDescription>
                        You can export data by selecting a field and clicking the export button. Or you can select all fields by checking the select all checkbox.
                    </SheetDescription>
                </SheetHeader>
                <br />
                <ExportForm keys={keyOptions} fileName={fileNameFromCookie} />
            </SheetContent>
        </Sheet>
    );
}
