"use server";

import path, { join } from "path";
import fs, { existsSync, mkdirSync } from "fs";
import { parseStringPromise } from "xml2js";
import { promisify } from "util";
import { AxiosError } from "axios";
import { downloadFile, extractKeysFromXML } from "./helpers";


function findFirstArray(data: any): any {
  if (Array.isArray(data)) {
    return data;
  } else if (typeof data === 'object' && data !== null) {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const result = findFirstArray(data[key]);
        if (result) return result;
      }
    }
  }
  return null;
}

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

  const tmp = Date.now().toString();

  const outputPath = path.join(
    process.cwd(),
    "src",
    "uploadedFiles",
    tmp
  );

  const directory = path.dirname(outputPath);
  if (!existsSync(directory)) {
    mkdirSync(directory, { recursive: true });
  }

  // const readFileAsync = promisify(fs.readFile);

  try {
    const filePath = await downloadFile(url, outputPath);
    const fileName = filePath.replace(/^.*[\\/]/, '');

    // const data = await readFileAsync(downloadedFilePath, "utf8");

    // const result = await parseStringPromise(data, {
    //   explicitArray: false,
    //   mergeAttrs: true,
    //   explicitRoot: false,
    //   ignoreAttrs: true,
    // });

    // const productDetails = findFirstArray(result);

    // const keys = productDetails.length > 0 ? Object.keys(productDetails[0]) : [];

    // const encodedKeys = encodeURIComponent(JSON.stringify(Array.from(keys)));
    // const redirectUrl = `/file?q=${encodedKeys}`;

    return { success: true, data: `/file?name=${fileName}` };
  } catch (error) {
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

export async function processFile(fileName: string) {
  const readFileAsync = promisify(fs.readFile);

  const filePath = path.join(
    process.cwd(),
    "src",
    "uploadedFiles",
    fileName
  );

  try {
    const data = await readFileAsync(filePath, "utf8");

    const result = await parseStringPromise(data, {
      explicitArray: false,
      mergeAttrs: true,
      explicitRoot: false,
      ignoreAttrs: true,
    });

    // console.log(result);

    // const mainKey = Object.keys(result)[0];
    // const itemArr: ItemObj[] = result[mainKey];

    const productDetails = findFirstArray(result);
    const keys = productDetails.length > 0 ? Object.keys(productDetails[0]) : [];

    return {
      success: true,
      data: {
        keys,
        items: productDetails,
      },
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
