import { STRING_CONDITION_VALUES } from "@/constants/string";
import axios from "axios";
import { createWriteStream, promises as fsPromises } from "fs";
import { FeedField, FilterFields } from "./file";
import { NUMBER_CONDITION_VALUES } from "@/constants/number";

export const getExtensionFromContentType = (contentType: string): string => {
    if (contentType.includes("xml")) {
        return ".xml";
    }

    throw new Error("Unsupported content type");
};

export const downloadFile = async (
    url: string,
    outputPath: string,
): Promise<string> => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(url, { responseType: "stream" });
            const extension = getExtensionFromContentType(
                response.headers["content-type"],
            );

            const fullOutputPath = outputPath + extension;
            const writer = createWriteStream(fullOutputPath);

            response.data.pipe(writer);

            writer.on("finish", async () => {
                const content = await fsPromises.readFile(fullOutputPath, {
                    encoding: "utf8",
                });
                resolve(content);
            });
            writer.on("error", (error) =>
                reject(new Error(`Error writing the file: ${error.message}`)),
            );
        } catch (error) {
            if (axios.isAxiosError(error)) {
                reject(
                    new Error(`Error downloading the file: ${error.message}`),
                );
            } else {
                reject(new Error("An unexpected error occurred"));
            }
        }
    });
};

export function findFirstArray(data: any): any {
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
}

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
