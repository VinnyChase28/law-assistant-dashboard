"use client";
import { useEffect } from "react";
import { useComplianceReportsStore } from "src/store/store";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DataTable } from "./files/components/data-table";
import { columns } from "./files/components/columns";
import Charts from "@/components/charts/charts";
import { Text } from "@tremor/react";
import { api } from "src/trpc/react"; // Ensure this is the correct path

const DashboardPage = () => {
  const { setReports } = useComplianceReportsStore();

  // Fetch compliance reports using the useQuery hook
  const {
    data: complianceReports,
    isLoading,
    error,
  } = api.file.getMyFiles.useQuery({
    documentTypes: ["COMPLIANCE_REPORT"],
  });

  // Update the Zustand store with the fetched data when it's available
  useEffect(() => {
    if (complianceReports) {
      setReports(complianceReports);
    }
  }, [complianceReports, setReports]);

  // Access the reports from the Zustand store for rendering
  const { reports } = useComplianceReportsStore();
  return (
    <>
      <Text className="ml-10 pt-5 text-3xl font-bold">Dashboard</Text>
      <Tabs defaultValue="overview" className="w-full p-5">
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
