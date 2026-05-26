import { Stack } from 'expo-router';

export default function WorkerLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="booking/JobOverview" />
      <Stack.Screen name="booking/StartJob" />
      <Stack.Screen name="booking/Timer" />
      <Stack.Screen name="booking/UploadProof" />
      <Stack.Screen name="booking/JobCompleted" />
      <Stack.Screen name="notification" />
    </Stack>
  );
}
