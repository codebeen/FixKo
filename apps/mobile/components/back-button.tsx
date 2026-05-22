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
        position: 'absolute',
        left: 4, // Pins it securely to the left side
        top: 12, // Vertically aligns it nicely with the text
        zIndex: 10, // Ensures it stays tappable on top of everything
        padding: 16, // Healthy touch target size
    },
});