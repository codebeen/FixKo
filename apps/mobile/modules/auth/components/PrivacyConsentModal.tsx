import React from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface PrivacyConsentModalProps {
  visible: boolean;
  onAccept: () => void;
}

export default function PrivacyConsentModal({ visible, onAccept }: PrivacyConsentModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View className="flex-1 bg-black/85 justify-center items-center px-5">
        <View className="bg-[#07183B] rounded-3xl border border-white/10 p-6 w-full max-w-[360px] shadow-xl shadow-black/40">

          <View className="items-center mb-4">
            <View className="w-16 h-16 rounded-full bg-brand-yellow-gold/10 border-2 border-brand-yellow-gold justify-center items-center">
              <Ionicons name="shield-checkmark-outline" size={34} color="#DBA92E" />
            </View>
          </View>

          <Text className="text-white text-[19px] font-bold text-center mb-1.5">
            Privacy & Data Consent
          </Text>
          <Text className="text-white/55 text-[12.5px] text-center mb-4 leading-[17px]">
            Before you proceed, please read and agree to our data collection policy.
          </Text>

          <ScrollView
            style={{ maxHeight: 200 }}
            showsVerticalScrollIndicator={false}
            className="bg-white/3 rounded-2xl border border-white/8 p-4 mb-5"
          >
            <Text className="text-white/75 text-[12px] leading-[18px]">
              <Text className="text-white font-bold">FixKo PH</Text> collects and processes the following personal information as part of your worker registration and verification:{'\n\n'}
              
              <Text className="text-brand-yellow-gold font-semibold">1. Personal Details</Text>
              {'\n'}Your name, phone number, email address, location, and gender for account identification and communication.{'\n\n'}

              <Text className="text-brand-yellow-gold font-semibold">2. Professional Information</Text>
              {'\n'}Work experience, service categories, certifications, and past work photos to verify your skills.{'\n\n'}

              <Text className="text-brand-yellow-gold font-semibold">3. Identity Documents</Text>
              {'\n'}Government-issued ID, NBI Clearance, and biometric selfie for identity verification and trust and safety purposes.{'\n\n'}

              <Text className="text-brand-yellow-gold font-semibold">4. Data Security</Text>
              {'\n'}All documents are encrypted and stored securely. Your data will not be sold to third parties.{'\n\n'}

              By tapping "I Agree", you consent to FixKo PH collecting, storing, and processing your personal data in accordance with the <Text className="text-brand-blue">Data Privacy Act of 2012 (RA 10173)</Text> of the Philippines.
            </Text>
          </ScrollView>

          <TouchableOpacity
            className="bg-brand-blue h-[48px] rounded-[24px] justify-center items-center shadow-md shadow-brand-blue/20 elevation-3 w-full"
            activeOpacity={0.85}
            onPress={onAccept}
          >
            <Text className="text-brand-navy text-[14.5px] font-bold">I Agree & Continue</Text>
          </TouchableOpacity>

          <Text className="text-white/30 text-[10.5px] text-center mt-3 leading-[14px]">
            You must agree to proceed with worker registration.
          </Text>
        </View>
      </View>
    </Modal>
  );
}
