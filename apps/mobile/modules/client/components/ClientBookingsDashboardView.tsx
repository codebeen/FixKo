import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import BaseMain from '@/components/layout/(base-main)/BaseMain';

export default function ClientBookingsDashboardView() {
  const [activeTab, setActiveTab] = useState('Online');
  const router = useRouter();

  const bookingData = [
    { id: '1', name: 'Shanella A. Cagulang', stars: 5, service: 'Cleaning', status: 'In-progress' },
    { id: '2', name: 'Nadine A. Borja', stars: 4, service: 'Plumbing', status: 'Completed' },
    { id: '3', name: 'Althea Amor Asis', stars: 5, service: 'Cleaning', status: 'Assigned' },
  ];

  return (
    <BaseMain>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View className="flex-row justify-between items-center mb-7.5">
          <Text className="text-white text-2xl font-bold">Bookings Dashboard</Text>
          <TouchableOpacity 
            onPress={() => router.push('/(client)/booking/BookingPage' as any)}
            className="bg-brand-blue flex-row items-center gap-1 px-3 py-1.5 rounded-full"
          >
            <Ionicons name="add-circle" size={16} color="#001449" />
            <Text className="text-brand-navy font-bold text-xs">New Book</Text>
          </TouchableOpacity>
        </View>

        {/* Welcome Card */}
        <View className="bg-[#D1D5DB] rounded-[25px] p-[25px] flex-row items-center mb-6">
          <View className="flex-1">
            <Text className="text-[28px] font-bold text-[#001540]">Welcome!</Text>
            <TouchableOpacity onPress={() => router.push('/(client)/booking/TrackBookingPage' as any)}>
              <Text className="text-[#0056D2] text-sm underline mt-1.25">Track active booking progress</Text>
            </TouchableOpacity>
          </View>
          <Text className="text-[40px]">💡</Text>
        </View>

        {/* Toggle Buttons */}
        <View className="flex-row gap-2.5 mb-6">
          <TouchableOpacity 
            onPress={() => setActiveTab('Online')}
            className={`flex-row items-center py-2.5 px-5 rounded-[25px] border border-white ${
              activeTab === 'Online' ? 'bg-white' : 'bg-transparent'
            }`}
          >
            <Text className={`font-semibold mr-2 ${activeTab === 'Online' ? 'text-black' : 'text-white'}`}>Active Services</Text>
            <View className="w-2.5 h-2.5 rounded-full bg-[#4CAF50]" />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => setActiveTab('Offline')}
            className={`flex-row items-center py-2.5 px-5 rounded-[25px] border border-white ${
              activeTab === 'Offline' ? 'bg-white' : 'bg-transparent'
            }`}
          >
            <Text className={`font-semibold mr-2 ${activeTab === 'Offline' ? 'text-black' : 'text-white'}`}>Completed</Text>
            <View className="w-2.5 h-2.5 rounded-full bg-white" />
          </TouchableOpacity>
        </View>

        {/* Bookings List Card */}
        <View className="bg-white rounded-[15px] p-5">
          {bookingData
            .filter(item => activeTab === 'Online' ? item.status !== 'Completed' : item.status === 'Completed')
            .map((item, index, filteredData) => (
              <View key={item.id}>
                <View className="my-1.25">
                  <View className="flex-row justify-between items-center">
                    <Text className="text-[#001540] text-base font-bold">{item.name}</Text>
                    <View className="flex-row gap-[2px]">
                      {[...Array(item.stars)].map((_, i) => (
                        <Ionicons key={i} name="star" size={14} color="#FFE600" />
                      ))}
                    </View>
                  </View>
                  
                  <Text className="text-xs text-[#666] mt-0.5">Type of Service: {item.service}</Text>
                  <Text className="text-[13px] font-bold text-black my-0.5">Small Homes (0–50 sqm)</Text>
                  <Text className="text-xs text-[#444] leading-[18px]">
                    Perfect for condos, studio units, and small apartments
                  </Text>
                  
                  <View className="flex-row justify-between items-center mt-3">
                    <TouchableOpacity onPress={() => router.push('/(client)/(tabs)/reviews' as any)}>
                      <Text className="text-[#00C853] text-xs font-bold">See Reviews</Text>
                    </TouchableOpacity>
                    {item.status === 'In-progress' && (
                      <TouchableOpacity 
                        onPress={() => router.push('/(client)/booking/TrackBookingPage' as any)}
                        className="bg-brand-blue/20 border border-brand-blue/30 px-3 py-1 rounded-full"
                      >
                        <Text className="text-brand-blue font-bold text-[10px]">TRACK JOB</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
                {index !== filteredData.length - 1 && <View className="h-[1px] bg-[#EEE] my-3.75" />}
              </View>
            ))}
        </View>

      </ScrollView>
    </BaseMain>
  );
}
