import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type GradientButtonProps = {
    title: string;
    onPress: () => void;
    compact?: boolean; 
};

export default function GradientButton({ title, onPress, compact = false }: GradientButtonProps) {
    return (
        <TouchableOpacity
            // FIXED: Added overflow-hidden and rounded-full here to clip background leakages safely
            className={compact ? 'mt-1 mb-2.5 w-auto m-0 rounded-full overflow-hidden' : 'mt-1 mb-2.5 w-full rounded-full overflow-hidden'}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <LinearGradient
                colors={['#7AB1F5', '#0037B7']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                className={compact 
                    ? 'w-full py-2 px-5 items-center rounded-full shadow-sm shadow-black/25 elevation-5' 
                    : 'w-full p-[15px] items-center rounded-full shadow-md shadow-black/25 elevation-5'
                }
            >
                <Text className={compact ? 'bg-transparent text-sm font-semibold text-white' : 'bg-transparent text-base font-bold text-white'}>
                    {title}
                </Text>
            </LinearGradient>
        </TouchableOpacity>
    );
}