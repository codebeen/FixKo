"use client";

import { Text, Container, Title, Paper } from "@mantine/core";
import BaseLayout from "../components/layout/BaseLayout";

export default function Dashboard() {
  return (
    <BaseLayout>
      <Paper shadow="xs" p="xl" withBorder>
        <Title order={2} c="#800000">Dashboard</Title>
        <Text mt="md">Welcome to the Dashboard. This section is currently under development.</Text>
      </Paper>
    </BaseLayout>
  );
}
