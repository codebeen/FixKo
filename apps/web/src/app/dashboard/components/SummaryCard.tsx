"use client";

import { Box, Text, Group, ThemeIcon, Stack, Divider } from "@mantine/core";
import { ReactNode } from "react";

interface StatusLine {
  label: string;
  value: number | string;
  color?: string;
}

interface SummaryCardProps {
  title: string;
  total: number | string;
  icon: ReactNode;
  accentColor: string;
  statuses: StatusLine[];
}

export default function SummaryCard({
  title,
  total,
  icon,
  accentColor,
  statuses,
}: SummaryCardProps) {
  return (
    <Box
      className="summary-card"
      style={{
        background: "#FFFFFF",
        borderRadius: "14px",
        border: "1px solid rgba(0,0,0,0.07)",
        boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
        overflow: "hidden",
        transition: "transform 0.18s ease, box-shadow 0.18s ease",
      }}
    >
      <Box p="lg">
        {/* Header row */}
        <Group justify="space-between" align="center" mb="md">
          <Text
            size="sm"
            fw={600}
            tt="uppercase"
            style={{ letterSpacing: "0.07em", color: "var(--brand-mid-gray)" }}
          >
            {title}
          </Text>
          <ThemeIcon
            size={40}
            radius="xl"
            style={{
              background: `${accentColor}18`,
              color: accentColor,
            }}
          >
            {icon}
          </ThemeIcon>
        </Group>

        {/* Big number */}
        <Text
          style={{
            fontSize: 40,
            fontWeight: 600,
            color: "var(--brand-dark-text)",
            lineHeight: 1,
            marginBottom: "16px",
          }}
        >
          {total}
        </Text>

        {/* Status breakdown */}
        <Divider mb="sm" color="rgba(0,0,0,0.06)" />
        <Stack gap={6}>
          {statuses.map((s) => (
            <Group key={s.label} justify="space-between">
              <Text size="xs" c="dimmed" fw={500}>
                {s.label}
              </Text>
              <Text size="xs" fw={400} style={{ color: "gray" }}>
                {s.value}
              </Text>
            </Group>
          ))}
        </Stack>
        
      </Box>
    </Box>
  );
}
