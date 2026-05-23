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

    const [bathrooms, setBathrooms] = useState(1);
    const [bedrooms, setBedrooms] = useState(1);
    const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

    const toggleAddon = (name: string) => {
        if (selectedAddons.includes(name)) {
            setSelectedAddons(selectedAddons.filter(item => item !== name));
        } else {
            setSelectedAddons([...selectedAddons, name]);
        }
    };

    const handleBookService = () => {
        router.push('/(bookings)/mainpage/components/LoadingScreen'); 
    };

    return (
        <SafeAreaView style={styles.safeArea}>
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
                    
                    <View style={styles.whiteCard}>
                        <Text style={styles.whiteCardTitle}>Small Homes (0–50 sqm)</Text>
                        <Text style={styles.whiteCardDesc}>
                            Perfect for condos, studio units, and small apartments
                        </Text>
                        <Text style={styles.whiteCardRate}>Rate: ₱25–₱35 per sqm</Text>
                    </View>
                </View>

                {/* Details Section */}
                <View style={styles.sectionBlock}>
                    <Text style={styles.sectionLabel}>Fill out the details:</Text>
                    <Text style={styles.sectionSubLabel}>How many rooms:</Text>

                    <View style={styles.counterRow}>
                        {/* Bathroom Counter Row */}
                        <View style={styles.stepperContainer}>
                            <Text style={styles.stepperLabel}>Bathroom</Text>
                            <View style={styles.stepperControls}>
                                <TouchableOpacity style={styles.stepperButton} onPress={() => setBathrooms(Math.max(0, bathrooms - 1))}>
                                    <Text style={styles.stepperSymbol}>–</Text>
                                </TouchableOpacity>
                                <Text style={styles.stepperValue}>{bathrooms}</Text>
                                <TouchableOpacity style={styles.stepperButton} onPress={() => setBathrooms(bathrooms + 1)}>
                                    <Text style={styles.stepperSymbol}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Bedroom Counter Row */}
                        <View style={styles.stepperContainer}>
                            <Text style={styles.stepperLabel}>Bedroom</Text>
                            <View style={styles.stepperControls}>
                                <TouchableOpacity style={styles.stepperButton} onPress={() => setBedrooms(Math.max(0, bedrooms - 1))}>
                                    <Text style={styles.stepperSymbol}>–</Text>
                                </TouchableOpacity>
                                <Text style={styles.stepperValue}>{bedrooms}</Text>
                                <TouchableOpacity style={styles.stepperButton} onPress={() => setBedrooms(bedrooms + 1)}>
                                    <Text style={styles.stepperSymbol}>+</Text>
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

                <View style={styles.divider} />

                <View style={styles.totalBlock}>
                    <Text style={styles.totalText}>Total Cost: 700 pesos</Text>
                    <Text style={styles.totalSubText}>1 Cleaner for 1 hour</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <Button 
                        title="Book a Service" 
                        onPress={handleBookService} 
                    />
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#001851' },
    scrollView: { flex: 1 },
    scrollContent: { paddingHorizontal: 24, paddingBottom: 40 },
    
    // --- Service Card ---
    summaryCardRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 24, gap: 16 },
    serviceIconContainer: { alignItems: 'center', justifyContent: 'center', flex: 1 },
    serviceBadge: { backgroundColor: '#7AB1F5', borderRadius: 20, paddingVertical: 4, paddingHorizontal: 12, marginTop: 8, width: '100%', alignItems: 'center' },
    serviceBadgeText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
    whiteCard: { flex: 2.5, backgroundColor: 'white', borderRadius: 16, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4 },
    whiteCardTitle: { color: '#001851', fontSize: 15, fontWeight: 'bold', marginBottom: 4 },
    whiteCardDesc: { color: '#4B5563', fontSize: 12, lineHeight: 16, marginBottom: 6 },
    whiteCardRate: { color: '#111827', fontSize: 13, fontWeight: '600' },
    
    // --- Section Headers ---
    sectionBlock: { marginTop: 28 },
    sectionLabel: { color: 'white', fontSize: 16, fontWeight: 'bold' },
    sectionSubLabel: { color: 'white', fontSize: 14, marginTop: 4, opacity: 0.9 },
    sectionLabelHeader: { color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 14 },

    // --- Steppers ---
    counterRow: { gap: 16, marginTop: 20 },
    stepperContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 16 },
    stepperLabel: { color: 'white', fontSize: 16, fontWeight: '500' },
    stepperControls: { flexDirection: 'row', alignItems: 'center', gap: 16 },
    stepperButton: { backgroundColor: '#F3F4F6', width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
    stepperSymbol: { color: '#111827', fontSize: 18, fontWeight: '600', marginTop: -2 },
    stepperValue: { color: 'white', fontSize: 18, fontWeight: 'bold', width: 24, textAlign: 'center' },

    // --- Addons ---
    addonsScroll: { flexDirection: 'row' },
    addonCard: { backgroundColor: 'white', borderRadius: 8, paddingVertical: 14, paddingHorizontal: 16, marginRight: 10, width: 145, height: 70, justifyContent: 'center' },
    addonCardSelected: { backgroundColor: '#d9eafb', borderWidth: 1, borderColor: '#0037B7' },
    addonTitle: { color: '#001851', fontSize: 12, fontWeight: 'bold' },
    addonMeta: { color: '#4B5563', fontSize: 11, marginTop: 2 },

    // --- Footer ---
    divider: { borderBottomWidth: 1, borderBottomColor: 'white', opacity: 0.4, marginVertical: 24 },
    totalBlock: { marginBottom: 16, alignItems: 'center' },
    totalText: { color: 'white', fontSize: 22, fontWeight: 'bold' },
    totalSubText: { color: 'white', fontSize: 14, marginTop: 4, opacity: 0.8 },

    // --- New Button Container ---
    buttonContainer: {
        alignItems: 'center', 
        width: '100%',
        marginTop: 10,
    }
});