import { inngest } from "../client";
import { openai } from "src/utils/openai";
import { api } from "src/trpc/server";

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
    const allViolations: DetailedViolation[] = [];
    const fileId = event.data.id;

    for (const item of event.data.data) {
      const { complianceSubmission, regulatoryFramework } = item;
      for (const regulation of regulatoryFramework) {
        const violations = await findViolations(
          complianceSubmission,
          regulation,
        );
        allViolations.push(...violations);
      }
    }

    const response = await api.file.updateComplianceReport.mutate({
      id: fileId,
      reportData: allViolations,
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
  Review the compliance text below and compare it against the provided regulations. Identify any discrepancies or violations based on specific criteria such as safety standards, material requirements, and legal guidelines pertinent to building, zoning, and other municipal real estate and construction regulations. List each violation found with a brief explanation. If a the violation is related to a measurement, please indicate the wrong measurement and provide the correct measurement . A lack of or missing information, in addition to not addressing certain regulations is not considered a violation or something you should comment on at all. 

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
        .content!.split("\n")
        .filter((line) => line.trim() !== "") || [];
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
