import React from "react";

import { type Metadata } from "next";

import WhyCodex from "./components/why-codex";


export const metadata: Metadata = {
  title: "Why Law Assistant AI - Leading Compliance Automation Platform",
  description:
    "Discover why Law Assistant AI is the leader in compliance automation. Experience the benefits of our AI-powered platform, backed by expertise and cutting-edge technology.",
};

export default function WhyCodexPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <WhyCodex />
    </div>
  );
}
