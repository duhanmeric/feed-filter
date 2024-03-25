import axios from "axios";
import {
  createReadStream,
  createWriteStream,
  promises as fsPromises,
} from "fs";
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

      writer.on("finish", async () => {
        const content = await fsPromises.readFile(fullOutputPath, {
          encoding: "utf8",
        });
        resolve(content);
      });
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

      if (
        trimmedLine.startsWith("<") &&
        !trimmedLine.startsWith("</") &&
        !trimmedLine.startsWith("<?")
      ) {
      } else if (trimmedLine.startsWith("</")) {
        depth--;
        isItemFound = true;
        currentItemTag = getRawTagName(trimmedLine);
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

export const splitArrayIntoChunks = (array: any[], chunkSize: number) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};
