import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type BackButtonProps = {
    onPress?: () => void;
    size?: number;
    color?: string;
    className?: string;
};

export default function BackButton({ onPress, size = 24, color = 'white', className = '' }: BackButtonProps) {
    const router = useRouter();

    return (
        <TouchableOpacity
            className={`p-1 ${className}`}
            onPress={onPress ?? (() => router.back())}
            activeOpacity={0.8}
        >
            <Ionicons name="arrow-back" size={size} color={color} />
        </TouchableOpacity>
    );
}
