"use client";

import { useState } from 'react';
import { Box, Divider, Grid, Group, Stack, Text, Badge, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconArrowLeft, IconUser, IconMail, IconPhone, IconMapPin,
  IconCalendar, IconBriefcase, IconStar, IconTool, IconCheck, IconX
} from '@tabler/icons-react';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import Remarks from './Remarks';

import '../../styles/Index.css';

// ── Types ──────────────────────────────────────────────────────────────
export interface Applicant {
  id: string;
  first_name: string;
  middle_name?: string | null;
  last_name: string;
  email: string;
  phone: string;
  birthdate: string;
  gender: string;
  address: string;
  job_type: string;
  experience_years: number;
  availability: string;
  status: string;
  created_at: string;
  notes?: string;
}

export interface Worker {
  id: string;
  first_name: string;
  middle_name?: string | null;
  last_name: string;
  email: string;
  phone: string;
  birthdate: string;
  gender: string;
  address: string;
  job_type: string;
  employment_status: string;
  date_hired: string;
  daily_rate: number;
  rating: number;
  total_jobs: number;
  supervisor: string;
}

export interface ViewDetailesProps {
  record: Applicant | Worker;
  mode: 'applicant' | 'worker';
  onBack: () => void;
}

// ── Badge colors ───────────────────────────────────────────────────────
const applicantStatusColor: Record<string, string> = {
  Pending: 'yellow',
  'For Review': 'blue',
  Approved: 'green',
  Rejected: 'red',
};

const workerStatusColor: Record<string, string> = {
  Active: 'green',
  'On Leave': 'orange',
  Inactive: 'gray',
};

// ── Detail row ─────────────────────────────────────────────────────────
function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string | number | null;
}) {
  return (
    <Group gap="sm" align="flex-start" wrap="nowrap">
      <div style={{ color: '#94a3b8', marginTop: 2 }}>{icon}</div>
      <Stack gap={2}>
        <Text size="xs" c="dimmed" tt="uppercase" fw={600} style={{ letterSpacing: '0.05em' }}>
          {label}
        </Text>
        <Text size="sm" fw={500}>
          {value !== undefined && value !== null && value !== '' ? String(value) : '—'}
        </Text>
      </Stack>
    </Group>
  );
}

