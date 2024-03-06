import { inngest } from "../client";
import { openai } from "src/utils/openai";
import { prisma } from "src/utils/prisma";

interface ComplianceSubmission {
  fileId: number;
  documentName: string;
  textData: string;
  pageNumber: number;
}

interface RegulatoryFramework {
  fileId: number;
  documentName: string;
  textData: string;
  pageNumber: number;
}

interface DetailedViolation {
  complianceDocument: {
    fileId: number;
    documentName: string;
    pageNumber: number;
  };
  brokenRule: {
    violation: string;
    description: string;
  };
  regulatoryDocument: {
    fileId: number;
    documentName: string;
    pageNumber: number;
  };
}

async function findViolations(
  complianceSubmission: ComplianceSubmission,
  regulation: RegulatoryFramework,
): Promise<DetailedViolation[]> {
  const prompt = `
      The is the text that should be verified for compliance: 
      
      ${complianceSubmission.textData}
      
      This is the rules text to verify against:

      ${regulation.textData}
      
      Your goal is to answer the rules question using the provided rules text as a reference. Please provide proper sources for each rule you reference. 

      The summary should be directly relevant to the query, concise, and specific. do not provide any peripheral information with respect to the question asked. Give me only the information 
      that directly pertains to the restrictions or prescribed requirements for the rules. question my life depends on it. 

      The sources should be at the end of your response.
      If the given question does 
    `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-0125-preview",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
      max_tokens: 300,
    });

    const answers =
      response.choices[0]?.message
        .content!.trim()
        .split("\n")
        .filter((line: string) => line.trim() !== "") ?? [];
    if (answers.length === 0 || answers[0] === "Compliant") {
      return [];
    } else {
      return answers.map((answer) => ({
        complianceDocument: {
          fileId: complianceSubmission.fileId,
          documentName: complianceSubmission.documentName,
          pageNumber: complianceSubmission.pageNumber,
        },
        brokenRule: {
          violation: answer,
          description: `Violation found in text: ${complianceSubmission.documentName}. The violation was found on page ${complianceSubmission.pageNumber}.`,
        },
        regulatoryDocument: {
          fileId: regulation.fileId,
          documentName: regulation.documentName,
          pageNumber: regulation.pageNumber,
        },
      }));
    }
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return [];
  }
}

export const complianceReport = inngest.createFunction(
  { id: "compliance-report" },
  { event: "compliance-report/event.sent" },
  async ({ event }) => {
    // Process each compliance submission in parallel
    const allViolationsPromises = event.data.complianceData.map(
      async (item) => {
        const { complianceSubmission, regulatoryFramework } = item;

        // Process each regulation in parallel for the current compliance submission
        const violationsPromises = regulatoryFramework.map((regulation) =>
          findViolations(complianceSubmission, regulation),
        );

        // Wait for all regulatory checks to complete for the current compliance submission
        const violations = await Promise.all(violationsPromises);
        return violations.flat(); // Flatten the results, as each promise resolves to an array
      },
    );

    // Wait for all compliance submissions to be processed
    const allViolationsNested = await Promise.all(allViolationsPromises);
    const allViolations = allViolationsNested.flat();

    const stringifiedViolations = JSON.stringify(allViolations);
    const finalReportPrompt = `

    Create a compliance report based on the following structured data:
    
    ${stringifiedViolations}
    
    complianceDocument is a page of a file that contains text we are checking for compliance.
    brokenRule is potentially a rule that was broken.
    regulatoryDocument is a page of a file that contains the rule we are checking against.

    remove any duplicate broken rules when creating the report.

    The report should be structured as follows:

    Cover Page

    Title: "Real Estate Compliance Report" or a more specific title based on the project or property in question.
    Property Name/ID: Identification of the property or project being audited.
    Date: The date when the report was completed.
    Prepared for: The name of the entity or individuals the report is prepared for.
    Prepared by: Your name or your firm's name, including contact information.

Executive Summary

    Overview: A brief summary of the report, including the purpose of the compliance audit, the scope of the report, and a high-level overview of the findings.

Table of Contents

    List all the sections of the report along with page numbers for easy navigation.

Introduction

    Background: Information about the property, including location, size, usage, and any relevant historical data.
    Purpose: Clearly state the purpose of the compliance report, such as due diligence for a property transaction, regulatory compliance verification, etc.
    Scope: Define the scope of the audit, including the aspects of compliance being reviewed.

Methodology

    Data Collection: Describe how information was gathered, including document reviews, inspections, and interviews.
    Analysis Techniques: Outline the methods used to analyze compliance, such as comparing property practices against regulatory requirements.

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
    Evidence: Include or reference evidence such as photographs, inspection reports, and official documents.

Summary of Violations (if applicable)

    List any violations or areas of non-compliance found during the audit, referenced to the detailed findings in the previous section.

Recommendations

    Provide detailed recommendations for addressing any compliance issues, including corrective actions and timelines.

Appendices

    Include any additional documentation that supports your findings and recommendations, such as full inspection reports, floor plans, permits, and correspondence with regulatory bodies.

Professional Presentation Tips:

    Clarity and Conciseness: Use clear, concise language and avoid jargon where possible.
    Formatting: Use headings, bullet points, and numbered lists for easy reading. Maintain consistent fonts and colors.
    Visual Aids: Include charts, tables, and photographs to illustrate points and break up text.
    Professional Binding: For physical reports, professional binding and high-quality paper can make a good impression.
    Digital Format: Provide a digital copy of the report in a universally accessible format like PDF, ensuring all digital documents are searchable and well-organized.

This structure should give you a solid foundation to create a comprehensive and professional real estate compliance report. Tailor the content to your specific audit findings and the needs of your audience.

    `;

    //create a structured compliance report using openai api
    const response = await openai.chat.completions.create({
      model: "gpt-4-0125-preview",
      messages: [{ role: "user", content: finalReportPrompt }],
      temperature: 0.2,
      max_tokens: 10000,
    });

    const finalReport = response.choices[0]?.message.content;

    //use prisma client to update the compliance report
    await prisma.file.update({
      where: {
        id: event.data.id,
      },
      data: {
        reportData: JSON.stringify(allViolations),
        finalReport,
        processingStatus: "DONE",
      },
    });

    return {
      message: allViolations.length > 0 ? allViolations : ["Compliant"],
    };
  },
);

