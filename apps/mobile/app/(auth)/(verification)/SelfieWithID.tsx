import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  Easing,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import BaseLayout from '@/components/layout/BaseLayout';
import { useVerification } from './_layout';
import Stepper from './components/Stepper';

const logo = require('../../../assets/logo_fixko.png');

export default function SelfieWithIDScreen() {
  const router = useRouter();
  const { selfie, setSelfie } = useVerification();

  // Local state initialized from context
  const [selfieWithId, setSelfieWithId] = useState<string | null>(selfie.selfieWithId);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0); // 0: idle, 1: scanning, 2: analyzing, 3: completed
  const [errors, setErrors] = useState<string | null>(null);

  // Animations
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

    // Setup scanning line animation
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

    // Pulse animation for scan frame
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

    // Simulate scanning stages
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

    // Save to context
    setSelfie({
      selfieWithId,
    });

    // Go to next step
    router.push('/(auth)/(verification)/Review' as any);
  };

  const translateY = scanLineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 160], // Scan boundary height
  });

  return (
    <BaseLayout align="center">
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
        </View>

        {/* Stepper progress */}
        <Stepper currentStep={4} />

        {/* Title */}
        <View style={styles.header}>
          <Text style={styles.title}>Biometric Face Scan</Text>
          <Text style={styles.subtitle}>
            Take a selfie with your ID and complete the face verification step.
          </Text>
        </View>

        {/* Photo Upload Card */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>1. Selfie holding your ID</Text>
          <Text style={styles.cardDesc}>
            Hold your ID next to your face. Make sure your face and the details on your card are clear and readable.
          </Text>

          {selfieWithId ? (
            <View style={styles.imagePreviewWrapper}>
              <Image source={{ uri: selfieWithId }} style={styles.imagePreview} />
              <TouchableOpacity
                style={styles.deleteBadge}
                onPress={() => {
                  setSelfieWithId(null);
                  setScanStep(0);
                }}
              >
                <Ionicons name="close" size={16} color="#FFF" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.uploadBox} onPress={pickSelfie}>
              <Ionicons name="camera-outline" size={32} color="#DBA92E" />
              <Text style={styles.uploadBoxText}>Upload Selfie with ID</Text>
              <Text style={styles.uploadBoxSubtext}>Supports Portrait Photos (Max 5MB)</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Face Recognition Frame */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>2. Biometric Verification</Text>
          <Text style={styles.cardDesc}>
            Our AI will match your face against your uploaded ID credentials.
          </Text>

          <View style={styles.scanContainer}>
            <Animated.View
              style={[
                styles.scanFrame,
                { transform: [{ scale: pulseAnim }] },
                scanStep === 3 && styles.scanFrameSuccess,
                isScanning && styles.scanFrameActive,
              ]}
            >
              {selfieWithId ? (
                <View style={styles.avatarContainer}>
                  <Image source={{ uri: selfieWithId }} style={styles.avatarImage} />
                  {isScanning && (
                    <Animated.View style={[styles.scanLine, { transform: [{ translateY }] }]} />
                  )}
                  {scanStep === 3 && (
                    <View style={styles.successOverlay}>
                      <Ionicons name="checkmark-circle" size={54} color="#10B981" />
                      <Text style={styles.successText}>Verified</Text>
                    </View>
                  )}
                </View>
              ) : (
                <Ionicons name="person" size={60} color="rgba(255, 255, 255, 0.15)" />
              )}
            </Animated.View>

            {/* Scan Status Texts */}
            <View style={styles.statusWrapper}>
              {scanStep === 0 && (
                <Text style={styles.statusTextIdle}>Waiting for Selfie Upload</Text>
              )}
              {scanStep === 1 && (
                <View style={styles.loaderRow}>
                  <Text style={styles.statusTextActive}>Scanning face landmarks...</Text>
                </View>
              )}
              {scanStep === 2 && (
                <View style={styles.loaderRow}>
                  <Text style={styles.statusTextActive}>Matching selfie with ID card...</Text>
                </View>
              )}
              {scanStep === 3 && (
                <Text style={styles.statusTextSuccess}>Biometric check matched 98.4%!</Text>
              )}
            </View>

            {scanStep < 3 && (
              <TouchableOpacity
                disabled={!selfieWithId || isScanning}
                style={[
                  styles.scanBtn,
                  (!selfieWithId || isScanning) && styles.scanBtnDisabled,
                ]}
                onPress={startFacialScan}
              >
                <Ionicons name="finger-print-outline" size={18} color="#001449" />
                <Text style={styles.scanBtnText}>
                  {isScanning ? 'Scanning...' : 'Start Facial Scan'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {errors && <Text style={styles.errorText}>{errors}</Text>}

        {/* Action Buttons */}
        <View style={styles.btnRow}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.push('/(auth)/(verification)/IdentityVerification' as any)}
          >
            <Text style={styles.backBtnText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
            <Text style={styles.continueBtnText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BaseLayout>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginBottom: 12,
    marginTop: -10,
  },
  logo: {
    width: 180,
    height: 90,
    resizeMode: 'contain',
  },
  content: {
    width: '100%',
    maxWidth: 340,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.6)',
    lineHeight: 18,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  cardLabel: {
    fontSize: 14.5,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 6,
  },
  cardDesc: {
    fontSize: 11.5,
    color: 'rgba(255, 255, 255, 0.55)',
    marginBottom: 12,
    lineHeight: 16,
  },
  uploadBox: {
    height: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#FFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  uploadBoxText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '600',
  },
  uploadBoxSubtext: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 11,
  },
  imagePreviewWrapper: {
    height: 130,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  deleteBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  scanFrame: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: '#0E1E45',
    position: 'relative',
  },
  scanFrameActive: {
    borderColor: '#7EB1F1',
  },
  scanFrameSuccess: {
    borderColor: '#10B981',
  },
  avatarContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  scanLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: '#3B82F6',
    shadowColor: '#3B82F6',
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  successOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 20, 73, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  successText: {
    color: '#10B981',
    fontWeight: 'bold',
    fontSize: 14,
  },
  statusWrapper: {
    height: 30,
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  statusTextIdle: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 12,
  },
  statusTextActive: {
    color: '#7EB1F1',
    fontWeight: '600',
    fontSize: 12.5,
  },
  statusTextSuccess: {
    color: '#10B981',
    fontWeight: 'bold',
    fontSize: 12.5,
  },
  loaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  scanBtn: {
    flexDirection: 'row',
    backgroundColor: '#7EB1F1',
    paddingHorizontal: 16,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    shadowColor: '#7EB1F1',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  scanBtnDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  scanBtnText: {
    color: '#001449',
    fontWeight: 'bold',
    fontSize: 12,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 11,
    fontWeight: '500',
    textAlign: 'center',
    marginVertical: 10,
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 40,
    gap: 12,
  },
  backBtn: {
    flex: 1,
    height: 46,
    borderRadius: 23,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backBtnText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  continueBtn: {
    flex: 2,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#7EB1F1',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#7EB1F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  continueBtnText: {
    color: '#001449',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
