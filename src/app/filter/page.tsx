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

  return (
    <main className="h-full p-4">
      {fileNameFromUrl}
      <br />
      {fileKeysFromUrl.map((column: string) => {
        return (
          <div key={column} className="gap-2 flex items-center">
            <label
              htmlFor={column}
              className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {column}
            </label>
          </div>
        );
      })}
    </main>
  );
}
