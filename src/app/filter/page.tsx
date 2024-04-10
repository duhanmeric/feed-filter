import KeyFilter from "@/components/templates/KeyFilter";
import { Badge } from "@/components/ui/badge";
import { TEST_SELECTORS } from "@/constants";
import { getSearchParams } from "@/lib/utils";

export default function FilterPage({ searchParams }: Params) {
    const params = getSearchParams(searchParams, "name", "keys");

    if (!params.found) {
        return <div>No {params.missingParam} found</div>;
    }

    const fileNameFromUrl = params.queries.name as string;
    const fileKeysFromUrl = JSON.parse(decodeURIComponent(params.queries.keys));

    return (
        <main className="container h-full max-w-screen-2xl justify-center py-4">
            <h1 className="text-2xl font-bold">Filter Keys</h1>
            <div className="mb-2">
                <span>Your file name: </span>
                <Badge variant="secondary" data-testid={TEST_SELECTORS.FILENAME}>
                    {fileNameFromUrl}
                </Badge>
            </div>

            <KeyFilter fileName={fileNameFromUrl} keys={fileKeysFromUrl} />
        </main>
    );
}
