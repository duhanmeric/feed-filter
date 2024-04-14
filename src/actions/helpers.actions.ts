import { STRING_CONDITION_TYPES, STRING_CONDITION_VALUES } from "@/constants/string";
import axios from "axios";
import { createWriteStream, existsSync, promises as fsPromises, mkdirSync } from "fs";
import { NUMBER_CONDITION_TYPES, NUMBER_CONDITION_VALUES } from "@/constants/number";
import path from "path";
import { parseStringPromise } from "xml2js";
import { fileOutputDir } from "@/constants";

export const getExtensionFromContentType = (contentType: string): string => {
    if (contentType.includes("xml")) {
        return ".xml";
    }

    throw new Error(`Unsupported content type: ${contentType}`);
};

export const downloadFile = async (url: string, outputPath: string): Promise<string> => {
    try {
        const res = await axios.get(url, {
            responseType: "stream",
            timeout: 30000,
            timeoutErrorMessage: "Timeout",
            insecureHTTPParser: true,
        });

        const directory = path.dirname(outputPath);
        if (!existsSync(directory)) {
            mkdirSync(directory, { recursive: true });
        }

        const extension = getExtensionFromContentType(res.headers["content-type"]);
        const fullOutputPath = outputPath + extension;
        await streamToFile(res.data, fullOutputPath);

        return fsPromises.readFile(fullOutputPath, { encoding: "utf8" });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(`Error downloading the file: ${error.message}`);
        }
        throw new Error(
            `An unexpected error occurred, here error lies ${(error as Error).message}`,
        );
    }
};

const streamToFile = async (stream: NodeJS.WriteStream, outputPath: string) => {
    return new Promise((resolve, reject) => {
        const writer = createWriteStream(outputPath);
        stream.pipe(writer);
        writer.on("finish", resolve);
        writer.on("error", reject);
    });
};

export const findFirstArray = (data: any): any => {
    if (Array.isArray(data)) {
        return data;
    } else if (typeof data === "object" && data !== null) {
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const result = findFirstArray(data[key]);
                if (result) return result;
            }
        }
    }
    return null;
};

type FilterObj = {
    [index: string]: FilterFields;
};

type Condition = NUMBER_CONDITION_TYPES | STRING_CONDITION_TYPES | null;

export type FilterFields = {
    key: string;
    value: string | number;
    condition: Condition;
};

export type FeedField = {
    [key: string]: string;
};

export const parseFormData = (formData: FormData) => {
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

    return Object.values(groupedData).map((item) => ({
        key: item.key,
        value: item.value,
        condition: item.condition,
    }));
};

export const getFilePaths = (fileName: string) => {
    const dirPath = path.join(process.cwd(), "src", fileOutputDir, fileName);
    const sourceFilePath = path.join(dirPath, fileName + ".json");
    const targetFilePath = path.join(dirPath, "total_" + fileName + ".json");

    if (!existsSync(dirPath)) {
        throw new Error("Directory not found");
    }

    return { sourceFilePath, targetFilePath };
};

export const filterData = (jsonData: FeedField[], filters: FilterFields[]) => {
    const result = jsonData.filter((item: FeedField) => {
        return filters.every((filter) => {
            if (!item[filter.key]) {
                return false;
            }

            if (typeof filter.value === "string") {
                return filterString(filter, item);
            }

            const extractedNumber = item[filter.key].match(/[0-9.,]+/g);
            if (!extractedNumber) {
                return false;
            }

            return filterNumber(filter, Number(extractedNumber[0]));
        });
    }) as unknown[];

    return result;
};

export const parseAndExtract = async (fileContent: string) => {
    const result = await parseStringPromise(fileContent, {
        explicitArray: false,
        mergeAttrs: true,
        explicitRoot: false,
        ignoreAttrs: true,
    });
    return findFirstArray(result);
};

export const filterString = (filter: FilterFields, item: FeedField) => {
    if (filter.condition === STRING_CONDITION_VALUES.EXACTLY) {
        return item[filter.key] === filter.value.toString();
    }

    return item[filter.key].includes(filter.value.toString());
};

export const filterNumber = (filter: FilterFields, extractedNumber: number) => {
    const value = filter.value as number;

    switch (filter.condition) {
        case NUMBER_CONDITION_VALUES.GREATER_THAN:
            return extractedNumber > value;
        case NUMBER_CONDITION_VALUES.LESS_THAN:
            return extractedNumber < value;
        case NUMBER_CONDITION_VALUES.EQUAL:
            return extractedNumber === value;
        case NUMBER_CONDITION_VALUES.NOT_EQUAL:
            return extractedNumber !== value;
        case NUMBER_CONDITION_VALUES.GREATER_THAN_OR_EQUAL:
            return extractedNumber >= value;
        case NUMBER_CONDITION_VALUES.LESS_THAN_OR_EQUAL:
            return extractedNumber <= value;
        default:
            return false;
    }
};
