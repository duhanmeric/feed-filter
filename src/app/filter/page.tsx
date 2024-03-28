import KeyFilter from "@/components/templates/KeyFilter";

export default function FilterPage({
    searchParams,
}: {
    searchParams?: { [key: string]: string };
}) {
    const { name, keys, fileCount } = searchParams || {};

    if (!name) {
        return <div>No file name found</div>;
    }

    if (!keys) {
        return <div>No file keys found</div>;
    }

    if (!fileCount) {
        return <div>No file count found</div>;
    }

    const fileNameFromUrl = name as string;
    const fileKeysFromUrl = JSON.parse(keys) as string[];
    const totalFileCount = parseInt(fileCount as string);

    return (
        <main className="h-full p-4">
            Your file name: {fileNameFromUrl}
            <br />
            <KeyFilter fileCount={totalFileCount} fileName={name} keys={fileKeysFromUrl} />
        </main>
    );
}
