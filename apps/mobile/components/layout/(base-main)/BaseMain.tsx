import React, { useRef } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  StyleProp,
  ViewStyle,
  Image,
  TouchableOpacity,
  Text,
  Animated
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSegments } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import NavigationMenu from './NavigationMenu';

export type BaseMainTheme = 'navy' | 'blue' | 'darkNavy' | 'light' | 'accentNavy';

export interface BaseMainProps {
  children: React.ReactNode;
  scrollable?: boolean;
  theme?: BaseMainTheme;
  backgroundColor?: string;
  statusBarStyle?: 'light' | 'dark' | 'auto';
  padding?: number;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  showsVerticalScrollIndicator?: boolean;
  align?: 'center' | 'left' | 'right';
}

// A beautiful, presentable Blue & Yellow/Gold themed matrix
const GRADIENT_COLORS: Record<BaseMainTheme, [string, string, ...string[]]> = {
  navy: ['#001851', '#001851'],
  blue: ['#001851', '#001851'],
  darkNavy: ['#001851', '#001851'],
  accentNavy: ['#001851', '#001851'],
  light: ['#001851', '#001851'], // For clean light mode layouts
};

export default function BaseMain({
  children,
  scrollable = true,
  theme,
  backgroundColor,
  statusBarStyle,
  padding,
  style,
  contentContainerStyle,
  showsVerticalScrollIndicator = false,
  align,
}: BaseMainProps) {
  const segments = useSegments() as string[];
  const scaleValue = useRef(new Animated.Value(1)).current;

  // 1. Theme Detection
  let detectedTheme: BaseMainTheme = 'navy';
  if (segments.includes('(tabs)')) {
    detectedTheme = 'blue';
  } else if (segments.includes('register')) {
    detectedTheme = 'light';
  } else if (segments.includes('uploading')) {
    detectedTheme = 'darkNavy';
  } else if (segments.includes('complete')) {
    detectedTheme = 'accentNavy';
  }

  const activeTheme = theme || detectedTheme;

  // Dynamic gradient selection based on theme or explicit override
  const finalColors = backgroundColor
    ? [backgroundColor, backgroundColor] as [string, string, ...string[]]
    : GRADIENT_COLORS[activeTheme];

  const finalStatusBarStyle = statusBarStyle || (activeTheme === 'light' ? 'dark' : 'light');

  // 2. Micro-interaction: Notification bell press animation
  const handleNotificationPress = () => {
    Animated.sequence([
      Animated.timing(scaleValue, { toValue: 0.85, duration: 80, useNativeDriver: true }),
      Animated.timing(scaleValue, { toValue: 1.1, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleValue, { toValue: 1, duration: 80, useNativeDriver: true }),
    ]).start();

    console.log("Notification opened"); // Hook up your notification tray toggle or navigation here
  };

  const containerStyle = [
    styles.container,
    padding !== undefined ? { padding } : null,
    style,
  ];

  // 3. Dynamic Content Render
  const content = scrollable ? (
    <ScrollView
      contentContainerStyle={[
        styles.scrollContent,
        { padding: 24, paddingTop: 24 },
        padding !== undefined ? { padding } : null,
        align === 'center' ? { alignItems: 'center' } : null,
        contentContainerStyle,
      ]}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[
      styles.flexOne,
      align === 'center' ? { alignItems: 'center', justifyContent: 'center' } : null,
      contentContainerStyle
    ]}>
      {children}
    </View>
  );

  return (
    <LinearGradient colors={finalColors} style={containerStyle}>
      <StatusBar style={finalStatusBarStyle} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.masterContainer}>

          {/* Enhanced Premium Asymmetrical Header */}
          <View style={styles.header}>
            <View style={styles.headerBackgroundYellow} />
            <LinearGradient
              colors={['#001851', '#001851']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.headerBackgroundDark}
            />

            {/* Header Content Items */}
            <View style={styles.headerContent}>
              <Image source={require('../../../assets/logo_fixko.png')} style={styles.logo} />

              <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
                <TouchableOpacity
                  style={styles.iconButton}
                  activeOpacity={0.6}
                  onPress={handleNotificationPress}
                >
                  <Ionicons name="notifications-outline" size={22} color="#FFFFFF" />
                  <View style={styles.badge} />
                </TouchableOpacity>
              </Animated.View>
            </View>
          </View>

          {/* Core Layout Content */}
          <View style={styles.content}>
            {content}
          </View>

          {/* Bottom Menu Navigation */}
          <NavigationMenu />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  flexOne: {
    flex: 1,
  },
  masterContainer: {
    flex: 1,
  },
  headerBackgroundDark: {
    position: 'absolute',
    left: 0,
    right: 75,
    height: 60,
    borderBottomRightRadius: 60,
    zIndex: 1,
  },
  headerBackgroundYellow: {
    position: 'absolute',
    right: 0,
    width: 140,
    height: 60,
    backgroundColor: '#F5C518',
    zIndex: 0,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 2,
    zIndex: 2,
  },
  logo: {
    width: 120,
    height: 55,
    resizeMode: 'contain',
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: 11,
    right: 12,
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: '#FF3B30',
    borderWidth: 1.5,
    borderColor: '#15305B',
  },
  content: {
    flex: 1,
    paddingBottom: 75,
  },
});