import '../global.css';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {/* index refers to your onboarding/landing page */}
        <Stack.Screen name="index" />
        {/* auth routes layout */}
        <Stack.Screen name="(auth)" />
        {/* client routes layout */}
        <Stack.Screen name="(client)" />
        {/* worker routes layout */}
        <Stack.Screen name="(worker)" />
      </Stack>
    </SafeAreaProvider>
  );
}