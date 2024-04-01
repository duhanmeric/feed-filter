import KeyFilter from "@/components/templates/KeyFilter";

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
    const fileKeysFromUrl = JSON.parse(keys) as string[];
    // const totalPageCountFromUrl = parseInt(totalPageCount);
    // console.log("totalPageCountFromUrl: ", totalPageCountFromUrl);

    return (
        <main className="h-full p-4">
            Your file name: {fileNameFromUrl}
            <br />
            <KeyFilter fileName={name} keys={fileKeysFromUrl} />
        </main>
    );
}
