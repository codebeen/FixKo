import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../../../components/search-bar';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

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
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.back()}
            >
                <FontAwesome5 name="arrow-left" size={20} color="white" />
            </TouchableOpacity>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <Text style={styles.heading}>Explore our Services</Text>
                <Text style={styles.subheading}>
                    Whether it's a quick repair or a full home service, FixKo connects you to trusted workers in just a few taps.
                </Text>

                <SearchBar />

                {/* Section label */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Plumbing Services (Per Fixture Pricing)</Text>
                    <Text style={styles.sectionSubtitle}>
                        Simple, transparent pricing—pay only for what you need.
                    </Text>
                </View>

                {/* Tier cards */}
                {PLUMBING_TIERS.map((tier) => (
                    <View key={tier.title} style={styles.card}>
                        <Text style={styles.cardTitle}>{tier.title}</Text>
                        <Text style={styles.cardDescription}>{tier.description}</Text>
                        <Text style={styles.cardRate}>{tier.rate}</Text>

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
    heading: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
    },
    subheading: {
        color: 'white',
        marginTop: 6,
        lineHeight: 20,
    },
    sectionHeader: {
        marginTop: 24,
        marginBottom: 4,
    },
    sectionTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    sectionSubtitle: {
        color: 'white',
        marginTop: 5,
        lineHeight: 20,
    },
    card: {
        width: '100%',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginTop: 16,
    },
    cardTitle: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    cardRate: {
        color: '#7AB1F5',
        fontWeight: '600',
        marginBottom: 4,
    },
    cardDescription: {
        color: 'white',
        lineHeight: 20,
    },
    bookButtonWrapper: {
        alignSelf: 'flex-end',
        marginTop: 12,
    },
    bookButton: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 40,
        alignItems: 'center',
    },
    bookButtonText: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '600',
    },
});