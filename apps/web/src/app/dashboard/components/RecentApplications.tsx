"use client";

import { Box, Text, Group, Badge, Avatar, Stack, Divider, Button, Anchor } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";

export interface RecentApplicationItem {
  id: string;
  name: string;
  jobType: string;
  status: "Pending" | "For Review" | "Approved" | "Rejected";
  appliedAt: string;
}

const STATUS_STYLE: Record<
  RecentApplicationItem["status"],
  { color: string; bg: string; label: string }
> = {
  Pending: { color: "#E67E22", bg: "#FEF3E2", label: "Pending" },
  "For Review": { color: "#2980B9", bg: "#EBF5FB", label: "For Review" },
  Approved: { color: "#27AE60", bg: "#E9F7EF", label: "Approved" },
  Rejected: { color: "#C0392B", bg: "#FDECEA", label: "Rejected" },
};

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "Just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function AppRow({
  item,
  isLast,
}: {
  item: RecentApplicationItem;
  isLast: boolean;
}) {
  const st = STATUS_STYLE[item.status];
  return (
    <>
      <Group gap="sm" py="sm" px="xs" wrap="nowrap" className="activity-row" style={{ borderRadius: 8 }}>
        <Avatar size={36} radius="xl" color="blue" variant="light">
          {initials(item.name)}
        </Avatar>

        <Box style={{ flex: 1, minWidth: 0 }}>
          <Text size="sm" fw={600} c="var(--brand-dark-text)" truncate="end">
            {item.name}
          </Text>
          <Text size="xs" c="dimmed">
            {item.jobType}
          </Text>
        </Box>

        <Box style={{ textAlign: "right", flexShrink: 0 }}>
          <Box
            style={{
              display: "inline-block",
              padding: "2px 10px",
              borderRadius: 20,
              background: st.bg,
              color: st.color,
              fontSize: 11,
              fontWeight: 700,
              marginBottom: 3,
            }}
          >
            {st.label}
          </Box>
          <Text size="xs" c="dimmed" display="block">
            {timeAgo(item.appliedAt)}
          </Text>
        </Box>
      </Group>
      {!isLast && <Divider color="rgba(0,0,0,0.05)" />}
    </>
  );
}

interface RecentApplicationsProps {
  items: RecentApplicationItem[];
}

export default function RecentApplications({ items }: RecentApplicationsProps) {
  return (
      <Box
          style={{
              background: "#FFFFFF",
              borderRadius: "14px",
              border: "1px solid rgba(0,0,0,0.07)",
              boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
              overflow: "hidden",
          }}
      >
          {/* Header */}
          <Box
              px="xl"
              py="md"
              style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
          >
              <Group justify="space-between" align="center">
                  <Box>
                      <div className="flex gap-2">
                          <Text fw={700} size="sm" c="var(--brand-dark-text)">
                              Recent Applications
                          </Text>
                          <Box
                              style={{
                                  background: "#EBF5FB",
                                  color: "#2980B9",
                                  borderRadius: 20,
                                  padding: "2px 6px",
                                  fontSize: 12,
                                  fontWeight: 700,
                              }}
                          >
                              {items.length}
                          </Box>
                      </div>
                      <Text size="xs" c="dimmed" mt={2}>
                          Latest worker applicant submissions
                      </Text>
                  </Box>
                  <Anchor
                      component={Link}
                      href="/applicant"
                      size="xs"
                      c="dimmed"
                      underline="hover"
                      style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 2,
                      }}
                  >
                      View all <IconChevronRight size={13} />
                  </Anchor>
              </Group>
          </Box>

          {/* Rows */}
          <Box px="lg" py="xs">
              <Stack gap={0}>
                  {items.map((item, idx) => (
                      <AppRow
                          key={item.id}
                          item={item}
                          isLast={idx === items.length - 1}
                      />
                  ))}
              </Stack>
          </Box>
      </Box>
  );
}
