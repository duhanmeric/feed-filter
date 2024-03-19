"use server";

import path from "path";
import fs from "fs";
import { parseStringPromise } from "xml2js";
import {
  Data,
  FeedKey,
  InitialState,
} from "@/components/templates/FileFormURL";
import { promisify } from "util";
import sax from "sax";
import Readline from "readline";
import { JSDOM } from "jsdom";
import { redirect } from "next/navigation";

const getRawTagName = (tag: string): string => {
  // Tag'in başlangıç ve bitiş işaretlerini kontrol et ve içeriği al
  const startIndex = tag.startsWith("</") ? 2 : 1;
  const endIndex = tag.indexOf(">");
  return tag.substring(startIndex, endIndex);
};

export async function extractKeys(
  prevState: any,
  formData: FormData
): Promise<InitialState<string>> {
  console.log("istek geldi");

  const filePath = path.join(process.cwd(), "public", "fullFile.xml");
  const readStream = fs.createReadStream(filePath);
  const rl = Readline.createInterface({
    input: readStream,
    crlfDelay: Infinity,
  });

  let keys = new Set<string>();
  let isItemFound = false;
  let currentItemTag = "";

  return new Promise((resolve) => {
    rl.on("line", (line) => {
      if (isItemFound) return;

      const trimmedLine = line.trim();

      if (trimmedLine.startsWith("<") && !trimmedLine.startsWith("</")) {
        keys.add(getRawTagName(trimmedLine));
      } else if (trimmedLine.startsWith("</")) {
        isItemFound = true;
        currentItemTag = getRawTagName(trimmedLine);
        console.log("currentItemTag", currentItemTag);

        rl.close();
      }
    });

    rl.on("close", () => {
      console.log("close event emitted");
      const keyArr = Array.from(keys);
      const startIndex = keyArr.indexOf(currentItemTag);
      const filteredKeys = keyArr.slice(startIndex + 1);

      const encodedKeys = encodeURIComponent(JSON.stringify(filteredKeys));
      const redirectUrl = `/keys?q=${encodedKeys}`;

      readStream.destroy();

      resolve({
        success: true,
        data: redirectUrl,
      });
    });

    rl.on("error", (err) => {
      console.log("An error occurred:", err);
      resolve({
        success: false,
        message: "An error occurred while reading the file",
        data: null,
      });
    });
  });
}
type ItemObj = {
  [key: string]: string;
};
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
