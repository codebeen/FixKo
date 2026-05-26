import React from 'react';
import { View, Text } from 'react-native';

type SectionHeaderProps = {
    title: string;
    subtitle: string;
    align?: 'left' | 'center'; 
};

export default function SectionHeader({ title, subtitle, align = 'left' }: SectionHeaderProps) {
    const isCenter = align === 'center';
    return (
        <View className={`mt-6 mb-2 ${isCenter ? 'items-center' : 'items-start'}`}>
            <Text className={`text-2xl font-bold text-white mb-2 ${isCenter ? 'text-center' : 'text-left'}`}>
                {title}
            </Text>
            
            <Text className={`text-sm text-white leading-5 ${isCenter ? 'text-center' : 'text-left'}`}>
                {subtitle}
            </Text>
        </View>
    );
}