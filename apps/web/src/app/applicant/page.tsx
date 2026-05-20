"use client";

import BaseLayout from "../components/layout/BaseLayout";
import PageHeader from "../components/page-header/PageHeader";

import { Box, Button, Flex, Menu, TextInput, Badge, rem, Text } from '@mantine/core';
import { useState } from 'react';
import { useMantineReactTable, MantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';
import {
  IconSearch, IconFileExport, IconChevronDown, IconFileTypePdf,
  IconFileTypeCsv, IconTableExport, IconFileImport, IconPlus,
  IconEye, IconTransfer, IconPencil
} from '@tabler/icons-react';

import '../styles/Table.css';

export default function Applicant() {
  // --- DUMMY STATE TO FIX COMPILE ERRORS ---
  // You will need to replace these with your actual state/data fetching logic
  const [activeTab, setActiveTab] = useState('for_transfer');
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnFilters, setColumnFilters] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  const loading = false;
  const total = 0;
  const filteredTableData: any[] = [];
  const columns: MRT_ColumnDef<any>[] = []; // Define your actual columns here!

  const canTransfer = true;
  const canEdit = true;
  const canImport = true;
  const canAdd = true;
  const canViewTransferredTab = true;

  const setImportModalOpened = (v: boolean) => { };

  // -----------------------------------------

  const table = useMantineReactTable({
    columns,
    data: filteredTableData,
    manualPagination: true,
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
      radius: 0
    },

    mantineTableHeadCellProps: {
      align: "center",
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
      align: "center",
      style: {
        verticalAlign: 'middle'
      }
    },
    mantinePaginationProps: {
      className: "pup-table-pagination",
      rowsPerPageOptions: ['10', '20', '50'],
    },

    renderRowActionMenuItems: ({ row }) => {
      const items = [
        <Menu.Item
          key="view"
          className="pup-table-action-item"
          onClick={() => setAssetToView(row.original)}
          leftSection={<IconEye style={{ width: rem(16), height: rem(16) }} />}
        >
          View Details
        </Menu.Item>,
      ];

      return items;
    },

    enableTopToolbar: false,
  });

  return (
    <BaseLayout>
      <PageHeader
        title="User Management"
        description="Welcome to the User Management portal. This section is currently under development."
        area="FixKo PH"
        showArea={true}
      />

      <Box mb="md">
        <Flex justify="space-between" align="center" wrap="wrap" gap="md">
          {/* Search bar */}
          <Flex gap="sm" wrap="wrap" align="center">
            <TextInput
              placeholder="Search assets..."
              className="pup-table-search"
              size="sm"
              leftSection={<IconSearch className="pup-search-icon" />}
              value={globalFilter ?? ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
          </Flex>
        </Flex>
      </Box>

      <Box className="pup-tabs-container">
        <button
          className={`pup-tab ${activeTab === 'for_transfer' ? 'pup-tab-active' : 'pup-tab-inactive'}`}
          onClick={() => {
            setActiveTab('for_transfer');
            setPage(1);
          }}
        >
          Workers
        </button>
        {canViewTransferredTab && (
          <button
            className={`pup-tab ${activeTab === 'transferred' ? 'pup-tab-active' : 'pup-tab-inactive'}`}
            onClick={() => { setActiveTab('transferred'); table.setPageIndex(0); }}
          >
            For Approval
          </button>
        )}
      </Box>

      <Box className="pup-tab-active-bar" />

      <Box style={{ display: 'flex', flexDirection: 'column' }} mt={0}>
        <MantineReactTable key={activeTab} table={table} />
      </Box>

    </BaseLayout>
  );
}
