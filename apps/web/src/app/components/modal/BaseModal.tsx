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
        <Modal 
            opened={opened} 
            onClose={onClose} 
            centered 
            size={width} 
            radius={16}
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
            transitionProps={{
                transition: 'pop',
                duration: 250,
                timingFunction: 'ease',
            }}
            closeButtonProps={{
                icon: <IconX size={24} color="white" />,
                variant: 'transparent',
            }}
            title={
                title && (
                    <Text fw={600} style={{ fontSize: '1.25rem', color: 'white', letterSpacing: '-0.01em' }}>
                        {title}
                    </Text>
                )
            }
            styles={{
                content: {
                    backgroundColor: '#FFFFFF',
                    border: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 0,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                    overflow: 'hidden',
                },
                header: {
                    backgroundColor: '#001851', // Dark Blue
                    padding: '24px 32px',
                    margin: 0,
                },
                body: {
                    padding: 0,
                    display: 'flex',
                    flexDirection: 'column',
                },
            }}
        >
            <Box style={{ flex: 1, overflowY: 'auto', padding: '32px' }}>
                {children}
            </Box>

            {footer && (
                <>
                    <Divider color="gray.2" />
                    <Group
                        justify="flex-end"
                        gap="sm"
                        style={{ flexShrink: 0, padding: '24px 32px', backgroundColor: '#f8f9fa' }}
                    >
                        {footer}
                    </Group>
                </>
            )}
        </Modal>
    );
};

export default BaseModal;
