import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated, Dimensions, Platform, Easing } from 'react-native';
import { useRouter, useSegments } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';

const { width: windowWidth } = Dimensions.get('window');
const TAB_BAR_WIDTH = windowWidth - 32;
const TABS_COUNT = 4;
const TAB_WIDTH = TAB_BAR_WIDTH / TABS_COUNT;

// Preserving your exact colors
const BG_COLOR = '#121624';       // Deep premium midnight navy
const ACTIVE_COLOR = '#000000';   // Black active icon color
const ACTIVE_BG_COLOR = '#FFEB3B'; // Yellow background for active tab
const INACTIVE_COLOR = '#5A637A'; // Clean slate muted grey

type TabName = 'home' | 'booking' | 'reviews' | 'message' | 'settings';

export default function NavigationMenu() {
  const router = useRouter();
  const segments = useSegments() as string[];
  const [active, setActive] = React.useState<TabName>('home');
  const anim = useRef(new Animated.Value(0)).current;

  const routes = [
    { name: 'home', path: '/home', icon: 'home-variant' },
    { name: 'booking', path: '/booking', icon: 'clock' },
    { name: 'reviews', path: '/reviews', icon: 'chart-pie' },
    { name: 'message', path: '/message', icon: 'message' },
    { name: 'settings', path: '/settings', icon: 'account' },
  ] as const;

  useEffect(() => {
    if (!segments?.length) return;
    const seg = segments[segments.length - 1];
    const cleanedSeg = seg ? seg.replace(/[()]/g, '') : 'home';
    const mappedSeg = cleanedSeg === 'JobOverview' || cleanedSeg === 'StartJob' ? 'booking' : cleanedSeg;
    const idx = routes.findIndex(r => r.name === mappedSeg);
    if (idx !== -1) {
      setActive(routes[idx].name);
      animateTo(idx);
    }
  }, [segments]);

  const animateTo = (index: number) => {
    Animated.timing(anim, {
      toValue: index,
      duration: 300,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  };

  const handlePress = (path: string, idx: number, name: TabName) => {
    setActive(name);
    animateTo(idx);
    router.replace(path as any);
  };

  // Move the sliding curved pocket across the screen
  const translateX = anim.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: [0, TAB_WIDTH, TAB_WIDTH * 2, TAB_WIDTH * 3],
  });

  // Simple solid background for the bar (no pocket)
  const d = `M 0 0 H ${TAB_WIDTH} V 64 H 0 Z`;


  return (
    <View style={styles.wrapper}>
      <Animated.View
        style={[
          styles.slidingWrapper,
          { width: TAB_WIDTH, transform: [{ translateX }] }
        ]}
      >
        <View style={[styles.wingFiller, { left: -TAB_BAR_WIDTH, right: TAB_WIDTH }]} />

        <View style={[styles.wingFiller, { left: TAB_WIDTH, right: -TAB_BAR_WIDTH }]} />

        <Svg width={TAB_WIDTH} height={64}>
          <Path d={d} fill={BG_COLOR} />
        </Svg>

      </Animated.View>

      <View style={styles.tabsContainer}>
        {routes.map((tab, idx) => {
          const isActive = active === tab.name;

          const labelOpacity = anim.interpolate({
            inputRange: [idx - 0.3, idx, idx + 0.3],
            outputRange: [0, 1, 0],
            extrapolate: 'clamp',
          });

          const iconScale = anim.interpolate({
            inputRange: [idx - 0.5, idx, idx + 0.5],
            outputRange: [1, 1.3, 1],
            extrapolate: 'clamp',
          });

          return (
            <TouchableOpacity
              key={tab.name}
              onPress={() => handlePress(tab.path, idx, tab.name)}
              style={styles.item}
              activeOpacity={1}
            >
              <Animated.View style={[styles.inlineContainer, isActive && styles.activeItem]}>
                <Animated.View style={[styles.iconWrapper, { transform: [{ scale: iconScale }] }]}>
                  <MaterialCommunityIcons
                    name={tab.icon as any}
                    size={26}
                    color={isActive ? ACTIVE_COLOR : INACTIVE_COLOR} // Active icons turn yellow
                  />
                </Animated.View>
                <Animated.Text style={[styles.label, { opacity: labelOpacity, color: isActive ? ACTIVE_COLOR : '#FFF' }]}>
                  {tab.name.charAt(0).toUpperCase() + tab.name.slice(1)}
                </Animated.Text>
              </Animated.View>
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
    bottom: 0,
    left: 0,
    right: 0,
    height: 48,
    borderRadius: 12,
    overflow: 'hidden',
    alignItems: 'center',
    backgroundColor: BG_COLOR,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 15,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  slidingWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    height: 64,
    zIndex: 1,
  },
  wingFiller: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    backgroundColor: BG_COLOR,
  },

  tabsContainer: {
    flexDirection: 'row',
    width: TAB_BAR_WIDTH,
    height: '100%',
    alignItems: 'center',
    zIndex: 10,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  iconWrapper: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    paddingTop: 8,
  },
  activeItem: {
    backgroundColor: ACTIVE_BG_COLOR,
    borderRadius: 16,
    alignSelf: 'center',
    width: TAB_WIDTH - 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: { elevation: 4 },
    }),
  },
  inlineContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.4,
    marginTop: -6,
    paddingBottom: 4,
  },
});