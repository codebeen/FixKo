import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import BaseLayout from '@/components/layout/(base-auth)/BaseLayout';
import { useVerification } from '../../context/VerificationContext';
import Stepper from '../Stepper';
import FixKoLogo from '@/constants/logo';

export default function IdentityVerificationView() {
  const router = useRouter();
  const { identity, setIdentity } = useVerification();

  const [governmentId, setGovernmentId] = useState<string | null>(identity.governmentId);
  const [nbiClearance, setNbiClearance] = useState<string | null>(identity.nbiClearance);

  const [errors, setErrors] = useState<Record<string, string | null>>({});

  const pickDocument = async (type: 'govId' | 'nbi') => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Denied',
        'Sorry, we need camera roll permissions to upload images.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      if (type === 'govId') {
        setGovernmentId(uri);
        setErrors((prev) => ({ ...prev, governmentId: null }));
      } else {
        setNbiClearance(uri);
        setErrors((prev) => ({ ...prev, nbiClearance: null }));
      }
    }
  };

  const handleContinue = () => {
    let hasError = false;
    const newErrors: Record<string, string | null> = {};

    if (!governmentId) {
      newErrors.governmentId = 'Government ID is required';
      hasError = true;
    }

    if (!nbiClearance) {
      newErrors.nbiClearance = 'NBI Clearance document is required';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIdentity({
      governmentId,
      nbiClearance,
    });
    router.push('/(auth)/verification/SelfieWithID' as any);
  };

  return (
    <BaseLayout align="center">
      <View className="w-full max-w-[340px]">
        <View className="items-center mb-3 -mt-2.5">
          <Image source={FixKoLogo} style={{ width: 180, height: 90 }} resizeMode="contain" />
        </View>

        <Stepper currentStep={3} />

        <View className="mb-5">
          <Text className="text-[22px] font-bold text-white mb-1.5">Identity Verification</Text>
          <Text className="text-[13px] text-white/60 leading-[18px]">
            Please upload clear copies of your documents to verify your identity.
          </Text>
        </View>

        <View className="mb-5 w-full">
          <View className="flex-row items-center mb-0.5">
            <Text className="text-[13.5px] font-semibold text-white">Government-issued ID</Text>
            <Text className="text-[#EF4444] ml-1 text-[14px] font-bold">*</Text>
          </View>
          <Text className="text-[11px] text-white/45 mb-2 leading-[15px]">
            Accepted IDs: Passport, UMID, Driver&apos;s License, SSS, Postal ID, PRC, Voter&apos;s ID.
          </Text>

          {governmentId ? (
            <View className="h-[130px] rounded-xl overflow-hidden relative border border-white/15">
              <Image source={{ uri: governmentId }} className="w-full h-full" resizeMode="cover" />
              <TouchableOpacity
                className="absolute top-2 right-2 bg-black/60 w-6 h-6 rounded-full justify-center items-center"
                onPress={() => setGovernmentId(null)}
              >
                <Ionicons name="close" size={16} color="#FFF" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              className={`h-[120px] bg-white/2 border-[1.5px] border-dashed border-white rounded-xl justify-center items-center gap-1 ${
                errors.governmentId ? 'border-[#EF4444]' : ''
              }`}
              onPress={() => pickDocument('govId')}
            >
              <Ionicons name="card-outline" size={28} color="#DBA92E" />
              <Text className="text-white text-[13px] font-semibold">Upload Front of ID Card</Text>
              <Text className="text-white/40 text-[11px]">Must be clear and legible</Text>
            </TouchableOpacity>
          )}
          {errors.governmentId && <Text className="text-[#EF4444] text-[11px] mt-1.5 font-medium">{errors.governmentId}</Text>}
        </View>

        <View className="mb-5 w-full">
          <View className="flex-row items-center mb-0.5">
            <Text className="text-[13.5px] font-semibold text-white">NBI Clearance Certificate</Text>
            <Text className="text-[#EF4444] ml-1 text-[14px] font-bold">*</Text>
          </View>
          <Text className="text-[11px] text-white/45 mb-2 leading-[15px]">
            Must be issued within the last 6 months with clear visible text.
          </Text>

          {nbiClearance ? (
            <View className="h-[130px] rounded-xl overflow-hidden relative border border-white/15">
              <Image source={{ uri: nbiClearance }} className="w-full h-full" resizeMode="cover" />
              <TouchableOpacity
                className="absolute top-2 right-2 bg-black/60 w-6 h-6 rounded-full justify-center items-center"
                onPress={() => setNbiClearance(null)}
              >
                <Ionicons name="close" size={16} color="#FFF" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              className={`h-[120px] bg-white/2 border-[1.5px] border-dashed border-white rounded-xl justify-center items-center gap-1 ${
                errors.nbiClearance ? 'border-[#EF4444]' : ''
              }`}
              onPress={() => pickDocument('nbi')}
            >
              <Ionicons name="document-text-outline" size={28} color="#DBA92E" />
              <Text className="text-white text-[13px] font-semibold">Upload NBI Clearance</Text>
              <Text className="text-white/40 text-[11px]">Ensure the QR code/photo is clear</Text>
            </TouchableOpacity>
          )}
          {errors.nbiClearance && <Text className="text-[#EF4444] text-[11px] mt-1.5 font-medium">{errors.nbiClearance}</Text>}
        </View>

        <View className="flex-row justify-between mt-5 mb-10 gap-3">
          <TouchableOpacity
            className="flex-1 h-[46px] rounded-[23px] border-[1.5px] border-white/20 justify-center items-center"
            onPress={() => router.push('/(auth)/verification/Experience' as any)}
          >
            <Text className="text-white text-[14px] font-bold">Back</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-[2] h-[46px] rounded-[23px] bg-brand-blue justify-center items-center shadow-md shadow-brand-blue/20 elevation-3" onPress={handleContinue}>
            <Text className="text-brand-navy text-[14px] font-bold">Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BaseLayout>
  );
}
