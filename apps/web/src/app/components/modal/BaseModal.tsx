import { Modal, Title, Group, Divider, Box, ScrollArea, Text } from '@mantine/core';
import { IconX } from '@tabler/icons-react';

interface BaseModalProps {
    opened: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    width?: string | number;
}

const BaseModal = ({ opened, onClose, title, children, footer, width = "md", }: BaseModalProps) => {
    return (
        <Modal opened={opened} onClose={onClose} centered size={width}
            closeButtonProps={{
                icon: <IconX size={24} color="white" />,
                variant: 'transparent',
            }}

            title={
                title && (
                    <Text fw={600} size="lg" style={{ fontSize: '1.125rem', color: 'white' }}>
                        {title}
                    </Text>
                )
            }

            styles={{
                content: {
                    backgroundColor: 'var(--card, #FFFFFF)',
                    border: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 0, // removed padding so header is flush with edges
                },
                header: {
                    backgroundColor: '#001851', // Dark Blue
                    padding: 'var(--mantine-spacing-md)',
                    margin: 0,
                    borderTopLeftRadius: 'var(--mantine-radius-md)',
                    borderTopRightRadius: 'var(--mantine-radius-md)',
                },
                body: {
                    padding: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                },
            }}
        >

            <Box p="md" style={{ flex: 1, overflowY: 'auto' }}>
                {children}
            </Box>

            {footer && (
                <Group
                    justify="flex-end"
                    gap="sm"
                    p="md"
                        style={{ flexShrink: 0 }}
                >
                    {footer}
                </Group>
            )}

        </Modal>
    );
};

export default BaseModal;

