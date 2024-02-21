"use client";

import React, { useState } from "react";
import { api } from "src/trpc/react";
import { Button } from "../ui/button";
import { useCheckedRowsStore, useFilesStore } from "src/store/store";
import { File } from "@prisma/client";

const CreateReportComponent = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { checkedRows } = useCheckedRowsStore();
  const { files } = useFilesStore();

  const selectedComplianceSubmission = files.find(
    (file: any) =>
      file.documentType === "COMPLIANCE_SUBMISSION" && checkedRows[file.id],
  );

  const selectedRegulatoryDocuments = files.filter(
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

  //Mutations
  const findSimilarRegulatoryDocuments =
    api.vector.findSimilarRegulatoryDocuments.useMutation();

  const createComplianceReportMetadata =
    api.file.createComplianceReportMetadata.useMutation();

  const sendComplianceReport =
    api.llm.sendComplianceReportToInngest.useMutation();

  const handleCreateReportClick = async () => {
    if (!selectedComplianceSubmission) {
      console.error("No compliance submission selected.");
      return;
    }

    setIsLoading(true);

    try {
      // Find similar regulatory documents for the selected compliance submission
      const similarDocsData = await findSimilarRegulatoryDocuments.mutateAsync({
        fileId: selectedComplianceSubmission.id,
      });

      // Create compliance report metadata
      const reportMetadata = await createComplianceReportMetadata.mutateAsync({
        name: `${new Date().toISOString()} Compliance Report`,
      });

      // Assuming reportMetadata includes the necessary fields like id, userId, etc.
      // Send the compliance report data to Inngest
      await sendComplianceReport.mutateAsync({
        complianceReportData: similarDocsData,
        userId: reportMetadata.userId, // Adjust according to actual structure
        reportName: reportMetadata.name,
        id: reportMetadata.id,
      });

      console.log("Compliance report sent to Inngest successfully.");
    } catch (error) {
      console.error(
        "Error in creating or sending the compliance report:",
        error,
      );
    } finally {
      setIsLoading(false);
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

      <Button
        onClick={handleCreateReportClick}
        variant={hasSingleComplianceSubmission ? "default" : "ghost"}
        disabled={isLoading || !hasSingleComplianceSubmission}
        className="mt-4"
      >
        Create Report
      </Button>
      {isLoading && <p className="mt-4">Loading...</p>}
    </div>
  );
};

export default CreateReportComponent;
