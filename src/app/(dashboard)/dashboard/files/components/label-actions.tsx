import React from "react";

import { MoreVertical } from "lucide-react";

import { useCheckedRowsStore } from "@/store/store";
import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "@components/ui/dropdown-menu";
import { useToast } from "@components/ui/use-toast";
import { api } from "src/trpc/react";

interface LabelActionsDropdownProps {
  labelId: string;
  onDeleted: () => void;
}

const LabelActionsDropdown: React.FC<LabelActionsDropdownProps> = ({
  labelId,
  onDeleted,
}) => {
  const { toast } = useToast();
  const deleteLabel = api.file.deleteLabel.useMutation();
  const assignLabelToMultipleFiles =
    api.file.assignLabelToMultipleFiles.useMutation();
  const checkedRows = useCheckedRowsStore((state) => state.checkedRows);

  const handleDelete = async () => {
    try {
      await deleteLabel.mutateAsync({ id: labelId });
      toast({
        title: "Label deleted successfully",
      });
      onDeleted();
    } catch (error) {
      toast({
        title: "Error deleting label",
        description:
          error instanceof Error ? error.message : "An error occurred",
      });
    }
  };

  const handleAssignLabel = async () => {
    const fileIds = Object.keys(checkedRows)
      .filter((key) => checkedRows[Number(key)])
      .map(Number);

    try {
      await assignLabelToMultipleFiles.mutateAsync({ fileIds, labelId });
      toast({
        title: "Label assigned successfully",
        description: "The label has been applied to the selected files.",
      });
    } catch (error) {
      toast({
        title: "Error assigning label",
        description:
          error instanceof Error ? error.message : "An error occurred",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-10 w-10 p-1">
          <MoreVertical size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={handleAssignLabel}>
          Assign to Checked
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={handleDelete}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LabelActionsDropdown;
