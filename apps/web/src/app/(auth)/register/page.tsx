"use client";

import { Text, Box } from "@mantine/core";
import BaseAuth from "../../components/layout/BaseAuth";

export default function Register() {
  return (
    <BaseAuth>
      <Text fw={600} style={{ fontSize: 24 }} c="#800000" ta="center">Register</Text>
      <Box w="90%" ta="center" mt="md">
        <Text size="sm">Registration page is under development.</Text>
      </Box>
    </BaseAuth>
  );
}
