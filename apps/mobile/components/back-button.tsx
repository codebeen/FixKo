import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function BackButton() {
    const router = useRouter();

    return (
        <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.8} 
        >
            <FontAwesome5 name="arrow-left" size={20} color="white" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    backButton: {
        marginLeft: 10, // Slight negative margin to counteract padding and keep it visually aligned    
        padding: 15, // Just a healthy tap target, no layout math!
    },
});