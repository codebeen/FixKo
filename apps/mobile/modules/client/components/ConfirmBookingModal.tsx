import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import BaseModal from '@/components/ui/modal/base-modal';

export type AddonItem = {
    id: string;
    name: string;
    price: number;
};

type ConfirmBookingModalProps = {
    visible: boolean;
    onClose: () => void;
    onConfirm: () => void;
    basePrice?: number; 
    addons?: AddonItem[]; 
};

export default function ConfirmBookingModal({ 
    visible, 
    onClose, 
    onConfirm, 
    basePrice = 700,
    addons = [] 
}: ConfirmBookingModalProps) {
    const totalCost = addons.reduce((sum, addon) => sum + addon.price, basePrice);

    return (
        <BaseModal visible={visible} onClose={onClose}>
            
            {/* Top Header Row */}
            <View className="flex-row justify-between items-center mb-6">
                <TouchableOpacity className="flex-row items-center" onPress={onClose}>
                    <Text className="text-[14px] text-gray-900 font-bold mr-1.5">✕</Text>
                    <Text className="text-[14px] text-gray-900 font-medium">Close</Text>
                </TouchableOpacity>

                <View className="bg-[#E6F4EA] py-1 px-2.5 rounded">
                    <Text className="text-[#1E8E3E] text-[10px] font-bold tracking-[0.5px]">TO CONFIRM</Text>
                </View>
            </View>

            <Text className="text-xl text-gray-700 mb-5">Booking Summary</Text>

            {/* Service Profile Row */}
            <View className="flex-row items-center mb-6">
                <View className="w-[60px] h-[60px] bg-gray-100 rounded-lg justify-center items-center mr-4">
                    <FontAwesome5 name="broom" size={24} color="#A0AEC0" />
                </View>
                
                <View className="flex-1">
                    <Text className="text-gray-500 text-xs mb-0.5">Type: Cleaning</Text>
                    <Text className="text-gray-900 text-[15px] font-medium mb-1">Small Homes (0–50 sqm)</Text>
                    <Text className="text-gray-500 text-xs leading-4">
                        Perfect for condos, studio units, and small apartments
                    </Text>
                </View>
            </View>

            {/* 3-Column Attributes Grid */}
            <View className="flex-row justify-between mb-6">
                <View className="flex-1">
                    <Text className="text-gray-500 text-[13px] mb-1.5">Rooms</Text>
                    <Text className="text-gray-900 text-[13px] font-bold">1 Bed, 1 Bath</Text>
                </View>
                <View className="flex-1">
                    <Text className="text-gray-500 text-[13px] mb-1.5">Cleaners</Text>
                    <Text className="text-gray-900 text-[13px] font-bold">1</Text>
                </View>
                <View className="flex-1 items-end">
                    <Text className="text-gray-500 text-[13px] mb-1.5">Duration</Text>
                    <Text className="text-gray-900 text-[13px] font-bold">1 hr</Text>
                </View>
            </View>

            {/* Dynamic Receipt Box */}
            <View className="bg-gray-50 rounded-xl p-5 mb-6">
                
                {/* Base Service */}
                <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-gray-600 text-sm">Base Service</Text>
                    <Text className="text-gray-900 text-sm font-medium">₱{basePrice}</Text>
                </View>

                {/* Dynamically Render Add-ons if they exist */}
                {addons.length > 0 && (
                    <View className="mt-1">
                        {addons.map((addon) => (
                            <View key={addon.id} className="flex-row justify-between items-center mb-2">
                                <Text className="text-gray-500 text-[13px] pl-2">+ {addon.name}</Text>
                                <Text className="text-gray-900 text-sm font-medium">₱{addon.price}</Text>
                            </View>
                        ))}
                    </View>
                )}

                <View className="h-[1px] bg-gray-200 my-3" />

                {/* Grand Total */}
                <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-gray-900 text-base font-bold">Total</Text>
                    <Text className="text-brand-navy-deep text-lg font-bold">₱{totalCost}</Text>
                </View>
            </View>

            {/* Action Buttons Side-by-Side */}
            <View className="flex-row gap-3">
                <TouchableOpacity 
                    className="flex-1 bg-gray-100 py-3.5 rounded-lg items-center" 
                    activeOpacity={0.8} 
                    onPress={onClose}
                >
                    <Text className="text-gray-600 text-[15px] font-bold">Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    className="flex-1 bg-brand-navy-deep py-3.5 rounded-lg items-center" 
                    activeOpacity={0.8} 
                    onPress={onConfirm}
                >
                    <Text className="text-white text-[15px] font-bold">Confirm</Text>
                </TouchableOpacity>
            </View>

        </BaseModal>
    );
}
