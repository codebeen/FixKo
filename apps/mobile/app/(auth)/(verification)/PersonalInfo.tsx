import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView,
} from 'react-native';

const logo = require('../../../assets/logo_fixko.png');
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import BaseLayout from '@/components/layout/(base-auth)/BaseLayout';
import { useVerification } from './_layout';
import Stepper from './components/Stepper';
import { validateEmail, validateName, validatePhone, validateRequired } from '@/utils/Validation';
import PrivacyConsentModal from './components/modal/PrivacyConsentModal';

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
  required?: boolean;
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
  required = false,
}: InputFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View style={styles.inputContainer}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
        <Text style={[styles.inputLabel, { marginBottom: 0 }]}>{label}</Text>
        {required && <Text style={styles.requiredAsterisk}>*</Text>}
      </View>
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

// --- Multi-select Service Offer Input ---
interface ServiceOfferInputProps {
  selected: string[];
  onToggle: (service: string) => void;
  error?: string | null;
}

const ServiceOfferInput = ({ selected, onToggle, error }: ServiceOfferInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState('');

  const filtered = query.trim().length > 0
    ? SERVICE_SUGGESTIONS.filter((s) =>
        s.toLowerCase().includes(query.toLowerCase())
      )
    : SERVICE_SUGGESTIONS;

  return (
    <View style={styles.inputContainer}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
        <Text style={[styles.inputLabel, { marginBottom: 0 }]}>Service Offer</Text>
        <Text style={styles.requiredAsterisk}>*</Text>
      </View>

      {/* Selected chips */}
      {selected.length > 0 && (
        <View style={styles.chipRow}>
          {selected.map((s) => (
            <TouchableOpacity
              key={s}
              style={styles.chip}
              onPress={() => onToggle(s)}
              activeOpacity={0.75}
            >
              <Text style={styles.chipText}>{s}</Text>
              <Ionicons name="close" size={12} color="#001449" />
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Search input */}
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
          placeholder={selected.length > 0 ? 'Add another service...' : 'Search or select services...'}
          placeholderTextColor="rgba(255, 255, 255, 0.4)"
          value={query}
          onChangeText={(text) => {
            setQuery(text);
            setShowSuggestions(true);
          }}
          onFocus={() => {
            setIsFocused(true);
            setShowSuggestions(true);
          }}
          onBlur={() => {
            setIsFocused(false);
            setTimeout(() => setShowSuggestions(false), 150);
          }}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => { setQuery(''); setShowSuggestions(true); }}>
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
            {filtered.map((item) => {
              const isSelected = selected.includes(item);
              return (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.suggestionItem,
                    isSelected && styles.suggestionItemActive,
                  ]}
                  onPress={() => {
                    onToggle(item);
                    setQuery('');
                  }}
                >
                  <Ionicons
                    name={isSelected ? 'checkmark-circle' : 'flash-outline'}
                    size={13}
                    color={isSelected ? '#FACC15' : 'rgba(255,255,255,0.45)'}
                    style={{ marginRight: 8 }}
                  />
                  <Text
                    style={[
                      styles.suggestionText,
                      isSelected && styles.suggestionTextActive,
                    ]}
                  >
                    {item}
                  </Text>
                  {isSelected && (
                    <Ionicons name="checkmark" size={14} color="#FACC15" style={{ marginLeft: 'auto' }} />
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};



export default function PersonalInfoScreen() {
  const router = useRouter();
  const { personalInfo, setPersonalInfo } = useVerification();
  const [showPrivacyModal, setShowPrivacyModal] = useState(true);

  const [fullName, setFullName] = useState(personalInfo.fullName);
  const [phoneNumber, setPhoneNumber] = useState(personalInfo.phoneNumber);
  const [email, setEmail] = useState(personalInfo.email);
  const [serviceLocation, setServiceLocation] = useState(personalInfo.serviceLocation);
  const [shortBio, setShortBio] = useState(personalInfo.shortBio);
  const [serviceOffer, setServiceOffer] = useState<string[]>(personalInfo.serviceOffer);

  const [errors, setErrors] = useState<Record<string, string | null>>({});

  const toggleService = (service: string) => {
    setServiceOffer((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
    setErrors((prev) => ({ ...prev, serviceOffer: null }));
  };

  const handleContinue = () => {
    const nameErr = validateName(fullName);
    const phoneErr = validatePhone(phoneNumber);
    const emailErr = validateEmail(email);
    const locationErr = validateRequired(serviceLocation, 'Service location');
    const bioErr = validateRequired(shortBio, 'Short bio');
    const offerErr = serviceOffer.length === 0 ? 'Please select at least one service' : null;

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
          required
          value={fullName}
          onChangeText={setFullName}
          error={errors.fullName}
        />

        <InputField
          label="Phone Number"
          icon="call-outline"
          placeholder="e.g. 9123456789"
          keyboardType="phone-pad"
          required
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          error={errors.phoneNumber}
        />

        <InputField
          label="Email Address"
          icon="mail-outline"
          placeholder="e.g. juan@example.com"
          keyboardType="email-address"
          required
          value={email}
          onChangeText={setEmail}
          error={errors.email}
        />

        <InputField
          label="Service Location (Address)"
          icon="location-outline"
          placeholder="e.g. Quezon City, Metro Manila"
          required
          value={serviceLocation}
          onChangeText={setServiceLocation}
          error={errors.serviceLocation}
        />

        {/* Multi-select Service Offer */}
        <ServiceOfferInput
          selected={serviceOffer}
          onToggle={toggleService}
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
  // --- Multi-select chips ---
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#FACC15',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  chipText: {
    color: '#001449',
    fontSize: 12,
    fontWeight: '700',
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
  // --- Required asterisk ---
  requiredAsterisk: {
    color: '#EF4444',
    marginLeft: 4,
    fontSize: 14,
    fontWeight: 'bold',
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

