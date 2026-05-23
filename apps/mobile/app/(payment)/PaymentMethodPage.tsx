import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import PageHeader from '../../components/page-header';

const PAYMENT_METHODS = [
    { id: 'credit_card', label: 'Credit Card', icon: 'credit-card', iconColor: '#FF5F00', iconBg: '#FFF0E6' },
    { id: 'apple_pay', label: 'Apple Pay', icon: 'apple', iconColor: '#000000', iconBg: '#F3F4F6' },
    { id: 'gcash', label: 'Gcash', icon: 'wallet', iconColor: '#005CEE', iconBg: '#E6F0FD' },
    { id: 'maya', label: 'Maya', icon: 'money-bill-wave', iconColor: '#00D16B', iconBg: '#E6FBF0' },
    { id: 'bpi', label: 'BPI', icon: 'university', iconColor: '#B11216', iconBg: '#FCE7E7' },
    { id: 'cash', label: 'Pay with Cash', icon: 'coins', iconColor: '#FBBF24', iconBg: '#FEF9C3' },
];

export default function PaymentMethodPage() {
    const router = useRouter();

    const [selectedMethod, setSelectedMethod] = useState('credit_card');

    const handleConfirm = () => {
        console.log("Confirmed payment with:", selectedMethod);
        router.push('/(payment)/PaymentConfirmationPage'); 
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            
            <PageHeader title="Payment Method" />

            <ScrollView 
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.headerTitles}>
                    <Text style={styles.mainTitle}>Choose Payment Option</Text>
                    <Text style={styles.subTitle}>Add a new credit / debit card.</Text>
                </View>

                {PAYMENT_METHODS.map((method) => {
                    const isSelected = selectedMethod === method.id;

                    return (
                        <TouchableOpacity 
                            key={method.id}
                            style={[
                                styles.card, 
                                isSelected && styles.cardSelected
                            ]}
                            activeOpacity={0.8}
                            onPress={() => setSelectedMethod(method.id)}
                        >
                            {/* Left Side: Mock Logo */}
                            <View style={[styles.iconWrapper, { backgroundColor: method.iconBg }]}>
                                <FontAwesome5 name={method.icon} size={18} color={method.iconColor} />
                            </View>

                            {/* Middle: Text Label */}
                            <Text style={styles.cardLabel}>{method.label}</Text>

                            {/* Right Side: Custom Radio Button */}
                            <View style={[
                                styles.radioOuter, 
                                isSelected ? styles.radioOuterActive : styles.radioOuterInactive
                            ]}>
                                {isSelected && <View style={styles.radioInner} />}
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>

            {/* Bottom Confirm Button */}
            <View style={styles.footer}>
                <TouchableOpacity 
                    style={styles.confirmButton} 
                    activeOpacity={0.8}
                    onPress={handleConfirm}
                >
                    <Text style={styles.confirmButtonText}>Confirm Payment</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#001851', 
    },

    scrollContent: {
        paddingHorizontal: 24,
        paddingTop: 10,
        paddingBottom: 40,
    },
    
    // --- Page Titles ---
    headerTitles: {
        marginBottom: 24,
    },

    mainTitle: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 6,
    },

    subTitle: {
        color: 'white',
        fontSize: 14,
        opacity: 0.8,
    },

    // --- Inspo White Cards ---
    card: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 16, 
        marginBottom: 12,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1.5,
        borderColor: 'transparent',
    },
    cardSelected: {
        borderColor: '#0037B7', 
    },
    
    // --- Mock Logos ---
    iconWrapper: {
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },

    cardLabel: {
        flex: 1,
        color: '#111827', 
        fontSize: 15,
        fontWeight: '600',
    },

    // --- Custom Radio Buttons ---
    radioOuter: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioOuterInactive: {
        borderColor: '#D1D5DB', 
    },
    radioOuterActive: {
        borderColor: '#0037B7', 
    },
    radioInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#0037B7',
    },

    // --- Footer Button ---
    footer: {
        paddingHorizontal: 24,
        paddingBottom: 30,
        paddingTop: 10,
    },

    confirmButton: {
        backgroundColor: '#4ade80', 
        borderRadius: 30,
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },

    confirmButtonText: {
        color: '#001851', 
        fontSize: 16,
        fontWeight: 'bold',
    },
    
});