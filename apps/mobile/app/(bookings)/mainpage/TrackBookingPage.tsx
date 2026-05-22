import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../../components/back-button'; // Double-check file casing matches your disk

const TIMELINE_STEPS = [
    { id: '1', title: 'Booking Confirmed', time: 'Time: 7:00 AM' },
    { id: '2', title: 'Helper Arrived', time: 'Time: 7:20 AM' },
    { id: '3', title: 'Booking Finished', time: 'Time: 8:20 AM' },
    { id: '4', title: 'Pay now', time: 'Time: 8:20 AM' },
];

export default function TrackBookingPage() {
    // State to toggle between the "New" and "Completed" top chips
    const [activeTab, setActiveTab] = useState<'new' | 'completed'>('new');

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Header Area */}
            <View style={styles.header}>
                <BackButton />
                <Text style={styles.headerTitle}>Track Booking</Text>
            </View>

            <ScrollView 
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Meta Support Details Info Section */}
                <Text style={styles.supportText}>Contact Support</Text>
                
                <Text style={styles.estimatedTimeText}>
                    Estimated Time: <Text style={styles.timeHighlight}>7:00 AM – 8:00 AM</Text>
                </Text>
                
                <Text style={styles.noticeText}>We’ll let you know when your helper is here!</Text>

                {/* Tab Pill Selection Switch Bar */}
                <View style={styles.tabBar}>
                    <TouchableOpacity 
                        style={[styles.tabButton, activeTab === 'new' && styles.tabButtonActive]}
                        onPress={() => setActiveTab('new')}
                        activeOpacity={0.9}
                    >
                        <Text style={[styles.tabText, activeTab === 'new' && styles.tabTextActive]}>New</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[styles.tabButton, activeTab === 'completed' && styles.tabButtonCompletedActive]}
                        onPress={() => setActiveTab('completed')}
                        activeOpacity={0.9}
                    >
                        <Text style={[styles.tabText, activeTab === 'completed' && styles.tabTextCompletedActive]}>Completed</Text>
                    </TouchableOpacity>
                </View>

                {/* Timeline Tracking Flow Component */}
                <View style={styles.timelineContainer}>
                    
                    {/* The solid continuous line trailing behind all timeline item circles */}
                    <View style={styles.timelineLine} />

                    {TIMELINE_STEPS.map((step) => (
                        <View key={step.id} style={styles.timelineCard}>
                            {/* Inner white tracking indicator node dot */}
                            <View style={styles.timelineNode} />
                            
                            <View style={styles.cardContent}>
                                <Text style={styles.cardTitle}>{step.title}</Text>
                                <Text style={styles.cardTime}>{step.time}</Text>
                            </View>
                        </View>
                    ))}
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
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 40,
        paddingTop: 10,
    },
    supportText: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 16,
        marginBottom: 16,
    },
    estimatedTimeText: {
        color: 'white',
        fontSize: 16,
        marginBottom: 16,
    },
    timeHighlight: {
        fontWeight: 'bold',
    },
    noticeText: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 24,
    },
    
    // --- Tabs Switcher Bar ---
    tabBar: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 32,
    },
    tabButton: {
        flex: 1,
        borderRadius: 25,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D1D5DB', // default fallback background color style state
    },
    tabButtonActive: {
        backgroundColor: '#4ade80', // green accent unselected
    },
    tabButtonCompletedActive: {
        backgroundColor: '#D1D5DB', // unselected gray background
    },
    tabText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#4B5563',
    },
    tabTextActive: {
        color: '#001851',
    },
    tabTextCompletedActive: {
        color: '#111827',
    },

    // --- Vertical Tree Track Components Layout ---
    timelineContainer: {
        position: 'relative',
        width: '100%',
        gap: 16,
    },
    timelineLine: {
        position: 'absolute',
        left: 31, // Positions perfectly underneath the center coordinates of your circles
        top: 36,  // Begins slightly lower from top boundary point item inside container
        bottom: 36, // Caps alignment tracking height layout properly at terminal point
        width: 1.5,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        zIndex: 1,
    },
    timelineCard: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 35, // High roundness matching the image
        paddingVertical: 18,
        paddingHorizontal: 22,
        backgroundColor: '#001851', // Blends card directly into background container colors
    },
    timelineNode: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'white',
        zIndex: 2, // Layered above the timeline track line element 
        marginRight: 18,
    },
    cardContent: {
        flex: 1,
        justifyContent: 'center',
    },
    cardTitle: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    cardTime: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 12,
    },
});