import React, { useState, useRef } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import BaseLayout from '@/components/layout/(base-auth)/BaseLayout';
import { useVerification } from '../../context/VerificationContext';
import Stepper from '../Stepper';
import FixKoLogo from '@/constants/logo';

export default function SelfieWithIDView() {
  const router = useRouter();
  const { selfie, setSelfie } = useVerification();

  const [selfieWithId, setSelfieWithId] = useState<string | null>(selfie.selfieWithId);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0); // 0: idle, 1: scanning, 2: analyzing, 3: completed
  const [errors, setErrors] = useState<string | null>(null);

  const scanLineAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const pickSelfie = async () => {
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
      setSelfieWithId(result.assets[0].uri);
      setErrors(null);
    }
  };

  const startFacialScan = () => {
    if (!selfieWithId) {
      setErrors('Please upload a selfie holding your ID before running the verification.');
      return;
    }

    setErrors(null);
    setIsScanning(true);
    setScanStep(1);

    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLineAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(scanLineAnim, {
          toValue: 0,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    ).start();

    setTimeout(() => {
      setScanStep(2); // Analyzing
    }, 2200);

    setTimeout(() => {
      setScanStep(3); // Completed successfully
      setIsScanning(false);
    }, 4500);
  };

  const handleContinue = () => {
    if (!selfieWithId) {
      setErrors('Selfie with ID is required.');
      return;
    }

    if (scanStep !== 3) {
      setErrors('Please complete the Facial Recognition biometric scan before continuing.');
      return;
    }

    setSelfie({
      selfieWithId,
    });

    router.push('/(auth)/verification/Review' as any);
  };

  const translateY = scanLineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 160], // Scan boundary height
  });

  return (
    <BaseLayout align="center">
      <View className="w-full max-w-[340px]">
        <View className="items-center mb-3 -mt-2.5">
          <Image source={FixKoLogo} style={{ width: 180, height: 90 }} resizeMode="contain" />
        </View>

        <Stepper currentStep={4} />

        <View className="mb-4">
          <Text className="text-[22px] font-bold text-white mb-1.5">Biometric Face Scan</Text>
          <Text className="text-[13px] text-white/60 leading-[18px]">
            Take a selfie with your ID and complete the face verification step.
          </Text>
        </View>

        <View className="bg-white/3 border border-white/8 rounded-2xl p-4 mb-4">
          <Text className="text-[14.5px] font-bold text-white mb-1.5">1. Selfie holding your ID</Text>
          <Text className="text-[11.5px] text-white/55 mb-3 leading-[16px]">
            Hold your ID next to your face. Make sure your face and the details on your card are clear and readable.
          </Text>

          {selfieWithId ? (
            <View className="h-[130px] rounded-xl overflow-hidden relative border border-white/15">
              <Image source={{ uri: selfieWithId }} className="w-full h-full" resizeMode="cover" />
              <TouchableOpacity
                className="absolute top-2 right-2 bg-black/60 w-6 h-6 rounded-full justify-center items-center"
                onPress={() => {
                  setSelfieWithId(null);
                  setScanStep(0);
                }}
              >
                <Ionicons name="close" size={16} color="#FFF" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity className="h-[100px] bg-white/2 border-[1.5px] border-dashed border-white rounded-xl justify-center items-center gap-1" onPress={pickSelfie}>
              <Ionicons name="camera-outline" size={32} color="#DBA92E" />
              <Text className="text-white text-[13px] font-semibold">Upload Selfie with ID</Text>
              <Text className="text-white/40 text-[11px]">Supports Portrait Photos (Max 5MB)</Text>
            </TouchableOpacity>
          )}
        </View>

        <View className="bg-white/3 border border-white/8 rounded-2xl p-4 mb-4">
          <Text className="text-[14.5px] font-bold text-white mb-1.5">2. Biometric Verification</Text>
          <Text className="text-[11.5px] text-white/55 mb-3 leading-[16px]">
            Our AI will match your face against your uploaded ID credentials.
          </Text>

          <View className="items-center mt-2.5">
            <Animated.View
              className={`w-[160px] h-[160px] rounded-[80px] border-3 justify-center items-center overflow-hidden bg-[#0E1E45] relative ${
                scanStep === 3
                  ? 'border-[#10B981]'
                  : isScanning
                  ? 'border-brand-blue'
                  : 'border-white/15'
              }`}
              style={{ transform: [{ scale: pulseAnim }] }}
            >
              {selfieWithId ? (
                <View className="w-full h-full justify-center items-center">
                  <Image source={{ uri: selfieWithId }} className="w-full h-full" resizeMode="cover" />
                  {isScanning && (
                    <Animated.View 
                      className="absolute left-0 right-0 h-1 bg-[#3B82F6] shadow-sm shadow-[#3B82F6]" 
                      style={{ transform: [{ translateY }] }} 
                    />
                  )}
                  {scanStep === 3 && (
                    <View className="absolute inset-0 bg-brand-navy/75 justify-center items-center gap-1">
                      <Ionicons name="checkmark-circle" size={54} color="#10B981" />
                      <Text className="text-[#10B981] font-bold text-[14px]">Verified</Text>
                    </View>
                  )}
                </View>
              ) : (
                <Ionicons name="person" size={60} color="rgba(255, 255, 255, 0.15)" />
              )}
            </Animated.View>

            <View className="h-[30px] justify-center mt-2.5 mb-2.5">
              {scanStep === 0 && (
                <Text className="text-white/40 text-[12px]">Waiting for Selfie Upload</Text>
              )}
              {scanStep === 1 && (
                <View className="flex-row items-center gap-2">
                  <Text className="text-brand-blue font-semibold text-[12.5px]">Scanning face landmarks...</Text>
                </View>
              )}
              {scanStep === 2 && (
                <View className="flex-row items-center gap-2">
                  <Text className="text-brand-blue font-semibold text-[12.5px]">Matching selfie with ID card...</Text>
                </View>
              )}
              {scanStep === 3 && (
                <Text className="text-[#10B981] font-bold text-[12.5px]">Biometric check matched 98.4%!</Text>
              )}
            </View>

            {scanStep < 3 && (
              <TouchableOpacity
                disabled={!selfieWithId || isScanning}
                className={`flex-row bg-brand-blue px-4 h-9 rounded-[18px] justify-center items-center gap-1.5 shadow-sm shadow-brand-blue/15 elevation-2 ${
                  (!selfieWithId || isScanning) ? 'bg-white/15' : ''
                }`}
                onPress={startFacialScan}
              >
                <Ionicons name="finger-print-outline" size={18} color="#001449" />
                <Text className="text-brand-navy font-bold text-[12px]">
                  {isScanning ? 'Scanning...' : 'Start Facial Scan'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {errors && <Text className="text-[#EF4444] text-[11px] font-medium text-center my-2.5">{errors}</Text>}

        <View className="flex-row justify-between mt-3 mb-10 gap-3">
          <TouchableOpacity
            className="flex-1 h-[46px] rounded-[23px] border-[1.5px] border-white/20 justify-center items-center"
            onPress={() => router.push('/(auth)/verification/IdentityVerification' as any)}
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
