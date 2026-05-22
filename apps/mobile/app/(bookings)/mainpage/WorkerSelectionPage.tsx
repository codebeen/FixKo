import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';



import ConfirmBookingModal from './components/ConfirmBookingModal';

// --- MOCK DATA ---
// Replace this with your actual fetched data
const WORKERS = [
    {
        id: '1',
        name: 'Tessa Cruz',
        age: 38,
        gender: 'Female',
        location: 'Rodriguez, Rizal',
        rating: 5.0,
        reviews: ['"Very accommodating.."', '"Mabait...super nice.."']
    },
    {
        id: '2',
        name: 'Tessa Cruz',
        age: 38,
        gender: 'Female',
        location: 'Rodriguez, Rizal',
        rating: 5.0,
        reviews: ['"Very accommodating.."', '"Mabait...super nice.."']
    },
    {
        id: '3',
        name: 'Tessa Cruz',
        age: 38,
        gender: 'Female',
        location: 'Rodriguez, Rizal',
        rating: 5.0,
        reviews: ['"Very accommodating.."', '"Mabait...super nice.."']
    },
];

export default function WorkerSelectionPage() {
    const router = useRouter();
    const [isModalVisible, setModalVisible] = useState(false);




    return (
        <SafeAreaView style={styles.safeArea}>

            <ScrollView 
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Page Headers */}
                <View style={styles.headerContainer}>
                    <Text style={styles.mainHeading}>Supporting Filipino Workers,</Text>
                    <Text style={styles.subHeading}>Serving Every Home.</Text>
                    <Text style={styles.promptText}>We've got just the right one for you!</Text>
                </View>

                {/* Worker Cards List */}
                <View style={styles.listContainer}>
                    {WORKERS.map((worker) => (
                        <View key={worker.id} style={styles.card}>
                            
                            {/* Top Row: Avatar, Info, and Rating */}
                            <View style={styles.cardTopRow}>
                                <View style={styles.avatarPlaceholder} />
                                
                                <View style={styles.infoColumn}>
                                    <Text style={styles.workerName}>{worker.name}</Text>
                                    <Text style={styles.demographics}>{worker.age} years old | {worker.gender}</Text>
                                    
                                    <View style={styles.locationRow}>
                                        <View style={styles.locationIconWrapper}>
                                            <FontAwesome5 name="map-marker-alt" size={10} color="white" />
                                        </View>
                                        <Text style={styles.locationText}>{worker.location}</Text>
                                    </View>
                                </View>

                                {/* Rating Badge */}
                                <View style={styles.ratingBadge}>
                                    <View style={styles.ratingScoreCircle}>
                                        <Text style={styles.ratingScoreText}>{worker.rating.toFixed(1)}</Text>
                                    </View>
                                    <View style={styles.starsRow}>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <FontAwesome5 key={star} name="star" solid size={10} color="#FBBF24" style={styles.starIcon} />
                                        ))}
                                    </View>
                                </View>
                            </View>

                            {/* Bottom Row: Reviews and Action Button */}
                            <View style={styles.cardBottomRow}>
                                <View style={styles.reviewsColumn}>
                                    {worker.reviews.map((review, index) => (
                                        <Text key={index} style={styles.reviewText}>{review}</Text>
                                    ))}
                                </View>

                                {/* 3. Change onPress to open the modal */}
                                <TouchableOpacity 
                                    style={styles.bookButton} 
                                    activeOpacity={0.8} 
                                    onPress={() => setModalVisible(true)} 
                                >
                                    <Text style={styles.bookButtonText}>Book now</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    ))}
                </View>

            </ScrollView>

            <ConfirmBookingModal 
                visible={isModalVisible} 
                onClose={() => setModalVisible(false)} 
                onConfirm={() => {
                    setModalVisible(false); // Close modal first
                    router.push('/(bookings)/mainpage/BookingConfirmationPage'); // Then navigate!
                }}
            />




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
        paddingBottom: 40,
        paddingTop: 20,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 24,
    },
    mainHeading: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subHeading: {
        color: 'white',
        fontSize: 20,
        fontStyle: 'italic',
        fontWeight: '300',
        textAlign: 'center',
        marginBottom: 20,
    },
    promptText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
    },
    listContainer: {
        gap: 16, // Spaces the cards out evenly
    },
    
    // --- Card Styles ---
    card: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    cardTopRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    avatarPlaceholder: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#D1D5DB', // Light grey placeholder
        marginRight: 12,
    },
    infoColumn: {
        flex: 1,
        justifyContent: 'center',
    },
    workerName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#111827',
    },
    demographics: {
        fontSize: 12,
        color: '#4B5563',
        marginTop: 2,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
    },
    locationIconWrapper: {
        backgroundColor: '#0037B7',
        width: 18,
        height: 18,
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 6,
    },
    locationText: {
        fontSize: 12,
        color: '#4B5563',
    },
    
    // --- Rating Badge Styles ---
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#FBBF24',
        borderRadius: 20,
        paddingRight: 8,
        paddingLeft: 2,
        paddingVertical: 2,
    },
    ratingScoreCircle: {
        backgroundColor: '#FBBF24',
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 6,
    },
    ratingScoreText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
    starsRow: {
        flexDirection: 'row',
    },
    starIcon: {
        marginHorizontal: 1,
    },

    // --- Bottom Row Styles ---
    cardBottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginTop: 12,
        marginLeft: 62, // Aligns exactly under the text, skipping the avatar width
    },
    reviewsColumn: {
        flex: 1,
        paddingRight: 10,
    },
    reviewText: {
        fontSize: 12,
        color: '#9CA3AF', // Lighter grey for reviews
        fontStyle: 'italic',
        lineHeight: 18,
    },
    bookButton: {
        backgroundColor: '#4ade80', // Vibrant green from the mockup
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    bookButtonText: {
        color: '#111827',
        fontSize: 14,
        fontWeight: '600',
    },
});