import { mdToPdf } from "md-to-pdf";
import { openai } from "src/utils/openai";

/**
 * Converts markdown content to a PDF and uploads it to a specified endpoint.
 *
 * @param markdown - The markdown content to be converted to PDF.
 * @param fileId - An identifier for the file, used in database operations or for tracking.
 * @returns A promise that resolves to an object containing the blob URL of the uploaded PDF and the fileId.
 *
 * @example
 * const result = await convertMarkdownToPdfAndUpload('# Hello World', 123);
 * console.log(result); // { success: true, blobUrl: 'https://example.com/pdf/123', fileId: 123 }
 *
 * @throws If the PDF generation or upload process fails, the function will throw an error with a descriptive message.
 */

interface ConvertMarkdownToPdfAndUploadInput {
  markdown: string;
  fileId: number;
}

interface UploadResult {
  success: boolean;
  message: string;
  blobUrl?: string;
  fileId?: number;
}

async function convertMarkdownToPdfAndUpload(
  input: ConvertMarkdownToPdfAndUploadInput,
): Promise<UploadResult> {
  const { markdown, fileId } = input;

  try {
    // Get the current date
    const currentDate = new Date();
    const dateString = currentDate.toISOString().split("T")[0]; // Results in "YYYY-MM-DD"
    const fileName = `${dateString} Compliance Report.pdf`;

    const pdf = await mdToPdf({ content: markdown }).catch(console.error);

    if (pdf && pdf.content) {
      // Assuming Node.js environment, otherwise adjust Blob usage accordingly
      const blob = new Blob([Buffer.from(pdf.content)], {
        type: "application/pdf",
      });

      const formData = new FormData();
      formData.append("file", blob, fileName);

      const uploadResponse = await fetch("/api/upload-file", {
        method: "POST",
        body: formData,
        // headers: {}, // FormData sets its own headers, so this might be unnecessary
      });

      if (!uploadResponse.ok) {
        throw new Error(`Failed to upload PDF: ${uploadResponse.statusText}`);
      }

      const uploadResult = await uploadResponse.json();

      return {
        success: true,
        message: "PDF generated and uploaded successfully.",
        blobUrl: uploadResult.url, // Assuming the response includes the URL of the uploaded blob
        fileId: fileId,
      };
    } else {
      return { success: false, message: "Failed to generate PDF." };
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "An error occurred during PDF generation or upload.",
    };
  }
}

export default convertMarkdownToPdfAndUpload;

/**
 * Identifies compliance violations by comparing a compliance submission against a regulatory framework.
 * Utilizes an AI model to analyze text data for potential rule violations.
 *
 * @param {ComplianceSubmission} complianceSubmission - The compliance document to be verified, including its text data and metadata.
 * @param {RegulatoryFramework} regulation - The regulatory document to compare against, including its text data and metadata.
 * @returns {Promise<DetailedViolation[]>} - A promise that resolves to an array of detailed violations found, if any.
 */

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

export { findViolations, convertMarkdownToPdfAndUpload };
