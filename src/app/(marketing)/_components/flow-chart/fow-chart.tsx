// Flowchart.js
"use client";
import React, { useState, useCallback, useEffect } from "react";

import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  type Edge,
  type Node,
  type NodeChange,
  type EdgeChange,
  type Connection,
} from "reactflow";
import "reactflow/dist/style.css";

import CustomNode from "./custom-node";
import { type FlowchartConfig } from "./flow-chart-config";

const nodeTypes = {
  customNode: CustomNode,
};

interface FlowchartProps {
  config: FlowchartConfig;
}

const Flowchart: React.FC<FlowchartProps> = ({ config }) => {
  useEffect(() => {
    const reactFlowAttributionLink = document.querySelector(
      'a[href="https://reactflow.dev"]',
    );
    if (reactFlowAttributionLink) {
      reactFlowAttributionLink.remove();
    }
  }, []);

  const [nodes, setNodes] = useState<Node[]>(config.initialNodes);
  const [edges, setEdges] = useState<Edge[]>(config.initialEdges);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [],
  );

  return (
    <div style={{ width: "100%", height: "700px" }} className="py-10">
      <ReactFlow
        style={{ pointerEvents: "none" }} // Add this line
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        className="react-flow"
        zoomOnScroll={false}
        panOnScroll={false} // Disable panning on scroll
        zoomOnDoubleClick={false} // Disable zooming on double click
        panOnDrag={false} // Disable panning on drag
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={{
          type: "smoothstep",
          animated: true,
        }}
      />
    </div>
  );
};

export default Flowchart;
