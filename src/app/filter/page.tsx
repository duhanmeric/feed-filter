import { FilterFields } from "@/actions/helpers.actions";
import FileInfo from "@/components/templates/FileInfo";
import KeyFilter, { SelectedKey } from "@/components/templates/KeyFilter";
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
            <FileInfo title="Select Filters" fileNameFromUrl={fileNameFromCookie} />

            <KeyFilter
                defaultKeys={defaultKeys}
                fileName={fileNameFromCookie}
                keys={fileKeysFromCookie}
            />
        </main>
    );
}
