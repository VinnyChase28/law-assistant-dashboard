import { openai } from "src/utils/openai";
import * as puppeteer from "puppeteer";
import * as marked from "marked";
import { models } from "../functions/compliance-reports";
import { put } from "@vercel/blob";
import { css } from "./css";

interface UploadResult {
  success: boolean;
  message: string;
  blobUrl?: string;
  fileId?: number;
}

async function convertMarkdownToPdfAndUpload({
  markdown,
  fileId,
}: {
  markdown: string;
  fileId: number;
}): Promise<UploadResult> {
  try {
    //create human readable time stamp
    const date = new Date();
    const timestamp = date.toISOString().split("T")[0];

    // Convert Markdown to HTML
    const html = await marked.parse(markdown);

    // Launch a headless browser
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disabled-setupid-sandbox"],
    });
    const page = await browser.newPage();

    // Set the HTML content and wait for it to load
    await page.setContent(html);
    await page.addStyleTag({
      content: css,
    });

    // Convert the page to PDF
    const pdfBuffer = await page.pdf({ format: "A4" });

    // Close the browser
    await browser.close();

    // Use the server-side `put` function to upload the PDF
    const blob = new Blob([pdfBuffer], { type: "application/pdf" });
    const newBlob = await put(
      `${timestamp}_${fileId}_compliance_report.pdf`,
      blob,
      {
        access: "public",
      },
    );

    return {
      success: true,
      message: "PDF generated and uploaded successfully.",
      blobUrl: newBlob.url,
      fileId: fileId,
    };
  } catch (error: any) {
    console.error("An error occurred:", error);
    return {
      success: false,
      message: `An error occurred during PDF generation or upload: ${error.message}`,
    };
  }
}

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
      model: models.GPT4,
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
