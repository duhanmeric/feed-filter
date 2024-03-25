"use server";

import path from "path";
import { downloadFile, findFirstArray, splitArrayIntoChunks } from "./helpers";
import { existsSync, mkdirSync, promises as fsPromises } from "fs";
import { redirect } from "next/navigation";
import { parseStringPromise } from "xml2js";

export const fileDownload = async (formData: FormData) => {
  const url = formData.get("fileUrl") as string;

  const tmp = crypto.randomUUID();
  const outputPath = path.join(process.cwd(), "src", "uploadedFiles", tmp);
  let keys;

  try {
    if (!url) {
      throw new Error("URL and file name are required");
    }

    const directory = path.dirname(outputPath);
    if (!existsSync(directory)) {
      mkdirSync(directory, { recursive: true });
    }

    const fileContent = await downloadFile(url, outputPath);
    const result = await parseStringPromise(fileContent, {
      explicitArray: false,
      mergeAttrs: true,
      explicitRoot: false,
      ignoreAttrs: true,
    });
    const resultArr = findFirstArray(result);
    keys = Object.keys(resultArr[0]);

    const arrayChunks = splitArrayIntoChunks(resultArr, 1000);

    for (let i = 0; i < arrayChunks.length; i++) {
      const filePath = `${outputPath}_part${i + 1}.json`;
      await fsPromises.writeFile(
        filePath,
        JSON.stringify(arrayChunks[i], null, 2)
      );
    }

    console.log(resultArr.length);
  } catch (error) {
    const err = error as Error;
    return {
      message: err.message,
    };
  }

  redirect(`/filter?name=${tmp}&keys=${JSON.stringify(keys)}`);
};

export const deleteFiles = async () => {
  const directory = path.join(process.cwd(), "src", "uploadedFiles");

  try {
    const files = await fsPromises.readdir(directory);
    for (const file of files) {
      await fsPromises.unlink(path.join(directory, file));
    }
  } catch (error) {
    console.error(error);
  }
};

export const renderFile = async (formData: FormData) => {
  try {
    const formDataArr = formData.entries();
    const groupedData: {
      [index: string]: { key?: string; value?: string | number };
    } = {};

    for (let [key, value] of formDataArr) {
      const strValue = value as string;

      if (!strValue.trim()) {
        throw new Error(`Form data for '${key}' cannot be empty.`);
      }

      const [index, property] = key.split("?", 2);

      if (!groupedData[index]) {
        groupedData[index] = { key: "", value: "" };
      }

      if (property === "dataType") {
        if (strValue === "number") {
          const numberValue = Number(groupedData[index].value);
          if (isNaN(numberValue)) {
            throw new Error(
              `The value for '${groupedData[index].key}' is not a valid number.`
            );
          }
          groupedData[index].value = numberValue;
        }
      } else {
        groupedData[index].key = property;
        groupedData[index].value = strValue;
      }
    }

    const outputArray = Object.values(groupedData).map((item) => ({
      key: item.key ?? "",
      value: item.value,
    }));

    console.log(outputArray);
  } catch (error) {
    const err = error as Error;
    return {
      message: err.message,
    };
  }
};
