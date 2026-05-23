import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import BackButton from '../../../components/back-button';
import PageHeader from '../../../components/page-header';
import Button from '../../../components/gradient-button';

export default function BookingConfirmationPage() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Header Area */}
            <PageHeader title="My bookings" />


            <ScrollView 
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Large Success Badge */}
                <View style={styles.badgeContainer}>
                    <FontAwesome5 name="certificate" size={130} color="#4ade80" />
                    {/* The checkmark sits absolutely positioned inside the certificate icon */}
                    <FontAwesome5 name="check" size={60} color="#001851" style={styles.badgeCheck} />
                </View>

                <Text style={styles.mainTitle}>Booking Confirmed!</Text>

                {/* Booking Details Block */}
                <View style={styles.detailsBlock}>
                    
                    {/* Top Row: Cleaning / Details */}
                    <View style={styles.rowBetween}>
                        <View style={styles.iconTextPair}>
                            <FontAwesome5 name="broom" size={18} color="white" />
                            <Text style={styles.primaryText}>Cleaning</Text>
                        </View>
                        <View style={styles.iconTextPair}>
                            <FontAwesome5 name="info-circle" size={18} color="white" />
                            <Text style={styles.primaryText}>Details</Text>
                        </View>
                    </View>

                    {/* Second Row: Home Type */}
                    <View style={styles.homeTypeRow}>
                        <FontAwesome5 name="home" size={24} color="white" style={styles.homeIcon} />
                        <View style={styles.homeTextCol}>
                            <Text style={styles.boldText}>Small Homes (0–50 sqm)</Text>
                            <Text style={styles.subText}>Perfect for condos, studio units, and small apartments</Text>
                        </View>
                    </View>

                    {/* Third Row: Room Counters */}
                    <View style={styles.roomsRow}>
                        <View style={styles.roomItem}>
                            <FontAwesome5 name="bed" size={28} color="white" />
                            <Text style={styles.roomCount}>2</Text>
                        </View>
                        <View style={styles.roomItem}>
                            <FontAwesome5 name="bath" size={28} color="white" />
                            <Text style={styles.roomCount}>4</Text>
                        </View>
                    </View>

                    {/* Divider Line */}
                    <View style={styles.divider} />

                    {/* Cost and Time Section */}
                    <Text style={styles.costTitle}>Total Cost: 700 pesos</Text>
                    <View style={styles.footerRow}>
                        <View style={styles.iconTextPairSmall}>
                            <FontAwesome5 name="user" solid size={14} color="white" />
                            <Text style={styles.footerText}>1 Cleaner</Text>
                        </View>
                        <View style={styles.iconTextPairSmall}>
                            <FontAwesome5 name="clock" solid size={14} color="white" />
                            <Text style={styles.footerText}>One hour</Text>
                        </View>
                    </View>

                </View>

                {/* Action Buttons */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.trackButton} activeOpacity={0.8} onPress={() => router.push('/(bookings)/mainpage/TrackBookingPage')}>
                        <Text style={styles.trackButtonText}>Track</Text>
                    </TouchableOpacity>
                    

                    <TouchableOpacity style={styles.payButton} activeOpacity={0.8} onPress={() => router.push('/(payment)/PaymentMethodPage')}>
                        <Text style={styles.payButtonText}>Pay</Text>
                    </TouchableOpacity>

                    {/* <Button 
                        title="Pay" 
                    /> */}

                </View>

            </ScrollView>
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
        paddingBottom: 40,
    },

    // --- Header ---
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', 
        width: '100%',
        paddingVertical: 16,
        position: 'relative', 
    },

    headerTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
    },
    
    // --- Success Badge ---
    badgeContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        marginBottom: 24,
    },
    
    badgeCheck: {
        position: 'absolute',
        top: 35, 
    },

    mainTitle: {
        color: 'white',
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
    },

    // --- Details Block ---
    detailsBlock: {
        paddingHorizontal: 10,
    },

    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingRight: 40, 
    },

    iconTextPair: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },

    primaryText: {
        color: 'white',
        fontSize: 16,
    },

    homeTypeRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 20,
    },

    homeIcon: {
        marginTop: 2,
        marginRight: 14,
    },

    homeTextCol: {
        flex: 1,
    },

    boldText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 4,
    },

    subText: {
        color: 'white',
        fontSize: 12,
        lineHeight: 18,
        opacity: 0.9,
    },
    
    roomsRow: {
        flexDirection: 'row',
        gap: 40,
        marginBottom: 20,
    },

    roomItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },

    roomCount: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },

    divider: {
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        width: '100%',
        marginBottom: 16,
    },

    costTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },

    footerRow: {
        flexDirection: 'row',
        gap: 40,
        marginBottom: 30,
    },

    iconTextPairSmall: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },

    footerText: {
        color: 'white',
        fontSize: 12,
    },

    // --- Buttons ---
    buttonContainer: {
        gap: 12,
        marginTop: 10,
    },

    trackButton: {
        backgroundColor: 'white',
        borderRadius: 30,
        paddingVertical: 14,
        alignItems: 'center',
        width: '100%',
    },
    
    trackButtonText: {
        color: '#111827',
        fontSize: 16,
        fontWeight: '600',
    },

    payButton: {
        backgroundColor: '#4ade80', 
        borderRadius: 30,
        paddingVertical: 14,
        alignItems: 'center',
        width: '100%',
    },
    
    payButtonText: {
        color: '#111827',
        fontSize: 16,
        fontWeight: '600',
    },
});