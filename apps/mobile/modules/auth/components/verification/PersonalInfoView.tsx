import React, { useState } from 'react';
import {
  Text, View, TextInput, TouchableOpacity, Image, ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Picker } from '@react-native-picker/picker';

import BaseLayout from '@/components/layout/(base-auth)/BaseLayout';
import { useVerification } from '../../context/VerificationContext';
import Stepper from '../Stepper';
import { validateEmail, validateName, validatePhone, validateRequired } from '@/utils/Validation';
import PrivacyConsentModal from '../PrivacyConsentModal';
import FixKoLogo from '@/constants/logo';

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
  'Commerce',
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
    <View className="mb-3.5 w-full">
      <View className="flex-row items-center mb-1.5">
        <Text className="text-[12.5px] font-semibold text-brand-grey mb-0">{label}</Text>
        {required && <Text className="text-[#EF4444] ml-1 text-[14px] font-bold">*</Text>}
      </View>
      <View
        className={`flex-row items-center bg-white/5 border border-brand-grey rounded-lg px-3.5 h-[42px] gap-2 ${
          multiline ? 'h-[90px] items-start py-2.5' : ''
        } ${
          isFocused ? 'border-brand-grey bg-brand-navy-medium' : ''
        } ${
          error ? 'border-[#EF4444]' : ''
        }`}
      >
        <Ionicons
          name={icon}
          size={18}
          color={error ? '#EF4444' : isFocused ? '#FFF' : 'rgba(255, 255, 255, 0.6)'}
          className={multiline ? 'mt-0.5' : undefined}
        />
        <TextInput
          className={`flex-1 text-[13.5px] text-white py-1 ${
            multiline ? 'h-full' : ''
          }`}
          style={[{ outlineStyle: 'none' } as any, multiline ? { textAlignVertical: 'top' } : null]}
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
      {error && <Text className="text-[#EF4444] text-[11px] mt-1 font-medium">{error}</Text>}
    </View>
  );
};

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
    <View className="mb-3.5 w-full">
      <View className="flex-row items-center mb-1.5">
        <Text className="text-[12.5px] font-semibold text-brand-grey mb-0">Service Offer</Text>
        <Text className="text-[#EF4444] ml-1 text-[14px] font-bold">*</Text>
      </View>

      {selected.length > 0 && (
        <View className="flex-row flex-wrap gap-1.5 mb-2">
          {selected.map((s) => (
            <TouchableOpacity
              key={s}
              className="flex-row items-center gap-1.25 bg-brand-yellow rounded-full px-2.5 py-1.25"
              onPress={() => onToggle(s)}
              activeOpacity={0.75}
            >
              <Text className="text-brand-navy text-[12px] font-bold">{s}</Text>
              <Ionicons name="close" size={12} color="#001449" />
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View
        className={`flex-row items-center bg-white/5 border border-brand-grey rounded-lg px-3.5 h-[42px] gap-2 ${
          isFocused ? 'border-brand-grey bg-brand-navy-medium' : ''
        } ${
          error ? 'border-[#EF4444]' : ''
        }`}
      >
        <Ionicons
          name="construct-outline"
          size={18}
          color={error ? '#EF4444' : isFocused ? '#FFF' : 'rgba(255, 255, 255, 0.6)'}
        />
        <TextInput
          className="flex-1 text-[13.5px] text-white py-1"
          style={{ outlineStyle: 'none' } as any}
          placeholder={selected.length > 0 ? 'Add another service...' : 'Search or select services...'}
          placeholderTextColor="rgba(255, 255, 255, 0.4)"
          value={query}
          onChangeText={(text) => {
            setQuery(text);
            setShowSuggestions(true);
          }}
          onSubmitEditing={() => {
            if (query.trim().length > 0) {
              onToggle(query.trim());
              setQuery('');
              setShowSuggestions(true);
            }
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

      {showSuggestions && filtered.length > 0 && (
        <View className="mt-1 bg-brand-navy-dark rounded-xl border border-white/15 overflow-hidden shadow-lg shadow-black/30 elevation-6">
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
                  className={`flex-row items-center py-2.5 px-3.5 border-b border-white/5 ${
                    isSelected ? 'bg-brand-yellow/8' : ''
                  }`}
                  onPress={() => {
                    onToggle(item);
                    setQuery('');
                  }}
                >
                  <Ionicons
                    name={isSelected ? 'checkmark-circle' : 'flash-outline'}
                    size={13}
                    color={isSelected ? '#FACC15' : 'rgba(255,255,255,0.45)'}
                    className="mr-2"
                  />
                  <Text
                    className={`text-[13px] ${
                      isSelected ? 'text-brand-yellow font-semibold' : 'text-white/75'
                    }`}
                  >
                    {item}
                  </Text>
                  {isSelected && (
                    <Ionicons name="checkmark" size={14} color="#FACC15" className="ml-auto" />
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}

      {error && <Text className="text-[#EF4444] text-[11px] mt-1 font-medium">{error}</Text>}
    </View>
  );
};

export default function PersonalInfoView() {
  const router = useRouter();
  const { personalInfo, setPersonalInfo } = useVerification();
  const params = useLocalSearchParams<{ fullName?: string; email?: string; phoneNumber?: string }>();
  const [showPrivacyModal, setShowPrivacyModal] = useState(true);

  const [fullName, setFullName] = useState(personalInfo.fullName || params.fullName || '');
  const [phoneNumber, setPhoneNumber] = useState(personalInfo.phoneNumber || params.phoneNumber || '');
  const [email, setEmail] = useState(personalInfo.email || params.email || '');
  const [serviceLocation, setServiceLocation] = useState(personalInfo.serviceLocation);
  const [sex, setSex] = useState(personalInfo.sex);
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
    const sexErr = validateRequired(sex, 'Sex');
    const offerErr = serviceOffer.length === 0 ? 'Please select at least one service' : null;

    if (nameErr || phoneErr || emailErr || locationErr || sexErr || offerErr) {
      setErrors({
        fullName: nameErr,
        phoneNumber: phoneErr,
        email: emailErr,
        serviceLocation: locationErr,
        sex: sexErr,
        serviceOffer: offerErr,
      });
      return;
    }
    setErrors({});
    setPersonalInfo({ fullName, phoneNumber, email, serviceLocation, shortBio: '', serviceOffer, sex });
    router.push('/(auth)/verification/Experience' as any);
  };

  return (
    <BaseLayout align="center">
      <PrivacyConsentModal
        visible={showPrivacyModal}
        onAccept={() => setShowPrivacyModal(false)}
      />
      <View className="w-full max-w-[340px]">
        <View className="items-center mb-3 -mt-2.5">
          <Image source={FixKoLogo} style={{ width: 180, height: 90 }} resizeMode="contain" />
        </View>

        <Stepper currentStep={1} />

        <View className="mb-5">
          <Text className="text-[22px] font-bold text-brand-grey mb-1.5">Personal Information</Text>
          <Text className="text-[13px] text-brand-grey leading-[18px]">Tell clients who you are and what services you offer.</Text>
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

        <View className="mb-3.5 w-full">
          <View className="flex-row items-center mb-1.5">
            <Text className="text-[12.5px] font-semibold text-brand-grey mb-0">Sex</Text>
            <Text className="text-[#EF4444] ml-1 text-[14px] font-bold">*</Text>
          </View>
          <View className={`flex-row items-center bg-white/5 border rounded-lg px-3.5 h-[42px] gap-2 ${
            errors.sex ? 'border-[#EF4444]' : 'border-brand-grey'
          }`}>
            <Ionicons
              name="transgender-outline"
              size={18}
              color={errors.sex ? '#EF4444' : 'rgba(255, 255, 255, 0.6)'}
            />
            <Picker
              selectedValue={sex}
              onValueChange={(itemValue) => {
                setSex(itemValue);
                setErrors((prev) => ({ ...prev, sex: null }));
              }}
              style={[
                { 
                  flex: 1,
                  fontSize: 13.5,
                  paddingVertical: 4,
                  backgroundColor: 'transparent', 
                  borderWidth: 0,
                  outlineStyle: 'none',
                  color: sex ? '#FFF' : '#A0A0A0'
                } as any
              ]}
              dropdownIconColor={errors.sex ? '#EF4444' : '#FFF'}
            >
              <Picker.Item 
                label="Select sex..." 
                value="" 
                color="#A0A0A0" 
                style={{ backgroundColor: '#07183B', color: '#A0A0A0' } as any} 
              />
              <Picker.Item 
                label="Male" 
                value="male" 
                color="#A0A0A0" 
                style={{ backgroundColor: '#07183B', color: '#A0A0A0' } as any} 
              />
              <Picker.Item 
                label="Female" 
                value="female" 
                color="#A0A0A0" 
                style={{ backgroundColor: '#07183B', color: '#A0A0A0' } as any} 
              />
            </Picker>
          </View>
          {errors.sex && <Text className="text-[#EF4444] text-[11px] mt-1 font-medium">{errors.sex}</Text>}
        </View>

        <ServiceOfferInput
          selected={serviceOffer}
          onToggle={toggleService}
          error={errors.serviceOffer}
        />

        <View className="flex-row justify-between mt-6 mb-10 gap-3">
          <TouchableOpacity
            className="flex-1 h-[46px] rounded-[23px] border-[1.5px] border-white/20 justify-center items-center"
            onPress={() => router.push('/(auth)/User-Type' as any)}
          >
            <Text className="text-white text-[14px] font-bold">Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="flex-[2] h-[46px] rounded-[23px] bg-brand-blue justify-center items-center shadow-md shadow-brand-blue/20 elevation-3"
            onPress={handleContinue}
          >
            <Text className="text-brand-navy text-[14px] font-bold">Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BaseLayout>
  );
}
