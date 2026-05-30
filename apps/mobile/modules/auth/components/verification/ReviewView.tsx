import React, { useState } from 'react';
import {
  Text, View, TouchableOpacity, Image, ScrollView, Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import BaseLayout from '@/components/layout/(base-auth)/BaseLayout';
import { useVerification } from '../../context/VerificationContext';
import Stepper from '../Stepper';
import FixKoLogo from '@/constants/logo';

export default function ReviewView() {
  const router = useRouter();
  const { personalInfo, experience, identity, selfie, resetForm } = useVerification();

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = () => {
    setShowSuccessModal(true);
  };

  const handleFinish = () => {
    setShowSuccessModal(false);
    router.replace('/(worker)/(tabs)/home' as any);
    resetForm();
  };

  return (
    <BaseLayout align="center">
      <View className="w-full max-w-[340px]">
        <View className="items-center mb-3 -mt-2.5">
          <Image source={FixKoLogo} style={{ width: 180, height: 90 }} resizeMode="contain" />
        </View>

        <Stepper currentStep={5} />

        <View className="mb-4">
          <Text className="text-[22px] font-bold text-white mb-1.5">Review Application</Text>
          <Text className="text-[13px] text-white/60 leading-[18px]">
            Please review all details before submitting your worker application.
          </Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} className="max-h-[460px] mb-2.5">
          <View className="bg-white/3 border border-white/8 rounded-2xl p-4 mb-3.5">
            <View className="flex-row items-center gap-2 border-b border-white/8 pb-2.5 mb-3">
              <Ionicons name="person-outline" size={18} color="#DBA92E" />
              <Text className="text-[14.5px] font-bold text-white">Personal Information</Text>
            </View>
            <View className="gap-3">
              <View className="flex-col gap-0.5">
                <Text className="text-[11px] text-white/45 font-semibold uppercase">Full Name</Text>
                <Text className="text-[13.5px] text-white font-medium">{personalInfo.fullName || 'Not provided'}</Text>
              </View>
              <View className="flex-col gap-0.5">
                <Text className="text-[11px] text-white/45 font-semibold uppercase">Phone Number</Text>
                <Text className="text-[13.5px] text-white font-medium">{personalInfo.phoneNumber || 'Not provided'}</Text>
              </View>
              <View className="flex-col gap-0.5">
                <Text className="text-[11px] text-white/45 font-semibold uppercase">Email Address</Text>
                <Text className="text-[13.5px] text-white font-medium">{personalInfo.email || 'Not provided'}</Text>
              </View>
              <View className="flex-col gap-0.5">
                <Text className="text-[11px] text-white/45 font-semibold uppercase">Service Location</Text>
                <Text className="text-[13.5px] text-white font-medium">{personalInfo.serviceLocation || 'Not provided'}</Text>
              </View>
              <View className="flex-col gap-0.5">
                <Text className="text-[11px] text-white/45 font-semibold uppercase">Service Offer</Text>
                {personalInfo.serviceOffer.length > 0 ? (
                  <View className="flex-row flex-wrap gap-1.5 mt-1">
                    {personalInfo.serviceOffer.map((s) => (
                      <View
                        key={s}
                        className="bg-brand-yellow/12 rounded-full border border-brand-yellow/35 px-2.5 py-1"
                      >
                        <Text className="text-brand-yellow text-[12px] font-bold">{s}</Text>
                      </View>
                    ))}
                  </View>
                ) : (
                  <Text className="text-[13.5px] text-white font-medium">Not provided</Text>
                )}
              </View>
              <View className="flex-col gap-0.5">
                <Text className="text-[11px] text-white/45 font-semibold uppercase">Short Bio</Text>
                <Text className="text-[13px] text-gray-300 leading-[17px]">{personalInfo.shortBio || 'Not provided'}</Text>
              </View>
            </View>
          </View>

          <View className="bg-white/3 border border-white/8 rounded-2xl p-4 mb-3.5">
            <View className="flex-row items-center gap-2 border-b border-white/8 pb-2.5 mb-3">
              <Ionicons name="briefcase-outline" size={18} color="#DBA92E" />
              <Text className="text-[14.5px] font-bold text-white">Experience & Qualifications</Text>
            </View>
            {experience.skipped ? (
              <Text className="text-[13px] text-white/40 italic">Skipped for now</Text>
            ) : (
              <View className="gap-3">
                <View className="flex-col gap-0.5">
                  <Text className="text-[11px] text-white/45 font-semibold uppercase">Experience Description</Text>
                  <Text className="text-[13px] text-gray-300 leading-[17px]">{experience.workExperience || 'Not provided'}</Text>
                </View>
                {experience.certification && (
                  <View className="flex-row items-center gap-2 bg-white/3 px-3 h-9 rounded-lg border border-white/6 mt-1">
                    <Ionicons name="document-text-outline" size={18} color="#7EB1F1" />
                    <Text className="text-[12.5px] text-white font-medium">Certification uploaded</Text>
                  </View>
                )}
                {experience.imagesProof && experience.imagesProof.length > 0 && (
                  <View className="mt-1">
                    <Text className="text-[11px] text-white/45 font-semibold uppercase">Proof of Work ({experience.imagesProof.length} photos)</Text>
                    <View className="flex-row flex-wrap gap-2 mt-2">
                      {experience.imagesProof.map((uri, idx) => (
                        <Image key={idx} source={{ uri }} className="w-[60px] h-[60px] rounded-md border border-white/10" />
                      ))}
                    </View>
                  </View>
                )}
              </View>
            )}
          </View>

          <View className="bg-white/3 border border-white/8 rounded-2xl p-4 mb-3.5">
            <View className="flex-row items-center gap-2 border-b border-white/8 pb-2.5 mb-3">
              <Ionicons name="card-outline" size={18} color="#DBA92E" />
              <Text className="text-[14.5px] font-bold text-white">Uploaded ID Verification</Text>
            </View>
            <View className="flex-row justify-between gap-3">
              <View className="flex-1 gap-1.5">
                <Text className="text-[12px] text-white/50 font-semibold">Government ID</Text>
                {identity.governmentId ? (
                  <Image source={{ uri: identity.governmentId }} className="w-full h-20 rounded-lg border border-white/12" resizeMode="cover" />
                ) : (
                  <View className="w-full h-20 rounded-lg bg-red-500/10 border border-red-500/20 justify-center items-center">
                    <Text className="text-red-500 text-[12px] font-bold">Missing</Text>
                  </View>
                )}
              </View>
              <View className="flex-1 gap-1.5">
                <Text className="text-[12px] text-white/50 font-semibold">NBI Clearance</Text>
                {identity.nbiClearance ? (
                  <Image source={{ uri: identity.nbiClearance }} className="w-full h-20 rounded-lg border border-white/12" resizeMode="cover" />
                ) : (
                  <View className="w-full h-20 rounded-lg bg-red-500/10 border border-red-500/20 justify-center items-center">
                    <Text className="text-red-500 text-[12px] font-bold">Missing</Text>
                  </View>
                )}
              </View>
            </View>
          </View>

          <View className="bg-white/3 border border-white/8 rounded-2xl p-4 mb-3.5">
            <View className="flex-row items-center gap-2 border-b border-white/8 pb-2.5 mb-3">
              <Ionicons name="camera-outline" size={18} color="#DBA92E" />
              <Text className="text-[14.5px] font-bold text-white">Facial Verification</Text>
            </View>
            <View className="flex-row gap-3 items-center">
              {selfie.selfieWithId ? (
                <Image source={{ uri: selfie.selfieWithId }} className="w-[70px] h-[70px] rounded-[35px] border-2 border-[#10B981]" />
              ) : (
                <View className="w-[70px] h-[70px] rounded-[35px] bg-red-500/10 border border-red-500/20 justify-center items-center">
                  <Text className="text-red-500 text-[12px] font-bold">Missing</Text>
                </View>
              )}
              <View className="flex-1 gap-1">
                <View className="flex-row items-center gap-1 bg-emerald-500/10 px-2 h-[22px] rounded-full self-start">
                  <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                  <Text className="text-emerald-500 text-[11px] font-bold">Biometric Match Done</Text>
                </View>
                <Text className="text-[11px] text-white/55 leading-[15px]">
                  Your selfie matched the identity card with an automated verification confidence level of 98.4%.
                </Text>
              </View>
            </View>
          </View>

          <View className="flex-row gap-2 bg-brand-blue/5 border border-brand-blue/15 rounded-xl p-3 mb-5">
            <Ionicons name="information-circle-outline" size={18} color="#7EB1F1" className="mt-[1px]" />
            <Text className="flex-1 text-[11px] text-white/60 leading-[15px]">
              By submitting, you agree that all provided documents and information are yours and are true and accurate. FixKo PH will verify documents for security.
            </Text>
          </View>
        </ScrollView>

        <View className="flex-row justify-between mt-3 mb-10 gap-3">
          <TouchableOpacity
            className="flex-1 h-[46px] rounded-[23px] border-[1.5px] border-white/20 justify-center items-center"
            onPress={() => router.push('/(auth)/verification/SelfieWithID' as any)}
          >
            <Text className="text-white text-[14px] font-bold">Back</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-[2] h-[46px] rounded-[23px] bg-brand-yellow-gold justify-center items-center shadow-md shadow-brand-yellow-gold/20 elevation-3" onPress={handleSubmit}>
            <Text className="text-brand-navy text-[14px] font-bold">Submit Application</Text>
          </TouchableOpacity>
        </View>

        <Modal
          visible={showSuccessModal}
          transparent
          animationType="fade"
          onRequestClose={handleFinish}
        >
          <View className="flex-1 bg-black/80 justify-center items-center p-6">
            <View className="bg-brand-navy-dark rounded-3xl border border-white/10 p-6 items-center w-full max-w-[320px] shadow-lg shadow-brand-yellow-gold/15 elevation-5">
              <View className="w-[90px] h-[90px] rounded-[45px] bg-brand-yellow-gold/10 justify-center items-center mb-5 border-2 border-brand-yellow-gold">
                <Ionicons name="ribbon-outline" size={48} color="#DBA92E" />
              </View>
              <Text className="text-[20px] font-bold text-white mb-2.5 text-center">Verification Under Review!</Text>
              <Text className="text-[13.5px] text-white text-center leading-[19px] mb-3 font-semibold">
                Excellent work! Your worker verification profile has been submitted successfully to the FixKo admin team.
              </Text>
              <Text className="text-[12px] text-white/55 text-center leading-[17px] mb-6">
                We will review your documents and verify your credentials within 24 to 48 hours. You will receive an SMS and email notification once approved!
              </Text>

              <TouchableOpacity className="bg-brand-blue w-full h-[48px] rounded-[24px] justify-center items-center shadow-md shadow-brand-blue/20 elevation-3" onPress={handleFinish}>
                <Text className="text-brand-navy text-[14.5px] font-bold">Go to Home</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </BaseLayout>
  );
}
