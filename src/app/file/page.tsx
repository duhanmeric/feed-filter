import { Badge } from "@/components/ui/badge";
import Items from "./items";
import { Suspense } from "react";
import FilterCardSkeleton from "@/components/templates/FilterCardSkeleton";
import { getSearchParams } from "@/lib/utils";
import { FilterFields } from "@/actions/helpers.actions";
import { cookies } from "next/headers";
import { cookieNames } from "@/constants";
import FileInfo from "@/components/templates/FileInfo";

export default async function FilePage({ searchParams }: Params) {
    const params = getSearchParams(searchParams, "name", "totalPageCount", "page");
    const filtersFromCookie = cookies().get(cookieNames.filters);

    if (!params.found) {
        return <div>No {params.missingParam} found</div>;
    }

    if (!filtersFromCookie) {
        return <div>No filters found</div>;
    }

    const fileNameFromUrl = params.queries.name as string;
    const filters: FilterFields = JSON.parse(decodeURIComponent(filtersFromCookie.value));
    const defaultKeys = Object.entries(filters).map(([key, objValue]) => {
        return {
            key,
            condition: objValue.condition,
            value: objValue.value,
        };
    });

    return (
        <main className="container h-full max-w-screen-2xl justify-center py-4">
            <FileInfo title="Filter Results" fileNameFromUrl={fileNameFromUrl} defaultKeys={defaultKeys} />
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
