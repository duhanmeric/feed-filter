// import FileOutput from "@/components/templates/FileOutput";

import path from "path";
import { existsSync, promises as fsPromises } from "fs";
import { FilterFields } from "@/actions/file";
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
        const jsonData = JSON.parse(fileContent);

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
            Your file name: {fileNameFromUrl}
            <br />
            Your filters: {filtersFromUrl}
            <br />
            <div>
                <span>{result.totalCount}</span> items found
                <br />
                Current page: {page}/{totalPageCount}
                <br />
                <Pagination
                    currentPage={Number(page)}
                    totalPageCount={Number(totalPageCount)}
                />
                <pre>{JSON.stringify(result.data, null, 2)}</pre>
            </div>
            {/* <FileOutput fileName={fileNameFromUrl} /> */}
        </main>
    );
}
