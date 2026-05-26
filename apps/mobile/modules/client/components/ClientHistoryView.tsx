import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import BaseMain from '@/components/layout/(base-main)/BaseMain';
import TopBar from '@/components/ui/top-bar';

const HISTORY_DATA = [
  {
    id: '1',
    workerName: 'Tessa Cruz',
    age: 38,
    gender: 'Female',
    location: 'Rodriguez, Rizal',
    rating: 5,
    reviews: ['"Very accommodating..."', '"Mabait....super nice..."'],
    homeSizeLabel: '(0–50 sqm)',
    homeDesc: 'Perfect for condos, studio units, and small apartments',
    rate: '₱25–₱35 per sqm',
    totalCost: '700 pesos'
  }
];

export default function ClientHistoryView() {
  const router = useRouter();

  return (
    <BaseMain>
      
      <TopBar title="Booking History" />

      <ScrollView 
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 10, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {HISTORY_DATA.map((item) => (
          <View key={item.id} className="bg-white rounded-2xl p-5 mb-5 shadow-lg">
            
            <View className="flex-row items-start">
              <View className="w-[50px] h-[50px] rounded-full bg-[#F3F4F6] justify-center items-center mr-3.5">
                <FontAwesome5 name="user-alt" size={24} color="#A0AEC0" />
              </View>

              <View className="flex-1 justify-center">
                <Text className="text-[#111827] text-lg font-bold">{item.workerName}</Text>
                <Text className="text-[#4B5563] text-[13px] mt-0.5">{item.age} years old | {item.gender}</Text>
                
                <View className="flex-row items-center mt-1.5">
                  <FontAwesome5 name="map-marker-alt" size={12} color="#0037B7" style={{ marginRight: 6 }} />
                  <Text className="text-[#4B5563] text-xs">{item.location}</Text>
                </View>
              </View>

              <View className="flex-row items-center bg-[#FEF3C7] px-2.5 py-1 rounded-xl gap-1">
                <FontAwesome5 name="star" solid size={14} color="#FBBF24" />
                <Text className="text-[#B45309] text-sm font-bold">{item.rating.toFixed(1)}</Text>
              </View>
            </View>

            <View className="mt-4 bg-[#F9FAFB] p-3 rounded-lg">
              {item.reviews.map((review, index) => (
                <Text key={index} className="text-[#6B7280] text-[13px] italic leading-5">{review}</Text>
              ))}
            </View>

            <View className="h-[1px] bg-[#E5E7EB] my-4" />

            <View className="gap-4">
              <View className="flex-row items-start">
                <View className="w-6 items-center mr-3 mt-0.5">
                  <FontAwesome5 name="expand-arrows-alt" size={14} color="#001851" />
                </View>
                <View className="flex-1">
                  <View className="flex-row justify-between items-center mb-1">
                    <Text className="text-[#111827] text-sm font-bold">Home Size</Text>
                    <Text className="text-[#111827] text-sm font-bold">{item.homeSizeLabel}</Text>
                  </View>
                  <Text className="text-[#6B7280] text-xs leading-[18px]">{item.homeDesc}</Text>
                </View>
              </View>

              <View className="flex-row items-start">
                <View className="w-6 items-center mr-3 mt-0.5">
                  <FontAwesome5 name="tags" size={12} color="#001851" />
                </View>
                <View className="flex-1">
                  <View className="flex-row justify-between items-center mb-1">
                    <Text className="text-[#111827] text-sm font-bold">Rate:</Text>
                    <Text className="text-[#111827] text-sm font-bold">{item.rate}</Text>
                  </View>
                </View>
              </View>
            </View>

            <View className="flex-row justify-between items-end mt-6 pt-4 border-t border-t-[#E5E7EB]">
              <View>
                <Text className="text-[#6B7280] text-xs mb-0.5">Total Cost</Text>
                <Text className="text-[#001851] text-lg font-bold">{item.totalCost}</Text>
              </View>

              <TouchableOpacity 
                className="bg-[#4ade80] py-2.5 px-5 rounded-full"
                activeOpacity={0.8}
                onPress={() => {
                  router.push('/(client)/booking/BookingPage' as any);
                }}
              >
                <Text className="text-[#001851] text-sm font-bold">Book again</Text>
              </TouchableOpacity>
            </View>

          </View>
        ))}
      </ScrollView>

    </BaseMain>
  );
}
