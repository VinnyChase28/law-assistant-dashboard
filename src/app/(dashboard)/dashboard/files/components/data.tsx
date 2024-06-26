import { DocumentType } from "@prisma/client";
import { processingStatus } from "@prisma/client";
import {
  CheckCircledIcon,
  CrossCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";
import { Search, Scale, Columns } from "lucide-react";

const documentTypes = [
  {
    value: DocumentType.COMPLIANCE_SUBMISSION,
    label: "Submission",
    icon: Search,
  },
  {
    value: DocumentType.REGULATORY_FRAMEWORK,
    label: "Regulatory",
    icon: Scale,
  },
  {
    value: DocumentType.COMPLIANCE_REPORT,
    label: "Report",
    icon: Columns,
  },
];

const statuses = [
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



export { statuses, documentTypes };
