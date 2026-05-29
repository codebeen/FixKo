import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import BaseMain from '@/components/layout/(base-main)/BaseMain';
import bookingsData from '@/data/Bookings.json';

export default function WorkerHomeDashboardView() {
  const router = useRouter();
  const [isOnline, setIsOnline] = useState(true);

  // Job leads sourced from Bookings.json
  const jobLeads = bookingsData.map((booking) => ({
    id: booking.id,
    title: booking.title,
    client: booking.client,
    price: `₱${booking.price.toLocaleString()}`,
    distance: booking.distance,
    // full params for JobOverview navigation
    address: booking.address,
    status: booking.status,
    propertySize: booking.propertySize,
    rate: booking.rate,
    example: booking.example,
    schedule: booking.schedule,
    contact: booking.contact,
    tasks: JSON.stringify(booking.tasks),
  }));

  // Active (confirmed) bookings — max 2
  const activeBookings = bookingsData
    .filter((b) => b.status === 'confirmed')
    .slice(0, 2)
    .map((booking) => ({
      id: booking.id,
      title: booking.title,
      client: booking.client,
      address: booking.address,
      price: `₱${booking.price.toLocaleString()}`,
      status: booking.status,
      propertySize: booking.propertySize,
      rate: booking.rate,
      example: booking.example,
      schedule: booking.schedule,
      contact: booking.contact,
      tasks: JSON.stringify(booking.tasks),
    }));

  return (
    <BaseMain>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60 }} className="flex-1 px-5 pt-4">

        {/* Header Greeting & Quick Toggle */}
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-brand-grey-light text-xs font-semibold uppercase tracking-wider">Worker Dashboard</Text>
            <Text className="text-white text-2xl font-bold mt-0.5">Hi, Shanella!</Text>
            <View className="flex-row items-center mt-1">
              <View className={`w-2 h-2 rounded-full mr-1.5 ${isOnline ? 'bg-brand-green' : 'bg-brand-grey-light'}`} />
              <Text className="text-[#AAB8C2] text-xs font-semibold">
                {isOnline ? 'Accepting booking requests' : 'Currently offline'}
              </Text>
            </View>
          </View>

          <View className="flex-row items-center bg-white/5 border border-white/10 rounded-full px-3 py-1.5 gap-2">
            <Text className="text-white text-[11px] font-bold">{isOnline ? 'ONLINE' : 'OFFLINE'}</Text>
            <Switch
              value={isOnline}
              onValueChange={setIsOnline}
              trackColor={{ false: '#767577', true: '#4ade80' }}
              thumbColor={isOnline ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Stats Grid */}
        <View className="flex-row gap-3 mb-6">
          <View className="flex-1 bg-white/10 border border-white/15 rounded-2xl p-4">
            <Text className="text-brand-grey-light text-[10px] font-bold uppercase tracking-wider">Today's Earnings</Text>
            <Text className="text-white text-lg font-extrabold mt-1">₱1,250</Text>
            <Text className="text-[#4ade80] text-[9px] font-bold mt-1">2 jobs completed</Text>
          </View>
          <View className="flex-1 bg-white/10 border border-white/15 rounded-2xl p-4">
            <Text className="text-brand-grey-light text-[10px] font-bold uppercase tracking-wider">Acceptance Rate</Text>
            <Text className="text-white text-lg font-extrabold mt-1">98.5%</Text>
            <Text className="text-brand-yellow text-[9px] font-bold mt-1">High performer</Text>
          </View>
        </View>

        {/* Current Active Job Box */}
        <Text className="text-brand-yellow text-xs font-bold uppercase tracking-wider mb-3 px-1">Active Booking Assignment</Text>
        {activeBookings.map((booking) => (
          <TouchableOpacity
            key={booking.id}
            onPress={() => router.push({
              pathname: '/(worker)/booking/ArrivedWorker' as any,
              params: {
                title: booking.title,
                client: booking.client,
                address: booking.address,
                status: booking.status,
                propertySize: booking.propertySize,
                rate: booking.rate,
                example: booking.example,
                schedule: booking.schedule,
                contact: booking.contact,
                tasks: booking.tasks,
              },
            })}
            className="bg-brand-blue/15 border border-brand-blue/30 rounded-2xl p-5 mb-3"
          >
            <View className="flex-row justify-between items-start mb-3">
              <View className="flex-1 mr-3">
                <Text className="text-white text-base font-bold">{booking.client}</Text>
                <Text className="text-[#7EB1F1] text-xs font-semibold">{booking.title}</Text>
                <Text className="text-brand-grey-light text-[11px] mt-1">Address: {booking.address}</Text>
              </View>
              <View className="bg-[#4ade80]/20 px-2 py-0.5 rounded-full border border-[#4ade80]/30">
                <Text className="text-[#4ade80] text-[9px] font-bold">ACTIVE</Text>
              </View>
            </View>
            <View className="h-[1px] bg-white/10 my-3" />
            <View className="flex-row justify-between items-center">
              <Text className="text-white/60 text-xs">Payout: {booking.price}</Text>
              <View className="bg-brand-blue px-6 py-1.5 rounded-full">
                <Text className="text-[#001449] font-bold text-xs">Go to Job Page</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* Job Leads Nearby */}
        <View className="flex-row justify-between items-center mb-4 px-1">
          <Text className="text-brand-yellow text-xs font-bold uppercase tracking-wider">Job Leads Nearby</Text>
          <TouchableOpacity onPress={() => router.push('/(worker)/(tabs)/bookings' as any)}>
            <Text className="text-brand-blue text-xs font-semibold">View Leads</Text>
          </TouchableOpacity>
        </View>

        {jobLeads.slice(0, 3).map(lead => (
          <View
            key={lead.id}
            className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-3 flex-row justify-between items-center"
          >
            <View className="flex-1 mr-4">
              <Text className="text-white text-sm font-bold">{lead.title}</Text>
              <Text className="text-brand-grey-light text-xs mt-0.5">Client: {lead.client} • {lead.distance}</Text>
              <Text className="text-brand-yellow text-xs font-semibold mt-1">Payout: {lead.price}</Text>
            </View>
            <TouchableOpacity
              onPress={() => router.push({
                pathname: '/(worker)/booking/JobOverview' as any,
                params: {
                  title: lead.title,
                  client: lead.client,
                  address: lead.address,
                  status: lead.status,
                  propertySize: lead.propertySize,
                  rate: lead.rate,
                  example: lead.example,
                  schedule: lead.schedule,
                  contact: lead.contact,
                  tasks: lead.tasks,
                },
              })}
              className="bg-[#4ade80]/20 border border-[#4ade80]/30 px-4 py-2 rounded-full"
            >
              <Text className="text-[#4ade80] text-xs font-bold">View Details</Text>
            </TouchableOpacity>
          </View>
        ))}

      </ScrollView>
    </BaseMain>
  );
}
