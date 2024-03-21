import axios from "axios";
import { createReadStream, createWriteStream } from "fs";
import Readline from "readline";

export const getRawTagName = (tag: string): string => {
    const startIndex = tag.startsWith("</") ? 2 : 1;
    const endIndex = tag.indexOf(">");
    return tag.substring(startIndex, endIndex);
};

export const getExtensionFromContentType = (contentType: string): string => {
    if (contentType.includes("xml")) {
        return ".xml";
    }

    throw new Error("Unsupported content type");
    // const extensionMap: { [key: string]: string } = {
    //     "text/xml": ".xml",
    //     "application/json": ".json",
    // };
    // return extensionMap[contentType] || "";
};

export const downloadFile = async (
    url: string,
    outputPath: string
): Promise<string> => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(url, { responseType: "stream" });
            // console.log(response);

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
    let currentItemTag = "";

    let depth = 0;
    let depthMap = new Map();

    return new Promise((resolve, reject) => {
        rl.on("line", (line) => {
            if (isItemFound) return;

            const trimmedLine = line.trim();

            const tagName = getRawTagName(trimmedLine);

            if (trimmedLine.startsWith("<") && !trimmedLine.startsWith("</") && !trimmedLine.startsWith("<?")) {
            } else if (trimmedLine.startsWith("</")) {
                depth--;
                isItemFound = true;
                currentItemTag = getRawTagName(trimmedLine);
                rl.close();
            }
        });


        const deneme = {
            "rss": "0",
            "channel": "1",
            "item": "2",
            "id": "3",
            "shipping": "3",
            "price": "4"
        }

        rl.on("close", () => {
            const keyArr = Array.from(keys);
            const startIndex = keyArr.indexOf(currentItemTag);
            const filteredKeys = keyArr.slice(startIndex + 1);

            console.log(depthMap);

            // console.log(keyArr, startIndex, filteredKeys);

            resolve(keys);
        });

        rl.on("error", (error) => {
            reject(error);
        });
    });
};