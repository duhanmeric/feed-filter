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

export type Condition = NUMBER_CONDITION_TYPES | STRING_CONDITION_TYPES | null;

export type FeedField = {
    [key: string]: string;
};

type FilterFieldValue = {
    value: string | number;
    condition: Condition;
};

export type FilterFields = {
    [key: string]: FilterFieldValue;
};

export const parseFormData = (formData: FormData) => {
    const formDataArr = formData.entries();
    const groupedData: FilterFields = {};

    let objKey = "";
    for (let [key, value] of formDataArr) {
        const strValue = value as string;

        if (!strValue.trim()) {
            throw new Error(`Form data for '${key}' cannot be empty.`);
        }

        const prop = key.split("?", 2)[1];

        if (prop !== "dataType" && prop !== "condition") {
            objKey = prop;
            groupedData[prop] = { value: strValue, condition: null };
        }

        if (prop === "condition") {
            groupedData[objKey].condition = strValue as Condition;
        }

        if (prop === "dataType") {
            if (strValue === "number") {
                const numberValue = Number(groupedData[objKey].value);
                if (isNaN(numberValue)) {
                    throw new Error(
                        `The value for '${groupedData[objKey].value}' is not a valid number.`,
                    );
                }
                groupedData[objKey].value = numberValue;
            }
        }
    }

    return groupedData;
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

function extractNumber(price: string) {
    let cleanPrice = price.replace(/[^\d\,\.\-]/g, "");

    let lastComma = cleanPrice.lastIndexOf(",");
    let lastDot = cleanPrice.lastIndexOf(".");

    if (lastDot > lastComma) {
        cleanPrice = cleanPrice.replace(/,/g, "");
    } else if (lastComma > lastDot) {
        cleanPrice = cleanPrice.replace(/\./g, "").replace(/,/g, ".");
    } else {
        cleanPrice = cleanPrice.replace(/[\,\.]/g, "");
    }

    return Math.floor(parseFloat(cleanPrice));
}

export const filterData = (jsonData: FeedField[], filters: FilterFields) => {
    const result = jsonData.filter((item: FeedField) => {
        return Object.keys(filters).every((key) => {
            const value = getNestedValue(item, key);
            const filter = filters[key];

            if (Array.isArray(value)) {
                if (typeof filter.value === "string") {
                    const isWordIncludes = value.find((v) => v.includes(filter.value));
                    return isWordIncludes && filterString(key, filter, item);
                } else {
                    const convertedNumberArr = value.map((v) => extractNumber(v));
                    return filterNumber(filter, convertedNumberArr);
                }
            } else {
                if (typeof filter.value === "string") {
                    return filterString(key, filter, item);
                }

                const extractedNumber = extractNumber(value);
                if (!extractedNumber) {
                    return false;
                }
                return filterNumber(filter, extractedNumber);
            }
        });
    });
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

export const getAllKeys = (obj: Record<string, any>, prefix: string = ""): string[] => {
    return Object.keys(obj).reduce((res: string[], el: string) => {
        if (typeof obj[el] === "object" && obj[el] !== null && !Array.isArray(obj[el])) {
            res = [...res, ...getAllKeys(obj[el], `${prefix}${el}.`)];
        } else {
            res.push(prefix + el);
        }
        return res;
    }, []);
};

const getNestedValue = (obj: any, key: string): any => {
    const keys = key.split(".");
    let result = obj;

    for (const k of keys) {
        if (Array.isArray(result)) {
            result = result.map((item) => item[k]).flat();
        } else {
            if (result == null) {
                return undefined;
            }
            result = result[k];
        }
    }

    return result;
};

export const filterString = (filterKey: string, filterVal: FilterFieldValue, item: FeedField) => {
    const path = getNestedValue(item, filterKey);
    const isPathArray = Array.isArray(path);

    if (filterVal.condition === STRING_CONDITION_VALUES.EXACTLY) {
        return isPathArray ? path.includes(filterVal.value) : path === filterVal.value;
    }

    return isPathArray
        ? path.some((p: string) => p.includes(filterVal.value.toString()))
        : path.includes(filterVal.value.toString());
};

export const filterNumber = (filter: FilterFieldValue, extractedNumber: number | number[]) => {
    const value = filter.value as number;

    if (Array.isArray(extractedNumber)) {
        return extractedNumber.some((num) => checkNumberCondition(filter.condition!, num, value));
    }

    return checkNumberCondition(filter.condition!, extractedNumber, value);
};

const checkNumberCondition = (condition: string, num: number, value: number) => {
    switch (condition) {
        case NUMBER_CONDITION_VALUES.GREATER_THAN:
            return num > value;
        case NUMBER_CONDITION_VALUES.LESS_THAN:
            return num < value;
        case NUMBER_CONDITION_VALUES.EQUAL:
            return num === value;
        case NUMBER_CONDITION_VALUES.NOT_EQUAL:
            return num !== value;
        case NUMBER_CONDITION_VALUES.GREATER_THAN_OR_EQUAL:
            return num >= value;
        case NUMBER_CONDITION_VALUES.LESS_THAN_OR_EQUAL:
            return num <= value;
        default:
            return false;
    }
};
