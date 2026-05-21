import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* index refers to your landing page */}
      <Stack.Screen name="index" /> 
      {/* auth refers to the login/signup group */}
      <Stack.Screen name="auth" />
      {/* (tabs) refers to your main app navigation */}
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}