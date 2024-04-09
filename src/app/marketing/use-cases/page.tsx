import Flowchart from "./components/fow-chart";
import { Node, Edge } from "reactflow";

const initialNodes: Node[] = [
  {
    id: "input",
    type: "customNode",
    position: { x: 150, y: 5 }, // Adjusted position
    data: {
      title: "Node 1",
      description: "This is a custom node",
      icon: "file-input",
    },
  },
  {
    id: "data-sources",
    type: "customNode",
    position: { x: 350, y: 5 }, // Adjusted position
    data: {
      title: "Node 1",
      description: "This is a custom node",
    },
  },
  {
    id: "codex",
    type: "customNode",
    position: { x: 250, y: 200 }, // Centered below 'Input' and 'Data Sources'
    data: {
      title: "Node 1",
      description: "This is a custom node",
    },
  },
  // Output nodes
  {
    id: "compliance-reports",
    type: "customNode",
    position: { x: 100, y: 400 }, // Adjusted position
    data: {
      title: "Node 1",
      description: "This is a custom node",
    },
  },
  {
    id: "highlighted-contracts",
    type: "customNode",
    position: { x: 400, y: 400 }, // Adjusted position
    data: {
      title: "Node 1",
      description: "This is a custom node",
    },
  },
  // Add the rest of the output nodes here, evenly spaced
];

const initialEdges: Edge[] = [
  { id: "e-input-data-sources", source: "input", target: "codex" },
  { id: "e-data-sources-codex", source: "data-sources", target: "codex" },
  // Connect the "CodeX" node to each output node
  {
    id: "e-codex-compliance-reports",
    source: "codex",
    target: "compliance-reports",
  },
  {
    id: "e-codex-highlighted-contracts",
    source: "codex",
    target: "highlighted-contracts",
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
