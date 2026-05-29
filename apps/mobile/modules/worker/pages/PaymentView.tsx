import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import BaseMain from '@/components/layout/(base-main)/BaseMain';
import TopBar from '@/components/ui/top-bar';
import Stepper from '@/modules/worker/components/stepper/Stepper';
import BaseModal from '@/components/ui/modal/BaseModal';

const PAYMENT_METHODS = [
  { id: 'gcash', label: 'GCash', icon: 'wallet-outline' },
  { id: 'maya', label: 'Maya', icon: 'phone-portrait-outline' },
  { id: 'cash', label: 'Cash on Hand', icon: 'cash-outline' },
  { id: 'bank', label: 'Bank Transfer', icon: 'card-outline' },
];

export default function PaymentView() {
  const router = useRouter();
  const {
    title, client, address, propertySize,
    rate, example, schedule, contact,
    tasks, status, activeTab,
  } = useLocalSearchParams();

  const [selectedMethod, setSelectedMethod] = useState<string>('gcash');
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const rawRate = parseFloat(String(rate || '0').replace(/[^\d.]/g, '')) || 700;
  const serviceFee = parseFloat((rawRate * 0.05).toFixed(2));
  const totalAmount = rawRate + serviceFee;

  const handlePay = () => {
    setSuccessModalVisible(true);
  };

  const handleModalClose = () => {
    setSuccessModalVisible(false);
    router.replace({
      pathname: '/booking/JobCompleted',
      params: {
        title: title || '', client: client || '', address: address || '',
        propertySize: propertySize || '', rate: rate || '',
        example: example || '', schedule: schedule || '',
        contact: contact || '', tasks: tasks || '',
        status: status || '', activeTab: activeTab || '',
      },
    });
  };

  return (
    <BaseMain theme="navy" scrollable={false}>
      <TopBar title="Payment" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ alignItems: 'center', paddingHorizontal: 20, paddingBottom: 40 }}
      >
        <Stepper currentStep={5} />

        {/* ── Job Summary Card ── */}
        <View className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 mb-4">
          <View className="flex-row items-center mb-4">
            <View className="w-10 h-10 rounded-full bg-[#66EE66]/15 justify-center items-center mr-3">
              <Ionicons name="receipt-outline" size={20} color="#66EE66" />
            </View>
            <Text className="text-white text-base font-bold">Job Summary</Text>
          </View>

          <View className="flex-row justify-between mb-2">
            <Text className="text-white/60 text-sm">Service</Text>
            <Text className="text-white text-sm font-semibold">{title || 'Cleaning Service'}</Text>
          </View>
          <View className="flex-row justify-between mb-2">
            <Text className="text-white/60 text-sm">Client</Text>
            <Text className="text-white text-sm font-semibold">{client || 'N/A'}</Text>
          </View>
          <View className="flex-row justify-between mb-2">
            <Text className="text-white/60 text-sm">Schedule</Text>
            <Text className="text-white text-sm font-semibold">{schedule || 'Today'}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-white/60 text-sm">Address</Text>
            <Text className="text-white text-sm font-semibold flex-1 text-right ml-4" numberOfLines={1}>
              {address || 'N/A'}
            </Text>
          </View>
        </View>

        {/* ── Amount Breakdown ── */}
        <View className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 mb-4">
          <View className="flex-row items-center mb-4">
            <View className="w-10 h-10 rounded-full bg-[#66EE66]/15 justify-center items-center mr-3">
              <MaterialCommunityIcons name="cash-multiple" size={20} color="#66EE66" />
            </View>
            <Text className="text-white text-base font-bold">Amount Breakdown</Text>
          </View>

          <View className="flex-row justify-between mb-2">
            <Text className="text-white/60 text-sm">Service Rate</Text>
            <Text className="text-white text-sm font-semibold">₱{rawRate.toLocaleString()}</Text>
          </View>
          <View className="flex-row justify-between mb-3">
            <Text className="text-white/60 text-sm">Platform Fee (5%)</Text>
            <Text className="text-white text-sm font-semibold">₱{serviceFee.toLocaleString()}</Text>
          </View>

          {/* Divider */}
          <View className="border-t border-white/10 pt-3">
            <View className="flex-row justify-between items-center">
              <Text className="text-white font-bold text-base">Total</Text>
              <Text className="text-[#66EE66] font-bold text-lg">₱{totalAmount.toLocaleString()}</Text>
            </View>
          </View>
        </View>

        {/* ── Payment Method ── */}
        <View className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 mb-6">
          <View className="flex-row items-center mb-4">
            <View className="w-10 h-10 rounded-full bg-[#66EE66]/15 justify-center items-center mr-3">
              <Ionicons name="card-outline" size={20} color="#66EE66" />
            </View>
            <Text className="text-white text-base font-bold">Payment Method</Text>
          </View>

          <View className="flex-row flex-wrap gap-y-3" style={{ gap: 10 }}>
            {PAYMENT_METHODS.map((method) => {
              const active = selectedMethod === method.id;
              return (
                <TouchableOpacity
                  key={method.id}
                  onPress={() => setSelectedMethod(method.id)}
                  activeOpacity={0.75}
                  style={{ width: '47%' }}
                  className={`flex-row items-center p-3 rounded-xl border ${active
                      ? 'bg-[#66EE66]/10 border-[#66EE66]/60'
                      : 'bg-white/[0.03] border-white/10'
                    }`}
                >
                  <Ionicons
                    name={method.icon as any}
                    size={20}
                    color={active ? '#66EE66' : 'rgba(255,255,255,0.4)'}
                    style={{ marginRight: 8 }}
                  />
                  <Text
                    className={`text-xs font-semibold flex-1 ${active ? 'text-[#66EE66]' : 'text-white/50'
                      }`}
                    numberOfLines={1}
                  >
                    {method.label}
                  </Text>
                  {active && (
                    <Ionicons name="checkmark-circle" size={14} color="#66EE66" />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* ── Pay Button ── */}
        <TouchableOpacity
          className="bg-[#66EE66] w-full p-4 rounded-full items-center"
          onPress={handlePay}
          activeOpacity={0.8}
        >
          <Text className="text-[#001540] font-bold text-base">
            Confirm Payment · ₱{totalAmount.toLocaleString()}
          </Text>
        </TouchableOpacity>

        <Text className="text-white/30 text-xs text-center mt-4 leading-[18px]">
          By confirming, you agree that payment will be released{'\n'}
          upon client approval of the completed work.
        </Text>
      </ScrollView>

      {/* ── Success Toast Modal ── */}
      <BaseModal
        visible={successModalVisible}
        onClose={handleModalClose}
        autoDismiss={1500}
        overlayClassName="absolute inset-0 bg-black/45"
        cardClassName="absolute top-[60px] right-5 bg-brand-navy-dark rounded-2xl border border-white/15 w-[320px] max-w-full px-5 py-[18px] shadow-2xl"
      >
        <View className="flex-row items-center">
          <View className="w-11 h-11 rounded-full bg-[#66EE66]/15 justify-center items-center mr-4">
            <Ionicons name="checkmark-done" size={24} color="#66EE66" />
          </View>
          <View className="flex-1">
            <Text className="text-white text-base font-bold tracking-[0.3px]">Payment Success!</Text>
            <Text className="text-white/80 text-xs mt-0.5 leading-[17px]">
              Your payment has been submitted. Awaiting client approval.
            </Text>
          </View>
        </View>
      </BaseModal>
    </BaseMain>
  );
}
