import type { FeedField } from "@/actions/helpers.actions";
import Pagination from "@/components/templates/Pagination";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ExportSheet from "./ExportSheet";
import { cookies } from "next/headers";
import { cookieNames } from "@/constants";

type Props = {
    page: string;
    totalPageCount: string;
    result: {
        data: FeedField[];
        totalCount: number;
    }
}

export default function Filters({ page, totalPageCount, result }: Props) {
    const keysFromCookie = cookies().get(cookieNames.keys);
    const fileNameFromCookie = cookies().get(cookieNames.fileName);

    if (!keysFromCookie || !fileNameFromCookie) {
        return <div>Cookie error!</div>;
    }

    const keys: string[] = JSON.parse(decodeURIComponent(keysFromCookie.value));
    return (
        <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
            <div className="flex gap-4 items-center">
                <span>
                    <span data-testid="result-count">{result.totalCount}</span> items found
                </span>
                <Button size="sm" asChild variant="outline">
                    <Link href="/filter">Refilter</Link>
                </Button>
                <ExportSheet
                    keys={keys}
                    fileNameFromCookie={fileNameFromCookie.value}
                />
            </div>
            <Pagination currentPage={Number(page)} totalPageCount={Number(totalPageCount)} />
        </div>
    )
}