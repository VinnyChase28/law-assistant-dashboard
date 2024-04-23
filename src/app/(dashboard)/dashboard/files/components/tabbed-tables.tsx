import { DocumentType } from "@prisma/client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@components/ui/tabs";
import AddFiles from "src/app/_components/input/add-files";

import TableContainer from "./table-container";

export default function TabbedTables() {
  return (
    <div>
      <Tabs defaultValue="regulatory_framework" className="w-full px-6 pt-20">
        {/* Updated the className to center everything inside this div */}
        <div className="flex items-center justify-center px-3">
          <TabsList>
            <TabsTrigger value="regulatory_framework">Regulations</TabsTrigger>
            <TabsTrigger value="compliance_submission">Submissions</TabsTrigger>
            <TabsTrigger value="compliance_report">Reports</TabsTrigger>
          </TabsList>
          <AddFiles />
        </div>

        <TabsContent value="regulatory_framework">
          <TableContainer documentType={DocumentType.REGULATORY_FRAMEWORK} />
        </TabsContent>
        <TabsContent value="compliance_submission">
          <TableContainer documentType={DocumentType.COMPLIANCE_SUBMISSION} />
        </TabsContent>
        <TabsContent value="compliance_report">
          <TableContainer documentType={DocumentType.COMPLIANCE_REPORT} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
