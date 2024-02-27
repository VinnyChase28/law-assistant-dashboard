import { BarList, Bold, Card, Flex, Text, Title } from "@tremor/react";

const costSavingsData = [
  {
    name: "Compliance reports",
    value: 2304, // Example value in dollars
    description:
      "Cost savings from using AI for compliance reports versus manual review.",
  },
  {
    name: "Automated Legal Research",
    value: 1298, // Example value in dollars
    description:
      "Time and resources saved by using AI to conduct municipal, provincial and national real estate research.",
  },
  
];

const currencyFormatter = (number: Number) => `$${number.toLocaleString()}`;

export const SideBarList = () => (
  <Card>
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
