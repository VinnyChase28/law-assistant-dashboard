import React from "react";

import { type Metadata } from "next";

import HowItWorks from "./components/how-it-works";


export const metadata: Metadata = {
  title: "How It Works - CodeX Compliance Automation",
  description: "Unlock a better compliance workflow with CodeX. Learn how our AI-driven platform seamlessly integrates with your existing systems to enhance compliance processes."
};

export default function HowItWorksPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <HowItWorks />
    </div>
  );
}
