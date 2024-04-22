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
        description: "Source code, URL's",
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
          "Software development best practices, company coding standards",
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
        description: "Check code for compliance",
        icon: "code",
      },
    },
    {
      id: "compliance-reports",
      type: "customNode",
      position: {
        x: startingPositions.startXBelow,
        y: startingPositions.baseYPositionBelow,
      },
      data: {
        title: "Compliance Reports",
        description: "Reports on compliance",
        icon: "file-text",
      },
    },
    {
      id: "code-improvement",
      type: "customNode",
      position: {
        x:
          startingPositions.startXBelow +
          startingPositions.nodeWidth +
          startingPositions.horizontalSpacing,
        y: startingPositions.baseYPositionBelow,
      },
      data: {
        title: "Code Improvement",
        description: "Code improvement suggestions",
        icon: "code",
      },
    },
    {
      id: "security-quality-issues",
      type: "customNode",
      position: {
        x:
          startingPositions.startXBelow +
          (startingPositions.nodeWidth + startingPositions.horizontalSpacing) *
            2,
        y: startingPositions.baseYPositionBelow,
      },
      data: {
        title: "Security & Quality Issues",
        description: "Identify threats",
        icon: "shield",
      },
    },
  ],
  initialEdges: [
    { id: "e-input-process", source: "input", target: "process" },
    { id: "e-data-sources-process", source: "data-sources", target: "process" },
    {
      id: "e-process-compliance-reports",
      source: "process",
      target: "compliance-reports",
    },
    {
      id: "e-process-code-improvement",
      source: "process",
      target: "code-improvement",
    },
    {
      id: "e-process-security-quality-issues",
      source: "process",
      target: "security-quality-issues",
    },
  ],
};

const FlowChartSoftwareCompliance = () => {
  return (
    <div className="container mx-auto p-8">
      <HeroFeatures
        title="Software Development Compliance"
        headline="Ensuring Compliance with Industry Standards in Software Development"
        description="CodeX automates the process of comparing your source code against industry best practices and company standards, helping identify areas for improvement and potential issues."
        primaryButtonLink="https://cal.com/vincent-gauthier-yxbpaz/30min"
        primaryButtonText="Learn More"
        videoSrc={stars}
      />
      <Flowchart config={config} />
    </div>
  );
};

export default FlowChartSoftwareCompliance;
