import KeysOutput from "@/components/templates/KeysOutput";

export default function KeyPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) {
  const { q } = searchParams || {};

  if (!q) {
    return <div>No keys found</div>;
  }

  const parsedUrl = JSON.parse(decodeURIComponent(q));

  return (
    <main className="h-full p-4">
      <KeysOutput keys={parsedUrl} />
    </main>
  );
}
