import React from 'react';
import { ScrollView, View, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useSegments } from 'expo-router';
import Svg, {
  Circle,
  Defs,
  Pattern,
  Rect,
} from 'react-native-svg';

export type BaseLayoutTheme = 'navy' | 'blue' | 'darkNavy' | 'light' | 'accentNavy';

export interface BaseLayoutProps {
  children: React.ReactNode;
  scrollable?: boolean;
  theme?: BaseLayoutTheme;
  backgroundColor?: string;
  statusBarStyle?: 'light' | 'dark' | 'auto';
  padding?: number;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  showsVerticalScrollIndicator?: boolean;
  align?: 'center' | 'left' | 'right';
}

function BaseLayoutBackground() {
  return (
    <Svg style={StyleSheet.absoluteFillObject} width="100%" height="100%" preserveAspectRatio="none">
      <Defs>
        <Pattern id="authDotPattern" width="40" height="40" patternUnits="userSpaceOnUse">
          <Circle cx="4" cy="3" r="1.35" fill="#FFFFFF" opacity="0.1" />
        </Pattern>
      </Defs>
      <Rect width="100%" height="100%" fill="#12357F" />
      <Rect width="100%" height="100%" fill="url(#authDotPattern)" />
    </Svg>
  );
}

export default function BaseLayout({
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
}: BaseLayoutProps) {
  const segments = useSegments() as string[];

  // Automatically determine default theme based on active segments if not explicitly overridden
  let detectedTheme: BaseLayoutTheme = 'navy';
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

  // Determine status bar style based on background brightness
  const finalStatusBarStyle = statusBarStyle || (activeTheme === 'light' ? 'dark' : 'light');

  const content = scrollable ? (
    <ScrollView
      className="flex-1"
      contentContainerClassName="flex-grow"
      contentContainerStyle={[
        { padding: 25, paddingTop: 40 },
        padding !== undefined ? { padding } : null,
        align === 'center' ? { alignItems: 'center' } : null,
        contentContainerStyle,
      ]}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
    >
      {children}
    </ScrollView>
  ) : (
    <View
      className="flex-1"
      style={[
        align === 'center' ? { alignItems: 'center', justifyContent: 'center' } : null,
        contentContainerStyle
      ]}
    >
      {children}
    </View>
  );

  return (
    <View
      className={`flex-1 ${backgroundColor ? '' : 'bg-[#12357F]'}`}
      style={[
        backgroundColor ? { backgroundColor } : null,
        padding !== undefined ? { padding } : null,
        style,
      ]}
    >
      {!backgroundColor ? <BaseLayoutBackground /> : null}
      <SafeAreaView className="flex-1" style={{ zIndex: 1 }}>
        <StatusBar style={finalStatusBarStyle} />
        {content}
      </SafeAreaView>
    </View>
  );
}
