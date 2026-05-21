"use client";

import { Box, Button, Flex, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCheck } from "@tabler/icons-react";
import PageHeader from "../../components/page-header/PageHeader";

import BaseModal from "@/app/components/modal/BaseModal";

interface EditUserProps {
  opened: boolean;
  user?: any;
  onClose: () => void;
  onSave?: (values: any) => void;
}

export default function EditUser({ opened, user, onClose, onSave }: EditUserProps) {
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
    <BaseModal 
        opened={opened} 
        onClose={onClose} 
        title="Edit User" 
        width="lg"
        footer={
            <>
              <Button
                type="submit"
                form="edit-user-form"
                radius="md"
                size="sm"
                leftSection={<IconCheck size={16} />}
                className="pup-save-button"
              >
                Save Changes
              </Button>
            </>
        }
    >
      <Box mt={8}>
        <form id="edit-user-form" onSubmit={form.onSubmit(handleSave)}>
          <Flex direction="column" gap="md" px="sm">
            <Flex gap="md" direction={{ base: 'column', sm: 'row' }}>
              <TextInput
                label="First Name"
                placeholder="Enter first name"
                radius="md"
                size="sm"
                withAsterisk
                style={{ flex: 1 }}
                {...form.getInputProps("firstName")}
              />
              <TextInput
                label="Last Name"
                placeholder="Enter last name"
                radius="md"
                size="sm"
                withAsterisk
                style={{ flex: 1 }}
                {...form.getInputProps("lastName")}
              />
            </Flex>
            
            <Flex gap="md" direction={{ base: 'column', sm: 'row' }}>
              <TextInput
                label="Middle Name"
                placeholder="Enter middle name (optional)"
                radius="md"
                size="sm"
                style={{ flex: 1 }}
                {...form.getInputProps("middleName")}
              />
              <TextInput
                label="Email"
                placeholder="name@pup.edu.ph"
                type="email"
                radius="md"
                size="sm"
                withAsterisk
                style={{ flex: 1 }}
                {...form.getInputProps("email")}
              />
            </Flex>

            <Flex gap="md" direction={{ base: 'column', sm: 'row' }}>
              <Select
                label="Status"
                placeholder="Select status"
                data={["Active", "Inactive", "Pending"]}
                radius="md"
                size="sm"
                withAsterisk
                style={{ flex: 1 }}
                {...form.getInputProps("status")}
              />
              <Box style={{ flex: 1 }} /> 
            </Flex>
          </Flex>
        </form>
      </Box>
    </BaseModal>
  );
}
