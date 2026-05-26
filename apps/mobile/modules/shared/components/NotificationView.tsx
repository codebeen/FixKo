import React from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import BaseMain from '@/components/layout/(base-main)/BaseMain';
import { useUserRole } from '../hooks/useUserRole';

interface AppNotification {
  id: string;
  title: string;
  body: string;
  time: string;
  type: 'booking' | 'payment' | 'review' | 'system';
  unread: boolean;
}

export default function NotificationView() {
  const role = useUserRole();
  const router = useRouter();

  const clientNotifications: AppNotification[] = [
    { id: '1', title: 'Booking Request Confirmed', body: 'Shanella Cagulang has accepted your booking for cleaning service.', time: '10 mins ago', type: 'booking', unread: true },
    { id: '2', title: 'Payment Successful', body: 'Your GCash transaction of ₱700 for service #BK9912 was processed.', time: '1 hour ago', type: 'payment', unread: false },
    { id: '3', title: 'Service Completed', body: 'Tessa Cruz completed the Cleaning service. Please leave a review!', time: 'Yesterday', type: 'booking', unread: false },
    { id: '4', title: 'Welcome to FixKo PH', body: 'Start exploring services near Rodriguez, Rizal.', time: '2 days ago', type: 'system', unread: false },
  ];

  const workerNotifications: AppNotification[] = [
    { id: '1', title: 'New Review Received', body: 'Darben Client left a 5-star rating: "Excellent cleaning!"', time: '12 mins ago', type: 'review', unread: true },
    { id: '2', title: 'Payment Confirmed', body: 'GCash payout of ₱700 was sent to your wallet for booking #BK9912.', time: '1 hour ago', type: 'payment', unread: false },
    { id: '3', title: 'New Booking Assigned', body: 'You have been booked by Nadine Borja for Plumbing Service on May 28.', time: '3 hours ago', type: 'booking', unread: true },
    { id: '4', title: 'Verification Approved', body: 'Your helper credentials have been successfully verified. You are now live!', time: '3 days ago', type: 'system', unread: false },
  ];

  const notifications = role === 'worker' ? workerNotifications : clientNotifications;

  const getIcon = (type: string) => {
    switch (type) {
      case 'booking': return 'calendar';
      case 'payment': return 'card';
      case 'review': return 'star';
      default: return 'notifications';
    }
  };

  const renderItem = ({ item }: { item: AppNotification }) => (
    <TouchableOpacity 
      className={`flex-row bg-white/5 border border-white/10 rounded-2xl p-4 mb-3 items-start ${
        item.unread ? 'bg-brand-blue/5 border-brand-blue/20' : ''
      }`}
    >
      <View className={`w-10 h-10 rounded-full justify-center items-center mr-3 ${
        item.unread ? 'bg-brand-blue/20' : 'bg-white/10'
      }`}>
        <Ionicons 
          name={getIcon(item.type)} 
          size={18} 
          color={item.unread ? '#7EB1F1' : '#fff'} 
        />
      </View>

      <View className="flex-1">
        <View className="flex-row justify-between items-start">
          <Text className={`text-white text-sm ${item.unread ? 'font-bold' : 'font-semibold'}`}>
            {item.title}
          </Text>
          {item.unread && (
            <View className="w-2 h-2 rounded-full bg-brand-blue" />
          )}
        </View>
        <Text className="text-brand-grey-light text-xs mt-1 leading-4">{item.body}</Text>
        <Text className="text-brand-grey-mid text-[10px] mt-2">{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <BaseMain>
      <View className="flex-1 px-5 pt-4">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-6">
          <View className="flex-row items-center flex-1 mr-3">
            <TouchableOpacity onPress={() => router.back()} className="p-1 mr-3">
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-2xl font-bold">Notifications</Text>
          </View>
          <TouchableOpacity className="px-3 py-1 bg-white/5 border border-white/10 rounded-full">
            <Text className="text-white text-[11px] font-semibold">Mark all as read</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={
            <View className="flex-1 justify-center items-center py-20">
              <Ionicons name="notifications-off-outline" size={48} color="#666" />
              <Text className="text-brand-grey-light text-base mt-4">No notifications yet</Text>
            </View>
          }
        />
      </View>
    </BaseMain>
  );
}
