// Flowchart.js
"use client";
import React, { useState, useCallback, useEffect } from "react";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Controls,
  Edge,
  Node,
  NodeChange,
  EdgeChange,
  Connection,
} from "reactflow";
import "reactflow/dist/style.css";

import CustomNode from "./custom-node";

// Define nodeTypes outside of the Flowchart component
const nodeTypes = {
  customNode: CustomNode,
};

type FlowchartProps = {
  initialNodes: Node[];
  initialEdges: Edge[];
};

const Flowchart: React.FC<FlowchartProps> = ({
  initialNodes,
  initialEdges,
}) => {
  useEffect(() => {
    const reactFlowAttributionLink = document.querySelector(
      'a[href="https://reactflow.dev"]',
    );
    if (reactFlowAttributionLink) {
      reactFlowAttributionLink.remove();
    }
  }, []);

  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

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
    <div style={{ width: "100%", height: "600px" }}>
      {" "}
      {/* Adjusted container size */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        className="react-flow"
        nodeTypes={nodeTypes} // Use the defined nodeTypes here
        defaultEdgeOptions={{
          type: "smoothstep",
          animated: true,
          
        }}
      >
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Flowchart;
