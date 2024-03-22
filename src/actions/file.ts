"use server";

import path from "path";
import { downloadFile, findFirstArray, splitArrayIntoChunks } from "./helpers";
import { existsSync, mkdirSync, promises as fsPromises } from "fs";
import { redirect } from "next/navigation";
import { parseStringPromise } from "xml2js";

export const fileDownload = async (formData: FormData) => {
    const url = formData.get("fileUrl") as string;

    const tmp = crypto.randomUUID();
    const outputPath = path.join(
        process.cwd(),
        "src",
        "uploadedFiles",
        tmp
    );

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
        const arrayChunks = splitArrayIntoChunks(resultArr, 1000);

        for (let i = 0; i < arrayChunks.length; i++) {
            const filePath = `${outputPath}_part${i + 1}.json`;
            await fsPromises.writeFile(filePath, JSON.stringify(arrayChunks[i], null, 2));
        }

        console.log(resultArr.length);

    } catch (error) {
        const err = error as Error;
        return {
            message: err.message,
        }
    }

    // redirect(`/filter?name=${tmp}`);
}