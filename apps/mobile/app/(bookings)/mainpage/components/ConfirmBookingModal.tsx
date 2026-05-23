// components/ConfirmBookingModal.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import BaseModal from '../../../../components/modal/base-modal'; // Adjust the path as needed

// 1. Define the shape of an Add-on
export type AddonItem = {
    id: string;
    name: string;
    price: number;
};

type ConfirmBookingModalProps = {
    visible: boolean;
    onClose: () => void;
    onConfirm: () => void;
    basePrice?: number; // Defaults to 700 if not provided
    addons?: AddonItem[]; // Optional array of selected add-ons
};

export default function ConfirmBookingModal({ 
    visible, 
    onClose, 
    onConfirm, 
    basePrice = 700,
    addons = [] 
}: ConfirmBookingModalProps) {
    
    // 2. Automatically calculate the total based on the base price + any add-ons
    const totalCost = addons.reduce((sum, addon) => sum + addon.price, basePrice);

    return (
        <BaseModal visible={visible} onClose={onClose}>
            
            {/* Top Header Row */}
            <View style={styles.headerRow}>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                    <Text style={styles.closeIcon}>✕</Text>
                    <Text style={styles.closeText}>Close</Text>
                </TouchableOpacity>

                <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>TO CONFIRM</Text>
                </View>
            </View>

            <Text style={styles.mainTitle}>Booking Summary</Text>

            {/* Service Profile Row */}
            <View style={styles.serviceBlock}>
                <View style={styles.iconContainer}>
                    <FontAwesome5 name="broom" size={24} color="#A0AEC0" />
                </View>
                
                <View style={styles.serviceInfo}>
                    <Text style={styles.serviceType}>Type: Cleaning</Text>
                    <Text style={styles.serviceName}>Small Homes (0–50 sqm)</Text>
                    <Text style={styles.serviceDesc}>
                        Perfect for condos, studio units, and small apartments
                    </Text>
                </View>
            </View>

            {/* 3-Column Attributes Grid */}
            <View style={styles.attributesGrid}>
                <View style={styles.attrColumn}>
                    <Text style={styles.attrLabel}>Rooms</Text>
                    <Text style={styles.attrValue}>1 Bed, 1 Bath</Text>
                </View>
                <View style={styles.attrColumn}>
                    <Text style={styles.attrLabel}>Cleaners</Text>
                    <Text style={styles.attrValue}>1</Text>
                </View>
                <View style={[styles.attrColumn, { alignItems: 'flex-end' }]}>
                    <Text style={styles.attrLabel}>Duration</Text>
                    <Text style={styles.attrValue}>1 hr</Text>
                </View>
            </View>

            {/* Dynamic Receipt Box */}
            <View style={styles.receiptBox}>
                
                {/* Base Service */}
                <View style={styles.receiptRow}>
                    <Text style={styles.receiptItem}>Base Service</Text>
                    <Text style={styles.receiptPrice}>₱{basePrice}</Text>
                </View>

                {/* Dynamically Render Add-ons if they exist */}
                {addons.length > 0 && (
                    <View style={styles.addonsContainer}>
                        {addons.map((addon) => (
                            <View key={addon.id} style={styles.receiptRow}>
                                <Text style={styles.receiptAddon}>+ {addon.name}</Text>
                                <Text style={styles.receiptPrice}>₱{addon.price}</Text>
                            </View>
                        ))}
                    </View>
                )}

                <View style={styles.receiptDivider} />

                {/* Grand Total */}
                <View style={styles.receiptRow}>
                    <Text style={styles.receiptTotalLabel}>Total</Text>
                    <Text style={styles.receiptTotalValue}>₱{totalCost}</Text>
                </View>
            </View>

            {/* 3. Action Buttons Side-by-Side */}
            <View style={styles.actionRow}>
                <TouchableOpacity 
                    style={styles.cancelButton} 
                    activeOpacity={0.8} 
                    onPress={onClose}
                >
                    <Text style={styles.cancelBtnText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.confirmButton} 
                    activeOpacity={0.8} 
                    onPress={onConfirm}
                >
                    <Text style={styles.confirmBtnText}>Confirm</Text>
                </TouchableOpacity>
            </View>

        </BaseModal>
    );
}

const styles = StyleSheet.create({
    // ... headerRow, mainTitle, serviceBlock, attributesGrid styles stay exactly the same ...
    headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
    closeButton: { flexDirection: 'row', alignItems: 'center' },
    closeIcon: { fontSize: 14, color: '#111827', fontWeight: 'bold', marginRight: 6 },
    closeText: { fontSize: 14, color: '#111827', fontWeight: '500' },
    statusBadge: { backgroundColor: '#E6F4EA', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 4 },
    statusText: { color: '#1E8E3E', fontSize: 10, fontWeight: 'bold', letterSpacing: 0.5 },
    mainTitle: { fontSize: 20, color: '#374151', marginBottom: 20 },
    serviceBlock: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
    iconContainer: { width: 60, height: 60, backgroundColor: '#F3F4F6', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
    serviceInfo: { flex: 1 },
    serviceType: { color: '#6B7280', fontSize: 12, marginBottom: 2 },
    serviceName: { color: '#111827', fontSize: 15, fontWeight: '500', marginBottom: 4 },
    serviceDesc: { color: '#6B7280', fontSize: 12, lineHeight: 16 },
    attributesGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
    attrColumn: { flex: 1 },
    attrLabel: { color: '#6B7280', fontSize: 13, marginBottom: 6 },
    attrValue: { color: '#111827', fontSize: 13, fontWeight: 'bold' },

    // --- Dynamic Receipt Box ---
    receiptBox: {
        backgroundColor: '#F9FAFB', 
        borderRadius: 12,
        padding: 20,
        marginBottom: 24,
    },
    receiptRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    receiptItem: {
        color: '#4B5563',
        fontSize: 14,
    },
    receiptAddon: {
        color: '#6B7280', // Slightly lighter for add-ons
        fontSize: 13,
        paddingLeft: 8, // Indent add-ons slightly for visual hierarchy
    },
    receiptPrice: {
        color: '#111827',
        fontSize: 14,
        fontWeight: '500',
    },
    addonsContainer: {
        marginTop: 4,
    },
    receiptDivider: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginVertical: 12,
    },
    receiptTotalLabel: {
        color: '#111827',
        fontSize: 16,
        fontWeight: 'bold',
    },
    receiptTotalValue: {
        color: '#001851', // Brand blue for the final amount
        fontSize: 18,
        fontWeight: 'bold',
    },

    // --- Action Buttons ---
    actionRow: {
        flexDirection: 'row',
        gap: 12, // Spaces the buttons out cleanly
    },
    cancelButton: {
        flex: 1, // Takes up half the space
        backgroundColor: '#F3F4F6', // Light gray so it doesn't compete with primary button
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    cancelBtnText: {
        color: '#4B5563',
        fontSize: 15,
        fontWeight: 'bold',
    },
    confirmButton: {
        flex: 1, // Takes up half the space
        backgroundColor: '#001851', 
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    confirmBtnText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
    },
});