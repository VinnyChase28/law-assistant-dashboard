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
          "Transaction records, AML laws, internal compliance checklists",
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
          "Financial software like QuickBooks, regulatory websites, Google Docs",
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
          "Screen transactions against AML laws and checklists using pattern recognition",
        icon: "code",
      },
    },
    {
      id: "alerts",
      type: "customNode",
      position: {
        x: startingPositions.startXBelow,
        y: startingPositions.baseYPositionBelow,
      },
      data: {
        title: "Alerts",
        description: "Alerts on suspicious transactions",
        icon: "bell",
      },
    },
    {
      id: "investigation-reports",
      type: "customNode",
      position: {
        x:
          startingPositions.startXBelow +
          startingPositions.nodeWidth +
          startingPositions.horizontalSpacing,
        y: startingPositions.baseYPositionBelow,
      },
      data: {
        title: "Investigation Reports",
        description: "Detailed reports for further investigation",
        icon: "file-text",
      },
    },
    {
      id: "compliance-dashboard",
      type: "customNode",
      position: {
        x:
          startingPositions.startXBelow +
          (startingPositions.nodeWidth + startingPositions.horizontalSpacing) *
            2,
        y: startingPositions.baseYPositionBelow,
      },
      data: {
        title: "Compliance Dashboard",
        description: "Compliance status dashboards",
        icon: "bar-chart-2",
      },
    },
  ],
  initialEdges: [
    { id: "e-input-process", source: "input", target: "process" },
    { id: "e-data-sources-process", source: "data-sources", target: "process" },
    { id: "e-process-alerts", source: "process", target: "alerts" },
    {
      id: "e-process-investigation-reports",
      source: "process",
      target: "investigation-reports",
    },
    {
      id: "e-process-compliance-dashboard",
      source: "process",
      target: "compliance-dashboard",
    },
  ],
};

const FlowChartFinancial = () => {
  return (
    <div className="container mx-auto p-8">
      <HeroFeatures
        title="Compliance Monitoring"
        headline="Monitoring for Financial Transactions"
        description="CodeX enhances your ability to monitor transactions, ensuring compliance with AML laws and internal guidelines."
        primaryButtonLink="https://cal.com/vincent-gauthier-yxbpaz/30min"
        primaryButtonText="Discover More"
        videoSrc={stars}
      />
      <Flowchart config={config} />
    </div>
  );
};

export default FlowChartFinancial;
