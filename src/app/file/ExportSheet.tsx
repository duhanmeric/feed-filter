import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import { cookies } from "next/headers";
import { cookieNames } from "@/constants";
import ExportForm from "./ExportForm";

export default function ExportSheet() {
    const keysFromCookie = cookies().get(cookieNames.keys);
    const fileNameFromCookie = cookies().get(cookieNames.fileName);

    if (!keysFromCookie || !fileNameFromCookie) {
        return <div>Cookie error!</div>;
    }

    const keys: string[] = JSON.parse(decodeURIComponent(keysFromCookie.value));

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size="sm" variant="outline">
                    Export Data
                    <span className="ml-1">✨</span>
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Export Data</SheetTitle>
                    <SheetDescription>
                        You can export data by selecting a field and clicking the export button. Or you can select all fields by checking the select all checkbox.
                    </SheetDescription>
                </SheetHeader>
                <br />
                <ExportForm keys={keys} fileName={fileNameFromCookie.value} />
            </SheetContent>
        </Sheet>
    );
}
