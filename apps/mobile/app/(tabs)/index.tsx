import React, { useRef, useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, Pressable, Animated, Easing, Dimensions, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import BaseLayout from '@/components/layout/(base-auth)/BaseLayout';
import LogoAnimation from '@/components/layout/(base-auth)/LogoAnimation';

export default function App() {
  const router = useRouter();
  const { width: screenWidth } = useWindowDimensions();

  // Establish responsive screen thresholds
  const isSmallScreen = screenWidth < 380;
  const isTabletOrWeb = screenWidth > 768;

  // Determine elegant responsive sizing
  const containerMaxWidth = isTabletOrWeb ? 420 : 340;
  const titleFontSize = isSmallScreen ? 19 : 23;
  const subtitleFontSize = isSmallScreen ? 15 : 18;
  const descFontSize = isSmallScreen ? 12 : 13.5;
  const buttonSpacing = isSmallScreen ? 40 : 60;

  return (
    <BaseLayout align="center" contentContainerStyle={{ justifyContent: 'center' }}>
      <View style={{ width: '100%', maxWidth: containerMaxWidth, alignItems: 'center', paddingHorizontal: 10 }}>
        <LogoAnimation />

        <Text style={{ color: '#FFF', fontSize: titleFontSize, fontWeight: 'bold', textAlign: 'center', marginTop: 10 }}>
          Supporting Filipino Workers,{'\n'}
          <Text style={{ fontSize: subtitleFontSize, fontWeight: 'normal', fontStyle: 'italic', color: '#CCC' }}>
            Serving Every Home.
          </Text>
        </Text>

        <Text style={{ color: '#BBB', textAlign: 'center', fontSize: descFontSize, marginTop: 12, lineHeight: 18 }}>
          Empowering the hands that build our nation. We bridge the gap between
          the hardworking Filipino and the homes that need them most.
        </Text>

        <View style={{ gap: 18, alignItems: 'center', width: '100%', marginTop: buttonSpacing }}>
          <Pressable
            style={({ hovered, pressed }) => ({
              backgroundColor: hovered ? '#5898E5' : '#7EB1F1',
              width: '100%',
              padding: 16,
              borderRadius: 30,
              alignItems: 'center',
              opacity: pressed ? 0.85 : 1,
              transform: [{ scale: hovered ? 1.03 : 1 }],
            })}
            onPress={() => router.push('/(auth)/User-Type' as any)}
          >
            <Text style={{ color: '#001449', fontWeight: 'bold', fontSize: 16 }}>Get Started</Text>
          </Pressable>

          <Pressable
            style={({ hovered, pressed }) => ({
              opacity: pressed ? 0.7 : (hovered ? 0.8 : 1),
              paddingVertical: 8,
            })}
            onPress={() => router.push('/(auth)/login/page')}
          >
            <Text style={{ color: '#FFF', fontWeight: '600', fontSize: 14.5 }}>I Already have an Account</Text>
          </Pressable>
        </View>
      </View>
    </BaseLayout>
  );
}