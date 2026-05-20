import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../../../components/search-bar';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

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
                    <Text style={styles.sectionTitle}>Construction Services Pricing</Text>
                    <Text style={styles.sectionSubtitle}>
                        Hire skilled professionals based on your project needs—flexible and cost-efficient.
                    </Text>
                </View>

                {/* Tier cards */}
                {CONSTRUCTION_TIERS.map((tier) => (
                    <View key={tier.title} style={styles.card}>
                        <Text style={styles.cardTitle}>{tier.title}</Text>
                        <Text style={styles.cardRate}>{tier.rate}</Text>
                        <Text style={styles.cardDescription}>{tier.description}</Text>
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