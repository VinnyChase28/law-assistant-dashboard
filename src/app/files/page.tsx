import FileManager from "../_components/file-manager/file-manager";

export default async function Files() {
  return (
    <main className="flex min-h-screen flex-col items-center ">
      <FileManager />
    </main>
  );
}
