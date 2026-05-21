import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


type GradientButtonProps = {
    title: string;
    onPress: () => void;
};

export default function GradientButton({ title, onPress }: GradientButtonProps) {
    return (
        <TouchableOpacity
            style={styles.buttonWrapper}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <LinearGradient
                colors={['#7AB1F5', '#0037B7']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.button}
            >
                <Text style={styles.buttonText}>{title}</Text>
                
            </LinearGradient>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonWrapper: {
        marginTop: 4,
        marginBottom: 10,
    },
    button: {
        width: 150,
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
        fontSize: 15,
        color: '#fff',
    },
});