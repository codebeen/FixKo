"use client";

import { Badge, Box, Button, Divider, Flex, Text, Title } from "@mantine/core";
import { IconMail, IconUser, IconCalendar, IconShield } from "@tabler/icons-react";
import PageHeader from "../../components/page-header/PageHeader";

interface ViewUserProps {
  user?: any;
  onClose?: () => void;
}

const statusColorMap: Record<string, string> = {
  Active:   "#27AE60",
  Inactive: "#E74C3C",
  Pending:  "#F39C12",
};

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <Flex align="flex-start" gap="md" py="sm">
      <Box mt={2} c="dimmed">{icon}</Box>
      <Box>
        <Text fz="xs" c="dimmed" tt="uppercase" fw={600} mb={2}>{label}</Text>
        <Text fz="sm" fw={500}>{value || "—"}</Text>
      </Box>
    </Flex>
  );
}

export default function ViewUser({ user, onClose }: ViewUserProps) {
  const fullName = [user?.first_name, user?.middle_name, user?.last_name]
    .filter(Boolean)
    .join(" ");

  const joinedDate = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("en-US", {
        year: "numeric", month: "long", day: "numeric",
      })
    : "—";

  const status     = user?.status ?? "Pending";
  const statusColor = statusColorMap[status] ?? "#888";

  return (
    <Box mx="auto" py="sm">
      <Box px="md">
        <PageHeader
          title="User Details"
          description="Read-only view of the selected user's account."
          area="User Management"
        />
      </Box>

      <Box px={{ base: "sm", lg: 80 }} mt={20}>
        {/* Name + Status header */}
        <Flex align="center" gap="md" mb="md">
          <Box
            style={{
              width: 56, height: 56, borderRadius: "50%",
              backgroundColor: "var(--brand-primary)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <Text c="white" fw={700} fz="xl">
              {(user?.first_name?.[0] ?? "U").toUpperCase()}
            </Text>
          </Box>
          <Box>
            <Title order={4} c="#001851">{fullName || "Unknown User"}</Title>
            <Badge
              variant="light"
              mt={4}
              style={{
                backgroundColor: `${statusColor}20`,
                color: statusColor,
                border: `1px solid ${statusColor}`,
              }}
            >
              {status}
            </Badge>
          </Box>
        </Flex>

        <Divider mb="md" />

        <InfoRow icon={<IconMail size={16} />}    label="Email"       value={user?.email ?? "—"} />
        <InfoRow icon={<IconShield size={16} />}  label="Role"        value={user?.role ?? "—"} />
        <InfoRow icon={<IconCalendar size={16} />} label="Joined Date" value={joinedDate} />
        <InfoRow icon={<IconUser size={16} />}    label="User ID"     value={user?.id ?? "—"} />

        <Flex justify="flex-end" mt={30}>
          <Button variant="default" radius="md" size="md" onClick={onClose}>
            Close
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}
