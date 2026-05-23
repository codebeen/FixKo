import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { modalStyles } from '@/components/modal/BaseModal';

interface PrivacyConsentModalProps {
  visible: boolean;
  onAccept: () => void;
}

export default function PrivacyConsentModal({ visible, onAccept }: PrivacyConsentModalProps) {
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