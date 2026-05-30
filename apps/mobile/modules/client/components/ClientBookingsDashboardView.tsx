import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import BaseMain from '@/components/layout/(base-main)/BaseMain';


import { SERVICE_THEMES } from "@/constants/serviceThemes";
import Bookings from "@/data/DashboardBookings.json";

export default function ClientBookingsDashboardView() {
  const [activeTab, setActiveTab] = useState<'Active' | 'Completed'>('Active');
  const router = useRouter();

  const [bookings] = useState(Bookings);

  const filteredBookings = bookings.filter(item => 
    activeTab === 'Active' ? item.status !== 'Completed' : item.status === 'Completed'
  );

  return (
    <BaseMain>
      <View className="px-5 pt-5 pb-2">

        {/* Dashboard Header Container */}
        <View className="flex-row justify-between items-center mb-5">
          <Text className="text-white text-2xl font-black tracking-tight">Your Bookings</Text>
          <TouchableOpacity 
            onPress={() => router.push('/(client)/booking/BookingPage' as any)}
            className="bg-[#7EB1F1] flex-row items-center gap-1.5 px-4 py-2 rounded-full active:opacity-90 shadow-sm shadow-black/20"
          >
            <Ionicons name="add-circle" size={15} color="#001449" />
            <Text className="text-[#001449] font-extrabold text-xs">New Booking</Text>
          </TouchableOpacity>
        </View>

        {/* Tab Selectors */}
        <View className="flex-row gap-2.5 bg-black/20 p-1 rounded-full border border-white/5">
          <TouchableOpacity 
            onPress={() => setActiveTab('Active')}
            activeOpacity={0.9}
            className={`flex-1 flex-row items-center justify-center py-2.5 px-4 rounded-full ${
              activeTab === 'Active' ? 'bg-white' : 'bg-transparent'
            }`}
          >
            <Text className={`text-xs font-bold mr-2 ${activeTab === 'Active' ? 'text-gray-900' : 'text-white/60'}`}>
              Active Services
            </Text>
            <View className={`w-1.5 h-1.5 rounded-full ${activeTab === 'Active' ? 'bg-green-500' : 'bg-green-500/50'}`} />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => setActiveTab('Completed')}
            activeOpacity={0.9}
            className={`flex-1 flex-row items-center justify-center py-2.5 px-4 rounded-full ${
              activeTab === 'Completed' ? 'bg-white' : 'bg-transparent'
            }`}
          >
            <Text className={`text-xs font-bold mr-2 ${activeTab === 'Completed' ? 'text-gray-900' : 'text-white/60'}`}>
              Completed Records
            </Text>
            <View className={`w-1.5 h-1.5 rounded-full ${activeTab === 'Completed' ? 'bg-[#0037B7]' : 'bg-white/30'}`} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={{ 
          paddingHorizontal: 20, 
          paddingTop: 16, 
          paddingBottom: 110 
        }} 
        showsVerticalScrollIndicator={false}
        className="flex-1"
      >
        <View className="gap-4">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((item) => {
              const theme = SERVICE_THEMES[item.serviceKey] || SERVICE_THEMES.cleaning;
              const isInProgress = item.status === 'In-progress';
              const isAssigned = item.status === 'Assigned';

              return (
                <View 
                  key={item.id} 
                  className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100"
                >
                  {/* Row 1: Profile Info & Custom Status Badges */}
                  <View className="flex-row justify-between items-start mb-3">
                    <View className="flex-1 min-w-0 pr-2">
                      <Text className="text-gray-900 text-base font-black tracking-tight" numberOfLines={1}>
                        {item.workerName}
                      </Text>
                      <Text className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mt-0.5">
                        SCHEDULE: {item.timeWindow}
                      </Text>
                    </View>
                    
                    {/* Status Badges */}
                    <View 
                      style={{
                        backgroundColor: isInProgress ? '#FEF3C7' : isAssigned ? '#DBEAFE' : '#D1FAE5',
                        borderColor: isInProgress ? '#F59E0B' : isAssigned ? '#3B82F6' : '#10B981'
                      }}
                      className="px-3 py-1 rounded-full border"
                    >
                      <Text className={`text-[10px] font-black uppercase tracking-wider ${
                        isInProgress ? 'text-amber-700' : isAssigned ? 'text-blue-700' : 'text-emerald-700'
                      }`}>
                        {item.status}
                      </Text>
                    </View>
                  </View>

                  {/* Row 2: Selected Package Tier Description */}
                  <View className="bg-gray-50 border border-gray-100 rounded-xl p-3.5 my-1.5">
                    <View className="flex-row items-center gap-2 mb-1.5">
                      <FontAwesome5 name={theme.icon} size={11} color="#4B5563" />
                      <Text className="text-gray-800 text-xs font-bold">{theme.name} Package</Text>
                    </View>
                    <Text className="text-gray-900 text-sm font-bold mb-0.5">{item.tierTitle}</Text>
                    <Text className="text-gray-500 text-xs leading-[17px]">{item.tierDescription}</Text>
                  </View>

                  {/* Row 3: Consolidated Layout - Metadata, Price, and Tracker Button Actions */}
                  <View className="flex-row justify-between items-center mt-3 pt-3 border-t border-gray-100">
                    <View className="gap-1 flex-1 min-w-0 pr-2">
                      <View className="flex-row items-center gap-1.5">
                        <FontAwesome5 name="calendar-alt" size={10} color="#94A3B8" />
                        <Text className="text-gray-500 text-xs font-medium">{item.dateString}</Text>
                      </View>
                      <Text className="text-gray-900 text-base font-black mt-0.5">
                        ₱{item.totalCost.toLocaleString('en-US')}
                      </Text>
                    </View>

                    {/* View Status Button */}
                    {item.status !== 'Completed' && (
                      <TouchableOpacity 
                        activeOpacity={0.8}
                        onPress={() => router.push({
                          pathname: '/booking/TrackBookingPage' as any,
                          params: { bookingId: item.id }
                        })}
                        className="bg-[#0037B7] px-5 py-2.5 rounded-full shadow-md shrink-0 active:opacity-90"
                      >
                        <Text className="text-white font-black text-xs uppercase tracking-wider">
                          View Status
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>

                </View>
              );
            })
          ) : (
            <View className="p-8 bg-white/5 border border-dashed border-white/10 rounded-2xl items-center justify-center mt-4">
              <Text className="text-white/40 text-sm font-medium text-center leading-5">
                No records matching this status criteria were located.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </BaseMain>
  );
}