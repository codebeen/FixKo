import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import BaseMain from '@/components/layout/(base-main)/BaseMain';

const SERVICES = [
    { id: 'cleaning', name: 'Cleaning', icon: 'broom', desc: 'Home, condo, and deep cleaning services' },
    { id: 'plumbing', name: 'Plumbing', icon: 'wrench', desc: 'Pipe leaks, installations, and repairs' },
    { id: 'carpenter', name: 'Carpenter', icon: 'hammer', desc: 'Carpentry, renovations, and builds' },
    { id: 'electrician', name: 'Electrical', icon: 'bolt', desc: 'Wiring, fixtures, and appliances' },
];
export default function ServicesLandingView() {
    const router = useRouter();

    // Unified dynamic routing method matching your file template [DynamicServiceViewPage]
    const handleServiceNavigation = (slug: string) => {
        router.push({
        pathname: '/(client)/services/variation/DynamicServiceViewPage',
        params: { serviceType: slug },
        });
    };

    return (
        <BaseMain>
            <ScrollView className="flex-1 px-5">
                <View className="mb-6 mt-8">
                    <Text className="text-white text-2xl font-bold">Find a Service</Text>
                    <Text className="text-gray-300 text-sm mt-1">Select a category to view available providers and book</Text>
                </View>

                <View className="gap-4">
                    {SERVICES.map((service) => (
                        <TouchableOpacity
                            key={service.id}
                            activeOpacity={0.8}
                            onPress={() => handleServiceNavigation(service.id)}
                            className="bg-white rounded-2xl p-5 flex-row items-center shadow-md"
                        >
                            <View className="w-12 h-12 rounded-xl bg-[#E6EEFD] items-center justify-center mr-4">
                                <FontAwesome5 name={service.icon} size={22} color="#0037B7" />
                            </View>
                            <View className="flex-1">
                                <Text className="text-[#111827] text-base font-bold">{service.name}</Text>
                                <Text className="text-gray-500 text-xs mt-0.5">{service.desc}</Text>
                            </View>
                            <FontAwesome5 name="chevron-right" size={14} color="#A0AEC0" />
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </BaseMain>
    );
}