// ── Main Component ─────────────────────────────────────────────────────
export default function ViewDetailes({ record, mode, onBack }: ViewDetailesProps) {
  const isApplicant = mode === 'applicant';
  const app = record as Applicant;
  const wrk = record as Worker;

  const [remarksOpened, { open: openRemarks, close: closeRemarks }] = useDisclosure(false);

  const fullName = [record.first_name, record.middle_name, record.last_name]
    .filter(Boolean)
    .join(' ');

  const formattedBirthdate = record.birthdate
    ? new Date(record.birthdate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : '—';

  const statusLabel = isApplicant ? app.status : wrk.employment_status;
  const statusColor = isApplicant
    ? (applicantStatusColor[app.status] ?? 'gray')
    : (workerStatusColor[wrk.employment_status] ?? 'gray');

  const handleApprove = () => {
    Swal.fire({
      title: 'Approve Applicant?',
      text: `Are you sure you want to approve ${fullName}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0f2044',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, approve'
    }).then((result) => {
      if (result.isConfirmed) {
        toast.success(`${fullName} has been successfully approved.`, { id: 'status-toast' });
        onBack();
      }
    });
  };

  const handleRejectConfirm = (remarks: string) => {
    toast.error(`${fullName} has been rejected.`, { id: 'status-toast' });
    onBack();
  };

  return (
    <>
      {/* ── Back Button ── */}
      <Button
        variant="subtle"
        leftSection={<IconArrowLeft size={16} />}
        onClick={onBack}
        className="pup-back-button"
        classNames={{
          inner: 'pup-back-button-inner',
          label: 'pup-back-button-label',
        }}
      >
        Back
      </Button>

      {/* ── Page Header ── */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0f2044 0%, #1a3a6b 100%)',
          borderRadius: 12,
          padding: '28px 32px',
          marginBottom: 24,
        }}
      >
        <Text size="xl" fw={700} c="white">{fullName}</Text>
        <Group gap="xs" mt={6}>
          <Text size="sm" c="blue.3">{record.id}</Text>
          <Text c="gray.6">•</Text>
          <Badge size="sm" color={statusColor} variant="light">{statusLabel}</Badge>
          <Text c="gray.6">•</Text>
          <Badge size="sm" color="teal" variant="light">{record.job_type}</Badge>
        </Group>
      </div>

      {/* ── Body Card ── */}
      <Box
        style={{
          background: '#fff',
          borderRadius: 12,
          border: '1px solid #e2e8f0',
          overflow: 'hidden',
        }}
      >
        {/* Personal Information */}
        <Box p="xl">
          <Text size="xs" tt="uppercase" fw={700} c="dimmed" mb="lg" style={{ letterSpacing: '0.08em' }}>
            Personal Information
          </Text>
          <Grid gap="xl">
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Stack gap="xl">
                <DetailRow icon={<IconUser size={16} />} label="Full Name" value={fullName} />
                <DetailRow icon={<IconCalendar size={16} />} label="Date of Birth" value={formattedBirthdate} />
                <DetailRow icon={<IconUser size={16} />} label="Gender" value={record.gender} />
              </Stack>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Stack gap="xl">
                <DetailRow icon={<IconMail size={16} />} label="Email" value={record.email} />
                <DetailRow icon={<IconPhone size={16} />} label="Phone" value={record.phone} />
                <DetailRow icon={<IconMapPin size={16} />} label="Address" value={record.address} />
              </Stack>
            </Grid.Col>
          </Grid>
        </Box>

        <Divider />

        {/* Job / Employment Details */}
        <Box p="xl">
          <Text size="xs" tt="uppercase" fw={700} c="dimmed" mb="lg" style={{ letterSpacing: '0.08em' }}>
            {isApplicant ? 'Application Details' : 'Employment Details'}
          </Text>

          {isApplicant ? (
            <Grid gap="xl">
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Stack gap="xl">
                  <DetailRow icon={<IconTool size={16} />} label="Job Type" value={app.job_type} />
                  <DetailRow
                    icon={<IconBriefcase size={16} />}
                    label="Experience"
                    value={`${app.experience_years} year${app.experience_years !== 1 ? 's' : ''}`}
                  />
                  <DetailRow icon={<IconCalendar size={16} />} label="Availability" value={app.availability} />
                </Stack>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Stack gap="xl">
                  <DetailRow
                    icon={<IconCalendar size={16} />}
                    label="Date Applied"
                    value={new Date(app.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  />
                  {app.notes && (
                    <DetailRow icon={<IconBriefcase size={16} />} label="Notes" value={app.notes} />
                  )}
                </Stack>
              </Grid.Col>
            </Grid>
          ) : (
            <Grid gap="xl">
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Stack gap="xl">
                  <DetailRow icon={<IconTool size={16} />} label="Job Type" value={wrk.job_type} />
                  <DetailRow
                    icon={<IconCalendar size={16} />}
                    label="Date Hired"
                    value={new Date(wrk.date_hired).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  />
                  <DetailRow icon={<IconBriefcase size={16} />} label="Daily Rate" value={`₱${wrk.daily_rate.toLocaleString()}`} />
                </Stack>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Stack gap="xl">
                  <DetailRow icon={<IconStar size={16} />} label="Rating" value={`${wrk.rating} / 5.0`} />
                  <DetailRow icon={<IconBriefcase size={16} />} label="Total Jobs Done" value={wrk.total_jobs} />
                  <DetailRow icon={<IconUser size={16} />} label="Supervisor" value={wrk.supervisor} />
                </Stack>
              </Grid.Col>
            </Grid>
          )}
        </Box>

        {/* ── Action Bar (Applicants only) ── */}
        {isApplicant && (
          <>
            <Divider />
            <Box
              p="xl"
              style={{
                background: '#f8fafc',
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 12,
              }}
            >
              <Button
                color="red"
                variant="light"
                leftSection={<IconX size={16} />}
                onClick={openRemarks}
              >
                Reject
              </Button>
              <Button
                color="green"
                leftSection={<IconCheck size={16} />}
                onClick={handleApprove}
              >
                Approve
              </Button>
            </Box>
          </>
        )}
      </Box>

      {/* ── Remarks Modal ── */}
      <Remarks
        opened={remarksOpened}
        onClose={closeRemarks}
        onConfirm={handleRejectConfirm}
        applicantName={fullName}
      />
    </>
  );
}
