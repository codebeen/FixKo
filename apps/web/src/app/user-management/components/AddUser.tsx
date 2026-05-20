"use client";

import { Box, Button, Flex, Select, TextInput, rem } from "@mantine/core";
import { IconCheck, IconArrowLeft } from "@tabler/icons-react";
import { useForm, isNotEmpty, isEmail } from "@mantine/form";
import PageHeader from "@/app/components/page-header/PageHeader";
import "../../styles/Index.css";

import BaseModal from "@/app/components/modal/BaseModal";

interface AddUserProps {
    opened: boolean;
    onClose: () => void;
    onSave?: (user: any) => void;
}

export default function AddUser({ opened, onClose, onSave }: AddUserProps) {
    const form = useForm({
        initialValues: {
            firstName: "",
            lastName: "",
            middleName: "",
            email: "",
            role: "Applicant",
            programId: null,
        },

        validate: {
            firstName: isNotEmpty("First name is required"),
            lastName: isNotEmpty("Last name is required"),
            email: isEmail("Invalid email address"),
            role: isNotEmpty("Role is required"),
            programId: (value, values) => {
                // Program is required only for applicants
                if (values.role === "Applicant" && value === null) {
                    return "Program is required for applicants";
                }
                return null;
            },
        },
    });
    
    // Frontend‑only placeholder data and handlers
    const isApplicant = form.values.role === "Applicant";
    const programOptions = [
        { value: "1", label: "Program A" },
        { value: "2", label: "Program B" },
    ];
    
    const handleSave = (values: any) => {
        console.log("Save user:", values);
        if (onSave) onSave(values);
    };

    return (
        <BaseModal 
            opened={opened} 
            onClose={onClose} 
            title="Add User" 
            width="lg"
            footer={
                <>
                    <Button
                        type="submit"
                        form="add-user-form"
                        size="sm"
                        radius="md"
                        className="pup-save-button"
                        leftSection={<IconCheck size={16} />}
                    >
                        Save User
                    </Button>
                </>
            }
        >
            <Box mt={8}>
                <form id="add-user-form" onSubmit={form.onSubmit(handleSave)}>
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
          </Flex>
                </form>
            </Box>
        </BaseModal>
    );
}
