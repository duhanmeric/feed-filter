import { FilterFields } from "@/actions/file.actions";
import { Badge } from "@/components/ui/badge";
import Items from "./items";
import { Suspense } from "react";
import FilterCardSkeleton from "@/components/templates/FilterCardSkeleton";

export default async function FilePage({
    searchParams,
}: {
    searchParams?: { [key: string]: string };
}) {
    const { name, page, filters, totalPageCount } = searchParams || {};

    if (!name) {
        return <div>No file name found</div>;
    }

    if (!filters) {
        return <div>No filters found</div>;
    }

    if (!totalPageCount) {
        return <div>No totalPageCount found</div>;
    }

    if (!page) {
        return <div>No page found</div>;
    }

    const fileNameFromUrl = name as string;
    const filtersFromUrl = decodeURIComponent(filters);

    return (
        <main className="container h-full max-w-screen-2xl justify-center py-4">
            <h1 className="text-2xl font-bold">Your Filter Results</h1>
            <div>
                <span>Your file name: </span>
                <Badge variant="secondary">{fileNameFromUrl}</Badge>
            </div>
            <div className="my-2">
                <span className="mr-2">Your filters:</span>
                {JSON.parse(filtersFromUrl).map((filter: FilterFields) => (
                    <Badge key={filter.key} className="mr-2">
                        {filter.key} {filter.condition} {filter.value}
                    </Badge>
                ))}
            </div>
            <br />
            <Suspense fallback={<FilterCardSkeleton />}>
                <Items
                    fileNameFromUrl={fileNameFromUrl}
                    page={page}
                    totalPageCount={totalPageCount}
                />
            </Suspense>
        </main>
    );
}
