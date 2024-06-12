import { FeedField } from "@/actions/helpers.actions";
import Pagination from "@/components/templates/Pagination";
import { fileOutputDir, itemPerPage } from "@/constants";
import { existsSync, promises as fsPromises } from "fs";
import path from "path";
import Filters from "./Filters";
import ItemData from "./ItemData";

async function getFile(uniqueFileId: string, page: number) {
    const fileName = `total_${uniqueFileId}.json`;

    try {
        const filePath = path.join(process.cwd(), "src", fileOutputDir, uniqueFileId, fileName);

        if (!existsSync(filePath)) {
            throw new Error("File not found");
        }

        const fileContent = await fsPromises.readFile(filePath, "utf8");
        const jsonData = JSON.parse(fileContent) as FeedField[];

        const startIndex = (page - 1) * itemPerPage;
        const paginatedResults = jsonData.slice(startIndex, startIndex + itemPerPage);

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
        <div className="mt-8">
            <Filters page={page} totalPageCount={totalPageCount} result={result} />
            <ItemData items={result.data} />
        </div>
    );
};

export default Items;
