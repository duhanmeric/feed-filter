import KeysOutput2 from "@/components/templates/KeysOutput2";

export default function KeyPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) {
  const { q } = searchParams || {};

  if (!q) {
    return <div>No keys found</div>;
  }

  // console.log(q);

  const parsedUrl = JSON.parse(decodeURIComponent(q));
  // console.log(parsedUrl);

  return (
    <main className="h-full p-4">
      <KeysOutput2 keys={parsedUrl} />
    </main>
  );
}