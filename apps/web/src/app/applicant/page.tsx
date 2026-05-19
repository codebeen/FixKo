"use client";

import { Text, Container, Title, Paper } from "@mantine/core";
import BaseLayout from "../components/layout/BaseLayout";

export default function Applicant() {
  return (
    <BaseLayout>
      <Paper shadow="xs" p="xl" withBorder>
        <Title order={2} c="#800000">Applicant Portal</Title>
        <Text mt="md">Welcome to the Applicant portal. This section is currently under development.</Text>
      </Paper>

      
    </BaseLayout>
  );
}
