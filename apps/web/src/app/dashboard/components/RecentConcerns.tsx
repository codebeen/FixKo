"use client";

import { Box, Text, Group, Avatar, Stack, Divider, Anchor } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/dist/client/link";

export interface RecentConcernItem {
  id: string;
  customerName: string;
  subject: string;
  message: string;
  status: "Open" | "In Progress" | "Resolved";
  receivedAt: string;
}

const STATUS_STYLE: Record<
  RecentConcernItem["status"],
  { color: string; bg: string }
> = {
  Open: { color: "#C0392B", bg: "#FDECEA" },
  "In Progress": { color: "#E67E22", bg: "#FEF3E2" },
  Resolved: { color: "#27AE60", bg: "#E9F7EF" },
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

function ConcernRow({
  item,
  isLast,
}: {
  item: RecentConcernItem;
  isLast: boolean;
}) {
  const st = STATUS_STYLE[item.status];
  return (
    <>
      <Group gap="sm" py="sm" px="xs" wrap="nowrap" align="flex-start" className="activity-row" style={{ borderRadius: 8 }}>
        <Avatar size={36} radius="xl" color="violet" variant="light">
          {initials(item.customerName)}
        </Avatar>

        <Box style={{ flex: 1, minWidth: 0 }}>
          <Group gap={6} mb={2} wrap="nowrap">
            <Text size="sm" fw={600} c="var(--brand-dark-text)" truncate="end" style={{ flex: 1 }}>
              {item.customerName}
            </Text>
            <Box
              style={{
                display: "inline-block",
                padding: "1px 9px",
                borderRadius: 20,
                background: st.bg,
                color: st.color,
                fontSize: 11,
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {item.status}
            </Box>
          </Group>
          <Text size="xs" fw={600} c="var(--brand-dark-text)" mb={2}>
            {item.subject}
          </Text>
          <Text size="xs" c="dimmed" lineClamp={1}>
            {item.message}
          </Text>
          <Text size="xs" c="dimmed" mt={3}>
            {timeAgo(item.receivedAt)}
          </Text>
        </Box>
      </Group>
      {!isLast && <Divider color="rgba(0,0,0,0.05)" />}
    </>
  );
}

interface RecentConcernsProps {
  items: RecentConcernItem[];
}

export default function RecentConcerns({ items }: RecentConcernsProps) {
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
                              Recent Concerns
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
                          Customer service messages &amp; reports
                      </Text>
                  </Box>
                  <Anchor
                      component={Link}
                      href="/customer-service"
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
                      <ConcernRow
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
