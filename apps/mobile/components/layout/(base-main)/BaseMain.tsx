import React from 'react';
import {
  ScrollView,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import DottedGridBackground from '@/components/ui/DottedGridBackground';

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

export default function BaseMain({
  children,
  scrollable = false,
  theme,
  backgroundColor,
  statusBarStyle,
  padding,
  style,
  contentContainerStyle,
  showsVerticalScrollIndicator = false,
  align,
}: BaseMainProps) {
  const activeTheme = theme || 'darkNavy';
  const finalStatusBarStyle = statusBarStyle || (activeTheme === 'light' ? 'dark' : 'light');
  const finalBackgroundColor = backgroundColor || '#12357F';

  const content = scrollable ? (
    <ScrollView
      className="flex-1"
      contentContainerClassName="flex-grow"
      contentContainerStyle={[
        { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 40 },
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
      className="flex-1"
      style={[
        { backgroundColor: finalBackgroundColor },
        padding !== undefined ? { padding } : null,
        style,
      ]}
    >
      <Stack.Screen options={{ animation: 'none' }} />
      <StatusBar style={finalStatusBarStyle} />
      <DottedGridBackground color={finalBackgroundColor} />
      <SafeAreaView className="flex-1">
        <View className="flex-1">
          <View className="flex-1">
            {content}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
