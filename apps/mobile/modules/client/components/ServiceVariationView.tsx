import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

type VariationProps = {
    title: string;
    description: string;
    priceRange: string;
    icon: string;
    selected?: boolean;
    onPress?: () => void;
};

export default function ServiceVariationView({
    title,
    description,
    priceRange,
    icon,
    selected = false,
    onPress
}: VariationProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.9}
            className={`flex-row items-center bg-white rounded-2xl p-4 mb-3 shadow-sm border ${selected ? 'border-[#0037B7] bg-[#F2F7FE]' : 'border-transparent'}`}
        >
            <View className="w-12 h-12 rounded-full bg-[#E5E7EB] items-center justify-center mr-4">
                <FontAwesome5 name={icon} size={20} color="#0037B7" />
            </View>
            <View className="flex-1">
                <Text className="text-[#111827] text-base font-bold">{title}</Text>
                <Text className="text-[#4B5563] text-xs leading-4 mt-0.5">{description}</Text>
                <Text className="text-[#111827] text-[13px] font-semibold mt-1">{priceRange}</Text>
            </View>
        </TouchableOpacity>
    );
}
