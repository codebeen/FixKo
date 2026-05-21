import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import BaseLayout from '@/components/layout/BaseLayout';
import { useVerification } from './_layout';
import Stepper from './components/Stepper';

const logo = require('../../../assets/logo_fixko.png');

export default function IdentityVerificationScreen() {
  const router = useRouter();
  const { identity, setIdentity } = useVerification();

  // Local state initialized from context
  const [governmentId, setGovernmentId] = useState<string | null>(identity.governmentId);
  const [nbiClearance, setNbiClearance] = useState<string | null>(identity.nbiClearance);

  // Errors state
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
    
    // Save to context
    setIdentity({
      governmentId,
      nbiClearance,
    });

    // Go to next step
    router.push('/(auth)/(verification)/SelfieWithID' as any);
  };

  return (
    <BaseLayout align="center">
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
        </View>

        {/* Stepper progress */}
        <Stepper currentStep={3} />

        {/* Title */}
        <View style={styles.header}>
          <Text style={styles.title}>Identity Verification</Text>
          <Text style={styles.subtitle}>
            Please upload clear copies of your documents to verify your identity.
          </Text>
        </View>

        {/* Government ID Section */}
        <View style={styles.inputContainer}>
          <View style={styles.labelRow}>
            <Text style={styles.inputLabel}>Government-issued ID</Text>
            <Text style={styles.requiredAsterisk}>*</Text>
          </View>
          <Text style={styles.infoNote}>
            Accepted IDs: Passport, UMID, Driver's License, SSS, Postal ID, PRC, Voter's ID.
          </Text>
          
          {governmentId ? (
            <View style={styles.imagePreviewContainer}>
              <Image source={{ uri: governmentId }} style={styles.imagePreview} />
              <TouchableOpacity
                style={styles.deleteBadge}
                onPress={() => setGovernmentId(null)}
              >
                <Ionicons name="close" size={16} color="#FFF" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity 
              style={[styles.uploadBox, errors.governmentId ? styles.uploadBoxError : null]} 
              onPress={() => pickDocument('govId')}
            >
              <Ionicons name="card-outline" size={28} color="#DBA92E" />
              <Text style={styles.uploadBoxText}>Upload Front of ID Card</Text>
              <Text style={styles.uploadBoxSubtext}>Must be clear and legible</Text>
            </TouchableOpacity>
          )}
          {errors.governmentId && <Text style={styles.errorText}>{errors.governmentId}</Text>}
        </View>

        {/* NBI Clearance Section */}
        <View style={styles.inputContainer}>
          <View style={styles.labelRow}>
            <Text style={styles.inputLabel}>NBI Clearance Certificate</Text>
            <Text style={styles.requiredAsterisk}>*</Text>
          </View>
          <Text style={styles.infoNote}>
            Must be issued within the last 6 months with clear visible text.
          </Text>

          {nbiClearance ? (
            <View style={styles.imagePreviewContainer}>
              <Image source={{ uri: nbiClearance }} style={styles.imagePreview} />
              <TouchableOpacity
                style={styles.deleteBadge}
                onPress={() => setNbiClearance(null)}
              >
                <Ionicons name="close" size={16} color="#FFF" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity 
              style={[styles.uploadBox, errors.nbiClearance ? styles.uploadBoxError : null]} 
              onPress={() => pickDocument('nbi')}
            >
              <Ionicons name="document-text-outline" size={28} color="#DBA92E" />
              <Text style={styles.uploadBoxText}>Upload NBI Clearance</Text>
              <Text style={styles.uploadBoxSubtext}>Ensure the QR code/photo is clear</Text>
            </TouchableOpacity>
          )}
          {errors.nbiClearance && <Text style={styles.errorText}>{errors.nbiClearance}</Text>}
        </View>

        {/* Action Buttons */}
        <View style={styles.btnRow}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.push('/(auth)/(verification)/Experience' as any)}
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
    marginBottom: 20,
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
  inputContainer: {
    marginBottom: 20,
    width: '100%',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  inputLabel: {
    fontSize: 13.5,
    fontWeight: '600',
    color: '#FFF',
  },
  requiredAsterisk: {
    color: '#EF4444',
    marginLeft: 4,
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoNote: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.45)',
    marginBottom: 8,
    lineHeight: 15,
  },
  uploadBox: {
    height: 120,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#FFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  uploadBoxError: {
    borderColor: '#EF4444',
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
  imagePreviewContainer: {
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
  errorText: {
    color: '#EF4444',
    fontSize: 11,
    marginTop: 6,
    fontWeight: '500',
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
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
