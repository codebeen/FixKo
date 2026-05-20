"use client";

import {
  Group, Text, Breadcrumbs, Anchor, Avatar, Box, Divider, Burger, Menu, UnstyledButton, rem
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconUserCircle, IconLogout, IconUser, IconSettings, IconSearch } from '@tabler/icons-react';
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Notification from "./Notification";
import { NAV_CONFIG } from "../sidebar/NavigationConfig";

interface TopHeaderProps {
  onBurgerClick: () => void;
  opened: boolean;
}

export default function Header({ onBurgerClick, opened }: TopHeaderProps) {
  const isMobile = useMediaQuery('(max-width: 820px)');
  const router = useRouter();
  const pathname = usePathname();

  const roleLabel = "Administrator";
  const profileLabel = "John Doe";

  const currentNav = NAV_CONFIG.find(item => pathname?.startsWith(`/${item.link}`));

  const breadcrumbData = [
    { title: 'FixKo PH', href: `/dashboard` }
  ];

  if (currentNav && currentNav.link !== 'dashboard') {
    breadcrumbData.push({ title: currentNav.label, href: `/${currentNav.link}` });
  }

  const items = breadcrumbData.map((item, index) => {
    const isLast = index === breadcrumbData.length - 1;
    return (
      <Anchor
        key={index}
        component={(item.href === "#" ? "button" : Link) as any}
        href={item.href === "#" ? undefined : item.href}
        size="xs"
        c={isLast ? "#003B9F" : "dimmed"}
        fw={isLast ? 700 : 500}
        underline="hover"
        style={{ transition: "color 0.2s ease", cursor: isLast ? "default" : "pointer", textDecoration: isLast ? "none" : undefined }}
      >
        {item.title}
      </Anchor>
    );
  });

  const onLogoutClick = () => {
    router.push('/login');
  };

  return (
    <Box
      component="header"
      style={{
        position: 'sticky',
        top: 0,
        left: 0,
        width: '100%',
        height: '80px',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #dee2e6',
        display: 'flex',
        alignItems: 'center',
        backdropFilter: 'saturate(180%) blur(6px)'
      }}
    >
      <Group justify="space-between" w="100%" px={{ base: 'sm', md: 40 } as any} wrap="nowrap">

        {/* Left Section */}
        <Group gap={{ base: 'xs', sm: 'md', md: 'lg' } as any} wrap="nowrap">
          {isMobile && (
            <Burger
              opened={opened}
              onClick={onBurgerClick}
              size="sm"
              mr="xs"
              color="#003B9F"
            />
          )}

          {!isMobile && (
            <>
              <Box>
                <Breadcrumbs separator="|" mt={3}>
                  {items}
                </Breadcrumbs>
              </Box>
            </>
          )}
        </Group>

        {/* Right Section */}
        <Group gap={{ base: 'sm', sm: 'md', md: 'xl' } as any} wrap="nowrap">
          <Notification />

          {/* User Profile Dropdown */}
          <Menu
            shadow="md"
            width={230}
            radius="md"
            position="bottom-end"
            offset={12}
            zIndex={2000}
            transitionProps={{ transition: 'pop' }}
          >
            <Menu.Target>
              <UnstyledButton style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <Avatar
                  src={null}
                  alt="User Profile"
                  radius="md"
                  size="md"
                  color="#003B9F"
                  variant="filled"
                >
                  <IconUserCircle size={24} />
                </Avatar>
              </UnstyledButton>
            </Menu.Target>

            <Menu.Dropdown>
              {/* Profile header inside dropdown */}
              <Box px="sm" py="xs">
                <Group gap="sm" wrap="nowrap">
                  <Avatar
                    src={null}
                    radius="md"
                    size="md"
                    color="#003B9F"
                    variant="filled"
                  >
                    <IconUserCircle size={20} />
                  </Avatar>
                  <Box>
                    <Text size="sm" fw={700} lh={1.3} c="#003B9F">{profileLabel}</Text>
                    <Text size="xs" c="dimmed">{roleLabel}</Text>
                  </Box>
                </Group>
              </Box>

              <Divider my="xs" />

              <Menu.Item
                leftSection={<IconLogout size={16} />}
                onClick={onLogoutClick}
                fw={600}
                c="red"
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>

        </Group>
      </Group>
    </Box>
  );
}