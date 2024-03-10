import Link from "next/link";
import { Button } from "@/components/ui/button";
const TermsOfUse = () => {
  return (
    <div className="mx-auto max-w-4xl px-4 pt-8">
      <Link href="/">
        <Button variant="secondary">Home</Button>
      </Link>
      <h1 className="mb-4 py-6 text-2xl font-semibold">
        Terms of Use for Law Assistant.ai
      </h1>
      <p className="mb-4">
        Welcome to Law Assistant.ai. By accessing or using our website and
        application, you agree to be bound by these Terms of Use ("Terms"). If
        you do not agree to these Terms, you may not use our services.
      </p>
      <h2 className="my-3 text-xl font-semibold">Use of Services</h2>
      <p className="mb-4">
        Law Assistant.ai provides compliance validation and document chat
        services using large language models and AI technology. Our platform is
        designed to assist you in verifying compliance and facilitating
        document-related conversations through AI.
      </p>
      <h2 className="my-3 text-xl font-semibold">
        Personal Identifiable Information (PII)
      </h2>
      <ul className="mb-4 list-disc pl-5">
        <li>
          Users are strictly prohibited from uploading documents or data
          containing Personal Identifiable Information (PII) to Law
          Assistant.ai. All personal information must be redacted from documents
          prior to using our services. Law Assistant.ai is not responsible for
          the detection, removal, or management of PII uploaded by users.
        </li>
        <li>
          It is the sole responsibility of the user to ensure that all documents
          and data uploaded to our platform are free of PII and comply with
          applicable privacy laws.
        </li>
      </ul>
      <h2 className="my-3 text-xl font-semibold">AI-Generated Content</h2>
      <ul className="mb-4 list-disc pl-5">
        <li>
          The accuracy of AI-generated reports, chats, or any other output
          cannot be guaranteed.
        </li>
        <li>
          All AI-generated content should be considered as a first draft and not
          a final product.
        </li>
        <li>
          Law Assistant.ai shall not be held legally responsible for
          inaccuracies, errors, or omissions in any AI-generated content.
        </li>
      </ul>
      <h2 className="my-3 text-xl font-semibold">Limitation of Liability</h2>
      <p className="mb-4">
        Law Assistant.ai, its affiliates, and its service providers will not be
        liable for any direct, indirect, incidental, special, consequential, or
        exemplary damages, resulting from the use or inability to use the
        service.
      </p>
      <h2 className="my-3 text-xl font-semibold">Indemnification</h2>
      <p className="mb-4">
        You agree to indemnify and hold harmless Law Assistant.ai and its agents
        from any claims, liabilities, damages, losses, and expenses, including
        attorney fees, arising out of your use of the services, your violation
        of these Terms, or your violation of any law or the rights of a third
        party.
      </p>
      <h2 className="my-3 text-xl font-semibold">Changes to Terms</h2>
      <p className="mb-4">
        Law Assistant.ai reserves the right to modify these Terms at any time.
        Your continued use of the services after such changes constitutes your
        acceptance of the new Terms.
      </p>
      <h2 className="my-3 text-xl font-semibold">Governing Law</h2>
      <p className="mb-4">
        These Terms shall be governed by the laws of British Columbia, Canada,
        without regard to its conflict of law provisions.
      </p>
      <h2 className="my-3 text-xl font-semibold">Contact Us</h2>
      <p>
        If you have any questions about these Terms, please contact us at{" "}
        <a
          href="mailto:legal@lawassistant.ai"
          className="text-blue-500 hover:text-blue-600"
        >
          legal@lawassistant.ai
        </a>
        .
      </p>
    </div>
  );
};

export default TermsOfUse;
