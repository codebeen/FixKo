import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Switch, Image } from 'react-native';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import BaseMain from '@/components/layout/(base-main)/BaseMain';
import { useUserRole } from '../hooks/useUserRole';
import TabTopBar from '@/components/ui/TabTopBar';

export default function ProfileView() {
  const role = useUserRole();
  const router = useRouter();
  const [isOnline, setIsOnline] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleLogout = () => {
    // Navigate back to onboarding/login
    router.replace('/(auth)/login' as any);
  };

  const renderClientProfile = () => {
    return (
      <View className="flex-1">
        {/* Profile Card */}
        <View className="bg-white/10 border border-white/15 rounded-3xl p-6 mb-6 items-center">
          <View className="w-20 h-20 rounded-full bg-brand-yellow-gold/20 border-2 border-brand-yellow-gold justify-center items-center mb-3">
            <FontAwesome5 name="user" size={36} color="#DBA92E" />
          </View>
          <Text className="text-white text-xl font-bold">Darben Client</Text>
          <Text className="text-brand-grey-light text-sm mt-1">darben@fixko.ph</Text>
          
          <View className="flex-row items-center mt-3 bg-brand-blue/20 px-3 py-1 rounded-full border border-brand-blue/30">
            <Ionicons name="shield-checkmark" size={14} color="#7EB1F1" className="mr-1" />
            <Text className="text-brand-blue-hover text-xs font-bold">Verified Account</Text>
          </View>
        </View>

        {/* Options Group */}
        <Text className="text-brand-yellow text-xs font-bold uppercase tracking-wider mb-3 px-1">Account Settings</Text>
        <View className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden mb-6">
          <TouchableOpacity className="flex-row justify-between items-center p-4 border-b border-white/5">
            <View className="flex-row items-center gap-3">
              <Ionicons name="location-outline" size={20} color="#fff" />
              <Text className="text-white text-sm font-semibold">Saved Addresses</Text>
            </View>
            <View className="flex-row items-center gap-1">
              <Text className="text-brand-grey-light text-xs">Brgy. Burgos, Rizal</Text>
              <Ionicons name="chevron-forward" size={16} color="#888" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row justify-between items-center p-4 border-b border-white/5" onPress={() => router.push('/(client)/payment/PaymentMethodPage' as any)}>
            <View className="flex-row items-center gap-3">
              <Ionicons name="card-outline" size={20} color="#fff" />
              <Text className="text-white text-sm font-semibold">Payment Methods</Text>
            </View>
            <View className="flex-row items-center gap-1">
              <Text className="text-brand-grey-light text-xs">GCash Connected</Text>
              <Ionicons name="chevron-forward" size={16} color="#888" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row justify-between items-center p-4" onPress={() => router.push('/(client)/history/page' as any)}>
            <View className="flex-row items-center gap-3">
              <Ionicons name="time-outline" size={20} color="#fff" />
              <Text className="text-white text-sm font-semibold">Booking History</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#888" />
          </TouchableOpacity>
        </View>

        {/* System Settings */}
        <Text className="text-brand-yellow text-xs font-bold uppercase tracking-wider mb-3 px-1">Preferences</Text>
        <View className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden mb-8">
          <View className="flex-row justify-between items-center p-4 border-b border-white/5">
            <View className="flex-row items-center gap-3">
              <Ionicons name="notifications-outline" size={20} color="#fff" />
              <Text className="text-white text-sm font-semibold">Push Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#767577', true: '#7EB1F1' }}
              thumbColor={notificationsEnabled ? '#fff' : '#f4f3f4'}
            />
          </View>

          <TouchableOpacity className="flex-row justify-between items-center p-4" onPress={() => router.replace('/(auth)/User-Type' as any)}>
            <View className="flex-row items-center gap-3">
              <Ionicons name="swap-horizontal" size={20} color="#fff" />
              <Text className="text-white text-sm font-semibold">Switch Role Mode</Text>
            </View>
            <View className="bg-brand-yellow-gold/20 px-2 py-0.5 rounded">
              <Text className="text-brand-yellow text-[10px] font-bold">WORKER</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Log Out Button */}
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-red-500/10 border border-red-500/30 rounded-2xl py-4 flex-row justify-center items-center gap-2 mb-10"
        >
          <Ionicons name="log-out-outline" size={18} color="#EF4444" />
          <Text className="text-red-500 font-bold text-sm">Log Out</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderWorkerProfile = () => {
    return (
        <View className="flex-1">
            {/* Worker Card */}
            <View className="bg-white border border-white/15 rounded-3xl p-6 mb-6">
                <View className="flex-row items-center gap-4 mb-4">
                    <View className="w-16 h-16 rounded-full bg-brand-yellow-gold/20 border border-brand-yellow-gold justify-center items-center">
                        <FontAwesome5 name="tools" size={24} color="#DBA92E" />
                    </View>
                    <View className="flex-1">
                        <Text className="text-dark text-lg font-bold">
                            Shanella Cagulang
                        </Text>
                        <Text className="text-gray-500 text-xs mt-0.5">
                            Professional Cleaning Helper
                        </Text>

                        <View className="flex-row items-center mt-1.5 gap-2">
                            <View className="bg-green-500/15 border border-green-500 px-2 py-0.5 rounded-full flex-row items-center">
                                <Ionicons
                                    name="checkmark-circle"
                                    size={10}
                                    color="#4ade80"
                                    className="mr-0.5"
                                />
                                <Text className="text-brand-green text-xs font-bold">
                                    Verified
                                </Text>
                            </View>
                            <View className="flex-row items-center gap-0.5">
                                <Ionicons
                                    name="star"
                                    size={12}
                                    color="#FFD700"
                                />
                                <Text className="text-yellow-500 text-xs font-bold">
                                    5.0
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Quick Metrics */}
                <View className="h-[1px] bg-white/10 my-3" />
                <View className="flex-row justify-around py-1">
                    <View className="items-center">
                        <Text className="text-gray-500 text-xs uppercase font-semibold tracking-wider">
                            Hourly Rate
                        </Text>
                        <Text className="text-gray-500 text-sm font-bold mt-1">
                            ₱150/hr
                        </Text>
                    </View>
                    <View className="w-[1px] bg-gray-200" />
                    <View className="items-center">
                        <Text className="text-gray-500 text-xs uppercase font-semibold tracking-wider">
                            Completed
                        </Text>
                        <Text className="text-gray-500 text-sm font-bold mt-1">
                            32 jobs
                        </Text>
                    </View>
                    <View className="w-[1px] bg-gray-200" />
                    <View className="items-center">
                        <Text className="text-gray-500 text-xs uppercase font-semibold tracking-wider">
                            Service area
                        </Text>
                        <Text className="text-gray-500 text-sm font-bold mt-1">
                            Rizal
                        </Text>
                    </View>
                </View>
            </View>

            {/* Availability Switch */}
            <View className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6 flex-row justify-between items-center">
                <View>
                    <Text className="text-white text-sm font-bold">
                        Work Status
                    </Text>
                    <Text className="text-[#AAB8C2] text-xs mt-0.5">
                        {isOnline
                            ? "You are visible for bookings"
                            : "You are currently offline"}
                    </Text>
                </View>
                <View className="flex-row items-center gap-2">
                    <Text
                        className={`text-xs text-white font-bold ${isOnline ? "text-brand-green" : "text-brand-grey-light"}`}
                    >
                        {isOnline ? "ONLINE" : "OFFLINE"}
                    </Text>
                    <Switch
                        value={isOnline}
                        onValueChange={setIsOnline}
                        trackColor={{ false: "#767577", true: "#4ade80" }}
                        thumbColor={isOnline ? "#fff" : "#f4f3f4"}
                    />
                </View>
            </View>

            {/* Worker Options */}
            <Text className="text-brand-yellow text-xs font-bold uppercase tracking-wider mb-3 px-1">
                Worker Management
            </Text>
            <View className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden mb-6">
                <TouchableOpacity className="flex-row justify-between items-center p-4 border-b border-white/5">
                    <View className="flex-row items-center gap-3">
                        <Ionicons
                            name="hammer-outline"
                            size={20}
                            color="#fff"
                        />
                        <Text className="text-white text-sm font-semibold">
                            Service Categories
                        </Text>
                    </View>
                    <View className="flex-row items-center gap-1">
                        <Text className="text-brand-grey-light text-xs">
                            Cleaning, Plumbing
                        </Text>
                        <Ionicons
                            name="chevron-forward"
                            size={16}
                            color="#888"
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    className="flex-row justify-between items-center p-4 border-b border-white/5"
                    onPress={() =>
                        router.push("/(worker)/(tabs)/reviews" as any)
                    }
                >
                    <View className="flex-row items-center gap-3">
                        <Ionicons
                            name="chatbox-ellipses-outline"
                            size={20}
                            color="#fff"
                        />
                        <Text className="text-white text-sm font-semibold">
                            My Client Reviews
                        </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={16} color="#888" />
                </TouchableOpacity>

                <TouchableOpacity
                    className="flex-row justify-between items-center p-4"
                    onPress={() =>
                        router.push("/(worker)/(tabs)/history" as any)
                    }
                >
                    <View className="flex-row items-center gap-3">
                        <Ionicons name="list-outline" size={20} color="#fff" />
                        <Text className="text-white text-sm font-semibold">
                            Earnings History
                        </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={16} color="#888" />
                </TouchableOpacity>
            </View>

            {/* Mode Switch & Logout */}
            <Text className="text-brand-yellow text-xs font-bold uppercase tracking-wider mb-3 px-1">
                Preferences
            </Text>
            <View className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden mb-8">
                <TouchableOpacity
                    className="flex-row justify-between items-center p-4"
                    onPress={() => router.replace("/(auth)/User-Type" as any)}
                >
                    <View className="flex-row items-center gap-3">
                        <Ionicons
                            name="swap-horizontal"
                            size={20}
                            color="#fff"
                        />
                        <Text className="text-white text-sm font-semibold">
                            Switch Role Mode
                        </Text>
                    </View>
                    <View className="bg-brand-blue/20 px-2 py-0.5 rounded">
                        <Text className="text-[#7EB1F1] text-[10px] font-bold">
                            CLIENT
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

            {/* Log Out Button */}
            <TouchableOpacity
                onPress={handleLogout}
                className="bg-red-500 border border-red-500/50 rounded-2xl py-4 flex-row justify-center items-center gap-2 mb-10"
            >
                <Ionicons name="log-out-outline" size={18} color="white" />
                <Text className="text-white font-bold text-sm">Log Out</Text>
            </TouchableOpacity>
        </View>
    );
  };

  return (
      <BaseMain>
          {/* Header */}
          <TabTopBar
              title="Profile & Settings"
              rightElement={<Ionicons name="cog-outline" size={24} color="white" />}
          />
          <View className="flex-1 px-5">
              <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: 60 }}
              >
                  {role === "worker"
                      ? renderWorkerProfile()
                      : renderClientProfile()}
              </ScrollView>
          </View>
      </BaseMain>
  );
}
