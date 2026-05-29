import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import BaseLayout from '@/components/layout/(base-auth)/BaseLayout';
import {
  validateName,
  validateEmail,
  validatePhone,
  validatePassword,
  validateConfirmPassword
} from '@/utils/Validation';
import FixKoLogo from '@/constants/logo';

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
    <View className="mt-3 w-full">
      <Text
        className="text-[12.5px] font-semibold mb-1.5"
        style={{ color: labelColor || '#ffffffa8' }}
      >
        {label}
      </Text>
      <View
        className={`flex-row items-center rounded-lg px-3.5 h-[42px] gap-2 border ${isFocused ? 'bg-white' : 'bg-slate-50'
          } ${error ? 'border-[#EF4444]' : (isFocused ? 'border-[#1A56DB]' : 'border-slate-200')
          } ${isFocused ? 'shadow-sm shadow-[#1A56DB]/8 elevation-1' : ''
          } ${error && isFocused ? 'shadow-sm shadow-[#EF4444]/8' : ''
          }`}
      >
        <Ionicons name={icon} size={18} color={error ? '#EF4444' : (isFocused ? '#1A56DB' : '#888')} />
        <TextInput
          className="flex-1 text-[13.5px] text-[#333] py-1"
          style={{ outlineStyle: 'none' } as any}
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
        <Text className="text-[#EF4444] text-[11px] mt-1 font-medium">{error}</Text>
      )}
    </View>
  );
};

const PhoneInputGroup = ({ labelColor, value, onChangeText, error }: { labelColor?: string, value?: string, onChangeText?: (t: string) => void, error?: string | null }) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View className="mt-3 w-full">
      <Text
        className="text-[12.5px] font-semibold mb-1.5"
        style={{ color: labelColor || '#ffffffa8' }}
      >
        Phone Number
      </Text>
      <View className="flex-row items-center gap-2.5 w-full">
        <View
          className={`flex-1 flex-row items-center rounded-lg px-3.5 h-[42px] gap-2 border ${isFocused ? 'bg-white' : 'bg-slate-50'
            } ${error ? 'border-[#EF4444]' : (isFocused ? 'border-[#1A56DB]' : 'border-slate-200')
            } ${isFocused ? 'shadow-sm shadow-[#1A56DB]/8 elevation-1' : ''
            } ${error && isFocused ? 'shadow-sm shadow-[#EF4444]/8' : ''
            }`}
        >
          <Text className="text-[#333] text-[13.5px] font-semibold">+63</Text>
          <TextInput
            className="flex-1 text-[13.5px] text-[#333] py-1"
            style={{ outlineStyle: 'none' } as any}
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
        <Text className="text-[#EF4444] text-[11px] mt-1 font-medium">{error}</Text>
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
    className="flex-1 flex-row items-center justify-center rounded-lg h-[40px] gap-2"
    style={{ backgroundColor: color }}
  >
    <FontAwesome5 name={icon} size={15} color="#FFF" />
    <Text className="font-semibold text-white text-[13px]">{name}</Text>
  </TouchableOpacity>
);

export default function RegisterFormView() {
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();
  const { role } = useLocalSearchParams<{ role?: string }>();

  // FIX: Wrapped navigation inside a short timeout to push execution 
  // to the next frame tick, letting Expo Router load its context first.
  useEffect(() => {
    if (!role || (role !== 'client' && role !== 'worker')) {
      const timeoutId = setTimeout(() => {
        router.replace('/(auth)/User-Type' as any);
      }, 0);

      return () => clearTimeout(timeoutId);
    }
  }, [role, router]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
    if (role === 'client') {
      router.replace('/(client)/(tabs)/home' as any);
    } else if (role === 'worker') {
      router.replace({
        pathname: '/(auth)/verification/PersonalInfo',
        params: {
          fullName: name,
          email: email,
          phoneNumber: phone,
        },
      } as any);
    }
  };

  return (
    <BaseLayout align="center" contentContainerStyle={{ justifyContent: 'center', marginTop: -20 }}>
      <View className="w-full max-w-[320px] items-center">
        <Image
          source={FixKoLogo}
          className="w-[200px] h-[100px]"
          resizeMode="contain"
        />

        <View className="items-center mb-5">
          <Text className="text-white text-2xl font-bold text-center">Create Account</Text>
          <Text className="text-[#ffffffa8] text-[13px] mt-1 text-center">Sign up to get started</Text>
        </View>

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

        <TouchableOpacity
          className="bg-[#1A56DB] h-[42px] rounded-lg justify-center items-center mt-6 w-full"
          onPress={handleRegister}
        >
          <Text className="text-white font-bold text-[14.5px]">Create Account</Text>
        </TouchableOpacity>

        <View className="items-center my-[15px]">
          <Text className="font-bold text-[#ffffffa8] text-[12px]">OR</Text>
          <Text className="text-[#ffffffa8] text-[11px] mt-0.5">Sign up with</Text>
        </View>

        <View className="flex-row items-center gap-2.5 w-full">
          <SocialBtn name="Google" icon="google" color="#DB4437" />
          <SocialBtn name="Facebook" icon="facebook" color="#4267B2" />
        </View>

        <View className="flex-row justify-center mt-[22px]">
          <Text className="text-[#ffffffa8] text-[13px]">Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/login' as any)}>
            <Text className="text-[#1A56DB] font-bold text-[13px]">Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BaseLayout>
  );
}