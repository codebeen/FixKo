import React from "react";
import { Box, Stack, Group, Text, UnstyledButton, Collapse, rem } from "@mantine/core";
import Link from "next/link";
import { IconChevronDown } from "@tabler/icons-react";

export function SidebarLink({ item, role, isActive, isNarrow, opened, isAnyOpened, onToggle, onClose }) {
  const Icon = item.icon;
  const isDirectActive = item.link ? isActive(item.link) : false;
  const isParentActive = item.links?.some((sub) => isActive(sub.link));
  const active = isDirectActive || isParentActive;

  // Exclusive highlight logic: If any item is opened, only highlight if this item is the one opened.
  // Otherwise, fallback to active state only if no other items are opened.
  const isHighlighted = isAnyOpened ? (opened && !isNarrow) : active;

  const navButtonStyle = (activeState) => ({
    display: "block",
    width: "100%",
    padding: rem(12),
    borderRadius: rem(8),
    backgroundColor: activeState ? "#003B9F" : "transparent",
    color: "#F5F5F5",
    transition: "all 0.2s ease",
    boxShadow: activeState ? "0 4px 10px rgba(0, 59, 159, 0.3)" : "none",
  });

  if (item.links) {
    return (
      <Box>
        <UnstyledButton
          onClick={onToggle}
          className="nav-item-hover"
          style={navButtonStyle(isHighlighted)}
        >
          <Group justify={isNarrow ? "center" : "space-between"} wrap="nowrap">
            <Group gap="md" wrap="nowrap">
              <Icon size={26} stroke={1.5} />
              {!isNarrow && <Text fz={17} fw={500}>{item.label}</Text>}
            </Group>
            {!isNarrow && (
              <IconChevronDown
                size={18}
                style={{
                  transform: opened ? 'rotate(180deg)' : 'none',
                  transition: 'transform 200ms ease'
                }}
              />
            )}
          </Group>
        </UnstyledButton>

        <Collapse in={opened && !isNarrow}>
          <Stack gap={10} mt={10} pl={isNarrow ? 0 : 40}>
            {item.links
              .filter(sub => !sub.roles || sub.roles.includes(role))
              .map((sub) => {
                const SubIcon = sub.icon;
                const subActive = isActive(sub.link);
                return (
                  <UnstyledButton
                    key={sub.link}
                    component={Link}
                    href={`/${sub.link}`}
                    onClick={onClose}
                    style={{ ...navButtonStyle(subActive), padding: "10px 12px" }}
                  >
                    <Group gap="xs" wrap="nowrap" justify={isNarrow ? "center" : "flex-start"}>
                      <SubIcon size={20} stroke={1.5} />
                      {!isNarrow && <Text fz={18}>{sub.label}</Text>}
                    </Group>
                  </UnstyledButton>
                );
              })}
          </Stack>
        </Collapse>
      </Box>
    );
  }

  return (
    <UnstyledButton
      className="nav-item-hover"
      component={Link}
      href={`/${item.link}`}
      onClick={onClose}
      style={navButtonStyle(isHighlighted)}
    >
      <Group gap="md" wrap="nowrap" justify={isNarrow ? "center" : "flex-start"}>
        <Icon size={26} stroke={1.5} />
        {!isNarrow && <Text fz={17} fw={500}>{item.label}</Text>}
      </Group>
    </UnstyledButton>
  );
}