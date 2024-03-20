"use server";

import path from "path";
import fs, { createWriteStream } from "fs";
import { parseStringPromise } from "xml2js";
import { promisify } from "util";
import Readline from "readline";
import axios, { AxiosError } from "axios";

const getRawTagName = (tag: string): string => {
  const startIndex = tag.startsWith("</") ? 2 : 1;
  const endIndex = tag.indexOf(">");
  return tag.substring(startIndex, endIndex);
};

const getExtensionFromContentType = (contentType: string): string => {
  const extensionMap: { [key: string]: string } = {
    "text/xml": ".xml",
    "application/json": ".json",
  };
  return extensionMap[contentType] || "";
};

const downloadFile = async (
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

const extractKeysFromXML = (filePath: string): Promise<Set<string>> => {
  const readStream = fs.createReadStream(filePath);
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

export async function extractKeys(
  prevState: any,
  formData: FormData
): Promise<ActionReturn<string>> {
  const url = formData.get("fileUrl") as string;

  if (!url) {
    return {
      success: false,
      message: "URL is required",
      data: null,
    };
  }

  const outputPath = path.join(
    process.cwd(),
    "src",
    "uploadedFiles",
    Date.now().toString()
  );

  try {
    const downloadedFilePath = await downloadFile(url, outputPath);
    const keys = await extractKeysFromXML(downloadedFilePath);

    const encodedKeys = encodeURIComponent(JSON.stringify(Array.from(keys)));
    const redirectUrl = `/keys?q=${encodedKeys}`;

    return { success: true, data: redirectUrl };
  } catch (error) {
    console.log("Hata nesnesi:", error);
    console.log("Hata türü:", typeof error);
    if (error instanceof Error) {
      console.log("Hata mesajı:", error.message);
    } else {
      console.log("Yakalanan hata bir Error nesnesi değil.");
    }

    return {
      success: false,
      message:
        error instanceof Error || error instanceof AxiosError
          ? error.message
          : "An error occurred",
      data: null,
    };
  }
}

type ItemObj = { [key: string]: string };

export async function processFile(desiredTags: string[]) {
  const readFileAsync = promisify(fs.readFile);

  const filePath = path.join(process.cwd(), "public", "fullFile.xml");

  try {
    const data = await readFileAsync(filePath, "utf8");

    const result = await parseStringPromise(data, {
      explicitArray: false,
      mergeAttrs: true,
      explicitRoot: false,
      attrkey: "deneme",
    });

    const mainKey = Object.keys(result)[0];
    const itemArr: ItemObj[] = result[mainKey];

    const filteredArr = itemArr.map((item) => {
      const filteredItem: ItemObj = {};
      desiredTags.forEach((tag: string) => {
        if (item.hasOwnProperty(tag)) {
          filteredItem[tag] = item[tag];
        }
      });
      return filteredItem;
    });

    return {
      success: true,
      data: filteredArr,
    };
  } catch (error) {
    console.error("Error processing the XML file:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "An error occurred",
      data: null,
    };
  }
}
