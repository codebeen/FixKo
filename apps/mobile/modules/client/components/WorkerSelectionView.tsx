import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import ConfirmBookingModal from './ConfirmBookingModal';
import Button from '@/components/ui/gradient-button';
import BaseMain from '@/components/layout/(base-main)/BaseMain';

const WORKERS = [
    {
        id: '1',
        name: 'Tessa Cruz',
        age: 38,
        gender: 'Female',
        location: 'Rodriguez, Rizal',
        rating: 5.0,
        reviews: ['"Very accommodating.."', '"Mabait...super nice.."']
    },
    {
        id: '2',
        name: 'Tessa Cruz',
        age: 38,
        gender: 'Female',
        location: 'Rodriguez, Rizal',
        rating: 5.0,
        reviews: ['"Very accommodating.."', '"Mabait...super nice.."']
    },
    {
        id: '3',
        name: 'Tessa Cruz',
        age: 38,
        gender: 'Female',
        location: 'Rodriguez, Rizal',
        rating: 5.0,
        reviews: ['"Very accommodating.."', '"Mabait...super nice.."']
    },
];

export default function WorkerSelectionView() {
    const router = useRouter();
    const [isModalVisible, setModalVisible] = useState(false);

    return (
        <BaseMain>
            <ScrollView 
                contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40, paddingTop: 20 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Page Headers */}
                <View className="items-center mb-6">
                    <Text className="text-white text-[22px] font-bold text-center">Supporting Filipino Workers,</Text>
                    <Text className="text-white text-xl italic font-light text-center mb-5">Serving Every Home.</Text>
                    <Text className="text-white text-base font-medium text-center">We&apos;ve got just the right one for you!</Text>
                </View>

                {/* Worker Cards List */}
                <View className="gap-4">
                    {WORKERS.map((worker) => (
                        <View key={worker.id} className="bg-white rounded-2xl p-4 shadow">
                            
                            {/* Top Row: Avatar, Info, and Rating */}
                            <View className="flex-row items-start">
                                <View className="w-[50px] h-[50px] rounded-full bg-[#D1D5DB] mr-3" />
                                
                                <View className="flex-1 justify-center">
                                    <Text className="text-[16px] font-bold text-[#111827]">{worker.name}</Text>
                                    <Text className="text-xs text-[#4B5563] mt-0.5">{worker.age} years old | {worker.gender}</Text>
                                    
                                    <View className="flex-row items-center mt-1.5">
                                        <View className="bg-[#0037B7] w-4.5 h-4.5 rounded-full items-center justify-center mr-1.5">
                                            <FontAwesome5 name="map-marker-alt" size={10} color="white" />
                                        </View>
                                        <Text className="text-xs text-[#4B5563]">{worker.location}</Text>
                                    </View>
                                </View>

                                {/* Rating Badge */}
                                <View className="flex-row items-center border border-[#FBBF24] rounded-full pr-2 pl-0.5 py-0.5">
                                    <View className="bg-[#FBBF24] w-6 h-6 rounded-full items-center justify-center mr-1.5">
                                        <Text className="text-white text-[10px] font-bold">{worker.rating.toFixed(1)}</Text>
                                    </View>
                                    <View className="flex-row">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <FontAwesome5 key={star} name="star" solid size={10} color="#FBBF24" className="mx-[1px]" />
                                        ))}
                                    </View>
                                </View>
                            </View>

                            {/* Bottom Row: Reviews and Action Button */}
                            <View className="flex-row justify-between items-end mt-3 ml-[62px]">
                                <View className="flex-1 pr-2.5">
                                    {worker.reviews.map((review, index) => (
                                        <Text key={index} className="text-xs text-[#9CA3AF] italic leading-[18px]">{review}</Text>
                                    ))}
                                </View>

                                <Button 
                                    title="Book now" 
                                    compact={true} 
                                    onPress={() => setModalVisible(true)} 
                                />
                            </View>

                        </View>
                    ))}
                </View>
            </ScrollView>

            <ConfirmBookingModal 
                visible={isModalVisible} 
                onClose={() => setModalVisible(false)} 
                basePrice={700}
                addons={[
                    { id: 'iron', name: 'Clothes Ironing', price: 400 },
                    { id: 'disinfect', name: 'Disinfectant', price: 400 }
                ]}
                onConfirm={() => {
                    setModalVisible(false);
                    router.push('/(bookings)/mainpage/BookingConfirmationPage' as any);
                }}
            />
        </BaseMain>
    );
}
