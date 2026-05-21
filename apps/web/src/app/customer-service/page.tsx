"use client";

import { Text, Container, Title, Paper } from "@mantine/core";
import BaseLayout from "../components/layout/BaseLayout";
import PageHeader from "../components/page-header/PageHeader";

export default function CustomerService() {
  return (
    <BaseLayout>
      <PageHeader
        title="Customer Service"
        description="Welcome to the Customer Service portal. This section is currently under development."
        area="FixKo PH"
        showArea={true}
      />
    </BaseLayout>
  );
}
