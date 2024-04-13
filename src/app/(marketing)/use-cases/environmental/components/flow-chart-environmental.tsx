"use client";
import Flowchart from "src/app/(marketing)/_components/flow-chart/fow-chart";
import {
  startingPositions,
  FlowchartConfig,
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
        description: "Project plans and specs",
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
        description: "Environmental regulations",
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
          "Cross-reference assessments with regulations and specs to evaluate compliance",
        icon: "code",
      },
    },
    {
      id: "compliance-report",
      type: "customNode",
      position: {
        x: startingPositions.startXBelow,
        y: startingPositions.baseYPositionBelow,
      },
      data: {
        title: "Compliance Report",
        description:
          "Reports detailing potential impacts, compliance gaps, and mitigation strategies",
        icon: "file-text",
      },
    },
    {
      id: "mitigation-strategies",
      type: "customNode",
      position: {
        x:
          startingPositions.startXBelow +
          startingPositions.nodeWidth +
          startingPositions.horizontalSpacing,
        y: startingPositions.baseYPositionBelow,
      },
      data: {
        title: "Mitigation Strategies",
        description: "Strategies to address and mitigate environmental impacts",
        icon: "settings",
      },
    },
    {
      id: "impact-visualization",
      type: "customNode",
      position: {
        x:
          startingPositions.startXBelow +
          (startingPositions.nodeWidth + startingPositions.horizontalSpacing) *
            2,
        y: startingPositions.baseYPositionBelow,
      },
      data: {
        title: "Impact Visualization",
        description:
          "Visual representation of environmental impacts and compliance status",
        icon: "bar-chart-2",
      },
    },
  ],
  initialEdges: [
    { id: "e-input-process", source: "input", target: "process" },
    { id: "e-data-sources-process", source: "data-sources", target: "process" },
    {
      id: "e-process-compliance-report",
      source: "process",
      target: "compliance-report",
    },
    {
      id: "e-process-mitigation-strategies",
      source: "process",
      target: "mitigation-strategies",
    },
    {
      id: "e-process-impact-visualization",
      source: "process",
      target: "impact-visualization",
    },
  ],
};

const FlowChartEnvironmental = () => {
  return (
    <div className="container mx-auto p-8">
      <HeroFeatures
        title="Environmental Compliance"
        headline="Environmental Compliance Automation"
        description="CodeX simplifies the process of ensuring your projects meet environmental standards and regulations."
        primaryButtonLink="https://calendly.com/vince-gauthier/30min?month=2024-04"
        primaryButtonText="Learn More"
        videoSrc={stars}
      />
      <Flowchart config={config} />
    </div>
  );
};

export default FlowChartEnvironmental;
