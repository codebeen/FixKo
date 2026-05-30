import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import ConfirmBookingModal from './ConfirmBookingModal';
import Button from '@/components/ui/gradient-button';
import BaseMain from '@/components/layout/(base-main)/BaseMain';

import WORKERS_JSON from '@/data/Workers.json';

export default function WorkerSelectionView() {
  const router = useRouter();
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<any>(null);

  const { 
    serviceType, 
    totalCost,
    tierTitle,
    tierDescription,
    primaryCount,
    secondaryCount
  } = useLocalSearchParams<{ 
    serviceType: string; 
    totalCost: string; 
    tierTitle: string;
    tierDescription: string;
    primaryCount: string;
    secondaryCount: string;
  }>();

  const currentServiceKey = serviceType?.toLowerCase() || 'cleaning';
  const numericCost = parseFloat(totalCost || '0');

  const matchedWorkers = WORKERS_JSON.filter((worker) =>
    worker.skills.includes(currentServiceKey)
  );

  const handleOpenBooking = (worker: any) => {
    setSelectedWorker(worker);
    setModalVisible(true);
  };

  return (
    <BaseMain>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40, paddingTop: 20 }}
        showsVerticalScrollIndicator={false}
        className="flex-1"
      >
        {/* Page Headers Container */}
        <View className="items-center mb-8 mt-4">
          <Text className="text-white text-2xl font-extrabold tracking-tight text-center">
            Supporting Filipino Workers,
          </Text>
          <Text className="text-brand-yellow text-lg italic font-light text-center mt-0.5">
            Serving Every Home.
          </Text>
          <View className="bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mt-5 flex-row items-center gap-2">
            <Ionicons name="sparkles" size={13} color="#DBA92E" />
            <Text className="text-white/80 text-xs font-semibold text-center">
              We found {matchedWorkers.length} matching specialists near you!
            </Text>
          </View>
        </View>

        {/* Worker Cards List Layout */}
        <View className="gap-4">
          {matchedWorkers.length > 0 ? (
            matchedWorkers.map((worker) => (
              <View 
                key={worker.id} 
                className="bg-white rounded-2xl p-5 shadow-sm"
              >
                {/* Top Layout Row: Avatar Image  */}
                <View className="flex-row items-start">
                  <View className="w-14 h-14 rounded-full bg-[#E6EEFD] border-2 border-[#12357F]/10 items-center justify-center mr-4">
                    <FontAwesome5 name="user-alt" size={20} color="#12357F" />
                  </View>
                  
                  <View className="flex-1 justify-center">
                    <View className="flex-row items-center gap-2">
                      <Text className="text-base font-bold text-[#111827]">{worker.name}</Text>
                      <View className="bg-[#DBA92E]/10 border border-[#DBA92E]/20 px-1.5 py-0.5 rounded">
                        <Text className="text-[#DBA92E] text-[9px] font-bold uppercase tracking-wider">Verified</Text>
                      </View>
                    </View>
                    
                    <Text className="text-xs text-[#4B5563] mt-0.5">
                      {worker.age} years old • {worker.gender}
                    </Text>
                    
                    {/* Job Tracker Stats */}
                    <Text className="text-[#94A3B8] text-[11px] font-medium mt-1">
                      {worker.completedJobs} successful bookings completed
                    </Text>
                  </View>

                  {/* Rating Badge Asset */}
                  <View className="flex-row items-center bg-[#DBA92E]/10 border border-[#DBA92E]/30 rounded-full px-2.5 py-1">
                    <FontAwesome5 name="star" solid size={10} color="#DBA92E" />
                    <Text className="text-[#DBA92E] text-xs font-bold ml-1.5">
                      {worker.rating.toFixed(1)}
                    </Text>
                  </View>
                </View>

                {/* Central Divider */}
                <View className="w-full border-t border-gray-100 my-4" />

                {/* Bottom Layout Row: Feedback description alongside rounded button elements */}
                <View className="flex-row justify-between items-center gap-4">
                  <View className="flex-1 pr-2">
                    <View className="flex-row items-center gap-1.5 mb-1">
                      <FontAwesome5 name="comment-alt" size={9} color="#94A3B8" />
                      <Text className="text-[#94A3B8] text-[10px] font-bold uppercase tracking-wider">Recent Feedback</Text>
                    </View>
                    {worker.reviews.map((review, index) => (
                      <Text 
                        key={index} 
                        className="text-[#64748B] text-[11.5px] italic leading-[16px]" 
                        numberOfLines={1}
                      >
                        {review}
                      </Text>
                    ))}
                  </View>

                  <Button 
                    title="Book now" 
                    compact={true} 
                    onPress={() => handleOpenBooking(worker)} 
                  />
                </View>

                {/* Geo location status tag label footer */}
                <View className="flex-row items-center mt-3 bg-gray-50 self-start rounded-full px-2.5 py-1">
                  <FontAwesome5 name="map-marker-alt" size={9} color="#12357F" />
                  <Text className="text-[#4B5563] text-[11px] font-medium ml-1.5">{worker.location}</Text>
                </View>

              </View>
            ))
          ) : (
            <View className="p-6 bg-white/5 border border-dashed border-white/10 rounded-2xl items-center mt-4">
              <Text className="text-gray-400 text-sm text-center font-medium">
                No active matching technicians currently listed in this specific area block. Check back soon!
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      <ConfirmBookingModal 
        visible={isModalVisible}
        onClose={() => setModalVisible(false)} 
        basePrice={numericCost}
        addons={[]}
        workerName={selectedWorker?.name || 'Assigned Specialist'}
        onConfirm={() => {
          setModalVisible(false);
          router.push({
            pathname: '/booking/BookingConfirmationPage' as any,
            params: {
              serviceType: currentServiceKey,
              totalCost: totalCost || '0',
              tierTitle: tierTitle || '',
              tierDescription: tierDescription || '',
              primaryCount: primaryCount || '1',
              secondaryCount: secondaryCount || '1',
              workerName: selectedWorker?.name || 'Assigned Specialist'
            }
          });
        }}
      />
    </BaseMain>
  );
}