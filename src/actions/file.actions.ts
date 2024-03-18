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

const getRawTagName = (tag: string): string => {
  const endIndex = tag.indexOf(">");
  const cleanTag = endIndex !== -1 ? tag.substring(0, endIndex) : tag;
  return cleanTag.replace(/[^a-zA-Z]+/g, "");
};

export async function extractKeys(
  prevState: any,
  formData: FormData
): Promise<InitialState<FeedKey>> {
  console.log("istek geldi");

  const filePath = path.join(process.cwd(), "public", "product.xml");
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
        rl.close();
      }
    });

    rl.on("close", () => {
      console.log("close event emitted");
      const keyArr = Array.from(keys);
      const startIndex = keyArr.indexOf(currentItemTag);
      const filteredKeys = keyArr.slice(startIndex + 1);

      // console.log(keyArr, startIndex, filteredKeys);

      readStream.destroy();
      resolve({
        success: true,
        data: filteredKeys,
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

// export async function processFile(
//   prevState: any,
//   formData: FormData
// ): Promise<InitialState<Data>> {
//   const readFileAsync = promisify(fs.readFile);

//   const filePath = path.join(process.cwd(), "public", "product.xml");

//   try {
//     const data = await readFileAsync(filePath, "utf8");

//     await new Promise((resolve) => setTimeout(resolve, 1000));

//     const result = await parseStringPromise(data, {
//       explicitArray: false,
//       mergeAttrs: true,
//       explicitRoot: false,
//     });

//     const mainKey = Object.keys(result)[0];
//     const itemArr = result[mainKey];

//     const keys = itemArr.length > 0 ? Object.keys(itemArr[0]) : [];

//     // console.log("Parsed XML:", itemArr, result, keys);
//     console.log(itemArr.length);

//     return {
//       success: true,
//       data: {
//         result: itemArr,
//         keys,
//       },
//     };
//   } catch (error) {
//     console.error("Error processing the XML file:", error);
//     return {
//       success: false,
//       message: error instanceof Error ? error.message : "An error occurred",
//       data: null,
//     };
//   }
// }
