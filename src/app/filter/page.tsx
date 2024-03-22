export default function FilterPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) {
  const { name } = searchParams || {};

  if (!name) {
    return <div>No name found</div>;
  }

  const fileNameFromUrl = name as string;

  return (
    <main className="h-full p-4">
      {fileNameFromUrl}
    </main>
  );
}
