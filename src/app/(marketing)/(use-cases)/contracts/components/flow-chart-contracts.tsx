"use client";
import Flowchart from "src/app/(marketing)/_components/flow-chart/fow-chart";
import {
  startingPositions,
  type FlowchartConfig,
} from "src/app/(marketing)/_components/flow-chart/flow-chart-config";
import HeroFeatures from "src/app/(marketing)/_components/hero/hero-features";

import particles from "/videos/particles.mp4";

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
          "Draft contracts, industry-standard contracts, company policies",
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
          "Contracts via email or Google Drive, standard templates on SharePoint",
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
          "Analyze contracts against templates and policies using vector embeddings",
        icon: "code",
      },
    },
    {
      id: "highlighted-contract",
      type: "customNode",
      position: {
        x: startingPositions.startXBelow,
        y: startingPositions.baseYPositionBelow,
      },
      data: {
        title: "Highlighted Contract",
        description:
          "Contracts indicating deviations with suggestions for alignment",
        icon: "file-text",
      },
    },
    {
      id: "alignment-suggestions",
      type: "customNode",
      position: {
        x:
          startingPositions.startXBelow +
          startingPositions.nodeWidth +
          startingPositions.horizontalSpacing,
        y: startingPositions.baseYPositionBelow,
      },
      data: {
        title: "Alignment Suggestions",
        description:
          "Suggestions for contract alignment with standards and policies",
        icon: "lightbulb",
      },
    },
    {
      id: "contract-visualization",
      type: "customNode",
      position: {
        x:
          startingPositions.startXBelow +
          (startingPositions.nodeWidth + startingPositions.horizontalSpacing) *
            2,
        y: startingPositions.baseYPositionBelow,
      },
      data: {
        title: "Contract Visualization",
        description: "Visualize contract deviations and alignments",
        icon: "bar-chart-2",
      },
    },
  ],
  initialEdges: [
    { id: "e-input-process", source: "input", target: "process" },
    { id: "e-data-sources-process", source: "data-sources", target: "process" },
    {
      id: "e-process-highlighted-contract",
      source: "process",
      target: "highlighted-contract",
    },
    {
      id: "e-process-alignment-suggestions",
      source: "process",
      target: "alignment-suggestions",
    },
    {
      id: "e-process-contract-visualization",
      source: "process",
      target: "contract-visualization",
    },
  ],
};

const FlowChartContract = () => {
  return (
    <div>
      <HeroFeatures
        title="Contract Compliance"
        headline="Contract Compliance Automation"
        description="Law Assistant AI streamlines your contract review process, ensuring compliance and alignment with industry standards."
        primaryButtonLink="https://usemotion.com/meet/vincent-gauthier/meeting?d=30"
        primaryButtonText="Schedule a Review"
        videoSrc={particles}
      />
      <Flowchart config={config} />
    </div>
  );
};

export default FlowChartContract;
