import axios from "axios";
import {
    createWriteStream,
    promises as fsPromises,
} from "fs";

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
