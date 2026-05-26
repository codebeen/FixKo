import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { useRouter } from 'expo-router';
import LoadingAnimation from '@/components/ui/loading/LoadingAnimation';
import BaseMain from '@/components/layout/(base-main)/BaseMain';

export default function LoadingScreenView() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace('/(client)/booking/WorkerSelectionPage' as any);
        }, 2500);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <BaseMain align="center" contentContainerStyle={{ justifyContent: 'center' }}>
            <LoadingAnimation style={{ width: 250, height: 250 }} />
            <Text className="text-white text-lg font-bold mt-5">Finding available workers...</Text>
        </BaseMain>
    );
}
