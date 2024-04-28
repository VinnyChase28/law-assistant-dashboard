
import { useCheckedRowsStore } from "@/store/store";
import { useToast } from "@components/ui/use-toast";
import { api } from "src/trpc/react";

export function useLabelActions(
  fileId?: number,
  labelId?: string,
) {
  const { toast } = useToast();
  const createLabel = api.label.createLabel.useMutation();
  const deleteLabel = api.label.deleteLabel.useMutation();
  const assignLabelToMultipleFiles =
    api.label.assignLabelToMultipleFiles.useMutation();
  const assignLabelToFile = api.label.assignLabel.useMutation();
  const removeLabelFromFile = api.label.removeLabel.useMutation();
  const checkedRows = useCheckedRowsStore((state) => state.checkedRows);

  const {
    data: labels,
    isLoading: labelsLoading,
    error: labelsError,
  } = api.label.getLabels.useQuery();

  const handleCreateLabel = async (labelName: string) => {
    try {
      await createLabel.mutateAsync({ text: labelName });
      toast({
        title: "Label created successfully",
      });
    } catch (error) {
      toast({
        title: "Error creating label",
        description:
          error instanceof Error ? error.message : "An error occurred",
      });
    }
  };

  const handleDeleteLabel = async (labelId: string) => {
    try {
      await deleteLabel.mutateAsync({ id: labelId });
      toast({
        title: "Label deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error deleting label",
        description:
          error instanceof Error ? error.message : "An error occurred",
      });
    }
  };

  const handleAssignLabelToMultipleFiles = async (labelId: string) => {
    const fileIds = Object.keys(checkedRows)
      .filter((key) => checkedRows[Number(key)])
      .map(Number);

    console.log(labelId, "labeliod");
    if (labelId === undefined) {
      toast({
        title: "Error",
        description: "No label selected",
      });
      return;
    }

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

  const handleAssignLabelToFile = async (labelId: string) => {
    if (!fileId || !labelId) {
      toast({
        title: "Error",
        description: "File ID or Label ID is missing",
      });
      return;
    }

    try {
      await assignLabelToFile.mutateAsync({ fileId, labelId });
      toast({
        title: "Label assigned to file successfully",
      });
    } catch (error) {
      toast({
        title: "Error assigning label to file",
        description:
          error instanceof Error ? error.message : "An error occurred",
      });
    }
  };

  const handleRemoveLabelFromFile = async (fileId: number) => {
    if (!fileId || !labelId) {
      toast({
        title: "Error",
        description: "File ID or Label ID is missing",
      });
      return;
    }

    try {
      await removeLabelFromFile.mutateAsync({ fileId });
      toast({
        title: "Label removed from file successfully",
      });
    } catch (error) {
      toast({
        title: "Error removing label from file",
        description:
          error instanceof Error ? error.message : "An error occurred",
      });
    }
  };

  return {
    labels,
    labelsLoading,
    labelsError,
    handleCreateLabel,
    handleDeleteLabel,
    handleAssignLabelToMultipleFiles,
    handleAssignLabelToFile,
    handleRemoveLabelFromFile,
  };
}
