import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import BaseModal, { modalStyles } from '@/components/modal/BaseModal';

interface GoToHomeModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function GoToHomeModal({ visible, onClose }: GoToHomeModalProps) {
  const router = useRouter();

  const handleGoHome = () => {
    onClose();
    router.replace('/(main)/home/Home' as any);
  };

  return (
    <BaseModal visible={visible} onClose={onClose}>
      {/* Header */}
      <View style={modalStyles.headerRow}>
        <View style={modalStyles.iconBadge}>
          <Ionicons name="home-outline" size={22} color="#FACC15" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={modalStyles.title}>Leave Verification?</Text>
          <Text style={modalStyles.subtitle}>Your progress will not be saved</Text>
        </View>
      </View>

      <View style={modalStyles.divider} />

      <Text style={modalStyles.bodyText}>
        Are you sure you want to go back to the home screen? Any unsaved verification progress will be lost.
      </Text>

      {/* Buttons */}
      <View style={{ flexDirection: 'row', gap: 10, marginTop: 4 }}>
        <TouchableOpacity
          onPress={onClose}
          activeOpacity={0.8}
          style={{
            flex: 1,
            height: 46,
            borderRadius: 50,
            borderWidth: 1.5,
            borderColor: 'rgba(255,255,255,0.2)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#FFF', fontSize: 14, fontWeight: 'bold' }}>Stay</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleGoHome}
          activeOpacity={0.85}
          style={[modalStyles.acceptBtn, { flex: 1, marginTop: 0 }]}
        >
          <Ionicons name="home-outline" size={16} color="#001449" />
          <Text style={modalStyles.acceptBtnText}>Go Home</Text>
        </TouchableOpacity>
      </View>
    </BaseModal>
  );
}
