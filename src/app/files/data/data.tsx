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
    value: "in progress",
    label: "In Progress",
    icon: StopwatchIcon,
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircledIcon,
  },
  {
    value: "error",
    label: "Error",
    icon: CrossCircledIcon,
  },
];

