"use client";

import React, { useState } from "react";
import { api } from "src/trpc/react";
import { Button } from "../ui/button";

const CreateReportComponent = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Mutation
  const createReport = api.vector.findSimilarRegulatoryDocuments.useMutation();

  const handleCreateReportClick = () => {
    setIsLoading(true);
    createReport.mutate(
      { fileId: 3 },
      {
        onSuccess: (result) => {
          console.log("Report creation success:", result);
          setIsLoading(false);
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
