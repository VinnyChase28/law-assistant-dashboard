"use client";
import Flowchart from "src/app/marketing/components/flow-chart/fow-chart";
import {
  startingPositions,
  FlowchartConfig,
} from "src/app/marketing/components/flow-chart/flow-chart-config";
import HeroFeatures from "src/app/marketing/components/hero/hero-features";

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
        description: "Proposals, Emails, Questions",
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
        description: "Zoning & Building bylaws",
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
        description: "Compare proposals against bylaws",
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
        description: "Compliance reports",
        icon: "file-text",
      },
    },
    {
      id: "recommendations",
      type: "customNode",
      position: {
        x:
          startingPositions.startXBelow +
          startingPositions.nodeWidth +
          startingPositions.horizontalSpacing,
        y: startingPositions.baseYPositionBelow,
      },
      data: {
        title: "Recommendations",
        description: "Recommended actions",
        icon: "lightbulb",
      },
    },
    {
      id: "data-visualization",
      type: "customNode",
      position: {
        x:
          startingPositions.startXBelow +
          (startingPositions.nodeWidth + startingPositions.horizontalSpacing) *
            2,
        y: startingPositions.baseYPositionBelow,
      },
      data: {
        title: "Data Visualization",
        description: "Visualize compliance data",
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
      id: "e-process-recommendations",
      source: "process",
      target: "recommendations",
    },
    {
      id: "e-process-data-visualization",
      source: "process",
      target: "data-visualization",
    },
  ],
};

const FlowChartRealEstate = () => {
  return (
    <div className="container mx-auto p-8">
      <HeroFeatures
        title="Real Estate"
        headline="Compliance Automation for Real Estate "
        description="CodeX helps you automate compliance processes, reduce risks, and save time."
        primaryButtonLink="https://calendly.com/vince-gauthier/30min?month=2024-04"
        primaryButtonText="Get Started"
      />
      <Flowchart config={config} />
    </div>
  );
};

export default FlowChartRealEstate;
