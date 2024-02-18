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

interface Violation {
  regulatoryFramework: {
    fileId: string;
    documentName: string;
    pageNumber: string;
  };
  brokenRules: Array<{
    rule: string;
    complianceSubmission: {
      fileId: string;
      documentName: string;
      pageNumber: string;
    };
  }>;
}

interface EventData {
  data: Array<{
    complianceSubmission: ComplianceSubmission;
    regulatoryFramework: RegulatoryFramework[];
  }>;
}

interface InngestEvent {
  name: "demo/event.sent" | "inngest/function.invoked";
  ts?: number;
  id?: string;
  data: EventData;
  user?: any;
  v?: string;
}

export default inngest.createFunction(
  { id: "compliance-check" },
  { event: "demo/event.sent" },
  async ({ event }: { event: InngestEvent }) => {
    const allViolations: Violation[] = [];

    for (const item of event.data.data) {
      const { complianceSubmission, regulatoryFramework } = item;

      // Remove duplicates based on fileId and pageNumber
      const uniqueRegulations = regulatoryFramework.reduce<RegulatoryFramework[]>((acc, current) => {
        const duplicate = acc.find(
          (item) =>
            item.fileId === current.fileId &&
            item.pageNumber === current.pageNumber,
        );
        if (!duplicate) {
          acc.push(current);
        }
        return acc;
      }, []);

      // Join the textData of all unique regulatory frameworks
      const joinedRegulationText = uniqueRegulations
        .map((reg) => reg.textData)
        .join("\n\n");

      // Create a single regulatoryFramework object with the joined text
      const combinedRegulation = {
        fileId: 0, // You might need a placeholder or a new logic for fileId and documentName since they could vary
        documentName: "Combined Regulations",
        textData: joinedRegulationText,
        pageNumber: 0, // Placeholder, since this is a combined text of possibly different pages
      };

      // Check for violations using the combined regulations text
      const violation = await findViolations(
        complianceSubmission,
        combinedRegulation,
      );
      if (violation !== "Compliant") {
        allViolations.push(violation);
      }
    }

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
      model: "gpt-4-0125-preview",
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
          fileId: regulation.fileId.toString(),
          documentName: regulation.documentName,
          pageNumber: regulation.pageNumber.toString(),
        },
        brokenRules: [
          {
            rule: answer,
            complianceSubmission: {
              fileId: complianceSubmission.fileId.toString(),
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
