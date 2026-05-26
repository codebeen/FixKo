import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

type TierOption = {
    id: string;
    label: string;
    description: string;
};

type TierSelectorProps = {
    options: TierOption[];
    selectedId: string;
    onSelect: (id: string) => void;
};

export default function TierSelector({ options, selectedId, onSelect }: TierSelectorProps) {
    return (
        <View className="my-4">
            <Text className="text-white text-base font-bold mb-3">Select Property Size Tier:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
                {options.map((option) => {
                    const isSelected = option.id === selectedId;
                    return (
                        <TouchableOpacity
                            key={option.id}
                            onPress={() => onSelect(option.id)}
                            activeOpacity={0.8}
                            className={`bg-white/10 rounded-xl p-3.5 mr-3 w-[150px] border ${isSelected ? 'border-[#7AB1F5] bg-[#7AB1F5]/20' : 'border-transparent'}`}
                        >
                            <Text className="text-white text-sm font-bold">{option.label}</Text>
                            <Text className="text-gray-300 text-[11px] mt-1 leading-4">{option.description}</Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
}
