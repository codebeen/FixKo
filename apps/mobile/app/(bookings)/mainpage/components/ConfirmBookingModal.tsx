
// components/ConfirmBookingModal.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


import BaseModal  from '../../../../components/modal/base-modal';

type ConfirmBookingModalProps = {
    visible: boolean;
    onClose: () => void;
    onConfirm: () => void;
};

export default function ConfirmBookingModal({ visible, onClose, onConfirm }: ConfirmBookingModalProps) {
    return (
        <BaseModal visible={visible} onClose={onClose}>

            
            <Text style={styles.title}>Confirm Booking</Text>

            <View style={styles.detailsContainer}>
                {/* Type of Service Row */}
                <Text style={styles.standardText}>
                    <Text style={styles.boldLabel}>Type of Service: </Text> 
                    Cleaning
                </Text>

                {/* Tier Info Block */}
                <View style={styles.sectionSpacer}>
                    <Text style={styles.boldLabel}>Small Homes (0–50 sqm)</Text>
                    <Text style={styles.standardText}>
                        Perfect for condos, studio units, and small apartments
                    </Text>
                </View>

                {/* Room Info Block */}
                <View style={styles.sectionSpacer}>
                    <Text style={styles.standardText}>1 Bedroom and 1 Bathroom</Text>
                </View>

                {/* Cost Block */}
                <View style={styles.sectionSpacer}>
                    <Text style={styles.costText}>Total Cost: 700 pesos</Text>
                    <Text style={styles.standardText}>1 Cleaner for 1 hour</Text>
                </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.buttonRow}>
                <TouchableOpacity 
                    style={[styles.button, styles.cancelButton]} 
                    onPress={onClose}
                    activeOpacity={0.8}
                >
                    <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.button, styles.confirmButton]} 
                    onPress={onConfirm}
                    activeOpacity={0.8}
                >
                    <Text style={styles.confirmText}>Confirm</Text>
                </TouchableOpacity>
            </View>

        </BaseModal>
    );
}

const styles = StyleSheet.create({
    title: {
        color: '#001851', // FixKo dark blue
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    detailsContainer: {
        marginBottom: 30,
        paddingHorizontal: 4,
    },
    sectionSpacer: {
        marginTop: 16,
    },
    boldLabel: {
        color: '#111827',
        fontSize: 15,
        fontWeight: 'bold',
    },
    standardText: {
        color: '#111827',
        fontSize: 15,
        lineHeight: 22,
    },
    costText: {
        color: '#111827',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    
    // --- Buttons ---
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 16, // Spaces the buttons evenly
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 30, // Capsule shape
        minWidth: 110,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#BCC1C9', // Soft gray
    },
    cancelText: {
        color: '#111827',
        fontSize: 15,
        fontWeight: '500',
    },
    confirmButton: {
        backgroundColor: '#4ade80', // Vibrant green
    },
    confirmText: {
        color: '#111827',
        fontSize: 15,
        fontWeight: '500',
    },
});