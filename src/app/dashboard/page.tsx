import Charts from "@/components/charts/charts";
import { Text } from "@tremor/react";

const DashboardPage = () => {
  return (
    <>
      <Text className="ml-10 pt-5 text-3xl font-bold">Dashboard</Text>
      <Charts />
    </>
  );
};

export default DashboardPage;
