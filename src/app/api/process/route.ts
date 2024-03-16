import { NextResponse } from "next/server";
import { parseStringPromise } from "xml2js";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = await parseStringPromise(
      typeof body === "string" ? body : "",
      {
        explicitArray: false,
        mergeAttrs: true,
        explicitRoot: false,
      }
    );

    const mainKey = Object.keys(result)[0];
    const productArray = result[mainKey];

    const keys = productArray.length > 0 ? Object.keys(productArray[0]) : [];

    return NextResponse.json({ success: true, data: result, keys });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ success: false });
  }
}
