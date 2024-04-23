import { type Metadata } from "next";

import TabbedTables from "./components/tabbed-tables";

export const metadata: Metadata = {
  title: "Files",
  description: "Add files to your account",
};

export default async function FilesPage() {
  return (
    <main>
      <TabbedTables />
    </main>
  );
}
