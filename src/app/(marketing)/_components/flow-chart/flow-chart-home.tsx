"use client";
import { startingPositions, type FlowchartConfig } from "./flow-chart-config";
import Flowchart from "./fow-chart";


const config: FlowchartConfig = {
  pageWidth: startingPositions.pageWidth,
  nodesAboveCodeX: startingPositions.nodesAboveCodeX,
  nodesBelowCodeX: startingPositions.nodesBelowCodeX,
  nodeWidth: startingPositions.nodeWidth,
  nodeHeight: startingPositions.nodeHeight,
  horizontalSpacing: startingPositions.horizontalSpacing,
  verticalSpacing: startingPositions.verticalSpacing,
  initialNodes: [
    // Nodes above Law Assistant AI
    {
      id: "input",
      type: "customNode",
      position: { x: startingPositions.startXAbove, y: 5 },
      data: {
        title: "Input",
        description: "Documents, Emails, Web Pages",
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
        title: "Sources",
        description: "Regulations, Policies, Contracts",
        icon: "layout-template",
      },
    },

    // Law Assistant AI node
    {
      id: "codex",
      type: "customNode",
      position: {
        x: (startingPositions.pageWidth - startingPositions.nodeWidth) / 2,
        y: 5 + startingPositions.nodeHeight + startingPositions.verticalSpacing,
      },
      data: {
        title: "Law Assistant AI",
        description: "Analyse and Extract Insights",
        icon: "code",
      },
    },
    // Nodes below Law Assistant AI
    {
      id: "compliance-report",
      type: "customNode",
      position: {
        x: startingPositions.startXBelow,
        y: startingPositions.baseYPositionBelow,
      },
      data: {
        title: "Compliance Report",
        description: "Full compliance report in any format",
        icon: "file-text",
      },
    },
    {
      id: "highlighted-contract",
      type: "customNode",
      position: {
        x:
          startingPositions.startXBelow +
          startingPositions.nodeWidth +
          startingPositions.horizontalSpacing,
        y: startingPositions.baseYPositionBelow,
      },
      data: {
        title: "Highlighted Contract",
        description: "Key clauses and risks highlighted",
        icon: "file-search",
      },
    },
    {
      id: "environmental-compliance",
      type: "customNode",
      position: {
        x:
          startingPositions.startXBelow +
          (startingPositions.nodeWidth + startingPositions.horizontalSpacing) *
            2,
        y: startingPositions.baseYPositionBelow,
      },
      data: {
        title: "Analytics",
        description: "Compliance trends over time",
        icon: "trending-up",
      },
    },
  ],
  initialEdges: [
    { id: "e-input-data-sources", source: "input", target: "codex" },
    { id: "e-data-sources-codex", source: "data-sources", target: "codex" },
    {
      id: "e-codex-compliance-report",
      source: "codex",
      target: "compliance-report",
    },
    {
      id: "e-codex-highlighted-contract",
      source: "codex",
      target: "highlighted-contract",
    },
    {
      id: "e-codex-environmental-compliance",
      source: "codex",
      target: "environmental-compliance",
    },
    {
      id: "e-codex-suspicious-transactions",
      source: "codex",
      target: "suspicious-transactions",
    },
    {
      id: "e-codex-communication-trends",
      source: "codex",
      target: "communication-trends",
    },
    {
      id: "e-codex-best-practices",
      source: "codex",
      target: "best-practices",
    },
  ],
};

const FlowChartHome = () => {
  return (
    <div className="container mx-auto p-8">
      <Flowchart config={config} />
    </div>
  );
};

export default FlowChartHome;
