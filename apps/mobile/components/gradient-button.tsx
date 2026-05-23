import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type GradientButtonProps = {
    title: string;
    onPress: () => void;
    compact?: boolean; // <-- NEW: Tells the button to shrink!
};

export default function GradientButton({ title, onPress, compact = false }: GradientButtonProps) {
    return (
        <TouchableOpacity
            style={[styles.buttonWrapper, compact && styles.wrapperCompact]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <LinearGradient
                colors={['#7AB1F5', '#0037B7']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={[styles.button, compact && styles.buttonCompact]}
            >
                <Text style={[styles.buttonText, compact && styles.textCompact]}>
                    {title}
                </Text>
            </LinearGradient>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    // --- Default (Large) Styles ---
    buttonWrapper: {
        marginTop: 4,
        marginBottom: 10,
        width: '100%', 
    },
    button: {
        width: '100%', 
        padding: 15,
        alignItems: 'center',
        borderRadius: 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        backgroundColor: 'transparent',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },

    // --- Compact (Card) Styles ---
    wrapperCompact: {
        width: 'auto', // Hugs the text instead of stretching across the screen
        margin: 0,     // Removes margins so it aligns perfectly with the reviews
    },
    buttonCompact: {
        paddingVertical: 8,   // Exact padding from your old green button
        paddingHorizontal: 20,
        borderRadius: 20,     // Exact border radius from your old green button
    },
    textCompact: {
        fontSize: 14,
        fontWeight: '600',
    }
});