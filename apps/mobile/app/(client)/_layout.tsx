import { Stack } from 'expo-router';

export default function ClientLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="services/variation/CleaningServicePage" />
      <Stack.Screen name="services/variation/PlumbingServicePage" />
      <Stack.Screen name="services/variation/ConstructionServicePage" />
      <Stack.Screen name="booking/BookingPage" />
      <Stack.Screen name="booking/WorkerSelectionPage" />
      <Stack.Screen name="booking/BookingConfirmationPage" />
      <Stack.Screen name="booking/TrackBookingPage" />
      <Stack.Screen name="payment/PaymentMethodPage" />
      <Stack.Screen name="payment/PaymentConfirmationPage" />
      <Stack.Screen name="history/page" />
      <Stack.Screen name="notification" />
    </Stack>
  );
}
