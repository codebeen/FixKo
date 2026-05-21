import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// --- Reusable Sub-Components ---

const InputGroup = ({ label, icon, placeholder, isPassword, showPass, setShowPass, ...props }) => (
  <View style={styles.fieldContainer}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputWrapper}>
      <Ionicons name={icon} size={20} color="#999" />
      <TextInput 
        style={styles.input} 
        placeholder={placeholder} 
        placeholderTextColor="#999"
        secureTextEntry={isPassword && !showPass}
        {...props} 
      />
      {isPassword && (
        <TouchableOpacity onPress={() => setShowPass(!showPass)}>
          <Ionicons name={showPass ? "eye-outline" : "eye-off-outline"} size={20} color="#999" />
        </TouchableOpacity>
      )}
    </View>
  </View>
);

const SocialBtn = ({ name, icon, color }) => (
  <TouchableOpacity style={styles.socialBtn}>
    <FontAwesome5 name={icon} size={18} color={color} />
    <Text style={styles.socialText}>{name}</Text>
  </TouchableOpacity>
);

// --- Main Screen ---

export default function App() {
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up to get started</Text>
        </View>

        <InputGroup label="Name" icon="person-outline" placeholder="Enter First and Last Name" />
        <InputGroup label="Email Address" icon="mail-outline" placeholder="Enter Email" keyboardType="email-address" />

        {/* Phone Section - Kept separate due to unique flag layout */}
        <Text style={styles.label}>Phone</Text>
        <View style={styles.row}>
          <View style={styles.flagPicker}><Text>🇮🇳</Text><Ionicons name="chevron-down" size={14} /></View>
          <View style={[styles.inputWrapper, { flex: 1, marginLeft: 10 }]}>
            <Text style={{ color: '#666' }}>+91</Text>
            <TextInput style={styles.input} keyboardType="phone-pad" />
          </View>
        </View>

        <InputGroup 
          label="Password" 
          icon="lock-closed-outline" 
          placeholder="Enter Password" 
          isPassword 
          showPass={showPass} 
          setShowPass={setShowPass} 
        />

        <TouchableOpacity style={styles.mainBtn} onPress={() => router.push('/(main)/mainpage/page')}>
          <Text style={styles.mainBtnText}>Create Account</Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <Text style={styles.dividerMain}>OR</Text>
          <Text style={styles.dividerSub}>Sign up with</Text>
        </View>

        <View style={styles.row}>
          <SocialBtn name="Google" icon="google" color="#DB4437" />
          <SocialBtn name="Facebook" icon="facebook" color="#4267B2" />
        </View>

        <View style={styles.footer}>
          <Text style={{ color: '#666' }}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/login/page')}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// --- Styles ---

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { padding: 25, paddingTop: 40 },
  header: { marginBottom: 25 },
  title: { fontSize: 28, fontWeight: 'bold' },
  subtitle: { color: '#888', marginTop: 5 },
  fieldContainer: { marginTop: 15 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 8, color: '#444' },
  inputWrapper: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#F7F7F7', 
    borderRadius: 8, 
    paddingHorizontal: 15, 
    height: 55,
    gap: 10
  },
  input: { flex: 1, fontSize: 14 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  flagPicker: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#F7F7F7', 
    height: 55, 
    paddingHorizontal: 12, 
    borderRadius: 8, 
    gap: 5 
  },
  mainBtn: { 
    backgroundColor: '#1A56DB', 
    height: 55, 
    borderRadius: 10, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 30 
  },
  mainBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  divider: { alignItems: 'center', marginVertical: 20 },
  dividerMain: { fontWeight: 'bold', color: '#333' },
  dividerSub: { color: '#888', fontSize: 12 },
  socialBtn: { 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    borderWidth: 1, 
    borderColor: '#EEE', 
    borderRadius: 30, 
    height: 50,
    gap: 10
  },
  socialText: { fontWeight: '600' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 30 },
  link: { color: '#1A56DB', fontWeight: 'bold' }
});