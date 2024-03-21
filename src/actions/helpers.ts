import axios from "axios";
import { createReadStream, createWriteStream } from "fs";
import Readline from "readline";

export const getRawTagName = (tag: string): string => {
    const startIndex = tag.startsWith("</") ? 2 : 1;
    const endIndex = tag.indexOf(">");
    return tag.substring(startIndex, endIndex);
};

export const getExtensionFromContentType = (contentType: string): string => {
    const extensionMap: { [key: string]: string } = {
        "text/xml": ".xml",
        "application/json": ".json",
    };
    return extensionMap[contentType] || "";
};

export const downloadFile = async (
    url: string,
    outputPath: string
): Promise<string> => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(url, { responseType: "stream" });
            const extension = getExtensionFromContentType(
                response.headers["content-type"]
            );

            const fullOutputPath = outputPath + extension;
            const writer = createWriteStream(fullOutputPath);

            response.data.pipe(writer);

            writer.on("finish", () => resolve(fullOutputPath));
            writer.on("error", (error) =>
                reject(new Error(`Error writing the file: ${error.message}`))
            );
        } catch (error) {
            if (axios.isAxiosError(error)) {
                reject(new Error(`Error downloading the file: ${error.message}`));
            } else {
                reject(new Error("An unexpected error occurred"));
            }
        }
    });
};

export const extractKeysFromXML = (filePath: string): Promise<Set<string>> => {
    const readStream = createReadStream(filePath);
    const rl = Readline.createInterface({
        input: readStream,
        crlfDelay: Infinity,
    });

    let keys = new Set<string>();
    let isItemFound = false;

    return new Promise((resolve, reject) => {
        rl.on("line", (line) => {
            if (isItemFound) return;

            const trimmedLine = line.trim();

            if (trimmedLine.startsWith("<") && !trimmedLine.startsWith("</")) {
                keys.add(getRawTagName(trimmedLine));
            } else if (trimmedLine.startsWith("</")) {
                isItemFound = true;
                rl.close();
            }
        });

        rl.on("close", () => {
            resolve(keys);
        });

        rl.on("error", (error) => {
            reject(error);
        });
    });
};