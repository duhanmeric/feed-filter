"use server";

import path from "path";
import fs from "fs";
import { parseStringPromise } from "xml2js";
import { Data, InitialState } from "@/components/templates/FileFormURL";
import { promisify } from "util";

export async function processFile(
  prevState: any,
  formData: FormData
): Promise<InitialState<Data>> {
  const readFileAsync = promisify(fs.readFile);

  const filePath = path.join(process.cwd(), "public", "product.xml");

  try {
    const data = await readFileAsync(filePath, "utf8");

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const result = await parseStringPromise(data, {
      explicitArray: false,
      mergeAttrs: true,
      explicitRoot: false,
    });

    const mainKey = Object.keys(result)[0];
    const productArray = result[mainKey];

    const keys = productArray.length > 0 ? Object.keys(productArray[0]) : [];

    console.log("Parsed XML:", result, keys);

    return {
      success: true,
      data: {
        result,
        keys,
      },
    };
  } catch (error) {
    console.error("Error processing the XML file:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
}
