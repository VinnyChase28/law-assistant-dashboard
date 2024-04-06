import React from "react";
import { LucideIcon } from "lucide-react";

interface FullPageSectionProps {
  leftIcon: LucideIcon;
  header: string;
  text: string[];
}

const FullPageSection: React.FC<FullPageSectionProps> = ({
  leftIcon: Icon,
  header,
  text,
}) => (
  <div className="section flex h-screen">
    <div className="flex w-1/2 items-center justify-center bg-gray-100">
      <Icon className="h-32 w-32 text-blue-500" />
    </div>
    <div className="flex w-1/2 flex-col items-center justify-center bg-gray-800 p-8 text-white">
      <h2 className="mb-4 text-4xl font-bold">{header}</h2>
      {text.map((paragraph, index) => (
        <p key={index} className="mb-2 text-center text-lg">
          {paragraph}
        </p>
      ))}
    </div>
  </div>
);

export default FullPageSection;
