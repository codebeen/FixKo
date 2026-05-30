"use client";

import BaseLayout from "../components/layout/BaseLayout";
import PageHeader from "../components/page-header/PageHeader";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import ViewUser from "./components/ViewUser";

import {
    Box,
    Button,
    Flex,
    Menu,
    TextInput,
    Badge,
    rem,
    Text,
    Paper,
    Pagination,
    NativeSelect,
    ActionIcon,
} from "@mantine/core";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import {
    IconSearch,
    IconFileExport,
    IconChevronDown,
    IconFileTypePdf,
    IconFileTypeCsv,
    IconTableExport,
    IconPlus,
    IconEye,
    IconPencil,
    IconUserOff,
    IconTrash,
    IconDotsVertical,
} from "@tabler/icons-react";

import usersJson from "../data/UserManagementData.json";
import "../styles/Table.css";

export default function UserManagement() {
    const [globalFilter, setGlobalFilter] = useState("");
    const [viewMode, setViewMode] = useState<"table" | "add" | "edit" | "view">(
        "table",
    );
    const [selectedUser, setSelectedUser] = useState<any>(null);

    // Simulation states
    const [users, setUsers] = useState<any[]>([]);
    const [initialized, setInitialized] = useState(false);

    // Pagination states
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    // Load initial data from localStorage
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedUsers = localStorage.getItem("fixko_users");
            if (storedUsers) {
                setUsers(JSON.parse(storedUsers));
            } else {
                localStorage.setItem("fixko_users", JSON.stringify(usersJson));
                setUsers(usersJson);
            }
            setInitialized(true);
        }
    }, []);

    const statusColorMap: Record<string, string> = {
        Active: "green",
        Inactive: "red",
        Pending: "orange",
    };

    const columns = [
        {
            header: "Full Name",
            render: (row: any) => {
                const first = row.first_name ?? "";
                const middle = row.middle_name
                    ? ` ${row.middle_name}`
                    : "";
                const last = row.last_name ?? "";
                return (
                    <Text fw={500}>
                        {`${first}${middle} ${last}`.trim() || "—"}
                    </Text>
                );
            },
        },
        {
            header: "Email",
            render: (row: any) => (
                <Text c="dimmed">{row.email ?? "—"}</Text>
            ),
        },
        {
            header: "Status",
            render: (row: any) => {
                const status = row.status ?? "Pending";
                const color = statusColorMap[status] ?? "gray";
                return (
                    <Badge color={color} variant="light">
                        {status}
                    </Badge>
                );
            },
        },
        {
            header: "Joined Date",
            render: (row: any) => {
                const val = row.created_at;
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
    ];

    // CRUD Handlers
    const handleAddUser = (values: any) => {
        const newUser = {
            id: `USR-${String(users.length + 1).padStart(3, "0")}`,
            first_name: values.firstName,
            middle_name: values.middleName,
            last_name: values.lastName,
            email: values.email,
            status: "Active",
            created_at: new Date().toISOString(),
        };

        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);
        localStorage.setItem("fixko_users", JSON.stringify(updatedUsers));
        setViewMode("table");

        import("react-hot-toast").then(({ default: toast }) => {
            toast.success(`User ${values.firstName} ${values.lastName} successfully created.`, { id: "user-toast" });
        });
    };

    const handleSaveEditUser = (values: any) => {
        if (!selectedUser) return;
        const userIndex = users.findIndex((u) => u.id === selectedUser.id);
        if (userIndex === -1) return;

        const updatedUsers = [...users];
        updatedUsers[userIndex] = {
            ...updatedUsers[userIndex],
            first_name: values.firstName,
            middle_name: values.middleName,
            last_name: values.lastName,
            email: values.email,
            status: values.status,
        };

        setUsers(updatedUsers);
        localStorage.setItem("fixko_users", JSON.stringify(updatedUsers));
        setViewMode("table");

        import("react-hot-toast").then(({ default: toast }) => {
            toast.success(`User updated successfully.`, { id: "user-toast" });
        });
    };

    const handleToggleStatus = (row: any) => {
        const newStatus = row.status === "Active" ? "Inactive" : "Active";
        const actionLabel = row.status === "Active" ? "deactivate" : "activate";

        Swal.fire({
            title: "Are you sure?",
            text: `This will ${actionLabel} the user.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: row.status === "Active" ? "#d33" : "#27AE60",
            cancelButtonColor: "#3085d6",
            confirmButtonText: `Yes, ${actionLabel}`,
        }).then((result) => {
            if (result.isConfirmed) {
                const userIndex = users.findIndex((u) => u.id === row.id);
                if (userIndex === -1) return;

                const updatedUsers = [...users];
                updatedUsers[userIndex] = {
                    ...updatedUsers[userIndex],
                    status: newStatus,
                };

                setUsers(updatedUsers);
                localStorage.setItem("fixko_users", JSON.stringify(updatedUsers));

                import("react-hot-toast").then(({ default: toast }) => {
                    toast.success(`User status changed to ${newStatus}.`, { id: "user-toast" });
                });
            }
        });
    };

    const handleDeleteUser = (row: any) => {
        Swal.fire({
            title: "Delete User?",
            text: `Are you sure you want to permanently delete user ${row.first_name} ${row.last_name}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete",
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedUsers = users.filter((u) => u.id !== row.id);
                setUsers(updatedUsers);
                localStorage.setItem("fixko_users", JSON.stringify(updatedUsers));

                import("react-hot-toast").then(({ default: toast }) => {
                    toast.success(`User deleted successfully.`, { id: "user-toast" });
                });
            }
        });
    };

    const canAdd = true;

    const handleExportPDF = () => {
        import("react-hot-toast").then(({ default: toast }) => {
            toast.success("PDF Export started...", { id: "export-toast" });
        });
    };
    const handleExportCSV = () => {
        import("react-hot-toast").then(({ default: toast }) => {
            toast.success("CSV Export started...", { id: "export-toast" });
        });
    };
    const handleExportExcel = () => {
        import("react-hot-toast").then(({ default: toast }) => {
            toast.success("Excel Export started...", { id: "export-toast" });
        });
    };

    const currentUsers = initialized ? users : usersJson;

    const filteredData = currentUsers.filter((row) => {
        if (!globalFilter) return true;
        const search = globalFilter.toLowerCase();
        const first = row.first_name ?? "";
        const middle = row.middle_name ?? "";
        const last = row.last_name ?? "";
        const fullName = `${first} ${middle} ${last}`.toLowerCase();
        const email = (row.email ?? "").toLowerCase();
        const status = (row.status ?? "").toLowerCase();
        return (
            fullName.includes(search) ||
            email.includes(search) ||
            status.includes(search)
        );
    });

    const handleFilterChange = (val: string) => {
        setGlobalFilter(val);
        setPageIndex(0);
    };

    const totalRows = filteredData.length;
    const totalPages = Math.ceil(totalRows / pageSize);
    const adjustedPageIndex = Math.min(pageIndex, Math.max(0, totalPages - 1));
    const pageStart = adjustedPageIndex * pageSize;
    const pageEnd = pageStart + pageSize;
    const paginatedData = filteredData.slice(pageStart, pageEnd);

    return (
        <BaseLayout>
            <AddUser
                opened={viewMode === "add"}
                onClose={() => setViewMode("table")}
                onSave={handleAddUser}
            />
            <EditUser
                key={selectedUser?.id}
                opened={viewMode === "edit"}
                user={selectedUser}
                onClose={() => setViewMode("table")}
                onSave={handleSaveEditUser}
            />
            <ViewUser
                key={selectedUser?.id}
                opened={viewMode === "view"}
                user={selectedUser}
                onClose={() => setViewMode("table")}
            />
            <PageHeader
                title="User Management"
                description="Manage user roles, monitor account statuses, and oversee platform access."
                area="FixKo PH"
                showArea={true}
            />

            <Paper
                mt="xl"
                bg="white"
                p="xl"
                shadow="sm"
                radius={12}
            >
                <Flex
                    justify="space-between"
                    align="center"
                    wrap="wrap"
                    gap="md"
                >
                    <Flex gap="sm" wrap="wrap" align="center">
                        <TextInput
                            placeholder="Search users..."
                            className="pup-table-search"
                            size="sm"
                            leftSection={
                                <IconSearch className="pup-search-icon" />
                            }
                            value={globalFilter ?? ""}
                            onChange={(e) => handleFilterChange(e.target.value)}
                        />
                    </Flex>

                    <Flex gap="sm" align="center">
                        <Menu
                            shadow="md"
                            width={180}
                            radius="md"
                            transitionProps={{
                                transition: "pop",
                                duration: 150,
                            }}
                        >
                            <Menu.Target>
                                <Button
                                    className="pup-table-btn-export"
                                    size="sm"
                                    leftSection={
                                        <IconFileExport
                                            style={{
                                                width: rem(18),
                                                height: rem(18),
                                            }}
                                        />
                                    }
                                    rightSection={
                                        <IconChevronDown
                                            style={{
                                                width: rem(14),
                                                height: rem(14),
                                            }}
                                        />
                                    }
                                >
                                    Export
                                </Button>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Label>Format</Menu.Label>
                                <Menu.Item
                                    className="pup-table-action-item"
                                    leftSection={
                                        <IconFileTypePdf
                                            style={{
                                                width: rem(16),
                                                height: rem(16),
                                            }}
                                        />
                                    }
                                    onClick={handleExportPDF}
                                >
                                    PDF
                                </Menu.Item>
                                <Menu.Item
                                    className="pup-table-action-item"
                                    leftSection={
                                        <IconFileTypeCsv
                                            style={{
                                                width: rem(16),
                                                height: rem(16),
                                            }}
                                        />
                                    }
                                    onClick={handleExportCSV}
                                >
                                    CSV
                                </Menu.Item>
                                <Menu.Item
                                    className="pup-table-action-item"
                                    leftSection={
                                        <IconTableExport
                                            style={{
                                                width: rem(16),
                                                height: rem(16),
                                            }}
                                        />
                                    }
                                    onClick={handleExportExcel}
                                >
                                    Excel
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>

                        {canAdd && (
                            <Button
                                className="pup-table-btn-add"
                                radius="xl"
                                size="sm"
                                onClick={() => setViewMode("add")}
                                leftSection={
                                    <IconPlus
                                        style={{
                                            width: rem(18),
                                            height: rem(18),
                                        }}
                                    />
                                }
                            >
                                Add User
                            </Button>
                        )}
                    </Flex>
                </Flex>

                <Box
                    style={{ display: "flex", flexDirection: "column" }}
                    mt="xl"
                >
                    <div className="pup-table-wrapper" style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
                        <div className="pup-table-container" style={{ overflowX: "auto" }}>
                            <table className="pup-table" style={{ width: "100%", borderCollapse: "collapse" }}>
                                <thead>
                                    <tr>
                                        {columns.map((col, idx) => (
                                            <th key={idx}>
                                                <div>
                                                    <span className="mrt-table-head-cell-labels">
                                                        {col.header}
                                                    </span>
                                                </div>
                                            </th>
                                        ))}
                                        <th>
                                            <div>
                                                <span className="mrt-table-head-cell-labels">
                                                    Actions
                                                </span>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedData.length === 0 ? (
                                        <tr>
                                            <td colSpan={columns.length + 1} style={{ padding: "2rem" }}>
                                                <Text c="dimmed">No records found</Text>
                                            </td>
                                        </tr>
                                    ) : (
                                        paginatedData.map((row) => (
                                            <tr
                                                key={row.id}
                                                onClick={() => {
                                                    setSelectedUser(row);
                                                    setViewMode("view");
                                                }}
                                                style={{ cursor: "pointer" }}
                                            >
                                                {columns.map((col, idx) => (
                                                    <td key={idx}>
                                                        {col.render(row)}
                                                    </td>
                                                ))}
                                                <td onClick={(e) => e.stopPropagation()}>
                                                    <Flex justify="center" align="center">
                                                        <Menu shadow="md" width={180} radius="md" transitionProps={{ transition: "pop", duration: 150 }}>
                                                            <Menu.Target>
                                                                <ActionIcon variant="subtle" color="gray">
                                                                    <IconDotsVertical style={{ width: rem(18), height: rem(18) }} />
                                                                </ActionIcon>
                                                            </Menu.Target>
                                                            <Menu.Dropdown>
                                                                <Menu.Item
                                                                    className="pup-table-action-item"
                                                                    onClick={() => {
                                                                        setSelectedUser(row);
                                                                        setViewMode("view");
                                                                    }}
                                                                    leftSection={<IconEye style={{ width: rem(16), height: rem(16) }} />}
                                                                >
                                                                    View Details
                                                                </Menu.Item>
                                                                <Menu.Item
                                                                    className="pup-table-action-item"
                                                                    onClick={() => {
                                                                        setSelectedUser(row);
                                                                        setViewMode("edit");
                                                                    }}
                                                                    leftSection={<IconPencil style={{ width: rem(16), height: rem(16) }} />}
                                                                >
                                                                    Edit User
                                                                </Menu.Item>
                                                                <Menu.Item
                                                                    className="pup-table-action-item"
                                                                    onClick={() => handleToggleStatus(row)}
                                                                    leftSection={<IconUserOff style={{ width: rem(16), height: rem(16) }} />}
                                                                    color={row.status === "Active" ? "red" : "green"}
                                                                >
                                                                    {row.status === "Active" ? "Deactivate" : "Activate"}
                                                                </Menu.Item>
                                                                <Menu.Item
                                                                    className="pup-table-action-item"
                                                                    onClick={() => handleDeleteUser(row)}
                                                                    leftSection={<IconTrash style={{ width: rem(16), height: rem(16) }} />}
                                                                    color="red"
                                                                >
                                                                    Delete User
                                                                </Menu.Item>
                                                            </Menu.Dropdown>
                                                        </Menu>
                                                    </Flex>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="pup-table-bottom-toolbar">
                            <div>
                                <Flex align="center" gap="xs">
                                    <Text size="xs" c="dimmed">
                                        Rows per page:
                                    </Text>
                                    <NativeSelect
                                        value={pageSize.toString()}
                                        onChange={(e) => {
                                            setPageSize(Number(e.target.value));
                                            setPageIndex(0);
                                        }}
                                        data={["5", "10", "15", "20", "25"]}
                                        size="xs"
                                        style={{ width: rem(70) }}
                                        styles={{
                                            input: {
                                                height: rem(34),
                                                minHeight: rem(34),
                                            }
                                        }}
                                    />
                                </Flex>

                                <Text size="xs" c="dimmed">
                                    {totalRows === 0
                                        ? "0–0 of 0"
                                        : `${pageStart + 1}–${Math.min(pageEnd, totalRows)} of ${totalRows}`}
                                </Text>

                                <Pagination
                                    total={totalPages}
                                    value={adjustedPageIndex + 1}
                                    onChange={(page) => setPageIndex(page - 1)}
                                    size="sm"
                                    className="pup-table-pagination"
                                />
                            </div>
                        </div>
                    </div>
                </Box>
            </Paper>
        </BaseLayout>
    );
}
