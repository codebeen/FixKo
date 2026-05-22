import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import BaseLayout from '@/components/layout/(base-auth)/BaseLayout';
import { useVerification } from './_layout';
import Stepper from './components/Stepper';

const logo = require('../../../assets/logo_fixko.png');

export default function ExperienceScreen() {
  const router = useRouter();
  const { experience, setExperience } = useVerification();

  // Local state initialized from context
  const [workExperience, setWorkExperience] = useState(experience.workExperience);
  const [certification, setCertification] = useState<string | null>(experience.certification);
  const [imagesProof, setImagesProof] = useState<string[]>(experience.imagesProof);

  // Error states
  const [errors, setErrors] = useState<Record<string, string | null>>({});

  const requestPermissionAndPickImage = async (onPick: (uri: string) => void) => {
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
      onPick(result.assets[0].uri);
    }
  };

  const handlePickCertification = () => {
    requestPermissionAndPickImage((uri) => {
      setCertification(uri);
      setErrors((prev) => ({ ...prev, certification: null }));
    });
  };

  const handlePickProofImage = () => {
    requestPermissionAndPickImage((uri) => {
      setImagesProof((prev) => [...prev, uri]);
      setErrors((prev) => ({ ...prev, imagesProof: null }));
    });
  };

  const removeProofImage = (indexToRemove: number) => {
    setImagesProof((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleContinue = (shouldSkip: boolean = false) => {
    if (shouldSkip) {
      // Save skipped experience state
      setExperience({
        workExperience: '',
        certification: null,
        imagesProof: [],
        skipped: true,
      });
      router.push('/(auth)/(verification)/IdentityVerification' as any);
      return;
    }

    // Validate if not skipped
    let hasError = false;
    const newErrors: Record<string, string | null> = {};

    if (!workExperience.trim()) {
      newErrors.workExperience = 'Work experience description or years is required';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    // Save to context
    setExperience({
      workExperience,
      certification,
      imagesProof,
      skipped: false,
    });

    router.push('/(auth)/(verification)/IdentityVerification' as any);
  };

  return (
    <BaseLayout align="center">
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
        </View>

        {/* Stepper progress */}
        <Stepper currentStep={2} />

        {/* Title */}
        <View style={styles.header}>
          <Text style={styles.title}>Experience & Work Proof</Text>
          <Text style={styles.subtitle}>
            Showcase your professional experience, qualifications, and past works.
          </Text>
        </View>

        {/* Work Experience Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Years of Experience / Description</Text>
          <View style={[styles.inputWrapper, styles.textAreaWrapper, errors.workExperience ? styles.inputError : null]}>
            <Ionicons name="briefcase-outline" size={18} color="rgba(255, 255, 255, 0.4)" style={styles.iconMultiline} />
            <TextInput
              style={[styles.textInput, styles.textAreaInput, { outlineStyle: 'none' } as any]}
              placeholder={"e.g. 5 Years in plumbing\nCommercial & residential installations\nSpecialize in pipe fitting"}
              placeholderTextColor="rgba(255, 255, 255, 0.3)"
              value={workExperience}
              onChangeText={setWorkExperience}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
          {errors.workExperience && <Text style={styles.errorText}>{errors.workExperience}</Text>}
        </View>

        {/* Certification Upload */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Certification (Optional)</Text>
          {certification ? (
            <View style={styles.imagePreviewContainer}>
              <Image source={{ uri: certification }} style={styles.imagePreview} />
              <TouchableOpacity
                style={styles.deleteBadge}
                onPress={() => setCertification(null)}
              >
                <Ionicons name="close" size={16} color="#FFF" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.uploadBox} onPress={handlePickCertification}>
              <Ionicons name="document-attach-outline" size={26} color="#DBA92E" />
              <Text style={styles.uploadBoxText}>Upload Certificate or License</Text>
              <Text style={styles.uploadBoxSubtext}>Supports JPG, PNG (Max 5MB)</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Images Proof Grid */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Past Work Images Proof (Optional)</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.proofScroll}>
            {imagesProof.map((uri, index) => (
              <View key={index} style={styles.proofImageWrapper}>
                <Image source={{ uri }} style={styles.proofImage} />
                <TouchableOpacity
                  style={styles.deleteBadge}
                  onPress={() => removeProofImage(index)}
                >
                  <Ionicons name="trash-outline" size={14} color="#FFF" />
                </TouchableOpacity>
              </View>
            ))}

            <TouchableOpacity style={styles.addProofBox} onPress={handlePickProofImage}>
              <Ionicons name="add-circle-outline" size={24} color="#7EB1F1" />
              <Text style={styles.addProofText}>Add Photo</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Skip for Now trigger */}
        <TouchableOpacity style={styles.skipBtn} onPress={() => handleContinue(true)}>
          <Text style={styles.skipBtnText}>Skip this step for now</Text>
        </TouchableOpacity>

        {/* Action Buttons */}
        <View style={styles.btnRow}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.push('/(auth)/(verification)/PersonalInfo' as any)}
          >
            <Text style={styles.backBtnText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.continueBtn} onPress={() => handleContinue(false)}>
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
    marginBottom: 16,
    width: '100%',
  },
  inputLabel: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#FFF',
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 14,
    height: 42,
    gap: 8,
  },
  inputError: {
    borderColor: '#EF4444',
  },
  textInput: {
    flex: 1,
    fontSize: 13.5,
    color: '#FFF',
    paddingVertical: 4,
  },
  textAreaWrapper: {
    height: 100,
    alignItems: 'flex-start',
    paddingVertical: 10,
  },
  textAreaInput: {
    textAlignVertical: 'top',
    height: '100%',
  },
  iconMultiline: {
    marginTop: 2,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 11,
    marginTop: 4,
    fontWeight: '500',
  },
  uploadBox: {
    height: 110,
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
  imagePreviewContainer: {
    height: 120,
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
  proofScroll: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 4,
  },
  proofImageWrapper: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  proofImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  addProofBox: {
    width: 80,
    height: 80,
    borderRadius: 8,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#FFF',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  addProofText: {
    color: '#7EB1F1',
    fontSize: 11,
    fontWeight: 'bold',
  },
  skipBtn: {
    alignSelf: 'center',
    marginVertical: 12,
    padding: 8,
  },
  skipBtnText: {
    color: '#DBA92E',
    fontWeight: '600',
    fontSize: 13,
    textDecorationLine: 'underline',
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
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
