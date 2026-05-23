import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackButton from '../../../components/back-button'; 
import Button from '../../../components/gradient-button'; 
import BookingStepper, { StepType } from './components/BookingStepper'; 


const TIMELINE_STEPS: StepType[] = [
    { id: '1', title: 'Booking Confirmed', time: 'Time: 7:00 AM', icon: 'check', status: 'completed' },
    { id: '2', title: 'Helper Arrived', time: 'Time: 7:20 AM', icon: 'truck', status: 'upcoming' },
    { id: '3', title: 'Booking Finished', time: 'Time: 8:20 AM', icon: 'clock', status: 'upcoming' },
    { id: '4', title: 'Pay now', time: 'Time: 8:20 AM', icon: 'wallet', status: 'upcoming' },
];

export default function TrackBookingPage() {
    const [activeTab, setActiveTab] = useState<'new' | 'completed'>('new');

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <BackButton />
                <Text style={styles.headerTitle}>Track Booking</Text>
            </View>

            <ScrollView 
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.supportText}>Contact Support</Text>
                
                <Text style={styles.estimatedTimeText}>
                    Estimated Time: <Text style={styles.timeHighlight}>7:00 AM – 8:00 AM</Text>
                </Text>
                
                <Text style={styles.noticeText}>We’ll let you know when your helper is here!</Text>

                <View style={styles.tabBar}>
                    <TouchableOpacity 
                        style={[styles.tabButton, activeTab === 'new' && styles.tabButtonActive]}
                        onPress={() => setActiveTab('new')}
                        activeOpacity={0.9}
                    >
                        <Text style={[styles.tabText, activeTab === 'new' && styles.tabTextActive]}>New</Text>
                    </TouchableOpacity>

                    {/* <Button 
                        title="New" 
                        onPress={() => setActiveTab('new')}
                        compact={true} 
                    /> */}

                    <TouchableOpacity 
                        style={[styles.tabButton, activeTab === 'completed' && styles.tabButtonCompletedActive]}
                        onPress={() => setActiveTab('completed')}
                        activeOpacity={0.9}
                    >
                        <Text style={[styles.tabText, activeTab === 'completed' && styles.tabTextCompletedActive]}>Completed</Text>
                    </TouchableOpacity>
                </View>

                {/* 3. The New Stepper wrapped in a White Card! */}
                <View style={styles.stepperCard}>
                    <BookingStepper steps={TIMELINE_STEPS} />
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
        backgroundColor: '#D1D5DB', 
    },
    tabButtonActive: {
        backgroundColor: '#4ade80', 
    },
    tabButtonCompletedActive: {
        backgroundColor: '#D1D5DB', 
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
    
    // --- NEW: White Wrapper Card for the Stepper Component ---
    stepperCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 24, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 5,
    }
});