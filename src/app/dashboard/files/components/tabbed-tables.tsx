import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import TableContainer from "./table-container";
import { DocumentType } from "@prisma/client";


export default function TabbedTables() {
  return (
    <Tabs defaultValue="regulatory_framework" className="w-full">
      <TabsList>
        <TabsTrigger value="regulatory_framework">
          Regulatory Framework
        </TabsTrigger>
        <TabsTrigger value="compliance_submission">
          Compliance Submission
        </TabsTrigger>
        <TabsTrigger value="compliance_report">Compliance Report</TabsTrigger>
      </TabsList>

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
  );
}
