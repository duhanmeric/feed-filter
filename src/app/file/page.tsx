import { FilterFields } from "@/actions/file.actions";
import { Badge } from "@/components/ui/badge";
import Items from "./items";
import { Suspense } from "react";
import FilterCardSkeleton from "@/components/templates/FilterCardSkeleton";
import { getSearchParams } from "@/lib/utils";

export default async function FilePage({ searchParams }: Params) {
    const params = getSearchParams(searchParams, "name", "filters", "totalPageCount", "page");

    if (!params.found) {
        console.log("No params found");

        return <div>No {params.missingParam} found</div>;
    }

    const fileNameFromUrl = params.queries.name as string;
    const filtersFromUrl = decodeURIComponent(params.queries.filters);

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
                    page={params.queries.page}
                    totalPageCount={params.queries.totalPageCount}
                />
            </Suspense>
        </main>
    );
}
