import FileManager from "../_components/drag-drop/file-manager";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <FileManager />
    </main>
  );
}
