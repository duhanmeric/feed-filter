// import FileOutput from "@/components/templates/FileOutput";

import path from "path";
import { existsSync, promises as fsPromises } from "fs";
import { FilterFields } from "@/actions/file";
import Pagination from "./Pagination";

async function getFile(baseFileName: string, part: string, filters: FilterFields[]) {
    const fileName = `${baseFileName}_part${part}.json`;
    console.log(filters);

    try {
        const filePath = path.join(process.cwd(), "src", "uploadedFiles", baseFileName, fileName);

        if (!existsSync(filePath)) {
            throw new Error("File not found");
        }

        const fileContent = await fsPromises.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(fileContent);

        const result = jsonData.filter((item: { [key: string]: string }) => {
            return filters.every((filter) => {
                return item[filter.key].includes(filter.value.toString());
            });
        }) as unknown[];

        return result;
    } catch (error) {
        console.error('Error reading file:', error);
        throw error;
    }
}

export default async function FilePage({
    searchParams,
}: {
    searchParams?: { [key: string]: string };
}) {

    const { name, part, filters, fileCount } = searchParams || {};

    if (!name) {
        return <div>No file name found</div>;
    }

    if (!filters) {
        return <div>No filters found</div>;
    }

    if (!part) {
        return <div>No part found</div>;
    }

    if (!fileCount) {
        return <div>No total file count found</div>;
    }

    const fileNameFromUrl = name as string;
    const filePart = part as string;
    const filterFromUrl = decodeURIComponent(filters);

    const result = await getFile(fileNameFromUrl, filePart, JSON.parse(filterFromUrl));
    return (
        <main className="h-full p-4">
            Your file name: {fileNameFromUrl}
            <br />
            Your filters: {filterFromUrl}
            <br />
            <div>
                <span>{result?.length}</span> items found
                <br />
                Current page: {filePart}/{fileCount}
                <br />
                <Pagination currentPart={Number(filePart)} maxPartCount={Number(fileCount)} />
                <pre>{JSON.stringify(result, null, 2)}</pre>
            </div>
            {/* <FileOutput fileName={fileNameFromUrl} /> */}
        </main>
    );
}
