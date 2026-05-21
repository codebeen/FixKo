import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


type SectionLabelProps = {
    title: string;
    subtitle: string;
};

export default function SectionLabel({ title, subtitle }: SectionLabelProps) {
    return (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <Text style={styles.sectionSubtitle}>{subtitle}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    sectionHeader: {
        marginTop: 24,
        marginBottom: 4,
    },
    sectionTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    sectionSubtitle: {
        color: 'white',
        marginTop: 5,
        lineHeight: 20,
    },
});