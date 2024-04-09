import React from "react";
import { Handle, Position } from "reactflow";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Icon from "src/app/_components/icon";
import dynamicIconImports from "lucide-react/dynamicIconImports";

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
        <CardDescription className="mt-2">{data.description}</CardDescription>
      </CardHeader>

      <Handle
        type="target"
        position={Position.Top}
        className="w-16 !bg-indigo-500"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-16 !bg-indigo-500"
      />
    </Card>
  );
};

export default CustomNode;
