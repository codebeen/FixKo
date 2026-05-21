import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


type SectionHeaderProps = {
    title: string;
    subtitle: string;
    align?: 'left' | 'center'; 
};

export default function SectionHeader({ title, subtitle, align = 'left' }: SectionHeaderProps) {
    return (

        <View style={[styles.container, { alignItems: align === 'center' ? 'center' : 'flex-start' }]}>
            <Text style={[styles.heading, { textAlign: align }]}>
                {title}
            </Text>
            
            <Text style={[styles.subheading, { textAlign: align }]}>
                {subtitle}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 24,
        marginBottom: 8,
    },
    
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 8,
    },

    subheading: {
        fontSize: 14,
        color: 'white',
        lineHeight: 20,
    },
});