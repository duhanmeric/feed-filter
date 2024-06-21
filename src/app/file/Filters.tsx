import type { FeedField } from "@/actions/helpers.actions";
import Pagination from "@/components/templates/Pagination";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ExportSheet from "./ExportSheet";

type Props = {
    page: string;
    totalPageCount: string;
    result: {
        data: FeedField[];
        totalCount: number;
    }
}

export default function Filters({ page, totalPageCount, result }: Props) {
    return (
        <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
            <div className="flex gap-4 items-center">
                <span>
                    <span data-testid="result-count">{result.totalCount}</span> items found
                </span>
                <Button size="sm" asChild variant="outline">
                    <Link href="/filter">Refilter</Link>
                </Button>
                <ExportSheet />
            </div>
            <Pagination currentPage={Number(page)} totalPageCount={Number(totalPageCount)} />
        </div>
    )
}