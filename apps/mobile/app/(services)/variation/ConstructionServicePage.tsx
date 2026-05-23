import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import BackButton from '../../../components/back-button';
import SearchBar from '../components/search-bar';
import SectionHeader from '../../../components/section-header';
import SectionLabel from '../components/section-label';
import TierSelector from '../components/tier-selector';

const CONSTRUCTION_TIERS = [
    {
        title: 'Skilled Workers (Mason, Carpenter, Painter)',
        rate: '₱700 – ₱1,200 / day',
        description: 'Includes basic labor for construction, repair, and finishing tasks',
    },
    {
        title: 'Foreman / Supervisor',
        rate: '₱1,200 – ₱2,000 / day',
        description: 'Oversees workers, manages workflow, and ensures project quality',
    },
];

export default function ConstructionServicePage() {
    const router = useRouter();

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
                    title="Explore our Services"
                    subtitle="Whether it's a quick repair or a full home service, FixKo connects you to trusted workers in just a few taps."
                />

                {/* Search Bar */}
                <SearchBar />

                {/* Section label */}
                <SectionLabel
                    title="Construction Services Pricing"
                    subtitle="Hire skilled professionals based on your project needs—flexible and cost-efficient."
                />

                {/* Tier cards */}
                <TierSelector 
                    tiers={CONSTRUCTION_TIERS} 
                    onSelectTier={(title) => console.log('User selected:', title)} 
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

    backButton: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 5,
    },

    scrollView: {
        flex: 1,
        width: '100%',
    },
    
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
});