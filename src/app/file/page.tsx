import path from "path";
import { existsSync, promises as fsPromises } from "fs";
import { FeedField } from "@/actions/file";
import Pagination from "./Pagination";
import { itemPerPage } from "@/constants";

async function getFile(uniqueFileId: string, page: number) {
    const fileName = `total_${uniqueFileId}.json`;

    try {
        const filePath = path.join(
            process.cwd(),
            "src",
            "uploadedFiles",
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
        <main className="h-full p-4">
            <h1 className="text-2xl font-bold">Your Filter Results</h1>
            Your file name: {fileNameFromUrl}
            <br />
            Your filters: {filtersFromUrl}
            <br />
            <div>
                <div className="flex items-center justify-between">
                    <div>
                        <span>{result.totalCount}</span> items found
                    </div>
                    <div>
                        Current page: {page}/{totalPageCount}
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
                        <pre className="whitespace-break-spaces text-sm">
                            {JSON.stringify(item, null, 2)}
                        </pre>
                    </div>
                ))}
            </div>
        </main>
    );
}
