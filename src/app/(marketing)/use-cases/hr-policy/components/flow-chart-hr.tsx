"use client";
import Flowchart from "src/app/(marketing)/_components/flow-chart/fow-chart";
import {
  startingPositions,
  type FlowchartConfig,
} from "src/app/(marketing)/_components/flow-chart/flow-chart-config";
import HeroFeatures from "src/app/(marketing)/_components/hero/hero-features";

import stars from "/videos/stars.mp4";

const config: FlowchartConfig = {
  pageWidth: startingPositions.pageWidth,
  nodesAboveCodeX: startingPositions.nodesAboveCodeX,
  nodesBelowCodeX: startingPositions.nodesBelowCodeX,
  nodeWidth: startingPositions.nodeWidth,
  nodeHeight: startingPositions.nodeHeight,
  horizontalSpacing: startingPositions.horizontalSpacing,
  verticalSpacing: startingPositions.verticalSpacing,
  initialNodes: [
    {
      id: "input",
      type: "customNode",
      position: { x: startingPositions.startXAbove, y: 5 },
      data: {
        title: "Input",
        description:
          "Employee communications, HR policies, legal regulations on workplace conduct",
        icon: "file-plus",
      },
    },
    {
      id: "data-sources",
      type: "customNode",
      position: {
        x:
          startingPositions.startXAbove +
          startingPositions.nodeWidth +
          startingPositions.horizontalSpacing,
        y: 5,
      },
      data: {
        title: "Data Sources",
        description:
          "Communications on Slack/Teams, HR policies on Workday/intranet, legal regulations in databases",
        icon: "layout-template",
      },
    },
    {
      id: "process",
      type: "customNode",
      position: {
        x: (startingPositions.pageWidth - startingPositions.nodeWidth) / 2,
        y: 5 + startingPositions.nodeHeight + startingPositions.verticalSpacing,
      },
      data: {
        title: "Codex",
        description:
          "Analyze communications for policy violations, respecting privacy and ethics",
        icon: "code",
      },
    },
    {
      id: "communication-trends",
      type: "customNode",
      position: {
        x: startingPositions.startXBelow,
        y: startingPositions.baseYPositionBelow,
      },
      data: {
        title: "Communication Trends",
        description: "Automated reports on communication trends",
        icon: "bar-chart-2",
      },
    },
    {
      id: "flagged-messages",
      type: "customNode",
      position: {
        x:
          startingPositions.startXBelow +
          startingPositions.nodeWidth +
          startingPositions.horizontalSpacing,
        y: startingPositions.baseYPositionBelow,
      },
      data: {
        title: "Flagged Messages",
        description: "Flagged messages for HR review",
        icon: "flag",
      },
    },
    {
      id: "policy-refinement",
      type: "customNode",
      position: {
        x:
          startingPositions.startXBelow +
          (startingPositions.nodeWidth + startingPositions.horizontalSpacing) *
            2,
        y: startingPositions.baseYPositionBelow,
      },
      data: {
        title: "Policy Refinement",
        description: "Anonymized summaries for training or policy refinement",
        icon: "edit-3",
      },
    },
  ],
  initialEdges: [
    { id: "e-input-process", source: "input", target: "process" },
    { id: "e-data-sources-process", source: "data-sources", target: "process" },
    {
      id: "e-process-communication-trends",
      source: "process",
      target: "communication-trends",
    },
    {
      id: "e-process-flagged-messages",
      source: "process",
      target: "flagged-messages",
    },
    {
      id: "e-process-policy-refinement",
      source: "process",
      target: "policy-refinement",
    },
  ],
};

const FlowChartHrPolicy = () => {
  return (
    <div className="container mx-auto p-8">
      <HeroFeatures
        title="Policy Compliance"
        headline="Policy Compliance Automation"
        description="CodeX leverages advanced analytics to monitor public communications, ensuring adherence to HR policies and legal standards."
        primaryButtonLink="https://cal.com/vincent-gauthier-yxbpaz/30min"
        primaryButtonText="Explore Solutions"
        videoSrc={stars}
      />
      <Flowchart config={config} />
    </div>
  );
};

export default FlowChartHrPolicy;
