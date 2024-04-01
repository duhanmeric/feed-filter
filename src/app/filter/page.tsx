import KeyFilter from "@/components/templates/KeyFilter";
import { Badge } from "@/components/ui/badge";

export default function FilterPage({
    searchParams,
}: {
    searchParams?: { [key: string]: string };
}) {
    const { name, keys } = searchParams || {};

    if (!name) {
        return <div>No file name found</div>;
    }

    if (!keys) {
        return <div>No file keys found</div>;
    }

    const fileNameFromUrl = name as string;
    const fileKeysFromUrl = JSON.parse(decodeURIComponent(keys));

    return (
        <section>
            <h1 className="text-2xl font-bold">Filter Keys</h1>
            <div className="mb-2">
                <span>Your file name: </span>
                <Badge variant="secondary">{fileNameFromUrl}</Badge>
            </div>

            <KeyFilter fileName={name} keys={fileKeysFromUrl} />
        </section>
    );
}
