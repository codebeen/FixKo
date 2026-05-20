"use client";

import { Box, Button, Flex, Select, TextInput, rem } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { useForm, isNotEmpty, isEmail } from "@mantine/form";
import PageHeader from "@/app/components/page-header/PageHeader";

export default function AddUser() {
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
    };
    const handleCancel = () => {
        console.log("Cancel add user");
    };

    return (
        <Box mx="auto" py="sm">
            {/* Header with standard padding */}
            <Box px="md">
                <PageHeader
                    title="Add User"
                    description="Create a new user account."
                    area="User Management"
                />
            </Box>

            {/* Form with more horizontal padding (indented) */}
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

                        {/* ROW 3: Role & Program */}
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

                            {/* Program input only appears if Role is Applicant, otherwise acts as a blank spacer */}
                            {isApplicant ? (
                                <Select
                                    label="Program"
                                    placeholder="Select applicant program"
                                    data={programOptions}
                                    radius="md"
                                    size="md"
                                    withAsterisk
                                    searchable
                                    nothingFoundMessage="No programs found"
                                    style={{ flex: 1 }}
                                    {...form.getInputProps("programId")}
                                />
                            ) : (
                                <Box style={{ flex: 1, display: "block" }} />
                            )}
                        </Flex>

                        {/* ACTION BUTTONS */}
                        <Flex justify="flex-end" gap="md" mt={20}>
                            <Button variant="default" size="md" radius="md" onClick={handleCancel}>
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="pup-save-button"
                                leftSection={<IconCheck size={16} />}
                            >
                                Save User
                            </Button>
                        </Flex>

                    </Flex>
                </form>
            </Box>
        </Box>
    );
}
