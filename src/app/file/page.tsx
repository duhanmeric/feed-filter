import FileOutput from "@/components/templates/FileOutput";

export default function FilePage({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) {
  const { name } = searchParams || {};

  if (!name) {
    return <div>No keys found</div>;
  }

  const fileNameFromUrl = name as string;

  return (
    <main className="h-full p-4">
      <FileOutput fileName={fileNameFromUrl} />
    </main>
  );
}
