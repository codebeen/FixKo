import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import BaseMain from '@/components/layout/(base-main)/BaseMain';
import TopBar from '@/components/ui/top-bar';
import Button from '@/components/ui/gradient-button';

import { SERVICE_THEMES } from "@/constants/serviceThemes";


export default function BookingConfirmationView() {
  const router = useRouter();

  const { 
    serviceType, 
    totalCost, 
    tierTitle, 
    tierDescription, 
    primaryCount, 
    secondaryCount, 
    workerName,
    selectedAddons 
  } = useLocalSearchParams<any>();

  const currentKey = serviceType?.toLowerCase() || 'cleaning';
  const theme = SERVICE_THEMES[currentKey] || SERVICE_THEMES.cleaning;
  const isCleaning = currentKey === 'cleaning';

  const parsedAddons: string[] = selectedAddons ? selectedAddons.split(',').filter(Boolean) : [];

  return (
    <BaseMain>
      <TopBar title="Booking Success" />

      <ScrollView 
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40, paddingTop: 10 }}
        showsVerticalScrollIndicator={false}
        className="flex-1"
      >
        {/* Animated Checkmark Success Header Badge */}
        <View className="items-center justify-center mt-6 mb-5 relative">
          <FontAwesome5 name="certificate" size={125} color="#4ade80" />
          <FontAwesome5 name="check" size={55} color="#001851" style={{ position: 'absolute', top: 31 }} />
        </View>

        <Text className="text-white text-[26px] font-black text-center mb-6 tracking-tight">
          Booking Confirmed!
        </Text>

        <View className="px-1 gap-4">
          
          {/* Section 1:  Service Context Title Badge */}
          <View className="flex-row justify-between items-center bg-white/5 border border-white/10 rounded-xl px-4 py-3">
            <View className="flex-row items-center gap-2.5 flex-1">
              <FontAwesome5 name={theme.icon} size={15} color="white" />
              <Text className="text-white text-base font-bold" numberOfLines={1}>{theme.name} Services</Text>
            </View>
            <View className="bg-green-500/10 border border-green-500/20 px-2.5 py-0.5 rounded-full">
              <Text className="text-[#4ade80] text-[10px] font-extrabold uppercase tracking-widest">Confirmed</Text>
            </View>
          </View>

          {/* Section 2: Selected Package Tier Display Card */}
          <View className="flex-row items-start bg-white/5 border border-white/10 rounded-2xl p-4">
            <View className="bg-white/10 w-11 h-11 rounded-xl items-center justify-center mr-3.5 mt-0.5">
              <FontAwesome5 name={isCleaning ? "home" : "briefcase"} size={18} color="white" />
            </View>
            <View className="flex-1">
              <Text className="text-white text-sm font-bold mb-1">
                {tierTitle || 'Standard Package Allocation'}
              </Text>
              <Text className="text-white/70 text-xs leading-[17px]">
                {tierDescription || 'Custom job requirement parameter structures successfully registered.'}
              </Text>
            </View>
          </View>

          {/* Section 3: Quantity / Units Counters Segment  */}
          <View className="flex-row bg-white/5 border border-white/10 rounded-2xl p-4 items-center justify-between">
            <View className="flex-1 flex-row items-center justify-center gap-3 px-2">
              <FontAwesome5 name={theme.primaryIcon} size={20} color="white" />
              <Text className="text-white text-base font-bold">
                {primaryCount || '1'} <Text className="text-white/60 text-xs font-normal">Units</Text>
              </Text>
            </View>
            
            <View className="w-[1px] h-6 bg-white/10" />
            
            <View className="flex-1 flex-row items-center justify-center gap-3 px-2">
              <FontAwesome5 name={theme.secondaryIcon} size={20} color="white" />
              <Text className="text-white text-base font-bold">
                {secondaryCount || '1'} <Text className="text-white/60 text-xs font-normal">Tasks</Text>
              </Text>
            </View>
          </View>

          {/* Section 4: Included Add-ons Panel */}
          {parsedAddons.length > 0 && (
            <View className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <Text className="text-white/40 text-[10px] font-bold uppercase tracking-wider mb-2.5">Your Active Add-ons</Text>
              <View className="gap-2 pl-1">
                {parsedAddons.map((addonId, index) => (
                  <View key={index} className="flex-row items-center gap-2.5">
                    <FontAwesome5 name="plus-circle" size={11} color="#DBA92E" />
                    <Text className="text-white/90 text-xs font-semibold capitalize tracking-tight" numberOfLines={1}>
                      {addonId.replace(/_/g, ' ')}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Section 5: Professional Specialist Summary & Cost Block */}
          <View className="bg-white/5 border border-white/10 rounded-2xl p-4 mt-1">
            <Text className="text-brand-yellow text-xl font-black mb-3">
              Total Cost: ₱{parseFloat(totalCost || '700').toLocaleString('en-US')}
            </Text>
            
            <View className="flex-row items-center justify-between border-t border-white/5 pt-3 gap-x-2">
              
              {/* Left Side Container: Specialist Name */}
              <View className="flex-row items-center gap-2 flex-1 min-w-0">
                <FontAwesome5 name="user-check" size={12} color="rgba(255,255,255,0.6)" />
                <Text 
                  className="text-white/80 text-xs font-bold" 
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {workerName || 'Assigned Specialist'} ({theme.providerLabel})
                </Text>
              </View>
              
              {/* Right Side Container: Dispatch Status */}
              <View className="flex-row items-center gap-2 shrink-0 ml-2">
                <FontAwesome5 name="clock" size={12} color="rgba(255,255,255,0.6)" />
                <Text className="text-white/80 text-xs font-medium">
                  Standard Dispatch
                </Text>
              </View>

            </View>
          </View>

        </View>

        {/* Section 6: Action Controls */}
        <View className="gap-2.5 mt-8 px-1">
          <Button 
            title="Proceed to Payment Options"
            onPress={() => router.push('/(client)/payment/PaymentMethodPage' as any)}
          />

          <TouchableOpacity 
            className="border border-white/20 bg-white/5 rounded-full py-3.5 items-center w-full active:bg-white/10 mt-1" 
            activeOpacity={0.8} 
            onPress={() => router.push('/(client)/booking/TrackBookingPage' as any)}
          >
            <Text className="text-white text-base font-bold tracking-tight">Track Helper Status</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </BaseMain>
  );
}