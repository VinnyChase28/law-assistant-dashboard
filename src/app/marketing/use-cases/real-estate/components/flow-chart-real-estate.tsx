"use client";
import Flowchart from "src/app/marketing/components/flow-chart/fow-chart";
import {
  startingPositions,
  FlowchartConfig,
} from "src/app/marketing/components/flow-chart/flow-chart-config";

const config: FlowchartConfig = {
  pageWidth: startingPositions.pageWidth,
  nodesAboveCodeX: startingPositions.nodesAboveCodeX,
  nodesBelowCodeX: startingPositions.nodesBelowCodeX,
  nodeWidth: startingPositions.nodeWidth,
  nodeHeight: startingPositions.nodeHeight,
  horizontalSpacing: startingPositions.horizontalSpacing,
  verticalSpacing: startingPositions.verticalSpacing,
  initialNodes: [
    // Nodes above CodeX
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

    // CodeX node
    {
      id: "codex",
      type: "customNode",
      position: {
        x: (startingPositions.pageWidth - startingPositions.nodeWidth) / 2,
        y: 5 + startingPositions.nodeHeight + startingPositions.verticalSpacing,
      },
      data: {
        title: "CodeX",
        description: "Analyse and Extract Insights",
        icon: "code",
      },
    },
    // Nodes below CodeX
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
        title: "Environmental Compliance",
        description: "Environmental compliance reports",
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

const FlowChartRealEstate = () => {
  return (
    <div className="container mx-auto p-8">
      <Flowchart config={config} />
    </div>
  );
};

export default FlowChartRealEstate;
