"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { Box, Stack, Group, Text, Image, ScrollArea, Divider, ActionIcon, Drawer } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { usePathname } from "next/navigation";
import { IconChevronLeft, IconChevronRight, IconCopyright, IconX } from "@tabler/icons-react";

import fixkoLogo from "../../assets/logo_fixko.png";
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
    <Box 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%', 
        color: 'white',
        background: `
          url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1.5' fill='%23ffffff' fill-opacity='0.08'/%3E%3C/svg%3E"),
          radial-gradient(circle at 15% 85%, rgba(219, 169, 46, 0.15) 0%, transparent 40%),
          radial-gradient(circle at 85% 15%, rgba(59, 130, 246, 0.3) 0%, transparent 45%),
          linear-gradient(140deg, #001851 0%, #0b2361 25%, #18388c 50%, #2655bf 75%, #3b82f6 100%)
        `
      }} 
      p={isNarrow ? 12 : 20}
    >
      <style>{`.nav-item-hover:hover { background-color: rgba(255, 255, 255, 0.15) !important; }`}</style>

      {/* Sidebar Header */}
      <Box pt="md" px="md" pb={0} style={{ position: 'relative' }}>
        <Group justify="center" wrap="nowrap">
          <Image src={fixkoLogo.src} w={isNarrow ? 105 : 190} h={isNarrow ? 60 : 85} fit="contain" />
        </Group>
        
        {(isMobile || !isNarrow) && (
          <Box style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)' }}>
            {isMobile ? (
              <ActionIcon onClick={close} variant="subtle" color="gray.0">
                <IconX size={25} />
              </ActionIcon>
            ) : (
              <ActionIcon onClick={() => setCollapsed(!collapsed)} variant="subtle" color="gray.0">
                {collapsed ? <IconChevronRight size={20} /> : <IconChevronLeft size={25} />}
              </ActionIcon>
            )}
          </Box>
        )}
      </Box>

      <Divider mt={4} mb="xl" w="80%" mx="auto" color="rgba(255, 255, 255, 0.2)" />

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
            <Text fz={12}>2026 © FixKo PH</Text>
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
          w={isNarrow ? 100 : 320}
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
            backgroundColor: "#001851",
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
          content: { backgroundColor: "#001851" },
          body: { padding: 0, height: '100%' }
        }}
      >
        {NavContent}
      </Drawer>
    </>
  );
}
