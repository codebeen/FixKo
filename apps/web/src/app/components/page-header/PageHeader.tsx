import { Title, Box, Text, Group } from '@mantine/core';

export default function PageHeader({ title, description, area, showArea = true, children }: any) {
    return (
        <Box
            mb="sm"
            pb="md"
        >
            <Group justify="space-between" align="flex-end">
                <Box>
                    <Group gap="sm" mb={4}>
                        <Title order={2} fw={800} c="#001851" style={{ letterSpacing: '-0.5px' }}>
                            {title}
                        </Title>
                    </Group>

                    {description && (
                        <Text c="var(--brand-mid-gray)" fz="sm" fw={500} style={{ maxWidth: '600px', lineHeight: 1.6 }}>
                            {description}
                        </Text>
                    )}
                </Box>
                {children && <Box>{children}</Box>}
            </Group>
        </Box>
    );
}