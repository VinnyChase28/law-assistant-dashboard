import { Node, Edge } from "reactflow";


export type StartingPositions = {
  pageWidth: number;
  nodesAboveCodeX: number;
  nodesBelowCodeX: number;
  nodeWidth: number;
  nodeHeight: number;
  horizontalSpacing: number;
  verticalSpacing: number;
  baseYPositionBelow: number;
  startXAbove: number;
  startXBelow: number;
};

export const startingPositions: StartingPositions = {
  pageWidth: 1920,
  nodesAboveCodeX: 2,
  nodesBelowCodeX: 3,
  nodeWidth: 275,
  nodeHeight: 150,
  horizontalSpacing: 50,
  verticalSpacing: 50,
  baseYPositionBelow: 5 + (150 + 50) * 2,
  startXAbove: (1920 - (275 * 2 + 50)) / 2,
  startXBelow: (1920 - (275 * 3 + 50 * 2)) / 2,
};

export type FlowchartConfig = {
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