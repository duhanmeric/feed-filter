"use server";

import path from "path";
import {
    downloadFile,
    filterData,
    getFilePaths,
    parseAndExtract,
    parseFormData,
} from "./helpers.actions";
import { promises as fsPromises } from "fs";
import { redirect } from "next/navigation";
import { fileDestroyDuration, fileOutputDir, itemPerPage } from "@/constants";

export const fileDownload = async (formData: FormData) => {
    const url = formData.get("fileUrl") as string;

    const randomName = crypto.randomUUID();
    const directoryPath = path.join(process.cwd(), "src", fileOutputDir, randomName);
    const outputPath = path.join(directoryPath, randomName);

    let keys: string[] = [];

    try {
        if (!url) {
            throw new Error("URL is required");
        }

        const fileContent = await downloadFile(url, outputPath);
        const resultArr = await parseAndExtract(fileContent);

        keys = [...Object.keys(resultArr[0])];

        await fsPromises.writeFile(outputPath + ".json", JSON.stringify(resultArr, null, 2));

        setTimeout(() => deleteDirectory(randomName), fileDestroyDuration);
    } catch (error) {
        const err = error as Error;
        return {
            message: err.message,
        };
    }

    const encodedKeys = encodeURIComponent(JSON.stringify(keys));
    redirect(`/filter?name=${randomName}&keys=${encodedKeys}`);
};

export const clearFiles = async () => {
    const directory = path.join(process.cwd(), "src", fileOutputDir);

    const deleteRecursively = async (dir: string) => {
        const files = await fsPromises.readdir(dir, { withFileTypes: true });

        for (const file of files) {
            const filePath = path.join(dir, file.name);
            if (file.isDirectory()) {
                await deleteRecursively(filePath);
                await fsPromises.rmdir(filePath);
            } else {
                await fsPromises.unlink(filePath);
            }
        }
    };

    try {
        await deleteRecursively(directory);
    } catch (error) {
        console.error(error);
    }

    redirect("/");
};

export const deleteDirectory = async (directoryId: string) => {
    const dir = path.join(process.cwd(), "src", fileOutputDir, directoryId);

    try {
        await fsPromises.access(dir);

        const files = await fsPromises.readdir(dir, { withFileTypes: true });

        for (const file of files) {
            const filePath = path.join(dir, file.name);
            if (file.isDirectory()) {
                await deleteDirectory(filePath);
            } else {
                await fsPromises.unlink(filePath);
            }
        }

        await fsPromises.rmdir(dir);
    } catch (error) {
        if (error instanceof Error && "code" in error) {
            if (error.code === "ENOENT") {
                console.log(`Directory does not exist: ${dir}`);
            } else {
                console.error(`Error deleting directory ${dir}: ${error.message}`);
            }
        } else {
            console.error(`An unexpected error occurred: ${error}`);
        }
    }

    redirect("/");
};

export const submitFilters = async (fileName: string, formData: FormData) => {
    let totalPageCount = 0;
    let encodedOutputArray = "";

    try {
        const filters = parseFormData(formData);
        encodedOutputArray = encodeURIComponent(JSON.stringify(filters));

        const { sourceFilePath, targetFilePath } = getFilePaths(fileName);

        const jsonData = JSON.parse(await fsPromises.readFile(sourceFilePath, "utf8"));
        const filteredData = filterData(jsonData, filters);

        totalPageCount = Math.max(Math.ceil(filteredData.length / itemPerPage), 1);

        await fsPromises.writeFile(targetFilePath, JSON.stringify(filteredData, null, 2));
    } catch (error) {
        return { message: (error as Error).message };
    }

    redirect(
        `/file?name=${fileName}&page=1&totalPageCount=${totalPageCount}&filters=${encodedOutputArray}`,
    );
};
