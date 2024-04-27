import { useState } from "react";

import { useToast } from "@components/ui/use-toast";
import { useFilesStore, useCheckedRowsStore } from "src/store/store";
import { api } from "src/trpc/react";

export function useReportGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { files } = useFilesStore();
  const { getCheckedComplianceSubmissions, getCheckedRegulatoryDocuments } =
    useCheckedRowsStore();

  const complianceSubmissionIds = getCheckedComplianceSubmissions();
  const regulatoryDocumentIds = getCheckedRegulatoryDocuments();

  const selectedComplianceSubmission = files.find((file) =>
    complianceSubmissionIds.includes(file.id),
  );
  const selectedRegulatoryDocuments = files.filter((file) =>
    regulatoryDocumentIds.includes(file.id),
  );

  const hasSingleComplianceSubmission = complianceSubmissionIds.length === 1;

  const findSimilarRegulatoryDocuments =
    api.vector.findSimilarRegulatoryDocuments.useMutation();
  const createComplianceReportMetadata =
    api.file.createComplianceReportMetadata.useMutation();
  const sendComplianceReportToInngest =
    api.inngest.sendComplianceReportToInngest.useMutation();

  const createReport = async () => {
    if (!selectedComplianceSubmission) {
      console.error("No compliance submission selected.");
      return;
    }

    setIsLoading(true);

    try {
      const similarDocsData = await findSimilarRegulatoryDocuments.mutateAsync({
        fileId: selectedComplianceSubmission.id,
      });

      const reportMetadata = await createComplianceReportMetadata.mutateAsync({
        name: `${new Date().toISOString()} Compliance Report`,
      });

      await sendComplianceReportToInngest.mutateAsync({
        complianceReports: [
          {
            complianceReportData: similarDocsData.data,
            userId: reportMetadata.userId,
            reportName: reportMetadata.name,
            id: reportMetadata.id,
          },
        ],
      });

      toast({
        title: "Compliance Report Started",
        description:
          "The compliance data has been sent to CodeX. A new report will be available in the Reports tab.",
      });
    } catch (error) {
      console.error(
        "Error in creating or sending the compliance report:",
        error,
      );
      toast({
        title: "Compliance Report Failed to Start",
        description:
          "There was an error starting the compliance report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createReport,
    isLoading,
    hasSingleComplianceSubmission,
    selectedComplianceSubmission,
    selectedRegulatoryDocuments,
  };
}
