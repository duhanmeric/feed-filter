import { FilterFields } from "@/actions/helpers.actions";
import KeyFilter, { SelectedKey } from "@/components/templates/KeyFilter";
import { Badge } from "@/components/ui/badge";
import { cookieNames } from "@/constants";
import { cookies } from "next/headers";

export default function FilterPage() {
    const keys = cookies().get(cookieNames.keys);
    const name = cookies().get(cookieNames.fileName);
    const defaultCheckedKeys = cookies().get(cookieNames.filters)?.value;

    if (!keys || !name) {
        return <div>No keys or fileName is found!</div>;
    }

    const fileKeysFromCookie = JSON.parse(decodeURIComponent(keys.value));
    const fileNameFromCookie = name.value;
    const defaultKeyArr: FilterFields = defaultCheckedKeys
        ? JSON.parse(decodeURIComponent(defaultCheckedKeys))
        : [];

    const defaultKeys: SelectedKey[] = Object.entries(defaultKeyArr).map(([key, objValue]) => {
        const dataType = typeof objValue.value === "string" ? "string" : "number";
        return { label: key, dataType, value: objValue.value, condition: objValue.condition };
    });

    return (
        <main className="container h-full max-w-screen-2xl justify-center py-4">
            <h1 className="text-2xl font-bold">Filter Keys</h1>
            <div className="mb-2">
                <span>Your file name: </span>
                <Badge variant="secondary" data-testid="fileName">
                    {fileNameFromCookie}
                </Badge>
            </div>

            <KeyFilter
                defaultKeys={defaultKeys}
                fileName={fileNameFromCookie}
                keys={fileKeysFromCookie}
            />
        </main>
    );
}
