import path from "path";
import { existsSync, promises as fsPromises } from "fs";
import { FeedField, FilterFields } from "@/actions/file.actions";
import Pagination from "@/components/templates/Pagination";
import { itemPerPage } from "@/constants";
import { Badge } from "@/components/ui/badge";

async function getFile(uniqueFileId: string, page: number) {
    const fileName = `total_${uniqueFileId}.json`;

    try {
        const filePath = path.join(
            process.cwd(),
            "src",
            fileOutputDir",
            uniqueFileId,
            fileName,
        );

        if (!existsSync(filePath)) {
            throw new Error("File not found");
        }

        const fileContent = await fsPromises.readFile(filePath, "utf8");
        const jsonData = JSON.parse(fileContent) as FeedField[];

        const startIndex = (page - 1) * itemPerPage;
        const paginatedResults = jsonData.slice(
            startIndex,
            startIndex + itemPerPage,
        );

        return {
            data: paginatedResults,
            totalCount: jsonData.length,
        };
    } catch (error) {
        console.error("Error reading file:", error);
        throw error;
    }
}

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

    const result = await getFile(fileNameFromUrl, Number(page));
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
            <div>
                <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
                    <div>
                        <span>{result.totalCount}</span> items found
                    </div>
                    <Pagination
                        currentPage={Number(page)}
                        totalPageCount={Number(totalPageCount)}
                    />
                </div>
                {result.data.map((item, index) => (
                    <div
                        key={index}
                        className="my-4 rounded-sm border border-black p-4"
                    >
                        <pre className="whitespace-break-spaces break-words text-sm">
                            {JSON.stringify(item, null, 2)}
                        </pre>
                    </div>
                ))}
                <div className="flex justify-center md:justify-end">
                    <Pagination
                        currentPage={Number(page)}
                        totalPageCount={Number(totalPageCount)}
                    />
                </div>
            </div>
        </main>
    );
}
