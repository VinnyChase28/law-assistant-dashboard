import { AreaChart, Card, Title } from "@tremor/react";

const chartData = [
  {
    date: "Q1 2024",
    Compliance: 483,
  },
  {
    date: "Q2 2024",
    Compliance: 683,
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
      categories={["Compliance"]}
      colors={["indigo"]} // Use different colors for each category
      valueFormatter={valueFormatter}
    />
  </Card>
);

export default DocumentAreaChart;
