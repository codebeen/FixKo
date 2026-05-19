"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { Box, Stack, Group, Text, Image, ScrollArea, Divider, ActionIcon, Drawer } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { usePathname } from "next/navigation";
import { IconChevronLeft, IconChevronRight, IconCopyright, IconX } from "@tabler/icons-react";

import pupLogo from "../../assets/FixKoLogo.png";
import { NAV_CONFIG } from "./NavigationConfig";
import { SidebarLink } from "./SidebarLink";

interface SidebarProps {
  opened: boolean;
  close: () => void;
}

export default function Sidebar({ opened, close }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();
  const lastPathname = useRef<string | null>(null);

  const roleSlug = "admin";

  const isMobile = useMediaQuery('(max-width: 820px)');
  const isNarrow = collapsed && !isHovered && !isMobile;

  // Filter items based on the current URL role
  const NavItems = useMemo(() => {
    if (!roleSlug) return [];
    return NAV_CONFIG.filter(item => !item.roles || item.roles.includes(roleSlug));
  }, [roleSlug]);

  const isActive = (path: string) => {
    const normalizedPath = (pathname || "").replace(/\/$/, "");
    return normalizedPath === `/${path}` || normalizedPath.startsWith(`/${path}/`);
  };

  const [openedItems, setOpenedItems] = useState<Record<string, boolean>>({});

  // Auto-expand the dropdown containing the active link
  useEffect(() => {
    if (lastPathname.current !== pathname) {
      const newState: Record<string, boolean> = {};
      NavItems.forEach((item) => {
        if (item.links && item.links.some((sub) => isActive(sub.link))) {
          newState[item.label] = true;
        }
      });
      setOpenedItems(newState);
      lastPathname.current = pathname;
    }
  }, [pathname, NavItems]);

  const toggleItem = (label: string) => {
    setOpenedItems(prev => ({
      // Clear previous state and only toggle the current label (accordion behavior)
      [label]: !prev[label]
    }));
  };

  const NavContent = (
    <Box style={{ display: 'flex', flexDirection: 'column', height: '100%', color: 'white' }} p={isNarrow ? 12 : 20}>
      <style>{`.nav-item-hover:hover { background-color: rgba(71, 6, 6, 0.8) !important; }`}</style>

      {/* Sidebar Header */}
      <Box p="md">
        <Group justify={isNarrow ? "center" : "space-between"} wrap="nowrap">
          <Group gap="sm" wrap="nowrap" ml={isNarrow ? 0 : 10}>
            <Image src={pupLogo} w={isNarrow ? 60 : 70} h={isNarrow ? 60 : 70} fit="contain" />
            {!isNarrow && <Text fw={900} c="white" fz={20}>PUP Inventory</Text>}
          </Group>
          {isMobile ? (
            <ActionIcon onClick={close} variant="subtle" color="gray.0">
              <IconX size={25} />
            </ActionIcon>
          ) : !isNarrow && (
            <ActionIcon onClick={() => setCollapsed(!collapsed)} variant="subtle" color="gray.0">
              {collapsed ? <IconChevronRight size={20} /> : <IconChevronLeft size={25} />}
            </ActionIcon>
          )}
        </Group>
      </Box>

      <Divider my="xl" w="80%" mx="auto" color="rgba(255, 255, 255, 0.2)" />

      {/* Main Links Area */}
      <ScrollArea flex={1} px={isNarrow ? 0 : "md"} scrollbars="y">
        <Stack gap={12}>
          {NavItems.map((item) => (
            <SidebarLink
              key={item.label}
              item={item}
              role={roleSlug}
              isActive={isActive}
              isNarrow={isNarrow}
              opened={openedItems[item.label]}
              isAnyOpened={Object.values(openedItems).some(Boolean)}
              onToggle={() => toggleItem(item.label)}
              onClose={close}
            />
          ))}
        </Stack>
      </ScrollArea>

      {/* Footer */}
      <Box p="md" mt="auto">
        <Group justify="center" gap="xs" opacity={0.5}>
          {!isNarrow ? (
            <Text fz={12}>2026 © PUP Inventory</Text>
          ) : (
            <IconCopyright size={18} />
          )}
        </Group>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      {!isMobile && (
        <Box
          w={isNarrow ? 130 : 360}
          h="100vh"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            position: "sticky",
            top: 0,
            transition: "width 0.3s ease",
            zIndex: 100
          }}
        >
          <Box style={{
            height: '100%',
            backgroundColor: "#800000",
            borderTopRightRadius: '16px',
            borderBottomRightRadius: '16px',
            overflow: 'hidden'
          }}>
            {NavContent}
          </Box>
        </Box>
      )}

      {/* Mobile Sidebar (Drawer) */}
      <Drawer
        opened={opened}
        onClose={close}
        size={300}
        position="left"
        withCloseButton={false}
        zIndex={1000}
        styles={{
          content: { backgroundColor: "#800000" },
          body: { padding: 0, height: '100%' }
        }}
      >
        {NavContent}
      </Drawer>
    </>
  );
}
