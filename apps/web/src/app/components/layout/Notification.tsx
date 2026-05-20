import { useState, useRef, useEffect } from 'react';
import { Group, Text, ActionIcon, Indicator, Box, Drawer, Stack, Button, ScrollArea, SegmentedControl, ThemeIcon, } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconAlertTriangleFilled, IconBell, IconCheck, IconX } from '@tabler/icons-react';

export default function Notification() {
  const isMobile = useMediaQuery('(max-width: 820px)');
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [pulseUnreadBadge, setPulseUnreadBadge] = useState(false);
  const previousUnreadCount = useRef(0);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'You have new equipment request.',
      timestamp: '2 minutes ago',
      unread: true,
      type: 'alert',
    },
    {
      id: 2,
      title: 'Printer maintenance for Office 204 has been approved.',
      timestamp: '9 minutes ago',
      unread: true,
      type: 'success',
    },
    {
      id: 3,
      title: 'Asset transfer request has been submitted by Property Custodian.',
      timestamp: '23 minutes ago',
      unread: false,
      type: 'alert',
    },
  ]);

  const unreadCount = notifications.filter((notification) => notification.unread).length;
  const filteredNotifications = notifications.filter((notification) =>
    activeFilter === 'unread' ? notification.unread : true
  );

  const handleMarkAllAsRead = () => {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) => ({ ...notification, unread: false }))
    );
  };

  useEffect(() => {
    if (notificationOpen && unreadCount > previousUnreadCount.current) {
      setPulseUnreadBadge(true);
      const timeoutId = setTimeout(() => setPulseUnreadBadge(false), 1200);
      return () => clearTimeout(timeoutId);
    }
    previousUnreadCount.current = unreadCount;
  }, [notificationOpen, unreadCount]);

  return (
    <>
      <Indicator offset={2} size={8} withBorder disabled={unreadCount === 0} styles={{ indicator: { backgroundImage: 'linear-gradient(140deg, #001851 0%, #0b2361 25%, #18388c 50%, #2655bf 75%, #3b82f6 100%)', border: '1px solid white' } }}>
        <ActionIcon
          variant="transparent"
          c="black"
          onClick={() => setNotificationOpen(true)}
          aria-label="Open notifications"
        >
          <IconBell size={24} stroke={1.5} />
        </ActionIcon>
      </Indicator>

      <Drawer
        opened={notificationOpen}
        onClose={() => setNotificationOpen(false)}
        position="right"
        size={isMobile ? '100%' : 390}
        padding={0}
        withCloseButton={false}
        zIndex={9999}
        styles={{
          body: { padding: 0, height: '100%' },
          content: {
            borderTopLeftRadius: isMobile ? '0' : '14px',
            borderBottomLeftRadius: isMobile ? '0' : '14px',
            overflow: 'hidden',
            border: isMobile ? 'none' : '1px solid #ebeef2',
            boxShadow: '0 14px 40px rgba(10, 20, 30, 0.12)',
          },
        }}
      >
        <Box h="100%" style={{ display: 'flex', flexDirection: 'column' }}>
          <Box p="md" pb="xs">
            <Group justify="space-between" mb="sm">
              <Group gap="xs">
                {isMobile && (
                  <ActionIcon
                    variant="subtle"
                    color="gray"
                    onClick={() => setNotificationOpen(false)}
                    aria-label="Close notifications"
                  >
                    <IconX size={20} />
                  </ActionIcon>
                )}
                <Text fw={700} c="#1d1f23">
                  Notifications
                </Text>
              </Group>
              <SegmentedControl
                size="xs"
                value={activeFilter}
                onChange={setActiveFilter}
                data={[
                  { value: 'all', label: `All (${notifications.length})` },
                  { value: 'unread', label: `Unread (${unreadCount})` },
                ]}
              />
            </Group>
          </Box>

          <Box style={{ flex: 1, minHeight: 0 }}>
            <ScrollArea h="100%" mx="md" mb="xs">
              <Stack gap={6} pb="sm">
                {filteredNotifications.length === 0 && (
                  <Box
                    py="xl"
                    style={{
                      textAlign: 'center',
                      border: '1px dashed #d8dde5',
                      borderRadius: '10px',
                      backgroundColor: '#fafbfc',
                    }}
                  >
                    <Text fw={600} c="#30343a">You're all caught up!</Text>
                    <Text size="sm" c="#888">No notifications to show right now.</Text>
                  </Box>
                )}

                {filteredNotifications.map((notification) => (
                  <Group
                    key={notification.id}
                    justify="space-between"
                    align="flex-start"
                    wrap="nowrap"
                    p="sm"
                    style={{
                      borderRadius: '10px',
                      transition: 'background-color 120ms ease',
                      cursor: 'default',
                    }}
                    className="notification-row"
                  >
                    <Group align="flex-start" wrap="nowrap" gap="sm" style={{ flex: 1 }}>
                      <ThemeIcon
                        radius="md"
                        size={36}
                        variant="light"
                        color={notification.type === 'success' ? 'green' : 'yellow'}
                      >
                        {notification.type === 'success' ? (
                          <IconCheck size={18} />
                        ) : (
                          <IconAlertTriangleFilled size={18} />
                        )}
                      </ThemeIcon>

                      <Box style={{ flex: 1, minWidth: 0 }}>
                        <Text
                          size="sm"
                          fw={700}
                          c="#1f2328"
                          style={{
                            lineHeight: 1.35,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {notification.title}
                        </Text>
                        <Text size="xs" c="#888" mt={2}>
                          {notification.timestamp}
                        </Text>
                      </Box>
                    </Group>

                    {notification.unread && (
                      <Box
                        mt={6}
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          backgroundImage: 'linear-gradient(140deg, #001851 0%, #0b2361 25%, #18388c 50%, #2655bf 75%, #3b82f6 100%)',
                          animation: pulseUnreadBadge ? 'notif-pulse 900ms ease-in-out' : 'none',
                          flexShrink: 0,
                        }}
                      />
                    )}
                  </Group>
                ))}
              </Stack>
            </ScrollArea>
          </Box>

          <Box p="md" pt="xs" style={{ borderTop: '1px solid #eceff3', background: '#fff' }}>
            <Button 
              fullWidth 
              onClick={handleMarkAllAsRead} 
              disabled={unreadCount === 0}
              style={{ backgroundImage: 'linear-gradient(140deg, #001851 0%, #0b2361 25%, #18388c 50%, #2655bf 75%, #3b82f6 100%)', border: 'none', color: 'white' }}
            >
              Mark all as read
            </Button>
          </Box>
        </Box>
      </Drawer>
      <style>
        {`
          .notification-row:hover {
            background-color: #f6f8fa;
          }

          @keyframes notif-pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.45); opacity: 0.6; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </>
  );
}
