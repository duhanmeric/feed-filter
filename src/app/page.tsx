import FileForm from "@/components/templates/FileForm";
import FileFormURL from "@/components/templates/FileFormURL";
import FileOutput from "@/components/templates/FileOutput";
import { FeedStateProvider } from "@/context/FeedContext";

export default function Home() {
  return (
    <main className="h-full p-4">
      {/* <FileForm /> */}
      <FeedStateProvider>
        <FileFormURL />
        <FileOutput />
      </FeedStateProvider>
    </main>
  );
}
