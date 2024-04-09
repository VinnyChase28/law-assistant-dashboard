import { Node, Edge } from "reactflow";

type FlowchartConfig = {
  pageWidth: number;
  nodesAboveCodeX: number;
  nodesBelowCodeX: number;
  nodeWidth: number;
  nodeHeight: number;
  horizontalSpacing: number;
  verticalSpacing: number;
  initialNodes: Node[];
  initialEdges: Edge[];
};

export default FlowchartConfig;
