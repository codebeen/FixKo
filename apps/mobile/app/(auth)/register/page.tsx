import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import BaseLayout from '@/components/layout/BaseLayout';
import { 
  validateName, 
  validateEmail, 
  validatePhone, 
  validatePassword, 
  validateConfirmPassword 
} from '@/utils/Validation';

const logo = require("../../../assets/logo_fixko.png");

interface InputGroupProps {
  label: string;
  icon: any;
  placeholder?: string;
  isPassword?: boolean;
  showPass?: boolean;
  setShowPass?: (val: boolean) => void;
  keyboardType?: any;
  labelColor?: string;
  error?: string | null;
  [key: string]: any;
}

const InputGroup = ({ label, icon, placeholder, isPassword, showPass, setShowPass, labelColor, error, ...props }: InputGroupProps) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View style={{ marginTop: 12, width: '100%' }}>
      <Text style={{ fontSize: 12.5, fontWeight: '600', marginBottom: 6, color: labelColor || '#ffffffa8' }}>{label}</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: isFocused ? '#FFF' : '#F8FAFC',
          borderWidth: 1,
          borderColor: error ? '#EF4444' : (isFocused ? '#1A56DB' : '#E2E8F0'),
          borderRadius: 8,
          paddingHorizontal: 14,
          height: 42,
          gap: 8,
          shadowColor: error ? '#EF4444' : '#1A56DB',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: isFocused ? 0.08 : 0,
          shadowRadius: 4,
          elevation: isFocused ? 2 : 0,
        }}
      >
        <Ionicons name={icon} size={18} color={error ? '#EF4444' : (isFocused ? '#1A56DB' : '#888')} />
        <TextInput
          style={{ flex: 1, fontSize: 13.5, color: '#333', paddingVertical: 4, outlineStyle: 'none' } as any}
          placeholder={placeholder}
          placeholderTextColor="#AAA"
          secureTextEntry={isPassword && !showPass}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setShowPass?.(!showPass)}>
            <Ionicons name={showPass ? "eye-outline" : "eye-off-outline"} size={18} color="#888" />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text style={{ color: '#EF4444', fontSize: 11, marginTop: 4, fontWeight: '500' }}>{error}</Text>
      )}
    </View>
  );
};

const PhoneInputGroup = ({ labelColor, value, onChangeText, error }: { labelColor?: string, value?: string, onChangeText?: (t: string) => void, error?: string | null }) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View style={{ marginTop: 12, width: '100%' }}>
      <Text style={{ fontSize: 12.5, fontWeight: '600', marginBottom: 6, color: labelColor || '#ffffffa8' }}>Phone Number</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, width: '100%' }}>
        {/* Interactive Input wrapper */}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: isFocused ? '#FFF' : '#F8FAFC',
            borderWidth: 1,
            borderColor: error ? '#EF4444' : (isFocused ? '#1A56DB' : '#E2E8F0'),
            borderRadius: 8,
            paddingHorizontal: 14,
            height: 42,
            gap: 8,
            shadowColor: error ? '#EF4444' : '#1A56DB',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: isFocused ? 0.08 : 0,
            shadowRadius: 4,
            elevation: isFocused ? 2 : 0,
          }}
        >
          <Text style={{ color: '#333', fontSize: 13.5, fontWeight: '600' }}>+63</Text>
          <TextInput
            style={{ flex: 1, fontSize: 13.5, color: '#333', paddingVertical: 4, outlineStyle: 'none' } as any}
            placeholder="912 345 6789"
            placeholderTextColor="#AAA"
            keyboardType="phone-pad"
            value={value}
            onChangeText={onChangeText}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </View>
      </View>
      {error && (
        <Text style={{ color: '#EF4444', fontSize: 11, marginTop: 4, fontWeight: '500' }}>{error}</Text>
      )}
    </View>
  );
};

interface SocialBtnProps {
  name: string;
  icon: any;
  color: string;
}

const SocialBtn = ({ name, icon, color }: SocialBtnProps) => (
  <TouchableOpacity
    style={{
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: color,
      borderRadius: 8,
      height: 40,
      gap: 8
    }}
  >
    <FontAwesome5 name={icon} size={15} color="#FFF" />
    <Text style={{ fontWeight: '600', color: '#FFF', fontSize: 13 }}>{name}</Text>
  </TouchableOpacity>
);

