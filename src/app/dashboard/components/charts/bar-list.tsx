import { BarList, Bold, Card, Flex, Text, Title } from "@tremor/react";

const costSavingsData = [
  {
    name: "Automated Document Review",
    value: 15000, // Example value in dollars
    description:
      "Cost savings from using AI for document review versus manual review.",
  },
  {
    name: "Contract Analysis Automation",
    value: 8000, // Example value in dollars
    description:
      "Savings achieved by automating the analysis of contract terms.",
  },
  {
    name: "Litigation Prediction",
    value: 12000, // Example value in dollars
    description:
      "Amount saved by anticipating case outcomes and optimizing strategies.",
  },
  {
    name: "Regulatory Compliance Updates",
    value: 5000, // Example value in dollars
    description:
      "Reduced costs by staying updated on regulatory changes with automated alerts.",
  },
  {
    name: "Automated Legal Research",
    value: 7000, // Example value in dollars
    description:
      "Time and resources saved by using AI to conduct legal research.",
  },
  //... add additional data points as necessary
];

const currencyFormatter = (number: Number) => `$${number.toLocaleString()}`;

export const SideBarList = () => (
  <Card className="max-w-lg">
    <Title className="center">Cost Savings Estimation</Title>
    <BarList
      data={costSavingsData}
      className="mt-2 pt-8"
      valueFormatter={currencyFormatter}
    />
    <Text className="mt-4 text-sm text-gray-600">
      *Cost savings are estimated for the current quarter.
    </Text>
  </Card>
);

export default SideBarList;
