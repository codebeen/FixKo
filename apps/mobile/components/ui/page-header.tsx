import React from 'react';
import { View, Text } from 'react-native';
import BackButton from './back-button';

type PageHeaderProps = {
    title: string;
};

export default function PageHeader({ title }: PageHeaderProps) {
    return (
        <View className="flex-row items-center justify-center py-4 w-full relative">
            <View className="absolute left-4 z-10">
                <BackButton />
            </View>
            <Text className="text-white text-[18px] font-semibold text-center">{title}</Text>
        </View>
    );
}