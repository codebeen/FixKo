import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import BaseMain from '@/components/layout/(base-main)/BaseMain';
import TopBar from '@/components/ui/top-bar';
import BaseModal from '@/components/ui/modal/BaseModal';
import ClientName from '@/modules/worker/components/bookingheader/ClientName';

const { width } = Dimensions.get('window');

import Stepper from '@/modules/worker/components/stepper/Stepper';

export default function ArrivedWorkerView() {
  const {
    title, client, address, status, propertySize,
    rate, example, schedule, contact, tasks, activeTab
  } = useLocalSearchParams();

  const [hasArrived, setHasArrived] = useState(false);
  const [arrivalTime, setArrivalTime] = useState('');
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const getFormattedTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutesStr} ${ampm}`;
  };

  const handleArrival = () => {
    const timeStr = getFormattedTime();
    setArrivalTime(timeStr);
    setHasArrived(true);
    setSuccessModalVisible(true);
  };

  const handleModalClose = () => {
    setSuccessModalVisible(false);
    handleProceed();
  };



  const handleProceed = () => {
    router.push({
      pathname: '/booking/StartJob',
      params: {
        title: title || '',
        client: client || '',
        address: address || '',
        propertySize: propertySize || '',
        rate: rate || '',
        example: example || '',
        schedule: schedule || '',
        contact: contact || '',
        tasks: tasks || '',
        status: status || '',
        activeTab: activeTab || ''
      }
    });
  };

  return (
    <BaseMain theme="navy" scrollable={false}>
      <TopBar title="Track Booking" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40, alignItems: 'center' }}>
        <Stepper currentStep={1} />
        
        {/* Client Section */}
        <ClientName />

        {/* Map Preview Section */}
        <View className="w-full rounded-[15px] overflow-hidden h-[180px] mb-5 border border-white/15 bg-[#1E2D4A]">
          <View className="flex-1 justify-center items-center p-4">
            <Ionicons name="location" size={28} color="#66EE66" className="mb-2" />
            <Text className="text-white font-bold text-sm mb-1 text-center">
              {hasArrived ? 'You have arrived at destination' : 'Navigating to client location'}
            </Text>
            {address && (
              <Text className="text-white/60 text-xs text-center max-w-[85%] mb-2" numberOfLines={2}>
                {address}
              </Text>
            )}
            <View className="bg-white/10 px-3 py-1 rounded-full border border-white/10">
              <Text className="text-[#66EE66] text-xs font-semibold">
                {hasArrived ? 'Arrival confirmed' : 'ETA: 12 minutes (1.4 km)'}
              </Text>
            </View>
          </View>
        </View>

        {/* Travel Preparation Checklist Card */}
        <View className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 mb-5">
          <View className="flex-row items-center mb-3">
            <Ionicons name="shield-checkmark-outline" size={18} color="#66EE66" style={{ marginRight: 6 }} />
            <Text className="text-white text-base font-bold">Pre-Arrival Checklist</Text>
          </View>
          
          <View className="space-y-3">
            <View className="flex-row items-start mb-2.5">
              <Ionicons name="checkbox-outline" size={16} color="#66EE66" style={{ marginRight: 8, marginTop: 2 }} />
              <Text className="text-white/80 text-sm flex-1">
                Wear your official FixKo worker shirt and ID card.
              </Text>
            </View>

            <View className="flex-row items-start mb-2.5">
              <Ionicons name="checkbox-outline" size={16} color="#66EE66" style={{ marginRight: 8, marginTop: 2 }} />
              <Text className="text-white/80 text-sm flex-1">
                Confirm you have all required cleaning kits and equipment.
              </Text>
            </View>

            <View className="flex-row items-start mb-2.5">
              <Ionicons name="checkbox-outline" size={16} color="#66EE66" style={{ marginRight: 8, marginTop: 2 }} />
              <Text className="text-white/80 text-sm flex-1">
                Keep the client updated via chat if you experience travel delays.
              </Text>
            </View>

            <View className="flex-row items-start">
              <Ionicons name="checkbox-outline" size={16} color="#66EE66" style={{ marginRight: 8, marginTop: 2 }} />
              <Text className="text-white/80 text-sm flex-1">
                Tap the "I have Arrived" button below as soon as you reach the property gate.
              </Text>
            </View>
          </View>
        </View>

        {/* Job Details Card */}
        <View className="w-full bg-white rounded-2xl p-5 mb-5 border border-white/10 shadow-lg">
          <Text className="text-[#001540] text-sm font-bold tracking-[0.5px] mb-3 uppercase">Job Details</Text>
          
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-500 text-xs">Service Type</Text>
            <Text className="text-[#001540] text-xs font-semibold">{title || 'House Cleaning'}</Text>
          </View>

          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-500 text-xs">Schedule Time</Text>
            <Text className="text-[#001540] text-xs font-semibold">{schedule || 'Today'}</Text>
          </View>

          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-500 text-xs">Payout Payout</Text>
            <Text className="text-[#66EE66] text-xs font-bold bg-[#66EE66]/10 px-2 py-0.5 rounded">{rate || '₱700'}</Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-500 text-xs">Contact Client</Text>
            <Text className="text-[#001540] text-xs font-semibold">{contact || 'N/A'}</Text>
          </View>
        </View>

        {/* Action Button Section */}
        <View className="w-full px-5 items-center justify-center">
          {!hasArrived ? (
            <TouchableOpacity
              className="bg-[#66EE66] h-[50px] rounded-[25px] items-center justify-center shadow-md w-full"
              onPress={handleArrival}
              activeOpacity={0.8}
            >
              <Text className="text-[#001540] font-bold text-base">
                I have Arrived at the Location
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              className="bg-[#66EE66] h-[50px] rounded-[25px] items-center justify-center shadow-md w-full"
              onPress={handleProceed}
              activeOpacity={0.8}
            >
              <Text className="text-[#001540] font-bold text-base">
                Proceed to Start Job
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      {/* Success Confirmation Modal */}
      <BaseModal
        visible={successModalVisible}
        onClose={handleModalClose}
        autoDismiss={1000}
        overlayClassName="absolute inset-0 bg-black/45"
        cardClassName="absolute top-[60px] right-5 bg-brand-navy-dark rounded-2xl border border-white/15 w-[320px] max-w-full px-5 py-[18px] shadow-2xl"
      >
        <View className="flex-row items-center">
          <View className="w-11 h-11 rounded-full bg-[#66EE66]/15 justify-center items-center mr-4">
            <Ionicons name="checkmark-done" size={24} color="#66EE66" />
          </View>
          <View className="flex-1">
            <Text className="text-white text-base font-bold tracking-[0.3px]">Arrival Confirmed!</Text>
            <Text className="text-white/95 text-xs mt-0.5 leading-[17px]">
              We have notified {client || 'the client'} of your arrival. Please coordinate with them to start.
            </Text>
          </View>
        </View>
      </BaseModal>
      
    </BaseMain>
  );
}
