import React, { useMemo } from "react";
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
  // Memoize the Icon component
  const MemoizedIcon = useMemo(() => {
    // Ensure that the icon name exists in the dynamicIconImports map
    if (data.icon in dynamicIconImports) {
      return <Icon name={data.icon} size={36} />;
    }
    // Optionally, return a default icon or null if the specified icon doesn't exist
    return null;
  }, [data.icon]); // Depend on data.icon to recompute the memoized value when the icon changes

  return (
    <Card className="rounded-md border">
      <CardHeader className="flex flex-col items-center justify-center">
        <CardTitle className="text-center text-lg font-bold">
          {data.title}
        </CardTitle>
        <div className="mt-2 flex justify-center">
          {MemoizedIcon} {/* Render the memoized icon */}
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
