import { getNestedValue } from "@/actions/helpers.actions";
import { cookieNames, fileOutputDir } from "@/constants";
import { promises } from "fs";
import { cookies } from "next/headers";
import path from "path";

const RouteFilter = {
    FIELD: "field",
    CHECK_ALL: "checkAll",
} as const;

type RouteFilterType = typeof RouteFilter[keyof typeof RouteFilter];

interface RequestBody {
    field: string;
    checkAll: boolean;
}

export async function POST(req: Request) {
    const { field, checkAll }: RequestBody = await req.json();

    if ((!field && !checkAll)) {
        return Response.json({
            success: false,
            message: "Please select an option to extract data.",
        }, { status: 400 });
    }

    let filter: RouteFilterType = RouteFilter.CHECK_ALL;

    if (field && !checkAll) {
        filter = RouteFilter.FIELD;
    } else if (!field && checkAll) {
        filter = RouteFilter.CHECK_ALL;
    }

    const fileNameCookie = cookies().get(cookieNames.fileName);
    if (!fileNameCookie) {
        return Response.json({
            success: false,
            message: "File not found.",
        })
    }

    const filePath = path.join(process.cwd(), "src", fileOutputDir, fileNameCookie.value, "total_" + fileNameCookie.value + ".json");
    const jsonData = JSON.parse(await promises.readFile(filePath, "utf-8")) as unknown[];

    const headers = new Headers({
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="${fileNameCookie.value}.json"`,
    });

    if (filter === RouteFilter.FIELD) {
        const filtered = jsonData.map((data: any) => {
            const value = getNestedValue(data, field);
            return value ?? false;
        });


        return Response.json({
            success: true,
            message: "Exported successfully",
            data: filtered
        }, { headers })
    }

    return Response.json({
        success: true,
        message: "Exported successfully",
        data: jsonData
    }, { headers })
}