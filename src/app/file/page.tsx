import FileOutput from "@/components/templates/FileOutput";

export default function FilePage({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) {
  const { q } = searchParams || {};

  if (!q) {
    return <div>No keys found</div>;
  }

  const parsedUrl = JSON.parse(decodeURIComponent(q)) as string[];

  return (
    <main className="h-full p-4">
      <FileOutput keys={parsedUrl} />
    </main>
  );
}
