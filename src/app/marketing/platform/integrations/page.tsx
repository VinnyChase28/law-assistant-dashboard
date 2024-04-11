import React from "react";
import HowItWorks from "./components/how-it-works";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Integrations - CodeX Compliance Platform",
  description:
    "Connect CodeX with your existing tools and databases for enhanced compliance workflow. Explore integrations with legal databases, document management systems, and more.",
};

export default function IntegrationsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <HowItWorks />
    </div>
  );
}
