import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import BaseLayout from '@/components/layout/BaseLayout';
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
  [key: string]: any;
}

const InputGroup = ({ label, icon, placeholder, isPassword, showPass, setShowPass, labelColor, ...props }: InputGroupProps) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View style={{ marginTop: 12, width: '100%' }}>
      <Text style={{ fontSize: 12.5, fontWeight: '600', marginBottom: 6, color: labelColor || '#555' }}>{label}</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: isFocused ? '#FFF' : '#F8FAFC',
          borderWidth: 1,
          borderColor: isFocused ? '#1A56DB' : '#E2E8F0',
          borderRadius: 8,
          paddingHorizontal: 14,
          height: 42,
          gap: 8,
          shadowColor: '#1A56DB',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: isFocused ? 0.08 : 0,
          shadowRadius: 4,
          elevation: isFocused ? 2 : 0,
        }}
      >
        <Ionicons name={icon} size={18} color={isFocused ? '#1A56DB' : '#888'} />
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

  return (
    <BaseLayout align="center" contentContainerStyle={{ justifyContent: 'center', marginTop: -50 }}>

      {/* Centered card width container to keep layout tight and elegant */}
      <View style={{ width: '100%', maxWidth: 320, alignItems: 'center' }}>

        {/* Logo and Subtitle Section */}
        <View style={{ alignItems: 'center', marginBottom: 25 }}>
          <Image
            source={logo}
            style={{ width: 200, height: 100, resizeMode: 'contain' }}
          />
          <View style={{ alignItems: 'center', marginTop: 5 }}>
            <Text style={{ color: '#FFF', fontSize: 22, fontWeight: 'bold', textAlign: 'center' }}>Welcome Back</Text>
            <Text style={{ color: '#ffffffa8', fontSize: 13, marginTop: 4, textAlign: 'center' }}>Sign in to your account</Text>
          </View>
        </View>

        <InputGroup label="Email Address" icon="mail-outline" placeholder="Enter Email" keyboardType="email-address" labelColor="#ffffffa8" />

        <InputGroup
          label="Password"
          icon="lock-closed-outline"
          placeholder="Enter Password"
          isPassword
          showPass={showPass}
          setShowPass={setShowPass}
          labelColor="#ffffffa8"
        />

        <TouchableOpacity style={{ width: '100%', alignItems: 'flex-end', marginTop: 7 }}>
          <Text style={{ color: '#1A56DB', fontWeight: 'bold', fontSize: 11 }}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Sign In Button */}
        <TouchableOpacity
          style={{
            backgroundColor: '#1A56DB',
            height: 42,
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 30,
            width: '100%'
          }}
          onPress={() => router.push('/(main)/mainpage/page')}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 14.5 }}>Sign In</Text>
        </TouchableOpacity>

        {/* OR Divider */}
        <View style={{ alignItems: 'center', marginVertical: 15 }}>
          <Text style={{ fontWeight: 'bold', color: '#ffffffa8', fontSize: 12 }}>OR</Text>
          <Text style={{ color: '#ffffffa8', fontSize: 11, marginTop: 2 }}>Sign in with</Text>
        </View>

        {/* Social Row */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, width: '100%' }}>
          <SocialBtn name="Google" icon="google" color="#DB4437" />
          <SocialBtn name="Facebook" icon="facebook" color="#4267B2" />
        </View>

        {/* Footer */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 22 }}>
          <Text style={{ color: '#ffffffa8', fontSize: 13 }}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/register/page')}>
            <Text style={{ color: '#1A56DB', fontWeight: 'bold', fontSize: 13 }}>Register</Text>
          </TouchableOpacity>
        </View>

      </View>
    </BaseLayout>
  );
}