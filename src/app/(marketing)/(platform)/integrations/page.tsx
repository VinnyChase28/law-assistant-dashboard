import React from "react";

import { type Metadata } from "next";

import HowItWorks from "./components/how-it-works";


export const metadata: Metadata = {
  title: "Integrations - Law Assistant AI Compliance Platform",
  description:
    "Connect Law Assistant AI with your existing tools and databases for enhanced compliance workflow. Explore integrations with legal databases, document management systems, and more.",
};

export default function IntegrationsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <HowItWorks />
    </div>
  );
}
