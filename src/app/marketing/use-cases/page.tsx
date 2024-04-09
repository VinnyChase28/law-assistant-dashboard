import Flowchart from "./components/fow-chart";
import { Node, Edge } from "reactflow";

const nodeWidth = 200; // Width of the node
const nodeHeight = 100; // Height of the node
const verticalSpacing = 30; // Vertical spacing between nodes

const initialNodes: Node[] = [
  {
    id: "input",
    type: "customNode",
    position: { x: 150, y: 5 },
    data: {
      title: "Input",
      description: "Documents, Emails, Web Pages",
      icon: "file-plus",
    },
  },
  {
    id: "data-sources",
    type: "customNode",
    position: { x: 150, y: 5 + nodeHeight + verticalSpacing },
    data: {
      title: "Sources",
      description: "Regulations, Policies, Contracts",
      icon: "layout-template",
    },
  },
  {
    id: "codex",
    type: "customNode",
    position: { x: 150, y: 5 + (nodeHeight + verticalSpacing) * 2 },
    data: {
      title: "CodeX",
      description: "Analyse and Extract Insights",
      icon: "code",
    },
  },
  {
    id: "compliance-report",
    type: "customNode",
    position: { x: 150, y: 5 + (nodeHeight + verticalSpacing) * 3 },
    data: {
      title: "Compliance Report",
      description: "Full compliance report in any format",
      icon: "file-text",
    },
  },
  {
    id: "highlighted-contract",
    type: "customNode",
    position: { x: 150, y: 5 + (nodeHeight + verticalSpacing) * 4 },
    data: {
      title: "Highlighted Contract",
      description: "Key clauses and risks highlighted",
      icon: "file-search",
    },
  },
  {
    id: "environmental-compliance",
    type: "customNode",
    position: { x: 150, y: 5 + (nodeHeight + verticalSpacing) * 5 },
    data: {
      title: "Environmental Compliance",
      description: "Environmental compliance reports",
      icon: "trending-up",
    },
  },
  {
    id: "suspicious-transactions",
    type: "customNode",
    position: { x: 150, y: 5 + (nodeHeight + verticalSpacing) * 6 },
    data: {
      title: "Suspicious Transactions",
      description: "Reports on suspicious transactions",
      icon: "shield",
    },
  },
  {
    id: "communication-trends",
    type: "customNode",
    position: { x: 150, y: 5 + (nodeHeight + verticalSpacing) * 7 },
    data: {
      title: "Communication Trends",
      description: "Reports on communication trends",
      icon: "message-circle",
    },
  },
  {
    id: "best-practices",
    type: "customNode",
    position: { x: 150, y: 5 + (nodeHeight + verticalSpacing) * 8 },
    data: {
      title: "Best Practices",
      description: "Reports on best practices",
      icon: "thumbs-up",
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
