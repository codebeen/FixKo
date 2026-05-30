"use client";

import BaseLayout from "../components/layout/BaseLayout";
import PageHeader from "../components/page-header/PageHeader";
import ViewDetailes from "./components/ViewDetailes";

import { Box, Flex, TextInput, Text, rem, Badge, ActionIcon, Tooltip, Pagination, NativeSelect, Paper } from "@mantine/core";
import { useState, useEffect } from "react";
import { IconSearch, IconEye } from "@tabler/icons-react";

import applicantsData from "../data/applicants.json";
import workersData from "../data/worker.json";

import "../styles/Table.css";

export default function Applicant() {
    const [activeTab, setActiveTab] = useState<
        "pending" | "approved" | "rejected"
    >("pending");
    const [globalFilter, setGlobalFilter] = useState("");
    const [selectedRecord, setSelectedRecord] = useState<any | null>(null);

    // Simulation states
    const [applicants, setApplicants] = useState<any[]>([]);
    const [workers, setWorkers] = useState<any[]>([]);
    const [initialized, setInitialized] = useState(false);

    // Pagination states
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    // Load initial data from localStorage
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedApplicants = localStorage.getItem("fixko_applicants");
            const storedWorkers = localStorage.getItem("fixko_workers");

            if (storedApplicants) {
                setApplicants(JSON.parse(storedApplicants));
            } else {
                localStorage.setItem("fixko_applicants", JSON.stringify(applicantsData));
                setApplicants(applicantsData);
            }

            if (storedWorkers) {
                setWorkers(JSON.parse(storedWorkers));
            } else {
                localStorage.setItem("fixko_workers", JSON.stringify(workersData));
                setWorkers(workersData);
            }
            setInitialized(true);
        }
    }, []);

    // Approve handler
    const handleApprove = (id: string) => {
        const applicantIndex = applicants.findIndex((a) => a.id === id);
        if (applicantIndex === -1) return;

        const applicant = applicants[applicantIndex];
        const newWorkerId = `WRK-${String(workers.length + 1).padStart(3, "0")}`;
        const newWorker = {
            id: newWorkerId,
            first_name: applicant.first_name,
            middle_name: applicant.middle_name,
            last_name: applicant.last_name,
            email: applicant.email,
            phone: applicant.phone,
            birthdate: applicant.birthdate,
            gender: applicant.gender,
            address: applicant.address,
            job_type: applicant.job_type,
            employment_status: "Active",
            date_hired: new Date().toISOString().split("T")[0],
            daily_rate: 750,
            rating: 5.0,
            total_jobs: 0,
            supervisor: "Maria Santos",
        };

        const updatedApplicants = [...applicants];
        updatedApplicants[applicantIndex] = {
            ...applicant,
            status: "Approved",
        };

        const updatedWorkers = [...workers, newWorker];

        setApplicants(updatedApplicants);
        setWorkers(updatedWorkers);
        localStorage.setItem("fixko_applicants", JSON.stringify(updatedApplicants));
        localStorage.setItem("fixko_workers", JSON.stringify(updatedWorkers));

        const fullName = [applicant.first_name, applicant.middle_name, applicant.last_name]
            .filter(Boolean)
            .join(" ");
        
        import("react-hot-toast").then(({ default: toast }) => {
            toast.success(`${fullName} has been successfully approved.`, { id: "status-toast" });
        });
    };

    // Reject handler
    const handleReject = (id: string, remarks: string) => {
        const applicantIndex = applicants.findIndex((a) => a.id === id);
        if (applicantIndex === -1) return;

        const applicant = applicants[applicantIndex];

        const updatedApplicants = [...applicants];
        updatedApplicants[applicantIndex] = {
            ...applicant,
            status: "Rejected",
            notes: remarks || applicant.notes,
        };

        setApplicants(updatedApplicants);
        localStorage.setItem("fixko_applicants", JSON.stringify(updatedApplicants));

        const fullName = [applicant.first_name, applicant.middle_name, applicant.last_name]
            .filter(Boolean)
            .join(" ");

        import("react-hot-toast").then(({ default: toast }) => {
            toast.error(`${fullName} has been rejected.`, { id: "status-toast" });
        });
    };

    const currentApplicants = initialized ? applicants : applicantsData;
    const currentWorkers = initialized ? workers : workersData;

    const tableData =
        activeTab === "pending"
            ? currentApplicants.filter((a) => a.status !== "Approved" && a.status !== "Rejected")
            : activeTab === "approved"
              ? currentWorkers
              : currentApplicants.filter((a) => a.status === "Rejected");

    const applicantColumns = [
        {
            header: "Full Name",
            render: (row: any) => {
                const first = row.first_name ?? "";
                const middle = row.middle_name ? ` ${row.middle_name}` : "";
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
            header: "Job Type",
            render: (row: any) => <Text>{row.job_type ?? "—"}</Text>,
        },
        {
            header: "Date Applied",
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
        {
            header: "Status",
            render: (row: any) => {
                const val = row.status;
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

    const workerColumns = [
        {
            header: "Full Name",
            render: (row: any) => {
                const first = row.first_name ?? "";
                const middle = row.middle_name ? ` ${row.middle_name}` : "";
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
            header: "Job Type",
            render: (row: any) => <Text>{row.job_type ?? "—"}</Text>,
        },
        {
            header: "Date Hired",
            render: (row: any) => {
                const val = row.date_hired;
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
            header: "Status",
            render: (row: any) => (
                <Badge color="green" variant="light">
                    Approved
                </Badge>
            ),
        },
    ];

    const columns = activeTab === "approved" ? workerColumns : applicantColumns;

    const filteredData = tableData.filter((row) => {
        if (!globalFilter) return true;
        const search = globalFilter.toLowerCase();
        const first = row.first_name ?? "";
        const middle = row.middle_name ?? "";
        const last = row.last_name ?? "";
        const fullName = `${first} ${middle} ${last}`.toLowerCase();
        const email = (row.email ?? "").toLowerCase();
        const jobType = (row.job_type ?? "").toLowerCase();
        const status = (row.status ?? row.employment_status ?? "").toLowerCase();
        return (
            fullName.includes(search) ||
            email.includes(search) ||
            jobType.includes(search) ||
            status.includes(search)
        );
    });

    const handleTabChange = (tab: "pending" | "approved" | "rejected") => {
        setActiveTab(tab);
        setPageIndex(0);
    };

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

    // If a record is selected, show ViewDetailes inline
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
                    onApprove={handleApprove}
                    onReject={handleReject}
                />
            </BaseLayout>
        );
    }

    return (
        <BaseLayout>
            <PageHeader
                title="Applicant Portal"
                description="Manage and review applicants and hired workers in the FixKo system."
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
                                    handleFilterChange(e.target.value)
                                }
                            />
                        </Flex>
                    </Flex>
                </Box>

                <Box className="pup-tabs-container">
                    <button
                        className={`pup-tab ${activeTab === "pending" ? "pup-tab-active" : "pup-tab-inactive"}`}
                        onClick={() => handleTabChange("pending")}
                    >
                        Pending
                    </button>
                    <button
                        className={`pup-tab ${activeTab === "approved" ? "pup-tab-active" : "pup-tab-inactive"}`}
                        onClick={() => handleTabChange("approved")}
                    >
                        Approved
                    </button>
                    <button
                        className={`pup-tab ${activeTab === "rejected" ? "pup-tab-active" : "pup-tab-inactive"}`}
                        onClick={() => handleTabChange("rejected")}
                    >
                        Rejected
                    </button>
                </Box>

                <Box className="pup-tab-active-bar" />

                <Box
                    style={{ display: "flex", flexDirection: "column" }}
                    mt={0}
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
                                                onClick={() => setSelectedRecord(row)}
                                                style={{ cursor: "pointer" }}
                                            >
                                                {columns.map((col, idx) => (
                                                    <td key={idx}>
                                                        {col.render(row)}
                                                    </td>
                                                ))}
                                                <td onClick={(e) => e.stopPropagation()}>
                                                    <Flex justify="center" align="center">
                                                        <Tooltip label="View Details">
                                                            <ActionIcon
                                                                variant="subtle"
                                                                color="blue"
                                                                onClick={() => setSelectedRecord(row)}
                                                            >
                                                                <IconEye style={{ width: rem(18), height: rem(18) }} />
                                                            </ActionIcon>
                                                        </Tooltip>
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
