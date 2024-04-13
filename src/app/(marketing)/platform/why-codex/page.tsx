import React from "react";
import WhyCodex from "./components/why-codex";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why CodeX - Leading Compliance Automation Platform",
  description:
    "Discover why CodeX is the leader in compliance automation. Experience the benefits of our AI-powered platform, backed by expertise and cutting-edge technology.",
};

export default function WhyCodexPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <WhyCodex />
    </div>
  );
}
