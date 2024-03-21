"use server";

import path from "path";
import fs, { existsSync, mkdirSync } from "fs";
import { parseStringPromise } from "xml2js";
import { promisify } from "util";
import { AxiosError } from "axios";
import { downloadFile, extractKeysFromXML } from "./helpers";

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

  const directory = path.dirname(outputPath);
  if (!existsSync(directory)) {
    mkdirSync(directory, { recursive: true });
  }

  try {
    const downloadedFilePath = await downloadFile(url, outputPath);
    const keys = await extractKeysFromXML(downloadedFilePath);

    const encodedKeys = encodeURIComponent(JSON.stringify(Array.from(keys)));
    const redirectUrl = `/keys?q=${encodedKeys}`;

    return { success: true, data: redirectUrl };
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
