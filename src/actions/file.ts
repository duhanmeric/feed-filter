"use server";

import path from "path";
import { downloadFile, findFirstArray, splitArrayIntoChunks } from "./helpers";
import { existsSync, mkdirSync, promises as fsPromises } from "fs";
import { redirect } from "next/navigation";
import { parseStringPromise } from "xml2js";

export const fileDownload = async (formData: FormData) => {
    const url = formData.get("fileUrl") as string;

    const randomName = crypto.randomUUID();
    const outputPath = path.join(process.cwd(), "src", "uploadedFiles", randomName, randomName);
    let keys, totalFileCount = 0;

    try {
        if (!url) {
            throw new Error("URL and file name are required");
        }

        const directory = path.dirname(outputPath);
        if (!existsSync(directory)) {
            mkdirSync(directory, { recursive: true });
        }

        const fileContent = await downloadFile(url, outputPath);
        const result = await parseStringPromise(fileContent, {
            explicitArray: false,
            mergeAttrs: true,
            explicitRoot: false,
            ignoreAttrs: true,
        });
        const resultArr = findFirstArray(result);
        keys = Object.keys(resultArr[0]);

        const arrayChunks = splitArrayIntoChunks(resultArr, 1000);

        for (let i = 0; i < arrayChunks.length; i++) {
            const filePath = `${outputPath}_part${i + 1}.json`;
            await fsPromises.writeFile(
                filePath,
                JSON.stringify(arrayChunks[i], null, 2),
            );
        }

        totalFileCount = arrayChunks.length;

        console.log(resultArr.length);
    } catch (error) {
        const err = error as Error;
        return {
            message: err.message,
        };
    }

    redirect(`/filter?name=${randomName}&fileCount=${totalFileCount}&keys=${JSON.stringify(keys)}`);
};

export const deleteFiles = async () => {
    const directory = path.join(process.cwd(), "src", "uploadedFiles");

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
};

export type FilterFields = {
    key: string;
    value: string | number;
    condition: string;
}

type FilterObj = {
    [index: string]: FilterFields;
}

export const submitFilters = async (totalFileCount: number, fileName: string, formData: FormData) => {

    let outputArray: FilterFields[] = [];

    try {
        const formDataArr = formData.entries();
        const groupedData: FilterObj = {};

        for (let [key, value] of formDataArr) {
            const strValue = value as string;

            if (!strValue.trim()) {
                throw new Error(`Form data for '${key}' cannot be empty.`);
            }

            const [index, property] = key.split("?", 2);

            if (!groupedData[index]) {
                groupedData[index] = { key: "", value: "", condition: "" };
            }

            if (property === "dataType") {
                if (strValue === "number") {
                    const numberValue = Number(groupedData[index].value);
                    if (isNaN(numberValue)) {
                        throw new Error(
                            `The value for '${groupedData[index].key}' is not a valid number.`,
                        );
                    }
                    groupedData[index].value = numberValue;
                }
            } else if (property === "condition") {
                groupedData[index].condition = strValue;
            } else {
                groupedData[index].key = property;
                groupedData[index].value = strValue;
            }
        }

        outputArray = Object.values(groupedData).map((item) => ({
            key: item.key,
            value: item.value,
            condition: item.condition,
        }));

    } catch (error) {
        const err = error as Error;
        return {
            message: err.message,
        };
    }

    console.log(outputArray);
    const encodedOutputArray = encodeURIComponent(JSON.stringify(outputArray));
    redirect(`/file?name=${fileName}&part=1&filters=${encodedOutputArray}&fileCount=${totalFileCount}`);
};
