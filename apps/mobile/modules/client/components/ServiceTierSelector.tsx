import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface Tier {
  title: string;
  description: string;
  rate: string;
}

interface ServiceTierSelectorProps {
  tiers: Tier[];
  serviceType: string; // 1. Added this to track which service key we are booking
  onSelectTier?: (title: string) => void;
}

export default function ServiceTierSelector({ tiers, serviceType, onSelectTier }: ServiceTierSelectorProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const router = useRouter();

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    onSelectTier?.(tiers[index].title);
  };

  const handleBook = () => {
    if (selectedIndex === null) return;
    
    const selectedTier = tiers[selectedIndex];

    // 2. Fire the centralized navigation layout and forward the parameters
    router.push({
      pathname: '/(client)/booking/BookingPage' as any,
      params: {
        serviceType: serviceType, // e.g., 'cleaning', 'carpenter'
        tierTitle: selectedTier.title,
        tierRate: selectedTier.rate,
        tierDescription: selectedTier.description
      },
    });
  };

  return (
    <View className="w-full gap-3 mt-2">
      {tiers.map((tier, index) => {
        const isSelected = selectedIndex === index;
        return (
          <TouchableOpacity
            key={index}
            className={`rounded-2xl border p-4 ${
              isSelected
                ? 'bg-brand-yellow-gold/8 border-brand-yellow-gold'
                : 'bg-white/5 border-white/12'
            }`}
            activeOpacity={0.8}
            onPress={() => handleSelect(index)}
          >
            <View className="flex-row items-center justify-between mb-1.5">
              <Text className={`text-[15px] font-bold ${isSelected ? 'text-brand-yellow-gold' : 'text-white'}`}>
                {tier.title}
              </Text>
              <View className={`w-5 h-5 rounded-full border-2 justify-center items-center ${
                isSelected ? 'border-brand-yellow-gold' : 'border-white/25'
              }`}>
                {isSelected && <View className="w-2.5 h-2.5 rounded-full bg-brand-yellow-gold" />}
              </View>
            </View>
            <Text className="text-white/60 text-[12.5px] mb-2 leading-[17px]">{tier.description}</Text>
            <View className="flex-row items-center gap-1.5">
              <Ionicons name="pricetag-outline" size={13} color={isSelected ? '#DBA92E' : 'rgba(255,255,255,0.4)'} />
              <Text className={`text-[13px] font-semibold ${isSelected ? 'text-brand-yellow-gold' : 'text-white/50'}`}>
                {tier.rate}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}

      {selectedIndex !== null && (
        <TouchableOpacity
          className="bg-brand-blue h-[50px] rounded-full justify-center items-center mt-3 shadow-md shadow-brand-blue/20 elevation-3"
          activeOpacity={0.85}
          onPress={handleBook}
        >
          <Text className="text-brand-navy text-[15px] font-bold">Book this Service</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}