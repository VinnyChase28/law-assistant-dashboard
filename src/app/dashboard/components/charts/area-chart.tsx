import { AreaChart, Card, Title } from "@tremor/react";

const chartData = [
  {
    date: "Q1 2023",
    Summaries: 50,
    Compliance: 1500,
    Research: 950,
    Contracts: 900,
  },
  {
    date: "Q2 2023",
    Summaries: 1400,
    Compliance: 1200,
    Research: 1900,
    Contracts: 950,
  },
  // Add data for Q3 and Q4 as they become available
];

// Formatter for the chart values, assuming the values are just counts and do not represent currency
const valueFormatter = function (number: number | bigint) {
  return new Intl.NumberFormat("us").format(number);
};

export const DocumentAreaChart = () => (
  <Card>
    <Title>Document Generation Over Current Quarter</Title>
    <AreaChart
      className="mt-4 h-72"
      data={chartData}
      index="date"
      categories={["Summaries", "Compliance", "Research", "Contracts"]}
      colors={["blue", "green", "orange", "red"]} // Use different colors for each category
      valueFormatter={valueFormatter}
    />
  </Card>
);

export default DocumentAreaChart;
