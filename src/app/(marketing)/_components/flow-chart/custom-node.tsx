import React from "react";

import type dynamicIconImports from "lucide-react/dynamicIconImports";
import { Handle, Position } from "reactflow";

import Icon from "@components/icon";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";

interface CustomNodeData {
  title: string;
  description: string;
  icon: keyof typeof dynamicIconImports;
}

interface CustomNodeProps {
  data: CustomNodeData;
}

const CustomNode: React.FC<CustomNodeProps> = ({ data }) => {
  return (
    <Card
      className="rounded-md border"
      style={{ width: "275px", height: "150px" }}
    >
      <CardHeader className="flex h-full flex-col items-center justify-center">
        <CardTitle className="text-center text-lg font-bold">
          {data.title}
        </CardTitle>
        <div className="mt-2 flex justify-center">
          <Icon name={data.icon as keyof typeof dynamicIconImports} size={36} />
        </div>
        <CardDescription className="mt-2 text-center">
          {data.description}
        </CardDescription>
      </CardHeader>

      <Handle type="target" position={Position.Top} className="w-16" />
      <Handle type="source" position={Position.Bottom} className="w-16" />
    </Card>
  );
};

export default CustomNode;
