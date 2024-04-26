import React from "react";

import { MoreVertical } from "lucide-react";

import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "@components/ui/dropdown-menu";

import { useLabelActions } from "../hooks/use-label-actions";

interface LabelActionsDropdownProps {
  labelId: string;
  onDeleted: () => void;
}

const LabelActionsDropdown: React.FC<LabelActionsDropdownProps> = ({
  onDeleted,
}) => {
  const { handleDeleteLabel, handleAssignLabelToMultipleFiles } =
    useLabelActions();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-10 w-10 p-1">
          <MoreVertical size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onSelect={() => {
            handleAssignLabelToMultipleFiles().catch(console.error);
          }}
        >
          Assign to Checked
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => {
            handleDeleteLabel().then(onDeleted).catch(console.error);
          }}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LabelActionsDropdown;
