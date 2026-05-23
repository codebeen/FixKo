import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Make sure this path is correct for your project!
import PageHeader from '../../components/page-header';

export default function BookingConfirmationPage() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.safeArea}>
            
            <PageHeader title="Confirm Payment" />

            <ScrollView 
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.mainTitle}>Cleaning Services</Text>

                {/* Large Success Badge */}
                <View style={styles.badgeContainer}>
                    <FontAwesome5 name="certificate" size={120} color="#4ade80" />
                    <FontAwesome5 name="check" size={50} color="#001851" style={styles.badgeCheck} />
                </View>

                <Text style={styles.serviceStatus}>Service Completed</Text>

                {/* The New White Summary Card */}
                <View style={styles.whiteCard}>
                    
                    {/* Top Row: Rooms Grid */}
                    <View style={styles.roomsGrid}>
                        <View style={styles.roomBox}>
                            <FontAwesome5 name="bed" size={24} color="#001851" />
                            <Text style={styles.roomText}>1 Bedroom</Text>
                        </View>
                        <View style={styles.roomBox}>
                            <FontAwesome5 name="bath" size={24} color="#001851" />
                            <Text style={styles.roomText}>1 Bathroom</Text>
                        </View>
                    </View>

                    {/* Middle Row: House Type */}
                    <View style={styles.houseTypeBox}>
                        <Text style={styles.houseTitle}>Small Homes (0–50 sqm)</Text>
                        <Text style={styles.houseDesc}>
                            Perfect for condos, studio units, and small apartments
                        </Text>
                    </View>

                    {/* Bottom Row: Staff & Time */}
                    <View style={styles.footerBox}>
                        <View style={styles.footerItem}>
                            <FontAwesome5 name="user" solid size={14} color="#4B5563" />
                            <Text style={styles.footerText}>1 Cleaner</Text>
                        </View>
                        
                        {/* A tiny divider dot between items */}
                        <View style={styles.dotDivider} />
                        
                        <View style={styles.footerItem}>
                            <FontAwesome5 name="clock" solid size={14} color="#4B5563" />
                            <Text style={styles.footerText}>One hour</Text>
                        </View>
                    </View>

                </View>

                {/* Action Button */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={styles.redirectButton} 
                        activeOpacity={0.8}
                        onPress={() => router.push('/')} // Route back to your actual homepage
                    >
                        <Text style={styles.redirectButtonText}>Redirect back to homepage</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#001851', // FixKo Brand Blue
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 40,
        alignItems: 'center', // Centers everything in the scrollview
    },
    
    // --- Headers & Badges ---
    mainTitle: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 24,
    },
    badgeContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    badgeCheck: {
        position: 'absolute',
        top: 32, // Adjust to center the checkmark perfectly inside the certificate
    },
    serviceStatus: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 32,
    },

    // --- The White Details Card ---
    whiteCard: {
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 16,
        padding: 20,
        marginBottom: 40,
        // Soft shadow to make it pop off the background
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 5,
    },

    // Top Grid (Rooms)
    roomsGrid: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 12,
    },
    roomBox: {
        flex: 1,
        backgroundColor: '#F3F4F6', // Very light gray to distinguish from the white card
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    roomText: {
        color: '#111827',
        fontSize: 13,
        fontWeight: '500',
        marginTop: 8,
    },

    // Middle Box (House Type)
    houseTypeBox: {
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    houseTitle: {
        color: '#111827',
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    houseDesc: {
        color: '#4B5563',
        fontSize: 12,
        lineHeight: 18,
    },

    // Bottom Box (Staff & Time)
    footerBox: {
        flexDirection: 'row',
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    footerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    footerText: {
        color: '#111827',
        fontSize: 13,
        fontWeight: '500',
    },
    dotDivider: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#9CA3AF',
        marginHorizontal: 16, // Spaces the two items nicely
    },

    // --- Buttons ---
    buttonContainer: {
        width: '100%',
    },
    redirectButton: {
        backgroundColor: 'white',
        borderRadius: 30,
        paddingVertical: 16,
        alignItems: 'center',
        width: '100%',
    },
    redirectButtonText: {
        color: '#001851', // Brand blue text
        fontSize: 15,
        fontWeight: 'bold',
    },
});