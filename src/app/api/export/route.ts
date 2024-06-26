import { getNestedValue } from "@/actions/helpers.actions";
import { Option } from "@/components/ui/multiselect";
import { cookieNames, fileOutputDir } from "@/constants";
import { promises } from "fs";
import { cookies } from "next/headers";
import path from "path";
import { z } from "zod"

const RouteFilter = {
    FIELD: "field",
    CHECK_ALL: "checkAll",
    NULL: null
} as const;

type RouteFilterType = typeof RouteFilter[keyof typeof RouteFilter];

interface RequestBody {
    field: Option[] | null;
    checkAll: boolean;
}

const schema = z.object({
    field: z.array(z.object({
        label: z.string(),
        value: z.string(),
    })).optional(),
    checkAll: z.boolean().optional()
}).refine((data) => (data.field && Array.isArray(data.field) && data.field.length > 0) || data.checkAll, {
    message: "You must select at least one field or check all",
    path: ["field"]
}).refine((data) => !((data.field && Array.isArray(data.field) && data.field.length > 0) && data.checkAll), {
    message: "You cannot send both field and checkAll",
    path: ["field"]
});

export async function POST(req: Request) {
    const body: RequestBody = await req.json();

    try {
        const parsed = schema.parse(body);

        let filter: RouteFilterType = RouteFilter.NULL;
        if (parsed.field && parsed.field.length > 0) {
            filter = RouteFilter.FIELD;
        } else if (parsed.checkAll) {
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
            const filtered = jsonData.map((data: unknown) => {
                const values = parsed.field!.map(f => getNestedValue(data, f.value));
                return values.every(v => v !== undefined) ? values : "-";
            });

            return Response.json({
                success: true,
                message: "Exported successfully",
                data: filtered
            }, { headers })
        } else {
            return Response.json({
                success: true,
                message: "Exported successfully",
                data: jsonData
            }, { headers })
        }

    } catch (err) {
        if (err instanceof z.ZodError) {
            const messages = err.errors.map((error) => error.message).join(", ");
            return Response.json({
                success: false,
                message: messages,
            }, { status: 400 })
        }

        return Response.json({
            success: false,
            message: "Something went wrong :/",
        }, { status: 500 })
    }
}