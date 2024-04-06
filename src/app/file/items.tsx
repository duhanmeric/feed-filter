import { FeedField } from "@/actions/file.actions";
import Pagination from "@/components/templates/Pagination";
import { fileOutputDir, itemPerPage } from "@/constants";
import { existsSync, promises as fsPromises } from "fs";
import path from "path";

async function getFile(uniqueFileId: string, page: number) {
    const fileName = `total_${uniqueFileId}.json`;

    try {
        const filePath = path.join(
            process.cwd(),
            "src",
            fileOutputDir,
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

type Props = {
    fileNameFromUrl: string;
    page: string;
    totalPageCount: string;
};

const Items = async ({ fileNameFromUrl, page, totalPageCount }: Props) => {
    const result = await getFile(fileNameFromUrl, Number(page));
    return (
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
    );
};

export default Items;
