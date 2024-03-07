"use client";
import { useEffect } from "react";
import { useComplianceReportsStore } from "src/store/store";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DataTable } from "./dashboard/files/components/data-table";
import { columns } from "./dashboard/files/components/columns";
import Charts from "@/components/charts/charts";
import { Text } from "@tremor/react";
import { api } from "src/trpc/react";
import { useSearchParams } from "next/navigation"; // Import useParams from next/navigation

const DashboardPage = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const { setReports } = useComplianceReportsStore();
  const { data: complianceReports } = api.file.getMyFiles.useQuery(
    {
      documentTypes: ["COMPLIANCE_REPORT"],
    },
    {
      refetchOnReconnect: true,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    },
  );

  useEffect(() => {
    if (complianceReports) {
      setReports(complianceReports);
    }
  }, [complianceReports, setReports]);

  const { reports } = useComplianceReportsStore();

  return (
    <>
      <Text className="ml-10 pt-5 text-3xl font-bold">Dashboard</Text>
      <Tabs defaultValue={tab ?? "overview"} className="w-full p-5">
        <TabsList className="ml-8 border-b-2 border-gray-300">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="genaiDocs">GenAi Docs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Charts />
        </TabsContent>

        <TabsContent value="genaiDocs">
          <DataTable data={reports} columns={columns} />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default DashboardPage;
