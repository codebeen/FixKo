import React from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import BaseMain from '@/components/layout/(base-main)/BaseMain';
import TopBar from '@/components/ui/top-bar';

// Centralized context theme mapping to keep visual tracking indicators uniform
const MODAL_THEMES: Record<string, { name: string; icon: string; primaryIcon: string; secondaryIcon: string }> = {
  carpenter: { name: 'Carpentry', icon: 'hammer', primaryIcon: 'boxes', secondaryIcon: 'tools' },
  cleaning: { name: 'Cleaning', icon: 'broom', primaryIcon: 'bath', secondaryIcon: 'bed' },
  painter: { name: 'Painting', icon: 'paint-roller', primaryIcon: 'layer-group', secondaryIcon: 'paint-brush' },
  electrician: { name: 'Electrical', icon: 'bolt', primaryIcon: 'plug', secondaryIcon: 'charging-station' },
  beauty: { name: 'Beauty', icon: 'cut', primaryIcon: 'spa', secondaryIcon: 'heart' },
  ac_repair: { name: 'AC Repair', icon: 'snowflake', primaryIcon: 'wind', secondaryIcon: 'wrench' },
  plumbing: { name: 'Plumbing', icon: 'wrench', primaryIcon: 'tint', secondaryIcon: 'shield-alt' },
  salon: { name: 'Salon', icon: 'user-tie', primaryIcon: 'cut', secondaryIcon: 'spray-can' },
};

interface ConfirmBookingModalProps {
  visible: boolean;
  onClose: () => void;
  basePrice: number;
  addons: any[]; // Kept for interface backward compatibility if needed
  onConfirm: () => void;
  workerName?: string;
}

export default function ConfirmBookingModal({
  visible,
  onClose,
  basePrice,
  onConfirm,
  workerName
}: ConfirmBookingModalProps) {
  
  // Unpack user selections forwarded from original booking form screen
  const { serviceType, tierTitle, primaryCount, secondaryCount, selectedAddons } = useLocalSearchParams<any>();
  
  const currentKey = serviceType?.toLowerCase() || 'cleaning';
  const theme = MODAL_THEMES[currentKey] || MODAL_THEMES.cleaning;

  // Convert comma-separated string of addon IDs back into an array safely
  const parsedAddons: string[] = selectedAddons ? selectedAddons.split(',').filter(Boolean) : [];

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/65 justify-center items-center px-5">
        <View className="bg-white w-full rounded-[28px] p-6 shadow-2xl border border-gray-100">
          
          {/* Header Title */}
          <Text className="text-xl font-extrabold text-gray-900 text-center mb-4">
            Booking Summary Receipt
          </Text>

          {/* Itemized Info Breakdown Block Layout */}
          <View className="bg-gray-50 rounded-2xl p-4 border border-gray-100 mb-5 gap-3.5">
            
            {/* Row 1: Target Service Context */}
            <View className="flex-row items-center justify-between">
              <Text className="text-gray-400 text-xs font-bold uppercase tracking-wider">Service Selected</Text>
              <View className="flex-row items-center gap-2">
                <FontAwesome5 name={theme.icon} size={12} color="#12357F" />
                <Text className="text-[#12357F] font-bold text-sm">{theme.name}</Text>
              </View>
            </View>

            {/* Row 2: Selected Package Tier Title */}
            <View className="border-t border-gray-200/60 pt-3">
              <Text className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">Chosen Structure</Text>
              <Text className="text-gray-800 font-bold text-sm" numberOfLines={1}>
                {tierTitle || 'Standard Package Allocation'}
              </Text>
            </View>

            {/* Row 3: Simplified Volume text to Quantity / Units */}
            <View className="flex-row border-t border-gray-200/60 pt-3 justify-between items-center">
              <Text className="text-gray-400 text-xs font-bold uppercase tracking-wider">Quantity / Units</Text>
              <View className="flex-row gap-4 items-center">
                <View className="flex-row items-center gap-1.5">
                  <FontAwesome5 name={theme.primaryIcon} size={11} color="#4B5563" />
                  <Text className="text-gray-700 font-extrabold text-xs">{primaryCount || '1'}</Text>
                </View>
                <View className="flex-row items-center gap-1.5">
                  <FontAwesome5 name={theme.secondaryIcon} size={11} color="#4B5563" />
                  <Text className="text-gray-700 font-extrabold text-xs">{secondaryCount || '1'}</Text>
                </View>
              </View>
            </View>

            {/* Row 4: Dynamic Included Add-ons Segment */}
            {parsedAddons.length > 0 && (
              <View className="border-t border-gray-200/60 pt-3">
                <Text className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1.5">Selected Add-ons</Text>
                <View className="gap-1 pl-1">
                  {parsedAddons.map((addonId, index) => (
                    <View key={index} className="flex-row items-center gap-2">
                      <View className="w-1.5 h-1.5 rounded-full bg-brand-yellow-gold" />
                      <Text className="text-gray-700 text-xs font-medium capitalize">
                        {addonId.replace(/_/g, ' ')}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Row 5: Assigned Worker Information */}
            <View className="flex-row border-t border-gray-200/60 pt-3 justify-between items-center">
              <Text className="text-gray-400 text-xs font-bold uppercase tracking-wider">Assigned Specialist</Text>
              <View className="flex-row items-center gap-1.5">
                <FontAwesome5 name="user-check" size={11} color="#DBA92E" />
                <Text className="text-gray-800 font-bold text-xs">{workerName || 'Assigned Specialist'}</Text>
              </View>
            </View>

          </View>

          {/* Pricing Estimation Visualization Row */}
          <View className="flex-row justify-between items-center mb-6 px-1">
            <Text className="text-gray-900 text-base font-bold">Estimated Total:</Text>
            <Text className="text-[#0037B7] text-2xl font-black">
              ₱{basePrice.toLocaleString('en-US')}
            </Text>
          </View>

          {/* Action Trigger Row Buttons */}
          <View className="flex-row gap-3">
            <TouchableOpacity 
              className="flex-1 bg-gray-100 py-3.5 rounded-full items-center active:opacity-80 border border-gray-200/50" 
              onPress={onClose}
              activeOpacity={0.85}
            >
              <Text className="text-gray-600 font-bold text-sm">Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="flex-1 bg-[#0037B7] py-3.5 rounded-full items-center active:opacity-85 shadow-sm shadow-[#0037B7]/20" 
              onPress={onConfirm}
              activeOpacity={0.85}
            >
              <Text className="text-white font-bold text-sm">Confirm & Book</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
  );
}