// --- Main Screen ---

export default function App() {
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();

  // Input states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Error states
  const [errors, setErrors] = useState<{
    name?: string | null;
    email?: string | null;
    phone?: string | null;
    password?: string | null;
    confirmPassword?: string | null;
  }>({});

  const handleRegister = () => {
    const nameErr = validateName(name);
    const emailErr = validateEmail(email);
    const phoneErr = validatePhone(phone);
    const passErr = validatePassword(password);
    const confirmErr = validateConfirmPassword(password, confirmPassword);

    if (nameErr || emailErr || phoneErr || passErr || confirmErr) {
      setErrors({
        name: nameErr,
        email: emailErr,
        phone: phoneErr,
        password: passErr,
        confirmPassword: confirmErr,
      });
      return;
    }

    setErrors({});
    router.push('/(main)/mainpage/page' as any);
  };

  return (
    <BaseLayout align="center" contentContainerStyle={{ justifyContent: 'center', marginTop: -20 }}>
      {/* Centered card width container to keep layout tight and elegant */}
      <View style={{ width: '100%', maxWidth: 320, alignItems: 'center' }}>
        <Image
          source={logo}
          style={{ width: 200, height: 100, resizeMode: 'contain' }}
        />

        {/* Header */}
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Text style={{ color: '#FFF', fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>Create Account</Text>
          <Text style={{ color: '#ffffffa8', fontSize: 13, marginTop: 4, textAlign: 'center' }}>Sign up to get started</Text>
        </View>

        {/* Inputs list */}
        <InputGroup 
          label="Full Name" 
          icon="person-outline" 
          placeholder="Enter Full Name" 
          labelColor="#ffffffa8"
          value={name}
          onChangeText={setName}
          error={errors.name}
        />
        <InputGroup 
          label="Email Address" 
          icon="mail-outline" 
          placeholder="Enter Email" 
          keyboardType="email-address" 
          labelColor="#ffffffa8"
          value={email}
          onChangeText={setEmail}
          error={errors.email}
        />

        {/* Phone Picker */}
        <PhoneInputGroup 
          labelColor="#ffffffa8" 
          value={phone}
          onChangeText={setPhone}
          error={errors.phone}
        />

        <InputGroup
          label="Password"
          icon="lock-closed-outline"
          placeholder="Enter Password"
          isPassword
          showPass={showPass}
          setShowPass={setShowPass}
          labelColor="#ffffffa8"
          value={password}
          onChangeText={setPassword}
          error={errors.password}
        />

        <InputGroup
          label="Confirm Password"
          icon="lock-closed-outline"
          placeholder="Enter Confirm Password"
          isPassword
          showPass={showPass}
          setShowPass={setShowPass}
          labelColor="#ffffffa8"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          error={errors.confirmPassword}
        />

        {/* Create Account Button */}
        <TouchableOpacity
          style={{
            backgroundColor: '#1A56DB',
            height: 42,
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 25,
            width: '100%'
          }}
          onPress={handleRegister}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 14.5 }}>Create Account</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={{ alignItems: 'center', marginVertical: 15 }}>
          <Text style={{ fontWeight: 'bold', color: '#ffffffa8', fontSize: 12 }}>OR</Text>
          <Text style={{ color: '#ffffffa8', fontSize: 11, marginTop: 2 }}>Sign up with</Text>
        </View>

        {/* Social Buttons Row */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, width: '100%' }}>
          <SocialBtn name="Google" icon="google" color="#DB4437" />
          <SocialBtn name="Facebook" icon="facebook" color="#4267B2" />
        </View>

        {/* Footer Link */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 22 }}>
          <Text style={{ color: '#ffffffa8', fontSize: 13 }}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/login/page' as any)}>
            <Text style={{ color: '#1A56DB', fontWeight: 'bold', fontSize: 13 }}>Login</Text>
          </TouchableOpacity>
        </View>

      </View>
    </BaseLayout>
  );
}