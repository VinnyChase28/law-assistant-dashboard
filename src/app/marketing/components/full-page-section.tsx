import React from "react";

interface FullPageSectionProps {
  leftIcon: React.ReactNode;
  header: string;
  text: string;
}

const FullPageSection: React.FC<FullPageSectionProps> = ({
  leftIcon,
  header,
  text,
}) => (
  <div className="flex h-screen">
    <div className="flex w-1/2 items-center justify-center bg-gray-100">
      {leftIcon}
    </div>
    <div className="flex w-1/2 flex-col items-center justify-center bg-gray-800 p-8 text-white">
      <h2 className="mb-4 text-4xl font-bold">{header}</h2>
      <p className="text-center text-lg">{text}</p>
    </div>
  </div>
);

export default FullPageSection;
