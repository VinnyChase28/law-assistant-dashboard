import Flowchart from "../components/flow-chart/fow-chart";
import { Node, Edge } from "reactflow";

const pageWidth = 1920; // Width of the page in pixels
const nodesAboveCodeX = 2; // Number of nodes above CodeX
const nodesBelowCodeX = 3; // Number of nodes below CodeX (adjust as needed)
const nodeWidth = 275; // Width of each node in pixels
const nodeHeight = 150; // Height of each node in pixels
const horizontalSpacing = 50; // Horizontal spacing between nodes in pixels
const verticalSpacing = 50; // Vertical spacing between nodes in pixels
const baseYPosition = 5 + (nodeHeight + verticalSpacing) * 4; // Y position of the nodes branching out from CodeX
const baseYPositionBelow = 5 + (nodeHeight + verticalSpacing) * 2;

// Calculate the starting x position for the nodes above CodeX
const startXAbove =
  (pageWidth -
    (nodeWidth * nodesAboveCodeX + horizontalSpacing * (nodesAboveCodeX - 1))) /
  2;

// Calculate the starting x position for the nodes below CodeX
const startXBelow =
  (pageWidth -
    (nodeWidth * nodesBelowCodeX + horizontalSpacing * (nodesBelowCodeX - 1))) /
  2;

const initialNodes: Node[] = [
  // Nodes above CodeX
  {
    id: "input",
    type: "customNode",
    position: { x: startXAbove, y: 5 },
    data: {
      title: "Input",
      description: "Documents, Emails, Web Pages",
      icon: "file-plus",
    },
  },
  {
    id: "data-sources",
    type: "customNode",
    position: { x: startXAbove + nodeWidth + horizontalSpacing, y: 5 },
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
      x: (pageWidth - nodeWidth) / 2,
      y: 5 + nodeHeight + verticalSpacing,
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
    position: { x: startXBelow, y: baseYPositionBelow },
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
      x: startXBelow + nodeWidth + horizontalSpacing,
      y: baseYPositionBelow,
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
      x: startXBelow + (nodeWidth + horizontalSpacing) * 2,
      y: baseYPositionBelow,
    },
    data: {
      title: "Environmental Compliance",
      description: "Environmental compliance reports",
      icon: "trending-up",
    },
  },
];

const initialEdges: Edge[] = [
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
  // Add the rest of the edges connecting "CodeX" to the other output nodes...
];

const FlowChartPage = () => {
  return (
    <div className="container mx-auto p-8">
      <Flowchart initialNodes={initialNodes} initialEdges={initialEdges} />
    </div>
  );
};

export default FlowChartPage;
