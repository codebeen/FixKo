import React from 'react';
import { 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  View, 
  StyleProp, 
  ViewStyle 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSegments } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

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

const GRADIENT_COLORS: Record<BaseLayoutTheme, string[]> = {
  navy: ['#061C48', '#5893DF'],       // Premium signature royal navy to sky-blue gradient
  blue: ['#061C48', '#5893DF'],       // Premium signature royal navy to sky-blue gradient
  darkNavy: ['#061C48', '#5893DF'],   // Premium signature royal navy to sky-blue gradient
  accentNavy: ['#061C48', '#5893DF'], // Premium signature royal navy to sky-blue gradient
  light: ['#061C48', '#5893DF'],      // Premium signature royal navy to sky-blue gradient
};

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
  
  // Support either single color overrides or standard gradient themes
  const finalColors = (backgroundColor 
    ? [backgroundColor, backgroundColor] 
    : GRADIENT_COLORS[activeTheme]) as [string, string, ...string[]];

  // Determine status bar style based on background brightness
  const finalStatusBarStyle = statusBarStyle || (activeTheme === 'light' ? 'dark' : 'light');

  const containerStyle = [
    styles.container,
    padding !== undefined ? { padding } : null,
    style,
  ];

  const content = scrollable ? (
    <ScrollView
      contentContainerStyle={[
        styles.scrollContent,
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
    <View style={[
      styles.flexOne,
      align === 'center' ? { alignItems: 'center', justifyContent: 'center' } : null,
      contentContainerStyle
    ]}>
      {children}
    </View>
  );

  return (
    <LinearGradient
      colors={finalColors}
      style={containerStyle}
    >
      <SafeAreaView style={styles.flexOne}>
        <StatusBar style={finalStatusBarStyle} />
        {content}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  flexOne: {
    flex: 1,
  },
});
