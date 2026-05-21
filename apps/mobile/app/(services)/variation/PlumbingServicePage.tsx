import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import BackButton from '../../../components/back-button';
import SearchBar from '../components/search-bar';
import SectionHeader from '../components/section-header';
import SectionLabel from '../components/section-label';
import TierSelector from '../components/tier-selector';

const PLUMBING_TIERS = [
    {
        title: 'Faucet Installation',
        rate: '₱300 – ₱700',
        description: 'Includes basic installation and leak check',
    },

    {
        title: 'Toilet Installation',
        rate: '₱800 – ₱1,500',
        description: 'Covers setup, sealing, and functionality testing',
    },

    {
        title: 'Sink Installation',
        rate: '₱500 – ₱1,200',
        description: 'Includes mounting and pipe connection',
    },

    {
        title: 'Shower Installation',
        rate: '₱700 – ₱1,500',
        description: 'Includes fixture setup and water flow testing',
    },
];

export default function PlumbingServicePage() {
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
                    title="Plumbing Services (Per Fixture Pricing)"
                    subtitle="Simple, transparent pricing—pay only for what you need."
                />

                {/* Tier cards */}
                <TierSelector 
                    tiers={PLUMBING_TIERS} 
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