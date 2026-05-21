import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { useRouter, useSegments } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const TAB_BAR_WIDTH = width - 40; // Accounting for 20px padding on each side
const TABS_COUNT = 4;
const TAB_WIDTH = TAB_BAR_WIDTH / TABS_COUNT;

const ICON_SIZE = 22;
const BAR_BACKGROUND = '#0052cc'; // Sleek premium brand blue
const ACTIVE_PILL_COLOR = '#ffffff';
const ACTIVE_ICON_COLOR = '#0052cc';
const INACTIVE_ICON_COLOR = '#b3d1ff'; // Soft light blue for contrast

type TabName = 'home' | 'booking' | 'reviews' | 'settings';

export default function NavigationMenu() {
  const router = useRouter();
  const segments = useSegments() as string[];

  // Local state tracking matching tabs
  const [active, setActive] = React.useState<TabName>('home');
  const slideAnim = useRef(new Animated.Value(0)).current;

  // Map routes to tab states
  const routes: { name: TabName; path: string }[] = [
    { name: 'home', path: '/mainpage' },
    { name: 'booking', path: '/bookings' },
    { name: 'reviews', path: '/reviewspage' },
    { name: 'settings', path: '/settings' },
  ];

  // Determine active tab based on current route segments
  useEffect(() => {
    const seg = segments[0]; // first segment after root
    const activeIndex = routes.findIndex(r => r.path.includes(seg.replace(/[()]/g, '')));
    if (activeIndex !== -1) {
      setActive(routes[activeIndex].name);
      Animated.spring(slideAnim, {
        toValue: activeIndex * TAB_WIDTH,
        useNativeDriver: true,
        bounciness: 4,
      }).start();
    }
  }, [segments]);

  const handlePress = (path: string, index: number, name: TabName) => {
    setActive(name);
    Animated.spring(slideAnim, {
      toValue: index * TAB_WIDTH,
      useNativeDriver: true,
      bounciness: 4,
    }).start();

    router.push(path as any);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {/* Animated Sliding White Background Pill */}
        <Animated.View
          style={[
            styles.animatedPill,
            {
              width: TAB_WIDTH - 12, // Subtly smaller than the container box
              transform: [{ translateX: Animated.add(slideAnim, 6) }],
            },
          ]}
        />

        {/* Tab Buttons */}
        {routes.map((tab, index) => {
          const isActive = active === tab.name;
          return (
            <TouchableOpacity
              key={tab.name}
              onPress={() => handlePress(tab.path, index, tab.name)}
              style={styles.item}
              activeOpacity={0.8}
            >
              {tab.name === 'home' && (
                <Ionicons
                  name={isActive ? "home" : "home-outline"}
                  size={ICON_SIZE}
                  color={isActive ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR}
                />
              )}
              {tab.name === 'booking' && (
                <MaterialIcons
                  name="calendar-today"
                  size={ICON_SIZE}
                  color={isActive ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR}
                />
              )}
              {tab.name === 'reviews' && (
                <MaterialIcons
                  name={isActive ? "rate-review" : "reviews"}
                  size={ICON_SIZE}
                  color={isActive ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR}
                />
              )}
              {tab.name === 'settings' && (
                <Ionicons
                  name={isActive ? "settings" : "settings-outline"}
                  size={ICON_SIZE}
                  color={isActive ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR}
                />
              )}

              {isActive && (
                <Animated.Text style={[styles.label, { color: ACTIVE_ICON_COLOR }]}>
                  {tab.name.charAt(0).toUpperCase() + tab.name.slice(1)}
                </Animated.Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 25, // Floats above edge of screen
    left: 20,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    width: TAB_BAR_WIDTH,
    height: 60,
    backgroundColor: BAR_BACKGROUND,
    borderRadius: 30, // Fully pill-shaped matching image reference
    alignItems: 'center',
    paddingHorizontal: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  animatedPill: {
    position: 'absolute',
    height: 44,
    backgroundColor: ACTIVE_PILL_COLOR,
    borderRadius: 22,
    zIndex: 0,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    gap: 6,
  },
  label: {
    fontSize: 12,
    fontFamily: 'Inter',
    fontWeight: '700',
  },
});