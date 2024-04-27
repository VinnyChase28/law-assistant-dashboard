"use client";

import React from "react";

import AlertComponent from "../alert";
import { Button } from "../ui/button";
import { IconSpinner } from "../ui/icons";

import { useReportGenerator } from "./hooks/use-report-generator";

const CreateReportComponent = () => {
  const {
    createReport,
    isLoading,
    hasSingleComplianceSubmission,
    selectedComplianceSubmission,
    selectedRegulatoryDocuments,
  } = useReportGenerator();

  return (
    <div className="space-y-6 p-5">
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

      <hr className="border-t border-gray-200" />

      <div>
        <h3 className="text-lg font-semibold">
          Selected Regulatory Framework Documents:
        </h3>
        {selectedRegulatoryDocuments.length > 0 ? (
          selectedRegulatoryDocuments.map((document) => (
            <p key={document.id} className="mt-2">
              {document.name}
            </p>
          ))
        ) : (
          <p className="mt-2 text-gray-500">No documents selected.</p>
        )}
      </div>

      <Button
        onClick={() => {
          createReport();
        }}
        disabled={!hasSingleComplianceSubmission || isLoading}
        className="mt-4"
      >
        {isLoading ? <IconSpinner /> : "Generate Report"}
      </Button>

      {isLoading && (
        <AlertComponent
          iconType="info"
          description="Generating report, please wait..."
          title="The report will be in the Reports tab."
        />
      )}
    </div>
  );
};

export default CreateReportComponent;