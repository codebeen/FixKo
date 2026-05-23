import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';


import PageHeader from '../../components/page-header';


const HISTORY_DATA = [
    {
        id: '1',
        workerName: 'Tessa Cruz',
        age: 38,
        gender: 'Female',
        location: 'Rodriguez, Rizal',
        rating: 5,
        reviews: ['"Very accommodating..."', '"Mabait....super nice..."'],
        homeSizeLabel: '(0–50 sqm)',
        homeDesc: 'Perfect for condos, studio units, and small apartments',
        rate: '₱25–₱35 per sqm',
        totalCost: '700 pesos'
    }
];

export default function HistoryPage() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.safeArea}>
            
            <PageHeader title="History" />

            <ScrollView 
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {HISTORY_DATA.map((item) => (
                    <View key={item.id} style={styles.card}>
                        
                        {/* --- TOP SECTION: Profile & Rating --- */}
                        <View style={styles.profileRow}>
                            {/* Avatar Placeholder */}
                            <View style={styles.avatar}>
                                <FontAwesome5 name="user-alt" size={24} color="#A0AEC0" />
                            </View>

                            {/* Worker Info */}
                            <View style={styles.infoCol}>
                                <Text style={styles.workerName}>{item.workerName}</Text>
                                <Text style={styles.demographics}>{item.age} years old | {item.gender}</Text>
                                
                                <View style={styles.locationRow}>
                                    <FontAwesome5 name="map-marker-alt" size={12} color="#0037B7" style={styles.pinIcon} />
                                    <Text style={styles.locationText}>{item.location}</Text>
                                </View>
                            </View>

                            {/* Rating Badge */}
                            <View style={styles.ratingBox}>
                                <FontAwesome5 name="star" solid size={14} color="#FBBF24" />
                                <Text style={styles.ratingNumber}>{item.rating.toFixed(1)}</Text>
                            </View>
                        </View>

                        {/* --- REVIEWS SECTION --- */}
                        <View style={styles.reviewsBox}>
                            {item.reviews.map((review, index) => (
                                <Text key={index} style={styles.reviewText}>{review}</Text>
                            ))}
                        </View>

                        <View style={styles.divider} />

                        {/* --- DETAILS SECTION --- */}
                        <View style={styles.detailsSection}>
                            
                            {/* Home Size Row */}
                            <View style={styles.detailRow}>
                                <View style={styles.detailIconWrapper}>
                                    <FontAwesome5 name="expand-arrows-alt" size={14} color="#001851" />
                                </View>
                                <View style={styles.detailTextCol}>
                                    <View style={styles.detailTitleRow}>
                                        <Text style={styles.detailTitle}>Home Size</Text>
                                        <Text style={styles.detailValue}>{item.homeSizeLabel}</Text>
                                    </View>
                                    <Text style={styles.detailDesc}>{item.homeDesc}</Text>
                                </View>
                            </View>

                            {/* Rate Row */}
                            <View style={styles.detailRow}>
                                <View style={styles.detailIconWrapper}>
                                    <FontAwesome5 name="tags" size={12} color="#001851" />
                                </View>
                                <View style={styles.detailTextCol}>
                                    <View style={styles.detailTitleRow}>
                                        <Text style={styles.detailTitle}>Rate:</Text>
                                        <Text style={styles.detailValue}>{item.rate}</Text>
                                    </View>
                                </View>
                            </View>

                        </View>

                        {/* --- FOOTER: Cost & Action --- */}
                        <View style={styles.cardFooter}>
                            <View>
                                <Text style={styles.totalLabel}>Total Cost</Text>
                                <Text style={styles.totalCost}>{item.totalCost}</Text>
                            </View>

                            <TouchableOpacity 
                                style={styles.bookAgainBtn}
                                activeOpacity={0.8}
                                onPress={() => {
                                    // Navigate to the booking flow for this specific worker!
                                    // router.push('/(bookings)/mainpage/WorkerSelectionPage')
                                }}
                            >
                                <Text style={styles.bookAgainText}>Book again</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                ))}
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
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 40,
    },

    // --- Card Container ---
    card: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 5,
    },

    // --- Profile Section ---
    profileRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },

    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },

    infoCol: {
        flex: 1,
        justifyContent: 'center',
    },

    workerName: {
        color: '#111827',
        fontSize: 18,
        fontWeight: 'bold',
    },

    demographics: {
        color: '#4B5563',
        fontSize: 13,
        marginTop: 2,
    },

    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
    },

    pinIcon: {
        marginRight: 6,
    },

    locationText: {
        color: '#4B5563',
        fontSize: 12,
    },

    ratingBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FEF3C7', 
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        gap: 4,
    },

    ratingNumber: {
        color: '#B45309', 
        fontSize: 14,
        fontWeight: 'bold',
    },

    // --- Reviews Section ---
    reviewsBox: {
        marginTop: 16,
        backgroundColor: '#F9FAFB', 
        padding: 12,
        borderRadius: 8,
    },

    reviewText: {
        color: '#6B7280',
        fontSize: 13,
        fontStyle: 'italic',
        lineHeight: 20,
    },

    divider: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginVertical: 16,
    },

    // --- Details Section ---
    detailsSection: {
        gap: 16,
    },

    detailRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },

    detailIconWrapper: {
        width: 24,
        alignItems: 'center',
        marginRight: 12,
        marginTop: 2,
    },

    detailTextCol: {
        flex: 1,
    },

    detailTitleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },

    detailTitle: {
        color: '#111827',
        fontSize: 14,
        fontWeight: 'bold',
    },

    detailValue: {
        color: '#111827',
        fontSize: 14,
        fontWeight: 'bold',
    },

    detailDesc: {
        color: '#6B7280',
        fontSize: 12,
        lineHeight: 18,
    },

    // --- Footer Section ---
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginTop: 24,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
    },

    totalLabel: {
        color: '#6B7280',
        fontSize: 12,
        marginBottom: 2,
    },

    totalCost: {
        color: '#001851', 
        fontSize: 18,
        fontWeight: 'bold',
    },

    bookAgainBtn: {
        backgroundColor: '#4ade80', 
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },

    bookAgainText: {
        color: '#001851', 
        fontSize: 14,
        fontWeight: 'bold',
    },
});