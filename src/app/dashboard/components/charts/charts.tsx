"use client";

import { Card, Grid } from "@tremor/react";
import ComplianceTrendChart from "./line-chart";
import { SideBarList } from "./bar-list";
import UsageCircle from "./usage-circle";

export default function Charts() {
  return (
    <main className="p-4">
      <Grid numItemsMd={2} numItemsLg={3} className="mt-6 gap-6">
        <ComplianceTrendChart />
        <SideBarList />
        <UsageCircle />
      </Grid>
      <div className="mt-6">
        <Card>
          <div className="h-80" />
        </Card>
      </div>
    </main>
  );
}
