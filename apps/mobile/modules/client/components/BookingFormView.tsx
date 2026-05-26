import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import BackButton from '@/components/ui/back-button';
import SectionHeader from '@/components/ui/section-header';
import Button from '@/components/ui/gradient-button';
import BaseMain from '@/components/layout/(base-main)/BaseMain';

export default function BookingFormView() {
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
        router.push('/(bookings)/mainpage/components/LoadingScreen' as any); 
    };

    return (
        <BaseMain>
            <BackButton />

            <ScrollView 
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <SectionHeader
                    title="Book a Service"
                    subtitle="Book with FixKo today and enjoy quick, dependable, and stress-free home services—all just a tap away."
                    align="center"
                />

                {/* Selected Service Tier Display Card */}
                <View className="flex-row items-center justify-between mt-6 gap-4">
                    <View className="items-center justify-center flex-1">
                        <FontAwesome5 name="hand-sparkles" size={40} color="#7AB1F5" />
                        <View className="bg-[#7AB1F5] rounded-full py-1 px-3 mt-2 w-full items-center">
                            <Text className="text-white text-xs font-bold">Cleaning</Text>
                        </View>
                    </View>
                    
                    <View className="flex-[2.5] bg-white rounded-2xl p-4 shadow-md">
                        <Text className="text-brand-navy-deep text-[15px] font-bold mb-1">Small Homes (0–50 sqm)</Text>
                        <Text className="text-gray-600 text-xs leading-4 mb-1.5">
                            Perfect for condos, studio units, and small apartments
                        </Text>
                        <Text className="text-gray-900 text-[13px] font-semibold">Rate: ₱25–₱35 per sqm</Text>
                    </View>
                </View>

                {/* Details Section */}
                <View className="mt-7">
                    <Text className="text-white text-base font-bold">Fill out the details:</Text>
                    <Text className="text-white text-sm mt-1 opacity-90">How many rooms:</Text>

                    <View className="gap-4 mt-5">
                        {/* Bathroom Counter Row */}
                        <View className="flex-row items-center justify-between bg-white/10 rounded-xl py-3 px-4">
                            <Text className="text-white text-base font-medium">Bathroom</Text>
                            <View className="flex-row items-center gap-4">
                                <TouchableOpacity className="bg-gray-100 w-9 h-9 rounded-full items-center justify-center" onPress={() => setBathrooms(Math.max(0, bathrooms - 1))}>
                                    <Text className="text-gray-900 text-lg font-semibold -mt-0.5">–</Text>
                                </TouchableOpacity>
                                <Text className="text-white text-lg font-bold w-6 text-center">{bathrooms}</Text>
                                <TouchableOpacity className="bg-gray-100 w-9 h-9 rounded-full items-center justify-center" onPress={() => setBathrooms(bathrooms + 1)}>
                                    <Text className="text-gray-900 text-lg font-semibold -mt-0.5">+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Bedroom Counter Row */}
                        <View className="flex-row items-center justify-between bg-white/10 rounded-xl py-3 px-4">
                            <Text className="text-white text-base font-medium">Bedroom</Text>
                            <View className="flex-row items-center gap-4">
                                <TouchableOpacity className="bg-gray-100 w-9 h-9 rounded-full items-center justify-center" onPress={() => setBedrooms(Math.max(0, bedrooms - 1))}>
                                    <Text className="text-gray-900 text-lg font-semibold -mt-0.5">–</Text>
                                </TouchableOpacity>
                                <Text className="text-white text-lg font-bold w-6 text-center">{bedrooms}</Text>
                                <TouchableOpacity className="bg-gray-100 w-9 h-9 rounded-full items-center justify-center" onPress={() => setBedrooms(bedrooms + 1)}>
                                    <Text className="text-gray-900 text-lg font-semibold -mt-0.5">+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Add-ons Section */}
                <View className="mt-7">
                    <Text className="text-white text-lg font-bold mb-3.5">Suggested Add-ons</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
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
                                    className={`bg-white rounded-lg py-3.5 px-4 mr-2.5 w-[145px] h-[70px] justify-center ${isChosen ? 'bg-[#d9eafb] border border-[#0037B7]' : ''}`}
                                >
                                    <Text className="text-brand-navy-deep text-xs font-bold">{addon.name}</Text>
                                    <Text className="text-gray-600 text-[11px] mt-0.5">{addon.meta}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>

                <View className="border-b border-white opacity-40 my-6" />

                <View className="mb-4 items-center">
                    <Text className="text-white text-2xl font-bold">Total Cost: 700 pesos</Text>
                    <Text className="text-white text-sm mt-1 opacity-80">1 Cleaner for 1 hour</Text>
                </View>

                <View className="items-center w-full mt-2.5">
                    <Button 
                        title="Book a Service" 
                        onPress={handleBookService} 
                    />
                </View>

            </ScrollView>
        </BaseMain>
    );
}
