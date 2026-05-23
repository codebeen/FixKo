import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import SearchBar from './components/search-bar';
import SectionHeader from '../../components/section-header';
import GradientButton from '../../components/gradient-button';
import ServicesGrid from './components/services-grid';

export default function ServicesLandingScreen() {
    const router = useRouter();

    const allServices = [
        { icon: 'hand-sparkles', label: 'Cleaning',     route: '/(services)/variation/CleaningServicePage' },
        { icon: 'hard-hat',      label: 'Construction', route: '/(services)/variation/ConstructionServicePage' },
        { icon: 'spa',           label: 'Massage',      route: '/(services)/variation/MassageServicePage' },
        { icon: 'seedling',      label: 'Gardening',    route: '/(services)/variation/GardeningServicePage' },
        { icon: 'faucet',        label: 'Plumbing',     route: '/(services)/variation/PlumbingServicePage' },
        { icon: 'car',           label: 'Carwash',      route: '/(services)/variation/CarwashServicePage' },
        { icon: 'plug',          label: 'Electrical',   route: '/(services)/variation/ElectricalServicePage' },
        { icon: 'paw',           label: 'Pet Care',     route: '/(services)/variation/PetCareServicePage' },
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >

                {/* Header */}
                <SectionHeader
                    title="Explore our Services"
                    subtitle="Whether it's a quick repair or a full home service, FixKo connects you to trusted workers in just a few taps."
                    align="center"
                />

                {/* Search Bar */}
                <SearchBar />

                {/* Services grid */}
                <ServicesGrid services={allServices} />

                <GradientButton 
                    title="See more" 
                    onPress={() => router.push('/(services)/variation/CleaningServicePage')} 
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
    scrollContent: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        alignItems: 'center',
    },
});