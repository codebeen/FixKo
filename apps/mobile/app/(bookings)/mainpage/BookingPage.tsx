import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import BackButton from '../../../components/back-button';
import SectionHeader from '../../../components/section-header';
import Button from '../../../components/gradient-button';



export default function BookingPage() {
    const router = useRouter();
    // Counter states for details section
    const [bathrooms, setBathrooms] = useState(1);
    const [bedrooms, setBedrooms] = useState(1);

    // Mock states for chosen add-ons (toggles selection styling)
    const [selectedAddons, setSelectedAddons] = useState<string[]>([]);


    const toggleAddon = (name: string) => {
        if (selectedAddons.includes(name)) {
            setSelectedAddons(selectedAddons.filter(item => item !== name));
        } else {
            setSelectedAddons([...selectedAddons, name]);
        }
    };

    // Simplified handle function!
    const handleBookService = () => {
        // Just push to the dedicated loading route instantly
        router.push('/(bookings)/mainpage/components/LoadingScreen'); 
    };


    return (
        <SafeAreaView style={styles.safeArea}>

            {/* Back button */}
            <BackButton />

            <ScrollView 
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <SectionHeader
                    title="Book a Service"
                    subtitle="Book with FixKo today and enjoy quick, dependable, and stress-free home services—all just a tap away."
                    align="center"
                />

                {/* Selected Service Tier Display Card */}
                <View style={styles.summaryCardRow}>
                    <View style={styles.serviceIconContainer}>
                        <FontAwesome5 name="hand-sparkles" size={40} color="#7AB1F5" />
                        <View style={styles.serviceBadge}>
                            <Text style={styles.serviceBadgeText}>Cleaning</Text>
                        </View>
                    </View>
                    
                    <View style={styles.glassCard}>
                        <Text style={styles.glassCardTitle}>Small Homes (0–50 sqm)</Text>
                        <Text style={styles.glassCardDesc}>
                            Perfect for condos, studio units, and small apartments
                        </Text>
                        <Text style={styles.glassCardRate}>Rate: ₱25–₱35 per sqm</Text>
                    </View>
                </View>

                {/* Details Section */}
                <View style={styles.sectionBlock}>
                    <Text style={styles.sectionLabel}>Fill out the details:</Text>
                    <Text style={styles.sectionSubLabel}>How many rooms:</Text>

                    <View style={styles.counterRow}>
                        {/* Bathroom Counter */}
                        <View style={styles.counterBox}>
                            <Text style={styles.counterText}>Bathroom {bathrooms}</Text>
                            <View style={styles.actions}>
                                <TouchableOpacity onPress={() => setBathrooms(Math.max(0, bathrooms + 1))}>
                                    <FontAwesome5 name="plus" size={12} color="white" style={styles.iconPadding} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setBathrooms(Math.max(0, bathrooms - 1))}>
                                    <FontAwesome5 name="minus" size={12} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Bedroom Counter */}
                        <View style={styles.counterBox}>
                            <Text style={styles.counterText}>Bedroom {bedrooms}</Text>
                            <View style={styles.actions}>
                                <TouchableOpacity onPress={() => setBedrooms(Math.max(0, bedrooms + 1))}>
                                    <FontAwesome5 name="plus" size={12} color="white" style={styles.iconPadding} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setBedrooms(Math.max(0, bedrooms - 1))}>
                                    <FontAwesome5 name="minus" size={12} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Add-ons Section */}
                <View style={styles.sectionBlock}>
                    <Text style={styles.sectionLabelHeader}>Suggested Add-ons</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.addonsScroll}>
                        {[
                            { id: 'iron', name: 'Clothes Ironing', meta: '400 | 30 pcs' },
                            { id: 'disinfect', name: 'Disinfectant Cleaning', meta: '400 | 30 pcs' },
                            { id: 'cabinet', name: 'Cabinet Cleaning', meta: '500 | 2 cabinets' },
                        ].map((addon) => {
                            const isChosen = selectedAddons.includes(addon.id);
                            return (
                                <TouchableOpacity 
                                    key={addon.id} 
                                    activeOpacity={0.9}
                                    onPress={() => toggleAddon(addon.id)}
                                    style={[styles.addonCard, isChosen && styles.addonCardSelected]}
                                >
                                    <Text style={styles.addonTitle}>{addon.name}</Text>
                                    <Text style={styles.addonMeta}>{addon.meta}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>

                {/* Pricing Calculation Divider Line */}
                <View style={styles.divider} />

                {/* Total Cost Presentation Footer Block */}
                <View style={styles.totalBlock}>
                    <Text style={styles.totalText}>Total Cost: 700 pesos</Text>
                    <Text style={styles.totalSubText}>1 Cleaner for 1 hour</Text>
                </View>

                {/* Final Primary Submission Button */}
                <Button 
                    title="Book a Service" 
                    onPress={handleBookService} // Use the new function here!
                />


            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#001851',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    summaryCardRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 24,
        gap: 16,
    },
    serviceIconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    serviceBadge: {
        backgroundColor: '#7AB1F5',
        borderRadius: 20,
        paddingVertical: 4,
        paddingHorizontal: 12,
        marginTop: 8,
        width: '100%',
        alignItems: 'center',
    },
    serviceBadgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    glassCard: {
        flex: 2.5,
        backgroundColor: 'rgba(255, 255, 255, 0.2)', 
        borderColor: 'rgba(255, 255, 255, 0.4)',      
        borderWidth: 1,                               
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
    },
    glassCardTitle: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    glassCardDesc: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 12,
        lineHeight: 16,
        marginBottom: 6,
    },
    glassCardRate: {
        color: 'white',
        fontSize: 13,
        fontWeight: '600',
    },
    sectionBlock: {
        marginTop: 28,
    },
    sectionLabel: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    sectionSubLabel: {
        color: 'white',
        fontSize: 14,
        marginTop: 4,
        opacity: 0.9,
    },
    counterRow: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 14,
    },
    counterBox: {
        flex: 1,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 14,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    counterText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconPadding: {
        marginRight: 14,
    },
    sectionLabelHeader: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 14,
    },
    addonsScroll: {
        flexDirection: 'row',
    },
    addonCard: {
        backgroundColor: 'white',
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 16,
        marginRight: 10,
        width: 145,
        height: 70,
        justifyContent: 'center',
    },
    addonCardSelected: {
        backgroundColor: '#d9eafb',
        borderWidth: 1,
        borderColor: '#0037B7',
    },
    addonTitle: {
        color: '#001851',
        fontSize: 12,
        fontWeight: 'bold',
    },
    addonMeta: {
        color: '#4B5563',
        fontSize: 11,
        marginTop: 2,
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        opacity: 0.4,
        marginVertical: 24,
    },
    totalBlock: {
        marginBottom: 28,
    },
    totalText: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
    },
    totalSubText: {
        color: 'white',
        fontSize: 14,
        marginTop: 4,
        opacity: 0.8,
    },
    bookButton: {
        backgroundColor: '#1cc824',
        borderRadius: 30,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: 10,
    },
    bookButtonText: {
        color: '#001851',
        fontSize: 16,
        fontWeight: 'bold',
    },

});