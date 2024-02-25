import React from "react";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";
import { Info, StopCircle } from "lucide-react";

// Define the allowed icon types as a TypeScript union type
type IconType = "info" | "stopCircle";

// Adjust the props interface to include the iconType prop
interface AlertComponentProps {
  description: string;
  title: string;
  iconType: IconType;
}

// Component implementation
export default function AlertComponent({
  description,
  title,
  iconType,
}: AlertComponentProps) {
  // Map iconType to the corresponding lucide-react icon component
  const Icon = iconType === "info" ? Info : StopCircle;

  return (
    <Alert>
      <Icon className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
