"use client";

import { Grid } from "@tremor/react";

import DocumentAreaChart from "./area-chart";
import { SideBarList } from "./bar-list";
import ComplianceTrendChart from "./line-chart";
import UsageCircle from "./usage-circle";

export default function ChartsContainer() {
  return (
    <main className="p-4">
      <Grid numItemsMd={3} numItemsLg={3} className="mt-6 gap-6">
        <ComplianceTrendChart />
        <SideBarList />
        <UsageCircle />
      </Grid>
      <div className="mt-6">
        <DocumentAreaChart />
      </div>
    </main>
  );
}
