import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Modal,
} from 'react-native';

const logo = require('../../../assets/logo_fixko.png');
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import BaseLayout from '@/components/layout/(base-auth)/BaseLayout';
import { useVerification } from './_layout';
import Stepper from './components/Stepper';
import { validateEmail, validateName, validatePhone, validateRequired } from '@/utils/Validation';

const SERVICE_SUGGESTIONS = [
  'Cleaning',
  'Construction',
  'Massage',
  'Gardening',
  'Plumbing',
  'Carwash',
  'Electrical',
  'Pet Care',
  'Carpentry',
  'Painting',
  'Welding',
  'Aircon Repair',
  'Appliance Repair',
  'Roofing',
  'Landscaping',
  'Cooking / Chef',
  'Babysitting',
  'Laundry',
  'Delivery',
];

interface InputFieldProps {
  label: string;
  icon: any;
  placeholder?: string;
  error?: string | null;
  value: string;
  onChangeText: (text: string) => void;
  multiline?: boolean;
  numberOfLines?: number;
  keyboardType?: any;
}

const InputField = ({
  label,
  icon,
  placeholder,
  error,
  value,
  onChangeText,
  multiline = false,
  numberOfLines = 1,
  keyboardType = 'default',
}: InputFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View
        style={[
          styles.inputWrapper,
          multiline && styles.textAreaWrapper,
          isFocused && styles.inputFocused,
          error ? styles.inputError : null,
        ]}
      >
        <Ionicons
          name={icon}
          size={18}
          color={error ? '#EF4444' : isFocused ? '#FFF' : 'rgba(255, 255, 255, 0.6)'}
          style={multiline ? styles.iconMultiline : null}
        />
        <TextInput
          style={[
            styles.textInput,
            multiline && styles.textAreaInput,
            { outlineStyle: 'none' } as any,
          ]}
          placeholder={placeholder}
          placeholderTextColor="rgba(255, 255, 255, 0.4)"
          value={value}
          onChangeText={onChangeText}
          multiline={multiline}
          numberOfLines={numberOfLines}
          keyboardType={keyboardType}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

// --- Custom autocomplete for Service Offer ---
interface ServiceOfferInputProps {
  value: string;
  onChangeText: (text: string) => void;
  error?: string | null;
}

const ServiceOfferInput = ({ value, onChangeText, error }: ServiceOfferInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filtered = value.trim().length > 0
    ? SERVICE_SUGGESTIONS.filter((s) =>
      s.toLowerCase().includes(value.toLowerCase())
    )
    : SERVICE_SUGGESTIONS;

  const handleSelect = (suggestion: string) => {
    onChangeText(suggestion);
    setShowSuggestions(false);
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Service Offer</Text>

      {/* Input row */}
      <View
        style={[
          styles.inputWrapper,
          isFocused && styles.inputFocused,
          error ? styles.inputError : null,
        ]}
      >
        <Ionicons
          name="construct-outline"
          size={18}
          color={error ? '#EF4444' : isFocused ? '#FFF' : 'rgba(255, 255, 255, 0.6)'}
        />
        <TextInput
          style={[styles.textInput, { outlineStyle: 'none' } as any]}
          placeholder="e.g. Plumbing, Cleaning, Electrician"
          placeholderTextColor="rgba(255, 255, 255, 0.4)"
          value={value}
          onChangeText={(text) => {
            onChangeText(text);
            setShowSuggestions(true);
          }}
          onFocus={() => {
            setIsFocused(true);
            setShowSuggestions(true);
          }}
          onBlur={() => {
            setIsFocused(false);
            // Delay hide so taps on suggestions register
            setTimeout(() => setShowSuggestions(false), 150);
          }}
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={() => { onChangeText(''); setShowSuggestions(true); }}>
            <Ionicons name="close-circle" size={16} color="rgba(255,255,255,0.4)" />
          </TouchableOpacity>
        )}
      </View>

      {/* Suggestion dropdown */}
      {showSuggestions && filtered.length > 0 && (
        <View style={styles.suggestionBox}>
          <ScrollView
            keyboardShouldPersistTaps="always"
            nestedScrollEnabled
            style={{ maxHeight: 180 }}
            showsVerticalScrollIndicator={false}
          >
            {filtered.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.suggestionItem,
                  value === item && styles.suggestionItemActive,
                ]}
                onPress={() => handleSelect(item)}
              >
                <Ionicons
                  name="flash-outline"
                  size={13}
                  color={value === item ? '#FACC15' : 'rgba(255,255,255,0.45)'}
                  style={{ marginRight: 8 }}
                />
                <Text
                  style={[
                    styles.suggestionText,
                    value === item && styles.suggestionTextActive,
                  ]}
                >
                  {item}
                </Text>
                {value === item && (
                  <Ionicons name="checkmark" size={14} color="#FACC15" style={{ marginLeft: 'auto' }} />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

// --- Privacy Consent Modal ---
function PrivacyConsentModal({ visible, onAccept }: { visible: boolean; onAccept: () => void }) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={modalStyles.overlay}>
        <View style={modalStyles.card}>
          {/* Header */}
          <View style={modalStyles.headerRow}>
            <View style={modalStyles.iconBadge}>
              <Ionicons name="shield-checkmark" size={22} color="#FACC15" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={modalStyles.title}>Data Privacy Notice</Text>
              <Text style={modalStyles.subtitle}>Before you continue</Text>
            </View>
          </View>

          <View style={modalStyles.divider} />

          {/* Body */}
          <Text style={modalStyles.bodyText}>
            To complete your worker verification, FixKo will collect and process the following personal and sensitive information:
          </Text>

          <View style={modalStyles.list}>
            {[
              { icon: 'person-outline', label: 'Full name & contact details' },
              { icon: 'location-outline', label: 'Service location / address' },
              { icon: 'card-outline', label: 'Government-issued ID' },
              { icon: 'document-text-outline', label: 'NBI Clearance / certifications' },
              { icon: 'camera-outline', label: 'Selfie photo with valid ID' },
              { icon: 'construct-outline', label: 'Work experience & skills' },
            ].map(({ icon, label }) => (
              <View key={label} style={modalStyles.listItem}>
                <Ionicons name={icon as any} size={15} color="#7EB1F1" style={{ marginTop: 1 }} />
                <Text style={modalStyles.listText}>{label}</Text>
              </View>
            ))}
          </View>

          <Text style={modalStyles.noteText}>
            Your information is used solely for identity verification and service matching. It is stored securely and will not be shared with third parties without your consent, in compliance with the{' '}
            <Text style={modalStyles.highlight}>Data Privacy Act of 2012 (RA 10173)</Text>.
          </Text>

          <View style={modalStyles.divider} />

          {/* Action */}
          <TouchableOpacity style={modalStyles.acceptBtn} onPress={onAccept} activeOpacity={0.85}>
            <Ionicons name="checkmark-circle-outline" size={18} color="#001449" />
            <Text style={modalStyles.acceptBtnText}>I Understand & Agree</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default function PersonalInfoScreen() {
  const router = useRouter();
  const { personalInfo, setPersonalInfo } = useVerification();
  const [showPrivacyModal, setShowPrivacyModal] = useState(true);

  const [fullName, setFullName] = useState(personalInfo.fullName);
  const [phoneNumber, setPhoneNumber] = useState(personalInfo.phoneNumber);
  const [email, setEmail] = useState(personalInfo.email);
  const [serviceLocation, setServiceLocation] = useState(personalInfo.serviceLocation);
  const [shortBio, setShortBio] = useState(personalInfo.shortBio);
  const [serviceOffer, setServiceOffer] = useState(personalInfo.serviceOffer);

  const [errors, setErrors] = useState<Record<string, string | null>>({});

  const handleContinue = () => {
    const nameErr = validateName(fullName);
    const phoneErr = validatePhone(phoneNumber);
    const emailErr = validateEmail(email);
    const locationErr = validateRequired(serviceLocation, 'Service location');
    const bioErr = validateRequired(shortBio, 'Short bio');
    const offerErr = validateRequired(serviceOffer, 'Service offer');

    if (nameErr || phoneErr || emailErr || locationErr || bioErr || offerErr) {
      setErrors({
        fullName: nameErr,
        phoneNumber: phoneErr,
        email: emailErr,
        serviceLocation: locationErr,
        shortBio: bioErr,
        serviceOffer: offerErr,
      });
      return;
    }

    setErrors({});
    setPersonalInfo({ fullName, phoneNumber, email, serviceLocation, shortBio, serviceOffer });
    router.push('/(auth)/(verification)/Experience' as any);
  };

  return (
    <BaseLayout align="center">
      <PrivacyConsentModal
        visible={showPrivacyModal}
        onAccept={() => setShowPrivacyModal(false)}
      />
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
        </View>

        {/* Stepper */}
        <Stepper currentStep={1} />

        {/* Title */}
        <View style={styles.header}>
          <Text style={styles.title}>Personal Information</Text>
          <Text style={styles.subtitle}>Tell clients who you are and what services you offer.</Text>
        </View>

        <InputField
          label="Full Name"
          icon="person-outline"
          placeholder="e.g. Juan Dela Cruz"
          value={fullName}
          onChangeText={setFullName}
          error={errors.fullName}
        />

        <InputField
          label="Phone Number"
          icon="call-outline"
          placeholder="e.g. 9123456789"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          error={errors.phoneNumber}
        />

        <InputField
          label="Email Address"
          icon="mail-outline"
          placeholder="e.g. juan@example.com"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          error={errors.email}
        />

        <InputField
          label="Service Location (Address)"
          icon="location-outline"
          placeholder="e.g. Quezon City, Metro Manila"
          value={serviceLocation}
          onChangeText={setServiceLocation}
          error={errors.serviceLocation}
        />

        {/* Autocomplete Service Offer */}
        <ServiceOfferInput
          value={serviceOffer}
          onChangeText={setServiceOffer}
          error={errors.serviceOffer}
        />

        <InputField
          label="Short Bio"
          icon="document-text-outline"
          placeholder="Describe your skills and background in a few sentences..."
          value={shortBio}
          onChangeText={setShortBio}
          multiline
          numberOfLines={3}
          error={errors.shortBio}
        />

        {/* Action Buttons */}
        <View style={styles.btnRow}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.push('/(auth)/(role-type)/User-Type' as any)}
          >
            <Text style={styles.backBtnText}>Cancel</Text>
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
    marginBottom: 14,
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
  textAreaWrapper: {
    height: 90,
    alignItems: 'flex-start',
    paddingVertical: 10,
  },
  inputFocused: {
    borderColor: '#FFF',
    backgroundColor: '#0E2250',
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
  // --- Suggestion dropdown styles ---
  suggestionBox: {
    marginTop: 4,
    backgroundColor: '#07183B',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  suggestionItemActive: {
    backgroundColor: 'rgba(250, 204, 21, 0.08)',
  },
  suggestionText: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.75)',
  },
  suggestionTextActive: {
    color: '#FACC15',
    fontWeight: '600',
  },
  // --- Buttons ---
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
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

// --- Modal Styles ---
const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.72)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#07183B',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 22,
    paddingVertical: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 16,
  },
  iconBadge: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: 'rgba(250, 204, 21, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(250, 204, 21, 0.25)',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  subtitle: {
    fontSize: 11.5,
    color: 'rgba(255,255,255,0.45)',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginVertical: 14,
  },
  bodyText: {
    fontSize: 12.5,
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 19,
    marginBottom: 12,
  },
  list: {
    gap: 8,
    marginBottom: 14,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  listText: {
    fontSize: 12.5,
    color: 'rgba(255,255,255,0.8)',
    flex: 1,
    lineHeight: 18,
  },
  noteText: {
    fontSize: 11.5,
    color: 'rgba(255,255,255,0.45)',
    lineHeight: 17,
    fontStyle: 'italic',
  },
  highlight: {
    color: '#FACC15',
    fontWeight: '600',
    fontStyle: 'normal',
  },
  acceptBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FACC15',
    borderRadius: 50,
    height: 48,
    marginTop: 4,
  },
  acceptBtnText: {
    color: '#001449',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
