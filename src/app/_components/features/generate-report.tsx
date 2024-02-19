"use client";

import React, { useState } from "react";
import { api } from "src/trpc/react";
import { Button } from "../ui/button";

const CreateReportComponent = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Mutations
  const findSimilarRegulatoryDocuments =
    api.vector.findSimilarRegulatoryDocuments.useMutation();

  const createComplianceReportMetadata =
    api.file.createComplianceReportMetadata.useMutation();

  const sendComplianceReport =
    api.llm.sendComplianceReportToInngest.useMutation();

  const handleCreateReportClick = () => {
    setIsLoading(true);
    findSimilarRegulatoryDocuments.mutate(
      { fileId: 3 }, // Change this fileId as needed
      {
        onSuccess: (complianceReportData) => {
          console.log("complianceReportData: ", complianceReportData);

          createComplianceReportMetadata.mutate(
            {
              name: `${new Date().toISOString()} Compliance Report`,
            },
            {
              onSuccess: (complianceReportMetadata) => {
                console.log(
                  "complianceReportMetadata: ",
                  complianceReportMetadata,
                );

                // Call the TRPC procedure to send the report data to Inngest
                sendComplianceReport.mutate(
                  {
                    complianceReportData, // The data you retrieved earlier
                    userId: complianceReportMetadata.userId, // Assuming userId is part of the metadata
                    reportName: complianceReportMetadata.name, // The name of the report
                    id: complianceReportMetadata.id, // The ID of the report
                  },
                  {
                    onSuccess: () => {
                      console.log(
                        "Compliance report data sent to Inngest successfully.",
                      );
                      setIsLoading(false);
                    },
                    onError: (error) => {
                      console.error(
                        "Error sending compliance report data to Inngest:",
                        error,
                      );
                      setIsLoading(false);
                    },
                  },
                );
              },
              onError: (error) => {
                console.error("Error creating report metadata:", error);
                setIsLoading(false);
              },
            },
          );
        },
        onError: (error) => {
          console.error("Error creating report:", error);
          setIsLoading(false);
        },
      },
    );
  };

  return (
    <div className="p-5">
      <Button
        onClick={handleCreateReportClick}
        variant="default"
        disabled={isLoading}
      >
        Create Report
      </Button>
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default CreateReportComponent;
