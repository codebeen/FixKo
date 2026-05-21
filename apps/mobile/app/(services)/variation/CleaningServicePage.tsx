import React, { useState } from 'react';
import { ScrollView, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import BackButton from '../../../components/back-button';
import SearchBar from '../components/search-bar';
import SectionHeader from '../components/section-header';
import SectionLabel from '../components/section-label';
import TierSelector from '../components/tier-selector';

// const { width } = Dimensions.get('window');

const CLEANING_TIERS = [
    {
        title: 'Small Homes (0–50 sqm)',
        description: 'Perfect for condos, studio units, and small apartments',
        rate: '₱25–₱35 per sqm',
    },
    {
        title: 'Medium Homes (51–120 sqm)',
        description: 'Ideal for standard apartments and small family houses',
        rate: '₱30–₱45 per sqm',
    },
    {
        title: 'Large Homes (121–250 sqm)',
        description: 'Best for bigger family homes with multiple rooms',
        rate: '₱40–₱60 per sqm',
    },
];

export default function CleaningServicePage() {
    const router = useRouter();
    const [selectedTier, setSelectedTier] = useState<string | null>(null);

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
                    title="Variations for Cleaning Services"
                    subtitle="Flexible pricing based on home size—bigger spaces, more time and effort."
                />

                {/* Tier cards */}
                <TierSelector 
                    tiers={CLEANING_TIERS} 
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
        flexDirection: 'row',
        alignItems: 'center',
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