import React from "react";

import { type Metadata } from "next";

import Overview from "./components/overview";

export const metadata: Metadata = {
  title: "Platform Overview - Law Assistant AI Compliance Engine",
  description:
    "Discover the power of Law Assistant AI Compliance Engine. Launch, power, and refine your compliance automation from a single platform with infinite scalability.",
};

export default function PlatformOverviewPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Overview />
    </div>
  );
}
