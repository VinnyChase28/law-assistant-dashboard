import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { Separator } from "@components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { api } from "src/trpc/server";

import { CardsStats } from "./charts/card-stats";


export const dynamic = "force-dynamic";


export default async function Dashboard() {
  const fileTaskHistories = await api.activity.getFileTaskHistory.query();
  const chatHistory = await api.activity.getChatHistory.query();

  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* ... (rest of the component) */}
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {/* ... (stat cards) */}
        <CardsStats />
        {/* ... (rest of the component) */}
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Report History</CardTitle>
                <CardDescription>
                  Displays why regulatory documents were used to generate
                  reports.
                </CardDescription>
              </div>
            </CardHeader>
            <Separator />
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document Name</TableHead>
                    <TableHead>Used At</TableHead>
                    <TableHead>Document Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fileTaskHistories.map((history) => (
                    <TableRow key={history.id}>
                      <TableCell>
                        {history.relatedDocuments
                          .map((doc) => doc.file.name)
                          .join(", ")}
                      </TableCell>
                      <TableCell>
                        {new Date(history.usedAt).toLocaleString()}
                      </TableCell>
                      <TableCell>{history.documentType}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Chat History</CardTitle>
                <CardDescription>
                  Displays user questions during chat sessions.
                </CardDescription>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="grid gap-8 pt-6">
              {chatHistory?.map((session) => (
                <div key={session.id} className="flex flex-col gap-2">
                  <h3 className="text-lg font-bold">
                    Session: {new Date(session.createdAt).toLocaleString()}
                  </h3>
                  {session.messages.map((message) => (
                    <div key={message.id} className="flex items-center gap-4">
                      <p className="text-sm font-medium">
                        {message.role}: {message.content}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
