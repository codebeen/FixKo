"use client";

import BaseLayout from "../components/layout/BaseLayout";
import PageHeader from "../components/page-header/PageHeader";
import ViewDetailes from "./components/ViewDetailes";

import { Box, Flex, Menu, TextInput, Text, rem, Badge, ActionIcon, Tooltip } from "@mantine/core";
import { useState } from "react";
import {
    useMantineReactTable,
    MantineReactTable,
    type MRT_ColumnDef,
} from "mantine-react-table";
import { IconSearch, IconEye } from "@tabler/icons-react";

import applicantsData from "../data/applicants.json";
import workersData from "../data/worker.json";

import "../styles/Table.css";

export default function Applicant() {
    const [activeTab, setActiveTab] = useState<
        "pending" | "approved" | "rejected"
    >("pending");
    const [globalFilter, setGlobalFilter] = useState("");
    const [columnFilters, setColumnFilters] = useState<any[]>([]);
    const [selectedRecord, setSelectedRecord] = useState<any | null>(null);

    const tableData =
        activeTab === "pending"
            ? applicantsData
            : activeTab === "approved"
              ? workersData
              : applicantsData.filter((a) => a.status === "Rejected");

    const applicantColumns: MRT_ColumnDef<any>[] = [
        {
            accessorKey: "full_name",
            header: "Full Name",
            mantineTableHeadCellProps: { align: "center" },
            Cell: ({ row }) => {
                const first = row.original.first_name ?? "";
                const middle = row.original.middle_name
                    ? ` ${row.original.middle_name}`
                    : "";
                const last = row.original.last_name ?? "";
                return (
                    <Text fw={500}>
                        {`${first}${middle} ${last}`.trim() || "—"}
                    </Text>
                );
            },
        },
        {
            accessorKey: "email",
            header: "Email",
            mantineTableHeadCellProps: { align: "center" },
            Cell: ({ cell }) => (
                <Text c="dimmed">{cell.getValue<string>() ?? "—"}</Text>
            ),
        },
        {
            accessorKey: "job_type",
            header: "Job Type",
            mantineTableHeadCellProps: { align: "center" },
            Cell: ({ cell }) => <Text>{cell.getValue<string>() ?? "—"}</Text>,
        },
        {
            accessorKey: "created_at",
            header: "Date Applied",
            mantineTableHeadCellProps: { align: "center" },
            Cell: ({ cell }) => {
                const val = cell.getValue<string>();
                if (!val) return <Text c="dimmed">—</Text>;
                return (
                    <Text>
                        {new Date(val).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                        })}
                    </Text>
                );
            },
        },
        {
            accessorKey: "status",
            header: "Status",
            mantineTableHeadCellProps: { align: "center" },
            Cell: ({ cell }) => {
                const val = cell.getValue<string>();
                let color = "gray";
                if (val === "Pending" || val === "For Review") color = "orange";
                if (val === "Rejected") color = "red";
                return (
                    <Badge color={color} variant="light">
                        {val ?? "Pending"}
                    </Badge>
                );
            },
        },
    ];

    const workerColumns: MRT_ColumnDef<any>[] = [
        {
            accessorKey: "full_name",
            header: "Full Name",
            mantineTableHeadCellProps: { align: "center" },
            Cell: ({ row }) => {
                const first = row.original.first_name ?? "";
                const middle = row.original.middle_name
                    ? ` ${row.original.middle_name}`
                    : "";
                const last = row.original.last_name ?? "";
                return (
                    <Text fw={500}>
                        {`${first}${middle} ${last}`.trim() || "—"}
                    </Text>
                );
            },
        },
        {
            accessorKey: "email",
            header: "Email",
            mantineTableHeadCellProps: { align: "center" },
            Cell: ({ cell }) => (
                <Text c="dimmed">{cell.getValue<string>() ?? "—"}</Text>
            ),
        },
        {
            accessorKey: "job_type",
            header: "Job Type",
            mantineTableHeadCellProps: { align: "center" },
            Cell: ({ cell }) => <Text>{cell.getValue<string>() ?? "—"}</Text>,
        },
        {
            accessorKey: "date_hired",
            header: "Date Hired",
            mantineTableHeadCellProps: { align: "center" },
            Cell: ({ cell }) => {
                const val = cell.getValue<string>();
                if (!val) return <Text c="dimmed">—</Text>;
                return (
                    <Text>
                        {new Date(val).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                        })}
                    </Text>
                );
            },
        },
        {
            accessorKey: "status",
            header: "Status",
            mantineTableHeadCellProps: { align: "center" },
            Cell: () => (
                <Badge color="green" variant="light">
                    Approved
                </Badge>
            ),
        },
    ];

    const columns = activeTab === "approved" ? workerColumns : applicantColumns;

    const table = useMantineReactTable({
        columns,
        data: tableData,
        enablePagination: true,
        state: {
            globalFilter,
            columnFilters,
            columnOrder: [
                ...(columns
                    .map((col) => col.accessorKey)
                    .filter(Boolean) as string[]),
                "mrt-row-actions",
            ],
        },
        enableRowActions: true,
        positionActionsColumn: "last",
        displayColumnDefOptions: {
            "mrt-row-actions": { header: "Actions", size: 100 },
        },
        enableStickyHeader: true,
        onGlobalFilterChange: setGlobalFilter,
        onColumnFiltersChange: setColumnFilters,
        mantineTableContainerProps: { className: "pup-table-container" },
        mantineBottomToolbarProps: { className: "pup-table-bottom-toolbar" },
        mantinePaperProps: {
            className: "pup-table-wrapper",
            radius: 0,
            style: { border: "none", boxShadow: "none" },
        },
        mantineTableHeadCellProps: { align: "center" },
        mantineFilterTextInputProps: {
            styles: { input: { color: "#FFFFFF", padding: rem(8) } },
        },
        mantineTableProps: {
            className: "pup-table",
            id: "no-curve",
            striped: "odd",
            highlightOnHover: true,
            highlightOnHoverColor: "#fff5f5",
            style: { tableLayout: "auto" },
        },
        mantineTableBodyRowProps: ({ row }) => ({
            onClick: () => setSelectedRecord(row.original),
            style: { cursor: "pointer", height: rem(65) },
        }),
        mantineTableBodyCellProps: {
            align: "center",
            style: { verticalAlign: "middle" },
        },
        renderRowActions: ({ row }) => (
            <Flex justify="center" align="center">
                <Tooltip label="View Details">
                    <ActionIcon
                        variant="subtle"
                        color="blue"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedRecord(row.original);
                        }}
                    >
                        <IconEye style={{ width: rem(18), height: rem(18) }} />
                    </ActionIcon>
                </Tooltip>
            </Flex>
        ),
        enableTopToolbar: false,
    });

    // ── If a record is selected, show ViewDetailes inline ─────────────────
    if (selectedRecord) {
        return (
            <BaseLayout>
                <ViewDetailes
                    record={selectedRecord}
                    mode={
                        activeTab === "pending" || activeTab === "rejected"
                            ? "applicant"
                            : "worker"
                    }
                    onBack={() => setSelectedRecord(null)}
                />
            </BaseLayout>
        );
    }

    // ── Default: show the table ────────────────────────────────────────────
    return (
        <BaseLayout>
            <PageHeader
                title="Applicant Portal"
                description="Manage and review applicants and hired workers in the FixKo system."
                area="FixKo PH"
                showArea={true}
            />

            <Box
                mt="xl"
                bg="white"
                p="xl"
                shadow="sm"
                style={{ borderRadius: 12 }}
            >
                <Box mb="md">
                    <Flex
                        justify="space-between"
                        align="center"
                        wrap="wrap"
                        gap="md"
                    >
                        <Flex gap="sm" wrap="wrap" align="center">
                            <TextInput
                                placeholder="Search..."
                                className="pup-table-search"
                                size="sm"
                                leftSection={
                                    <IconSearch className="pup-search-icon" />
                                }
                                value={globalFilter ?? ""}
                                onChange={(e) =>
                                    setGlobalFilter(e.target.value)
                                }
                            />
                        </Flex>
                    </Flex>
                </Box>

                <Box className="pup-tabs-container">
                    <button
                        className={`pup-tab ${activeTab === "pending" ? "pup-tab-active" : "pup-tab-inactive"}`}
                        onClick={() => setActiveTab("pending")}
                    >
                        Pending
                    </button>
                    <button
                        className={`pup-tab ${activeTab === "approved" ? "pup-tab-active" : "pup-tab-inactive"}`}
                        onClick={() => setActiveTab("approved")}
                    >
                        Approved
                    </button>
                    <button
                        className={`pup-tab ${activeTab === "rejected" ? "pup-tab-active" : "pup-tab-inactive"}`}
                        onClick={() => setActiveTab("rejected")}
                    >
                        Rejected
                    </button>
                </Box>

                <Box className="pup-tab-active-bar" />

                <Box
                    style={{ display: "flex", flexDirection: "column" }}
                    mt={0}
                >
                    <MantineReactTable key={activeTab} table={table} />
                </Box>
            </Box>
        </BaseLayout>
    );
}
