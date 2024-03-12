"use server";

import { InitialStateType } from "@/app/FileForm";

export async function handleFileUpload(
  prevState: InitialStateType,
  formData: FormData
): Promise<InitialStateType> {
  const file = formData.get("file") as File;
  try {
    if (file && file.type === "text/xml") {
      const text = await file.text();
      console.log(text);

      return {
        message: text,
        status: "success",
      };
    } else {
      throw new Error("Invalid file type");
    }
  } catch (error) {
    return {
      status: "error",
      message: "File upload failed",
    };
  }
}
