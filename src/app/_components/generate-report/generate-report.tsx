"use client";

import React, { useState } from "react";
import { api } from "src/trpc/react";
import { Button } from "../ui/button";
import { useCheckedRowsStore, useFilesStore } from "src/store/store";
import { type File } from "@prisma/client";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { IconSpinner } from "../ui/icons";
import AlertComponent from "../alert";

const CreateReportComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast(); // Initialize useToast
  const router = useRouter();
  const { checkedRows } = useCheckedRowsStore();

  const { files } = useFilesStore();

  const selectedComplianceSubmission = files?.find(
    (file: any) =>
      file.documentType === "COMPLIANCE_SUBMISSION" && checkedRows[file.id],
  );
  const selectedRegulatoryDocuments = files?.filter(
    (file: any) =>
      file.documentType === "REGULATORY_FRAMEWORK" && checkedRows[file.id],
  );


  const hasSingleComplianceSubmission =
    selectedComplianceSubmission &&
    Object.keys(checkedRows).filter(
      (id: any) =>
        checkedRows[id] &&
        files.find((file: File) => file.id === parseInt(id)).documentType ===
          "COMPLIANCE_SUBMISSION",
    ).length === 1;

  // Mutations
  const findSimilarRegulatoryDocuments =
    api.vector.findSimilarRegulatoryDocuments.useMutation();
  const createComplianceReportMetadata =
    api.file.createComplianceReportMetadata.useMutation();
  const sendComplianceReportToInngest =
    api.llm.sendComplianceReportToInngest.useMutation();
  const w = api.file.setFileStatus.useMutation();

  const handleCreateReportClick = async () => {
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
        complianceReportData: similarDocsData,
        userId: reportMetadata.userId,
        reportName: reportMetadata.name,
        id: reportMetadata.id,
      });

      //we need to go to home page ('/') if we click View
      toast({
        title: "Compliance Report Started",
        description: `The compliance data has been sent to Casy. A new report will be available in the "GenAI docs" section soon.`,
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
      const keyDownEvent = new KeyboardEvent("keydown", {
        key: "Escape",
        code: "Escape",
        bubbles: true,
      });

      document.dispatchEvent(keyDownEvent);
    }
  };

  return (
    <div className="space-y-6 p-5">
      {/* Compliance Submission Section */}
      <div>
        <h3 className="text-lg font-semibold">
          Selected Compliance Submission:
        </h3>
        {selectedComplianceSubmission ? (
          <p className="mt-2">{selectedComplianceSubmission.name}</p>
        ) : (
          <p className="mt-2 text-gray-500">
            Please select a single compliance submission.
          </p>
        )}
      </div>

      {/* Divider */}
      <hr className="border-t border-gray-200" />

      {/* Regulatory Framework Documents Section */}
      <div>
        <h3 className="text-lg font-semibold">
          Selected Regulatory Framework Documents:
        </h3>
        {selectedRegulatoryDocuments.length > 0 ? (
          selectedRegulatoryDocuments.map((document: any) => (
            <p key={document.id} className="mt-2">
              {document.name}
            </p>
          ))
        ) : (
          <p className="mt-2 text-gray-500">
            No regulatory framework documents selected.
          </p>
        )}
      </div>

      <AlertComponent
        title="Heads up!"
        description=" You can only verify one Compliance Submission document at a time."
        iconType="info"
      />

      <div className="mt-4 flex items-center">
        {" "}
        {/* Flex container for the button and spinner */}
        <Button
          onClick={handleCreateReportClick}
          variant={hasSingleComplianceSubmission ? "default" : "ghost"}
          disabled={isLoading || !hasSingleComplianceSubmission}
        >
          Create Report
        </Button>
        {isLoading && <IconSpinner className="ml-2 h-6 w-6 animate-spin" />}{" "}
        {/* Spinner with margin-left */}
      </div>
    </div>
  );
};

export default CreateReportComponent;
