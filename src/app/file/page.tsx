// import FileOutput from "@/components/templates/FileOutput";

export default function FilePage({
    searchParams,
}: {
    searchParams?: { [key: string]: string };
}) {

    const { name, filters } = searchParams || {};

    if (!name) {
        return <div>No file name found</div>;
    }

    if (!filters) {
        return <div>No filters found</div>;
    }

    const fileNameFromUrl = name as string;
    const filterFromUrl = decodeURIComponent(filters);
    return (
        <main className="h-full p-4">
            Your file name: {fileNameFromUrl}
            <br />
            Your filters: {filterFromUrl}
            {/* <FileOutput fileName={fileNameFromUrl} /> */}
        </main>
    );
}
