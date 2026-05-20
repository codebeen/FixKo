"use client";

import { Box, Button, Flex, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCheck } from "@tabler/icons-react";
import PageHeader from "../../components/page-header/PageHeader";

interface EditUserProps {
  user?: any;
  onCancel?: () => void;
  onSave?: (values: any) => void;
}

export default function EditUser({ user, onCancel, onSave }: EditUserProps) {
  const form = useForm({
    initialValues: {
      firstName:  user?.first_name  ?? "",
      lastName:   user?.last_name   ?? "",
      middleName: user?.middle_name ?? "",
      email:      user?.email       ?? "",
      role:       user?.role        ?? "",
      status:     user?.status      ?? "Active",
    },
    validate: {
      firstName: (v) => (v.trim().length === 0 ? "First name is required" : null),
      lastName:  (v) => (v.trim().length === 0 ? "Last name is required" : null),
      email:     (v) => (/^\S+@\S+\.\S+$/.test(v) ? null : "Enter a valid email"),
      role:      (v) => (v.trim().length === 0 ? "Role is required" : null),
    },
  });

  const handleSave = (values: typeof form.values) => {
    // TODO: connect to real API
    onSave?.(values);
  };

  return (
    <Box mx="auto" py="sm">
      <Box px="md">
        <PageHeader
          title="Edit User"
          description="Update the user's account information."
          area="User Management"
        />
      </Box>

      <Box px={{ base: "sm", lg: 80 }} mt={20}>
        <form onSubmit={form.onSubmit(handleSave)}>
          <Flex direction="column" gap={30}>
            {/* ROW 1: First Name & Last Name */}
            <Flex gap={30} direction={{ base: "column", md: "row" }}>
              <TextInput
                label="First Name"
                placeholder="Enter first name"
                radius="md"
                size="md"
                withAsterisk
                style={{ flex: 1 }}
                {...form.getInputProps("firstName")}
              />
              <TextInput
                label="Last Name"
                placeholder="Enter last name"
                radius="md"
                size="md"
                withAsterisk
                style={{ flex: 1 }}
                {...form.getInputProps("lastName")}
              />
            </Flex>

            {/* ROW 2: Middle Name & Email */}
            <Flex gap={30} direction={{ base: "column", md: "row" }}>
              <TextInput
                label="Middle Name"
                placeholder="Enter middle name (optional)"
                radius="md"
                size="md"
                style={{ flex: 1 }}
                {...form.getInputProps("middleName")}
              />
              <TextInput
                label="Email"
                placeholder="name@pup.edu.ph"
                type="email"
                radius="md"
                size="md"
                withAsterisk
                style={{ flex: 1 }}
                {...form.getInputProps("email")}
              />
            </Flex>

            {/* ROW 3: Role & Status */}
            <Flex gap={30} direction={{ base: "column", md: "row" }}>
              <Select
                label="Role"
                placeholder="Select role"
                data={["System Admin", "Faculty", "Applicant"]}
                radius="md"
                size="md"
                withAsterisk
                style={{ flex: 1 }}
                {...form.getInputProps("role")}
              />
              <Select
                label="Status"
                placeholder="Select status"
                data={["Active", "Inactive", "Pending"]}
                radius="md"
                size="md"
                withAsterisk
                style={{ flex: 1 }}
                {...form.getInputProps("status")}
              />
            </Flex>

            {/* ACTION BUTTONS */}
            <Flex justify="flex-end" gap="md" mt={20}>
              <Button variant="default" size="md" radius="md" onClick={onCancel}>
                Cancel
              </Button>
              <Button
                type="submit"
                radius="md"
                size="md"
                leftSection={<IconCheck size={16} />}
                style={{ backgroundColor: "var(--brand-primary)", color: "#fff" }}
              >
                Save Changes
              </Button>
            </Flex>
          </Flex>
        </form>
      </Box>
    </Box>
  );
}
