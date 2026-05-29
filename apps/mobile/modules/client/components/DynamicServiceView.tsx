import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import BackButton from '@/components/ui/back-button';
import SectionHeader from '@/components/ui/section-header';
import ClientSearchBar from './ClientSearchBar';
import ClientSectionLabel from './ClientSectionLabel';
import ServiceTierSelector from './ServiceTierSelector';
import BaseMain from '@/components/layout/(base-main)/BaseMain';

// 1. Directly import your JSON data from your relative path
import SERVICES_JSON from '@/data/Services.json'; 

// 2. Define TypeScript structures to avoid lookup compilation errors
interface ServiceStructure {
    title: string;
    subtitle: string;
    tiers: {
    title: string;
    rate: string;
    description: string;
    }[];
}

// Map the keys strictly to the typed structure
const SERVICES_DATA = SERVICES_JSON as Record<string, ServiceStructure>;

export default function DynamicServiceView() {
    const { serviceType } = useLocalSearchParams<{ serviceType: string }>();

    // Use a string matching fallback key
    const currentServiceKey = serviceType?.toLowerCase() || 'cleaning';
    const serviceData = SERVICES_DATA[currentServiceKey];

    if (!serviceData) {
        return (
            <BaseMain>
            <BackButton />
            <View className="flex-1 justify-center items-center">
                <Text className="text-gray-500">Service type not found.</Text>
            </View>
            </BaseMain>
        );
    }

    return (
    <BaseMain>
        <BackButton />
        <ScrollView
        className="flex-1 w-full"
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        >
        <SectionHeader
            title="Explore our Services"
            subtitle="Whether it's a quick repair or a full home service, FixKo connects you to trusted workers in just a few taps."
        />
        <ClientSearchBar />
        
        <ClientSectionLabel
            title={serviceData.title}
            subtitle={serviceData.subtitle}
        />
        
        {serviceData.tiers && serviceData.tiers.length > 0 ? (
            <ServiceTierSelector 
                tiers={serviceData.tiers}  
                serviceType={currentServiceKey} // Passes 'cleaning', 'carpenter', etc.
            />
        ) : (
            <View className="mt-8 items-center p-6 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <Text className="text-gray-400 font-medium text-center">
                Pricing structures are being finalized for this service. Check back soon!
            </Text>
            </View>
        )}
        </ScrollView>
    </BaseMain>
    );
}