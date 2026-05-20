"use client";

import { Text, Container, Title, Paper } from "@mantine/core";
import BaseLayout from "../components/layout/BaseLayout";
import PageHeader from "@/app/components/page-header/PageHeader";

export default function Dashboard() {
  return (
    <BaseLayout>
      <PageHeader
          title="Dashboard"
          description="Overview of system activities and performance metrics."
          area="FixKo PH"
          showArea={true}
        />
    </BaseLayout>
  );
}
