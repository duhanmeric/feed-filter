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

  const parsedUrl = JSON.parse(decodeURIComponent(q));
  console.log(parsedUrl);

  return (
    <div>
      <h1>Key Page</h1>
      <KeysOutput2 keys={parsedUrl} />
    </div>
  );
}
