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

export interface Violation {
  regulatoryFramework?: {
    fileId: number;
    documentName: string;
    pageNumber: string;
  };
  brokenRules?: Array<{
    rule: string;
    complianceSubmission: {
      fileId: number;
      documentName: string;
      pageNumber: string;
    };
  }>;
}

export default inngest.createFunction(
  { id: "compliance-check" },
  { event: "demo/event.sent" },
  async ({ event }) => {
    const allViolations: Violation[] = [];
    const fileId = event.data.id;

    for (const item of event.data.data) {
      const { complianceSubmission, regulatoryFramework } = item;
      for (const regulation of regulatoryFramework) {
        const violation = await findViolations(
          complianceSubmission,
          regulation,
        );
        if (violation !== "Compliant") {
          allViolations.push(violation);
        }
      }
    }
    let aggregatedViolation = allViolations.reduce(
      (acc, curr) => {
        // Ensure regulatoryFramework is set if it's not already
        if (!acc.regulatoryFramework && curr.regulatoryFramework) {
          acc.regulatoryFramework = curr.regulatoryFramework;
        }

        // Ensure acc.brokenRules is an array before concatenating
        acc.brokenRules = (acc.brokenRules || []).concat(
          curr.brokenRules || [],
        );

        return acc;
      },
      { brokenRules: [] } as Violation,
    ); // Cast the initial value as Violation to match the expected type

    if (
      aggregatedViolation.brokenRules &&
      aggregatedViolation.brokenRules.length > 0
    ) {
      await api.file.updateComplianceReport.mutate({
        id: fileId,
        reportData: aggregatedViolation,
      });
    } else {
      // Handle the case where there are no violations
    }

    await api.file.updateComplianceReport.mutate({
      id: fileId,
      reportData: aggregatedViolation,
    });

    return {
      message: allViolations.length > 0 ? allViolations : ["Compliant"],
    };
  },
);

async function findViolations(
  complianceSubmission: ComplianceSubmission,
  regulation: RegulatoryFramework,
): Promise<Violation | "Compliant"> {
  const prompt = `
  Review the compliance text below and compare it against the provided regulations. Identify any discrepancies or violations based on specific criteria such as safety standards, material requirements, and legal guidelines pertinent to building, zoning, and other municipal real estate and construction regulations. List each violation found with a brief explanation. If a the violation is related to a measurement, please indicate the wrong measurement and provide the correct measurement . A lack of or missing information, in addition to not addressing certain regulations is not considered a violation or something you should comment on at all. 

  Compliance Text: ${complianceSubmission.textData}
  
  Regulation Text: ${regulation.textData}
  
  Note: Consider aspects such as safety measures, material specifications, procedural adherence, measurements and any explicit regulatory mandates. Do not give advice or rules outside of the comparison between the Compliance Text and the Regulation Text. Provide a clear and concise analysis. 

  Most importantly, and my life depends on this, ff the compliance text aligns with the regulations or if the section is not relevant to the given regulations, simply respond with "Compliant", and nothing more.
  
    `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.1,
      max_tokens: 300,
    });

    const answer = response.choices[0]?.message.content || "";
    if (answer === "Compliant") {
      return "Compliant";
    } else {
      return {
        regulatoryFramework: {
          fileId: regulation.fileId,
          documentName: regulation.documentName,
          pageNumber: regulation.pageNumber.toString(),
        },
        brokenRules: [
          {
            rule: answer,
            complianceSubmission: {
              fileId: complianceSubmission.fileId,
              documentName: complianceSubmission.documentName,
              pageNumber: complianceSubmission.pageNumber.toString(),
            },
          },
        ],
      };
    }
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return "Compliant";
  }
}
