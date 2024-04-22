import { withMarkdown } from "@/app/_components/markdown/with-markdown";

// Create the Privacy Policy page component using the higher-order function
const TermUsePage = withMarkdown("privacy-and-terms");

// Export the page component with the slug set to 'privacy-policy'
export default function PrivacyPolicy() {
  return <TermUsePage slug="privacy-policy" />;
}
