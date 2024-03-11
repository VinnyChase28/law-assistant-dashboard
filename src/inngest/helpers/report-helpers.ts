import { openai } from "src/utils/openai";
import { Models } from "../functions/compliance-reports";

interface ComplianceSubmission {
  fileId: number;
  documentName: string;
  textData: string;
  pageNumber: number;
}

export interface RegulatoryFramework {
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
      that directly pertains to the restrictions or prescribed requirements for the rules question, My life depends on it. 

      The sources should be at the end of your response.`;

  try {
    const response = await openai.chat.completions.create({
      model: Models.GPT4,
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

export { findViolations };
