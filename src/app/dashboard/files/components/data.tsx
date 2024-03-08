import {
  CheckCircledIcon,
  CrossCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

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
    value: "IN_PROGRESS",
    label: "In Progress",
    icon: StopwatchIcon,
  },
  {
    value: "DONE",
    label: "Done",
    icon: CheckCircledIcon,
  },
  {
    value: "FAILED",
    label: "Error",
    icon: CrossCircledIcon,
  },
];
