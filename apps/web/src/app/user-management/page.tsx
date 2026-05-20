"use client";

import BaseLayout from "../components/layout/BaseLayout";
import PageHeader from "../components/page-header/PageHeader";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import ViewUser from "./components/ViewUser";

import { Box, Button, Flex, Menu, TextInput, Badge, rem, Text } from '@mantine/core';
import { useState } from 'react';
import { useMantineReactTable, MantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';
import {
  IconSearch, IconFileExport, IconChevronDown, IconFileTypePdf,
  IconFileTypeCsv, IconTableExport, IconPlus,
  IconEye, IconPencil, IconUserOff
} from '@tabler/icons-react';

import usersJson from '../data/UserManagementData.json';
import '../styles/Table.css';

export default function UserManagement() {
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnFilters, setColumnFilters] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  // View mode: 'table' | 'add' | 'edit' | 'view'
  const [viewMode, setViewMode] = useState<'table' | 'add' | 'edit' | 'view'>('table');
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const loading = false;
  const filteredTableData: any[] = usersJson;
  const total = filteredTableData.length;

  const statusColorMap: Record<string, string> = {
    Active: '#27AE60',
    Inactive: '#E74C3C',
    Pending: '#F39C12',
  };

  const columns: MRT_ColumnDef<any>[] = [
    {
      accessorKey: 'full_name',
      header: 'Full Name',
      mantineTableHeadCellProps: { align: 'center' },
      Cell: ({ row }) => {
        const first = row.original.first_name ?? '';
        const middle = row.original.middle_name ? ` ${row.original.middle_name}` : '';
        const last = row.original.last_name ?? '';
        return <Text fw={500}>{`${first}${middle} ${last}`.trim() || '—'}</Text>;
      },
    },
    {
      accessorKey: 'email',
      header: 'Email',
      mantineTableHeadCellProps: { align: 'center' },
      Cell: ({ cell }) => <Text c="dimmed">{cell.getValue<string>() ?? '—'}</Text>,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      mantineTableHeadCellProps: { align: 'center' },
      Cell: ({ cell }) => {
        const status = cell.getValue<string>() ?? 'Pending';
        const color = statusColorMap[status] ?? '#888';
        return (
          <Badge
            variant="light"
            size="xs"
            style={{ backgroundColor: `${color}20`, color, border: `1px solid ${color}`, fontSize: '0.6rem' }}
          >
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'created_at',
      header: 'Joined Date',
      mantineTableHeadCellProps: { align: 'center' },
      Cell: ({ cell }) => {
        const val = cell.getValue<string>();
        if (!val) return <Text c="dimmed">—</Text>;
        return <Text>{new Date(val).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</Text>;
      },
    },
  ];

  const canAdd = true;

  const handleExportPDF = () => { };
  const handleExportCSV = () => { };
  const handleExportExcel = () => { };
  // -----------------------------------------

  const table = useMantineReactTable({
    columns,
    data: filteredTableData,
    manualPagination: false,
    rowCount: total,

    state: {
      globalFilter,
      columnFilters,
      isLoading: loading,
      pagination: {
        pageIndex: page - 1,
        pageSize: 10,
      },
      columnOrder: [
        ...(columns.map((col) => col.accessorKey).filter(Boolean) as string[]),
        'mrt-row-actions',
      ],
    },

    enableRowActions: true,
    positionActionsColumn: 'last',

    displayColumnDefOptions: {
      'mrt-row-actions': {
        header: 'Actions',
        size: 120,
      },
    },

    onPaginationChange: (updater) => {
      const newState =
        typeof updater === "function"
          ? updater({ pageIndex: page - 1, pageSize: 10 })
          : updater;

      setPage(newState.pageIndex + 1);
    },
    enableStickyHeader: true,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,

    mantineTableContainerProps: {
      className: "pup-table-container"
    },

    mantineBottomToolbarProps: {
      className: "pup-table-bottom-toolbar"
    },

    mantinePaperProps: {
      className: "pup-table-wrapper",
    },

    mantineTableHeadCellProps: {
      align: 'center',
      style: {
        textAlign: 'center',
        justifyContent: 'center',
      },
    },

    mantineFilterTextInputProps: {
      styles: {
        input: {
          color: '#FFFFFF',
          padding: rem(8),
        },
      },
    },

    mantineTableProps: {
      className: "pup-table",
      id: "no-curve",
      striped: 'odd',
      highlightOnHover: true,
      highlightOnHoverColor: '#fff5f5',
      style: { tableLayout: 'auto' },
    },

    mantineTableBodyRowProps: {
      style: { height: rem(65) }
    },

    mantineTableBodyCellProps: {
      style: {
        textAlign: 'center',
        verticalAlign: 'middle',
      }
    },

    renderRowActionMenuItems: ({ row }) => {
      return [
        <Menu.Item
          key="view"
          className="pup-table-action-item"
          onClick={() => { setSelectedUser(row.original); setViewMode('view'); }}
          leftSection={<IconEye style={{ width: rem(16), height: rem(16) }} />}
        >
          View Details
        </Menu.Item>,
        <Menu.Item
          key="edit"
          className="pup-table-action-item"
          onClick={() => { setSelectedUser(row.original); setViewMode('edit'); }}
          leftSection={<IconPencil style={{ width: rem(16), height: rem(16) }} />}
        >
          Edit User
        </Menu.Item>,
        <Menu.Item
          key="deactivate"
          className="pup-table-action-item"
          onClick={() => console.log('Deactivate', row.original)}
          leftSection={<IconUserOff style={{ width: rem(16), height: rem(16) }} />}
          color="red"
        >
          Deactivate
        </Menu.Item>,
      ];
    },

    enableTopToolbar: false,
  });

  return (
    <BaseLayout>
      {viewMode === 'add' && (
        <AddUser onCancel={() => setViewMode('table')} onSave={() => setViewMode('table')} />
      )}
      {viewMode === 'edit' && (
        <EditUser user={selectedUser} onCancel={() => setViewMode('table')} onSave={() => setViewMode('table')} />
      )}
      {viewMode === 'view' && (
        <ViewUser user={selectedUser} onClose={() => setViewMode('table')} />
      )}
      {viewMode === 'table' && (
        <>
          <PageHeader
            title="User Management"
            description="Manage user roles, monitor account statuses, and oversee platform access."
            area="FixKo PH"
            showArea={true}
          />

          <Box mb="md">
            <Flex justify="space-between" align="center" wrap="wrap" gap="md">
              <Flex gap="sm" wrap="wrap" align="center">
                <TextInput
                  placeholder="Search users..."
                  className="pup-table-search"
                  size="sm"
                  leftSection={<IconSearch className="pup-search-icon" />}
                  value={globalFilter ?? ''}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                />
              </Flex>

              <Flex gap="sm" align="center">
                <Menu shadow="md" width={180} radius="md" transitionProps={{ transition: 'pop', duration: 150 }}>
                  <Menu.Target>
                    <Button
                      className="pup-table-btn-export"
                      size="sm"
                      leftSection={<IconFileExport style={{ width: rem(18), height: rem(18) }} />}
                      rightSection={<IconChevronDown style={{ width: rem(14), height: rem(14) }} />}
                    >
                      Export
                    </Button>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Label>Format</Menu.Label>
                    <Menu.Item className="pup-table-action-item" leftSection={<IconFileTypePdf style={{ width: rem(16), height: rem(16) }} />} onClick={handleExportPDF}>PDF</Menu.Item>
                    <Menu.Item className="pup-table-action-item" leftSection={<IconFileTypeCsv style={{ width: rem(16), height: rem(16) }} />} onClick={handleExportCSV}>CSV</Menu.Item>
                    <Menu.Item className="pup-table-action-item" leftSection={<IconTableExport style={{ width: rem(16), height: rem(16) }} />} onClick={handleExportExcel}>Excel</Menu.Item>
                  </Menu.Dropdown>
                </Menu>

                {canAdd && (
                  <Button
                    className="pup-table-btn-add"
                    radius="xl"
                    size="sm"
                    onClick={() => setViewMode('add')}
                    leftSection={<IconPlus style={{ width: rem(18), height: rem(18) }} />}
                  >
                    Add User
                  </Button>
                )}
              </Flex>
            </Flex>
          </Box>

          <Box style={{ display: 'flex', flexDirection: 'column' }} mt={0}>
            <MantineReactTable table={table} />
          </Box>
        </>
      )}
    </BaseLayout>
  );
}