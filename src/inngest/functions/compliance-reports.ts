import { inngest } from "../client";
import { openai } from "src/utils/openai";
import { prisma } from "src/utils/prisma";

import { findViolations } from "../helpers/report-helpers";

export enum Models {
  GPT4 = "gpt-4-0125-preview",
  GPT3 = "gpt-3.5-turbo-0125",
}

export const complianceReport = inngest.createFunction(
  { id: "compliance-report", retries: 0 },
  { event: "compliance-report/event.sent" },
  async ({ event }) => {
    //console.log current timestamp in pacific time
    console.log(
      new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" }),
      "started processing compliance report.",
    );
    const allViolationsPromises = event.data.data.map(async (item) => {
      const { complianceSubmission, regulatoryFramework } = item;

      // Process each regulation in parallel for the current compliance submission
      const violationsPromises = regulatoryFramework.map((regulation) =>
        findViolations(complianceSubmission, regulation),
      );

      // Wait for all regulatory checks to complete for the current compliance submission
      const violations = await Promise.all(violationsPromises);
      return violations.flat(); // Flatten the results, as each promise resolves to an array
    });

    // Wait for all compliance submissions to be processed
    const allViolationsNested = await Promise.all(allViolationsPromises);
    const allViolations = allViolationsNested.flat();
    console.log(
      new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" }),
      "finished processing violations.",
    );
    const stringifiedViolations = JSON.stringify(allViolations);
    //do not create a report if there are no violations
    if (allViolations.length === 0) {
      //use prisma client to update the compliance report
      await prisma.file.update({
        where: {
          id: event.data.id,
        },
        data: {
          reportData: JSON.stringify(allViolations),
          processingStatus: "DONE",
        },
      });

      return {
        message: ["No violations found."],
      };
    }
    const finalReportPrompt = `

    Create a compliance report based on the following structured data:
    
    ${stringifiedViolations}
    
    complianceDocument is a page of a file that contains text we are checking for compliance.
    brokenRule is potentially a rule that was broken.
    regulatoryDocument is a page of a file that contains the rule we are checking against.

    very important: remove any duplicate broken rules when creating the report. cite sources including document name, page number, and section where possible.

    The report should be structured as follows:

    Title: "Real Estate Compliance Report" 

    Executive Summary

    Overview: A brief summary of the report, including the purpose of the compliance audit, the scope of the report, and a high-level overview of the findings.

    Table of Contents

    List all the sections of the report along with page numbers for easy navigation.

    Introduction

    Background: Information about the property, including location, size, usage, and any relevant historical data.
    Purpose: Clearly state the purpose of the compliance report, such as due diligence for a property transaction, regulatory compliance verification, etc.
    Scope: Define the scope of the audit, including the aspects of compliance being reviewed.

    Compliance Areas

    This section should be broken down into sub-sections, each covering a specific area of compliance. Depending on the property and jurisdiction, these might include:

    Zoning and Land Use: Compliance with local zoning laws and land use restrictions.
    Building Codes and Standards: Adherence to building codes, including structural integrity, fire safety, and accessibility.
    Environmental Regulations: Compliance with environmental laws, including hazardous materials, waste management, and impact assessments.
    Health and Safety: Ensuring the property meets health and safety standards to protect occupants and visitors.
    Permits and Licenses: Verification that all required permits and licenses for construction, renovation, and operation are obtained and current.

    For each area, provide:

    Regulatory Framework: A summary of applicable laws and regulations.
    Findings: Details of the audit findings, including any areas of non-compliance.
    Evidence: Provide sources.

    Summary of Violations (if applicable)

    List any violations or areas of non-compliance found during the audit, referenced to the detailed findings in the previous section.

    Professional Presentation:

    Clarity and Conciseness: Use clear, concise language and avoid jargon where possible.

    `;

    //create a structured compliance report using openai api
    const response = await openai.chat.completions.create({
      model: Models.GPT4,
      messages: [{ role: "user", content: finalReportPrompt }],
      temperature: 0.2,
      max_tokens: 4096,
    });

    const finalReport = response.choices[0]?.message.content ?? "";

    //use prisma client to update the compliance report
    await prisma.file.update({
      where: {
        id: event.data.id,
      },
      data: {
        reportData: JSON.stringify(allViolations),
        finalReport: finalReport ?? "FAILED",
        processingStatus: "DONE",
      },
    });

    console.log(
      new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" }),
      "finished processing compliance report.",
    );

    return {
      message: allViolations.length > 0 ? allViolations : ["Compliant"],
    };
  },
);

