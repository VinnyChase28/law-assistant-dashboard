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
    complianceData: ComplianceData[];
    id: number;
    reportName: string;
    userId: string;
  };
};

interface UsageReportEventSent {
  name: "usage-report/event.sent";
}

interface SubectionsEmbeddings {
  name: "document/uploaded";
}

type EventSent =
  | ComplianceEventSent
  | UsageReportEventSent
  | SubectionsEmbeddings;

export const schemas = new EventSchemas().fromUnion<EventSent>();
