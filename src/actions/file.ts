"use server";

import path from "path";
import { downloadFile, findFirstArray } from "./helpers";
import { existsSync, mkdirSync, promises as fsPromises } from "fs";
import { redirect } from "next/navigation";
import { parseStringPromise } from "xml2js";
import { itemPerPage } from "@/constants";
import { NUMBER_CONDITION_TYPES } from "@/constants/number";
import {
    STRING_CONDITION_TYPES,
    STRING_CONDITION_VALUES,
} from "@/constants/string";

export const fileDownload = async (formData: FormData) => {
    const url = formData.get("fileUrl") as string;

    const randomName = crypto.randomUUID();
    const outputPath = path.join(
        process.cwd(),
        "src",
        "uploadedFiles",
        randomName,
        randomName,
    );
    let keys;

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

        await fsPromises.writeFile(
            outputPath + ".json",
            JSON.stringify(resultArr, null, 2),
        );
    } catch (error) {
        const err = error as Error;
        return {
            message: err.message,
        };
    }

    redirect(`/filter?name=${randomName}&keys=${JSON.stringify(keys)}`);
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

type Condition = NUMBER_CONDITION_TYPES | STRING_CONDITION_TYPES | null;

export type FilterFields = {
    key: string;
    value: string | number;
    condition: Condition;
};

type FilterObj = {
    [index: string]: FilterFields;
};

export const submitFilters = async (fileName: string, formData: FormData) => {
    let outputArray: FilterFields[] = [];
    let totalPageCount = 0;

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
                groupedData[index] = { key: "", value: "", condition: null };
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
                groupedData[index].condition = strValue as Condition;
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

        const dirPath = path.join(
            process.cwd(),
            "src",
            "uploadedFiles",
            fileName,
        );
        const sourceFilePath = path.join(dirPath, fileName + ".json");
        const targetFilePath = path.join(
            dirPath,
            "total_" + fileName + ".json",
        );

        console.log("dirPath: ", dirPath);
        console.log("filePath: ", sourceFilePath);

        if (!existsSync(dirPath)) {
            throw new Error("Directory not found");
        }

        const fileContent = await fsPromises.readFile(sourceFilePath, "utf8");
        const jsonData = JSON.parse(fileContent);

        const result = jsonData.filter((item: { [key: string]: string }) => {
            return outputArray.every((filter) => {
                if (filter.condition === STRING_CONDITION_VALUES.EXACTLY) {
                    return item[filter.key] === filter.value.toString();
                }

                return item[filter.key].includes(filter.value.toString());
            });
        }) as unknown[];

        await fsPromises.writeFile(
            targetFilePath,
            JSON.stringify(result, null, 2),
        );

        totalPageCount = Math.max(Math.ceil(result.length / itemPerPage), 1);
    } catch (error) {
        const err = error as Error;
        return {
            message: err.message,
        };
    }

    const encodedOutputArray = encodeURIComponent(JSON.stringify(outputArray));
    redirect(
        `/file?name=${fileName}&page=1&totalPageCount=${totalPageCount}&filters=${encodedOutputArray}`,
    );
};
