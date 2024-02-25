import { EventSchemas } from "inngest";

interface ComplianceSubmission {
  documentName: string;
  fileId: number;
  pageNumber: number;
  textData: string;
}

interface RegulatoryFramework {
  documentName: string;
  fileId: number;
  pageNumber: number;
  textData: string;
}

interface ComplianceData {
  complianceSubmission: ComplianceSubmission;
  regulatoryFramework: RegulatoryFramework[];
}

type ComplianceEventSent = {
  name: "compliance-report/event.sent";
  data: {
    data: ComplianceData[];
    id: number;
    reportName: string;
    userId: string;
  };
};

export const schemas = new EventSchemas().fromUnion<ComplianceEventSent>();
