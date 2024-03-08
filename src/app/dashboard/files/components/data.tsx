import {
  CheckCircledIcon,
  CrossCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";
import { DocumentType } from "@prisma/client";
import { processingStatus } from "@prisma/client";

const documentTypes = [
  {
    value: DocumentType.COMPLIANCE_SUBMISSION,
    label: "Compliance Submission",
  },
  {
    value: DocumentType.REGULATORY_FRAMEWORK,
    label: "Summary",
  },
  {
    value: DocumentType.COMPLIANCE_REPORT,
    label: "Compliance Report",
  },
];

//TODO: allow users to define their own labels and assign them to documents
export const labels = [
  {
    value: "research",
    label: "Research",
  },
  {
    value: "summary",
    label: "Summary",
  },
  {
    value: "compliance",
    label: "Compliance",
  },
];

export const statuses = [
  {
    value: processingStatus.IN_PROGRESS,
    label: "In Progress",
    icon: StopwatchIcon,
  },
  {
    value: processingStatus.DONE,
    label: "Done",
    icon: CheckCircledIcon,
  },
  {
    value: processingStatus.FAILED,
    label: "Failed",
    icon: CrossCircledIcon,
  },
];
