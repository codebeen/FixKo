import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, useWindowDimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import BaseLayout from '@/components/layout/(base-auth)/BaseLayout';

type RoleType = 'client' | 'worker' | null;

export default function UserTypeScreen() {
  const [selectedRole, setSelectedRole] = useState<RoleType>(null);
  const router = useRouter();
  const { width: screenWidth } = useWindowDimensions();

  const isSmallScreen = screenWidth < 380;
  const isTabletOrWeb = screenWidth > 768;
  const isRowLayout = screenWidth > 640;

  const handleContinue = () => {
    if (selectedRole === 'client') {
      router.push({
        pathname: '/(auth)/register/page',
        params: { role: 'client' },
      } as any);
    } else if (selectedRole === 'worker') {
      // Navigates to worker verification flow starting with Basic Info
      router.push('/(auth)/(verification)/PersonalInfo' as any);
    }
  };

  return (
    <BaseLayout align="center" contentContainerStyle={{ justifyContent: 'center' }}>
      <View style={[styles.container, { maxWidth: isTabletOrWeb ? 720 : (isRowLayout ? 600 : 360) }]}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { fontSize: isSmallScreen ? 23 : 26 }]}>
            Join <Text style={styles.goldText}>FixKo PH</Text>
          </Text>
          <Text style={[styles.subtitle, { fontSize: isSmallScreen ? 13 : 14 }]}>
            Choose how you want to join our community today.
          </Text>
        </View>

        {/* Tiles Container (Dynamic Row/Column Layout) */}
        <View style={[styles.tilesContainer, { flexDirection: isRowLayout ? 'row' : 'column' }]}>
          {/* CLIENT TILE */}
          <Pressable
            style={({ pressed, hovered }) => [
              styles.tile,
              { flex: isRowLayout ? 1 : undefined, width: isRowLayout ? undefined : '100%' },
              selectedRole === 'client' ? styles.tileSelected : styles.tileUnselected,
              (pressed || hovered) && styles.tileInteractive,
            ]}
            onPress={() => setSelectedRole('client')}
          >
            <View style={styles.tileHeader}>
              <View style={[
                styles.iconContainer,
                selectedRole === 'client' ? styles.iconContainerSelected : styles.iconContainerUnselected
              ]}>
                <MaterialCommunityIcons
                  name="account-search"
                  size={isSmallScreen ? 24 : 28}
                  color={selectedRole === 'client' ? '#001449' : '#DBA92E'}
                />
              </View>

              {/* Radio Indicator */}
              <View style={[
                styles.radioOuter,
                selectedRole === 'client' && styles.radioOuterSelected
              ]}>
                {selectedRole === 'client' && <View style={styles.radioInner} />}
              </View>
            </View>

            <Text style={styles.tileTitle}>I want to Hire / Client</Text>
            <Text style={styles.tileDesc}>
              Find and book reliable local workers for home repairs, plumbing, cleaning, electrical work, and more.
            </Text>
          </Pressable>

          {/* WORKER TILE */}
          <Pressable
            style={({ pressed, hovered }) => [
              styles.tile,
              { flex: isRowLayout ? 1 : undefined, width: isRowLayout ? undefined : '100%' },
              selectedRole === 'worker' ? styles.tileSelected : styles.tileUnselected,
              (pressed || hovered) && styles.tileInteractive,
            ]}
            onPress={() => setSelectedRole('worker')}
          >
            <View style={styles.tileHeader}>
              <View style={[
                styles.iconContainer,
                selectedRole === 'worker' ? styles.iconContainerSelected : styles.iconContainerUnselected
              ]}>
                <MaterialCommunityIcons
                  name="hammer-wrench"
                  size={isSmallScreen ? 24 : 28}
                  color={selectedRole === 'worker' ? '#001449' : '#DBA92E'}
                />
              </View>

              {/* Radio Indicator */}
              <View style={[
                styles.radioOuter,
                selectedRole === 'worker' && styles.radioOuterSelected
              ]}>
                {selectedRole === 'worker' && <View style={styles.radioInner} />}
              </View>
            </View>

            <Text style={styles.tileTitle}>I want to Work / Worker</Text>
            <Text style={styles.tileDesc}>
              Offer your professional skills, complete service requests in your area, and earn extra income.
            </Text>
          </Pressable>
        </View>

        {/* Continue Button (Capped width on web/tablet for neatness) */}
        <Pressable
          disabled={selectedRole === null}
          style={({ pressed, hovered }) => [
            styles.continueBtn,
            { maxWidth: isRowLayout ? 320 : '100%' },
            selectedRole === null && styles.continueBtnDisabled,
            selectedRole !== null && styles.continueBtnActive,
            selectedRole !== null && pressed && styles.continueBtnPressed,
            selectedRole !== null && hovered && styles.continueBtnHovered,
          ]}
          onPress={handleContinue}
        >
          <Text style={[
            styles.continueText,
            selectedRole === null ? styles.continueTextDisabled : styles.continueTextActive
          ]}>
            Continue
          </Text>
        </Pressable>
      </View>
    </BaseLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  goldText: {
    color: '#FACC15',
  },
  subtitle: {
    color: '#CCC',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
    paddingHorizontal: 15,
  },
  tilesContainer: {
    width: '100%',
    gap: 20,
    marginBottom: 35,
  },
  tile: {
    width: '100%',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1.5,
  },
  tileUnselected: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  tileSelected: {
    backgroundColor: 'rgba(219, 169, 70, 0.08)',
    borderColor: '#DBA92E',
    shadowColor: '#DBA92E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  tileInteractive: {
    opacity: 0.95,
  },
  tileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainerUnselected: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
  },
  iconContainerSelected: {
    backgroundColor: '#DBA92E',
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterSelected: {
    borderColor: '#DBA92E',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#DBA92E',
  },
  tileTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  tileDesc: {
    color: '#BBB',
    fontSize: 12.5,
    lineHeight: 18,
  },
  continueBtn: {
    width: '100%',
    height: 54,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueBtnDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  continueBtnActive: {
    backgroundColor: '#7EB1F1',
  },
  continueBtnPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  continueBtnHovered: {
    backgroundColor: '#5898E5',
  },
  continueText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  continueTextDisabled: {
    color: 'rgba(255, 255, 255, 0.3)',
  },
  continueTextActive: {
    color: '#001449',
  },
});
