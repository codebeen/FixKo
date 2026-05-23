import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BackButton from '../components/back-button';

type PageHeaderProps = {
    title: string;
};

export default function PageHeader({ title }: PageHeaderProps) {
    return (
        <View style={styles.header}>
            <View style={styles.leftSlot}>
                <BackButton />
            </View>
            <Text style={styles.headerTitle}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', 
        paddingVertical: 16,
        width: '100%',
        position: 'relative',
    },

    leftSlot: {
        position: 'absolute',
        left: 16,     
        zIndex: 10,   
    },
    
    headerTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
    },
});