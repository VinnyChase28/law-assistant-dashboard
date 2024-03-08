import { Card, LineChart, Title } from "@tremor/react";

const complianceData = [
  {
    period: "Q1 2024",
    "Compliance Rate": 88,
    "Non-Compliance Rate": 12,
  },
  {
    period: "Q2 2024",
    "Compliance Rate": 92,
    "Non-Compliance Rate": 8,
  },
  {
    period: "Q3 2024",
    "Compliance Rate": 95,
    "Non-Compliance Rate": 5,
  },
  {
    period: "Q4 2024",
    "Compliance Rate": 97,
    "Non-Compliance Rate": 3,
  },
  {
    period: "Q1 2025",
    "Compliance Rate": 93,
    "Non-Compliance Rate": 7,
  },
];

const percentageFormatter = (number: number) => `${number}%`;

const ComplianceTrendChart = () => (
  <Card>
    <Title>Compliance Trend Analysis</Title>
    <LineChart
      className="mt-6"
      data={complianceData}
      index="period"
      categories={["Compliance Rate", "Non-Compliance Rate"]}
      colors={["indigo", "red"]} // 'indigo' for compliance, 'red' for non-compliance
      valueFormatter={percentageFormatter}
      yAxisWidth={40}
    />
  </Card>
);

export default ComplianceTrendChart;
