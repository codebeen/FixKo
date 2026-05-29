import React from 'react';
import { Text, View, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import BaseMain from '@/components/layout/(base-main)/BaseMain';
import TopBar from '@/components/ui/top-bar';
import ClientName from '@/modules/worker/components/bookingheader/ClientName';

const { width } = Dimensions.get('window');

interface InfoItemProps {
  icon: string;
  text: string;
  isBold?: boolean;
  iconFamily?: any;
}

const InfoItem = ({ icon, text, isBold = false, iconFamily: IconFam = MaterialCommunityIcons }: InfoItemProps) => (
  <View className="flex-row items-center mb-3.5">
    <IconFam name={icon} size={20} color="dark" className="w-[30px]" />
    <Text className={`text-md flex-1 ${isBold ? 'font-bold text-md' : ''}`}>{text}</Text>
  </View>
);

import Stepper from '@/modules/worker/components/stepper/Stepper';

export default function StartJobView() {
  const {
    title, client, address, status, propertySize,
    rate, example, schedule, contact, tasks, activeTab
  } = useLocalSearchParams();

  const parsedTasks = React.useMemo(() => {
    if (!tasks) return [];
    if (Array.isArray(tasks)) return tasks;
    if (typeof tasks === 'string') {
      try {
        const parsed = JSON.parse(tasks);
        if (Array.isArray(parsed)) return parsed;
      } catch {
        return tasks.split(',').map(t => t.trim());
      }
    }
    return [];
  }, [tasks]);

  return (
    <BaseMain theme="navy" scrollable={false}>
      <TopBar title="Job Overview" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20, alignItems: 'center' }}>
        <Stepper currentStep={2} />

        {/* Client Section */}
        <ClientName />

        {/* Main Info Card */}
        <View className="w-full border border-white/30 rounded-[15px] p-4 bg-white text-brand-navy-dark">
          {title && <InfoItem icon="vacuum" text={`Service: ${title}`} isBold={true} />}
          {address && <InfoItem icon="location-on" text={`Location: ${address}`} iconFamily={MaterialIcons} />}
          {propertySize && <InfoItem icon="arrow-expand-all" text={`Property Size: ${propertySize}`} />}
          {rate && <InfoItem icon="currency-php" text={`Rate: ${rate}`} />}

          <InfoItem icon="calculator" text="Estimated Total: (auto-calculated)" />
          {example && <Text className="text-gray-500 text-xs ml-9 mb-3">{`Example: ${example}`}</Text>}

          {schedule && <InfoItem icon="clock-outline" text={`Schedule: ${schedule}`} />}
          {contact && <InfoItem icon="phone" text={`Contact: ${contact}`} />}
          {status && <InfoItem icon="information-outline" text={`Status: ${status}`} />}
        </View>

        {/* Task Container List Section */}
        {parsedTasks.length > 0 && (
          <View className="w-full">
            <Text className="text-white text-md font-semibold mt-10  mb-5">Available Tasks</Text>
            <View className="bg-white/8 rounded-xl border border-white/20 overflow-hidden">
              {parsedTasks.map((task, index) => (
                <View
                  key={index}
                  className={`flex-row justify-between items-center py-3.5 px-4 bg-white/25 ${index !== parsedTasks.length - 1 ? 'border-b border-b-white/10' : ''
                    }`}
                >
                  <Text className="text-white text-sm flex-1 mr-2.5">{task}</Text>
                  <Ionicons name="radio-button-on" size={16} color="rgba(255,255,255,0.4)" />
                </View>
              ))}
            </View>
          </View>
        )}

        {status !== 'completed' && (
          <View className="w-full px-5 items-center justify-center mt-6">
            <TouchableOpacity
              className="bg-[#66EE66] h-[50px] rounded-[25px] items-center justify-center shadow-md"
              style={{ width: width > 500 ? '60%' : '85%' }}
              activeOpacity={0.8}
              onPress={() => router.push({
                pathname: '/booking/Timer',
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
              })}
            >
              <Text className="text-[#001540] font-bold text-base">Let&apos;s Get Started</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </BaseMain>
  );
}
