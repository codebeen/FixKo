import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import BaseMain from '@/components/layout/(base-main)/BaseMain';
import TopBar from '@/components/ui/top-bar';

export default function BookingConfirmationView() {
  const router = useRouter();

  return (
    <BaseMain>
      
      <TopBar title="Booking Success" />

      <ScrollView 
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40, paddingTop: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center justify-center mt-7.5 mb-6 relative">
          <FontAwesome5 name="certificate" size={130} color="#4ade80" />
          <FontAwesome5 name="check" size={60} color="#001851" style={{ position: 'absolute', top: 32 }} />
        </View>

        <Text className="text-white text-[26px] font-bold text-center mb-7.5">Booking Confirmed!</Text>

        <View className="px-2.5">
          <View className="flex-row justify-between items-center mb-5 pr-10">
            <View className="flex-row items-center gap-2">
              <FontAwesome5 name="broom" size={18} color="white" />
              <Text className="text-white text-base">Cleaning</Text>
            </View>
            <View className="flex-row items-center gap-2">
              <FontAwesome5 name="info-circle" size={18} color="white" />
              <Text className="text-white text-base">Details</Text>
            </View>
          </View>

          <View className="flex-row items-start mb-5">
            <FontAwesome5 name="home" size={24} color="white" className="mt-0.5 mr-3.5" />
            <View className="flex-1">
              <Text className="text-white text-sm font-bold mb-1">Small Homes (0–50 sqm)</Text>
              <Text className="text-white text-xs leading-[18px] opacity-90">Perfect for condos, studio units, and small apartments</Text>
            </View>
          </View>

          <View className="flex-row gap-10 mb-5">
            <View className="flex-row items-center gap-3">
              <FontAwesome5 name="bed" size={28} color="white" />
              <Text className="text-white text-xl font-bold">2</Text>
            </View>
            <View className="flex-row items-center gap-3">
              <FontAwesome5 name="bath" size={28} color="white" />
              <Text className="text-white text-xl font-bold">4</Text>
            </View>
          </View>

          <View className="h-[1px] bg-white/40 w-full mb-4" />

          <Text className="text-white text-base font-bold mb-2">Total Cost: 700 pesos</Text>
          <View className="flex-row gap-10 mb-7.5">
            <View className="flex-row items-center gap-1.5">
              <FontAwesome5 name="user" solid size={14} color="white" />
              <Text className="text-white text-xs">1 Cleaner</Text>
            </View>
            <View className="flex-row items-center gap-1.5">
              <FontAwesome5 name="clock" solid size={14} color="white" />
              <Text className="text-white text-xs">One hour</Text>
            </View>
          </View>
        </View>

        <View className="gap-3 mt-2.5">
          <TouchableOpacity 
            className="bg-white rounded-full py-3.5 items-center w-full" 
            activeOpacity={0.8} 
            onPress={() => router.push('/(client)/booking/TrackBookingPage' as any)}
          >
            <Text className="text-[#111827] text-base font-semibold">Track Helper Status</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="bg-[#4ade80] rounded-full py-3.5 items-center w-full" 
            activeOpacity={0.8} 
            onPress={() => router.push('/(client)/payment/PaymentMethodPage' as any)}
          >
            <Text className="text-[#111827] text-base font-semibold">Proceed to Payment Options</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </BaseMain>
  );
}
