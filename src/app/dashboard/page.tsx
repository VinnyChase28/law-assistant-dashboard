import Charts from "@/components/charts/charts";
import { Text } from "@tremor/react";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "src/server/auth";

const DashboardPage = () => {
  const session = getServerAuthSession();
  if (!session) {
    redirect("/auth/sign-in");
  }
  return (
    <>
      <Text className="ml-10 pt-5 text-3xl font-bold">Dashboard</Text>
      <Charts />
    </>
  );
};

export default DashboardPage;
