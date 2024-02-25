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
    textSnippet: string;
  };
  brokenRule: {
    violation: string;
    description: string;
  };
  regulatoryDocument: {
    fileId: number;
    documentName: string;
    pageNumber: number;
    textSnippet: string;
  };
}

export default inngest.createFunction(
  { id: "compliance-check" },
  { event: "demo/event.sent" },
  async ({ event }) => {
    // Process each compliance submission in parallel
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
    const allViolations = allViolationsNested.flat(); // Flatten the results

    //instead use prisma client to update the compliance report
    const response = await prisma.file.update({
      where: {
        id: event.data.id,
      },
      data: {
        reportData: JSON.stringify(allViolations),
      },
    });

    console.log("Compliance Report Updated: ", response);

    return {
      message: allViolations.length > 0 ? allViolations : ["Compliant"],
    };
  },
);

async function findViolations(
  complianceSubmission: ComplianceSubmission,
  regulation: RegulatoryFramework,
): Promise<DetailedViolation[]> {
  const prompt = `
  Review the compliance text below and compare it against the provided regulations. Identify any discrepancies or violations based on specific criteria such as safety standards, material requirements, and legal guidelines pertinent to building, zoning, and other municipal real estate and construction regulations. List each violation found with a brief explanation. If a the violation is related to a measurement, please indicate the wrong measurement and provide the correct measurement. A lack of or missing information, in addition to not addressing certain regulations is not considered a violation or something you should comment on at all.

  Compliance Text: ${complianceSubmission.textData}
  
  Regulation Text: ${regulation.textData}
  
  

  Most importantly, and my life depends on this, if the compliance text aligns with the regulations or if the section is not relevant to the given regulations, simply respond with "Compliant", and nothing more.
  
    `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.1,
      max_tokens: 300,
    });

    const answers =
      response.choices[0]?.message
        .content!.trim()
        .split("\n")
        .filter((line: any) => line.trim() !== "") ?? [];
    if (answers.length === 0 || answers[0] === "Compliant") {
      return [];
    } else {
      return answers.map((answer) => ({
        complianceDocument: {
          fileId: complianceSubmission.fileId,
          documentName: complianceSubmission.documentName,
          pageNumber: complianceSubmission.pageNumber,
          textSnippet: complianceSubmission.textData,
        },
        brokenRule: {
          violation: answer,
          description: `Violation found in text: ${complianceSubmission.documentName}. The violation was found on page ${complianceSubmission.pageNumber}.`,
        },
        regulatoryDocument: {
          fileId: regulation.fileId,
          documentName: regulation.documentName,
          pageNumber: regulation.pageNumber,
          textSnippet: regulation.textData,
        },
      }));
    }
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return [];
  }
}
