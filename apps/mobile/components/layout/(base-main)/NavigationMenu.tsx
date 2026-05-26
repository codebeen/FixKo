import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useRouter, useSegments } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Icon colors mapping
const ACTIVE_COLOR = '#FFEB3B';
const INACTIVE_COLOR = '#5A637A';

type TabName = 'home' | 'booking' | 'explore' | 'message' | 'bookings' | 'reviews' | 'history' | 'profile';

const clientRoutes = [
  { name: 'home', path: '/(client)/(tabs)/home', activeIcon: 'home', inactiveIcon: 'home-outline', label: 'Home' },
  { name: 'explore', path: '/(client)/(tabs)/explore', activeIcon: 'compass', inactiveIcon: 'compass-outline', label: 'Explore' },
  { name: 'booking', path: '/(client)/(tabs)/booking', activeIcon: 'calendar-clock', inactiveIcon: 'calendar-clock-outline', label: 'Booking' },
  { name: 'message', path: '/(client)/(tabs)/message', activeIcon: 'message', inactiveIcon: 'message-outline', label: 'Message' },
] as const;

const workerRoutes = [
  { name: 'home', path: '/(worker)/(tabs)/home', activeIcon: 'home', inactiveIcon: 'home-outline', label: 'Home' },
  { name: 'bookings', path: '/(worker)/(tabs)/bookings', activeIcon: 'calendar-clock', inactiveIcon: 'calendar-clock-outline', label: 'Bookings' },
  { name: 'message', path: '/(worker)/(tabs)/message', activeIcon: 'message', inactiveIcon: 'message-outline', label: 'Messages' },
  { name: 'reviews', path: '/(worker)/(tabs)/reviews', activeIcon: 'star', inactiveIcon: 'star-outline', label: 'Reviews' },
  { name: 'history', path: '/(worker)/(tabs)/history', activeIcon: 'history', inactiveIcon: 'history-outline', label: 'History' },
] as const;

export default function NavigationMenu() {
  const router = useRouter();
  const segments = useSegments() as string[];
  const [active, setActive] = React.useState<TabName>('home');

  const isWorker = segments.includes('(worker)');
  const routes = isWorker ? workerRoutes : clientRoutes;

  useEffect(() => {
    if (!segments?.length) return;
    const seg = segments[segments.length - 1];
    const cleanedSeg = seg ? seg.replace(/[()]/g, '') : 'home';
    const mappedSeg =
      cleanedSeg === 'JobOverview' ||
      cleanedSeg === 'StartJob' ||
      cleanedSeg === 'Timer' ||
      cleanedSeg === 'UploadProof' ||
      cleanedSeg === 'JobCompleted'
        ? 'bookings'
        : cleanedSeg;
    const idx = routes.findIndex(r => r.name === mappedSeg);
    if (idx !== -1) {
      setActive(routes[idx].name);
    }
  }, [segments, routes]);

  const handlePress = (path: string, name: TabName) => {
    setActive(name);
    router.replace(path as any);
  };

  return (
    <View className="absolute bottom-[12px] left-[16px] right-[16px] h-[64px] rounded-[24px] items-center justify-center bg-brand-navy border border-white/10 shadow-lg shadow-black/30 elevation-8">
      <View className="flex-row justify-around items-center h-full w-full px-[8px]">
        {routes.map((tab) => {
          const isActive = active === tab.name;

          return (
            <TouchableOpacity
              key={tab.name}
              onPress={() => handlePress(tab.path, tab.name)}
              className="items-center justify-center"
              activeOpacity={0.7}
            >
              {isActive ? (
                <View className="flex-row items-center bg-brand-yellow/10 px-[12px] py-[8px] rounded-full">
                  <MaterialCommunityIcons
                    name={tab.activeIcon as any}
                    size={20}
                    color={ACTIVE_COLOR}
                  />
                  <Text className="text-brand-yellow font-bold text-[12px] ml-[6px]">
                    {tab.label}
                  </Text>
                </View>
              ) : (
                <View className="p-[8px]">
                  <MaterialCommunityIcons
                    name={tab.inactiveIcon as any}
                    size={20}
                    color={INACTIVE_COLOR}
                  />
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}