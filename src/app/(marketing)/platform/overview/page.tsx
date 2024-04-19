import React from "react";
import Overview from "./components/overview";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Platform Overview - CodeX Compliance Engine",
  description:
    "Discover the power of CodeX Compliance Engine. Launch, power, and refine your compliance automation from a single platform with infinite scalability.",
};

export default function PlatformOverviewPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Overview />
    </div>
  );
}