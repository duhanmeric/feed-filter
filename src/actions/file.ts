"use server";

export async function handleFileUpload(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  const file = formData.get("file") as File;
  try {
    if (file && file.type === "text/xml") {
      const text = await file.text();
      console.log(text);

      return {
        message: text,
      };
    } else {
      throw new Error("Invalid file type");
    }
  } catch (error) {
    return {
      message: "File upload failed",
    };
  }
}
