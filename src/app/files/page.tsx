import FileManager from "../_components/file-manager/file-manager";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center ">
      <FileManager />
    </main>
  );
}
