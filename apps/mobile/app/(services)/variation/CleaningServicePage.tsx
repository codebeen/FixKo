import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../../../components/search-bar';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const SERVICE_TIERS = [
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
                    <Text style={styles.sectionTitle}>Variations for Cleaning Services</Text>
                    <Text style={styles.sectionSubtitle}>
                        Flexible pricing based on home size—bigger spaces, more time and effort.
                    </Text>
                </View>

                {/* Tier cards */}
                {SERVICE_TIERS.map((tier) => (
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
        width: '100%',           // ← fixes the cut-off issue
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
        marginBottom: 6,
    },

    cardDescription: {
        color: 'white',
        lineHeight: 20,
    },

    cardRate: {
        color: '#7AB1F5',
        fontWeight: '600',
        marginTop: 6,
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